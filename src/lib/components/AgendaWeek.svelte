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
	} = $props();

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
	<div class="hour-label"></div>
	{#each new Array(numHours) as _, h (h)}
		{@const hour = startTime + h}
		<div class="hour-label" style="grid-row: span {rowsPerHour};">
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
		{@const moonEvent = events.find(
			(e) => !e.duration && e.start * 1000 === date.getTime() && isMoonEvent(e),
		)}
		{#if timeframe.weekStart}
			<a
				class="day"
				href="#{date.getUTCFullYear()}-{date.getUTCMonth() + 1}-{date.getUTCDate()}">
				{#if moonEvent}
					<span class="moon">{getMoonEmoji(moonEvent.name)}</span>
				{/if}
				{date.toLocaleString('default', { weekday: 'long', timeZone: 'UTC' })}, {date.toLocaleString(
					'default',
					{ month: 'long', timeZone: 'UTC' },
				)}
				{@html formatToString(date.getUTCDate(), { type: 'ordinal', html: true })}
			</a>
		{:else}
			<div class="day">
				{#if moonEvent}
					<span class="moon">{getMoonEmoji(moonEvent.name)}</span>
				{/if}
				{date.toLocaleString('default', { weekday: 'long', timeZone: 'UTC' })}, {date.toLocaleString(
					'default',
					{ month: 'long', timeZone: 'UTC' },
				)}
			</div>
		{/if}
		{#each new Array(totalRows) as _, r (r)}
			<div
				class="hour"
				class:is-hour-start={r % rowsPerHour === 0}
				class:active={timeframe.month === date.getUTCMonth() + 1 &&
					timeframe.daySinceMonth === date.getUTCDate()}>
			</div>
		{/each}
	{/each}
</div>

<style lang="scss">
	.week {
		display: grid;
		grid-template-columns: 2.5rem repeat(7, 1fr);
		grid-template-rows: 1.5rem repeat(var(--total-rows), 1fr);
		width: 100%;
		height: 100%;
		justify-items: stretch;
		align-items: stretch;
		grid-auto-flow: column;
		padding: 0 1rem 0 0;

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
		text-align: left;
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
	.day ~ .day ~ .day ~ .day ~ .day ~ .day ~ .day ~ .hour {
		border-right: solid 1px var(--outline);
	}
	.week {
		// we use a trick to apply border to the last row,
		// but since it's dynamic we can just style the last child in each column
		// actually, instead of the large + selector, we can just use css grid last row
	}
	/* To apply bottom border to the last row of hours */
	.hour:nth-last-child(-n + 7) {
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
</style>
