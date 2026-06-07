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

	const filterDayEvents = (e: CalendarEvent) => {
		const hasNoStart = !timeframe.start;
		if (hasNoStart) return false;

		const dayStart = timeframe.start.getTime();
		const dayEnd = dayStart + 86400000;
		const eventStart = e.start * 1000;
		const eventEnd = eventStart + (e.duration || 86400) * 1000;
		const isWithinDay = eventStart < dayEnd && eventEnd > dayStart;
		return isWithinDay;
	};
	let dayEvents = $derived(events.filter(filterDayEvents));

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

<Box class="agenda-day-split">
	{#if hasAllDayEvents}
		<Box class="all-day-section">
			<Box class="hour-label all-day-label">
				<Text>All Day ➤</Text>
			</Box>
			<Box class="all-day-events">
				{#each allDayEvents as event}
					<Text class="event-all-day">{event.name}</Text>
				{/each}
			</Box>
		</Box>
	{/if}

	<Box class="split-layout">
		<Box class="day am-column" style="--total-rows: {maxTotalRows};">
			{#each new Array(numAmHours) as _, h (h)}
				{@const hour = amStart + h}
				{@const isStandardHour = hour > 0 && hour < 24}
				{@const isMidnight = hour === 24}
				<Box
					class="hour-label"
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
					class="hour {r % rowsPerHour === 0 ? 'is-hour-start' : ''}"
					style="grid-column: 2; grid-row: {r + 1};">
				</Box>
			{/each}

			<Box class="events-overlay" style="--col-rows: {amTotalRows};">
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
						<Box class="event-timed" style="top: {top}%; height: {height}%;">
							<Box class="event-timed-inner">
								<Text>{event.name}</Text>
							</Box>
						</Box>
					{/if}
				{/each}
			</Box>
		</Box>

		<Box class="day pm-column night-side" style="--total-rows: {maxTotalRows};">
			{#each new Array(numPmHours) as _, h (h)}
				{@const hour = pmStart + h}
				{@const isStandardHour = hour > 0 && hour < 24}
				{@const isMidnight = hour === 24}
				<Box
					class="hour-label"
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
					class="hour {r % rowsPerHour === 0 ? 'is-hour-start' : ''}"
					style="grid-column: 2; grid-row: {r + 1};">
				</Box>
			{/each}

			<Box class="events-overlay" style="--col-rows: {pmTotalRows};">
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
						<Box class="event-timed" style="top: {top}%; height: {height}%;">
							<Box class="event-timed-inner">
								<Text>{event.name}</Text>
							</Box>
						</Box>
					{/if}
				{/each}
			</Box>
		</Box>
	</Box>
</Box>

<style lang="scss">
	.agenda-day-split {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;

		:global(.all-day-section) {
			display: grid;
			grid-template-columns: 2.5rem 1fr;
			width: 100%;
			padding: 0.25rem 0;
			flex-shrink: 0;
		}
		:global(.all-day-label) {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 0.6em;
			font-weight: var(--font-weight-light);
			color: var(--text-low);
			text-align: center;
		}
		:global(.all-day-events) {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;
			padding: 0 0.5rem;
			align-items: center;
		}
		:global(.event-all-day) {
			font-size: 0.7em;
			letter-spacing: 1.25px;
			padding: 0.15rem 0.5rem;
			color: var(--text);
			background-color: transparent;
		}
		:global(.split-layout) {
			display: grid;
			grid-template-columns: 1fr 1fr;
			width: 100%;
			height: 100%;
			gap: 0;
		}
		:global(.am-column) {
			padding-right: 0.5rem;
			border-right: solid 1px var(--outline);
		}
		:global(.pm-column) {
			padding-left: 0.25rem;
			padding-right: 5px;
		}
		:global(.night-side) {
			background-color: var(--outline-low);
			opacity: 0.5;
		}
		:global(.day) {
			position: relative;
			display: grid;
			grid-template-columns: 2.5rem 1fr;
			grid-template-rows: repeat(var(--total-rows), 1fr);
			width: 100%;
			height: 100%;
			justify-items: stretch;
			align-items: stretch;
			grid-auto-flow: column;
			padding-top: 1rem;
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
			&:not(.is-hour-start)::after {
				border-top-style: dotted;
				opacity: 0.5;
			}
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
			grid-row: 1 / span var(--col-rows, var(--total-rows));
			position: relative;
			pointer-events: none;
		}
		:global(.event-timed) {
			position: absolute;
			left: 0;
			width: 50%;
			padding: 1px;
		}
		:global(.event-timed-inner) {
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
	}
</style>
