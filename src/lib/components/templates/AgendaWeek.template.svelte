<script lang="ts">
	import {
		formatToString,
		getFirstDayOfWeek,
		type Timeframe,
		type CalendarEvent,
		getMoonEmoji,
		getDateHash,
		getAgendaWeekDays,
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

	const numHours = $derived(endTime - startTime);
	const rowsPerHour = $derived(60 / interval);
	const totalRows = $derived(numHours * rowsPerHour);

	const weekStart = $derived(
		new Date(getFirstDayOfWeek(timeframe.start, startWeekOnSunday)),
	);

	const isTimelineOnLeft = $derived(settings?.sideNav?.leftSide !== false);

	const weekDays = $derived(
		getAgendaWeekDays(weekStart, settings, timeframe, startTime, endTime),
	);
</script>

<div
	class="planner page padded agenda-week {isTimelineOnLeft
		? 'timeline-left'
		: 'timeline-right'}"
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
			class="day-cell align-{alignDayText} {i % 2 !== 0 ? 'alt' : ''}"
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
	@use '$lib/styles/app.css';
	.agenda-week {
		@apply grid gap-0;

		&.timeline-left {
			@apply grid-cols-[2.5rem_repeat(7,minmax(0,1fr))] pr-[2px];
		}

		&.timeline-right {
			@apply grid-cols-[repeat(7,minmax(0,1fr))_2.5rem] pl-[2px];
		}

		.time-label {
			@apply text-center font-light text-[0.7em] text-[var(--text-sidebar,var(--text-low))] -mt-2;

			small {
				@apply text-[0.6em] text-inherit;
			}
		}

		:global(.day-cell) {
			&.align-left {
				@apply text-left;
				:global(.moon) {
					@apply float-right;
				}
			}
			&.align-center {
				@apply text-center;
				:global(.moon) {
					@apply float-right;
				}
			}
			&.align-right {
				@apply text-right;
				:global(.moon) {
					@apply float-left;
				}
			}

			&.alt {
				@apply bg-[var(--nav-bg-pdf,var(--bg-high))] text-[var(--text-sidebar,var(--text-low))];
			}
		}

		.grid-line {
			@apply border-t border-l border-solid border-[var(--outline)];

			&.no-left-border {
				@apply border-l-0;
			}
			&.right-border {
				@apply border-r;
			}
			&.alt {
				@apply bg-[var(--nav-bg-pdf,var(--bg-high))];
			}
			&.sub-line {
				@apply opacity-50;
			}
			&.last-row {
				@apply border-b;
			}
		}

		.events-container {
			@apply relative pointer-events-none z-10;
		}
	}
</style>
