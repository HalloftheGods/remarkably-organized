<script lang="ts">
	import {
		getFirstDayOfWeek,
		type Timeframe,
		type CalendarEvent,
		getDateHash,
	} from '$lib';

	let {
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		startWeekOnSunday = false,
		settings = undefined as any,
		startTime = 7,
		endTime = 21,
		use24HourClock = false,
	} = $props();

	const weekStart = $derived(
		new Date(getFirstDayOfWeek(timeframe.start, startWeekOnSunday)),
	);

	// Hourly rows based on custom settings
	const hours = $derived(
		Array.from({ length: Math.max(0, endTime - startTime) }, (_, i) => startTime + i),
	);

	const formatHour = (hour: number) => {
		if (use24HourClock) {
			return `${hour.toString().padStart(2, '0')}:00`;
		}
		const normalizedHour = hour % 24;
		if (normalizedHour === 12) return '12 PM';
		if (normalizedHour === 0) return '12 AM';
		if (normalizedHour > 12) return `${normalizedHour - 12} PM`;
		return `${normalizedHour} AM`;
	};
	const isTimelineOnLeft = $derived(settings?.sideNav?.leftSide !== false);
</script>

<div class="planner page flex flex-col w-full h-full py-6 px-0 box-border gap-6">
	<div class="flex gap-8 px-6">
		<div class="field flex-1" labelWeight="bold">
		<label>
			<strong>{!settings?.emojis?.disable ? '📅 ' : ''}WEEKLY TIME-BLOCKED AGENDA</strong>
		</label>
		<div class="content "></div>
	</div>
	</div>

	<div class="grid {isTimelineOnLeft
			? 'grid-cols-[3.3rem_repeat(7,minmax(0,1fr))]'
			: 'grid-cols-[repeat(7,minmax(0,1fr))_3.3rem]'} border-y border-[var(--outline)] flex-1 overflow-hidden" style="grid-template-rows: 2.5rem repeat({hours.length || 15}, 1fr);">
		<!-- Top header row -->
		{#if isTimelineOnLeft}
			<div class="bg-[var(--nav-bg-pdf)] border-b-2 border-r border-[var(--outline)]"></div>
		{/if}
		{#each new Array(7) as _, i (i)}
			{@const date = new Date(weekStart.getTime() + i * 86400000)}
			<a
				href={getDateHash(date)}
				class="bg-[var(--nav-bg-pdf)] border-b-2 border-[var(--outline)] flex flex-col items-center justify-center p-1 no-underline text-inherit transition-colors duration-200 ease-in hover:bg-[var(--outline-low)] {i ===
					6 && isTimelineOnLeft
					? 'border-r-0'
					: 'border-r'}">
				<span class="text-[0.6rem] text-[var(--text-low)]" weight="bold">
					{date
						.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })
						.toUpperCase()}
				</span>
				<span class="text-[0.8rem] text-[var(--text)]" weight="bold">
					{date.getUTCDate()}
				</span>
			</a>
		{/each}
		{#if !isTimelineOnLeft}
			<div class="bg-[var(--nav-bg-pdf)] border-b-2 border-[var(--outline)]"></div>
		{/if}

		<!-- Grid rows -->
		{#each hours as hour}
			{#if isTimelineOnLeft}
				<div class="text-[0.6rem] text-[var(--text-low)] flex items-center justify-center border-b border-r border-[var(--outline)] bg-[var(--nav-bg-pdf)]">
					<span weight="bold">{formatHour(hour)}</span>
				</div>
			{/if}
			{#each new Array(7) as _, i (i)}
				{@const date = new Date(weekStart.getTime() + i * 86400000)}
				{@const allDayEvents = (settings?.eventsByDay?.[date.getTime()] ||
					[]) as CalendarEvent[]}
				{@const dayEvents = allDayEvents.filter((e) => {
					if (e.duration && e.duration < 86400) {
						// Filter to correct hour block
						const eventDate = new Date(e.start * 1000);
						const eventHour = eventDate.getUTCHours();
						return eventHour === hour;
					}
					return false;
				})}
				<div class="border-b border-[var(--outline)] relative p-[0.1rem] {i === 6 &&
					isTimelineOnLeft
						? 'border-r-0'
						: 'border-r'}">
					{#each dayEvents as event}
						<span class="text-[0.55rem] bg-[var(--outline-low)] border-l-2 border-[var(--outline)] py-[0.05rem] px-[0.2rem] text-[var(--text)] whitespace-nowrap overflow-hidden text-ellipsis block">
							{event.name}
						</span>
					{/each}
				</div>
			{/each}
			{#if !isTimelineOnLeft}
				<div class="text-[0.6rem] text-[var(--text-low)] flex items-center justify-center border-b border-[var(--outline)] bg-[var(--nav-bg-pdf)]">
					<span weight="bold">{formatHour(hour)}</span>
				</div>
			{/if}
		{/each}
	</div>
</div>

