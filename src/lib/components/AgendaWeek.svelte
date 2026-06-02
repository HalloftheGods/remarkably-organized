<script lang="ts">
	import { formatToString, getFirstDayOfWeek, type Timeframe, type CalendarEvent, isMoonEvent, getMoonEmoji } from '$lib';

	let { timeframe = {} as Timeframe, events = [] as CalendarEvent[], startWeekOnSunday = false, use24HourClock = false, alignDayTextRight = false } = $props();

	const weekStart = $derived(
		new Date(getFirstDayOfWeek(timeframe.start, startWeekOnSunday)),
	);
</script>

<div class="week" class:align-right={alignDayTextRight}>
	<div class="hour-label"></div>
	{#each new Array(24) as _, i (i)}
		<div class="hour-label">
			{#if use24HourClock}
				{i.toString().padStart(2, '0')}:00
			{:else if i > 0}
				{i === 12 ? 12 : i % 12}
				<small>{i < 12 ? 'AM' : 'PM'}</small>
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
				{date.toLocaleString('default', { weekday: 'long', timeZone: 'UTC' })}, {date.toLocaleString('default', { month: 'long', timeZone: 'UTC' })}
				{@html formatToString(date.getUTCDate(), { type: 'ordinal', html: true })}
			</a>
		{:else}
			<div class="day">
				{#if moonEvent}
					<span class="moon">{getMoonEmoji(moonEvent.name)}</span>
				{/if}
				{date.toLocaleString('default', { weekday: 'long', timeZone: 'UTC' })}, {date.toLocaleString('default', { month: 'long', timeZone: 'UTC' })}
			</div>
		{/if}
		{#each new Array(24) as _, i (i)}
			<div
				class="hour"
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
		grid-template-rows: 1.5rem repeat(24, 1fr);
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
	}
	.day ~ .day ~ .day ~ .day ~ .day ~ .day ~ .day ~ .hour {
		border-right: solid 1px var(--outline);
	}
	.day
		+ .hour
		+ .hour
		+ .hour
		+ .hour
		+ .hour
		+ .hour
		+ .hour
		+ .hour
		+ .hour
		+ .hour
		+ .hour
		+ .hour
		+ .hour
		+ .hour
		+ .hour
		+ .hour
		+ .hour
		+ .hour
		+ .hour
		+ .hour
		+ .hour
		+ .hour
		+ .hour
		+ .hour {
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
