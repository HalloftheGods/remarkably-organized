// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Action, ActionReturn } from 'svelte/action';

import type { IntersectAttributes, IntersectParameters, IntersectDetail } from '$lib/types';

/**
 * Create an IntersectionObserver that observers the node
 * @public
 *
 * @example
 * Typical use to observe the first time the node intersects with viewport for transition effect (like fade-in)
 *
 * ```html
 * <script lang="ts">
 *  import { intersect, type IntersectDetail } from '@svelte-put/intersect';
 *
 *  let once = false;
 *
 *  function onIntersectOnce(event: CustomEvent<IntersectDetail>) {
 *    const { observer, entries } = event.detail;
 *
 *    // because only one threshold is input for the action, only one entry will be recorded here
 *    const entry = entries[0];
 *    once = entry.isIntersecting; // isIntersecting is always true, meaning the section is being scrolled into view.
 *  }
 *
 *  function onIntersect(event: CustomEvent<IntersectDetail>) {
 *    const { observer, entries } = event.detail;
 *    console.log('action intersect was used on element', observer.target);
 *    console.log('list of IntersectionObserverEntry:', entries);
 *  }
 * </script>
 *
 * <section
 *  class="{once ? 'animate-fade-in-up' : 'opacity-0'}"
 *  use:intersect={{ threshold: 0.4 }}
 *  on:intersectonce={onIntersectOnce}
 *  on:intersect={onIntersect}
 * >
 *  <p>
 *    A section that will fade in once, when intersected with viewport by 40%,
 *    and stays static afterwards. No other `intersectonce` event will be dispatched,
 *    but subsequent `intersect` events will still be listened for.
 *  </p>
 * </section>
 * ```
 *
 * @example
 * Typical use to observe intersection
 *
 * ```html
 * <script lang="ts">
 *  import { intersect, type IntersectDetail } from '@svelte-put/intersect';
 *
 *  let intersecting: boolean | undefined = undefined;
 *
 *  function onIntersect(event: CustomEvent<IntersectDetail>) {
 *    const { observer, entries } = event.detail;
 *    console.log('action intersect was used on element', observer.target);
 *    console.log('list of IntersectionObserverEntry:', entries);
 *
 *    // because only one threshold is input for the action, only one entry will be recorded here
 *    const entry = entries[0];
 *    intersecting = entry.isIntersecting;
 *  }
 * </script>
 *
 * <section
 *  use:intersect={{ threshold: 0.4 }}
 *  on:intersect={onIntersect}
 * >
 * >
 *  <p>
 *    A section that reacts to when scrolling in view (intersecting === true)
 *    and scrolling out of view (intersecting === false)
 *  </p>
 *  {#if intersecting !== undefined}
 *    <p>Scrolling {intersecting ? 'into view' : 'out of view'}...</p>
 *  {/if}
 * </section
 * ```
 *
 * @remarks
 *
 * As with any svelte action, `intersect` should be use with element and not component.
 *
 * ```html
 * <-- correct usage-->
 *  <div use:intersect />
 *
 * <-- incorrect usage-->
 * <Component use:intersect/>
 * ```
 *
 * @param node - HTMLElement to observe
 * @param parameters - svelte action parameters
 * @returns svelte {@link ActionReturn}
 */
interface ObserverConfig {
	observer: IntersectionObserver;
	callbacks: WeakMap<Element, IntersectionObserverCallback>;
	count: number;
}

const observerRegistry = new Map<string, ObserverConfig>();

function getObserverKey(parameters: IntersectParameters): string {
	// We simplify the key by ignoring 'root' since it's almost always null/undefined in this app
	// and WeakMap would be needed for element references.
	const margin = parameters.rootMargin || '0px';
	const threshold = Array.isArray(parameters.threshold)
		? parameters.threshold.join(',')
		: parameters.threshold || 0;
	return `${margin}_${threshold}`;
}

export const intersect: Action<
	HTMLElement,
	IntersectParameters | undefined,
	IntersectAttributes
> = function (
	node,
	parameters = { enabled: true },
): ActionReturn<IntersectParameters | undefined, IntersectAttributes> {
	let hasIntersect = false;
	let previousY = 0;

	let { root, rootMargin, threshold, enabled = true } = parameters;
	let currentKey = getObserverKey(parameters);

	const callback: IntersectionObserverCallback = (entries, observer) => {
		// Because the observer is shared, 'entries' contains entries for ALL observed elements
		// However, we only care about the entry that matches 'node'
		const entry = entries.find((e) => e.target === node);
		if (!entry) return;

		const y = entry.boundingClientRect.y ?? 0;
		const direction = y < previousY ? 'down' : 'up';
		const detail: IntersectDetail = {
			direction,
			boundingClientRect: entry.boundingClientRect,
			intersectionRatio: entry.intersectionRatio,
			intersectionRect: entry.intersectionRect,
			isIntersecting: entry.isIntersecting,
			rootBounds: entry.rootBounds,
			target: entry.target,
			time: entry.time,
		};
		node.dispatchEvent(new CustomEvent('intersectchange', { detail }));
		if (entry.intersectionRatio > 0) {
			node.classList.add('visible');
		} else {
			node.classList.remove('visible');
		}
		if (entry.intersectionRatio > 0) {
			node.dispatchEvent(new CustomEvent('intersect', { detail }));
			if (!hasIntersect && entry.isIntersecting) {
				node.dispatchEvent(new CustomEvent('intersectonce', { detail }));
				hasIntersect = true;
			}
		}
		previousY = y;
	};

	const observeNode = (key: string, params: IntersectParameters) => {
		if (!observerRegistry.has(key)) {
			const callbacks = new WeakMap<Element, IntersectionObserverCallback>();
			const observer = new IntersectionObserver(
				(entries, obs) => {
					entries.forEach((entry) => {
						const cb = callbacks.get(entry.target);
						if (cb) cb([entry], obs);
					});
				},
				{
					root: params.root,
					rootMargin: params.rootMargin,
					threshold: params.threshold,
				},
			);
			observerRegistry.set(key, { observer, callbacks, count: 0 });
		}
		const config = observerRegistry.get(key)!;
		if (!config.callbacks.has(node)) {
			config.callbacks.set(node, callback);
			config.observer.observe(node);
			config.count++;
		}
	};

	const unobserveNode = (key: string) => {
		const config = observerRegistry.get(key);
		if (config && config.callbacks.has(node)) {
			config.observer.unobserve(node);
			config.callbacks.delete(node);
			config.count--;

			if (config.count <= 0) {
				config.observer.disconnect();
				observerRegistry.delete(key);
			}
		}
	};

	if (enabled) {
		observeNode(currentKey, parameters);
	}

	return {
		update(update) {
			update = { enabled: true, ...update };
			const newKey = getObserverKey(update);

			if (currentKey !== newKey) {
				unobserveNode(currentKey);
				currentKey = newKey;
				if (update.enabled) {
					observeNode(currentKey, update);
				}
			} else {
				if (!enabled && update.enabled) {
					observeNode(currentKey, update);
				} else if (enabled && !update.enabled) {
					unobserveNode(currentKey);
				}
			}

			({ root, rootMargin, threshold, enabled = true } = update);
		},
		destroy() {
			unobserveNode(currentKey);
		},
	};
};
