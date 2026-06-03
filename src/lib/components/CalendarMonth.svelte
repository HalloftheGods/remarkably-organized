<script lang="ts">
	import {
		type CalendarEvent,
		type Timeframe,
		getWeek,
		isMoonEvent,
		getMoonEmoji,
	} from '$lib';
	import Grid from './Grid.svelte';

	let {
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		startWeekOnSunday = false,
		showWeekLinks = false,
		useWeekSinceYear = false,
		showNotes = true,
	} = $props();

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
	<div class="month" class:with-weeks={showWeekLinks} class:with-notes={showNotes}>
		{#if showWeekLinks}
			<div class="weekday-header empty"></div>
		{/if}
		{#each new Array(7) as _, i}
			{@const date = new Date(Date.UTC(1970, 0, 4 + i + (startWeekOnSunday ? 0 : 1)))}
			<div class="weekday-header">
				{date.toLocaleString('default', { weekday: 'long', timeZone: 'UTC' })}
			</div>
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
			<a
				class="day muted"
				class:alt-row={Math.floor(dayIndex / 7) % 2 === 1}
				href="#{date.getUTCFullYear()}-{date.getUTCMonth() + 1}-{date.getUTCDate()}">
				<div class="date">
					{#if moonEvent}
						<span class="moon">{getMoonEmoji(moonEvent.name)}</span>
					{/if}
					{date.getUTCDate()}
				</div>
				<div class="events">
					{#each dayEvents.allDay as event}
						<div class="event">
							{event.name}
						</div>
					{/each}
					{#if dayEvents.timed.length > 0}
						<div class="timed-events">
							{#each dayEvents.timed as event}
								<div class="dot" title={event.name}></div>
							{/each}
						</div>
					{/if}
				</div>
			</a>
		{/each}
		{#each new Array(timeframe.end.getUTCDate()) as _, day (day)}
			{@const dateMs = timeframe.start.getTime() + day * 86400000}
			{@const dayIndex = numDaysBeforeStart + day}
			{@const moonEvent = events.find(
				(e) => !e.duration && e.start * 1000 === dateMs && isMoonEvent(e),
			)}
			{@const dayEvents = getDayEvents(dateMs)}
			<a
				href="#{timeframe.year}-{timeframe.month}-{day + 1}"
				class="day"
				class:alt-row={Math.floor(dayIndex / 7) % 2 === 1}
				class:border-top={day >
					(6 - timeframe.start.getUTCDay() + 7 + (startWeekOnSunday ? 0 : 1)) % 7}>
				<div class="date">
					{#if moonEvent}
						<span class="moon">{getMoonEmoji(moonEvent.name)}</span>
					{/if}
					{day + 1}
				</div>
				<div class="events">
					{#each dayEvents.allDay as event}
						<div class="event">
							{event.name}
						</div>
					{/each}
					{#if dayEvents.timed.length > 0}
						<div class="timed-events">
							{#each dayEvents.timed as event}
								<div class="dot" title={event.name}></div>
							{/each}
						</div>
					{/if}
				</div>
			</a>
		{/each}
		{#each new Array((6 - timeframe.end.getUTCDay() + 7 + (startWeekOnSunday ? 0 : 1)) % 7) as _, i (i)}
			{@const date = new Date(timeframe.end.getTime() + (i + 1) * 86400000)}
			{@const dayIndex = numDaysBeforeStart + timeframe.end.getUTCDate() + i}
			{@const moonEvent = events.find(
				(e) => !e.duration && e.start * 1000 === date.getTime() && isMoonEvent(e),
			)}
			{@const dayEvents = getDayEvents(date.getTime())}
			<a
				class="day border-top muted"
				class:alt-row={Math.floor(dayIndex / 7) % 2 === 1}
				href="#{date.getUTCFullYear()}-{date.getUTCMonth() + 1}-{date.getUTCDate()}">
				<div class="date">
					{#if moonEvent}
						<span class="moon">{getMoonEmoji(moonEvent.name)}</span>
					{/if}
					{date.getUTCDate()}
				</div>
				<div class="events">
					{#each dayEvents.allDay as event}
						<div class="event">
							{event.name}
						</div>
					{/each}
					{#if dayEvents.timed.length > 0}
						<div class="timed-events">
							{#each dayEvents.timed as event}
								<div class="dot" title={event.name}></div>
							{/each}
						</div>
					{/if}
				</div>
			</a>
		{/each}
	</div>
	{#if showNotes}
		<div class="notes">
			<h3>Notes</h3>
			<Grid display="dotted" />
		</div>
	{/if}
{/if}

<style lang="scss">
	.month {
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
		.day {
			display: flex;
			flex-direction: column;
			justify-content: start;
			font-size: 1.05em;
			font-weight: var(--font-weight-light);
			border-left: solid 1px var(--outline);
			line-height: 1;
			min-height: 0;
			overflow: hidden;
			&.border-top {
				border-top: solid 1px var(--outline);
			}
			&.alt-row {
				background-color: rgba(0, 0, 0, 0.015);
			}
			&.muted {
				color: var(--text-low);
				opacity: 0.5;
			}
			.date {
				margin: 0.5rem 0.5rem -0.25rem 0.5rem;
				display: flex;
				justify-content: end;
				align-items: start;
			}
			.moon {
				margin-right: auto;
				font-size: 1.25em;
				line-height: 1;
			}
		}
		.events {
			display: flex;
			flex-direction: column;
			gap: 0.35rem;
			justify-content: space-evenly;
			flex: 1;
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
				justify-content: center;
				margin-top: auto;
				padding-bottom: 0.25rem;
				.dot {
					width: 4px;
					height: 4px;
					border-radius: 50%;
					background-color: var(--text);
					opacity: 0.6;
				}
			}
		}
		&:not(.with-weeks) {
			.day {
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
</style>
