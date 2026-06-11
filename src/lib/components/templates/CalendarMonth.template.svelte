<script lang="ts">
	import {
		type CalendarEvent,
		type Timeframe,
		getDateHash,
		calculateMonthGrid,
		getCalendarMonthWeekdays,
		getCalendarMonthWeekLinks,
		getCalendarMonthCurrentGrid,
	} from '$lib';
	import { Dot } from '$atoms';
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

	const isWeeksOnLeft = $derived(showWeekLinks && settings?.sideNav?.leftSide !== false);
	const monthGrid = $derived(calculateMonthGrid(timeframe, startWeekOnSunday));

	const weekdays = $derived(getCalendarMonthWeekdays(startWeekOnSunday));
	const weekLinks = $derived(
		getCalendarMonthWeekLinks(
			timeframe,
			startWeekOnSunday,
			showWeekLinks,
			useWeekSinceYear,
		),
	);
	const currentMonthGrid = $derived(
		getCalendarMonthCurrentGrid(monthGrid, settings, events),
	);
</script>

{#if timeframe?.month}
	<div class="planner page padded gap-0 flex flex-col {showNotes ? 'h-full' : ''}">
		<div
			class="calendar-month-grid {showNotes ? 'h-[90%]' : ''} {showWeekLinks
				? isWeeksOnLeft
					? 'grid-cols-[3rem_repeat(7,1fr)]'
					: 'grid-cols-[repeat(7,1fr)_3rem]'
				: 'grid-cols-7'}">
			{#if showWeekLinks && isWeeksOnLeft}
				<div class="empty-corner col-span-1"></div>
			{/if}

			{#each weekdays as weekday}
				<div class="calendar-weekday-header">
					<span>
						{weekday}
					</span>
				</div>
			{/each}

			{#if showWeekLinks && !isWeeksOnLeft}
				<div class="empty-corner col-span-1"></div>
			{/if}

			{#if showWeekLinks}
				{#each weekLinks as week, i (i)}
					<a
						href="#{week.id}"
						class="calendar-week-link {isWeeksOnLeft
							? 'col-start-1 border-r border-[var(--outline)]'
							: 'col-start-8 border-l border-[var(--outline)]'} {i > 0
							? 'border-t border-[var(--outline)]'
							: ''} {i % 2 === 1
							? 'bg-[var(--bg-sidebar)] text-[var(--text-sidebar)]'
							: ''}"
						style="grid-row: {i + 2};">
						<span class="calendar-week-text [writing-mode:vertical-lr] [text-orientation:mixed] rotate-0">
							{#if week.monthShort}
								{week.monthShort}
							{/if}
							W {useWeekSinceYear ? week.weekSinceYear : week.weekSinceMonth}
						</span>
					</a>
				{/each}
			{/if}

			{#each currentMonthGrid as cell}
				<CalendarCell
					class="{!cell.isCurrentMonth
						? 'text-[var(--text-sidebar,var(--text-low))] opacity-50'
						: ''} {cell.isFirstCol ? '!border-l-0' : ''}"
					dim={cell.dailyData.isDisabled}
					altRow={cell.altRow}
					borderTop={cell.borderTop || (!cell.isCurrentMonth && cell.dayIndex > 20)}
					href={getDateHash(cell.date)}
					date={cell.date.getUTCDate()}
					moonEmoji={cell.dailyData.moonEmoji || ''}>
					{#each cell.dailyData.allDay as event}
						<div
							class="text-calendar-event text-[0.6em] font-medium text-[var(--text)] truncate leading-tight opacity-90">
							<span>{event.name}</span>
						</div>
					{/each}
					{#if cell.dailyData.timed.length > 0}
						<div
							class="container-calendar-events flex items-center justify-start gap-1 mt-auto pb-1 flex-wrap">
							{#if cell.dailyData.timed.length > 3}
								<Dot title="{cell.dailyData.timed.length} events" />
								<span class="text-[0.6em] leading-none opacity-60">
									({cell.dailyData.timed.length})
								</span>
							{:else}
								{#each cell.dailyData.timed as event}
									<Dot title={event.name} />
								{/each}
							{/if}
						</div>
					{/if}
				</CalendarCell>
			{/each}
		</div>

		{#if showNotes}
			<div class="text-center border-t border-[var(--outline)] w-full flex-1 p-0 flex flex-col">
				<h3 class="text-[0.9em] font-light my-[0.55rem]">Notes</h3>
				<Grid display="dotted" />
			</div>
		{/if}
	</div>
{/if}
