<script lang="ts">
	import { formatToString, getFirstDayOfWeek, type Timeframe, getDateHash } from '$lib';
	import { Link } from '$atoms';

	import type { PlannerSettings } from '$lib';

	let {
		timeframe = {} as Timeframe,
		startWeekOnSunday = false,
		groupBy = 'week' as 'week' | 'month',
		events = [],
		settings = {} as PlannerSettings,
	} = $props();

	const yearStart = $derived(new Date(Date.UTC(timeframe.year || 2024, 0, 1)));
	const isLeapYear = $derived(
		(yearStart.getUTCFullYear() % 4 === 0 && yearStart.getUTCFullYear() % 100 !== 0) ||
			yearStart.getUTCFullYear() % 400 === 0,
	);
	const numDays = $derived(isLeapYear ? 366 : 365);
	const monthEmojis = $derived(!settings?.emojis?.disable ? settings.emojis : {});
	const weekLayoutStart = $derived(
		new Date(
			getFirstDayOfWeek(Date.UTC(timeframe.year || 2024, 0, 1), startWeekOnSunday),
		),
	);
	const weekLayoutEnd = $derived(new Date(Date.UTC(timeframe.year || 2024, 11, 31)));
	const numDaysWeekView = $derived(
		Math.floor((weekLayoutEnd.getTime() - weekLayoutStart.getTime()) / 86400000) + 1,
	);
	const totalDaysWeekView = $derived(Math.ceil(numDaysWeekView / 14) * 14);
	const numWeekRows = $derived(totalDaysWeekView / 14);
</script>

