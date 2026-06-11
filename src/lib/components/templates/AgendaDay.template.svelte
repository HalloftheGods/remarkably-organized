<script lang="ts">
	import RowInput from '$atoms/RowInput.svelte';
	import {
		type CalendarEvent,
		type Timeframe,
		type PlannerSettings,
		calculateAgendaMetrics,
		filterAgendaEvents,
		calculateEventStyle,
	} from '$lib';
	import { AgendaEvent } from '$molecules';

	let {
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		use24HourClock = false,
		startTime = 0,
		endTime = 24,
		interval = 60,
		settings = undefined as any,
		isStandalone = true,
		class: className = '',
	} = $props();

	const metrics = $derived(calculateAgendaMetrics(startTime, endTime, interval));
	const dayEvents = $derived(
		(timeframe.start && settings?.eventsByDay?.[timeframe.start.getTime()]) || [],
	);

	const agendaEvents = $derived(
		filterAgendaEvents(dayEvents, timeframe, metrics.safeStartTime, metrics.safeEndTime),
	);

	const hasAllDayEvents = $derived(agendaEvents.allDayEvents.length > 0);
	const isTimelineOnLeft = $derived(settings?.sideNav?.leftSide !== false);

	const paddedClass = $derived(isStandalone ? 'padded' : '');
	const gridColsClass = $derived(
		isTimelineOnLeft ? 'grid-cols-[2.5rem_1fr] pr-0' : 'grid-cols-[1fr_2.5rem] pl-0',
	);
	const gridRowsStyle = $derived(
		`grid-template-rows: ${hasAllDayEvents ? 'auto ' : ''}repeat(${metrics.totalRows}, 1fr);`,
	);
	const timelineColClass = $derived(isTimelineOnLeft ? 'col-start-1' : 'col-start-2');
	const contentColClass = $derived(isTimelineOnLeft ? 'col-start-2' : 'col-start-1');
</script>

<div class="planner page agenda-day {paddedClass} {className} min-w-0">
	<div class="agenda-day-grid {gridColsClass}" style={gridRowsStyle}>
		{#if hasAllDayEvents}
			<div class="agenda-day-all-day-label {timelineColClass}" style="grid-row: 1;">
				<span>
					All
					<br />
					Day ➤
				</span>
			</div>
		{/if}

		{#each new Array(metrics.numHours) as _, h (h)}
			{@const hour = metrics.safeStartTime + h}
			{@const isStandardHour = hour > 0 && hour < 24}
			{@const isMidnight = hour === 24}
			{@const rowStart = hasAllDayEvents
				? h * metrics.rowsPerHour + 2
				: h * metrics.rowsPerHour + 1}

			<div
				class="agenda-day-time-label {timelineColClass}"
				style="grid-row: {rowStart} / span {metrics.rowsPerHour};">
				{#if use24HourClock}
					<span>{hour.toString().padStart(2, '0')}:00</span>
				{:else if isStandardHour}
					<span>
						{hour === 12 ? 12 : hour % 12}
						<small class="text-[0.6em] text-inherit">{hour < 12 ? 'AM' : 'PM'}</small>
					</span>
				{:else if isMidnight}
					<span>
						12 <small class="text-[0.6em] text-inherit">AM</small>
					</span>
				{:else}
					<span>
						12 <small class="text-[0.6em] text-inherit">AM</small>
					</span>
				{/if}
			</div>
		{/each}

		{#if hasAllDayEvents}
			<div class="agenda-day-all-day-events {contentColClass}" style="grid-row: 1;">
				{#each agendaEvents.allDayEvents as event}
					<AgendaEvent {event} type="all-day" />
				{/each}
			</div>
		{/if}

		{#each new Array(metrics.totalRows) as _, r (r)}
			{@const isHourStart = r % metrics.rowsPerHour === 0}
			{@const lineClass = isHourStart ? '' : 'after:border-solid after:opacity-50'}
			{@const rowStart = hasAllDayEvents ? r + 2 : r + 1}

			<div
				class="agenda-day-grid-line {lineClass} {contentColClass}"
				style="grid-row: {rowStart};">
				<RowInput />
			</div>
		{/each}

		<div
			class="events-container relative pointer-events-none {contentColClass}"
			style="grid-row: {hasAllDayEvents ? 2 : 1} / span {metrics.totalRows};">
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
					<AgendaEvent
						{event}
						type="timed"
						style="top: {style.top}%; height: {style.height}%;" />
				{/if}
			{/each}
		</div>
	</div>
</div>
