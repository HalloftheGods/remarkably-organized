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

<div
	class="agenda-week {alignDayTextRight ? 'align-right' : ''}"
	style="--total-rows: {totalRows};">
	<Box class="hour-label" style="grid-column: 1; grid-row: 1;"></Box>
	{#each new Array(numHours) as _, h (h)}
		{@const hour = startTime + h}
		<Box
			class="hour-label"
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
			class="day"
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
				<Box class="all-day-events">
					{#each allDayEvents as event}
						<AgendaEvent {event} type="all-day" />
					{/each}
				</Box>
			{/if}
		</CalendarCell>

		{#each new Array(totalRows) as _, r (r)}
			{@const isHourStart = r % rowsPerHour === 0}
			{@const isLastRow = r === totalRows - 1}
			{@const isActive = timeframe.month === date.getUTCMonth() + 1 &&
				timeframe.daySinceMonth === date.getUTCDate()}
			<Box
				class="hour {i % 2 !== 0 ? 'alt' : ''} {isHourStart ? 'is-hour-start' : ''} {isLastRow ? 'is-last-row' : ''} {isActive ? 'active' : ''}"
				style="grid-column: {i + 2}; grid-row: {r + 2};">
			</Box>
		{/each}
		<Box
			class="events-overlay"
			style="grid-column: {i + 2}; grid-row: 2 / span var(--total-rows);">
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
</div>

<style lang="scss">
	.agenda-week {
		display: grid;
		position: relative;
		grid-template-columns: 2.5rem repeat(7, minmax(0, 1fr));
		grid-template-rows: minmax(1.5rem, auto) repeat(var(--total-rows), 1fr);
		width: 100%;
		height: 100%;
		justify-items: stretch;
		align-items: stretch;
		padding: 0 2px 0 0;

		&.align-right {
			:global(.day) {
				text-align: right;
			}
			:global(.day .moon) {
				float: left;
			}
		}

		:global(.day) {
			font-size: 0.9em;
			text-align: center;
			padding: 0.2rem 0.2rem 0;
			font-weight: var(--font-weight-light);
			border-left: none !important;
		}

		:global(.day .ordinal) {
			font-size: 0.75em;
			vertical-align: text-top;
		}

		:global(.day .date-header) {
			margin: 0 !important;
			display: block !important;
		}

		:global(.day .moon) {
			float: right;
			font-size: 1.1em;
			vertical-align: text-top;
			line-height: 1;
		}

		:global(.hour) {
			border-top: solid 1px var(--outline);
			border-left: solid 1px var(--outline);
		}
		:global(.hour.active) {
			background-color: var(--outline-low);
		}
		:global(.hour:not(.is-hour-start)) {
			border-top-style: dotted;
			opacity: 0.5;
		}
		:global(.day.alt),
		:global(.hour.alt) {
			background-color: var(--outline-low);
			opacity: 0.4;
		}
		:global(.day ~ .day ~ .day ~ .day ~ .day ~ .day ~ .day ~ .hour) {
			border-right: solid 1px var(--outline);
		}
		/* To apply bottom border to the last row of hours */
		:global(.hour.is-last-row) {
			border-bottom: solid 1px var(--outline);
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
			position: relative;
			pointer-events: none;
			z-index: 2;
		}
		:global(.all-day-events) {
			display: flex;
			flex-direction: column;
			gap: 0.15rem;
			margin-top: 0.25rem;
			align-items: center;
		}
		:global(.all-day-events .event-all-day) {
			font-size: 0.75em;
			letter-spacing: 0.25px;
			padding: 0.1rem 0.25rem;
			color: var(--text);
			line-height: 1.1;
			width: 100%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			background-color: transparent;
		}
	}
</style>
