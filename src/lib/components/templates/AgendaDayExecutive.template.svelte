<script lang="ts">
	import type { CalendarEvent, PlannerSettings, Timeframe } from '$lib';

	import { Emoji } from '$atoms';
	import { Grid } from '$molecules';
	import { AgendaDay } from '$templates';
	import RowInput from '$atoms/RowInput.svelte';

	let {
		settings = {} as PlannerSettings,
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		use24HourClock = false,
		startTime = 0,
		endTime = 24,
		interval = 60,
	} = $props();
	const isTimelineOnLeft = $derived(settings?.sideNav?.leftSide !== false);
</script>

<div
	class="planner page padded agenda-day-executive {isTimelineOnLeft
		? 'flex-row'
		: 'flex-row-reverse'}">
	<div
		class="h-full flex-1 min-h-0 min-w-0 border-[var(--outline)] [&>.day]:!pt-4 [&>.day]:!px-0 [&>.day]:!pb-0 {isTimelineOnLeft
			? 'border-r pr-3'
			: 'border-l pl-3'}">
		<AgendaDay
			{settings}
			{timeframe}
			{events}
			{use24HourClock}
			{startTime}
			{endTime}
			{interval}
			isStandalone={false} />
	</div>
	<div class="planner-col-spaced pt-4 {settings.isLandscape ? 'flex-row' : 'flex-col'}">
		<div class="flex-col-none mb-2 {settings.isLandscape ? 'flex-1' : ''}">
			<div class="section-header">
				<Emoji size="s">🎯</Emoji>
				<strong>Top Priorities</strong>
			</div>
			<div class="flex-col-1 gap-2 pt-1 [&_.lined]:!pb-0">
				<Grid display="numbered" columns={1} lines={3} />
			</div>
		</div>

		<div class="flex flex-col flex-1 min-h-0 {settings.isLandscape ? 'flex-[1.5]' : ''} ">
			<div class="section-header">
				<Emoji size="s">✅</Emoji>
				<strong>Action Items</strong>
			</div>
			<div class="grid-container">
				<Grid display="todo" columns={1} lines={14} />
			</div>
		</div>

		<div class="flex flex-col flex-[0.7] min-h-0 {settings.isLandscape ? 'flex-1' : ''}">
			<div class="section-header">
				<Emoji size="s">📝</Emoji>
				<strong>Notes</strong>
			</div>
			<div class="grid-container">
				<Grid display="dotted" />
			</div>
		</div>
	</div>
</div>
