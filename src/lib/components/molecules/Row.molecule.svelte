<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Box, Checkbox } from '$atoms';

	interface Props {
		class?: string;
		style?: string;
		checked?: boolean;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		class: className = '',
		style = '',
		checked = false,
		children,
		...rest
	}: Props = $props();
</script>

<Box class="row-item {className}" {style} {...rest}>
	<Checkbox {checked} />
	<Box class="line">
		{#if children}
			{@render children()}
		{/if}
	</Box>
</Box>
