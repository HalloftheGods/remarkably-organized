<script lang="ts">
	import {
		formatToString,
		getFirstDayOfWeek,
		type Timeframe,
		type CalendarEvent,
		isMoonEvent,
		getMoonEmoji,
	} from '$lib';
	import { Box, Text, Link } from '$atoms';
	import { AgendaEvent, CalendarCell } from '$molecules';

	let {
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		startWeekOnSunday = false,
		use24HourClock = false,
		alignDayTextRight = false,
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
</script>

<Box
	class="relative grid grid-cols-[2.5rem_repeat(7,minmax(0,1fr))] w-full h-full justify-items-stretch items-stretch pr-[2px]"
	style="grid-template-rows: minmax(1.5rem, auto) repeat({totalRows}, 1fr);">
	<Box
		class="text-center col-start-1 font-light text-[0.7em] text-[var(--text-low)] -mt-2 [&_small]:text-[0.6em] [&_small]:text-inherit"
		style="grid-column: 1; grid-row: 1;"></Box>
	{#each new Array(numHours) as _, h (h)}
		{@const hour = startTime + h}
		<Box
			class="text-center col-start-1 font-light text-[0.7em] text-[var(--text-low)] -mt-2 [&_small]:text-[0.6em] [&_small]:text-inherit"
			style="grid-column: 1; grid-row: {h * rowsPerHour + 2} / span {rowsPerHour};">
			{#if use24HourClock}
				<Text>{hour.toString().padStart(2, '0')}:00</Text>
			{:else if hour > 0 && hour < 24}
				<Text>
					{hour === 12 ? 12 : hour % 12}
					<Text tag="small">{hour < 12 ? 'AM' : 'PM'}</Text>
				</Text>
			{:else if hour === 24}
				<Text>12 <Text tag="small">AM</Text></Text>
			{:else}
				<Text>12 <Text tag="small">AM</Text></Text>
			{/if}
		</Box>
	{/each}
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
		{@const allDayEvents = dayEvents.filter(
			(e) => !isMoonEvent(e) && (!e.duration || e.duration >= 86400),
		)}
		{@const timedEvents = dayEvents.filter((e) => {
			if (!e.duration || e.duration >= 86400 || isMoonEvent(e)) return false;
			const timeFromMidnight = e.start * 1000 - date.getTime();
			const eventEndFromMidnight = timeFromMidnight + e.duration * 1000;
			const agendaStartMs = startTime * 3600000;
			const agendaEndMs = endTime * 3600000;
			return eventEndFromMidnight > agendaStartMs && timeFromMidnight < agendaEndMs;
		})}
		{@const moonEvent = dayEvents.find((e) => isMoonEvent(e) && !e.duration)}

		<CalendarCell
			class="text-[0.9em] pt-[0.2rem] px-[0.2rem] pb-0 font-light !border-l-0 [&_.ordinal]:text-[0.75em] [&_.ordinal]:align-text-top [&_.date-header]:!m-0 [&_.date-header]:!block [&_.moon]:text-[1.1em] [&_.moon]:align-text-top [&_.moon]:leading-none {i %
				2 !==
			0
				? 'bg-[var(--outline-low)]/40'
				: ''} {alignDayTextRight
				? 'text-right [&_.moon]:float-left'
				: 'text-center [&_.moon]:float-right'}"
			altRow={i % 2 !== 0}
			dim={isDateDisabled(date)}
			href={timeframe.weekStart
				? `#{date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
				: undefined}
			style="grid-column: {i + 2}; grid-row: 1;"
			moonEmoji={moonEvent ? (getMoonEmoji(moonEvent.name) ?? '') : ''}>
			<Text>
				{date.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}, {date.toLocaleString(
					'default',
					{ month: 'short', timeZone: 'UTC' },
				)}
				{@html formatToString(date.getUTCDate(), { type: 'ordinal', html: true })}
			</Text>
			{#if allDayEvents.length > 0}
				<Box
					class="flex flex-col gap-[0.15rem] mt-1 items-center [&_.event-all-day]:text-[0.75em] [&_.event-all-day]:tracking-[0.25px] [&_.event-all-day]:py-[0.1rem] [&_.event-all-day]:px-[0.25rem] [&_.event-all-day]:text-[var(--text)] [&_.event-all-day]:leading-[1.1] [&_.event-all-day]:w-full [&_.event-all-day]:whitespace-nowrap [&_.event-all-day]:overflow-hidden [&_.event-all-day]:text-ellipsis [&_.event-all-day]:bg-transparent">
					{#each allDayEvents as event}
						<AgendaEvent {event} type="all-day" />
					{/each}
				</Box>
			{/if}
		</CalendarCell>

		{#each new Array(totalRows) as _, r (r)}
			{@const isHourStart = r % rowsPerHour === 0}
			{@const isLastRow = r === totalRows - 1}
			{@const isActive =
				timeframe.month === date.getUTCMonth() + 1 &&
				timeframe.daySinceMonth === date.getUTCDate()}
			<Box
				class="border-t border-l border-[var(--outline)] {i === 6 ? 'border-r' : ''} {i %
					2 !==
				0
					? 'bg-[var(--outline-low)]/40'
					: ''} {isHourStart ? '' : 'border-t-dotted opacity-50'} {isLastRow
					? 'border-b'
					: ''} {isActive ? 'bg-[var(--outline-low)]' : ''}"
				style="grid-column: {i + 2}; grid-row: {r + 2};">
			</Box>
		{/each}
		<Box
			class="relative pointer-events-none z-10"
			style="grid-column: {i + 2}; grid-row: 2 / span {totalRows};">
			{#each timedEvents as event}
				{@const timeFromMidnight = event.start * 1000 - date.getTime()}
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
		</Box>
	{/each}
</Box>
