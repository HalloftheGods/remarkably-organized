<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Box, Text } from '$atoms';

	interface Props {
		label?: string;
		class?: string;
		style?: string;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		label = '',
		class: className = '',
		style = '',
		children,
		...rest
	}: Props = $props();
</script>

<Box class="section-header {className}" {style} {...rest}>
	{#if children}
		{@render children()}
	{:else}
		<Text tag="strong">{label}</Text>
	{/if}
</Box>

<style lang="scss">
	:global {
		.section-header {
			font-size: 0.8rem;
			font-weight: bold;
			color: var(--text-low);
			border-bottom: 2px solid var(--outline);
			padding-bottom: 0.25rem;
			margin-bottom: 0.5rem;
			letter-spacing: 0.5px;
			text-transform: uppercase;
			width: 100%;
		}
	}
</style>
