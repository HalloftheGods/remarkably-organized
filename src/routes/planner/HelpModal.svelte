<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { PRESETS } from '$lib/data/presets';
	import { THEMES } from '$lib/data/themes';
	import { browser } from '$app/environment';
	import { fonts } from '../fonts/fonts';
	import type { PlannerSettings } from '$lib/state/planner-settings.svelte';
	import MagicIcon from '~icons/fa/magic';
	import FontIcon from '~icons/fa/font';
	import CalendarIcon from '~icons/fa/calendar';
	import BookIcon from '~icons/fa/book';
	import PuzzleIcon from '~icons/fa/puzzle-piece';
	import SaveIcon from '~icons/fa/save';
	import KeyboardIcon from '~icons/fa/keyboard-o';
	import LinkIcon from '~icons/fa/link';
	import CaretRightIcon from '~icons/fa/caret-right';

	const appVersion = __APP_VERSION__;

	let {
		onClose = (() => {}) as () => void,
		onOpenPresets = (() => {}) as () => void,
		onOpenGallery = (() => {}) as () => void,
		settings = {} as PlannerSettings,
	} = $props();

	function handleKeyup(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
		}
	}

	let activeStep = $state(0);

	const steps = [
		{ id: 'presets', title: 'Presets', icon: MagicIcon },
		{ id: 'design', title: 'Design', icon: FontIcon },
		{ id: 'calendar', title: 'Calendar', icon: CalendarIcon },
		{ id: 'templates', title: 'Templates', icon: BookIcon },
		{ id: 'collections', title: 'Collections', icon: PuzzleIcon },
		{ id: 'events', title: 'Events', icon: LinkIcon },
		{ id: 'export', title: 'Export', icon: SaveIcon },
	];

	const featuredPresets = PRESETS.filter(
		(preset) =>
			preset.id === 'minimalist' ||
			preset.id === 'standard' ||
			preset.id === 'author-setup'
	).map((preset) => {
		const isMinimalist = preset.id === 'minimalist';
		const isStandard = preset.id === 'standard';
		const displayName = isMinimalist ? 'Minimalist' : isStandard ? 'Standard' : "Author's";
		return {
			...preset,
			displayName
		};
	});

	function loadPreset(preset: (typeof PRESETS)[number]) {
		if (!browser) return;
		const url = new URL(document.location.href);
		const isStandardPreset = preset.id === 'standard';
		if (isStandardPreset) {
			url.searchParams.delete('settings');
		} else {
			url.searchParams.set('settings', JSON.stringify(preset.config));
		}
		window.history.replaceState({}, '', url);
		window.location.reload();
	}

	function cycleFont(type: 'font' | 'fontDisplay', direction: 'next' | 'prev') {
		const currentFontName = type === 'font' ? settings.design.font : settings.design.fontDisplay;
		const currentIndex = fonts.findIndex((f) => f.name === currentFontName);
		const fontNotFound = currentIndex === -1;
		if (fontNotFound) return;

		const isNext = direction === 'next';
		let newIndex = currentIndex + (isNext ? 1 : -1);
		const reachedEnd = newIndex >= fonts.length;
		const reachedStart = newIndex < 0;

		if (reachedEnd) {
			newIndex = 0;
		} else if (reachedStart) {
			newIndex = fonts.length - 1;
		}

		const isBodyFont = type === 'font';
		if (isBodyFont) {
			settings.design.font = fonts[newIndex].name;
		} else {
			settings.design.fontDisplay = fonts[newIndex].name;
		}
	}

	function applyTheme(themeId: string) {
		const theme = THEMES.find((t) => t.id === themeId);
		if (!theme) return;

		settings.design.themeId = theme.id;
		settings.design.font = theme.config.design.font;
		settings.design.fontDisplay = theme.config.design.fontDisplay;
		settings.design.colorBg = theme.config.design.colorBg;
		settings.design.colorNavBg = theme.config.design.colorNavBg;
		settings.design.colorText = theme.config.design.colorText;
		settings.design.colorLines = theme.config.design.colorLines;
		settings.design.colorDots = theme.config.design.colorDots;

		settings.coverPage.font = theme.config.coverPage.font;
		settings.coverPage.darkBackground = theme.config.coverPage.darkBackground;
		if (theme.config.coverPage.backgroundStyle) {
			settings.coverPage.backgroundStyle = theme.config.coverPage.backgroundStyle;
		}
		if (theme.config.coverPage.backgroundSeed !== undefined) {
			settings.coverPage.backgroundSeed = theme.config.coverPage.backgroundSeed;
		}
		if (theme.config.coverPage.backgroundComplexity !== undefined) {
			settings.coverPage.backgroundComplexity = theme.config.coverPage.backgroundComplexity;
		}
		if (theme.config.coverPage.backgroundPalette) {
			settings.coverPage.backgroundPalette = [...theme.config.coverPage.backgroundPalette];
		}

		settings.topNav.font = theme.config.topNav.font;
		settings.sideNav.font = theme.config.sideNav.font;

		if (theme.config.dashboardPage?.fontSize !== undefined) {
			settings.dashboardPage.fontSize = theme.config.dashboardPage.fontSize;
		}
	}
