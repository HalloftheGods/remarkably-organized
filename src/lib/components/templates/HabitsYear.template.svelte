<script lang="ts">
	import {
		formatToString,
		type Timeframe,
		getDateHash,
		type PlannerSettings,
		calculateYearGrid,
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

	const weekHeaders = $derived(
		Array.from({ length: 14 }, (_, i) => {
			const headerDate = new Date(grid.weekLayoutStart.getTime() + i * 86400000);
			return {
				name: headerDate.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' }),
				isSecondWeek: i === 7,
				isLastCol: i === 13,
				col: i + 1,
			};
		}),
	);

	const weekDays = $derived(
		Array.from({ length: grid.totalDaysWeekView }, (_, day) => {
			const date = new Date(grid.weekLayoutStart.getTime() + day * 86400000);
			const col = (day % 14) + 1;
			const row = Math.floor(day / 14) + 2;
			return {
				date,
				isFirstOfMonth: date.getUTCDate() === 1,
				isEvenMonth: date.getUTCMonth() % 2 !== 0,
				col,
				row,
				isSecondWeek: col === 8,
				isFirstRow: row === 2,
				isLastCol: col === 14,
				isOutOfRange: date.getUTCFullYear() !== (timeframe.year || 2024),
				monthNameLong: date
					.toLocaleString('default', { month: 'long', timeZone: 'UTC' })
					.toLowerCase(),
				monthNameShort: date.toLocaleString('default', {
					month: 'short',
					timeZone: 'UTC',
				}),
				dayOrdinal: formatToString(date.getUTCDate(), { type: 'ordinal', html: true }),
			};
		}),
	);

	const monthHeaders = $derived(
		Array.from({ length: 12 }, (_, month) => {
			const date = new Date(Date.UTC(2000, month));
			return {
				month,
				isEvenMonth: month % 2 !== 0,
				isLastCol: month === 11,
				col: month + 1,
				monthNameLong: date
					.toLocaleString('default', { month: 'long', timeZone: 'UTC' })
					.toLowerCase(),
				monthNameShort: date.toLocaleString('default', {
					month: 'short',
					timeZone: 'UTC',
				}),
			};
		}),
	);

	const monthDays = $derived(
		Array.from({ length: grid.numDays }, (_, day) => {
			const date = new Date(grid.yearStart.getTime() + day * 86400000);
			return {
				date,
				isFirstRow: date.getUTCDate() === 1,
				isEvenMonth: date.getUTCMonth() % 2 !== 0,
				isLastCol: date.getUTCMonth() === 11,
				col: date.getUTCMonth() + 1,
				row: date.getUTCDate() + 1,
				weekdayShort: date.toLocaleString('default', {
					weekday: 'short',
					timeZone: 'UTC',
				}),
				dayOrdinal: formatToString(date.getUTCDate(), { type: 'ordinal', html: true }),
			};
		}),
	);
</script>

{#if groupBy === 'week'}
	<div
		class="planner page padded gap-0 year-by-week grid w-full h-full [&_.day_.date_.ordinal]:text-[0.45em] [&_.day_.date_.ordinal]:align-super [&_.day_.date_.ordinal]:ml-[0.05rem]"
		style="grid-template-rows: 2rem repeat({grid.numWeekRows}, 1fr); grid-template-columns: repeat(14, 1fr);">
		{#each weekHeaders as header (header.col)}
			<div
				class="weekday-header flex items-center justify-center text-[0.8rem] font-bold font-display border-l border-b border-[var(--outline)] opacity-65 {header.isSecondWeek
					? 'second-week border-l-2 border-[var(--outline-high)]'
					: ''} {header.isLastCol ? 'last-col border-r border-[var(--outline)]' : ''}"
				style="grid-column: {header.col}; grid-row: 1;">
				<span>
					{header.name}
				</span>
			</div>
		{/each}
		{#each weekDays as day, i (i)}
			<Link
				href={getDateHash(day.date)}
				class="day flex flex-col items-center justify-center border-l border-b border-[var(--outline)] leading-none no-underline text-inherit relative {day.isFirstRow
					? 'first-row border-t border-[var(--outline)]'
					: ''} {day.isSecondWeek
					? 'second-week border-l-2 border-[var(--outline-high)]'
					: ''} {day.isLastCol
					? 'last-col border-r border-[var(--outline)]'
					: ''} {day.isEvenMonth ? 'even-month bg-[var(--nav-bg-pdf,var(--bg-high))]' : ''} {day.isOutOfRange
					? 'out-of-range opacity-35'
					: ''}"
				style="grid-column: {day.col}; grid-row: {day.row};">
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
				<div
					class="date relative z-10 text-[0.8em] font-normal opacity-90 leading-[0.6rem]">
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
		class="planner page padded gap-0 year-by-month grid w-full h-full [&_.day_.date_.ordinal]:text-[0.45em] [&_.day_.date_.ordinal]:align-super"
		style="grid-template-columns: repeat(12, 1fr); grid-template-rows: 3rem repeat(31, 1fr);">
		{#each monthHeaders as header (header.month)}
			<div
				class="month-header flex flex-col items-center justify-center text-[0.7em] font-bold border-l border-[var(--outline)] {header.isEvenMonth
					? 'even-month bg-[var(--nav-bg-pdf,var(--bg-high))]'
					: ''} {header.isLastCol ? 'last-col border-r border-[var(--outline)]' : ''}"
				style="grid-column: {header.col}; grid-row: 1;">
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
		{#each monthDays as day, i (i)}
			<Link
				href={getDateHash(day.date)}
				class="day flex font-light items-center justify-center border-l border-b border-[var(--outline)] leading-none gap-x-[0.2rem] no-underline text-inherit {day.isFirstRow
					? 'first-row'
					: ''} {day.isEvenMonth ? 'even-month bg-[var(--nav-bg-pdf,var(--bg-high))]' : ''} {day.isLastCol
					? 'last-col border-r border-[var(--outline)]'
					: ''}"
				style="grid-column: {day.col}; grid-row: {day.row}">
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
