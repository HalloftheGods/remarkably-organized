<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	interface Props {
		tag?: 'div' | 'section' | 'article' | 'main' | 'footer' | 'header' | 'span';
		class?: string;
		style?: string;
		transition?: 'toast' | 'fade' | 'none';
		inDuration?: number;
		outDuration?: number;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		tag = 'div',
		class: className = '',
		style = '',
		transition = 'none',
		inDuration = 150,
		outDuration = 150,
		children,
		...rest
	}: Props = $props();
</script>

{#if tag === 'div'}
	{#if transition === 'toast'}
		<div
			class={className}
			{style}
			in:fly={{ y: 20, duration: 400 }}
			out:fade={{ duration: 300 }}
			{...rest}>
			{#if children}
				{@render children()}
			{/if}
		</div>
	{:else if transition === 'fade'}
		<div
			class={className}
			{style}
			in:fade={{ duration: inDuration }}
			{...rest}>
			{#if children}
				{@render children()}
			{/if}
		</div>
	{:else}
		<div class={className} {style} {...rest}>
			{#if children}
				{@render children()}
			{/if}
		</div>
	{/if}
{:else if tag === 'section'}
	<section class={className} {style} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</section>
{:else if tag === 'article'}
	<article class={className} {style} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</article>
{:else if tag === 'main'}
	<main class={className} {style} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</main>
{:else if tag === 'footer'}
	<footer class={className} {style} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</footer>
{:else if tag === 'header'}
	<header class={className} {style} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</header>
{:else if tag === 'span'}
	<span class={className} {style} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</span>
{/if}
