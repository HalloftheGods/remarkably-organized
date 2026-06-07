<script lang="ts">
	import { Box, Text, Input, Button } from '$atoms';
	import { fade, scale } from 'svelte/transition';
	import { fonts } from '$lib';

	let {
		title = '',
		selectedFont = '',
		baseSize = '1.1rem',
		onSelect = (fontName: string) => {},
		onClose = () => {},
	} = $props<{
		title?: string;
		selectedFont?: string;
		baseSize?: string;
		onSelect?: (fontName: string) => void;
		onClose?: () => void;
	}>();
</script>

<div class="font-picker-modal" transition:fade={{ duration: 150 }}>
	<div class="font-picker-content" transition:scale={{ duration: 150 }}>
		<header>
			<Text tag="h3" class="welcome-headline-gradient">Select {title}</Text>
			<Button class="close-btn" onclick={onClose}>✕</Button>
		</header>
		<Box class="font-csv-list">
			{#each fonts as fontOption, index}
				{@const isSelected = selectedFont === fontOption.name}
				<Button
					type="button"
					class="font-csv-item {isSelected ? 'selected' : ''}"
					style="font-family: '{fontOption.name}' !important; font-size: calc({baseSize} * {fontOption.size ||
						1}) !important;"
					onclick={() => onSelect(fontOption.name)}>
					{fontOption.name}
				</Button>
				{#if index < fonts.length - 1}
					<span class="separator">,</span>
				{/if}
			{/each}
		</Box>
	</div>
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_interactive_supports_focus -->
	<Box
		class="font-picker-bg"
		role="button"
		tabindex="0"
		onclick={onClose}
		onkeydown={(e: any) => e.key === 'Enter' && onClose()}>
	</Box>
</div>

<style lang="scss">
	:global(.font-picker-modal) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 200;

		:global(.font-picker-bg) {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.5);
			backdrop-filter: blur(4px);
			z-index: 0;
		}

		:global(.font-picker-content) {
			background-color: var(--bg);
			border: 1px solid var(--outline);
			border-radius: var(--radius-4);
			width: 90%;
			max-width: 600px;
			max-height: 80vh;
			display: flex;
			flex-direction: column;
			position: relative;
			z-index: 1;
			box-shadow: var(--shadow-6);

			header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 1.5rem;
				border-bottom: 1px solid var(--outline);

				h3 {
					margin: 0;
					font-size: 1.2rem;
				}

				:global(.close-btn) {
					background: none;
					border: none;
					color: var(--text-low);
					cursor: pointer;
					font-size: 1.2rem;
					padding: 0.5rem;
					display: flex;
					align-items: center;
					justify-content: center;

					&:hover {
						color: var(--text);
					}
				}
			}

			:global(.font-csv-list) {
				padding: 1.5rem;
				overflow-y: auto;
				display: flex;
				flex-wrap: wrap;
				gap: 0.25rem 0.5rem;
				align-items: baseline;

				:global(.font-csv-item) {
					background: none;
					border: none;
					padding: 0;
					color: var(--text);
					cursor: pointer;
					line-height: 1.2;
					text-decoration: underline;
					text-decoration-color: transparent;
					transition: all 0.2s ease;

					&:hover {
						color: var(--action);
						text-decoration-color: var(--action);
					}

					&:global(.selected) {
						color: var(--action);
						font-weight: bold;
						text-decoration-color: var(--action);
					}
				}

				:global(.separator) {
					color: var(--text-low);
					opacity: 0.5;
				}
			}
		}
	}
	:global(.welcome-headline-gradient) {
		background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #a78bfa 100%);
		background-size: 200% auto;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: gradient-shift 4s ease-in-out infinite;
	}
	@keyframes gradient-shift {
		0%,
		100% {
			background-position: 0% center;
		}
		50% {
			background-position: 100% center;
		}
	}
</style>
