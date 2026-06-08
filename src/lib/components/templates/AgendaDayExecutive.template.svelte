<script lang="ts">
	import type { CalendarEvent, PlannerSettings, Timeframe } from '$lib';
	
	import { Grid } from '$molecules';
	import { AgendaDay } from '$templates';

	let {
		settings = {} as PlannerSettings,
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		use24HourClock = false,
		startTime = 0,
		endTime = 24,
		interval = 60,
	} = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	const isTimelineOnLeft = $derived(settings?.sideNav?.leftSide !== false);
</script>

<div class="planner page flex w-full h-full gap-3 pt-2 px-4 pb-4 {isTimelineOnLeft
		? 'flex-row'
		: 'flex-row-reverse'}">
	<div class="h-full flex-1 border-[var(--outline)] [&">.day]:!pt-4 [&>.day]:!px-0 [&>.day]:!pb-0 {isTimelineOnLeft
			? 'border-r pr-3'
			: 'border-l pl-3'}">
		<AgendaDay
			{settings}
			{timeframe}
			{events}
			{use24HourClock}
			{startTime}
			{endTime}
			{interval} />
	</div>
	<div class="flex flex-col flex-1 h-full gap-6 pt-4">
		<div class="flex flex-col flex-none mb-2">
			<div class="section-header">{#if showEmoji}<span class="emoji">🎯</span>{/if}<strong>Top Priorities</strong></div>
			<div class="flex flex-col gap-2 pt-1">
				{#each [1, 2, 3] as num}
					<div class="flex items-end border-b border-[var(--outline)] h-8 pb-[0.2rem]">
						<span class="font-bold text-[0.9em] mr-2">{num}.</span>
					</div>
				{/each}
			</div>
		</div>
		<div class="flex flex-col flex-1 min-h-0 [&_.lined]:!pb-[10px]">
			<div class="section-header">{#if showEmoji}<span class="emoji">✅</span>{/if}<strong>Action Items</strong></div>
			<div class="flex-1 min-h-0 flex flex-col relative overflow-hidden">
				<Grid display="todo" columns={1} lines={14} />
			</div>
		</div>
		<div class="flex flex-col flex-[0.7] min-h-0">
			<div class="section-header">{#if showEmoji}<span class="emoji">📝</span>{/if}<strong>Notes</strong></div>
			<div class="flex-1 min-h-0 flex flex-col relative overflow-hidden">
				<Grid display="dotted" />
			</div>
		</div>
	</div>
</div>

