<script lang="ts">
	import { fade, scale } from 'svelte/transition';

	let { onClose = (() => {}) as () => void } = $props();

	function handleKeyup(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
		}
	}
</script>

<svelte:window on:keyup={handleKeyup} />

<div class="help-modal">
	<div class="help" transition:scale={{ duration: 150 }}>
		<h2>Remarkably Organized Planner Guide</h2>
		<p class="subtitle">Customize, sync, and print your perfect digital notebook.</p>

		<div class="sections-accordion">
			<details open>
				<summary><h4>🎨 1. Design & Layout</h4></summary>
				<div class="section-content">
					<p>Configure the physical aesthetics of your planner notebook.</p>
					<ul>
						<li><strong>Font & Colors:</strong> Select matching Google Fonts and custom colors for text, grid lines, and dotted guides.</li>
						<li><strong>Cover Page:</strong> A premium starting title page. Custom title, contact detail inputs, links to collections, and light/dark theme layouts.</li>
						<li><strong>Dashboard Page:</strong> A clean index summary listing all your custom lists and planner timeframes.</li>
						<li><strong>Navigation:</strong> Toggle sticky Topbar or Sidebar navigation tabs to quickly jump between pages.</li>
					</ul>
				</div>
			</details>

			<details>
				<summary><h4>📅 2. Calendar Views</h4></summary>
				<div class="section-content">
					<p>Generate highly structured, interlinked chronological spreads.</p>
					<ul>
						<li><strong>Date Spans:</strong> Create full-year templates or target precise custom periods (e.g., academic semesters or project phases).</li>
						<li><strong>Yearly, Quarterly & Monthly:</strong> Structural calendars featuring high-level goals and task overviews.</li>
						<li><strong>Weekly & Daily Spreads:</strong> Detailed agenda and schedule pages linked directly to note sheets and habit trackers.</li>
					</ul>
				</div>
			</details>

			<details>
				<summary><h4>🧩 3. Extras & Custom Collections</h4></summary>
				<div class="section-content">
					<p>Extend your planner with custom modular templates and event syncing.</p>
					<ul>
						<li><strong>Manage Collections:</strong> Add structured custom page sections (e.g., Lined Journals, To-Do checklists, Habit tracker sheets) complete with self-generating index grids.</li>
						<li><strong>Sync Calendar Events:</strong> Connect external ICS URLs (Google Calendars, iCloud, national holidays). Synced events will automatically populate inside your Monthly, Weekly, and Daily calendar grids.</li>
					</ul>
				</div>
			</details>

			<details>
				<summary><h4>💾 4. Backup & Print-to-PDF</h4></summary>
				<div class="section-content">
					<p>Save your setup and compile your master digital planner.</p>
					<ul>
						<li><strong>Configuration Backup:</strong> Instantly save current settings to browser cache or download a JSON config file to backup/restore across different devices.</li>
						<li><strong>High-Resolution PDF:</strong> Enable the high-resolution printing checkbox in the Design panel, press the Print FAB, and select 'Save as PDF' with margins set to 'None' and background graphics 'Enabled'.</li>
					</ul>
				</div>
			</details>
		</div>

		<div class="actions">
			<button onclick={onClose}>Close Guide</button>
		</div>
	</div>
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div class="help-bg" transition:fade={{ duration: 150 }} onclick={onClose}></div>
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
			h2 {
				margin: 0 0 0.25rem;
				font-size: 1.85rem;
				font-weight: 700;
			}
			.subtitle {
				font-size: 0.95rem;
				opacity: 0.7;
				margin-bottom: 2rem;
				line-height: 1.4;
			}
			.sections-accordion {
				display: flex;
				flex-direction: column;
				gap: 0.75rem;
				margin-bottom: 2rem;
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
			.actions {
				position: sticky;
				bottom: -2.5rem;
				background-color: var(--bg);
				margin-top: 1.5rem;
				padding: 1.5rem 0 0;
				border-top: 1px solid var(--outline);
			}
			button {
				width: 100%;
				padding: 0.85rem;
				font-size: 1.1rem;
				font-weight: 600;
				background-color: var(--action);
				color: var(--action-text);
				border: none;
				border-radius: var(--radius-round);
				cursor: pointer;
				transition: all 0.2s ease;
				&:hover {
					background-color: var(--action-high);
					color: var(--action-text-high);
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
