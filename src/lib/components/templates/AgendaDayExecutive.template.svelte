<script lang="ts">
	import type { CalendarEvent, PlannerSettings, Timeframe } from '$lib';

	import { Grid } from '$molecules';
	import { AgendaDay } from '$templates';

	let {
		settings = {} as any /* PlannerSettings */,
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		use24HourClock = false,
		startTime = 0,
		endTime = 24,
		interval = 60,
	} = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	const isTimelineOnLeft = $derived(settings?.sideNav?.leftSide !== false);
	const isLandscape = $derived(settings?.design?.orientation === 'landscape');
</script>

<div class="planner page pt-2 pl-2 pr-0 pb-0 {isTimelineOnLeft ? 'flex-row' : 'flex-row-reverse'}">
	<div class="h-full flex-1 border-[var(--outline)] [&>.day]:!pt-4 [&>.day]:!px-0 [&>.day]:!pb-0 {isTimelineOnLeft ? 'border-r pr-3' : 'border-l pl-3'}">
		<AgendaDay
			{settings}
			{timeframe}
			{events}
			{use24HourClock}
			{startTime}
			{endTime}
			{interval} />
	</div>
	<div class="planner-col-spaced pt-4 {isLandscape ? 'flex-row' : 'flex-col'}">
		<div class="flex-col-none mb-2 {isLandscape ? 'flex-1' : ''}">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">🎯</span>{/if}
				<strong>Top Priorities</strong>
			</div>
			<div class="flex-col-1 gap-2 pt-1">
				{#each [1, 2, 3] as num}
					<div class="numbered-line">
						<span class="numbered-line-num font-bold !text-[0.9em]">{num}.</span>
					</div>
				{/each}
			</div>
		</div>
		
		<div class="flex flex-col flex-1 min-h-0 {isLandscape ? 'flex-[1.5]' : ''} [&_.lined]:!pb-[10px]">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">✅</span>{/if}
				<strong>Action Items</strong>
			</div>
			<div class="grid-container">
				<Grid display="todo" columns={1} lines={14} />
			</div>
		</div>
		
		<div class="flex flex-col flex-[0.7] min-h-0 {isLandscape ? 'flex-1' : ''}">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">📝</span>{/if}
				<strong>Notes</strong>
			</div>
			<div class="grid-container">
				<Grid display="dotted" />
			</div>
		</div>
	</div>
</div>