</script>

<svelte:window on:keyup={handleKeyup} />

<div class="help-modal">
	<div class="wizard" transition:scale={{ duration: 150 }}>
		<header>
			<h2>Remarkably Organized Planner Guide</h2>
			<button class="close-btn" aria-label="Close guide" onclick={onClose}>✕</button>
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

		<div class="wizard-body">
			{#if activeStep === 0}
				<!-- Presets -->
				<div class="step-content" in:fade={{ duration: 150 }}>
					<h3>Presets Library</h3>
					<p>
						Start with a pre-configured template rather than building your layout from
						scratch.
					</p>
					<ul>
						<li>
							<strong>Instant Setup:</strong>
							Choose a pre-made planner for Engineers, Authors, or Students to skip the setup
							using the
							<button class="link-btn" onclick={onOpenPresets}>
								1-Click Presets Library.
							</button>
						</li>
						<li>
							<strong>Full Configuration:</strong>
							Presets automatically set up your fonts, layouts, calendar ranges, and custom
							collections in one click.
						</li>
						<li>
							<strong>Risk-Free:</strong>
							You can download a backup of your current setup at the top of the presets library,
							allowing you to safely try out different templates!
						</li>
					</ul>

					<div class="preset-buttons">
						{#each featuredPresets as preset}
							<button
								class="preset-btn"
								onclick={() => loadPreset(preset)}
								title={preset.displayName}>
								<span class="preset-icon">{preset.icon}</span>
								<span class="preset-name">{preset.displayName}</span>
							</button>
						{/each}
					</div>
				</div>
			{:else if activeStep === 1}
				<!-- Design -->
				<div class="step-content design-step-split" in:fade={{ duration: 150 }}>
					<div class="design-left-col">
						<div class="font-selectors-container">
							<div class="font-selector-col">
								<div class="font-preview" style="font-family: '{settings.design?.font}'">
									AaBbCc 123
								</div>
								<div class="font-select-row">
									<a href="#prev" onclick={(e) => { e.preventDefault(); cycleFont('font', 'prev'); }} class="arrow-link" aria-label="Previous body font">‹</a>
									<select id="guide-body-font" bind:value={settings.design.font}>
										{#each fonts as fontOption}
											<option value={fontOption.name}>{fontOption.name}</option>
										{/each}
									</select>
									<a href="#next" onclick={(e) => { e.preventDefault(); cycleFont('font', 'next'); }} class="arrow-link" aria-label="Next body font">›</a>
								</div>
								<label for="guide-body-font">Body Font</label>
							</div>
							
							<div class="font-selector-col">
								<div class="font-preview" style="font-family: '{settings.design?.fontDisplay}'">
									AaBbCc 123
								</div>
								<div class="font-select-row">
									<a href="#prev" onclick={(e) => { e.preventDefault(); cycleFont('fontDisplay', 'prev'); }} class="arrow-link" aria-label="Previous display font">‹</a>
									<select id="guide-display-font" bind:value={settings.design.fontDisplay}>
										{#each fonts as fontOption}
											<option value={fontOption.name}>{fontOption.name}</option>
										{/each}
									</select>
									<a href="#next" onclick={(e) => { e.preventDefault(); cycleFont('fontDisplay', 'next'); }} class="arrow-link" aria-label="Next display font">›</a>
								</div>
								<label for="guide-display-font">Display Font</label>
							</div>
						</div>

						<h3>Design & Layout</h3>
						<p>Configure the physical aesthetics of your planner notebook.</p>
						
						<ul>
							<li>
								<strong>Fonts & Colors:</strong>
								Pick your favorite Google Fonts and custom colors for a personal look.
							</li>
							<li>
								<strong>Cover Art:</strong>
								Personalize your cover page with generative background styles like Mesh Gradients, Topographic Waves, or Fractals. You can even customize the color palette and complexity!
							</li>
							<li>
								<strong>Dashboard & Navigation:</strong>
								Turn on a handy index summary for the front of your planner, and add tabs to the top or side to quickly jump between your pages while you work.
							</li>
						</ul>
					</div>
					
					<div class="design-right-col">
						<h4>Theme</h4>
						<div class="color-picker-group">
							<div class="color-picker-item">
								<label for="guide-theme-select">Preset Theme</label>
								<select id="guide-theme-select" value={settings.design.themeId} onchange={(e) => applyTheme((e.target as HTMLSelectElement).value)}>
									{#each THEMES as themeOption}
										<option value={themeOption.id}>{themeOption.icon} {themeOption.name}</option>
									{/each}
								</select>
							</div>
							
							<div class="color-picker-item">
								<label for="guide-color-bg">Page Background</label>
								<input type="color" id="guide-color-bg" bind:value={settings.design.colorBg} />
							</div>
							<div class="color-picker-item">
								<label for="guide-color-nav">Sidebar/Tabs </label>
								<input type="color" id="guide-color-nav" bind:value={settings.design.colorNavBg} />
							</div>
							<div class="color-picker-item">
								<label for="guide-color-text">Text </label>
								<input type="color" id="guide-color-text" bind:value={settings.design.colorText} />
							</div>
							<div class="color-picker-item">
								<label for="guide-color-lines">Lines & Borders </label>
								<input type="color" id="guide-color-lines" bind:value={settings.design.colorLines} />
							</div>
							<div class="color-picker-item">
								<label for="guide-color-dots">Dots & Patterns </label>
								<input type="color" id="guide-color-dots" bind:value={settings.design.colorDots} />
							</div>
						</div>
					</div>
				</div>
			{:else if activeStep === 2}
				<!-- Calendar -->
				<div class="step-content" in:fade={{ duration: 150 }}>
					<h3>Calendar Spreads</h3>
					<p>Generate highly structured, interlinked chronological spreads.</p>
					<ul>
						<li>
							<strong>Custom Dates:</strong>
							Make a planner for a full year, a semester, or just a few precise weeks.
						</li>
						<li>
							<strong>Bird's Eye View:</strong>
							Use Yearly, Quarterly, and Monthly pages to see your big goals and milestones.
						</li>
						<li>
							<strong>Daily Focus:</strong>
							Use Weekly and Daily pages to manage your busy schedule and detailed notes.
						</li>
					</ul>
				</div>
			{:else if activeStep === 3}
				<!-- Templates -->
				<div class="step-content" in:fade={{ duration: 150 }}>
					<h3>Page Templates</h3>
					<p>Pick the best layout for your notes, tasks, and habits.</p>
					<ul>
						<li>
							<button class="link-btn" onclick={onOpenGallery}>
								Browse the Template Gallery
							</button>
							to see live previews of every layout.
						</li>
						<li>
							<strong>Standard Pages:</strong>
							Choose from Dot Grid, Lined, or Blank pages—perfect for freeform writing or
							sketching.
						</li>
						<li>
							<strong>Stay Productive:</strong>
							Use To-Do lists and Habit Trackers to build consistency and stay on top of your
							goals.
						</li>
						<li>
							<strong>Expert Layouts:</strong>
							Special pages for budget tracking, meeting notes, workout logs, and meal
							planning.
						</li>
					</ul>
				</div>
			{:else if activeStep === 4}
				<!-- Collections -->
				<div class="step-content" in:fade={{ duration: 150 }}>
					<h3>Custom Collections</h3>
					<p>Extend your planner with modular notebooks.</p>
					<ul>
						<li>
							<strong>Add Your Own Sections:</strong>
							Create custom notebooks like "Journal," "Projects," or "Reading List" inside your
							planner.
						</li>
						<li>
							<strong>Auto-Indexing:</strong>
							We'll automatically build an index for each section so you never get lost in your
							notes.
						</li>
					</ul>
				</div>
			{:else if activeStep === 5}
				<!-- Events -->
				<div class="step-content" in:fade={{ duration: 150 }}>
					<h3>Sync Calendar Events</h3>
					<p>Automatically populate your spreads with real-world events.</p>
					<ul>
						<li>
							<strong>Import Your Schedule:</strong>
							Link your Google or Apple calendar to see your meetings directly on your planner
							pages.
						</li>
						<li>
							<strong>Private & Safe:</strong>
							Your calendar data stays in your browser and is never stored on our servers.
						</li>
					</ul>
				</div>
			{:else if activeStep === 6}
				<!-- Export -->
				<div class="step-content" in:fade={{ duration: 150 }}>
					<h3>Backup & Export</h3>
					<p>Save your setup and compile your master digital planner.</p>
					<ul>
						<li>
							<strong>Save Your Work:</strong>
							Download a backup of your settings so you can finish your planner later or move
							to another device.
						</li>
						<li>
							<strong>Print to PDF:</strong>
							When you're ready, "Print" your planner to a PDF file to use on your tablet or
							paper.
						</li>
					</ul>
				</div>
			{/if}
		</div>

		<footer class="wizard-footer">
			<button class="btn-nav" disabled={activeStep === 0} onclick={() => activeStep--}>
				Back
			</button>
			<div class="footer-center">
				<div class="footer-dots">
					{#each steps as _, index}
						<span class="dot" class:active={activeStep === index}></span>
					{/each}
				</div>
				<span class="version">v{appVersion}</span>
			</div>
			{#if activeStep < steps.length - 1}
				<button class="btn-nav primary" onclick={() => activeStep++}>Next</button>
			{:else}
				<button class="btn-nav finish" onclick={onClose}>Finish</button>
			{/if}
		</footer>
	</div>
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="help-bg"
		role="presentation"
		transition:fade={{ duration: 150 }}
		onclick={onClose}>
	</div>
</div>

<style lang="scss">
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
		.wizard {
			background-color: var(--bg);
			color: var(--text);
			border-radius: var(--radius-5);
			box-shadow: var(--shadow-6);
			max-width: min(calc(100vw - 2rem), 700px);
			max-height: 85vh;
			width: 100%;
			position: relative;
			z-index: 100;
			display: flex;
			flex-direction: column;
			border: 1px solid var(--outline);
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
							border-color: #6b7280;
							background-color: #6b7280;
							color: #ffffff;
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

			.wizard-body {
				padding: 2.5rem;
				flex: 1;
				overflow-y: auto;
				min-height: 250px;
				@include scrollbar;

				.step-content {
					h3 {
						margin: 0 0 1rem;
						font-size: 1.4rem;
						font-weight: 600;
						color: var(--text);
					}
					p {
						font-size: 0.95rem;
						line-height: 1.5;
						margin: 0 0 1.25rem;
						opacity: 0.85;
					}
					ul {
						margin: 0;
						padding-left: 1.25rem;
						display: flex;
						flex-direction: column;
						gap: 0.75rem;
						li {
							font-size: 0.9rem;
							line-height: 1.5;
							strong {
								color: var(--text-high);
							}
						}
					}

					.link-btn {
						background: none;
						border: none;
						color: var(--action);
						text-decoration: underline;
						cursor: pointer;
						padding: 0;
						font-size: inherit;
						font-family: inherit;
						opacity: 0.9;
						&:hover {
							opacity: 1;
						}
					}

					.preset-buttons {
						display: flex;
						flex-wrap: wrap;
						gap: 0.5rem;
						margin-top: 1.5rem;
						padding-top: 1.5rem;
						border-top: 1px dashed var(--outline);
						
						.preset-btn {
							display: flex;
							align-items: center;
							gap: 0.5rem;
							background-color: var(--bg-high);
							border: 1px solid var(--outline);
							padding: 0.4rem 0.75rem;
							border-radius: var(--radius-3);
							cursor: pointer;
							transition: all 0.2s ease;
							color: var(--text);
							
							.preset-icon {
								font-size: 1.1rem;
							}
							
							.preset-name {
								font-size: 0.8rem;
								font-weight: 500;
							}
							
							&:hover {
								background-color: var(--action);
								color: var(--action-text);
								border-color: var(--action);
								transform: translateY(-2px);
							}
						}
					}

					.font-selectors-container {
						display: flex;
						justify-content: space-around;
						align-items: center;
						gap: 1.5rem;
						margin-bottom: 2rem;
						
						.font-selector-col {
							display: flex;
							flex-direction: column;
							align-items: center;
							gap: 0.5rem;
							flex: 1;
							
							.font-preview {
								font-size: 1.8rem;
								min-height: 2.5rem;
								display: flex;
								align-items: center;
								justify-content: center;
								color: var(--text);
								text-align: center;
							}
							
							label {
								font-size: 0.75rem;
								font-weight: 600;
								text-transform: uppercase;
								letter-spacing: 0.05em;
								color: var(--text-low);
							}
							
							.font-select-row {
								display: flex;
								align-items: center;
								gap: 0.5rem;
								width: 100%;
								justify-content: center;
								
								.arrow-link {
									text-decoration: none;
									color: var(--text-low);
									font-size: 1.75rem;
									padding: 0 0.5rem;
									user-select: none;
									display: inline-block;
									line-height: 1;
									
									&:hover {
										color: var(--action);
									}
								}
								
								select {
									flex: 1;
									max-width: 160px;
									padding: 0.5rem;
									border-radius: var(--radius-2);
									border: 1px solid var(--outline);
									background-color: var(--bg);
									color: var(--text);
									font-family: inherit;
									cursor: pointer;
									
									&:focus {
										border-color: var(--action);
										outline: none;
									}
								}
							}
						}
					}

					&.design-step-split {
						display: flex;
						gap: 2rem;
						align-items: stretch;
						
						.design-left-col {
							flex: 1;
							min-width: 0;
						}
						
						.design-right-col {
							flex: 0 0 10%;
							width: 10%;
							min-width: 140px;
							display: flex;
							flex-direction: column;
							border-left: 1px dashed var(--outline);
							padding-left: 1.5rem;
							
							h4 {
								margin: 0 0 1rem;
								font-size: 1.1rem;
								font-weight: 600;
								color: var(--text);
							}
							
							.color-picker-group {
								display: flex;
								flex-direction: column;
								gap: 0.85rem;
								
								.color-picker-item {
									display: flex;
									flex-direction: column;
									gap: 0.25rem;
									
									label {
										font-size: 0.75rem;
										font-weight: 600;
										color: var(--text-low);
									}
									
									input[type="color"] {
										-webkit-appearance: none;
										-moz-appearance: none;
										appearance: none;
										width: 100%;
										height: 2.25rem;
										background-color: transparent;
										border: 1px solid var(--outline);
										border-radius: var(--radius-2);
										cursor: pointer;
										padding: 0;
										
										&::-webkit-color-swatch-wrapper {
											padding: 0;
										}
										&::-webkit-color-swatch {
											border: none;
											border-radius: calc(var(--radius-2) - 1px);
										}
										&::-moz-color-swatch {
											border: none;
											border-radius: calc(var(--radius-2) - 1px);
										}
									}
								}
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
				background-color: var(--bg-high);
				border-bottom-left-radius: var(--radius-5);
				border-bottom-right-radius: var(--radius-5);

				.btn-nav {
					padding: 0.75rem 1.5rem;
					border-radius: var(--radius-3);
					font-size: 0.95rem;
					font-weight: 600;
					cursor: pointer;
					transition: all 0.2s ease;
					border: 1px solid var(--outline);
					background-color: var(--bg);
					color: var(--text);
					min-width: 100px;

					&:hover:not(:disabled) {
						background-color: var(--outline);
					}

					&:disabled {
						opacity: 0.4;
						cursor: not-allowed;
					}

					&.primary,
					&.finish {
						background-color: var(--action);
						color: var(--action-text);
						border-color: var(--action);

						&:hover {
							opacity: 0.9;
						}
					}
				}

				.footer-center {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 0.35rem;

					.version {
						font-size: 0.7rem;
						font-weight: 500;
						opacity: 0.5;
					}
				}

				.footer-dots {
					display: flex;
					gap: 0.5rem;

					.dot {
						width: 8px;
						height: 8px;
						border-radius: 50%;
						background-color: var(--outline);
						transition: all 0.2s ease;

						&.active {
							background-color: var(--action);
							transform: scale(1.25);
						}
					}
				}
			}
		}

		.help-bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 0;
			background-color: rgba(0, 0, 0, 0.4);
			backdrop-filter: blur(8px);
		}
	}
</style>
