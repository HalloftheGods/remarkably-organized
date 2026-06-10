<script lang="ts">
	import { Box, Text, Button } from '$atoms';
	import { Grid } from '$molecules';
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

	const fontCategories = [
		{
			title: 'Handwriting & Script',
			description: 'Fonts that mimic natural handwriting, cursive, or marker strokes.',
			fonts: [
				'Caveat',
				'Caveat Brush',
				'Dancing Script',
				'Indie Flower',
				'Just Another Hand',
				'Lobster',
				'Pacifico',
				'Permanent Marker',
				'Rancho',
				'Satisfy',
				'Shadows Into Light Two',
			],
		},
		{
			title: 'Sans-Serif',
			description:
				'Clean, modern fonts without decorative flourishes on the ends of strokes. Great for readability and modern UI.',
			fonts: [
				'Inter',
				'Montserrat',
				'Noto Sans',
				'Poppins',
				'Rajdhani',
				'Roboto',
				'Roboto Condensed',
			],
		},
		{
			title: 'Serif & Slab Serif',
			description:
				'Classic fonts with "feet" at the ends of strokes, plus thicker slab serifs. Excellent for long-form reading and print-like aesthetics.',
			fonts: ['Crimson Text', 'Merriweather', 'PT Serif', 'Roboto Slab'],
		},
		{
			title: 'Display & Decorative',
			description:
				'Bold, highly stylized fonts designed to stand out in large headings or cover titles.',
			fonts: [
				'Abril Fatface',
				'Acme',
				'Anton',
				'Bebas Neue',
				'Cinzel',
				'DM Serif Display',
				'Lilita One',
				'Orbitron',
				'Playfair Display',
				'Righteous',
			],
		},
		{
			title: 'Monospace & Specialty',
			description: 'Fixed-width or novelty fonts for specific aesthetics.',
			fonts: ['VT323'],
		},
	];
</script>

<div class="font-picker-modal" transition:fade={{ duration: 150 }}>
	<div class="font-picker-content" transition:scale={{ duration: 150 }}>
		<Box class="modal-bg-pattern">
			<Grid display="dotted" />
		</Box>
		<Box tag="header">
			<Text tag="h3" class="welcome-headline-gradient">Select {title}</Text>
			<Button class="close-btn" onclick={onClose}>✕</Button>
		</Box>
		<Box class="font-categories-grid">
			{#each fontCategories as category}
				<Box class="font-category">
					<Box class="category-header" style="font-family: '{selectedFont}' !important;">
						<Text tag="h4">{category.title}</Text>
						{#if category.description}
							<Text tag="p" class="category-desc">{category.description}</Text>
						{/if}
					</Box>
					<Box class="font-csv-list">
						{#each category.fonts as fontName, index}
							{@const fontOption = fonts.find((f: any) => f.name === fontName)}
							{#if fontOption}
								{@const isSelected = selectedFont === fontOption.name}
								<button
									type="button"
									class="csv-font-btn {isSelected ? 'selected' : ''}"
									style="font-family: '{fontOption.name}' !important; font-size: calc({baseSize} * {fontOption.size || 1}) !important;"
									onclick={() => onSelect(fontOption.name)}>
									{fontOption.name}
								</button>{#if index < category.fonts.length - 1}<span class="csv-comma">, </span>{/if}
							{/if}
						{/each}
					</Box>
				</Box>
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
			border-radius: var(--radius-4);
			width: 90%;
			max-width: 1200px;
			max-height: 80vh;
			display: flex;
			flex-direction: column;
			position: relative;
			z-index: 1;
			box-shadow: var(--shadow-6);
			overflow: hidden;

			:global(.modal-bg-pattern) {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 0;
				opacity: 0.5;
				pointer-events: none;
			}

			:global(header) {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 1.5rem;
				position: relative;
				z-index: 1;

				:global(h3) {
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

			:global(.font-categories-grid) {
				padding: 0 1.5rem 1.5rem 1.5rem;
				overflow-y: auto;
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				grid-template-rows: repeat(2, 1fr);
				gap: 2rem;
				position: relative;
				z-index: 1;

				@media (max-width: 900px) {
					grid-template-columns: repeat(2, 1fr);
					grid-template-rows: auto;
				}

				@media (max-width: 600px) {
					grid-template-columns: 1fr;
					grid-template-rows: auto;
				}

				:global(.font-category) {
					display: flex;
					flex-direction: column;
					gap: 1rem;

					:global(.category-header) {
						:global(h4) {
							margin: 0 0 0.25rem 0;
							font-size: 1.3rem;
							color: var(--text-high);
						}
						:global(.category-desc) {
							margin: 0;
							font-size: 0.85rem;
							color: var(--text-low);
							font-family: var(--font-sans) !important;
						}
					}

					:global(.font-csv-list) {
						line-height: 2;
						
						:global(.csv-font-btn) {
							background: none;
							border: none;
							padding: 0;
							color: var(--text);
							cursor: pointer;
							transition: all 0.2s ease;
							text-decoration: underline;
							text-decoration-color: transparent;

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

						:global(.csv-comma) {
							color: var(--text-low);
							margin-right: 0.25rem;
						}
					}
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
