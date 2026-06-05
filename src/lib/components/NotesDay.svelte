<script lang="ts">
	import type { CalendarEvent, Timeframe } from '$lib';
	import Grid from './Grid.svelte';

	let {
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		use24HourClock = false,
		startTime = 5,
		endTime = 22,
		interval = 60,
	} = $props();

	const numHours = $derived(endTime - startTime);

	let dayEvents = $derived(
		events.filter((e) => {
			if (!timeframe.start) return false;
			const dayStart = timeframe.start.getTime();
			const dayEnd = dayStart + 86400000;
			const eventStart = e.start * 1000;
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
			const agendaStartMs = startTime * 3600000;
			const agendaEndMs = endTime * 3600000;
			return eventEndFromMidnight > agendaStartMs && timeFromMidnight < agendaEndMs;
		}),
	);
</script>

<div class="day">
	<div class="grid">
		<Grid display="dotted" />
	</div>
	<div class="hours">
		{#each new Array(numHours) as _, h (h)}
			{@const hour = startTime + h}
			<div class="hour">
				<span>
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
				</span>
			</div>
		{/each}
	</div>
	<div class="events-overlay">
		{#if allDayEvents.length > 0}
			<div class="all-day-events">
				{#each allDayEvents as event}
					<div class="event-all-day">{event.name}</div>
				{/each}
			</div>
		{/if}
		{#each timedEvents as event}
			{@const timeFromMidnight = event.start * 1000 - timeframe.start.getTime()}
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
</div>

<style lang="scss">
	.day {
		font-size: 1.1em;
		border-top: solid 1px var(--outline);
		text-align: center;
		padding: 0.5rem 0 0;
		position: relative;
		height: 100%;
		&:nth-child(1),
		&:nth-child(2) {
			border-top: none;
		}
		&:nth-child(2n) {
			border-left: solid 1px var(--outline);
		}
		:global(.ordinal) {
			font-size: 0.75em;
			vertical-align: super;
		}
	}
	.grid {
		position: absolute;
		top: 0.5rem;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.hours {
		position: absolute;
		top: 0.5rem;
		left: 0;
		bottom: 0;
		width: 3rem;
		display: flex;
		flex-direction: column;
		color: var(--text-low);
		.hour {
			display: flex;
			justify-content: center;
			align-items: start;
			flex: 1;
			span {
				background-color: var(--bg-pdf, #ffffff);
				padding: 0.5rem;
				font-size: 0.7em;
				z-index: 1;
				display: block;
				margin-top: -0.5rem;
				small {
					font-size: 0.6em;
				}
			}
		}
	}
	.events-overlay {
		position: absolute;
		top: 0.5rem;
		left: 3rem;
		right: 0;
		bottom: 0;
		pointer-events: none;
	}
	.all-day-events {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		padding: 0 0.5rem;
		margin-bottom: 0.5rem;
	}
	.event-all-day {
		font-size: 0.7em;
		letter-spacing: 1.25px;
		padding: 0.15rem 0.5rem;
		color: var(--text);
		background-color: var(--nav-bg-pdf, rgba(0, 0, 0, 0.02));
		border: solid 1px var(--outline);
		border-radius: 4px;
	}
	.event-timed {
		position: absolute;
		left: 0;
		width: 50%;
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
		letter-spacing: 1.25px;
		border-left: solid 2px var(--outline);
		background-color: var(--nav-bg-pdf, rgba(0, 0, 0, 0.02));
	}
</style>
