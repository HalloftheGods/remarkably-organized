import type { Action } from 'svelte/action';

export const carousel: Action<HTMLElement, { enabled: boolean }> = (node, options) => {
	let observer: IntersectionObserver | null = null;
	let mutationObserver: MutationObserver | null = null;
	let timeout: ReturnType<typeof setTimeout> | null = null;

	const handleWheel = (e: WheelEvent) => {
		if (e.deltaY !== 0) {
			e.preventDefault();
			node.scrollBy({
				left: e.deltaY * 2,
				behavior: 'auto',
			});
		}
	};

	const handleClickCapture = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		const article = target.closest('article');

		if (article && !article.classList.contains('carousel-active')) {
			e.preventDefault();
			e.stopPropagation();
			article.scrollIntoView({
				behavior: 'smooth',
				inline: 'center',
				block: 'nearest',
			});
			return;
		}

		const anchor = target.closest('a');
		if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
			const targetId = anchor.getAttribute('href')?.substring(1);
			const targetEl = document.getElementById(targetId || '');
			if (targetEl) {
				e.preventDefault();
				e.stopPropagation();
				if (window.history.pushState) {
					window.history.pushState(null, '', anchor.hash);
				} else {
					window.location.hash = anchor.hash;
				}
				targetEl.scrollIntoView({
					behavior: 'smooth',
					inline: 'center',
					block: 'nearest',
				});
			}
		}
	};

	const setup = () => {
		cleanup();
		if (!options.enabled) return;

		timeout = setTimeout(() => {
			observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							entry.target.classList.add('carousel-active');
						} else {
							entry.target.classList.remove('carousel-active');
						}
					});
				},
				{
					root: node,
					rootMargin: '0px -49% 0px -49%',
					threshold: 0,
				},
			);

			const observeArticles = () => {
				const articles = node.querySelectorAll('article');
				articles.forEach((a) => observer?.observe(a));
			};
			observeArticles();

			mutationObserver = new MutationObserver((mutations) => {
				const hasAddedNodes = mutations.some((m) => m.addedNodes.length > 0);
				if (hasAddedNodes) observeArticles();
			});
			mutationObserver.observe(node, { childList: true, subtree: true });
		}, 200);

		node.addEventListener('wheel', handleWheel, { passive: false });
		node.addEventListener('click', handleClickCapture, { capture: true });
	};

	const cleanup = () => {
		if (timeout) clearTimeout(timeout);
		node.removeEventListener('wheel', handleWheel);
		node.removeEventListener('click', handleClickCapture, { capture: true });
		if (observer) observer.disconnect();
		if (mutationObserver) mutationObserver.disconnect();
		node
			.querySelectorAll('article')
			.forEach((a) => a.classList.remove('carousel-active'));
	};

	setup();

	return {
		update(newOptions) {
			options = newOptions;
			setup();
		},
		destroy() {
			cleanup();
		},
	};
};
