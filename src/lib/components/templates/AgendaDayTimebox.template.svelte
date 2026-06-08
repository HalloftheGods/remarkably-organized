<script lang="ts">
	import type { CalendarEvent, PlannerSettings, Timeframe } from '$lib';
	import { Checkbox } from '$atoms';
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

<div class="planner page grid {isTimelineOnLeft
		? 'grid-cols-[0.8fr_1.2fr]'
		: 'grid-cols-[1.2fr_0.8fr]'} w-full h-full gap-3 pt-2 px-4 pb-4">
	<div class="flex flex-col h-full gap-8 pt-4 {isTimelineOnLeft
			? 'col-start-2'
			: 'col-start-1'}">
		<div class="flex flex-col flex-1 min-h-0">
			<div class="section-header">{#if showEmoji}<span class="emoji">🧠</span>{/if}<strong>Brain Dump</strong></div>
			<div class="flex-1 relative overflow-hidden flex flex-col">
				<Grid display="dotted" />
			</div>
		</div>
		<div class="flex flex-col flex-[1.2] min-h-0">
			<div class="section-header">{#if showEmoji}<span class="emoji">⏱️</span>{/if}<strong>Timebox Focus</strong></div>
			<div class="flex flex-col flex-1">
				<div class="flex justify-between text-[0.8em] text-[var(--text-low)] font-bold tracking-[1px] px-2 pb-1 border-b border-[var(--outline)]">
					<span>Task</span>
					<span class="text-right">25m Block Estimate</span>
				</div>
				{#each new Array(14) as _, i}
					<div class="flex items-center flex-1 border-b border-[var(--outline)] py-1 px-2">
						<div class="w-4 h-4 mr-3">
							<Checkbox />
						</div>
						<div class="flex-1 h-full"></div>
						<div class="flex gap-[0.4rem]">
							<div class="w-[1.2rem] h-[1.2rem] border border-[var(--outline)] bg-transparent rounded-sm"></div>
							<div class="w-[1.2rem] h-[1.2rem] border border-[var(--outline)] bg-transparent rounded-sm"></div>
							<div class="w-[1.2rem] h-[1.2rem] border border-[var(--outline)] bg-transparent rounded-sm"></div>
							<div class="w-[1.2rem] h-[1.2rem] border border-[var(--outline)] bg-transparent rounded-sm"></div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div class="h-full border-[var(--outline)] [&">.day]:!pt-4 [&>.day]:!px-0 [&>.day]:!pb-0 {isTimelineOnLeft
			? 'col-start-1 border-r pr-3'
			: 'col-start-2 border-l pl-3'}">
		<AgendaDay
			{settings}
			{timeframe}
			{events}
			{use24HourClock}
			{startTime}
			{endTime}
			{interval} />
	</div>
</div>

