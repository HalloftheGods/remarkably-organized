<script lang="ts">
	import {
		type CalendarEvent,
		type Timeframe,
		getWeek,
		isMoonEvent,
		getMoonEmoji,
	} from '$lib';
	import { Box, Text, Dot } from '$atoms';
	import { Grid, CalendarCell } from '$molecules';

	let {
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		startWeekOnSunday = false,
		showWeekLinks = false,
		useWeekSinceYear = false,
		showNotes = true,
		settings = undefined as any,
	} = $props();

	const isDateDisabled = (dateMs: number) => {
		if (!settings) return false;
		if (settings.dayPage?.disable) return true;
		const start = settings.date?.start?.getTime() || 0;
		const end = settings.date?.end?.getTime() || Infinity;
		return dateMs < start || dateMs > end;
	};

	const getDayEvents = (dateMs: number) => {
		const dayStart = dateMs;
		const dayEnd = dayStart + 86400000;
		const dayEvents = events.filter((e) => {
			if (isMoonEvent(e)) return false;
			const eventStart = e.start * 1000;
			const eventEnd = eventStart + (e.duration || 86400) * 1000;
			return eventStart < dayEnd && eventEnd > dayStart;
		});

		return {
			allDay: dayEvents.filter((e) => !e.duration || e.duration >= 86400),
			timed: dayEvents.filter((e) => e.duration && e.duration < 86400),
		};
	};
</script>

