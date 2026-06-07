<script lang="ts">
	import type { CalendarEvent, PlannerSettings, Timeframe } from '$lib';
	import { AgendaDay } from '$templates';
	import { Box, Text } from '$atoms';
	import { Grid, SectionHeader } from '$molecules';

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

<Box class="grid grid-cols-2 w-full h-full gap-3 pt-2 px-4 pb-4">
	<Box class="flex flex-col h-full border-r border-[var(--outline)] pr-3">
		<Box class="flex flex-col pt-2 pl-4 pb-3">
			<SectionHeader label="Morning Intention" emoji="☀️" {showEmoji} />
			<Text class="text-[0.75em] text-[var(--text-low)] italic mb-1 pl-1">
				Today I will focus on...
			</Text>
			<Box class="flex flex-col gap-3 pt-1">
				{#each new Array(3) as _}
					<Box class="border-b border-[var(--outline)] h-[1.4rem]"></Box>
				{/each}
			</Box>
		</Box>

		<Box class="flex flex-col pl-4 pb-3 border-b border-[var(--outline)]">
			<SectionHeader label="Grateful For . . ." emoji="🙏" {showEmoji} />
			<Box class="flex flex-col gap-2 pt-1">
				{#each new Array(3) as _, i}
					<Box
						class="flex items-end border-b border-[var(--outline)] h-[1.4rem] pb-[0.15rem]">
						<Text class="font-light text-[0.8em] text-[var(--text-low)] mr-2">
							{i + 1}.
						</Text>
					</Box>
				{/each}
			</Box>
		</Box>

		<Box class="flex-1 min-h-0 pt-2">
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

	<Box class="flex flex-col h-full gap-6 pt-2">
		<Box class="flex flex-col flex-1 min-h-0 [&_.lined]:!pb-[5px]">
			<SectionHeader label="Today's Tasks" emoji="✅" {showEmoji} />
			<Box class="flex-1 min-h-0 flex flex-col relative overflow-hidden">
				<Grid display="todo" columns={1} lines={15} />
			</Box>
		</Box>

		<Box class="flex flex-col flex-none border-t border-b border-[var(--outline)] py-3">
			<SectionHeader label="Wellness" emoji="💚" {showEmoji} />
			<Box class="flex flex-col gap-[0.6rem]">
				<Box class="flex items-center gap-3">
					<Text
						class="text-[0.75em] text-[var(--text-low)] font-bold uppercase tracking-[0.5px] w-14 shrink-0">
						Water
					</Text>
					<Box class="flex gap-[0.4rem]">
						{#each new Array(8) as _}
							<Box
								class="w-[0.9rem] h-[0.9rem] border border-[var(--outline)] rounded-full"
							></Box>
						{/each}
					</Box>
				</Box>
				<Box class="flex items-center gap-3">
					<Text
						class="text-[0.75em] text-[var(--text-low)] font-bold uppercase tracking-[0.5px] w-14 shrink-0">
						Move
					</Text>
					<Box class="flex gap-[0.4rem]">
						{#each new Array(4) as _}
							<Box
								class="w-[0.9rem] h-[0.9rem] border border-[var(--outline)] rounded-full"
							></Box>
						{/each}
					</Box>
				</Box>
				<Box class="flex items-center gap-3">
					<Text
						class="text-[0.75em] text-[var(--text-low)] font-bold uppercase tracking-[0.5px] w-14 shrink-0">
						Meals
					</Text>
					<Box class="flex gap-[0.4rem]">
						{#each ['Breakfast', 'Lunch', 'Dinner', 'Snack'] as meal}
							<Box>
								<Text
									tag="span"
									class="text-[0.75em] text-[var(--text-low)] font-bold tracking-[1px]">
									{meal}
								</Text>
							</Box>
						{/each}
					</Box>
				</Box>
				<Box class="flex items-center gap-3">
					<Text
						class="text-[0.75em] text-[var(--text-low)] font-bold uppercase tracking-[0.5px] w-14 shrink-0">
						Sleep
					</Text>
					<Box class="flex-none w-12 border-b border-[var(--outline)] h-4"></Box>
					<Text tag="span" class="text-[0.8em] text-[var(--text-low)]">Hours</Text>
				</Box>
				<Box class="flex items-center gap-3">
					<Text
						class="text-[0.75em] text-[var(--text-low)] font-bold uppercase tracking-[0.5px] w-14 shrink-0">
						Energy
					</Text>
					<Box class="flex items-end gap-1 h-[1.2rem]">
						{#each new Array(5) as _, i}
							<Box
								class="w-[0.9rem] border border-[var(--outline)] rounded-sm"
								style="height: {(i + 1) * 20}%"></Box>
						{/each}
					</Box>
				</Box>
				<Box class="flex items-center gap-3">
					<Text
						class="text-[0.75em] text-[var(--text-low)] font-bold uppercase tracking-[0.5px] w-14 shrink-0">
						Mood
					</Text>
					<Box class="flex gap-[0.4rem]">
						{#each ['😡', '😟', '😴', '😐', '🙂', '😊'] as emoji}
							<Box
								class="w-[1.6rem] h-[1.6rem] flex items-center justify-center text-[1.1em] grayscale-[0.3] opacity-80">
								{emoji}
							</Box>
						{/each}
					</Box>
				</Box>
			</Box>
		</Box>

		<Box class="flex flex-col flex-none">
			<SectionHeader label="Evening Reflection" emoji="🌙" {showEmoji} />
			<Box class="flex flex-col gap-[0.6rem]">
				<Box class="flex flex-col">
					<Text
						tag="span"
						class="text-[0.75em] text-[var(--text-low)] italic pl-[0.15rem]">
						Win of the day
					</Text>
					<Box class="border-b border-[var(--outline)] h-[1.4rem]"></Box>
				</Box>
				<Box class="flex flex-col">
					<Text
						tag="span"
						class="text-[0.75em] text-[var(--text-low)] italic pl-[0.15rem]">
						What I learned
					</Text>
					<Box class="border-b border-[var(--outline)] h-[1.4rem]"></Box>
				</Box>
				<Box class="flex flex-col">
					<Text
						tag="span"
						class="text-[0.75em] text-[var(--text-low)] italic pl-[0.15rem]">
						Tomorrow I will
					</Text>
					<Box class="border-b border-[var(--outline)] h-[1.4rem]"></Box>
				</Box>
			</Box>
		</Box>
	</Box>
</Box>
