<script lang="ts">
	import {
		type CalendarEvent,
		type Timeframe,
		getWeek,
		isMoonEvent,
		getMoonEmoji,
		getDateHash,
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

	const isDateDisabled = (dateMs: number) => {
		if (!settings) return false;
		if (settings.dayPage?.disable) return true;
		const start = settings.date?.start?.getTime() || 0;
		const end = settings.date?.end?.getTime() || Infinity;
		return dateMs < start || dateMs > end;
	};

	const getDayEvents = (dateMs: number) => {
		const dayEvents: CalendarEvent[] = settings?.eventsByDay?.[dateMs] || [];
		const filteredEvents = dayEvents.filter((e) => !isMoonEvent(e));

		return {
			allDay: filteredEvents.filter((e) => !e.duration || e.duration >= 86400),
			timed: filteredEvents.filter((e) => e.duration && e.duration < 86400),
		};
	};
</script>

{#if timeframe?.month}
	{@const numDaysBeforeStart =
		(timeframe.start.getUTCDay() + 7 - (startWeekOnSunday ? 0 : 1)) % 7}
	<div
		class="planner page grid grid-rows-[min-content] auto-rows-[1fr] grid-flow-dense w-full justify-items-stretch items-stretch gap-0 {showWeekLinks
			? isWeeksOnLeft
				? 'grid-cols-[3rem_repeat(7,1fr)]'
				: 'grid-cols-[repeat(7,1fr)_3rem]'
			: 'grid-cols-7'} {showNotes ? 'h-[50%] px-0 pb-0' : 'h-full px-0 pb-4'}">
		{#if showWeekLinks}
			<div class={isWeeksOnLeft ? 'col-start-1' : 'col-start-8'}></div>
		{/if}
		{#each new Array(7) as _, i}
			{@const date = new Date(Date.UTC(1970, 0, 4 + i + (startWeekOnSunday ? 0 : 1)))}
			<div
				class="{isWeeksOnLeft
					? 'col-start-' + (i + 2)
					: ''} flex items-end justify-center text-[0.8em] font-medium text-[var(--text)] pt-1 pb-2 tracking-[1px] font-display">
				<span>
					{date.toLocaleString('default', { weekday: 'long', timeZone: 'UTC' })}
				</span>
			</div>
		{/each}
		{#if showWeekLinks}
			{@const numWeeks =
				Math.floor(
					(timeframe.end.getTime() - timeframe.weekStart.getTime()) / 604800000,
				) + 1}
			{#each new Array(numWeeks) as _, i (i)}
				{@const date = new Date(timeframe.weekStart.getTime() + i * 604800000)}
				{@const week = getWeek(date, startWeekOnSunday)}
				<a
					href="#{week.id}"
					class="{isWeeksOnLeft
						? 'col-start-1'
						: 'col-start-8'} [writing-mode:vertical-lr] [text-orientation:mixed] rotate-180 flex items-center justify-center text-[0.8em] text-[var(--text)] opacity-75 {isWeeksOnLeft
						? 'border-l border-r-0'
						: 'border-r border-l-0'} border-[var(--outline-high)] font-display {i ===
					numWeeks - 1
						? 'border-t-0 mb-0'
						: 'border-t border-[var(--outline)] -mb-[1px]'} {i % 2 === 1
						? 'bg-black/[0.015]'
						: ''}">
					{#if !useWeekSinceYear && week.year && week.month && week.month !== timeframe.month}
						{new Date(Date.UTC(week.year, week.month)).toLocaleString('default', {
							month: 'short',
						})}
					{/if}
					Week {useWeekSinceYear ? week.weekSinceYear : week.weekSinceMonth}
				</a>
			{/each}
		{/if}
		{#each new Array(numDaysBeforeStart) as _, i (i)}
			{@const date = new Date(
				timeframe.start.getTime() + (i - numDaysBeforeStart) * 86400000,
			)}
			{@const dayIndex = i}
			{@const moonEvent = events.find(
				(e) => !e.duration && e.start * 1000 === date.getTime() && isMoonEvent(e),
			)}
			{@const dayEvents = getDayEvents(date.getTime())}
			<CalendarCell
				class="text-[var(--text-low)] opacity-50 {dayIndex % 7 === 0
					? '!border-l-0'
					: ''}"
				dim={isDateDisabled(date.getTime())}
				altRow={Math.floor(dayIndex / 7) % 2 === 1}
				href={getDateHash(date)}
				date={date.getUTCDate()}
				moonEmoji={moonEvent ? (getMoonEmoji(moonEvent.name) ?? '') : ''}>
				{#each dayEvents.allDay as event}
					<div class="text-calendar-event">
						<span>{event.name}</span>
					</div>
				{/each}
				{#if dayEvents.timed.length > 0}
					<div class="container-calendar-events">
						{#if dayEvents.timed.length > 3}
							<Dot title="{dayEvents.timed.length} events" />
							<span class="text-[0.6em] leading-none opacity-60">
								({dayEvents.timed.length})
							</span>
						{:else}
							{#each dayEvents.timed as event}
								<Dot title={event.name} />
							{/each}
						{/if}
					</div>
				{/if}
			</CalendarCell>
		{/each}
		{#each new Array(timeframe.end.getUTCDate()) as _, day (day)}
			{@const dateMs = timeframe.start.getTime() + day * 86400000}
			{@const dayIndex = numDaysBeforeStart + day}
			{@const moonEvent = events.find(
				(e) => !e.duration && e.start * 1000 === dateMs && isMoonEvent(e),
			)}
			{@const dayEvents = getDayEvents(dateMs)}
			<CalendarCell
				class={dayIndex % 7 === 0 ? '!border-l-0' : ''}
				href={getDateHash(new Date(dateMs))}
				dim={isDateDisabled(dateMs)}
				altRow={Math.floor(dayIndex / 7) % 2 === 1}
				borderTop={day >
					(6 - timeframe.start.getUTCDay() + 7 + (startWeekOnSunday ? 0 : 1)) % 7}
				date={day + 1}
				moonEmoji={moonEvent ? (getMoonEmoji(moonEvent.name) ?? '') : ''}>
				{#each dayEvents.allDay as event}
					<div class="text-calendar-event">
						<span>{event.name}</span>
					</div>
				{/each}
				{#if dayEvents.timed.length > 0}
					<div class="container-calendar-events">
						{#if dayEvents.timed.length > 3}
							<Dot title="{dayEvents.timed.length} events" />
							<span class="text-[0.6em] leading-none opacity-60">
								({dayEvents.timed.length})
							</span>
						{:else}
							{#each dayEvents.timed as event}
								<Dot title={event.name} />
							{/each}
						{/if}
					</div>
				{/if}
			</CalendarCell>
		{/each}
		{#each new Array((6 - timeframe.end.getUTCDay() + 7 + (startWeekOnSunday ? 0 : 1)) % 7) as _, i (i)}
			{@const date = new Date(timeframe.end.getTime() + (i + 1) * 86400000)}
			{@const dayIndex = numDaysBeforeStart + timeframe.end.getUTCDate() + i}
			{@const moonEvent = events.find(
				(e) => !e.duration && e.start * 1000 === date.getTime() && isMoonEvent(e),
			)}
			{@const dayEvents = getDayEvents(date.getTime())}
			<CalendarCell
				class="border-top text-[var(--text-low)] opacity-50 {dayIndex % 7 === 0
					? '!border-l-0'
					: ''}"
				dim={isDateDisabled(date.getTime())}
				altRow={Math.floor(dayIndex / 7) % 2 === 1}
				href={getDateHash(date)}
				date={date.getUTCDate()}
				moonEmoji={moonEvent ? (getMoonEmoji(moonEvent.name) ?? '') : ''}>
				{#each dayEvents.allDay as event}
					<div class="text-calendar-event">
						<span>{event.name}</span>
					</div>
				{/each}
				{#if dayEvents.timed.length > 0}
					<div class="container-calendar-events">
						{#if dayEvents.timed.length > 3}
							<Dot title="{dayEvents.timed.length} events" />
							<span class="text-[0.6em] leading-none opacity-60">
								({dayEvents.timed.length})
							</span>
						{:else}
							{#each dayEvents.timed as event}
								<Dot title={event.name} />
							{/each}
						{/if}
					</div>
				{/if}
			</CalendarCell>
		{/each}
	</div>
	{#if showNotes}
		<div class="text-center border-t border-[var(--outline)] w-full h-[50%] p-0">
			<h3 class="text-[0.9em] font-light my-[0.55rem]">Notes</h3>
			<Grid display="dotted" />
		</div>
	{/if}
{/if}
