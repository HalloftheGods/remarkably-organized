<script lang="ts">
	import { intersect, type IntersectDetail } from '$lib';

	let {
		children,
		sidebar,
		isPreparingPrint = false,
		showSidebar = true,
		class: className = '',
		...rest
	}: {
		children: import('svelte').Snippet;
		sidebar?: import('svelte').Snippet;
		isPreparingPrint?: boolean;
		showSidebar?: boolean;
		class?: string;
		[key: string]: any;
	} = $props();

	let isVisible = $state(false);

	function onIntersectChange(event: CustomEvent<IntersectDetail>) {
		if (event.detail.isIntersecting) {
			isVisible = true;
		} else {
			isVisible = false;
		}
	}
</script>

<article
	use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}
	on:intersectchange={onIntersectChange}
	class={className}
	{...rest}>
	{#if sidebar && showSidebar}
		{#if isVisible || isPreparingPrint}
			{@render sidebar()}
		{:else}
			<div class="mock-sidebar"></div>
		{/if}
	{/if}
	{#if isVisible || isPreparingPrint}
		{@render children()}
	{/if}
</article>
