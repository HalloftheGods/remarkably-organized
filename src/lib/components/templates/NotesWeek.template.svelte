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
	const hasWeekStart = $derived(!!timeframe.weekStart);

	const weekDays = $derived(getNotesWeekDays(weekStart, settings, events));
	const dotsTop = $derived(display === 'columns' ? '3.25rem' : '0px');
	const gridStyle = $derived(getNotesWeekGridStyle(display));
</script>

<div
	class="planner page padded notes-week-wrapper"
	style="--sidebar-padding-left: {isSidebarLeft
		? '2rem'
		: '0'}; --sidebar-padding-right: {isSidebarLeft
		? '0'
		: '2rem'}; padding-left: var(--sidebar-padding-left); padding-right: var(--sidebar-padding-right); --dots-top: {dotsTop}; [&_.dots]:top-[var(--dots-top)] [&_.dots]:h-[calc(100%-var(--dots-top))]">
	<Grid display="dotted-small" />
	<div class="notes-week-grid {display} align-{alignDayText}" style={gridStyle}>
		{#each weekDays as { date, data }, i (i)}
			<svelte:element
				this={hasWeekStart ? 'a' : 'div'}
				href={hasWeekStart ? getDateHash(date) : undefined}
				class="notes-week-day {data.isDisabled ? 'opacity-35 pointer-events-none' : ''} {display === 'columns' ? 'border-t-0 flex-grow' : ''} {display === 'grid' && (i === 0 || i === 1) ? 'border-t-0' : ''} {display === 'grid' && i % 2 === 1 ? 'border-l border-[var(--outline)]' : ''} {alignDayText === 'center' ? 'text-center' : ''} {alignDayText === 'right' ? 'text-right' : ''}">
				<div class="notes-week-day-header {display === 'columns' ? 'block border-b border-[var(--outline)] pb-2 h-[3.25rem] box-border' : ''} {display === 'columns' && i % 2 === 1 ? 'bg-[var(--outline-low)]' : ''}">
					{#if data.moonEmoji}
						<span
							class="moon float-right text-[1.1em] align-text-top leading-none {alignDayText ===
							'center'
								? '!float-none inline-block ml-1'
								: ''} {alignDayText === 'right' ? '!float-left' : ''}">
							{data.moonEmoji}
						</span>
					{/if}
					{#if isColumnsView}
						<span>
							{date.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}
							{@html formatToString(date.getUTCDate(), { type: 'ordinal', html: true })}
						</span>
					{:else}
						<span>
							{date.toLocaleString('default', { weekday: 'long', timeZone: 'UTC' })}, {date.toLocaleString(
								'default',
								{ month: 'long', timeZone: 'UTC' },
							)}
							{@html formatToString(date.getUTCDate(), { type: 'ordinal', html: true })}
						</span>
					{/if}
				</div>
				{#if data.rawEvents.length > 0}
					<div class="notes-week-events">
						{#each data.rawEvents as event}
							{@const isTimed = event.duration && event.duration < 86400}
							<div class="notes-week-event-item" title={event.name}>
								{#if isTimed}
									{@const eventTime = new Date(event.start * 1000)}
									<span
										class="event-time text-[0.85em] text-[var(--text-low)] font-medium shrink-0">
										{eventTime
											.toLocaleTimeString('default', {
												hour: 'numeric',
												minute: '2-digit',
												hour12: true,
												timeZone: 'UTC',
											})
											.replace(':00', '')}
									</span>
								{/if}
								<span class="event-name overflow-hidden text-ellipsis">{event.name}</span>
							</div>
						{/each}
					</div>
				{/if}
			</svelte:element>
		{/each}
		<div class="notes-week-day {display === 'columns' || display === 'rows' ? 'hidden' : ''}">
			<span class="p-2">Notes</span>
		</div>
	</div>
</div>
