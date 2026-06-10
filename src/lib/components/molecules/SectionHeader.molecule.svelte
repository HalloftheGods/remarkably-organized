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

