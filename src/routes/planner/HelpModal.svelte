<script lang="ts">
	import { fade, scale } from 'svelte/transition';
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
							<strong>One-Click Presets:</strong>
							Open the
							<button class="link-btn" onclick={onOpenPresets}>
								1-Click Presets Library
							</button>
							to instantly load optimized structures for Software Engineers, Authors, Content
							Creators, Students, and more.
						</li>
						<li>
							<strong>Tailored Spreads & Settings:</strong>
							Presets automatically configure font choices, layout designs, specific calendar
							ranges, cover pages, dashboard widgets, and custom collections.
						</li>
						<li>
							<strong>Safe to Experiment:</strong>
							You can download a backup of your current setup at the top of the presets library,
							allowing you to safely try out different templates!
						</li>
					</ul>
				</div>
			{:else if activeStep === 1}
				<!-- Design -->
				<div class="step-content" in:fade={{ duration: 150 }}>
					<h3>Design & Layout</h3>
					<p>Configure the physical aesthetics of your planner notebook.</p>
					<ul>
						<li>
							<strong>Presets Library:</strong>
							Don't want to design from scratch? Open the
							<button class="link-btn" onclick={onOpenPresets}>
								1-Click Presets Library
							</button>
							to instantly load optimized configurations.
						</li>
						<li>
							<strong>Font & Colors:</strong>
							Select matching Google Fonts and custom colors for text, grid lines, and dotted
							guides.
						</li>
						<li>
							<strong>Cover Page:</strong>
							A premium starting title page. Custom title, contact detail inputs, links to collections,
							and light/dark theme layouts.
						</li>
						<li>
							<strong>Dashboard Page:</strong>
							A clean index summary listing all your custom lists and planner timeframes.
						</li>
						<li>
							<strong>Navigation:</strong>
							Toggle sticky Topbar or Sidebar navigation tabs to quickly jump between pages.
						</li>
					</ul>
				</div>
			{:else if activeStep === 2}
				<!-- Calendar -->
				<div class="step-content" in:fade={{ duration: 150 }}>
					<h3>Calendar Views Spreads</h3>
					<p>Generate highly structured, interlinked chronological spreads.</p>
					<ul>
						<li>
							<strong>Date Spans:</strong>
							Create full-year templates or target precise custom periods (e.g., academic semesters
							or project phases).
						</li>
						<li>
							<strong>Yearly, Quarterly & Monthly:</strong>
							Structural calendars featuring high-level goals and task overviews.
						</li>
						<li>
							<strong>Weekly & Daily Spreads:</strong>
							Detailed agenda and schedule pages linked directly to note sheets and habit trackers.
						</li>
					</ul>
				</div>
			{:else if activeStep === 3}
				<!-- Templates -->
				<div class="step-content" in:fade={{ duration: 150 }}>
					<h3>Page Templates</h3>
					<p>
						Understand the layout types available for calendar spreads and custom
						collections.
					</p>
					<ul>
						<li>
							<button class="link-btn" onclick={onOpenGallery}>
								Browse the Template Gallery
							</button>
							to see live previews and export any template as an image.
						</li>
						<li>
							<strong>Blank, Dotted & Grid:</strong>
							Bullet journal standards. Perfect for freeform writing, wireframing, sketching
							diagrams, or custom calendars. Available in Small, Medium, and Large spacings.
						</li>
						<li>
							<strong>Lined & Numbered:</strong>
							The standard for clean journaling, writing reports, documenting procedures, or
							creating structured indexed logs.
						</li>
						<li>
							<strong>To-Do & Task Progress:</strong>
							Checklists for tracking priorities. The
							<em>Progress</em>
							variant adds dynamic visual bars to monitor goal milestones.
						</li>
						<li>
							<strong>Agendas (Daily/Weekly):</strong>
							Designed for chronologically managing schedules, hourly appointments, and week-at-a-glance
							task matrices.
						</li>
						<li>
							<strong>Habit Checkboxes:</strong>
							Tracking grids designed to build consistency. Choose to track habits grouped by
							week (52 checkboxes) or by month (12 grids).
						</li>
						<li>
							<strong>Specialized Spreads:</strong>
							<ul>
								<li>
									<strong>Meeting Minutes:</strong>
									Track attendees, discussion notes, decisions, and action items.
								</li>
								<li>
									<strong>Finance / Budget Tracker:</strong>
									Log incomes, outlays, balances, and savings goals.
								</li>
							</ul>
						</li>
					</ul>
				</div>
			{:else if activeStep === 4}
				<!-- Collections -->
				<div class="step-content" in:fade={{ duration: 150 }}>
					<h3>Custom Collections</h3>
					<p>Extend your planner with modular templates.</p>
					<ul>
						<li>
							<strong>Manage Collections:</strong>
							Add structured custom page sections (e.g., Lined Journals, To-Do checklists, Habit
							tracker sheets) complete with self-generating index grids.
						</li>
						<li>
							<strong>Index Pages vs. Item Pages:</strong>
							Collections automatically create a hyperlinked index page at the front of the
							section, pointing to individual item pages (like notes or project spreads).
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
							<strong>Connect ICS URLs:</strong>
							Link external calendars like Google Calendar, iCloud, or national holidays. Synced
							events automatically inject themselves inside your Monthly, Weekly, and Daily
							calendar grids.
						</li>
						<li>
							<strong>Syncing Private Calendars:</strong>
							You can sync a private calendar by temporarily making it public, copying the ICS
							link here to import, and then immediately switching it back to private!
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
							<strong>Configuration Backup:</strong>
							Instantly save current settings to browser cache or download a JSON config file
							to backup/restore across different devices.
						</li>
						<li>
							<strong>High-Resolution PDF:</strong>
							Enable the high-resolution printing checkbox in the Design panel, press the Print
							FAB, and select 'Save as PDF' with margins set to 'None' and background graphics
							'Enabled' (or use
							<strong>Ctrl + P</strong>
							).
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
