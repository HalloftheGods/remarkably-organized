<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string;
		target?: string;
		rel?: string;
		class?: string;
		style?: string;
		onclick?: (event: MouseEvent) => void;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		href = '',
		target = '',
		rel = '',
		class: className = '',
		style = '',
		onclick,
		children,
		...rest
	}: Props = $props();
</script>

<a {href} {target} {rel} class={className} {style} {onclick} {...rest}>
	{#if children}
		{@render children()}
	{/if}
</a>
