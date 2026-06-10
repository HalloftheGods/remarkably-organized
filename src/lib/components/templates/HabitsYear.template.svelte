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
</script>

{#if groupBy === 'week'}
	<div
		class="planner page year-by-week grid w-full h-full"
		style="grid-template-rows: 2rem repeat({grid.numWeekRows}, 1fr);">
		{#each new Array(14) as _, i}
			{@const headerDate = new Date(grid.weekLayoutStart.getTime() + i * 86400000)}
			{@const isSecondWeek = i === 7}
			{@const isLastCol = i === 13}
			<div
				class="weekday-header flex items-center justify-center text-[0.8rem] font-bold font-display border-l border-b border-[var(--outline)] opacity-65 {isSecondWeek ? 'second-week border-l-2 border-[var(--outline-high)]' : ''} {isLastCol
					? 'last-col border-r border-[var(--outline)]'
					: ''}"
				style="grid-column: {i + 1}; grid-row: 1;">
				<span>
					{headerDate.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}
				</span>
			</div>
		{/each}
		{#each new Array(grid.totalDaysWeekView) as _, day}
			{@const date = new Date(grid.weekLayoutStart.getTime() + day * 86400000)}
			{@const isFirstOfMonth = date.getUTCDate() === 1}
			{@const isEvenMonth = date.getUTCMonth() % 2 !== 0}
			{@const col = (day % 14) + 1}
			{@const row = Math.floor(day / 14) + 2}
			{@const isSecondWeek = col === 8}
			{@const isFirstRow = row === 2}
			{@const isLastCol = col === 14}
			{@const isOutOfRange = date.getUTCFullYear() !== (timeframe.year || 2024)}
			<Link
				href={getDateHash(date)}
				class="day flex flex-col items-center justify-center border-l border-b border-[var(--outline)] leading-none no-underline text-inherit relative {isFirstRow ? 'first-row border-t border-[var(--outline)]' : ''} {isSecondWeek
					? 'second-week border-l-2 border-[var(--outline-high)]'
					: ''} {isLastCol ? 'last-col border-r border-[var(--outline)]' : ''} {isEvenMonth
					? 'even-month bg-black/5'
					: ''} {isOutOfRange ? 'out-of-range opacity-35' : ''}"
				style="grid-column: {col}; grid-row: {row};">
				{#if isFirstOfMonth}
					<div class="month-watermark absolute inset-0 flex items-center justify-center text-[2rem] opacity-[0.15] pointer-events-none z-0">
						<span>
							{monthEmojis[
								date
									.toLocaleString('default', { month: 'long', timeZone: 'UTC' })
									.toLowerCase() as keyof typeof monthEmojis
							]}
						</span>
					</div>
				{/if}
				<div class="month relative z-10 text-[0.65em] opacity-65 font-bold">
					<span>
						{date.toLocaleString('default', { month: 'short', timeZone: 'UTC' })}
					</span>
				</div>
				<div class="date relative z-10 text-[0.8em] font-normal opacity-90 leading-[0.6rem]">
					<span>
						{@html formatToString(date.getUTCDate(), { type: 'ordinal', html: true })}
					</span>
				</div>
			</Link>
		{/each}
	</div>
{/if}

{#if groupBy === 'month'}
	<div class="planner page year-by-month grid w-full h-full">
		{#each new Array(12) as _, month}
			{@const isEvenMonth = month % 2 !== 0}
			{@const isLastCol = month === 11}
			<div
				class="month-header flex flex-col items-center justify-center text-[0.7em] font-bold border-l border-[var(--outline)] {isEvenMonth ? 'even-month bg-black/5' : ''} {isLastCol
					? 'last-col border-r border-[var(--outline)]'
					: ''}"
				style="grid-column: {month + 1}; grid-row: 1;">
				<div class="emoji text-[1.5rem] opacity-100 pb-[0.1rem]">
					<span>
						{monthEmojis[
							new Date(Date.UTC(2000, month))
								.toLocaleString('default', { month: 'long', timeZone: 'UTC' })
								.toLowerCase() as keyof typeof monthEmojis
						]}
					</span>
				</div>
				<span class="month-name opacity-65">
					{new Date(Date.UTC(2000, month)).toLocaleString('default', {
						month: 'short',
						timeZone: 'UTC',
					})}
				</span>
			</div>
		{/each}
		{#each new Array(grid.numDays) as _, day}
			{@const date = new Date(grid.yearStart.getTime() + day * 86400000)}
			{@const isFirstRow = date.getUTCDate() === 1}
			{@const isEvenMonth = date.getUTCMonth() % 2 !== 0}
			{@const isLastCol = date.getUTCMonth() === 11}
			<Link
				href={getDateHash(date)}
				class="day flex font-light items-center justify-center border-l border-b border-[var(--outline)] leading-none gap-x-[0.2rem] no-underline text-inherit {isFirstRow ? 'first-row' : ''} {isEvenMonth
					? 'even-month bg-black/5'
					: ''} {isLastCol ? 'last-col border-r border-[var(--outline)]' : ''}"
				style="grid-column: {date.getUTCMonth() + 1}; grid-row: {date.getUTCDate() + 1}">
				<div class="weekday text-[0.5em] opacity-100 font-normal">
					<span>
						{date.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}
					</span>
				</div>
				<div class="date text-[1em] font-normal opacity-90 leading-[0.7em]">
					<span>
						{@html formatToString(date.getUTCDate(), { type: 'ordinal', html: true })}
					</span>
				</div>
			</Link>
		{/each}
	</div>
{/if}

<style lang="scss">
	.year-by-week {
		grid-template-columns: repeat(14, 1fr);

		:global {
			.day {
				.date {
					.ordinal {
						font-size: 0.45em;
						vertical-align: super;
						margin-left: 0.05rem;
					}
				}
			}
		}
	}

	.year-by-month {
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: 3rem repeat(31, 1fr);

		:global {
			.day {
				.date {
					.ordinal {
						font-size: 0.45em;
						vertical-align: super;
					}
				}
			}
		}
	}
</style>
