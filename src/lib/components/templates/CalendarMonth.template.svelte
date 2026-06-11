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

	const hasMonth = $derived(!!timeframe?.month);
	const hasWeekLinksOnLeft = $derived(showWeekLinks && isWeeksOnLeft);
	const hasWeekLinksOnRight = $derived(showWeekLinks && !isWeeksOnLeft);

	const mapToViewWeekLink = (week: any, index: number) => {
		const colClass = isWeeksOnLeft
			? 'col-start-1 border-r border-[var(--outline)]'
			: 'col-start-8 border-l border-[var(--outline)]';
		const borderClass = index > 0 ? 'border-t border-[var(--outline)]' : '';
		const bgClass =
			index % 2 === 1 ? 'bg-[var(--bg-sidebar)] text-[var(--text-sidebar)]' : '';
		const weekLabel = useWeekSinceYear ? week.weekSinceYear : week.weekSinceMonth;

		return { ...week, colClass, borderClass, bgClass, weekLabel, index };
	};

	const mapToViewGridCell = (cell: any) => {
		const isDimmed = !cell.isCurrentMonth;
		const dimClass = isDimmed
			? 'text-[var(--text-sidebar,var(--text-low))] opacity-50'
			: '';
		const borderClass = cell.isFirstCol ? '!border-l-0' : '';
		const hasBorderTop =
			cell.borderTop || (!cell.isCurrentMonth && cell.dayIndex > 20);
		const eventCount = cell.dailyData.timed.length;
		const hasManyEvents = eventCount > 3;
		const hasAnyEvents = eventCount > 0;

		return {
			...cell,
			isDimmed,
			dimClass,
			borderClass,
			hasBorderTop,
			eventCount,
			hasManyEvents,
			hasAnyEvents,
		};
	};

	const getGridColsClass = () => {
		if (!showWeekLinks) return 'grid-cols-7';
		return isWeeksOnLeft
			? 'grid-cols-[3rem_repeat(7,1fr)]'
			: 'grid-cols-[repeat(7,1fr)_3rem]';
	};

	const gridColsClass = $derived(getGridColsClass());
	const viewWeekLinks = $derived(weekLinks.map(mapToViewWeekLink));
	const viewMonthGrid = $derived(currentMonthGrid.map(mapToViewGridCell));
</script>

{#if hasMonth}
	<!-- calendar month doesn't get padded -->
	<div class="planner page gap-0 flex flex-col {showNotes ? 'h-full' : ''}">
		<div class="calendar-month-grid {showNotes ? 'h-[90%]' : ''} {gridColsClass}">
			{#if hasWeekLinksOnLeft}
				<div class="empty-corner col-span-1"></div>
			{/if}

			{#each weekdays as weekday}
				<div class="calendar-weekday-header">
					<span>{weekday}</span>
				</div>
			{/each}

			{#if hasWeekLinksOnRight}
				<div class="empty-corner col-span-1"></div>
			{/if}

			{#if showWeekLinks}
				{#each viewWeekLinks as week (week.index)}
					<a
						href="#{week.id}"
						class="calendar-week-link {week.colClass} {week.borderClass} {week.bgClass}"
						style="grid-row: {week.index + 2};">
						<span
							class="calendar-week-text [writing-mode:vertical-lr] [text-orientation:mixed] rotate-0">
							{#if week.monthShort}
								{week.monthShort}
							{/if}
							W {week.weekLabel}
						</span>
					</a>
				{/each}
			{/if}

			{#each viewMonthGrid as cell}
				<CalendarCell
					class="{cell.dimClass} {cell.borderClass}"
					dim={cell.dailyData.isDisabled}
					altRow={cell.altRow}
					borderTop={cell.hasBorderTop}
					href={getDateHash(cell.date)}
					date={cell.date.getUTCDate()}
					moonEmoji={cell.dailyData.moonEmoji || ''}>
					{#each cell.dailyData.allDay as event}
						<div
							class="text-calendar-event text-[0.6em] font-medium text-[var(--text)] truncate leading-tight opacity-90">
							<span>{event.name}</span>
						</div>
					{/each}

					{#if cell.hasAnyEvents}
						<div
							class="container-calendar-events flex items-center justify-start gap-1 mt-auto pb-1 flex-wrap">
							{#if cell.hasManyEvents}
								<Dot title="{cell.eventCount} events" />
								<span class="text-[0.6em] leading-none opacity-60">
									({cell.eventCount})
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
			<div
				class="text-center border-t border-[var(--outline)] w-full flex-1 p-0 flex flex-col">
				<h3 class="text-[0.9em] font-light my-[0.55rem]">Notes</h3>
				<Grid display="dotted" />
			</div>
		{/if}
	</div>
{/if}
