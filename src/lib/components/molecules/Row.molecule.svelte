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

<Box class="row {className}" {style} {...rest}>
	<Checkbox {checked} />
	<Box class="line">
		{#if children}
			{@render children()}
		{/if}
	</Box>
</Box>

<style lang="scss">
	:global {
		.row {
			display: flex;
			align-items: flex-end;
			gap: 0.75rem;
			width: 100%;

			.line {
				flex: 1;
				border-bottom: 1px solid var(--outline);
				min-height: 1.5rem;
			}
		}
	}
</style>
