<script lang="ts">
	import {
		type Timeframe,
		getDateHash,
		type PlannerSettings,
		calculateYearGrid,
		getHabitsYearWeekHeaders,
		getHabitsYearWeekDays,
		getHabitsYearMonthHeaders,
		getHabitsYearMonthDays,
	} from '$lib';
	import { Link } from '$atoms';

	let {
		timeframe = {} as Timeframe,
		startWeekOnSunday = false,
		groupBy = 'week' as 'week' | 'month',
		events = [],
		settings = {} as PlannerSettings,
	} = $props();

	const grid = $derived(calculateYearGrid(timeframe.year || 2024, startWeekOnSunday));
	const monthEmojis = $derived(!settings?.emojis?.disable ? settings.emojis : {});

	const weekHeaders = $derived(getHabitsYearWeekHeaders(grid.weekLayoutStart));
	const weekDays = $derived(
		getHabitsYearWeekDays(grid.weekLayoutStart, grid.totalDaysWeekView, timeframe.year || 2024),
	);
	const monthHeaders = $derived(getHabitsYearMonthHeaders());
	const monthDays = $derived(getHabitsYearMonthDays(grid.yearStart, grid.numDays));

	const mapToViewWeekHeader = (header: any) => {
		const className = `habits-year-week-header ${header.isSecondWeek ? 'second-week border-l-2 border-[var(--outline-high)]' : ''} ${header.isLastCol ? 'last-col border-r border-[var(--outline)]' : ''}`;
		const style = `grid-column: ${header.col}; grid-row: 1;`;
		return { ...header, className, style };
	};

	const mapToViewWeekDay = (day: any) => {
		const className = `habits-year-day ${day.isFirstRow ? 'first-row border-t border-[var(--outline)]' : ''} ${day.isSecondWeek ? 'second-week border-l-2 border-[var(--outline-high)]' : ''} ${day.isLastCol ? 'last-col border-r border-[var(--outline)]' : ''} ${day.isEvenMonth ? 'even-month bg-[var(--nav-bg-pdf,var(--bg-high))]' : ''} ${day.isOutOfRange ? 'out-of-range opacity-35' : ''}`;
		const style = `grid-column: ${day.col}; grid-row: ${day.row};`;
		return { ...day, className, style };
	};

	const mapToViewMonthHeader = (header: any) => {
		const className = `habits-year-month-header ${header.isEvenMonth ? 'even-month bg-[var(--nav-bg-pdf,var(--bg-high))]' : ''} ${header.isLastCol ? 'last-col border-r border-[var(--outline)]' : ''}`;
		const style = `grid-column: ${header.col}; grid-row: 1;`;
		return { ...header, className, style };
	};

	const mapToViewMonthDay = (day: any) => {
		const className = `habits-year-month-day ${day.isFirstRow ? 'first-row' : ''} ${day.isEvenMonth ? 'even-month bg-[var(--nav-bg-pdf,var(--bg-high))]' : ''} ${day.isLastCol ? 'last-col border-r border-[var(--outline)]' : ''}`;
		const style = `grid-column: ${day.col}; grid-row: ${day.row}`;
		return { ...day, className, style };
	};

	const viewWeekHeaders = $derived(weekHeaders.map(mapToViewWeekHeader));
	const viewWeekDays = $derived(weekDays.map(mapToViewWeekDay));
	const viewMonthHeaders = $derived(monthHeaders.map(mapToViewMonthHeader));
	const viewMonthDays = $derived(monthDays.map(mapToViewMonthDay));

	const weekGridStyle = $derived(`grid-template-rows: 2rem repeat(${grid.numWeekRows}, 1fr); grid-template-columns: repeat(14, 1fr);`);
	const monthGridStyle = $derived(`grid-template-columns: repeat(12, 1fr); grid-template-rows: 3rem repeat(31, 1fr);`);
</script>

{#if groupBy === 'week'}
	<div
		class="planner page padded gap-0 year-by-week habits-year-week-grid"
		style={weekGridStyle}>
		{#each viewWeekHeaders as header (header.col)}
			<div class={header.className} style={header.style}>
				<span>
					{header.name}
				</span>
			</div>
		{/each}
		{#each viewWeekDays as day, i (i)}
			<Link
				href={getDateHash(day.date)}
				class={day.className}
				style={day.style}>
				{#if day.isFirstOfMonth}
					<div
						class="month-watermark absolute inset-0 flex items-center justify-center text-[2rem] opacity-[0.15] pointer-events-none z-0">
						<span>
							{monthEmojis[day.monthNameLong as keyof typeof monthEmojis]}
						</span>
					</div>
				{/if}
				<div class="month relative z-10 text-[0.65em] opacity-65 font-bold">
					<span>
						{day.monthNameShort}
					</span>
				</div>
				<div class="date relative z-10 text-[0.8em] font-normal opacity-90 leading-[0.6rem]">
					<span>
						{@html day.dayOrdinal}
					</span>
				</div>
			</Link>
		{/each}
	</div>
{/if}

{#if groupBy === 'month'}
	<div
		class="planner page padded gap-0 year-by-month habits-year-month-grid"
		style={monthGridStyle}>
		{#each viewMonthHeaders as header (header.month)}
			<div class={header.className} style={header.style}>
				<div class="emoji text-[1.5rem] opacity-100 pb-[0.1rem]">
					<span>
						{monthEmojis[header.monthNameLong as keyof typeof monthEmojis]}
					</span>
				</div>
				<span class="month-name opacity-65">
					{header.monthNameShort}
				</span>
			</div>
		{/each}
		{#each viewMonthDays as day, i (i)}
			<Link
				href={getDateHash(day.date)}
				class={day.className}
				style={day.style}>
				<div class="weekday text-[0.5em] opacity-100 font-normal">
					<span>
						{day.weekdayShort}
					</span>
				</div>
				<div class="date text-[1em] font-normal opacity-90 leading-[0.7em]">
					<span>
						{@html day.dayOrdinal}
					</span>
				</div>
			</Link>
		{/each}
	</div>
{/if}
