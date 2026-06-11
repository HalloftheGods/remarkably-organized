<script lang="ts">
	import {
		getFirstDayOfWeek,
		type Timeframe,
		type CalendarEvent,
		getDateHash,
		getAgendaWeekTimeboxHours,
		getAgendaWeekTimeboxDays,
		getAgendaWeekTimeboxGrid,
	} from '$lib';
	import Field from '$atoms/Field.atom.svelte';

	let {
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		startWeekOnSunday = false,
		settings = undefined as any,
		startTime = 7,
		endTime = 21,
		use24HourClock = false,
	} = $props();

	const weekStart = $derived(
		new Date(getFirstDayOfWeek(timeframe.start, startWeekOnSunday)),
	);

	const isTimelineOnLeft = $derived(settings?.sideNav?.leftSide !== false);
	const showEmoji = $derived(!settings?.emojis?.disable);

	const hours = $derived(getAgendaWeekTimeboxHours(startTime, endTime));
	const weekDays = $derived(getAgendaWeekTimeboxDays(weekStart, settings));
	const hourGrid = $derived(getAgendaWeekTimeboxGrid(hours, weekDays, use24HourClock));

	const gridClass = $derived(isTimelineOnLeft ? 'timeline-left' : 'timeline-right');
	const gridRowsStyle = $derived(
		`grid-template-rows: 2.5rem repeat(${hours.length || 15}, 1fr);`,
	);
</script>

<div class="planner page padded agenda-week-timebox">
	<div class="timebox-title">
		<div class="field flex-1">
			<Field i="📅">WEEKLY TIME-BLOCKED AGENDA</Field>
		</div>
	</div>

	<div class="agenda-timebox-grid {gridClass}" style={gridRowsStyle}>
		{#if isTimelineOnLeft}
			<div class="corner-cell"></div>
		{/if}
		{#each weekDays as day, i (i)}
			<a
				href={getDateHash(day.date)}
				class="agenda-timebox-day-header"
				class:last-col={i === 6 && isTimelineOnLeft}>
				<span class="day-label">
					{day.date
						.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })
						.toUpperCase()}
				</span>
				<span class="day-date">
					{day.date.getUTCDate()}
				</span>
			</a>
		{/each}
		{#if !isTimelineOnLeft}
			<div class="corner-cell"></div>
		{/if}

		{#each hourGrid as row}
			{#if isTimelineOnLeft}
				<div class="agenda-timebox-hour">
					<span>{row.formattedHour}</span>
				</div>
			{/if}
			{#each row.days as day, i (i)}
				<div
					class="agenda-timebox-cell"
					class:last-col={i === 6 && isTimelineOnLeft}>
					{#each day.events as event}
						<span class="agenda-timebox-event">
							{event.name}
						</span>
					{/each}
				</div>
			{/each}
			{#if !isTimelineOnLeft}
				<div class="agenda-timebox-hour">
					<span>{row.formattedHour}</span>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	.agenda-week-timebox {
		display: flex;
		flex-direction: column;
	}

	.timebox-title {
		display: flex;
		gap: 2rem;
		padding-left: 1.5rem;
		padding-right: 1.5rem;
	}

	.agenda-timebox-grid {
		&.timeline-left {
			grid-template-columns: 3.3rem repeat(7, minmax(0, 1fr));
		}
		&.timeline-right {
			grid-template-columns: repeat(7, minmax(0, 1fr)) 3.3rem;
		}
	}

	.corner-cell {
		background-color: var(--nav-bg-pdf);
		border-bottom: 2px solid var(--outline);
	}

	.day-label {
		font-size: 0.6rem;
		color: var(--text-sidebar, var(--text-low));
		font-weight: bold;
	}

	.day-date {
		font-size: 0.8rem;
		color: var(--text);
		font-weight: bold;
	}

	.last-col {
		border-right: 0;
	}
</style>
