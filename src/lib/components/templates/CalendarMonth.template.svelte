<script lang="ts">
	import {
		type CalendarEvent,
		type Timeframe,
		getWeek,
		getDateHash,
		calculateMonthGrid,
		getDailyEvents,
		getUTCDate,
		getFirstDayOfWeek,
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

	const weekdays = $derived(
		new Array(7).fill(0).map((_, i) => {
			const date = new Date(Date.UTC(1970, 0, 4 + i + (startWeekOnSunday ? 0 : 1)));
			return date.toLocaleString('default', { weekday: 'long', timeZone: 'UTC' });
		}),
	);

	const weekLinks = $derived.by(() => {
		if (!showWeekLinks || !timeframe?.start) return [];

		const monthStart = getUTCDate(
			timeframe.start.getUTCFullYear(),
			timeframe.start.getUTCMonth(),
		);
		const monthEnd = getUTCDate(
			timeframe.start.getUTCFullYear(),
			timeframe.start.getUTCMonth() + 1,
			0,
		);
		const monthWeekStart = new Date(getFirstDayOfWeek(monthStart, startWeekOnSunday));

		const numWeeks =
			Math.floor((monthEnd.getTime() - monthWeekStart.getTime()) / 604800000) + 1;
		return new Array(numWeeks).fill(0).map((_, i) => {
			const date = new Date(monthWeekStart.getTime() + i * 604800000);
			const week = getWeek(date, startWeekOnSunday);
			const monthShort =
				!useWeekSinceYear && week.year && week.month && week.month !== timeframe.month
					? new Date(Date.UTC(week.year, week.month)).toLocaleString('default', {
							month: 'short',
						})
					: '';
			return {
				...week,
				monthShort,
			};
		});
	});

	const currentMonthGrid = $derived.by(() => {
		const firstCurrentMonthIndex = monthGrid.findIndex((c) => c.isCurrentMonth);
		return monthGrid.map((cell) => {
			const date = new Date(cell.dateMs);
			const dailyData = getDailyEvents(cell.dateMs, settings, events);
			const borderTop =
				cell.isCurrentMonth && cell.dayIndex - firstCurrentMonthIndex >= 7;
			const isFirstCol = cell.dayIndex % 7 === 0;
			const altRow = Math.floor(cell.dayIndex / 7) % 2 === 1;

			return {
				...cell,
				date,
				dailyData,
				borderTop,
				isFirstCol,
				altRow,
			};
		});
	});
</script>

{#if timeframe?.month}
	<div
		class="planner page calendar-month flex flex-col {showNotes
			? 'with-notes h-full'
			: ''}">
		<div
			class="month-grid calendar-month-grid {showWeekLinks
				? isWeeksOnLeft
					? 'weeks-left grid-cols-[3rem_repeat(7,1fr)]'
					: 'weeks-right grid-cols-[repeat(7,1fr)_3rem]'
				: 'no-weeks grid-cols-7'} {showNotes ? 'h-[88%]' : ''}">
			{#if showWeekLinks && isWeeksOnLeft}
				<div class="empty-corner col-span-1"></div>
			{/if}

			{#each weekdays as weekday}
				<div class="weekday-header calendar-weekday-header">
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
						class="week-link calendar-week-link {isWeeksOnLeft
							? 'left-side col-start-1 border-r border-[var(--outline-high)]'
							: 'right-side col-start-8 border-l border-[var(--outline-high)]'} {i > 0
							? 'not-first border-t border-[var(--outline)]'
							: ''} {i % 2 === 1 ? 'alt-bg bg-[var(--nav-bg-pdf,var(--bg-high))]' : ''}"
						style="grid-row: {i + 2};">
						<span
							class="week-text calendar-week-text"
							style="writing-mode: vertical-lr; text-orientation: mixed;">
							{#if week.monthShort}
								{week.monthShort}
							{/if}
							Week {useWeekSinceYear ? week.weekSinceYear : week.weekSinceMonth}
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
			<div
				class="notes-section text-center border-t border-[var(--outline)] w-full flex-1 p-0 flex flex-col">
				<h3 class="notes-title text-[0.9em] font-light my-[0.55rem]">Notes</h3>
				<Grid display="dotted" />
			</div>
		{/if}
	</div>
{/if}