{#if timeframe?.month}
	{@const numDaysBeforeStart =
		(timeframe.start.getUTCDay() + 7 - (startWeekOnSunday ? 0 : 1)) % 7}
	<Box
		class="calendar-month {showWeekLinks ? 'with-weeks' : ''} {showNotes ? 'with-notes' : ''}">
		{#if showWeekLinks}
			<Box class="weekday-header empty"></Box>
		{/if}
		{#each new Array(7) as _, i}
			{@const date = new Date(Date.UTC(1970, 0, 4 + i + (startWeekOnSunday ? 0 : 1)))}
			<Box class="weekday-header">
				<Text>{date.toLocaleString('default', { weekday: 'long', timeZone: 'UTC' })}</Text>
			</Box>
		{/each}
		{#if showWeekLinks}
			{@const numWeeks =
				Math.floor(
					(timeframe.end.getTime() - timeframe.weekStart.getTime()) / 604800000,
				) + 1}
			{#each new Array(numWeeks) as _, i (i)}
				{@const date = new Date(timeframe.weekStart.getTime() + i * 604800000)}
				{@const week = getWeek(date, startWeekOnSunday)}
				<a
					href="#{week.id}"
					class="week"
					class:last-week={i === numWeeks - 1}
					class:alt-row={i % 2 === 1}>
					{#if !useWeekSinceYear && week.year && week.month && week.month !== timeframe.month}
						{new Date(Date.UTC(week.year, week.month)).toLocaleString('default', {
							month: 'short',
						})}
					{/if}
					Week {useWeekSinceYear ? week.weekSinceYear : week.weekSinceMonth}
				</a>
			{/each}
		{/if}
		{#each new Array(numDaysBeforeStart) as _, i (i)}
			{@const date = new Date(
				timeframe.start.getTime() + (i - numDaysBeforeStart) * 86400000,
			)}
			{@const dayIndex = i}
			{@const moonEvent = events.find(
				(e) => !e.duration && e.start * 1000 === date.getTime() && isMoonEvent(e),
			)}
			{@const dayEvents = getDayEvents(date.getTime())}
			<CalendarCell
				class="muted"
				dim={isDateDisabled(date.getTime())}
				alt-row={Math.floor(dayIndex / 7) % 2 === 1}
				href="#{date.getUTCFullYear()}-{date.getUTCMonth() + 1}-{date.getUTCDate()}"
				date={date.getUTCDate()}
				moonEmoji={moonEvent ? (getMoonEmoji(moonEvent.name) ?? '') : ''}>
				{#each dayEvents.allDay as event}
					<Box class="event">
						<Text>{event.name}</Text>
					</Box>
				{/each}
				{#if dayEvents.timed.length > 0}
					<Box class="timed-events">
						{#if dayEvents.timed.length > 3}
							<Dot title="{dayEvents.timed.length} events" />
							<Text tag="span" class="count">({dayEvents.timed.length})</Text>
						{:else}
							{#each dayEvents.timed as event}
								<Dot title={event.name} />
							{/each}
						{/if}
					</Box>
				{/if}
			</CalendarCell>
		{/each}
		{#each new Array(timeframe.end.getUTCDate()) as _, day (day)}
			{@const dateMs = timeframe.start.getTime() + day * 86400000}
			{@const dayIndex = numDaysBeforeStart + day}
			{@const moonEvent = events.find(
				(e) => !e.duration && e.start * 1000 === dateMs && isMoonEvent(e),
			)}
			{@const dayEvents = getDayEvents(dateMs)}
			<CalendarCell
				href="#{timeframe.year}-{timeframe.month}-{day + 1}"
				dim={isDateDisabled(dateMs)}
				alt-row={Math.floor(dayIndex / 7) % 2 === 1}
				border-top={day >
					(6 - timeframe.start.getUTCDay() + 7 + (startWeekOnSunday ? 0 : 1)) % 7}
				date={day + 1}
				moonEmoji={moonEvent ? (getMoonEmoji(moonEvent.name) ?? '') : ''}>
				{#each dayEvents.allDay as event}
					<Box class="event">
						<Text>{event.name}</Text>
					</Box>
				{/each}
				{#if dayEvents.timed.length > 0}
					<Box class="timed-events">
						{#if dayEvents.timed.length > 3}
							<Dot title="{dayEvents.timed.length} events" />
							<Text tag="span" class="count">({dayEvents.timed.length})</Text>
						{:else}
							{#each dayEvents.timed as event}
								<Dot title={event.name} />
							{/each}
						{/if}
					</Box>
				{/if}
			</CalendarCell>
		{/each}
		{#each new Array((6 - timeframe.end.getUTCDay() + 7 + (startWeekOnSunday ? 0 : 1)) % 7) as _, i (i)}
			{@const date = new Date(timeframe.end.getTime() + (i + 1) * 86400000)}
			{@const dayIndex = numDaysBeforeStart + timeframe.end.getUTCDate() + i}
			{@const moonEvent = events.find(
				(e) => !e.duration && e.start * 1000 === date.getTime() && isMoonEvent(e),
			)}
			{@const dayEvents = getDayEvents(date.getTime())}
			<CalendarCell
				class="border-top muted"
				dim={isDateDisabled(date.getTime())}
				alt-row={Math.floor(dayIndex / 7) % 2 === 1}
				href="#{date.getUTCFullYear()}-{date.getUTCMonth() + 1}-{date.getUTCDate()}"
				date={date.getUTCDate()}
				moonEmoji={moonEvent ? (getMoonEmoji(moonEvent.name) ?? '') : ''}>
				{#each dayEvents.allDay as event}
					<Box class="event">
						<Text>{event.name}</Text>
					</Box>
				{/each}
				{#if dayEvents.timed.length > 0}
					<Box class="timed-events">
						{#if dayEvents.timed.length > 3}
							<Dot title="{dayEvents.timed.length} events" />
							<Text tag="span" class="count">({dayEvents.timed.length})</Text>
						{:else}
							{#each dayEvents.timed as event}
								<Dot title={event.name} />
							{/each}
						{/if}
					</Box>
				{/if}
			</CalendarCell>
		{/each}
	</Box>
	{#if showNotes}
		<Box class="notes">
			<Text tag="h3">Notes</Text>
			<Grid display="dotted" />
		</Box>
	{/if}
{/if}

<style lang="scss">
	:global {
		.calendar-month {
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			grid-template-rows: min-content;
			grid-auto-rows: 1fr;
			grid-auto-flow: dense;
			&.with-weeks {
				grid-template-columns: 2rem repeat(7, 1fr);
			}
			width: 100%;
			height: 100%;
			justify-items: stretch;
			align-items: stretch;
			grid-gap: 0px;
			padding: 0 1rem 1rem;
			&.with-notes {
				height: 50%;
				padding: 0 1rem 0;
			}
			.weekday-header {
				display: flex;
				align-items: flex-end;
				justify-content: center;
				font-size: 0.8em;
				font-weight: 500;
				color: var(--text);
				padding: 0.25rem 0 0.5rem;
				text-transform: uppercase;
				letter-spacing: 1px;
			}
			.week {
				grid-column: 1;
				writing-mode: vertical-lr;
				text-orientation: mixed;
				transform: rotate(180deg);
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 0.8em;
				color: var(--text);
				opacity: 0.75;
				border-top: solid 1px var(--outline);
				border-left: solid 1px var(--outline-high);
				margin-bottom: -1px;
				&.last-week {
					border-top: none;
					margin-bottom: 0px;
				}
				&.alt-row {
					background-color: rgba(0, 0, 0, 0.015);
				}
			}
			.event {
				font-size: 0.65em;
				text-align: center;
				padding: 0 0.25rem;
				text-wrap: balance;
				letter-spacing: 1.25px;
			}
			.timed-events {
				display: flex;
				flex-wrap: wrap;
				gap: 0.2rem;
				align-items: center;
				justify-content: center;
				margin-top: auto;
				padding-bottom: 0.25rem;

				.count {
					font-size: 0.6em;
					line-height: 1;
					opacity: 0.6;
				}
			}
			&:not(.with-weeks) {
				.calendar-cell {
					&:nth-child(7n + 1) {
						border-left: none;
					}
				}
			}
		}
		.notes {
			text-align: center;
			border-top: solid 1px var(--outline);
			width: 100%;
			height: 50%;
			padding: 0;
			h3 {
				font-size: 0.9em;
				font-weight: var(--font-weight-light);
				margin: 0.55rem 0 0.55rem;
			}
		}
	}
</style>
