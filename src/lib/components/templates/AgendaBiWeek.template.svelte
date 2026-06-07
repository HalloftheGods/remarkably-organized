<script lang="ts">
	import { getFirstDayOfWeek, type Timeframe, type CalendarEvent } from '$lib';
	import { Box, Text } from '$atoms';
	import { SectionHeader, Field } from '$molecules';

	let {
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		startWeekOnSunday = false,
		settings = undefined as any,
	} = $props();

	const week1Start = $derived(
		new Date(getFirstDayOfWeek(timeframe.start, startWeekOnSunday)),
	);
	const week2Start = $derived(new Date(week1Start.getTime() + 7 * 86400000));
</script>

<Box class="flex flex-col w-full h-full p-6 box-border gap-6">
	<Box class="flex gap-8">
		<Field
			class="flex-[2]"
			label="{!settings?.emojis?.disable ? '🏃 ' : ''}BI-WEEKLY PLANNER / SPRINT LOG"
			labelWeight="bold" />
		<Field class="flex-1" label="SPRINT CYCLE DATES" labelWeight="bold" />
	</Box>

	<Box class="flex gap-6 flex-1">
		<!-- Week 1 -->
		<Box
			class="flex-1 flex flex-col border border-[var(--outline)] rounded overflow-hidden">
			<SectionHeader title="WEEK 1" center />
			<Box class="flex flex-col flex-1">
				{#each new Array(7) as _, i (i)}
					{@const date = new Date(week1Start.getTime() + i * 86400000)}
					{@const dayEvents = events.filter((e) => {
						if (!timeframe.start) return false;
						const dayStart = date.getTime();
						const dayEnd = dayStart + 86400000;
						const eventStart = e.start * 1000;
						const eventEnd = eventStart + (e.duration || 86400) * 1000;
						return eventStart < dayEnd && eventEnd > dayStart;
					})}
					<Box
						class="flex-1 flex border-b border-[var(--outline)] min-h-0 {i === 6
							? 'border-b-0'
							: ''}">
						<a
							href="#{date.getUTCFullYear()}-{date.getUTCMonth() + 1}-{date.getUTCDate()}"
							class="w-[2.5rem] border-r border-[var(--outline)] flex flex-col items-center justify-center bg-[var(--nav-bg-pdf)] p-1 no-underline text-inherit transition-colors duration-200 ease-in hover:bg-[var(--outline-low)]">
							<Text class="text-[0.6rem] text-[var(--text-low)]" weight="bold">
								{date.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}
							</Text>
							<Text class="text-[0.8rem] text-[var(--text)]" weight="bold">
								{date.getUTCDate()}
							</Text>
						</a>
						<Box class="flex-1 p-2 flex flex-col gap-1 overflow-hidden">
							{#each dayEvents as event}
								<Text
									class="text-[0.65rem] bg-[var(--outline-low)] border-l-2 border-[var(--outline)] py-[0.1rem] px-[0.25rem] text-[var(--text)] whitespace-nowrap overflow-hidden text-ellipsis">
									{event.name}
								</Text>
							{/each}
						</Box>
					</Box>
				{/each}
			</Box>
		</Box>

		<!-- Week 2 -->
		<Box
			class="flex-1 flex flex-col border border-[var(--outline)] rounded overflow-hidden">
			<SectionHeader title="WEEK 2" center />
			<Box class="flex flex-col flex-1">
				{#each new Array(7) as _, i (i)}
					{@const date = new Date(week2Start.getTime() + i * 86400000)}
					{@const dayEvents = events.filter((e) => {
						if (!timeframe.start) return false;
						const dayStart = date.getTime();
						const dayEnd = dayStart + 86400000;
						const eventStart = e.start * 1000;
						const eventEnd = eventStart + (e.duration || 86400) * 1000;
						return eventStart < dayEnd && eventEnd > dayStart;
					})}
					<Box
						class="flex-1 flex border-b border-[var(--outline)] min-h-0 {i === 6
							? 'border-b-0'
							: ''}">
						<a
							href="#{date.getUTCFullYear()}-{date.getUTCMonth() + 1}-{date.getUTCDate()}"
							class="w-[2.5rem] border-r border-[var(--outline)] flex flex-col items-center justify-center bg-[var(--nav-bg-pdf)] p-1 no-underline text-inherit transition-colors duration-200 ease-in hover:bg-[var(--outline-low)]">
							<Text class="text-[0.6rem] text-[var(--text-low)]" weight="bold">
								{date.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}
							</Text>
							<Text class="text-[0.8rem] text-[var(--text)]" weight="bold">
								{date.getUTCDate()}
							</Text>
						</a>
						<Box class="flex-1 p-2 flex flex-col gap-1 overflow-hidden">
							{#each dayEvents as event}
								<Text
									class="text-[0.65rem] bg-[var(--outline-low)] border-l-2 border-[var(--outline)] py-[0.1rem] px-[0.25rem] text-[var(--text)] whitespace-nowrap overflow-hidden text-ellipsis">
									{event.name}
								</Text>
							{/each}
						</Box>
					</Box>
				{/each}
			</Box>
		</Box>
	</Box>
</Box>
