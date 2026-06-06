<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Box, Text, Icon } from '$atoms';

	interface Props {
		class?: string;
		icon: any;
		text?: string;
		children?: Snippet;
	}

	let { class: className = '', icon: IconComp, text = '', children }: Props = $props();
</script>

<Box class={className}>
	<Icon>
		<IconComp />
	</Icon>
	{#if children}
		{@render children()}
	{:else}
		<Text>{text}</Text>
	{/if}
</Box>

<style lang="scss">
	:global(.free-badge),
	:global(.templates-badge) {
		position: absolute;
		color: #5d2b00;
		font-weight: 900;
		font-size: 1rem;
		padding: 0.5rem 1.25rem;
		border-radius: 999px;
		z-index: 10;
		border: 2px solid #fff;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		letter-spacing: 0.5px;
		transition:
			transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
			box-shadow 0.4s ease;
		pointer-events: none;

		@include tablet {
			font-size: 1.25rem;
			padding: 0.75rem 2rem;
		}
	}

	:global(.free-badge) {
		top: -10px;
		left: -10px;
		background: linear-gradient(135deg, #fcd34d, #f59e0b);
		box-shadow:
			0 10px 25px rgba(245, 158, 11, 0.4),
			inset 0 2px 4px rgba(255, 255, 255, 0.6);
		transform: rotate(-8deg);

		@include tablet {
			top: -15px;
			left: -20px;
		}
	}

	:global(.templates-badge) {
		bottom: -12px;
		left: 50%;
		white-space: nowrap;
		background: linear-gradient(135deg, #7dd3fc, #0284c7);
		color: #fff;
		font-size: 0.75rem;
		padding: 0.4rem 1rem;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
		box-shadow:
			0 10px 25px rgba(56, 189, 248, 0.4),
			inset 0 2px 4px rgba(255, 255, 255, 0.4);
		transform: translateX(-50%);

		@include tablet {
			bottom: -18px;
			font-size: 1rem;
			padding: 0.6rem 1.75rem;
		}
	}
</style>
