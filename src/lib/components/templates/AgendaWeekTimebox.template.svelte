<script lang="ts">
	import {
		getFirstDayOfWeek,
		type Timeframe,
		type CalendarEvent,
		getDateHash,
		getAgendaWeekTimeboxHours,
		getAgendaWeekTimeboxDays,
		getAgendaWeekTimeboxGrid,
	} from '$lib';
	import Field from '$atoms/Field.atom.svelte';

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

	const isTimelineOnLeft = $derived(settings?.sideNav?.leftSide !== false);
	const showEmoji = $derived(!settings?.emojis?.disable);

	const hours = $derived(getAgendaWeekTimeboxHours(startTime, endTime));
	const weekDays = $derived(getAgendaWeekTimeboxDays(weekStart, settings));
	const hourGrid = $derived(getAgendaWeekTimeboxGrid(hours, weekDays, use24HourClock));
</script>

<div class="planner page padded">
	<div class="flex gap-8 px-6">
		<div class="field flex-1">
			<Field i="📅">WEEKLY TIME-BLOCKED AGENDA</Field>
		</div>
	</div>

	<div
		class="grid {isTimelineOnLeft
			? 'grid-cols-[3.3rem_repeat(7,minmax(0,1fr))]'
			: 'grid-cols-[repeat(7,minmax(0,1fr))_3.3rem]'} border-y border-[var(--outline)] flex-1 overflow-hidden"
		style="grid-template-rows: 2.5rem repeat({hours.length || 15}, 1fr);">
		<!-- Top header row -->
		{#if isTimelineOnLeft}
			<div class="bg-[var(--nav-bg-pdf)] border-b-2 border-r border-[var(--outline)]">
			</div>
		{/if}
		{#each weekDays as day, i (i)}
			<a
				href={getDateHash(day.date)}
				class="bg-[var(--nav-bg-pdf)] border-b-2 border-[var(--outline)] flex-col-1 items-center justify-center p-1 no-underline text-inherit transition-colors duration-200 ease-in hover:bg-[var(--outline-low)] {i ===
					6 && isTimelineOnLeft
					? 'border-r-0'
					: 'border-r'}">
				<span
					class="text-[0.6rem] text-[var(--text-sidebar,var(--text-low))]"
					weight="bold">
					{day.date
						.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })
						.toUpperCase()}
				</span>
				<span class="text-[0.8rem] text-[var(--text)]" weight="bold">
					{day.date.getUTCDate()}
				</span>
			</a>
		{/each}
		{#if !isTimelineOnLeft}
			<div class="bg-[var(--nav-bg-pdf)] border-b-2 border-[var(--outline)]"></div>
		{/if}

		<!-- Grid rows -->
		{#each hourGrid as row}
			{#if isTimelineOnLeft}
				<div
					class="text-[0.6rem] text-[var(--text-sidebar,var(--text-low))] flex items-center justify-center border-b border-r border-[var(--outline)] bg-[var(--nav-bg-pdf)]">
					<span weight="bold">{row.formattedHour}</span>
				</div>
			{/if}
			{#each row.days as day, i (i)}
				<div
					class="border-b border-[var(--outline)] relative p-[0.1rem] {i === 6 &&
					isTimelineOnLeft
						? 'border-r-0'
						: 'border-r'}">
					{#each day.events as event}
						<span
							class="text-[0.55rem] bg-[var(--outline-low)] border-l-2 border-[var(--outline)] py-[0.05rem] px-[0.2rem] text-[var(--text)] whitespace-nowrap overflow-hidden text-ellipsis block">
							{event.name}
						</span>
					{/each}
				</div>
			{/each}
			{#if !isTimelineOnLeft}
				<div
					class="text-[0.6rem] text-[var(--text-sidebar,var(--text-low))] flex items-center justify-center border-b border-[var(--outline)] bg-[var(--nav-bg-pdf)]">
					<span weight="bold">{row.formattedHour}</span>
				</div>
			{/if}
		{/each}
	</div>
</div>
