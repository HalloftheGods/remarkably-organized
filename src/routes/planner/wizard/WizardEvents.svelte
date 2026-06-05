<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PlannerSettings } from '$lib/state/planner-settings.svelte';

	let { settings } = $props<{ settings: PlannerSettings }>();

	let newCalendarName = $state('');
	let newCalendarUrl = $state('');

	function addCalendar() {
		if (!newCalendarUrl.trim()) return;
		settings.calendars = [
			...settings.calendars,
			{
				url: newCalendarUrl.trim(),
				name: newCalendarName.trim() || 'New Calendar',
				events: [],
				updating: false,
				lastUpdated: 0,
			},
		];
		newCalendarName = '';
		newCalendarUrl = '';
	}
</script>

<div class="step-content events-step" in:fade={{ duration: 150 }}>
	<h3 class="welcome-headline-gradient">Sync Calendar Events</h3>
	<p>Automatically populate your spreads with real-world events via public ICS links.</p>

	<div class="events-config">
		<div class="add-event-row">
			<input
				type="text"
				placeholder="Name (e.g. Holidays)"
				bind:value={newCalendarName} />
			<input
				type="url"
				placeholder="https://.../basic.ics"
				bind:value={newCalendarUrl}
				onkeydown={(e) => e.key === 'Enter' && addCalendar()} />
			<button class="add-btn" onclick={addCalendar}>Add</button>
		</div>

		{#if settings.calendars.length > 0}
			<div class="calendars-list">
				{#each settings.calendars as calendar, index}
					<div class="calendar-item">
						<div class="calendar-info">
							<span class="calendar-name">
								{calendar.name || 'Untitled Calendar'}
							</span>
							<span class="calendar-url">{calendar.url}</span>
						</div>
						<button
							class="delete-btn"
							onclick={() =>
								(settings.calendars = settings.calendars.filter(
									(_: any, i: number) => i !== index,
								))}
							aria-label="Delete Calendar">
							✕
						</button>
					</div>
				{/each}
			</div>
		{/if}
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
	.events-config {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-top: 1rem;

		.add-event-row {
			display: flex;
			gap: 0.5rem;
			input {
				flex: 1;
				padding: 0.6rem;
				border-radius: var(--radius-2);
				border: 1px solid var(--outline);
				background-color: var(--bg);
				color: var(--text);
				font-family: inherit;
			}
			.add-btn {
				padding: 0 1rem;
				border-radius: var(--radius-2);
				background-color: var(--bg-high);
				border: 1px solid var(--outline);
				color: var(--text);
				font-weight: 600;
				cursor: pointer;
				transition: all 0.2s ease;
				&:hover {
					background-color: var(--action);
					color: var(--action-text);
					border-color: var(--action);
				}
			}
		}

		.calendars-list {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			max-height: 200px;
			overflow-y: auto;

			.calendar-item {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				background-color: var(--bg-high);
				padding: 0.5rem 0.75rem;
				border-radius: var(--radius-2);
				border: 1px solid var(--outline);

				.calendar-info {
					flex: 1;
					display: flex;
					flex-direction: column;
					gap: 0.1rem;
					min-width: 0;

					.calendar-name {
						font-size: 0.9rem;
						font-weight: 500;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.calendar-url {
						font-size: 0.75rem;
						color: var(--text-low);
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}

				.delete-btn {
					background: none;
					border: none;
					color: var(--text-low);
					cursor: pointer;
					width: 1.5rem;
					height: 1.5rem;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 50%;
					transition: all 0.2s ease;
					&:hover {
						background-color: rgba(255, 0, 0, 0.1);
						color: red;
					}
				}
			}
		}
	}
</style>
