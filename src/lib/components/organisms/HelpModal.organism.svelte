<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { replaceState } from '$app/navigation';
	import { PlannerSettings } from '$state';
	import { fonts } from '$lib';
	import { trackEvent } from '$lib/analytics';

	// Icons
	import MagicIcon from '~icons/fa/magic';
	import FontIcon from '~icons/fa/font';
	import CalendarIcon from '~icons/fa/calendar';
	import BookIcon from '~icons/fa/book';
	import BookOpenIcon from '~icons/fa-solid/book-open';
	import SaveIcon from '~icons/fa/save';
	import LinkIcon from '~icons/fa/link';
	import ListIcon from '~icons/fa/list-ol';
	import CaretRightIcon from '~icons/fa/caret-right';
	import WizardHatIcon from '~icons/fa-solid/hat-wizard';
	import LoadingIcon from '~icons/eos-icons/bubble-loading';
	import NextIcon from '~icons/fa/arrow-right';
	import StickyNoteIcon from '~icons/fa-solid/sticky-note';

	// Wizard steps
	import {
		WizardWelcome,
		WizardPresets,
		WizardDesign,
		WizardCover,
		WizardSpreads,
		WizardCalendars,
		WizardCalendarNotes,
		WizardCollections,
		WizardIndexes,
		WizardEvents,
		WizardExport,
	} from '$wizard';

	import { PAGE_TEMPLATES } from '$lib/data/templates';
	import GalleryIcon from '~icons/fa/image';

	const appVersion = __APP_VERSION__;

	let {
		onClose = (() => {}) as () => void,
		onOpenPresets = (() => {}) as () => void,
		onOpenGallery = (() => {}) as () => void,
		onPrint = (() => {}) as () => void,
		openTemplatePicker = ((
			_allowed: any[],
			_onSelect: Function,
			_curr: string,
		) => {}) as Function,
		getAvailablePageTemplates = ((_loc: string) => PAGE_TEMPLATES) as Function,
		settings = {} as PlannerSettings,
		isLoading = false,
	} = $props();

	function handleClose() {
		const stepName = steps[activeStep]?.id;
		trackEvent('wizard_close', { step: stepName });
		onClose();
	}

	function handleKeyup(event: KeyboardEvent) {
		const isEscapeKey = event.key === 'Escape';
		if (isEscapeKey) {
			handleClose();
		}
	}

	let activeStep = $state(0);

	$effect(() => {
		const stepName = steps[activeStep]?.id;
		if (stepName) {
			trackEvent('wizard_step_view', {
				step_index: activeStep,
				step_id: stepName,
				step_title: steps[activeStep]?.title,
			});
		}
	});

	function handleConfigChange(event: Event) {
		const target = event.target as HTMLElement;
		const name = target.id || target.getAttribute('name') || target.tagName.toLowerCase();
		let value = '';

		if (target instanceof HTMLInputElement) {
			const isCheckbox = target.type === 'checkbox';
			const isRange = target.type === 'range';
			const isColor = target.type === 'color';
			const isText = target.type === 'text';

			if (isCheckbox) {
				value = target.checked ? 'on' : 'off';
			} else if (isRange) {
				value = target.value;
			} else if (isColor) {
				value = target.value;
			} else if (isText) {
				value = 'updated';
			}
		} else if (target instanceof HTMLSelectElement) {
			value = target.value;
		}

		const hasName = !!name;
		if (hasName) {
			const currentStepName = steps[activeStep]?.id || 'wizard';
			trackEvent('wizard_config_change', {
				step: currentStepName,
				setting_name: name,
				setting_value: value,
			});
		}
	}

	const steps = [
		{ id: 'welcome', title: 'Welcome', icon: WizardHatIcon },
		{ id: 'presets', title: 'Presets', icon: MagicIcon },
		{ id: 'design', title: 'Design', icon: FontIcon },
		{ id: 'cover', title: 'Cover', icon: GalleryIcon },
		{ id: 'spreads', title: 'Spreads', icon: CalendarIcon },
		{ id: 'calendars', title: 'Calendars', icon: BookIcon },
		{ id: 'cal-notes', title: 'Notes', icon: StickyNoteIcon },
		{ id: 'collections', title: 'Collections', icon: BookOpenIcon },
		{ id: 'indexes', title: 'Indexes', icon: ListIcon },
		{ id: 'events', title: 'Events', icon: LinkIcon },
		{ id: 'export', title: 'Export', icon: SaveIcon },
	];

	let isPeeking = $state(false);
	let isLoadingPreset = $state(false);
	let selectedPresetId = $state('');

	let customPresets = $state<
		{ id: string; name: string; icon: string; description: string; config: any }[]
	>([]);

	$effect(() => {
		const isBrowserContext = browser;
		if (isBrowserContext) {
			const stored = localStorage.getItem('ro_custom_presets');
			const hasStoredPresets = !!stored;
			if (hasStoredPresets) {
				try {
					customPresets = JSON.parse(stored);
				} catch (e) {
					console.error('Failed to parse custom presets', e);
				}
			}
			selectedPresetId = localStorage.getItem('ro_selected_preset_id') || 'standard';
		}
	});

	function applyPresetConfig(presetConfig: any, isStandard: boolean) {
		const url = new URL(document.location.href);
		url.searchParams.delete('presets');
		try {
			replaceState(url, {});
		} catch (e) {
			// Ignore error when a navigation is in progress
		}

		const defaultSettings = new PlannerSettings().serialize();
		settings.deserialize(defaultSettings);
		settings.deserialize(presetConfig);
	}

	function handleSelectPreset(preset: any) {
		const isNotBrowser = !browser;
		if (isNotBrowser) return;
		isLoadingPreset = true;

		const isCustomPreset = preset.id.startsWith('custom-');
		trackEvent('wizard_preset_select', {
			preset_id: preset.id,
			preset_name: preset.name,
			is_custom: isCustomPreset,
		});

		setTimeout(() => {
			const isStandardPreset = preset.id === 'standard';
			applyPresetConfig(preset.config, isStandardPreset);
			selectedPresetId = preset.id;
			localStorage.setItem('ro_selected_preset_id', preset.id);

			setTimeout(() => {
				isLoadingPreset = false;
				activeStep = 2;
			}, 400);
		}, 50);
	}

	function handleStartFromScratch() {
		isLoadingPreset = true;

		trackEvent('wizard_preset_select', {
			preset_id: 'scratch',
			preset_name: 'Start from Scratch',
			is_custom: false,
		});

		setTimeout(() => {
			const defaultSettings = new PlannerSettings().serialize();
			applyPresetConfig(defaultSettings, true);
			selectedPresetId = '';
			const isBrowserContext = browser;
			if (isBrowserContext) {
				localStorage.removeItem('ro_selected_preset_id');
			}
			isLoadingPreset = false;
			activeStep = 2;
		}, 50);
	}

	function handleSaveCustomPreset(newPreset: any) {
		customPresets = [...customPresets, newPreset];
		const isBrowserContext = browser;
		if (isBrowserContext) {
			localStorage.setItem('ro_custom_presets', JSON.stringify(customPresets));
		}
		trackEvent('wizard_preset_save', {
			preset_id: newPreset.id,
			preset_name: newPreset.name,
		});
	}

	function handleDeleteCustomPreset(id: string) {
		customPresets = customPresets.filter((p) => p.id !== id);
		const isBrowserContext = browser;
		if (isBrowserContext) {
			localStorage.setItem('ro_custom_presets', JSON.stringify(customPresets));
		}
		trackEvent('wizard_preset_delete', {
			preset_id: id,
		});
	}

	const previewFontsURLs = $derived.by(() => {
		const batchSize = 10;
		const urls: string[] = [];
		const fontNames = fonts.map((f) => f.name);

		for (let i = 0; i < fontNames.length; i += batchSize) {
			const batch = fontNames.slice(i, i + batchSize);
			const params = batch
				.map((name) => `family=${name.replace(/ /g, '+')}:wght@400`)
				.join('&');
			urls.push(`https://fonts.googleapis.com/css2?display=swap&${params}`);
		}

		return urls;
	});
