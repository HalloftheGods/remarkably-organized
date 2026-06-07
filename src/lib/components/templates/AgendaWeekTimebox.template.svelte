<script lang="ts">
	import { getFirstDayOfWeek, type Timeframe, type CalendarEvent } from '$lib';
	import { Box, Text } from '$atoms';
	import { Field } from '$molecules';

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

	// Hourly rows based on custom settings
	const hours = $derived(
		Array.from({ length: Math.max(0, endTime - startTime) }, (_, i) => startTime + i),
	);

	const formatHour = (hour: number) => {
		if (use24HourClock) {
			return `${hour.toString().padStart(2, '0')}:00`;
		}
		const normalizedHour = hour % 24;
		if (normalizedHour === 12) return '12 PM';
		if (normalizedHour === 0) return '12 AM';
		if (normalizedHour > 12) return `${normalizedHour - 12} PM`;
		return `${normalizedHour} AM`;
	};
</script>

<Box class="flex flex-col w-full h-full p-6 box-border gap-6">
	<Box class="flex gap-8">
		<Field
			class="flex-[3]"
			label="{!settings?.emojis?.disable ? '📅 ' : ''}WEEKLY TIME-BLOCKED AGENDA"
			labelWeight="bold" />
		<Field class="flex-1" label="WEEK OF" labelWeight="bold" />
	</Box>

	<Box class="grid grid-cols-[3.3rem_repeat(7,minmax(0,1fr))] border border-[var(--outline)] rounded flex-1 overflow-hidden" style="grid-template-rows: 2.5rem repeat({hours.length || 15}, 1fr);">
		<!-- Top header row -->
		<Box class="bg-[var(--nav-bg-pdf)] border-b-2 border-r border-[var(--outline)]"></Box>
		{#each new Array(7) as _, i (i)}
			{@const date = new Date(weekStart.getTime() + i * 86400000)}
			<a
				href="#{date.getUTCFullYear()}-{date.getUTCMonth() + 1}-{date.getUTCDate()}"
				class="bg-[var(--nav-bg-pdf)] border-b-2 border-r border-[var(--outline)] flex flex-col items-center justify-center p-1 no-underline text-inherit transition-colors duration-200 ease-in hover:bg-[var(--outline-low)] {i === 6 ? 'border-r-0' : ''}">
				<Text class="text-[0.6rem] text-[var(--text-low)]" weight="bold">
					{date
						.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })
						.toUpperCase()}
				</Text>
				<Text class="text-[0.8rem] text-[var(--text)]" weight="bold">{date.getUTCDate()}</Text>
			</a>
		{/each}

		<!-- Grid rows -->
		{#each hours as hour}
			<Box class="text-[0.6rem] text-[var(--text-low)] flex items-center justify-center border-b border-r border-[var(--outline)] bg-[var(--nav-bg-pdf)]">
				<Text weight="bold">{formatHour(hour)}</Text>
			</Box>
			{#each new Array(7) as _, i (i)}
				{@const date = new Date(weekStart.getTime() + i * 86400000)}
				{@const dayEvents = events.filter((e) => {
					if (!timeframe.start) return false;
					const dayStart = date.getTime();
					const dayEnd = dayStart + 86400000;
					const eventStart = e.start * 1000;
					const eventEnd = eventStart + (e.duration || 86400) * 1000;
					const isOnDay = eventStart < dayEnd && eventEnd > dayStart;
					if (!isOnDay) return false;
					if (e.duration && e.duration < 86400) {
						// Filter to correct hour block
						const eventDate = new Date(eventStart);
						const eventHour = eventDate.getUTCHours();
						return eventHour === hour;
					}
					return false;
				})}
				<Box class="border-b border-r border-[var(--outline)] relative p-[0.1rem] {i === 6 ? 'border-r-0' : ''}">
					{#each dayEvents as event}
						<Text class="text-[0.55rem] bg-[var(--outline-low)] border-l-2 border-[var(--outline)] py-[0.05rem] px-[0.2rem] text-[var(--text)] whitespace-nowrap overflow-hidden text-ellipsis block">{event.name}</Text>
					{/each}
				</Box>
			{/each}
		{/each}
	</Box>
</Box>

