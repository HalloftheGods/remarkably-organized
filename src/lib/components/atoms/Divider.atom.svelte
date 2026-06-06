<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		tag?: 'div' | 'span';
		class?: string;
		style?: string;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		tag = 'div',
		class: className = '',
		style = '',
		children,
		...rest
	}: Props = $props();
</script>

{#if tag === 'div'}
	<div class={className} {style} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</div>
{:else if tag === 'span'}
	<span class={className} {style} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</span>
{/if}
