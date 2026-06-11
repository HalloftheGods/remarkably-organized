<script lang="ts">
	import {
		type CalendarEvent,
		type Timeframe,
		calculateAgendaMetrics,
		filterAgendaEvents,
		calculateEventStyle,
	} from '$lib';
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

	const metrics = $derived(calculateAgendaMetrics(startTime, endTime, interval));
	const dayEvents = $derived(
		(timeframe.start && settings?.eventsByDay?.[timeframe.start.getTime()]) || [],
	);
	const agendaEvents = $derived(
		filterAgendaEvents(dayEvents, timeframe, metrics.safeStartTime, metrics.safeEndTime),
	);
	const isTimelineOnLeft = $derived(settings?.sideNav?.leftSide !== false);
</script>

<div class="notes-day-day">
	<div class="notes-day-grid">
		<Grid display="dotted" />
	</div>
	<div
		class="notes-day-hours {isTimelineOnLeft ? 'items-start' : 'items-end'}"
		style="{isTimelineOnLeft ? 'left: 0;' : 'right: 0;'} text-align: {isTimelineOnLeft
			? 'left'
			: 'right'};">
		{#each new Array(metrics.numHours) as _, h (h)}
			{@const hour = metrics.safeStartTime + h}
			<div class="notes-day-hour {isTimelineOnLeft ? 'items-start' : 'items-end'}">
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
	<div
		class="notes-day-events-overlay"
		style="{isTimelineOnLeft ? 'left: 3rem; right: 0;' : 'left: 0; right: 3rem;'}">
		{#if agendaEvents.allDayEvents.length > 0}
			<div class="notes-day-all-day-events">
				{#each agendaEvents.allDayEvents as event}
					<div class="notes-day-event-all-day">{event.name}</div>
				{/each}
			</div>
		{/if}
		{#each agendaEvents.timedEvents as event}
			{@const eventStartMs = event.start * 1000 - timeframe.start.getTime()}
			{@const eventDurationMs = event.duration ? event.duration * 1000 : 0}
			{@const agendaStartMs = metrics.safeStartTime * 3600000}
			{@const agendaEndMs = metrics.safeEndTime * 3600000}
			{@const style = calculateEventStyle(
				eventStartMs,
				eventDurationMs,
				agendaStartMs,
				agendaEndMs,
			)}
			{#if style.isVisible}
				<div class="notes-day-event-timed" style="top: {style.top}%; height: {style.height}%;">
					<div class="notes-day-event-timed-inner">
						{event.name}
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>
