<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PlannerSettings } from '$lib/state/planner-settings.svelte';

	let { settings } = $props<{ settings: PlannerSettings }>();

	function updateDate(type: 'start' | 'end', event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.value) {
			const [year, month, day] = target.value.split('-').map(Number);
			settings.date[type] = new Date(Date.UTC(year, month - 1, day));
		}
	}

	function formatDateForInput(d: Date) {
		const year = d.getUTCFullYear();
		const month = String(d.getUTCMonth() + 1).padStart(2, '0');
		const day = String(d.getUTCDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}
</script>

<div class="step-content calendar-step" in:fade={{ duration: 150 }}>
	<h3 class="welcome-headline-gradient">Calendar Spreads</h3>
	<p>Generate highly structured, interlinked chronological spreads.</p>

	<div class="calendar-config calendar-two-col">
		<div class="config-left">
			<h4>Enable Spreads</h4>
			<div class="toggles-grid">
				<label class="toggle-label">
					<input
						type="checkbox"
						checked={!settings.yearPage.disable}
						onchange={(e) => (settings.yearPage.disable = !e.currentTarget.checked)} />
					Yearly Overview
				</label>
				<label class="toggle-label">
					<input
						type="checkbox"
						checked={!settings.quarterPage.disable}
						onchange={(e) => (settings.quarterPage.disable = !e.currentTarget.checked)} />
					Quarterly Pages
				</label>
				<label class="toggle-label">
					<input
						type="checkbox"
						checked={!settings.monthPage.disable}
						onchange={(e) => (settings.monthPage.disable = !e.currentTarget.checked)} />
					Monthly Calendars
				</label>
				<label class="toggle-label">
					<input
						type="checkbox"
						checked={!settings.weekPage.disable}
						onchange={(e) => (settings.weekPage.disable = !e.currentTarget.checked)} />
					Weekly Agendas
				</label>
				<label class="toggle-label">
					<input
						type="checkbox"
						checked={!settings.dayPage.disable}
						onchange={(e) => (settings.dayPage.disable = !e.currentTarget.checked)} />
					Daily Pages
				</label>
				<label class="toggle-label">
					<input
						type="checkbox"
						checked={!settings.customCollections.disable}
						onchange={(e) =>
							(settings.customCollections.disable = !e.currentTarget.checked)} />
					Custom Collections
				</label>
			</div>
		</div>

		<div class="config-right">
			<div class="date-row">
				<div class="date-field">
					<label for="guide-date-start">Start Date</label>
					<input
						type="date"
						id="guide-date-start"
						value={formatDateForInput(settings.date.start)}
						onclick={(e) => e.currentTarget.showPicker()}
						onchange={(e) => updateDate('start', e)} />
				</div>
				<div class="date-field">
					<label for="guide-date-end">End Date</label>
					<input
						type="date"
						id="guide-date-end"
						value={formatDateForInput(settings.date.end)}
						onclick={(e) => e.currentTarget.showPicker()}
						onchange={(e) => updateDate('end', e)} />
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.welcome-headline-gradient {
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
	.calendar-config {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-top: 1rem;

		&.calendar-two-col {
			@media (min-width: 769px) {
				display: grid;
				grid-template-columns: 2fr 1fr;
				gap: 2rem;
				align-items: start;

				.config-left {
					border-right: 1px solid rgba(255, 255, 255, 0.05);
					padding-right: 2rem;
					height: 100%;
				}

				.date-row {
					flex-direction: column;
					gap: 1rem;
				}
			}
		}

		h4 {
			margin: 0 0 0.5rem;
			font-size: 1rem;
			font-weight: 600;
			color: var(--text);
		}

		.date-row {
			display: flex;
			gap: 1rem;
			.date-field {
				display: flex;
				flex-direction: column;
				gap: 0.25rem;
				flex: 1;
				label {
					font-size: 0.75rem;
					font-weight: 600;
					color: var(--text-low);
					text-transform: uppercase;
					letter-spacing: 0.05em;
				}
				input[type='date'] {
					padding: 0.6rem;
					border-radius: var(--radius-2);
					border: 1px solid var(--outline);
					background-color: var(--bg);
					color: var(--text);
					font-family: inherit;
				}
			}
		}

		.toggles-grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
			gap: 0.75rem;
			.toggle-label {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				font-size: 0.9rem;
				cursor: pointer;
				input[type='checkbox'] {
					width: 1rem;
					height: 1rem;
					cursor: pointer;
					accent-color: var(--action);
				}
			}
		}
	}
</style>