{#if groupBy === 'week'}
	<div class="planner page year-by-week" style="grid-template-rows: 2rem repeat({numWeekRows}, 1fr);">
		{#each new Array(14) as _, i}
			{@const headerDate = new Date(weekLayoutStart.getTime() + i * 86400000)}
			{@const isSecondWeek = i === 7}
			{@const isLastCol = i === 13}
			<div class="weekday-header {isSecondWeek ? 'second-week' : ''} {isLastCol
					? 'last-col'
					: ''}" style="grid-column: {i + 1}; grid-row: 1;">
				<span>
					{headerDate.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}
				</span>
			</div>
		{/each}
		{#each new Array(totalDaysWeekView) as _, day}
			{@const date = new Date(weekLayoutStart.getTime() + day * 86400000)}
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
				class="day {isFirstRow ? 'first-row' : ''} {isSecondWeek
					? 'second-week'
					: ''} {isLastCol ? 'last-col' : ''} {isEvenMonth
					? 'even-month'
					: ''} {isOutOfRange ? 'out-of-range' : ''}"
				style="grid-column: {col}; grid-row: {row};">
				{#if isFirstOfMonth}
					<div class="month-watermark">
						<span>
							{monthEmojis[
								date
									.toLocaleString('default', { month: 'long', timeZone: 'UTC' })
									.toLowerCase() as keyof typeof monthEmojis
							]}
						</span>
					</div>
				{/if}
				<div class="month">
					<span>
						{date.toLocaleString('default', { month: 'short', timeZone: 'UTC' })}
					</span>
				</div>
				<div class="date">
					<span>
						{@html formatToString(date.getUTCDate(), { type: 'ordinal', html: true })}
					</span>
				</div>
			</Link>
		{/each}
	</div>
{/if}

{#if groupBy === 'month'}
	<div class="year-by-month">
		{#each new Array(12) as _, month}
			{@const isEvenMonth = month % 2 !== 0}
			{@const isLastCol = month === 11}
			<div class="month-header {isEvenMonth ? 'even-month' : ''} {isLastCol
					? 'last-col'
					: ''}" style="grid-column: {month + 1}; grid-row: 1;">
				<div class="emoji" style="font-size: 1.5rem; opacity: 1; padding-bottom: 0.1rem;">
					<span>
						{monthEmojis[
							new Date(Date.UTC(2000, month))
								.toLocaleString('default', { month: 'long', timeZone: 'UTC' })
								.toLowerCase() as keyof typeof monthEmojis
						]}
					</span>
				</div>
				<span class="month-name">
					{new Date(Date.UTC(2000, month)).toLocaleString('default', {
						month: 'short',
						timeZone: 'UTC',
					})}
				</span>
			</div>
		{/each}
		{#each new Array(numDays) as _, day}
			{@const date = new Date(yearStart.getTime() + day * 86400000)}
			{@const isFirstRow = date.getUTCDate() === 1}
			{@const isEvenMonth = date.getUTCMonth() % 2 !== 0}
			{@const isLastCol = date.getUTCMonth() === 11}
			<Link
				href={getDateHash(date)}
				class="day {isFirstRow ? 'first-row' : ''} {isEvenMonth
					? 'even-month'
					: ''} {isLastCol ? 'last-col' : ''}"
				style="grid-column: {date.getUTCMonth() + 1}; grid-row: {date.getUTCDate() + 1}">
				<div class="weekday">
					<span>
						{date.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}
					</span>
				</div>
				<div class="date">
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
			display: grid;
			grid-template-columns: repeat(14, 1fr);
			grid-template-rows: 2rem repeat(27, 1fr);
			height: 100%;
			width: 100%;

			.weekday-header {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 0.8rem;
				font-weight: var(--font-weight-bold);
				font-family: var(--font-display, var(--font-cover, var(--font)));
				border-left: solid 1px var(--outline);
				border-bottom: solid 1px var(--outline);
				opacity: 0.65;
				&.second-week {
					border-left: solid 2px var(--outline-high);
				}
				&.last-col {
					border-right: solid 1px var(--outline);
				}
			}

			:global {
				.day {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					border-left: solid 1px var(--outline);
					border-bottom: solid 1px var(--outline);
					line-height: 1;
					text-decoration: none;
					color: inherit;
					position: relative;
					&.first-row {
						border-top: solid 1px var(--outline);
					}
					&.second-week {
						border-left: solid 2px var(--outline-high);
					}
					&.last-col {
						border-right: solid 1px var(--outline);
					}
					&.out-of-range {
						opacity: 0.35;
					}
					&.even-month {
						background-color: rgba(0, 0, 0, 0.03);
					}
					.month-watermark {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 2rem;
						opacity: 0.15;
						pointer-events: none;
						z-index: 0;
					}
					.month,
					.date {
						position: relative;
						z-index: 1;
					}
					.month {
						font-size: 0.65em;
						opacity: 0.65;
						font-weight: var(--font-weight-bold);
					}
					.date {
						font-size: 0.8em;
						font-weight: var(--font-weight-normal);
						opacity: 0.9;
						line-height: 0.6rem;
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
			display: grid;
			grid-template-columns: repeat(12, 1fr);
			grid-template-rows: 3rem repeat(31, 1fr);
			height: 100%;
			width: 100%;

			.month-header {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: 0.7em;
				font-weight: var(--font-weight-bold);
				border-left: solid 1px var(--outline);
				&.even-month {
					background-color: rgba(0, 0, 0, 0.03);
				}
				&.last-col {
					border-right: solid 1px var(--outline);
				}
				.month-name {
					opacity: 0.65;
				}
			}

			:global {
				.day {
					display: flex;
					font-weight: var(--font-weight-light);
					align-items: center;
					justify-content: center;
					border-left: solid 1px var(--outline);
					border-bottom: solid 1px var(--outline);
					line-height: 1;
					gap: 0 0.2rem;
					text-decoration: none;
					color: inherit;

					&.even-month {
						background-color: rgba(0, 0, 0, 0.03);
					}

					&.last-col {
						border-right: solid 1px var(--outline);
					}

					.weekday {
						font-size: 0.5em;
						opacity: 1;
						font-weight: var(--font-weight-normal);
					}
					.date {
						font-size: 1em;
						font-weight: var(--font-weight-normal);
						opacity: 0.9;
						line-height: 0.7em;
						.ordinal {
							font-size: 0.45em;
							vertical-align: super;
						}
					}
				}
			}
		}
	
</style>
