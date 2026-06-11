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

	const weekdays = $derived(getCalendarMonthWeekdays(startWeekOnSunday, 'short'));
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
		const colClass = isWeeksOnLeft ? 'left' : 'right';
		const altClass = index % 2 === 1 ? 'alt' : '';
		const borderClass = index > 0 ? 'border-top' : '';
		const weekLabel = useWeekSinceYear ? week.weekSinceYear : week.weekSinceMonth;

		return { ...week, colClass, altClass, borderClass, weekLabel, index };
	};

	const mapToViewGridCell = (cell: any) => {
		const isDimmed = !cell.isCurrentMonth;
		const dimClass = isDimmed ? 'dimmed' : '';
		const firstColClass = cell.isFirstCol ? 'first-col' : '';
		const hasBorderTop = cell.borderTop || (!cell.isCurrentMonth && cell.dayIndex > 20);
		const eventCount = cell.dailyData.timed.length;
		const hasManyEvents = eventCount > 3;
		const hasAnyEvents = eventCount > 0;

		return {
			...cell,
			isDimmed,
			dimClass,
			firstColClass,
			hasBorderTop,
			eventCount,
			hasManyEvents,
			hasAnyEvents,
		};
	};

	const getGridColsClass = () => {
		if (!showWeekLinks) return 'no-week-links';
		return isWeeksOnLeft ? 'week-links-left' : 'week-links-right';
	};

	const gridColsClass = $derived(getGridColsClass());
	const viewWeekLinks = $derived(weekLinks.map(mapToViewWeekLink));
	const viewMonthGrid = $derived(currentMonthGrid.map(mapToViewGridCell));
</script>

{#if hasMonth}
	<div class="planner page calendar-month" class:with-notes={showNotes}>
		<div class="calendar-month-grid {gridColsClass}">
			{#if hasWeekLinksOnLeft}
				<div class="empty-corner col-span-1"></div>
			{/if}

			{#each weekdays as weekday}
				<div class="calendar-weekday-header">
					<span style="font-size: calc(1.25em * var(--font-display-scale, 1))" class="py-2 leading-tight">{weekday}</span>
				</div>
			{/each}

			{#if hasWeekLinksOnRight}
				<div class="empty-corner col-span-1"></div>
			{/if}

			{#if showWeekLinks}
				{#each viewWeekLinks as week (week.index)}
					<a
						href="#{week.id}"
						class="week-link {week.colClass} {week.borderClass} {week.altClass}"
						style="grid-row: {week.index + 2};">
						<span class="week-text">
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
					class="{cell.dimClass} {cell.firstColClass}"
					dim={cell.dailyData.isDisabled}
					altRow={cell.altRow}
					borderTop={cell.hasBorderTop}
					href={getDateHash(cell.date)}
					date={cell.date.getUTCDate()}
					moonEmoji={cell.dailyData.moonEmoji || ''}>
					{#each cell.dailyData.allDay as event}
						<div class="all-day-event">
							<span>{event.name}</span>
						</div>
					{/each}

					{#if cell.hasAnyEvents}
						<div class="container-calendar-events">
							{#if cell.hasManyEvents}
								<Dot title="{cell.eventCount} events" />
								<span class="event-count">
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
			<div class="notes-section">
				<h3>Notes</h3>
				<Grid display="dotted" />
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	@use '$lib/styles/app.css';

	.calendar-month {
		gap: 0;
		display: flex;
		flex-direction: column;

		&.with-notes {
			height: 100%;

			.calendar-month-grid {
				height: 90%;
			}
		}

		.calendar-month-grid {
			&.no-week-links {
				grid-template-columns: repeat(7, 1fr);
			}
			&.week-links-left {
				grid-template-columns: 3rem repeat(7, 1fr);
			}
			&.week-links-right {
				grid-template-columns: repeat(7, 1fr) 3rem;
			}
		}

		.week-link {
			@apply calendar-week-link;
			color: var(--text-sidebar);

			&.left {
				grid-column: 1;
				border-right: 1px solid var(--outline);
			}
			&.right {
				grid-column: 8;
				border-left: 1px solid var(--outline);
			}
			&.border-top {
				border-top: 1px solid var(--outline);
			}
			&.alt {
				background-color: var(--bg-sidebar);
			}
		}

		.week-text {
			@apply calendar-week-text;
			writing-mode: vertical-lr;
			text-orientation: mixed;
		}

		.all-day-event {
			@apply text-calendar-event;
			font-size: 0.6em;
			font-weight: 500;
			color: var(--text);
			@apply truncate leading-tight opacity-90;
		}

		.event-count {
			font-size: 0.6em;
			line-height: 1;
			opacity: 0.6;
		}

		.dimmed {
			color: var(--text-sidebar, var(--text-low));
			opacity: 0.5;
		}

		.calendar-month-grid :global(.first-col) {
			border-left: 0 !important;
		}

		.container-calendar-events {
			display: flex;
			gap: 2px;
			flex-wrap: wrap;
			align-items: center;

			:global(.dot) {
				min-width: 4px;
				min-height: 4px;
				background-color: var(--text);
				opacity: 1;
			}
		}

		.notes-section {
			text-align: center;
			border-top: 1px solid var(--outline);
			width: 100%;
			flex: 1;
			padding: 0;
			display: flex;
			flex-direction: column;

			h3 {
				font-size: 0.9em;
				font-weight: 300;
				margin: 0.55rem 0;
			}
		}
	}
</style>
