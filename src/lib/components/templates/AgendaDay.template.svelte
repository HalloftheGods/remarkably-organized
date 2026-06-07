<script lang="ts">
	import { type CalendarEvent, type Timeframe, type PlannerSettings } from '$lib';
	import { Box, Text } from '$atoms';
	import { AgendaEvent } from '$molecules';

	let {
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		use24HourClock = false,
		startTime = 0,
		endTime = 24,
		interval = 60,
		settings = {} as PlannerSettings,
	} = $props();

	const safeStartTime = $derived(Math.max(0, Math.min(23, Number(startTime) || 0)));
	const safeEndTime = $derived(
		Math.max(safeStartTime + 1, Math.min(24, Number(endTime) || 24)),
	);

	const numHours = $derived(safeEndTime - safeStartTime);
	const rowsPerHour = $derived(60 / interval);
	const totalRows = $derived(numHours * rowsPerHour);

	let dayEvents = $derived(
		(timeframe.start && settings?.eventsByDay?.[timeframe.start.getTime()]) || [],
	);

	let allDayEvents = $derived(
		dayEvents.filter((e) => !e.duration || e.duration >= 86400),
	);
	let timedEvents = $derived(
		dayEvents.filter((e) => {
			if (!e.duration || e.duration >= 86400) return false;
			const timeFromMidnight = e.start * 1000 - timeframe.start.getTime();
			const eventEndFromMidnight = timeFromMidnight + e.duration * 1000;
			const agendaStartMs = safeStartTime * 3600000;
			const agendaEndMs = safeEndTime * 3600000;

			return eventEndFromMidnight > agendaStartMs && timeFromMidnight < agendaEndMs;
		}),
	);

	const hasAllDayEvents = $derived(allDayEvents.length > 0);
	const isTimelineOnLeft = $derived(settings?.sideNav?.leftSide !== false);
</script>

<Box class="flex flex-col h-full w-full">
	<Box
		class="relative flex-1 grid {isTimelineOnLeft
			? 'grid-cols-[2.5rem_1fr] pr-4'
			: 'grid-cols-[1fr_2.5rem] pl-4'} w-full h-full justify-items-stretch items-stretch grid-flow-col pt-4"
		style="grid-template-rows: {hasAllDayEvents ? 'auto ' : ''}repeat({totalRows}, 1fr);">
		{#if hasAllDayEvents}
			<Box
				class="text-center {isTimelineOnLeft
					? 'col-start-1'
					: 'col-start-2'} font-light text-[0.7em] text-[var(--text-low)] -mt-2 [&_small]:text-[0.6em] [&_small]:text-inherit flex items-end justify-center pb-0 mb-[10px] text-[0.6em]"
				style="grid-column: {isTimelineOnLeft ? 1 : 2}; grid-row: 1;">
				<Text>
					All
					<br />
					Day ➤
				</Text>
			</Box>
		{/if}
		{#each new Array(numHours) as _, h (h)}
			{@const hour = safeStartTime + h}
			<Box
				class="text-center {isTimelineOnLeft
					? 'col-start-1'
					: 'col-start-2'} font-light text-[0.7em] text-[var(--text-low)] -mt-2 [&_small]:text-[0.6em] [&_small]:text-inherit"
				style="grid-column: {isTimelineOnLeft ? 1 : 2}; grid-row: {allDayEvents.length > 0
					? h * rowsPerHour + 2
					: h * rowsPerHour + 1} / span {rowsPerHour};">
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

		{#if allDayEvents.length > 0}
			<Box
				class="flex flex-wrap gap-3 px-2 pb-0 mb-[10px] items-end {isTimelineOnLeft
					? 'col-start-2'
					: 'col-start-1'}"
				style="grid-column: {isTimelineOnLeft ? 2 : 1}; grid-row: 1;">
				{#each allDayEvents as event}
					<AgendaEvent {event} type="all-day" />
				{/each}
			</Box>
		{/if}
		{#each new Array(totalRows) as _, r (r)}
			{@const isHourStart = r % rowsPerHour === 0}
			<Box
				class="relative after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:border-t after:border-[var(--outline)] {isHourStart
					? ''
					: 'after:border-dotted after:opacity-50'} {isTimelineOnLeft
					? 'col-start-2'
					: 'col-start-1'}"
				style="grid-column: {isTimelineOnLeft ? 2 : 1}; grid-row: {hasAllDayEvents
					? r + 2
					: r + 1};">
			</Box>
		{/each}

		<Box
			class="{isTimelineOnLeft
				? 'col-start-2'
				: 'col-start-1'} relative pointer-events-none"
			style="grid-column: {isTimelineOnLeft ? 2 : 1}; grid-row: {hasAllDayEvents
				? 2
				: 1} / span {totalRows};">
			{#each timedEvents as event}
				{@const timeFromMidnight = event.start * 1000 - timeframe.start.getTime()}
				{@const durationMs = event.duration ? event.duration * 1000 : 0}
				{@const agendaStartMs = safeStartTime * 3600000}
				{@const agendaEndMs = safeEndTime * 3600000}
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
	</Box>
</Box>
