<script lang="ts">
	import { type CalendarEvent, type Timeframe } from '$lib';

	let { timeframe = {} as Timeframe, events = [] as CalendarEvent[], use24HourClock = false, startTime = 0, endTime = 24, interval = 60 } = $props();

	const numHours = $derived(endTime - startTime);
	const rowsPerHour = $derived(60 / interval);
	const totalRows = $derived(numHours * rowsPerHour);

	let dayEvents = $derived(
		events.filter((e) => {
			if (!timeframe.start) return false;
			const dayStart = timeframe.start.getTime();
			const dayEnd = dayStart + 86400000; // 24 hours later
			const eventStart = e.start * 1000;
			// For events without duration, assume they last the whole day
			const eventEnd = eventStart + (e.duration || 86400) * 1000;
			return eventStart < dayEnd && eventEnd > dayStart;
		}),
	);

	let allDayEvents = $derived(
		dayEvents.filter((e) => !e.duration || e.duration >= 86400),
	);
	let timedEvents = $derived(dayEvents.filter((e) => {
		if (!e.duration || e.duration >= 86400) return false;
		const timeFromMidnight = e.start * 1000 - timeframe.start.getTime();
		const eventEndFromMidnight = timeFromMidnight + e.duration * 1000;
		const agendaStartMs = startTime * 3600000;
		const agendaEndMs = endTime * 3600000;
		
		return eventEndFromMidnight > agendaStartMs && timeFromMidnight < agendaEndMs;
	}));
</script>

<div class="agenda-wrapper">
	<div class="day" class:has-all-day={allDayEvents.length > 0} style="--total-rows: {totalRows};">
		{#if allDayEvents.length > 0}
			<div class="hour-label all-day-label" style="grid-column: 1; grid-row: 1;">
				All Day ➤
			</div>
		{/if}
		{#each new Array(numHours) as _, h (h)}
			{@const hour = startTime + h}
			<div
				class="hour-label"
				style="grid-column: 1; grid-row: {allDayEvents.length > 0 ? (h * rowsPerHour) + 2 : (h * rowsPerHour) + 1} / span {rowsPerHour};">
				{#if use24HourClock}
					{hour.toString().padStart(2, '0')}:00
				{:else if hour > 0 && hour < 24}
					{hour === 12 ? 12 : hour % 12}
					<small>{hour < 12 ? 'AM' : 'PM'}</small>
				{:else if hour === 24}
					12
					<small>AM</small>
				{:else}
					12
					<small>AM</small>
				{/if}
			</div>
		{/each}

		{#if allDayEvents.length > 0}
			<div class="all-day-events" style="grid-column: 2; grid-row: 1;">
				{#each allDayEvents as event}
					<div class="event-all-day">{event.name}</div>
				{/each}
			</div>
		{/if}
		{#each new Array(totalRows) as _, r (r)}
			<div
				class="hour"
				class:is-hour-start={r % rowsPerHour === 0}
				style="grid-column: 2; grid-row: {allDayEvents.length > 0 ? r + 2 : r + 1};">
			</div>
		{/each}

		<div class="events-overlay">
			{#each timedEvents as event}
				{@const timeFromMidnight = event.start * 1000 - timeframe.start.getTime()}
				{@const durationMs = event.duration ? event.duration * 1000 : 0}
				{@const agendaStartMs = startTime * 3600000}
				{@const agendaEndMs = endTime * 3600000}
				{@const agendaDurationMs = agendaEndMs - agendaStartMs}
				{@const startOffset = Math.max(0, timeFromMidnight - agendaStartMs)}
				{@const visibleDurationMs = timeFromMidnight < agendaStartMs ? durationMs - (agendaStartMs - timeFromMidnight) : durationMs}
				{@const top = (startOffset / agendaDurationMs) * 100}
				{@const height = (Math.min(visibleDurationMs, agendaEndMs - (agendaStartMs + startOffset)) / agendaDurationMs) * 100}
				<div class="event-timed" style="top: {top}%; height: {height}%;">
					<div class="event-timed-inner">
						{event.name}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.agenda-wrapper {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
	}
	.all-day-events {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		padding: 0 0.5rem 0;
		margin-bottom: 10px;
		align-items: flex-end;
	}
	.all-day-label {
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding-bottom: 0;
		margin-bottom: 10px;
		font-size: 0.6em;
	}
	.event-all-day {
		font-size: 0.7em;
		letter-spacing: 1.25px;
		padding: 0.15rem 0.5rem;
		color: var(--text);
		background-color: transparent;
	}
	.day {
		position: relative;
		flex: 1;
		display: grid;
		grid-template-columns: 2.5rem 1fr;
		grid-template-rows: repeat(var(--total-rows), 1fr);
		&.has-all-day {
			grid-template-rows: auto repeat(var(--total-rows), 1fr);
		}
		width: 100%;
		height: 100%;
		justify-items: stretch;
		align-items: stretch;
		grid-auto-flow: column;
		padding: 1rem 1rem 0 0;
	}
	.hour {
		position: relative;
		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			border-top: solid 1px var(--outline);
		}
		&:not(.is-hour-start)::after {
			border-top-style: dotted;
			opacity: 0.5;
		}
	}
	.hour-label {
		text-align: center;
		grid-column: 1;
		font-weight: var(--font-weight-light);
		font-size: 0.7em;
		color: var(--text-low);
		margin-top: -0.5rem;
		small {
			color: currentColor;
			font-size: 0.6em;
		}
	}
	.events-overlay {
		grid-column: 2;
		grid-row: 1 / span var(--total-rows);
		position: relative;
		pointer-events: none;
	}
	.day.has-all-day .events-overlay {
		grid-row: 2 / span var(--total-rows);
	}
	.event-timed {
		position: absolute;
		left: 0;
		width: 50%; // Leaves right half for handwriting
		padding: 1px;
	}
	.event-timed-inner {
		font-size: 0.7em;
		padding: 0.15rem 0.35rem;
		width: 100%;
		height: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		color: var(--text);
		display: flex;
		align-items: flex-start;
		line-height: 1.2;
		letter-spacing: 1.25px;
		border-left: solid 2px var(--outline);
		background-color: transparent;
	}
</style>
