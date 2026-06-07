<script lang="ts">
	import { type CalendarEvent, type Timeframe } from '$lib';
	import { Box, Text } from '$atoms';

	let {
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		use24HourClock = false,
		startTime = 0,
		endTime = 24,
		interval = 60,
		settings = undefined as any,
	} = $props();

	const rowsPerHour = $derived(60 / interval);

	const safeStartTime = $derived(Math.max(0, Math.min(23, Number(startTime) || 0)));
	const safeEndTime = $derived(
		Math.max(safeStartTime + 1, Math.min(24, Number(endTime) || 24)),
	);

	const amStart = $derived(Math.min(safeStartTime, 12));
	const amEnd = $derived(Math.max(amStart, Math.min(safeEndTime, 12)));
	const numAmHours = $derived(amEnd - amStart);
	const amTotalRows = $derived(numAmHours * rowsPerHour);

	const pmStart = $derived(Math.max(safeStartTime, Math.min(12, safeEndTime)));
	const pmEnd = $derived(Math.max(pmStart, safeEndTime));
	const numPmHours = $derived(pmEnd - pmStart);
	const pmTotalRows = $derived(numPmHours * rowsPerHour);

	const maxHours = $derived(Math.max(numAmHours, numPmHours));
	const maxTotalRows = $derived(maxHours * rowsPerHour);

	let dayEvents = $derived(
		(timeframe.start && settings?.eventsByDay?.[timeframe.start.getTime()]) || [],
	);

	const filterAllDayEvents = (e: CalendarEvent) => {
		const duration = e.duration ?? 0;
		const isAllDay = duration === 0 || duration >= 86400;
		return isAllDay;
	};
	let allDayEvents = $derived(dayEvents.filter(filterAllDayEvents));
	const hasAllDayEvents = $derived(allDayEvents.length > 0);

	const filterTimedEvents = (e: CalendarEvent) => {
		const duration = e.duration ?? 0;
		const isAllDay = duration === 0 || duration >= 86400;
		if (isAllDay) return false;

		const timeFromMidnight = e.start * 1000 - timeframe.start.getTime();
		const eventEndFromMidnight = timeFromMidnight + duration * 1000;
		const agendaStartMs = safeStartTime * 3600000;
		const agendaEndMs = safeEndTime * 3600000;
		const isWithinAgendaTime =
			eventEndFromMidnight > agendaStartMs && timeFromMidnight < agendaEndMs;
		return isWithinAgendaTime;
	};
	let timedEvents = $derived(dayEvents.filter(filterTimedEvents));
</script>

