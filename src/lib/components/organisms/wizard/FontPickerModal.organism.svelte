<script lang="ts">
	import { Box, Text, Button } from '$atoms';
	import { Grid } from '$molecules';
	import { WizardStepper } from '$wizard';
	import { fade, scale } from 'svelte/transition';
	import { fonts, getGoogleFontURL } from '$lib';

	import CaretRightIcon from '~icons/fa/caret-right';
	import MagicIcon from '~icons/fa/magic';
	import PencilIcon from '~icons/fa/pencil';
	import FontIcon from '~icons/fa/font';
	import HeaderIcon from '~icons/fa/header';
	import StarIcon from '~icons/fa/star';
	import TerminalIcon from '~icons/fa/terminal';

	let {
		title = '',
		selectedFont = '',
		baseSize = '2rem',
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
			icon: PencilIcon,
			description: 'Fonts that mimic natural handwriting, cursive, or marker strokes.',
			fonts: [
				'Amatic SC',
				'Cabin Sketch',
				'Caveat',
				'Caveat Brush',
				'Dancing Script',
				'Great Vibes',
				'Indie Flower',
				'Just Another Hand',
				'Kalam',
				'Lobster',
				'Pacifico',
				'Parisienne',
				'Patrick Hand',
				'Permanent Marker',
				'Rancho',
				'Sacramento',
				'Satisfy',
				'Shadows Into Light Two',
				'Yellowtail',
			],
		},
		{
			title: 'Sans-Serif',
			icon: FontIcon,
			description:
				'Clean, modern fonts without decorative flourishes on the ends of strokes. Great for readability and modern UI.',
			fonts: [
				'Archivo',
				'Arimo',
				'Asap',
				'Barlow',
				'Cabin',
				'Comfortaa',
				'Dosis',
				'Exo 2',
				'Fira Sans',
				'Heebo',
				'Hind',
				'IBM Plex Sans',
				'Inter',
				'Josefin Sans',
				'Kanit',
				'Karla',
				'Lato',
				'Libre Franklin',
				'Montserrat',
				'Mukta',
				'Mulish',
				'Noto Sans',
				'Nunito',
				'Open Sans',
				'Oxygen',
				'Poppins',
				'Prompt',
				'PT Sans',
				'Questrial',
				'Quicksand',
				'Rajdhani',
				'Raleway',
				'Roboto',
				'Roboto Condensed',
				'Rubik',
				'Signika Negative',
				'Source Sans 3',
				'Titillium Web',
				'Ubuntu',
				'Varela Round',
				'Work Sans',
			],
		},
		{
			title: 'Serif & Slab Serif',
			icon: HeaderIcon,
			description:
				'Classic fonts with "feet" at the ends of strokes, plus thicker slab serifs. Excellent for long-form reading and print-like aesthetics.',
			fonts: [
				'Abhaya Libre',
				'Bitter',
				'Cormorant Garamond',
				'Crimson Text',
				'EB Garamond',
				'Libre Baskerville',
				'Lora',
				'Merriweather',
				'Noto Serif',
				'Playfair Display',
				'PT Serif',
				'Roboto Slab',
				'Spectral',
				'Zilla Slab',
			],
		},
		{
			title: 'Display & Decorative',
			icon: StarIcon,
			description:
				'Bold, highly stylized fonts designed to stand out in large headings or cover titles.',
			fonts: [
				'Abril Fatface',
				'Acme',
				'Alfa Slab One',
				'Anton',
				'Bangers',
				'Bebas Neue',
				'Bungee',
				'Carter One',
				'Cinzel',
				'Creepster',
				'DM Serif Display',
				'Fjalla One',
				'Fredoka One',
				'Lilita One',
				'Orbitron',
				'Oswald',
				'Press Start 2P',
				'Righteous',
				'Teko',
			],
		},
		{
			title: 'Monospace & Specialty',
			icon: TerminalIcon,
			description: 'Fixed-width or novelty fonts for specific aesthetics.',
			fonts: [
				'Fira Code',
				'Inconsolata',
				'Roboto Mono',
				'Source Code Pro',
				'Space Mono',
				'Ubuntu Mono',
				'VT323',
			],
		},
	];

	let activeStep = $state(0);
	let category = $derived(fontCategories[activeStep]);
	let categoryFontsUrl = $derived(getGoogleFontURL(category.fonts));

	function handleKeyup(event: KeyboardEvent) {
		const isEscapeKey = event.key === 'Escape';
		if (isEscapeKey) {
			onClose();
		}
	}
</script>

<svelte:window onkeyup={handleKeyup} />

