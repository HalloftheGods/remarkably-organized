<script lang="ts">
	import {
		formatToString,
		getFirstDayOfWeek,
		type Timeframe,
		type CalendarEvent,
		isMoonEvent,
		getMoonEmoji,
	} from '$lib';

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
	class="week"
	class:align-right={alignDayTextRight}
	style="--total-rows: {totalRows};">
	<div class="hour-label" style="grid-column: 1; grid-row: 1;"></div>
	{#each new Array(numHours) as _, h (h)}
		{@const hour = startTime + h}
		<div class="hour-label" style="grid-column: 1; grid-row: {h * rowsPerHour + 2} / span {rowsPerHour};">
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
		</div>
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
		{@const allDayEvents = dayEvents.filter((e) => !isMoonEvent(e) && (!e.duration || e.duration >= 86400))}
		{@const timedEvents = dayEvents.filter((e) => {
			if (!e.duration || e.duration >= 86400 || isMoonEvent(e)) return false;
			const timeFromMidnight = e.start * 1000 - date.getTime();
			const eventEndFromMidnight = timeFromMidnight + e.duration * 1000;
			const agendaStartMs = startTime * 3600000;
			const agendaEndMs = endTime * 3600000;
			return eventEndFromMidnight > agendaStartMs && timeFromMidnight < agendaEndMs;
		})}
		{@const moonEvent = dayEvents.find((e) => isMoonEvent(e) && !e.duration)}
		{#if timeframe.weekStart}
			<a
				class="day"
				class:alt={i % 2 !== 0}
				class:dim={isDateDisabled(date)}
				href="#{date.getUTCFullYear()}-{date.getUTCMonth() + 1}-{date.getUTCDate()}"
				style="grid-column: {i + 2}; grid-row: 1;">
				{#if moonEvent}
					<span class="moon">{getMoonEmoji(moonEvent.name)}</span>
				{/if}
				{date.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}, {date.toLocaleString(
					'default',
					{ month: 'short', timeZone: 'UTC' },
				)}
				{@html formatToString(date.getUTCDate(), { type: 'ordinal', html: true })}
				{#if allDayEvents.length > 0}
					<div class="all-day-events">
						{#each allDayEvents as event}
							<div class="event-all-day">{event.name}</div>
						{/each}
					</div>
				{/if}
			</a>
		{:else}
			<div class="day" class:alt={i % 2 !== 0} class:dim={isDateDisabled(date)} style="grid-column: {i + 2}; grid-row: 1;">
				{#if moonEvent}
					<span class="moon">{getMoonEmoji(moonEvent.name)}</span>
				{/if}
				{date.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}, {date.toLocaleString(
					'default',
					{ month: 'short', timeZone: 'UTC' },
				)}
				{#if allDayEvents.length > 0}
					<div class="all-day-events">
						{#each allDayEvents as event}
							<div class="event-all-day">{event.name}</div>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
		{#each new Array(totalRows) as _, r (r)}
			<div
				class="hour"
				class:alt={i % 2 !== 0}
				class:is-hour-start={r % rowsPerHour === 0}
				class:is-last-row={r === totalRows - 1}
				class:active={timeframe.month === date.getUTCMonth() + 1 &&
					timeframe.daySinceMonth === date.getUTCDate()}
				style="grid-column: {i + 2}; grid-row: {r + 2};">
			</div>
		{/each}
		<div class="events-overlay" style="grid-column: {i + 2}; grid-row: 2 / span var(--total-rows);">
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
				<div class="event-timed" style="top: {top}%; height: {height}%;">
					<div class="event-timed-inner">
						{event.name}
					</div>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	.week {
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
			.day {
				text-align: right;
				.moon {
					float: left;
				}
			}
		}
	}
	.day {
		font-size: 0.9em;
		text-align: center;
		padding: 0.2rem 0.2rem 0;
		font-weight: var(--font-weight-light);

		:global(.ordinal) {
			font-size: 0.75em;
			vertical-align: text-top;
		}

		.moon {
			float: right;
			font-size: 1.1em;
			vertical-align: text-top;
			line-height: 1;
		}
	}
	.hour {
		border-top: solid 1px var(--outline);
		border-left: solid 1px var(--outline);
		&.active {
			background-color: rgba(0, 0, 0, 0.04);
		}
		&:not(.is-hour-start) {
			border-top-style: dotted;
			opacity: 0.5;
		}
	}
	.day.alt,
	.hour.alt {
		background-color: rgba(0, 0, 0, 0.02);
	}
	.day.dim {
		opacity: 0.35;
		pointer-events: none;
	}
	.day ~ .day ~ .day ~ .day ~ .day ~ .day ~ .day ~ .hour {
		border-right: solid 1px var(--outline);
	}
	.week {
		// we use a trick to apply border to the last row,
		// but since it's dynamic we can just style the last child in each column
		// actually, instead of the large + selector, we can just use css grid last row
	}
	/* To apply bottom border to the last row of hours */
	.hour.is-last-row {
		border-bottom: solid 1px var(--outline);
	}
	.hour-label {
		text-align: center;
		grid-column: 1;
		font-weight: var(--font-weight-light);
		font-size: 0.7em;
		color: var(--text-low);
		margin-top: -0.5rem;
		small {
			color: currentColor;
			font-size: 0.6em;
		}
	}
	.events-overlay {
		position: relative;
		pointer-events: none;
		z-index: 2;
	}
	.event-timed {
		position: absolute;
		left: 0;
		width: 100%;
		padding: 1px;
	}
	.event-timed-inner {
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
		letter-spacing: 0.25px;
		border-left: solid 2px var(--outline);
		background-color: var(--bg-pdf, #ffffff);
	}
	.all-day-events {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		margin-top: 0.25rem;
		align-items: center;
	}
	.event-all-day {
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
</style>
