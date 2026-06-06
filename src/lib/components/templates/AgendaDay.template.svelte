<script lang="ts">
	import { type CalendarEvent, type Timeframe } from '$lib';
	import { Box, Text } from '$atoms';
	import { AgendaEvent } from '$molecules';

	let {
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		use24HourClock = false,
		startTime = 0,
		endTime = 24,
		interval = 60,
	} = $props();

	const safeStartTime = $derived(Math.max(0, Math.min(23, Number(startTime) || 0)));
	const safeEndTime = $derived(
		Math.max(safeStartTime + 1, Math.min(24, Number(endTime) || 24)),
	);

	const numHours = $derived(safeEndTime - safeStartTime);
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
</script>

<div class="agenda-wrapper">
	<Box
		class="day {hasAllDayEvents ? 'has-all-day' : ''}"
		style="--total-rows: {totalRows};">
		{#if hasAllDayEvents}
			<Box class="hour-label all-day-label" style="grid-column: 1; grid-row: 1;">
				<Text>All Day ➤</Text>
			</Box>
		{/if}
		{#each new Array(numHours) as _, h (h)}
			{@const hour = safeStartTime + h}
			<Box
				class="hour-label"
				style="grid-column: 1; grid-row: {allDayEvents.length > 0
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
			<Box class="all-day-events" style="grid-column: 2; grid-row: 1;">
				{#each allDayEvents as event}
					<AgendaEvent {event} type="all-day" />
				{/each}
			</Box>
		{/if}
		{#each new Array(totalRows) as _, r (r)}
			{@const isHourStart = r % rowsPerHour === 0}
			<Box
				class="hour {isHourStart ? 'is-hour-start' : ''}"
				style="grid-column: 2; grid-row: {hasAllDayEvents ? r + 2 : r + 1};">
			</Box>
		{/each}

		<Box class="events-overlay">
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
</div>

<style lang="scss">
	.agenda-wrapper {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;

		:global(.all-day-events) {
			display: flex;
			flex-wrap: wrap;
			gap: 0.75rem;
			padding: 0 0.5rem 0;
			margin-bottom: 10px;
			align-items: flex-end;
		}
		:global(.all-day-label) {
			display: flex;
			align-items: flex-end;
			justify-content: center;
			padding-bottom: 0;
			margin-bottom: 10px;
			font-size: 0.6em;
		}
		:global(.day) {
			position: relative;
			flex: 1;
			display: grid;
			grid-template-columns: 2.5rem 1fr;
			grid-template-rows: repeat(var(--total-rows), 1fr);
			width: 100%;
			height: 100%;
			justify-items: stretch;
			align-items: stretch;
			grid-auto-flow: column;
			padding: 1rem 1rem 0 0;
		}
		:global(.day.has-all-day) {
			grid-template-rows: auto repeat(var(--total-rows), 1fr);
		}
		:global(.hour) {
			position: relative;
			&::after {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				border-top: solid 1px var(--outline);
			}
		}
		:global(.hour:not(.is-hour-start))::after {
			border-top-style: dotted;
			opacity: 0.5;
		}
		:global(.hour-label) {
			text-align: center;
			grid-column: 1;
			font-weight: var(--font-weight-light);
			font-size: 0.7em;
			color: var(--text-low);
			margin-top: -0.5rem;
		}
		:global(.hour-label small) {
			color: currentColor;
			font-size: 0.6em;
		}
		:global(.events-overlay) {
			grid-column: 2;
			grid-row: 1 / span var(--total-rows);
			position: relative;
			pointer-events: none;
		}
		:global(.day.has-all-day .events-overlay) {
			grid-row: 2 / span var(--total-rows);
		}
	}
</style>
