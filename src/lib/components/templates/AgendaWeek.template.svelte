<script lang="ts">
	import {
		formatToString,
		getFirstDayOfWeek,
		type Timeframe,
		type CalendarEvent,
		isMoonEvent,
		getMoonEmoji,
		getDateHash,
	} from '$lib';
	import { Link } from '$atoms';
	import { AgendaEvent, CalendarCell } from '$molecules';

	let {
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		startWeekOnSunday = false,
		use24HourClock = false,
		alignDayText = 'center' as 'left' | 'center' | 'right',
		startTime = 0,
		endTime = 24,
		interval = 60,
		settings = undefined as any,
	} = $props();

	const isDateDisabled = (date: Date) => {
		if (!settings) return false;
		if (settings.dayPage?.disable) return true;
		const time = date.getTime();
		const start = settings.date?.start?.getTime() || 0;
		const end = settings.date?.end?.getTime() || Infinity;
		return time < start || time > end;
	};

	const numHours = $derived(endTime - startTime);
	const rowsPerHour = $derived(60 / interval);
	const totalRows = $derived(numHours * rowsPerHour);

	const weekStart = $derived(
		new Date(getFirstDayOfWeek(timeframe.start, startWeekOnSunday)),
	);

	const isTimelineOnLeft = $derived(settings?.sideNav?.leftSide !== false);

	const weekDays = $derived(
		Array.from({ length: 7 }, (_, i) => {
			const date = new Date(weekStart.getTime() + i * 86400000);
			const dayEvents = (settings?.eventsByDay?.[date.getTime()] ||
				[]) as CalendarEvent[];
			const allDayEvents = dayEvents.filter(
				(e) => !isMoonEvent(e) && (!e.duration || e.duration >= 86400),
			);
			const timedEvents = dayEvents.filter((e) => {
				if (!e.duration || e.duration >= 86400 || isMoonEvent(e)) return false;
				const timeFromMidnight = e.start * 1000 - date.getTime();
				const eventEndFromMidnight = timeFromMidnight + e.duration * 1000;
				const agendaStartMs = startTime * 3600000;
				const agendaEndMs = endTime * 3600000;
				return eventEndFromMidnight > agendaStartMs && timeFromMidnight < agendaEndMs;
			});
			const moonEvent = dayEvents.find((e) => isMoonEvent(e) && !e.duration);
			const isDisabled = isDateDisabled(date);
			const isActive =
				timeframe.month === date.getUTCMonth() + 1 &&
				timeframe.daySinceMonth === date.getUTCDate();

			return {
				date,
				dayEvents,
				allDayEvents,
				timedEvents,
				moonEvent,
				isDisabled,
				isActive,
			};
		}),
	);
</script>

<div
	class="planner page padded gap-0 agenda-timeline-grid {isTimelineOnLeft
		? 'grid-cols-[2.5rem_repeat(7,minmax(0,1fr))] pr-[2px]'
		: 'grid-cols-[repeat(7,minmax(0,1fr))_2.5rem] pl-[2px]'}"
	style="grid-template-rows: minmax(1.5rem, auto) repeat({totalRows}, 1fr);">
	<div
		class="text-center {isTimelineOnLeft
			? 'col-start-1'
			: 'col-start-8'} agenda-timeline-hour"
		style="grid-column: {isTimelineOnLeft ? 1 : 8}; grid-row: 1;">
	</div>
	{#each new Array(numHours) as _, h (h)}
		{@const hour = startTime + h}
		<div
			class="text-center {isTimelineOnLeft
				? 'col-start-1'
				: 'col-start-8'} agenda-timeline-hour"
			style="grid-column: {isTimelineOnLeft ? 1 : 8}; grid-row: {h * rowsPerHour +
				2} / span {rowsPerHour};">
			{#if use24HourClock}
				<span>{hour.toString().padStart(2, '0')}:00</span>
			{:else if hour > 0 && hour < 24}
				<span>
					{hour === 12 ? 12 : hour % 12}
					<small>{hour < 12 ? 'AM' : 'PM'}</small>
				</span>
			{:else if hour === 24}
				<span>
					12 <small>AM</small>
				</span>
			{:else}
				<span>
					12 <small>AM</small>
				</span>
			{/if}
		</div>
	{/each}
	{#each weekDays as day, i (i)}
		<CalendarCell
			class="agenda-day-cell {i % 2 !== 0
				? 'bg-[var(--outline-low)]/40'
				: ''} {alignDayText === 'right'
				? 'text-right [&_.moon]:float-left'
				: alignDayText === 'left'
					? 'text-left [&_.moon]:float-right'
					: 'text-center [&_.moon]:float-right'}"
			altRow={i % 2 !== 0}
			dim={day.isDisabled}
			href={timeframe.start ? getDateHash(day.date) : undefined}
			style="grid-column: {isTimelineOnLeft ? i + 2 : i + 1}; grid-row: 1;"
			moonEmoji={day.moonEvent ? (getMoonEmoji(day.moonEvent.name) ?? '') : ''}>
			<span>
				{day.date.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}
				{@html formatToString(day.date.getUTCDate(), { type: 'ordinal', html: true })}
			</span>
			{#if day.allDayEvents.length > 0}
				<div class="agenda-all-day-events">
					{#each day.allDayEvents as event}
						<AgendaEvent {event} type="all-day" />
					{/each}
				</div>
			{/if}
		</CalendarCell>

		{#each new Array(totalRows) as _, r (r)}
			{@const isHourStart = r % rowsPerHour === 0}
			{@const isLastRow = r === totalRows - 1}
			<div
				class="border-t {i === 0 && !isTimelineOnLeft
					? '!border-l-0'
					: 'border-l'} border-[var(--outline)] {i === 6 ? 'border-r' : ''} {i % 2 !== 0
					? 'bg-[var(--outline-low)]/40'
					: ''} {isHourStart ? '' : 'border-t-dotted opacity-50'} {isLastRow
					? 'border-b'
					: ''} {day.isActive ? 'bg-[var(--outline-low)]' : ''}"
				style="grid-column: {isTimelineOnLeft ? i + 2 : i + 1}; grid-row: {r + 2};">
			</div>
		{/each}
		<div
			class="relative pointer-events-none z-10"
			style="grid-column: {i + 2}; grid-row: 2 / span {totalRows};">
			{#each day.timedEvents as event}
				{@const timeFromMidnight = event.start * 1000 - day.date.getTime()}
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
				<AgendaEvent {event} type="timed" style="top: {top}%; height: {height}%;" />
			{/each}
		</div>
	{/each}
</div>
