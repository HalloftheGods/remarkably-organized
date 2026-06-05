<script lang="ts">
	import { getFirstDayOfWeek, type Timeframe, type CalendarEvent } from '$lib';

	let {
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		startWeekOnSunday = false,
		settings = undefined as any,
	} = $props();

	const weekStart = $derived(
		new Date(getFirstDayOfWeek(timeframe.start, startWeekOnSunday)),
	);
</script>

<div class="agenda-split">
	<div class="left-pane">
		{#each new Array(7) as _, i (i)}
			{@const date = new Date(weekStart.getTime() + i * 86400000)}
			{@const dayEvents = events.filter((e) => {
				if (!timeframe.start) return false;
				const dayStart = date.getTime();
				const dayEnd = dayStart + 86400000;
				const eventStart = e.start * 1000;
				const eventEnd = eventStart + (e.duration || 86400) * 1000;
				return eventStart < dayEnd && eventEnd > dayStart;
			})}
			<div class="day-block">
				<div class="day-header">
					<span class="day-name">
						{date.toLocaleString('default', { weekday: 'long', timeZone: 'UTC' }).toUpperCase()}
					</span>
					<span class="day-date">
						{date.toLocaleString('default', { month: 'short', timeZone: 'UTC' })} {date.getUTCDate()}
					</span>
				</div>
				<div class="day-content">
					{#each dayEvents as event}
						<div class="event-item">• {event.name}</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<div class="divider"></div>

	<div class="right-pane">
		<div class="notes-header">NOTES & LOGS</div>
		<div class="grid-pattern">
			{#each Array(32) as _}
				<div class="grid-line"></div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.agenda-split {
		display: flex;
		width: 100%;
		height: 100%;
		padding: 1.5rem;
		box-sizing: border-box;
		gap: 1.5rem;
	}

	.left-pane {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.day-block {
		flex: 1;
		border: 1px solid var(--outline);
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
		min-height: 0;
	}

	.day-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--outline-low, #e0e0e0);
		padding-bottom: 0.25rem;
		margin-bottom: 0.25rem;
	}

	.day-name {
		font-size: 0.7rem;
		font-weight: bold;
		color: var(--text);
		letter-spacing: 0.5px;
	}

	.day-date {
		font-size: 0.65rem;
		color: var(--text-low);
	}

	.day-content {
		flex: 1;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.event-item {
		font-size: 0.65rem;
		color: var(--text);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.divider {
		width: 1px;
		background-color: var(--outline);
		align-self: stretch;
	}

	.right-pane {
		flex: 1;
		display: flex;
		flex-direction: column;
		border: 1px solid var(--outline);
		border-radius: 4px;
		padding: 1rem;
	}

	.notes-header {
		font-size: 0.75rem;
		font-weight: bold;
		color: var(--text-low);
		border-bottom: 2px solid var(--outline);
		padding-bottom: 0.5rem;
		margin-bottom: 1rem;
		letter-spacing: 0.5px;
	}

	.grid-pattern {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		overflow: hidden;
	}

	.grid-line {
		border-bottom: 1px dashed var(--outline-low, #e0e0e0);
		height: 0.8rem;
	}
</style>
