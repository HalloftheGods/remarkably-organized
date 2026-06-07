<script lang="ts">
	import type { CalendarEvent, PlannerSettings, Timeframe } from '$lib';
	import { Box, Text, Checkbox } from '$atoms';
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
</script>

<Box class="grid grid-cols-[1.2fr_0.8fr] w-full h-full gap-3 pt-2 px-4 pb-4">
	<Box class="flex flex-col h-full gap-8 pt-4">
		<Box class="flex flex-col flex-1 min-h-0">
			<SectionHeader label="Brain Dump" emoji="🧠" {showEmoji} />
			<Box class="flex-1 relative overflow-hidden flex flex-col">
				<Grid display="dotted" />
			</Box>
		</Box>
		<Box class="flex flex-col flex-[1.2] min-h-0">
			<SectionHeader label="Timebox Focus" emoji="⏱️" {showEmoji} />
			<Box class="flex flex-col flex-1">
				<Box
					class="flex justify-between text-[0.8em] text-[var(--text-low)] font-bold tracking-[1px] px-2 pb-1 border-b border-[var(--outline)]">
					<Text>Task</Text>
					<Text class="text-right">25m Block Estimate</Text>
				</Box>
				{#each new Array(14) as _, i}
					<Box
						class="flex items-center flex-1 border-b border-[var(--outline)] py-1 px-2">
						<Box class="w-4 h-4 mr-3">
							<Checkbox />
						</Box>
						<Box class="flex-1 h-full"></Box>
						<Box class="flex gap-[0.4rem]">
							<Box
								class="w-[1.2rem] h-[1.2rem] border border-[var(--outline)] bg-transparent rounded-sm"
							></Box>
							<Box
								class="w-[1.2rem] h-[1.2rem] border border-[var(--outline)] bg-transparent rounded-sm"
							></Box>
							<Box
								class="w-[1.2rem] h-[1.2rem] border border-[var(--outline)] bg-transparent rounded-sm"
							></Box>
							<Box
								class="w-[1.2rem] h-[1.2rem] border border-[var(--outline)] bg-transparent rounded-sm"
							></Box>
						</Box>
					</Box>
				{/each}
			</Box>
		</Box>
	</Box>
	<Box
		class="h-full border-l border-[var(--outline)] pl-3 [&>.day]:!pt-4 [&>.day]:!px-0 [&>.day]:!pb-0">
		<AgendaDay
			{settings}
			{timeframe}
			{events}
			{use24HourClock}
			{startTime}
			{endTime}
			{interval} />
	</Box>
</Box>