<Box class="flex flex-col h-full w-full">
	{#if hasAllDayEvents}
		<Box class="grid grid-cols-[2.5rem_1fr] w-full py-1 shrink-0">
			<Box
				class="flex items-center justify-center text-[0.6em] font-light text-[var(--text-low)] text-center">
				<Text>All Day ➤</Text>
			</Box>
			<Box class="flex flex-wrap gap-2 px-2 items-center">
				{#each allDayEvents as event}
					<Text
						class="text-[0.7em] tracking-[1.25px] py-[0.15rem] px-2 text-[var(--text)] bg-transparent">
						{event.name}
					</Text>
				{/each}
			</Box>
		</Box>
	{/if}

	<Box class="grid grid-cols-2 w-full h-full gap-0">
		<Box
			class="relative grid grid-cols-[2.5rem_1fr] w-full h-full justify-items-stretch items-stretch grid-flow-col pt-4 pr-2 border-r border-[var(--outline)]"
			style="grid-template-rows: repeat(var(--total-rows), 1fr); --total-rows: {maxTotalRows};">
			{#each new Array(numAmHours) as _, h (h)}
				{@const hour = amStart + h}
				{@const isStandardHour = hour > 0 && hour < 24}
				{@const isMidnight = hour === 24}
				<Box
					class="text-center col-start-1 font-light text-[0.7em] text-[var(--text-low)] -mt-2 [&_small]:text-[0.6em] [&_small]:text-inherit"
					style="grid-column: 1; grid-row: {h * rowsPerHour + 1} / span {rowsPerHour};">
					{#if use24HourClock}
						<Text>{hour.toString().padStart(2, '0')}:00</Text>
					{:else if isStandardHour}
						<Text>
							{hour === 12 ? 12 : hour % 12}
							<Text tag="small">{hour < 12 ? 'AM' : 'PM'}</Text>
						</Text>
					{:else if isMidnight}
						<Text>12 <Text tag="small">AM</Text></Text>
					{:else}
						<Text>12 <Text tag="small">AM</Text></Text>
					{/if}
				</Box>
			{/each}

			{#each new Array(amTotalRows) as _, r (r)}
				<Box
					class="relative after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:border-t after:border-[var(--outline)] {r %
						rowsPerHour ===
					0
						? ''
						: 'after:border-dotted after:opacity-50'}"
					style="grid-column: 2; grid-row: {r + 1};">
				</Box>
			{/each}

			<Box
				class="col-start-2 relative pointer-events-none"
				style="grid-row: 1 / span {amTotalRows};">
				{#each timedEvents as event}
					{@const timeFromMidnight = event.start * 1000 - timeframe.start.getTime()}
					{@const durationMs = event.duration ? event.duration * 1000 : 0}
					{@const agendaStartMs = amStart * 3600000}
					{@const agendaEndMs = amEnd * 3600000}
					{@const agendaDurationMs = agendaEndMs - agendaStartMs}
					{@const startOffset = Math.max(0, timeFromMidnight - agendaStartMs)}
					{@const visibleDurationMs =
						timeFromMidnight < agendaStartMs
							? durationMs - (agendaStartMs - timeFromMidnight)
							: durationMs}
					{@const isVisible =
						visibleDurationMs > 0 &&
						timeFromMidnight < agendaEndMs &&
						timeFromMidnight + durationMs > agendaStartMs}

					{#if isVisible}
						{@const top = (startOffset / agendaDurationMs) * 100}
						{@const height =
							(Math.min(visibleDurationMs, agendaEndMs - (agendaStartMs + startOffset)) /
								agendaDurationMs) *
							100}
						<Box
							class="absolute left-0 w-1/2 p-[1px]"
							style="top: {top}%; height: {height}%;">
							<Box
								class="text-[0.7em] py-[0.15rem] px-[0.35rem] w-full h-full overflow-hidden text-ellipsis text-[var(--text)] flex items-start leading-[1.2] tracking-[1.25px] border-l-2 border-[var(--outline)] bg-transparent">
								<Text>{event.name}</Text>
							</Box>
						</Box>
					{/if}
				{/each}
			</Box>
		</Box>

		<Box
			class="relative grid grid-cols-[2.5rem_1fr] w-full h-full justify-items-stretch items-stretch grid-flow-col pt-4 pl-1 pr-[5px] bg-[var(--outline-low)]/50"
			style="grid-template-rows: repeat(var(--total-rows), 1fr); --total-rows: {maxTotalRows};">
			{#each new Array(numPmHours) as _, h (h)}
				{@const hour = pmStart + h}
				{@const isStandardHour = hour > 0 && hour < 24}
				{@const isMidnight = hour === 24}
				<Box
					class="text-center col-start-1 font-light text-[0.7em] text-[var(--text-low)] -mt-2 [&_small]:text-[0.6em] [&_small]:text-inherit"
					style="grid-column: 1; grid-row: {h * rowsPerHour + 1} / span {rowsPerHour};">
					{#if use24HourClock}
						<Text>{hour.toString().padStart(2, '0')}:00</Text>
					{:else if isStandardHour}
						<Text>
							{hour === 12 ? 12 : hour % 12}
							<Text tag="small">{hour < 12 ? 'AM' : 'PM'}</Text>
						</Text>
					{:else if isMidnight}
						<Text>12 <Text tag="small">AM</Text></Text>
					{:else}
						<Text>12 <Text tag="small">AM</Text></Text>
					{/if}
				</Box>
			{/each}

			{#each new Array(pmTotalRows) as _, r (r)}
				<Box
					class="relative after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:border-t after:border-[var(--outline)] {r %
						rowsPerHour ===
					0
						? ''
						: 'after:border-dotted after:opacity-50'}"
					style="grid-column: 2; grid-row: {r + 1};">
				</Box>
			{/each}

			<Box
				class="col-start-2 relative pointer-events-none"
				style="grid-row: 1 / span {pmTotalRows};">
				{#each timedEvents as event}
					{@const timeFromMidnight = event.start * 1000 - timeframe.start.getTime()}
					{@const durationMs = event.duration ? event.duration * 1000 : 0}
					{@const agendaStartMs = pmStart * 3600000}
					{@const agendaEndMs = pmEnd * 3600000}
					{@const agendaDurationMs = agendaEndMs - agendaStartMs}
					{@const startOffset = Math.max(0, timeFromMidnight - agendaStartMs)}
					{@const visibleDurationMs =
						timeFromMidnight < agendaStartMs
							? durationMs - (agendaStartMs - timeFromMidnight)
							: durationMs}
					{@const isVisible =
						visibleDurationMs > 0 &&
						timeFromMidnight < agendaEndMs &&
						timeFromMidnight + durationMs > agendaStartMs}

					{#if isVisible}
						{@const top = (startOffset / agendaDurationMs) * 100}
						{@const height =
							(Math.min(visibleDurationMs, agendaEndMs - (agendaStartMs + startOffset)) /
								agendaDurationMs) *
							100}
						<Box
							class="absolute left-0 w-1/2 p-[1px]"
							style="top: {top}%; height: {height}%;">
							<Box
								class="text-[0.7em] py-[0.15rem] px-[0.35rem] w-full h-full overflow-hidden text-ellipsis text-[var(--text)] flex items-start leading-[1.2] tracking-[1.25px] border-l-2 border-[var(--outline)] bg-transparent">
								<Text>{event.name}</Text>
							</Box>
						</Box>
					{/if}
				{/each}
			</Box>
		</Box>
	</Box>
</Box>
