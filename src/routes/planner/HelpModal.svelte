<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import PaintBrushIcon from '~icons/fa/paint-brush';
	import CalendarIcon from '~icons/fa/calendar';
	import BookIcon from '~icons/fa/book';
	import PuzzleIcon from '~icons/fa/puzzle-piece';
	import SaveIcon from '~icons/fa/save';
	import KeyboardIcon from '~icons/fa/keyboard-o';

	const appVersion = __APP_VERSION__;

	let { onClose = (() => {}) as () => void, onOpenPresets = (() => {}) as () => void } =
		$props();

	function handleKeyup(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
		}
	}
</script>

<svelte:window on:keyup={handleKeyup} />

<div class="help-modal">
	<div class="help" transition:scale={{ duration: 150 }}>
		<header>
			<h2>
				Planner Guide <span class="version">v{appVersion}</span>
			</h2>
			<button class="close-btn" aria-label="Close guide" onclick={onClose}>✕</button>
		</header>

		<div class="sections-accordion">
			<details name="guide-accordion" open>
				<summary>
					<h4>
						<PaintBrushIcon style="vertical-align: -0.125em; margin-right: 0.25rem;" /> 1. Design
						& Layout
					</h4>
				</summary>
				<div class="section-content">
					<p>Configure the physical aesthetics of your planner notebook.</p>
					<ul>
						<li>
							<strong>Presets Library:</strong>
							Don't want to design from scratch? Open the <button class="link-btn" onclick={onOpenPresets}>1-Click Presets Library</button> to instantly load optimized configurations.
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
			</details>

			<details name="guide-accordion">
				<summary>
					<h4>
						<CalendarIcon style="vertical-align: -0.125em; margin-right: 0.25rem;" /> 2. Calendar
						Views Spreads
					</h4>
				</summary>
				<div class="section-content">
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
			</details>

			<details name="guide-accordion">
				<summary>
					<h4>
						<BookIcon style="vertical-align: -0.125em; margin-right: 0.25rem;" /> 3. Page Templates
					</h4>
				</summary>
				<div class="section-content">
					<p>
						Understand the layout types available for calendar spreads and custom
						collections.
					</p>
					<ul>
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
			</details>

			<details name="guide-accordion">
				<summary>
					<h4>
						<PuzzleIcon style="vertical-align: -0.125em; margin-right: 0.25rem;" /> 4. Events
						& Custom Collections
					</h4>
				</summary>
				<div class="section-content">
					<p>Extend your planner with custom modular templates and event syncing.</p>
					<ul>
						<li>
							<strong>Manage Collections:</strong>
							Add structured custom page sections (e.g., Lined Journals, To-Do checklists, Habit
							tracker sheets) complete with self-generating index grids.
						</li>
						<li>
							<strong>Sync Calendar Events:</strong>
							Connect external ICS URLs (Google Calendars, iCloud, national holidays). Synced
							events will automatically populate inside your Monthly, Weekly, and Daily calendar
							grids.
						</li>
					</ul>
				</div>
			</details>

			<details name="guide-accordion">
				<summary>
					<h4>
						<SaveIcon style="vertical-align: -0.125em; margin-right: 0.25rem;" /> 5. Backup
						& Print-to-PDF
					</h4>
				</summary>
				<div class="section-content">
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
							'Enabled'.
						</li>
					</ul>
				</div>
			</details>

			<details name="guide-accordion">
				<summary>
					<h4>
						<KeyboardIcon style="vertical-align: -0.125em; margin-right: 0.25rem;" /> 6. Keyboard
						Shortcuts
					</h4>
				</summary>
				<div class="section-content">
					<p>Quick interactions to navigate the planner builder efficiently.</p>
					<ul>
						<li>
							<strong>Escape:</strong>
							Close any open modal or sidebar panel.
						</li>
						<li>
							<strong>Ctrl + P:</strong>
							Open the browser's native Print dialog to export your planner as a PDF.
						</li>
					</ul>
				</div>
			</details>
		</div>
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
		.help {
			background-color: var(--bg);
			color: var(--text);
			padding: 2.5rem;
			border-radius: var(--radius-5);
			box-shadow: var(--shadow-6);
			max-width: min(calc(100vw - 2rem), 600px);
			max-height: 85vh;
			width: 100%;
			position: relative;
			z-index: 100;
			overflow-y: scroll;
			overflow-x: hidden;
			border: 1px solid var(--outline);
			@include scrollbar;
			&::-webkit-scrollbar-track-piece:start {
				margin-top: var(--radius-5);
			}
			&::-webkit-scrollbar-track-piece:end {
				margin-bottom: var(--radius-5);
			}
			header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 0.5rem;
				position: sticky;
				top: -2.5rem;
				background-color: var(--bg);
				padding: 0 0 0.5rem;
				z-index: 1;
				h2 {
					margin: 0;
					font-size: 1.85rem;
					font-weight: 700;
					.version {
						font-size: 0.7rem;
						font-weight: 500;
						opacity: 0.5;
						vertical-align: super;
					}
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
			.sections-accordion {
				display: flex;
				flex-direction: column;
				gap: 0.75rem;
				details {
					background-color: var(--bg-high);
					border: 1px solid var(--outline);
					border-radius: var(--radius-3);
					padding: 0.25rem 1rem;
					transition: all 0.2s ease;
					&[open] {
						border-color: var(--action);
					}
					summary {
						list-style: none;
						display: flex;
						justify-content: space-between;
						align-items: center;
						cursor: pointer;
						padding: 0.75rem 0;
						h4 {
							margin: 0;
							font-size: 1.05rem;
							font-weight: 600;
						}
						&::-webkit-details-marker {
							display: none;
						}
						&::after {
							content: '+';
							font-size: 1.25rem;
							font-weight: 300;
							opacity: 0.7;
						}
					}
					&[open] > summary::after {
						content: '\2212';
					}
					.section-content {
						padding: 0.5rem 0 1rem;
						border-top: 1px dashed var(--outline);
						p {
							font-size: 0.9rem;
							line-height: 1.5;
							margin: 0 0 0.75rem;
							opacity: 0.85;
						}
						ul {
							margin: 0;
							padding-left: 1.25rem;
							display: flex;
							flex-direction: column;
							gap: 0.5rem;
							li {
								font-size: 0.85rem;
								line-height: 1.45;
								strong {
									color: var(--text-high);
								}
							}
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
