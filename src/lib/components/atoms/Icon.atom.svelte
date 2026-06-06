<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		tag?: 'svg' | 'span' | 'div';
		class?: string;
		style?: string;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		tag = 'span',
		class: className = '',
		style = '',
		children,
		...rest
	}: Props = $props();
</script>

{#if tag === 'svg'}
	<svg class={className} {style} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</svg>
{:else if tag === 'span'}
	<span class={className} {style} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</span>
{:else if tag === 'div'}
	<div class={className} {style} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</div>
{/if}
