<script lang="ts">
	import { getFirstDayOfWeek, type Timeframe, type CalendarEvent, getDateHash } from '$lib';
	import { Box, Text } from '$atoms';
	import { SectionHeader } from '$molecules';

	let {
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		startWeekOnSunday = false,
		settings = undefined as any,
	} = $props();

	const weekStart = $derived(
		new Date(getFirstDayOfWeek(timeframe.start, startWeekOnSunday)),
	);
</script>

<Box class="flex w-full h-full p-6 box-border gap-6">
	<Box class="flex-1 flex flex-col gap-2">
		{#each new Array(7) as _, i (i)}
			{@const date = new Date(weekStart.getTime() + i * 86400000)}
			{@const dayEvents = settings?.eventsByDay?.[date.getTime()] || []}
			<Box
				class="flex-1 border border-[var(--outline)] rounded flex flex-col p-2 min-h-0">
				<a
					href={getDateHash(date)}
					class="flex justify-between items-center border-b border-[var(--outline-low)] pb-1 mb-1 no-underline text-inherit transition-colors duration-200 ease-in hover:[&_.day-name]:text-[var(--text-high)]">
					<Text
						class="day-name text-[0.7rem] text-[var(--text)] tracking-[0.5px]"
						weight="bold">
						{date
							.toLocaleString('default', { weekday: 'long', timeZone: 'UTC' })
							.toUpperCase()}
					</Text>
					<Text class="text-[0.65rem] text-[var(--text-low)]">
						{date.toLocaleString('default', { month: 'short', timeZone: 'UTC' })}
						{date.getUTCDate()}
					</Text>
				</a>
				<Box class="flex-1 overflow-hidden flex flex-col gap-[0.2rem]">
					{#each dayEvents as event}
						<Text
							class="text-[0.65rem] text-[var(--text)] whitespace-nowrap overflow-hidden text-ellipsis">
							• {event.name}
						</Text>
					{/each}
				</Box>
			</Box>
		{/each}
	</Box>

	<Box class="w-[1px] bg-[var(--outline)] self-stretch"></Box>

	<Box class="flex-1 flex flex-col border border-[var(--outline)] rounded p-4">
		<SectionHeader title="NOTES & LOGS" />
		<Box class="flex-1 flex flex-col gap-[0.8rem] overflow-hidden">
			{#each Array(32) as _}
				<Box class="border-b border-dashed border-[var(--outline-low)] h-[0.8rem]"></Box>
			{/each}
		</Box>
	</Box>
</Box>
