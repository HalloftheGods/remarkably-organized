<script lang="ts">
	import type { CalendarEvent, Timeframe } from '$lib';
	import { Grid } from '$molecules';

	let {
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		use24HourClock = false,
		startTime = 5,
		endTime = 22,
		interval = 60,
		settings = undefined as any,
	} = $props();

	const numHours = $derived(endTime - startTime);

	let dayEvents = $derived(
		((timeframe.start && settings?.eventsByDay?.[timeframe.start.getTime()]) ||
			[]) as CalendarEvent[],
	);

	let allDayEvents = $derived(
		dayEvents.filter((e) => !e.duration || e.duration >= 86400),
	);

	let timedEvents = $derived(
		dayEvents.filter((e) => {
			if (!e.duration || e.duration >= 86400) return false;
			const timeFromMidnight = e.start * 1000 - timeframe.start.getTime();
			const eventEndFromMidnight = timeFromMidnight + e.duration * 1000;
			const agendaStartMs = startTime * 3600000;
			const agendaEndMs = endTime * 3600000;
			return eventEndFromMidnight > agendaStartMs && timeFromMidnight < agendaEndMs;
		}),
	);
</script>

<div class="notes-day-day">
	<div class="notes-day-grid">
		<Grid display="dotted" />
	</div>
	<div class="notes-day-hours">
		{#each new Array(numHours) as _, h (h)}
			{@const hour = startTime + h}
			<div class="notes-day-hour">
				<span>
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
				</span>
			</div>
		{/each}
	</div>
	<div class="notes-day-events-overlay">
		{#if allDayEvents.length > 0}
			<div class="notes-day-all-day-events">
				{#each allDayEvents as event}
					<div class="notes-day-event-all-day">{event.name}</div>
				{/each}
			</div>
		{/if}
		{#each timedEvents as event}
			{@const timeFromMidnight = event.start * 1000 - timeframe.start.getTime()}
			{@const durationMs = event.duration ? event.duration * 1000 : 0}
			{@const agendaStartMs = startTime * 3600000}
			{@const agendaEndMs = endTime * 3600000}
			{@const agendaDurationMs = agendaEndMs - agendaStartMs}
			{@const startOffset = Math.max(0, timeFromMidnight - agendaStartMs)}
			{@const visibleDurationMs =
				timeFromMidnight < agendaStartMs
					? durationMs - (agendaStartMs - timeFromMidnight)
					: durationMs}
			{@const top = (startOffset / agendaDurationMs) * 100}
			{@const height =
				(Math.min(visibleDurationMs, agendaEndMs - (agendaStartMs + startOffset)) /
					agendaDurationMs) *
				100}
			<div class="notes-day-event-timed" style="top: {top}%; height: {height}%;">
				<div class="notes-day-event-timed-inner">
					{event.name}
				</div>
			</div>
		{/each}
	</div>
</div>

