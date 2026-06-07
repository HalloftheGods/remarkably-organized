<script lang="ts">
	import { formatToString, getFirstDayOfWeek, type Timeframe, getDateHash } from '$lib';
	import { Box, Text, Link } from '$atoms';

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
	const monthEmojis = $derived(!settings?.emojis?.disable ? settings.emojis.months : []);

	const weekStart = $derived(
		new Date(getFirstDayOfWeek(timeframe.start, startWeekOnSunday)),
	);
</script>

{#if groupBy === 'week'}
	<Box class="year-by-week">
		{#each new Array(numDays) as _, day}
			{@const date = new Date(yearStart.getTime() + day * 86400000)}
			{@const isFirstOfMonth = date.getUTCDate() === 1}
			{@const isEvenMonth = date.getUTCMonth() % 2 !== 0}
			{@const isFirstRow = day < 14}
			{@const isLastCol = day % 14 === 13}
			{@const isSecondWeek = day % 14 === 7}
			<Link
				href={getDateHash(date)}
				class="day {isFirstRow ? 'first-row' : ''} {isLastCol
					? 'last-col'
					: ''} {isSecondWeek ? 'second-week' : ''} {isEvenMonth ? 'even-month' : ''}">
				{#if isFirstOfMonth}
					<Box class="month-emoji">
						<Text>{monthEmojis[date.getUTCMonth()]}</Text>
					</Box>
				{/if}
				<Box class="date">
					<Text>
						{@html formatToString(date.getUTCDate(), { type: 'ordinal', html: true })}
					</Text>
				</Box>
				<Box class="month">
					<Text>
						{date.toLocaleString('default', { month: 'short', timeZone: 'UTC' })}
					</Text>
				</Box>
			</Link>
		{/each}
	</Box>
{/if}

{#if groupBy === 'month'}
	<Box class="year-by-month">
		{#each new Array(12) as _, month}
			{@const isEvenMonth = month % 2 !== 0}
			<Box
				class="month {isEvenMonth ? 'even-month' : ''}"
				style="grid-column: {month + 1}">
				<Box class="emoji" style="font-size: 1.5rem; opacity: 1; padding-bottom: 0.1rem;">
					<Text>{monthEmojis[month]}</Text>
				</Box>
				<Text tag="span" class="month-name">
					{new Date(Date.UTC(2000, month)).toLocaleString('default', {
						month: 'short',
						timeZone: 'UTC',
					})}
				</Text>
			</Box>
		{/each}
		{#each new Array(numDays) as _, day}
			{@const date = new Date(yearStart.getTime() + day * 86400000)}
			{@const isFirstRow = date.getUTCDate() === 1}
			{@const isEvenMonth = date.getUTCMonth() % 2 !== 0}
			<Link
				href={getDateHash(date)}
				class="day {isFirstRow ? 'first-row' : ''} {isEvenMonth ? 'even-month' : ''}"
				style="grid-column: {date.getUTCMonth() + 1}">
				<Box class="weekday">
					<Text>
						{date.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}
					</Text>
				</Box>
				<Box class="date">
					<Text>
						{@html formatToString(date.getUTCDate(), { type: 'ordinal', html: true })}
					</Text>
				</Box>
			</Link>
		{/each}
	</Box>
{/if}

<style lang="scss">
	:global {
		.year-by-week {
			display: grid;
			grid-auto-flow: column;
			grid-template-columns: repeat(26, 1fr);
			grid-template-rows: repeat(14, 1fr);
			padding: 2rem;
			height: 100%;

			.day {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-left: solid 1px var(--outline);
				border-right: solid 1px var(--outline);
				border-bottom: solid 1px var(--outline);
				line-height: 1;
				text-decoration: none;
				color: inherit;
				&.first-row {
					border-top: solid 1px var(--outline);
				}
				&.last-col {
					border-right: solid 1px var(--outline);
				}
				&.second-week {
					border-left: none;
				}
				&.even-month {
					background-color: rgba(0, 0, 0, 0.03);
				}
				.month-emoji {
					font-size: 1.5rem;
					line-height: 1;
					margin-bottom: 0.25rem;
				}
				.month {
					font-size: 0.5em;
					opacity: 0.65;
					font-weight: var(--font-weight-bold);
				}
				.date {
					font-size: 1em;
					font-weight: var(--font-weight-normal);
					opacity: 0.9;
					line-height: 0.7rem;
					.ordinal {
						font-size: 0.45em;
						vertical-align: super;
						margin-left: 0.05rem;
					}
				}
			}
		}

		.year-by-month {
			display: grid;
			grid-auto-flow: column;
			grid-template-columns: repeat(12, 1fr);
			grid-template-rows: repeat(32, 1fr);
			padding: 0 2rem 2rem;
			height: 100%;
			.month {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: 0.7em;
				font-weight: var(--font-weight-bold);
				grid-row: 1;
				border-bottom: solid 1px var(--outline);
				&.even-month {
					background-color: rgba(0, 0, 0, 0.03);
				}
				.month-name {
					opacity: 0.65;
				}
			}

			.day {
				display: flex;
				font-weight: var(--font-weight-light);
				align-items: center;
				justify-content: center;
				border-left: solid 1px var(--outline);
				border-right: solid 1px var(--outline);
				border-bottom: solid 1px var(--outline);
				line-height: 1;
				gap: 0 0.2rem;
				text-decoration: none;
				color: inherit;

				&.even-month {
					background-color: rgba(0, 0, 0, 0.03);
				}

				&.first-row {
					grid-row: 2;
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
