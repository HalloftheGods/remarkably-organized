<script lang="ts">
	import {
		formatToString,
		getFirstDayOfWeek,
		getDateHash,
		type Timeframe,
		type CalendarEvent,
		getDailyEvents,
		getNotesWeekDays,
		getNotesWeekGridStyle,
	} from '$lib';
	import { Grid } from '$molecules';

	let {
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		startWeekOnSunday = false,
		alignDayText = 'left' as 'left' | 'center' | 'right',
		display = 'grid' as 'grid' | 'columns' | 'rows',
		settings = undefined as any,
	} = $props();

	const weekStart = $derived(
		timeframe.weekStart || new Date(getFirstDayOfWeek(new Date(), startWeekOnSunday)),
	);
	const isSidebarLeft = $derived(settings?.sideNav?.leftSide ?? false);
	const isColumnsView = $derived(display === 'columns');
	const isGridView = $derived(display === 'grid');
	const isRowsView = $derived(display === 'rows');
	const hasWeekStart = $derived(!!timeframe.weekStart);

	const weekDays = $derived(getNotesWeekDays(weekStart, settings, events));
	const dotsTop = $derived(isColumnsView ? '3.25rem' : '0px');
	const gridStyle = $derived(getNotesWeekGridStyle(display));

	const wrapperStyle = $derived(
		`--sidebar-padding-left: ${isSidebarLeft ? '2rem' : '0'}; ` +
		`--sidebar-padding-right: ${isSidebarLeft ? '0' : '2rem'}; ` +
		`padding-left: var(--sidebar-padding-left); ` +
		`padding-right: var(--sidebar-padding-right); ` +
		`--dots-top: ${dotsTop};`
	);
</script>

<div
	class="planner page padded notes-week-wrapper [&_.dots]:top-[var(--dots-top)] [&_.dots]:h-[calc(100%-var(--dots-top))]"
	style={wrapperStyle}>
	<Grid display="dotted-small" />
	<div class="notes-week-grid {display} align-{alignDayText}" style={gridStyle}>
		{#each weekDays as { date, data }, i (i)}
			{@const isDisabled = data.isDisabled}
			{@const disabledClass = isDisabled ? 'opacity-35 pointer-events-none' : ''}
			{@const colClass = isColumnsView ? 'border-t-0 flex-grow' : ''}
			{@const gridTopBorderClass = isGridView && (i === 0 || i === 1) ? 'border-t-0' : ''}
			{@const gridLeftBorderClass = isGridView && i % 2 === 1 ? 'border-l border-[var(--outline)]' : ''}
			{@const alignClass = alignDayText === 'center' ? 'text-center' : alignDayText === 'right' ? 'text-right' : ''}
			{@const headerColClass = isColumnsView ? 'block border-b border-[var(--outline)] pb-2 h-[3.25rem] box-border' : ''}
			{@const headerBgClass = isColumnsView && i % 2 === 1 ? 'bg-[var(--outline-low)]' : ''}
			{@const moonAlignClass = alignDayText === 'center' ? '!float-none inline-block ml-1' : alignDayText === 'right' ? '!float-left' : ''}
			{@const hasEvents = data.rawEvents.length > 0}
			{@const weekDayShort = date.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}
			{@const weekDayLong = date.toLocaleString('default', { weekday: 'long', timeZone: 'UTC' })}
			{@const monthLong = date.toLocaleString('default', { month: 'long', timeZone: 'UTC' })}
			{@const ordinalDay = formatToString(date.getUTCDate(), { type: 'ordinal', html: true })}

			<svelte:element
				this={hasWeekStart ? 'a' : 'div'}
				href={hasWeekStart ? getDateHash(date) : undefined}
				class="notes-week-day {disabledClass} {colClass} {gridTopBorderClass} {gridLeftBorderClass} {alignClass}">
				
				<div class="notes-week-day-header {headerColClass} {headerBgClass}">
					{#if data.moonEmoji}
						<span class="moon float-right text-[1.1em] align-text-top leading-none {moonAlignClass}">
							{data.moonEmoji}
						</span>
					{/if}
					{#if isColumnsView}
						<span>
							{weekDayShort}
							{@html ordinalDay}
						</span>
					{:else}
						<span>
							{weekDayLong}, {monthLong}
							{@html ordinalDay}
						</span>
					{/if}
				</div>

				{#if hasEvents}
					<div class="notes-week-events">
						{#each data.rawEvents as event}
							{@const isTimed = event.duration && event.duration < 86400}
							{@const eventTime = isTimed ? new Date(event.start * 1000) : null}
							{@const timeString = eventTime?.toLocaleTimeString('default', {
								hour: 'numeric',
								minute: '2-digit',
								hour12: true,
								timeZone: 'UTC',
							}).replace(':00', '')}
							
							<div class="notes-week-event-item" title={event.name}>
								{#if isTimed}
									<span class="event-time text-[0.85em] text-[var(--text-low)] font-medium shrink-0">
										{timeString}
									</span>
								{/if}
								<span class="event-name overflow-hidden text-ellipsis">{event.name}</span>
							</div>
						{/each}
					</div>
				{/if}
			</svelte:element>
		{/each}
		
		<div class="notes-week-day {isColumnsView || isRowsView ? 'hidden' : ''}">
			<span class="p-2">Notes</span>
		</div>
	</div>
</div>