</script>

<svelte:window on:keyup={handleKeyup} />

<div class="help-modal no-print">
	<div
		class="wizard"
		class:peeking={isPeeking}
		class:overflow-visible={[5, 6, 7].includes(activeStep)}
		transition:scale={{ duration: 150 }}>
		<header>
			<h2>Remarkably Organized Planner Wizard</h2>
			<div class="header-actions">
				<button
					class="peek-btn"
					onpointerdown={() => (isPeeking = true)}
					onpointerup={() => (isPeeking = false)}
					onpointerleave={() => (isPeeking = false)}
					title="Hold to Peek">
					👁️
				</button>
				<button class="close-btn" aria-label="Close guide" onclick={handleClose}>
					✕
				</button>
			</div>
		</header>

		<div class="wizard-progress">
			{#each steps as step, index}
				{@const Icon = step.icon}
				<button
					class="step-item"
					class:active={activeStep === index}
					class:completed={activeStep > index}
					onclick={() => (activeStep = index)}
					type="button">
					<div class="step-icon">
						<Icon />
					</div>
					<span class="step-label">{step.title}</span>
				</button>
				{#if index < steps.length - 1}
					<div class="step-separator">
						<CaretRightIcon />
					</div>
				{/if}
			{/each}
		</div>

		<div class="progress-bar" class:active={isLoading || isLoadingPreset}></div>

		<div class="wizard-body" onchange={handleConfigChange}>
			{#if activeStep === 0}
				<WizardWelcome
					onClose={handleClose}
					{steps}
					{settings}
					onStepClick={(index: number) => (activeStep = index)} />
			{:else if activeStep === 1}
				<WizardPresets
					{customPresets}
					{selectedPresetId}
					onSelectPreset={handleSelectPreset}
					onStartFromScratch={handleStartFromScratch}
					onDeleteCustomPreset={handleDeleteCustomPreset} />
			{:else if activeStep === 2}
				<WizardDesign {settings} />
			{:else if activeStep === 3}
				<WizardCover {settings} />
			{:else if activeStep === 4}
				<WizardSpreads {settings} />
			{:else if activeStep === 5}
				<WizardCalendars {settings} {openTemplatePicker} {getAvailablePageTemplates} />
			{:else if activeStep === 6}
				<WizardCalendarNotes
					{settings}
					{openTemplatePicker}
					{getAvailablePageTemplates} />
			{:else if activeStep === 7}
				<WizardCollections {settings} {openTemplatePicker} {getAvailablePageTemplates} />
			{:else if activeStep === 8}
				<WizardIndexes {settings} />
			{:else if activeStep === 9}
				<WizardEvents {settings} />
			{:else if activeStep === 10}
				<WizardExport
					{settings}
					onClose={handleClose}
					onSaveCustomPreset={handleSaveCustomPreset}
					{onPrint} />
			{/if}
		</div>

		<footer class="wizard-footer">
			{#if activeStep === 0}
				<button class="btn-nav" onclick={handleClose}>Close Wizard</button>
			{:else}
				<button class="btn-nav" onclick={() => activeStep--}>Back</button>
			{/if}
			<div class="footer-center">
				<div class="footer-dots">
					{#each steps as _, index}
						<span class="dot" class:active={activeStep === index}></span>
					{/each}
				</div>
				<span class="version">v{appVersion}</span>
			</div>
			{#if activeStep < steps.length - 1}
				{#if activeStep === 0}
					<button
						class="btn-nav primary welcome-cta-primary"
						onclick={() => activeStep++}>
						<span>Show me the Magic!</span>
						<MagicIcon />
					</button>
				{:else}
					<button
						class="btn-nav primary welcome-cta-primary"
						onclick={() => activeStep++}>
						Next Trick
						<MagicIcon />
					</button>
				{/if}
			{:else}
				<a
					href="https://www.buymeacoffee.com/youmeos"
					target="_blank"
					rel="noopener noreferrer"
					onclick={handleClose}
					class="buy-coffee-link"
					style="display: flex; align-items: center; justify-content: center; overflow: visible; height: 50px;">
					<img
						src="https://img.buymeacoffee.com/button-api/?text=Abracadabra!&emoji=🧞‍♂️&slug=youmeos&button_colour=555555&font_colour=ffffff&font_family=Cookie&outline_colour=000000&coffee_colour=FFDD00"
						alt="Buy a Taco"
						style="height: 100%; border-radius: var(--radius-3); box-shadow: var(--shadow-2);" />
				</a>
			{/if}
		</footer>
	</div>
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="help-bg"
		class:peeking={isPeeking}
		role="presentation"
		transition:fade={{ duration: 150 }}
		onclick={handleClose}>
	</div>
</div>

<svelte:head>
	{#each previewFontsURLs as url}
		<link rel="stylesheet" href={url} />
	{/each}
</svelte:head>

<style lang="scss">
	@keyframes shimmer-progress-wizard {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}

	.help-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(4px);
		z-index: 50;
		transition: opacity 0.2s ease;
		&.peeking {
			opacity: 0 !important;
		}
	}

	.help-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
		overflow-y: auto;
		padding: 2rem 0;

		@media (max-width: 768px) {
			padding: 0;
		}

		.wizard {
			background-color: var(--bg);
			color: var(--text);
			border-radius: var(--radius-5);
			box-shadow: var(--shadow-6);
			width: 55%;
			max-width: 1200px;
			min-height: 92vh;
			height: auto;
			position: relative;
			z-index: 100;
			display: flex;
			flex-direction: column;
			border: 1px solid var(--outline);
			margin: auto;
			overflow: hidden;

			&.overflow-visible {
				@media (min-width: 769px) {
					overflow: visible;
				}
			}

			@media (max-width: 768px) {
				width: 100% !important;
				max-width: 100% !important;
				height: 100% !important;
				max-height: 100% !important;
				border-radius: 0 !important;
				border: none !important;

				header {
					padding: 1.25rem 1.5rem 1rem !important;
					h2 {
						font-size: 1.3rem !important;
					}
				}

				.wizard-progress {
					padding: 0 1rem 1rem !important;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					row-gap: 0.75rem;

					.step-item {
						flex: 0 0 18%;
						.step-icon {
							width: 2rem;
							height: 2rem;
							font-size: 0.85rem;
							margin: 0 auto;
						}
						.step-label {
							display: none;
						}
					}

					.step-separator {
						display: none !important;
					}
				}

				.wizard-body {
					padding: 1.25rem 1rem !important;
					overflow-y: auto !important;
					overflow-x: hidden !important;

					:global(.step-content) {
						height: auto !important;
					}
				}

				.wizard-footer {
					padding: 1rem 1.5rem !important;
					border-radius: 0 !important;

					.btn-nav {
						padding: 0.6rem 1rem;
						min-width: 80px;
						font-size: 0.85rem;
					}
				}
			}
			header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 2rem 2.5rem 1.5rem;
				h2 {
					margin: 0;
					font-size: 1.85rem;
					font-weight: 700;
				}
				.header-actions {
					display: flex;
					align-items: center;
					gap: 0.5rem;
				}
			}

			&.peeking {
				opacity: 0.15;
				pointer-events: none;
				transition: opacity 0.2s ease;

				.peek-btn {
					pointer-events: auto;
				}
			}

			.peek-btn {
				width: 2.25rem;
				height: 2.25rem;
				padding: 0;
				border-radius: var(--radius-round);
				border: 1px solid var(--outline);
				background-color: var(--bg-high);
				color: var(--text);
				font-size: 1rem;
				cursor: grab;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 0.2s ease;
				flex-shrink: 0;
				&:hover {
					background-color: var(--action);
					border-color: var(--action);
				}
				&:active {
					cursor: grabbing;
					transform: scale(0.95);
				}
			}

			.close-btn {
				width: 2.25rem;
				height: 2.25rem;
				padding: 0;
				border-radius: var(--radius-round);
				border: 1px solid var(--outline);
				background-color: var(--bg-high);
				color: var(--text);
				font-size: 1rem;
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 0.2s ease;
				flex-shrink: 0;
				&:hover {
					background-color: var(--action);
					color: var(--action-text);
					border-color: var(--action);
				}
			}

			.wizard-progress {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 2.5rem 1.5rem;
				border-bottom: 1px solid var(--outline);

				.step-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					flex: 1;
					opacity: 0.4;
					transition: opacity 0.3s ease;
					background: none;
					border: none;
					padding: 0;
					cursor: pointer;
					font-family: inherit;

					.step-icon {
						width: 2.5rem;
						height: 2.5rem;
						border-radius: 50%;
						background-color: var(--bg-high);
						border: 2px solid var(--outline);
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 1rem;
						color: var(--text-low);
						z-index: 2;
						transition: all 0.3s ease;
					}

					.step-label {
						margin-top: 0.5rem;
						font-size: 0.7rem;
						font-weight: 600;
						text-transform: uppercase;
						letter-spacing: 0.05em;
						color: var(--text-low);
						transition: all 0.3s ease;
					}

					&.active {
						opacity: 1;

						.step-icon {
							background: var(--brand-gradient);
							background-size: 200% 200%;
							animation: gradient-shift 4s ease-in-out infinite;
							border-color: transparent;
							color: #ffffff;
							:global(svg) {
								fill: white;
							}
						}
						.step-label {
							color: var(--text);
						}
					}

					&.completed {
						.step-icon {
							background-color: var(--bg-high);
							border-color: var(--outline);
							color: var(--text-low);
						}
						.step-label {
							color: var(--text-low);
						}
					}
				}

				.step-separator {
					display: flex;
					align-items: center;
					justify-content: center;
					color: var(--outline);
					opacity: 0.8;
					font-size: 0.95rem;
					height: 2.5rem;
					align-self: flex-start;
					margin: 0 -0.25rem;
				}
			}

			.progress-bar {
				height: 4px;
				width: 100%;
				background: var(--brand-gradient);
				background-size: 200% 100%;
				animation: gradient-shift 1.5s infinite linear;
				opacity: 0;
				pointer-events: none;
				transition: opacity 0.3s;
				flex-shrink: 0;

				&.active {
					opacity: 1;
				}
			}

			.wizard-body {
				padding: 2.5rem;
				flex: 1;
				overflow: visible;
				min-height: 250px;

				:global(.step-content) {
					height: 100%;

					:global(h3) {
						margin: 0 0 0.5rem;
						font-size: 1.4rem;
						font-weight: 600;
						color: var(--text);
					}
					:global(p) {
						font-size: 0.95rem;
						line-height: 1.5;
						margin: 0 0 0.75rem;
						opacity: 0.85;
					}
					:global(ul) {
						margin: 0;
						padding-left: 1.25rem;
						display: flex;
						flex-direction: column;
						gap: 0.75rem;
						:global(li) {
							font-size: 0.9rem;
							line-height: 1.5;
							:global(strong) {
								color: var(--text-high);
							}
						}
					}
				}
			}

			.wizard-footer {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 1.5rem 2.5rem;
				border-top: 1px solid var(--outline);
				border-radius: 0 0 var(--radius-5) var(--radius-5);
				background-color: var(--bg-high);

				.footer-center {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 0.5rem;
					flex: 1;

					.version {
						font-size: 0.7rem;
						font-weight: 600;
						color: var(--text-low);
						letter-spacing: 0.05em;
						text-transform: uppercase;
						opacity: 0.5;
					}

					.footer-dots {
						display: flex;
						gap: 0.5rem;

						.dot {
							width: 6px;
							height: 6px;
							border-radius: 50%;
							background-color: var(--outline);
							transition: all 0.3s ease;

							&.active {
								background: var(--brand-gradient);
								background-size: 200% 200%;
								animation: gradient-shift 4s ease-in-out infinite;
								transform: scale(1.5);
							}
						}
					}
				}

				.btn-nav {
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

					&:disabled {
						opacity: 0.3;
						cursor: not-allowed;
					}

					&:not(:disabled):hover {
						background-color: var(--bg-high);
						border-color: #6b7280;
					}

					&.primary {
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

				.welcome-cta-primary {
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
</style>
