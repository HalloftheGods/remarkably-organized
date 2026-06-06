<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Box, Text, Link } from '$atoms';

	interface Props {
		href?: string;
		class?: string;
		style?: string;
		date?: number | string;
		moonEmoji?: string;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		href,
		class: className = '',
		style = '',
		date,
		moonEmoji = '',
		children,
		...rest
	}: Props = $props();

	const Wrapper = $derived(href ? Link : Box);
</script>

<Wrapper {href} class="calendar-cell {className}" {style} {...rest}>
	<Box class="date-header">
		{#if moonEmoji}
			<Text tag="span" class="moon">{moonEmoji}</Text>
		{/if}
		{#if date !== undefined}
			<Text tag="span" class="date">{date}</Text>
		{/if}
	</Box>
	<Box class="cell-content">
		{#if children}
			{@render children()}
		{/if}
	</Box>
</Wrapper>

<style lang="scss">
	:global {
		.calendar-cell {
			display: flex;
			flex-direction: column;
			justify-content: start;
			font-size: 1.05em;
			font-weight: var(--font-weight-light);
			border-left: solid 1px var(--outline);
			line-height: 1;
			min-height: 0;
			overflow: hidden;
			text-decoration: none;
			color: inherit;

			&.border-top {
				border-top: solid 1px var(--outline);
			}

			&.dim {
				opacity: 0.2;
				pointer-events: none;
			}

			&.alt-row {
				background-color: rgba(0, 0, 0, 0.015);
			}

			&.muted {
				color: var(--text-low);
				opacity: 0.5;
			}

			.date-header {
				margin: 0.5rem 0.5rem -0.25rem 0.5rem;
				display: flex;
				justify-content: end;
				align-items: start;

				.moon {
					margin-right: auto;
					font-size: 1.25em;
					line-height: 1;
				}
			}

			.cell-content {
				display: flex;
				flex-direction: column;
				gap: 0.35rem;
				justify-content: space-evenly;
				flex: 1;
			}
		}
	}
</style>
