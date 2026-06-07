<script lang="ts">
	import type { CalendarEvent, PlannerSettings, Timeframe } from '$lib';
	import { Box, Text } from '$atoms';
	import { Grid, SectionHeader } from '$molecules';
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

<Box class="flex w-full h-full gap-3 pt-2 px-4 pb-4 {isTimelineOnLeft ? 'flex-row' : 'flex-row-reverse'}">
	<Box
		class="h-full flex-1 border-[var(--outline)] [&>.day]:!pt-4 [&>.day]:!px-0 [&>.day]:!pb-0 {isTimelineOnLeft
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
	</Box>
	<Box class="flex flex-col flex-1 h-full gap-6 pt-4">
		<Box class="flex flex-col flex-none mb-2">
			<SectionHeader label="Top Priorities" emoji="🎯" {showEmoji} />
			<Box class="flex flex-col gap-2 pt-1">
				{#each [1, 2, 3] as num}
					<Box class="flex items-end border-b border-[var(--outline)] h-8 pb-[0.2rem]">
						<Text class="font-bold text-[0.9em] mr-2">{num}.</Text>
					</Box>
				{/each}
			</Box>
		</Box>
		<Box class="flex flex-col flex-1 min-h-0 [&_.lined]:!pb-[10px]">
			<SectionHeader label="Action Items" emoji="✅" {showEmoji} />
			<Box class="flex-1 min-h-0 flex flex-col relative overflow-hidden">
				<Grid display="todo" columns={1} lines={14} />
			</Box>
		</Box>
		<Box class="flex flex-col flex-[0.7] min-h-0">
			<SectionHeader label="Notes" emoji="📝" {showEmoji} />
			<Box class="flex-1 min-h-0 flex flex-col relative overflow-hidden">
				<Grid display="dotted" />
			</Box>
		</Box>
	</Box>
</Box>
