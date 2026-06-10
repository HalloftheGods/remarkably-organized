<script lang="ts">
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
		settings = {} as PlannerSettings,
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
</script>

<div class="planner page agenda-day {className}">
	<div
		class="agenda-grid relative flex-1 grid w-full h-full justify-items-stretch items-stretch grid-flow-col {isTimelineOnLeft
			? 'timeline-left grid-cols-[2.5rem_1fr] pr-0'
			: 'timeline-right grid-cols-[1fr_2.5rem] pl-0'}"
		style="grid-template-rows: {hasAllDayEvents
			? 'auto '
			: ''}repeat({metrics.totalRows}, 1fr);">
		{#if hasAllDayEvents}
			<div
				class="all-day-label flex items-center justify-center text-center font-light text-[0.7em] text-[var(--text-sidebar,var(--text-low))] -mt-2 pb-0 mb-[10px] {isTimelineOnLeft
					? 'col-start-1'
					: 'col-start-2'}"
				style="grid-row: 1;">
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
			<div
				class="time-label text-center font-light text-[0.7em] text-[var(--text-sidebar,var(--text-low))] -mt-2 {isTimelineOnLeft
					? 'col-start-1'
					: 'col-start-2'}"
				style="grid-row: {agendaEvents.allDayEvents.length > 0
					? h * metrics.rowsPerHour + 2
					: h * metrics.rowsPerHour + 1} / span {metrics.rowsPerHour};">
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

		{#if agendaEvents.allDayEvents.length > 0}
			<div
				class="all-day-events flex flex-wrap gap-3 px-2 pb-0 mb-[10px] items-end {isTimelineOnLeft
					? 'col-start-2'
					: 'col-start-1'}"
				style="grid-row: 1;">
				{#each agendaEvents.allDayEvents as event}
					<AgendaEvent {event} type="all-day" />
				{/each}
			</div>
		{/if}

		{#each new Array(metrics.totalRows) as _, r (r)}
			{@const isHourStart = r % metrics.rowsPerHour === 0}
			<div
				class="grid-line relative after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:border-t after:border-[var(--outline)] {isHourStart
					? ''
					: 'sub-line after:border-dotted after:opacity-50'} {isTimelineOnLeft
					? 'col-start-2'
					: 'col-start-1'}"
				style="grid-row: {hasAllDayEvents ? r + 2 : r + 1};">
			</div>
		{/each}

		<div
			class="events-container relative pointer-events-none {isTimelineOnLeft
				? 'col-start-2'
				: 'col-start-1'}"
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