<svelte:head>
	{#if categoryFontsUrl}
		<link href={categoryFontsUrl} rel="stylesheet" />
	{/if}
</svelte:head>

<div class="font-picker-modal" transition:fade={{ duration: 150 }}>
	<div class="font-picker-content wizard" transition:scale={{ duration: 150 }}>
		<Box class="modal-bg-pattern">
			<Grid display="dotted" />
		</Box>
		<header>
			<Text tag="h2" class="welcome-headline-gradient">Select {title}</Text>
			<Button class="close-btn" onclick={onClose}>✕</Button>
		</header>

		<WizardStepper steps={fontCategories} bind:activeStep />

		<div class="wizard-body">
			<Box class="font-category">
				<Box class="category-header" style="font-family: '{selectedFont}' !important;">
					<Text
						tag="h4"
						class="welcome-headline-gradient"
						style="display: flex; align-items: center; gap: 0.5rem; line-height: 1.2;">
						{category.title}
					</Text>
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
								style="font-family: '{fontOption.name}' !important; font-size: calc({baseSize} * {fontOption.size ||
									1}) !important;"
								onclick={() => onSelect(fontOption.name)}>
								{fontOption.name}
							</button>
							{#if index < category.fonts.length - 1}<span class="csv-comma">,</span>{/if}
						{/if}
					{/each}
				</Box>
			</Box>
		</div>

		<footer class="wizard-footer">
			{#if activeStep === 0}
				<button class="btn-nav" onclick={onClose}>Close</button>
			{:else}
				<button class="btn-nav" onclick={() => activeStep--}>Back</button>
			{/if}

			<div class="footer-center">
				<div class="footer-dots">
					{#each fontCategories as _, index}
						<span class="dot" class:active={activeStep === index}></span>
					{/each}
				</div>
			</div>

			{#if activeStep < fontCategories.length - 1}
				<button class="btn-nav primary welcome-cta-primary" onclick={() => activeStep++}>
					Next
					<CaretRightIcon />
				</button>
			{:else}
				<button class="btn-nav primary welcome-cta-primary" onclick={onClose}>
					Done
					<MagicIcon />
				</button>
			{/if}
		</footer>
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

		:global(.wizard) {
			background-color: var(--bg);
			border-radius: var(--radius-5);
			width: 80%;
			max-width: 1200px;
			min-height: 50vh;
			display: flex;
			flex-direction: column;
			position: relative;
			z-index: 1;
			box-shadow: var(--shadow-6);
			overflow: hidden;

			@media (max-width: 768px) {
				width: 90%;
			}

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
				padding: 1.5rem 2.5rem 1rem;
				position: relative;
				z-index: 1;

				:global(h2) {
					margin: 0;
					font-size: 1.5rem;
					font-weight: 700;
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

			:global(.wizard-body) {
				padding: 2.5rem;
				flex: 1;
				overflow-y: auto;
				position: relative;
				z-index: 1;

				:global(.font-category) {
					display: flex;
					flex-direction: column;
					gap: 1.5rem;

					:global(.category-header) {
						:global(h4) {
							margin: 0 0 0.25rem 0;
							font-size: 1.8rem;
							color: var(--text-high);
						}
						:global(.category-desc) {
							margin: 0;
							font-size: 1rem;
							color: var(--text-low);
							font-family: var(--font-sans) !important;
						}
					}

					:global(.font-csv-list) {
						line-height: 2.2;

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

			:global(.wizard-footer) {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 1.5rem 2.5rem;
				border-top: 1px solid var(--outline);
				border-radius: 0 0 var(--radius-5) var(--radius-5);
				background-color: var(--bg-high);
				position: relative;
				z-index: 1;

				:global(.footer-center) {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 0.5rem;
					flex: 1;

					:global(.footer-dots) {
						display: flex;
						gap: 0.5rem;
						justify-content: center;
						align-items: center;

						:global(.dot) {
							width: 5px;
							height: 5px;
							border-radius: 50%;
							background-color: var(--outline);
							transition: all 0.3s ease;

							&:global(.active) {
								width: 10px;
								height: 10px;
								background: var(--brand-gradient);
								background-size: 200% 200%;
								animation: gradient-shift 4s ease-in-out infinite;
								transform: scale(1.5);
							}
						}
					}
				}

				:global(.btn-nav) {
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 0.5rem;
					padding: 0.75rem 1.5rem;
					border-radius: var(--radius-3);
					border: 1px solid var(--outline);
					background-color: var(--bg);
					color: var(--text);
					font-weight: 600;
					font-size: 0.95rem;
					cursor: pointer;
					transition: all 0.2s ease;
					min-width: 100px;

					&:hover {
						background-color: var(--bg-high);
						border-color: #6b7280;
					}

					&:global(.primary) {
						background: var(--brand-gradient);
						background-size: 200% auto;
						animation: gradient-shift 4s ease infinite;
						color: var(--action-text-high);
						border: none;
						&:hover {
							opacity: 0.9;
						}
					}
				}

				:global(.welcome-cta-primary) {
					display: inline-flex;
					align-items: center;
					gap: 0.5rem;
					padding: 0.7rem 1.5rem;
					border: none;
					border-radius: 12px;
					font-weight: 700;
					font-size: 0.9rem;
					cursor: pointer;
					color: white;
					background: var(--brand-gradient);
					background-size: 200% auto;
					animation: gradient-shift 4s ease infinite;
					box-shadow:
						0 4px 20px rgba(124, 58, 237, 0.3),
						inset 0 1px 0 rgba(255, 255, 255, 0.15);
					transition:
						transform 0.2s ease,
						box-shadow 0.2s ease;

					&:hover {
						transform: translateY(-2px);
						box-shadow:
							0 8px 30px rgba(124, 58, 237, 0.4),
							inset 0 1px 0 rgba(255, 255, 255, 0.15);
					}

					&:active {
						transform: translateY(0);
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
