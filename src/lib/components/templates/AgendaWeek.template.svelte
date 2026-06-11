<script lang="ts">
	import { type Timeframe, type CalendarEvent } from '$lib';
	import { Link } from '$atoms';
	import { AgendaEvent, CalendarCell } from '$molecules';
	import {
		getDateMechanic,
		getEventMechanic,
		getFormatterMechanic,
		getAgendaMechanic,
	} from '$lib/mechanics';

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

	const numHours = $derived(endTime - startTime);
	const rowsPerHour = $derived(60 / interval);
	const totalRows = $derived(numHours * rowsPerHour);

	const dateMechanic = getDateMechanic();
	const eventMechanic = getEventMechanic();
	const formatter = getFormatterMechanic();
	const agendaMechanic = getAgendaMechanic();

	const weekStart = $derived(new Date(dateMechanic.getFirstDayOfWeek(timeframe.start)));

	const isTimelineOnLeft = $derived(settings?.sideNav?.leftSide !== false);

	const weekDays = $derived(
		eventMechanic.getAgendaWeekDays(weekStart, timeframe, startTime, endTime),
	);
</script>

<!-- this doesnt get padded -->
<div
	class="planner page agenda-week {isTimelineOnLeft ? 'timeline-left' : 'timeline-right'}"
	style="grid-template-rows: minmax(1.5rem, auto) repeat({totalRows}, 1fr);">
	<div class="time-label" style="grid-column: {isTimelineOnLeft ? 1 : 8}; grid-row: 1;">
	</div>
	{#each new Array(numHours) as _, h (h)}
		{@const hour = startTime + h}
		<div
			class="time-label"
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
			class="day-cell !border-none {alignDayText === 'center'
				? 'text-center'
				: alignDayText === 'right'
					? 'text-right'
					: 'text-left'} {i % 2 !== 0 ? 'alt' : ''}"
			altRow={i % 2 !== 0}
			dim={day.isDisabled}
			href={timeframe.start ? dateMechanic.getDateHash(day.date) : undefined}
			style="grid-column: {isTimelineOnLeft ? i + 2 : i + 1}; grid-row: 1;"
			moonEmoji={day.moonEvent ? (formatter.getMoonEmoji(day.moonEvent.name) ?? '') : ''}
			moonAsWatermark={true}>
			<span class="text-[1.25em] py-2 leading-tight">
				{day.date.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}
				{@html formatter.formatToString(day.date.getUTCDate(), {
					type: 'ordinal',
					html: true,
				})}
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
				class="grid-line"
				class:no-left-border={i === 0 && !isTimelineOnLeft}
				class:right-border={i === 6}
				class:alt={i % 2 !== 0}
				class:sub-line={!isHourStart}
				class:last-row={isLastRow}
				style="grid-column: {isTimelineOnLeft ? i + 2 : i + 1}; grid-row: {r + 2};">
			</div>
		{/each}
		<div
			class="events-container"
			style="grid-column: {isTimelineOnLeft
				? i + 2
				: i + 1}; grid-row: 2 / span {totalRows};">
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

<style lang="scss">
	.agenda-week {
		display: grid;
		align-items: stretch;
		justify-items: stretch;
		gap: 0;

		&.timeline-left {
			grid-template-columns: 2.5rem repeat(7, minmax(0, 1fr));
			padding-right: 2px;
		}

		&.timeline-right {
			grid-template-columns: repeat(7, minmax(0, 1fr)) 2.5rem;
			padding-left: 2px;
		}

		.time-label {
			text-align: center;
			font-weight: 300;
			font-size: 0.7em;
			color: var(--text-sidebar, var(--text-low));
			margin-top: -0.5rem;

			small {
				font-size: 0.6em;
				color: inherit;
			}
		}

		:global(.day-cell) {
			&.alt {
				background-color: var(--nav-bg-pdf, var(--bg-high));
				color: var(--text-sidebar, var(--text-low));
			}
		}

		.grid-line {
			border-top: 1px solid var(--outline);
			border-left: 1px solid var(--outline);

			&.no-left-border {
				border-left: 0;
			}
			&.right-border {
				border-right: 1px solid var(--outline);
			}
			&.alt {
				background-color: var(--nav-bg-pdf, var(--bg-high));
			}
			&.sub-line {
				opacity: 0.5;
			}
			&.last-row {
				border-bottom: 1px solid var(--outline);
			}
		}

		.events-container {
			position: relative;
			pointer-events: none;
			z-index: 10;
		}
	}
</style>
