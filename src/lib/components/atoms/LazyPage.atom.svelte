<script lang="ts">
	import { intersect, type IntersectDetail } from '$lib';
	import { getContext } from 'svelte';
	import type { PrintManager } from '$state';

	let {
		children,
		sidebar,
		isPreparingPrint = false,
		showSidebar = true,
		forceVisible = false,
		class: className = '',
		...rest
	}: {
		children: import('svelte').Snippet;
		sidebar?: import('svelte').Snippet;
		isPreparingPrint?: boolean;
		showSidebar?: boolean;
		forceVisible?: boolean;
		class?: string;
		[key: string]: any;
	} = $props();

	let isVisible = $state(false);
	let printMounted = $state(false);

	const printManager = getContext<PrintManager>('printManager');

	function onIntersectChange(event: CustomEvent<IntersectDetail>) {
		if (isPreparingPrint) return;
		if (event.detail.isIntersecting) {
			isVisible = true;
		} else {
			isVisible = false;
		}
	}

	$effect(() => {
		if (isPreparingPrint && !printMounted) {
			if (isVisible) {
				printMounted = true;
			} else {
				printManager?.registerMount(() => {
					printMounted = true;
				});
			}
		} else if (!isPreparingPrint && printMounted) {
			printMounted = false;
		}
	});

	const shouldRender = $derived(
		isVisible || printMounted || forceVisible
	);
</script>

<article
	use:intersect={{ rootMargin: '1000px 0px 1000px 0px', enabled: !isPreparingPrint && !forceVisible }}
	on:intersectchange={onIntersectChange}
	class={className}
	class:force-visible={forceVisible || printMounted}
	class:visible={forceVisible || isVisible || printMounted}
	{...rest}>
	{#if sidebar && showSidebar}
		{#if shouldRender}
			{@render sidebar()}
		{:else}
			<div class="mock-sidebar"></div>
		{/if}
	{/if}
	{#if shouldRender}
		{@render children()}
	{/if}
</article>

<style>
	article.force-visible {
		display: block !important;
		opacity: 1 !important;
		visibility: visible !important;
	}
</style>
