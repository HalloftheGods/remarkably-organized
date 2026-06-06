<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		tag?: 'p' | 'span' | 'small' | 'i' | 'h1' | 'h2' | 'h3' | 'h4' | 'strong' | 'em';
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

{#if tag === 'p'}
	<p class={className} {style} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</p>
{:else if tag === 'span'}
	<span class={className} {style} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</span>
{:else if tag === 'small'}
	<small class={className} {style} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</small>
{:else if tag === 'i'}
	<i class={className} {style} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</i>
{:else if tag === 'h1'}
	<h1 class={className} {style} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</h1>
{:else if tag === 'h2'}
	<h2 class={className} {style} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</h2>
{:else if tag === 'h3'}
	<h3 class={className} {style} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</h3>
{:else if tag === 'h4'}
	<h4 class={className} {style} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</h4>
{:else if tag === 'strong'}
	<strong class={className} {style} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</strong>
{:else if tag === 'em'}
	<em class={className} {style} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</em>
{/if}
