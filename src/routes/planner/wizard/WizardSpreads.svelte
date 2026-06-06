<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PlannerSettings } from '$state';

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

<div class="step-content spreads-step" in:fade={{ duration: 150 }}>
	<h3 class="welcome-headline-gradient">Spreads</h3>
	<p>Generate highly structured, interlinked chronological spreads.</p>

	<div class="spreads-config spreads-two-col">
		<div class="config-left">
			<h4>Enable Spreads</h4>
			<div class="toggles-grid">
				<label class="toggle-label">
					<div class="switch">
						<input
							type="checkbox"
							checked={!settings.yearPage.disable}
							onchange={(e) => (settings.yearPage.disable = !e.currentTarget.checked)} />
						<span class="slider"></span>
					</div>
					Yearly Calendar
				</label>
				<label class="toggle-label">
					<div class="switch">
						<input
							type="checkbox"
							checked={!settings.quarterPage.disable}
							onchange={(e) =>
								(settings.quarterPage.disable = !e.currentTarget.checked)} />
						<span class="slider"></span>
					</div>
					Quarterly Calendar
				</label>
				<label class="toggle-label">
					<div class="switch">
						<input
							type="checkbox"
							checked={!settings.monthPage.disable}
							onchange={(e) => (settings.monthPage.disable = !e.currentTarget.checked)} />
						<span class="slider"></span>
					</div>
					Monthly Calendars
				</label>
				<label class="toggle-label">
					<div class="switch">
						<input
							type="checkbox"
							checked={!settings.weekPage.disable}
							onchange={(e) => (settings.weekPage.disable = !e.currentTarget.checked)} />
						<span class="slider"></span>
					</div>
					Weekly Calendar
				</label>
				<label class="toggle-label">
					<div class="switch">
						<input
							type="checkbox"
							checked={!settings.dayPage.disable}
							onchange={(e) => (settings.dayPage.disable = !e.currentTarget.checked)} />
						<span class="slider"></span>
					</div>
					Daily Agenda
				</label>
				<label class="toggle-label">
					<div class="switch">
						<input
							type="checkbox"
							checked={!settings.customCollections.disable}
							onchange={(e) =>
								(settings.customCollections.disable = !e.currentTarget.checked)} />
						<span class="slider"></span>
					</div>
					Custom Collections
				</label>
			</div>

			<h4 style="margin-top: 1.5rem;">Navigation & Layout</h4>
			<div class="toggles-grid">
				<label class="toggle-label">
					<div class="switch">
						<input
							type="checkbox"
							checked={!settings.sideNav.disable}
							onchange={(e) => (settings.sideNav.disable = !e.currentTarget.checked)} />
						<span class="slider"></span>
					</div>
					Sidebar Navigation
				</label>

				{#if !settings.sideNav.disable}
					{#if !settings.customCollections.disable}
						<label class="toggle-label">
							<div class="switch">
								<input
									type="checkbox"
									bind:checked={settings.sideNav.showCollectionLinks} />
								<span class="slider"></span>
							</div>
							Collections in Sidebar
						</label>
					{/if}
					<label class="toggle-label">
						<div class="switch">
							<input type="checkbox" bind:checked={settings.sideNav.leftSide} />
							<span class="slider"></span>
						</div>
						Show Sidebar on Left
					</label>
				{/if}
				<label class="toggle-label">
					<div class="switch">
						<input
							type="checkbox"
							checked={!settings.topNav.disable}
							onchange={(e) => (settings.topNav.disable = !e.currentTarget.checked)} />
						<span class="slider"></span>
					</div>
					Topbar Navigation
				</label>
				{#if !settings.topNav.disable && !settings.customCollections.disable}
					<label class="toggle-label">
						<div class="switch">
							<input type="checkbox" bind:checked={settings.topNav.showCollectionLinks} />
							<span class="slider"></span>
						</div>
						Collections on Topbar
					</label>
				{/if}
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
	.spreads-config {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-top: 1rem;

		&.spreads-two-col {
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
			grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
			gap: 0.75rem;

			.toggle-label {
				display: flex;
				align-items: center;
				gap: 0.75rem;
				font-size: 0.9rem;
				cursor: pointer;
				user-select: none;
				padding: 0.25rem 0;

				&.sub-option {
					font-size: 0.85rem;
					opacity: 0.9;
					padding-left: 0.5rem;
					border-left: 2px solid rgba(255, 255, 255, 0.05);
				}
			}
		}
	}

	/* Toggle Switch */
	.switch {
		position: relative;
		display: inline-block;
		width: 34px;
		height: 20px;
		flex-shrink: 0;

		input {
			opacity: 0;
			width: 0;
			height: 0;

			&:checked + .slider {
				background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #a78bfa 100%);
				background-size: 200% auto;
				animation: gradient-shift 4s ease-in-out infinite;
			}

			&:focus + .slider {
				box-shadow: 0 0 1px var(--action);
			}

			&:checked + .slider:before {
				transform: translateX(14px);
			}
		}

		.slider {
			position: absolute;
			cursor: pointer;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: var(--outline);
			transition: 0.4s;
			border-radius: 20px;

			&:before {
				position: absolute;
				content: '';
				height: 14px;
				width: 14px;
				left: 3px;
				bottom: 3px;
				background-color: white;
				transition: 0.4s;
				border-radius: 50%;
			}
		}
	}
</style>
