<script lang="ts">
	import {
		getFirstDayOfWeek,
		type Timeframe,
		type CalendarEvent,
		getDateHash,
	} from '$lib';

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

<div class="planner page">
	<div class="flex-1 flex flex-col gap-2">
		{#each new Array(7) as _, i (i)}
			{@const date = new Date(weekStart.getTime() + i * 86400000)}
			{@const dayEvents = settings?.eventsByDay?.[date.getTime()] || []}
			<div class="flex-1 border border-[var(--outline)] rounded flex flexp-2 min-h-0">
				<a
					href={getDateHash(date)}
					class="flex justify-between items-center border-b border-[var(--outline-low)] pb-1 mb-1 no-underline text-inherit transition-colors duration-200 ease-in hover:[&_.day-name]:text-[var(--text-high)]">
					<span
						class="day-name text-[0.7rem] text-[var(--text)] tracking-[0.5px]"
						weight="bold">
						{date
							.toLocaleString('default', { weekday: 'long', timeZone: 'UTC' })
							.toUpperCase()}
					</span>
					<span class="text-[0.65rem] text-[var(--text-sidebar,var(--text-low))]">
						{date.toLocaleString('default', { month: 'short', timeZone: 'UTC' })}
						{date.getUTCDate()}
					</span>
				</a>
				<div class="flex-1 overflow-hidden flex flex-col gap-[0.2rem]">
					{#each dayEvents as event}
						<span
							class="text-[0.65rem] text-[var(--text)] whitespace-nowrap overflow-hidden text-ellipsis">
							• {event.name}
						</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<div class="w-[1px] bg-[var(--outline)] self-stretch"></div>

	<div class="flex-1 flex flex-col border border-[var(--outline)] rounded p-4">
		<div class="section-header"><strong>NOTES & LOGS</strong></div>
		<div class="flex-1 flex flex-col gap-[0.8rem] overflow-hidden">
			{#each Array(32) as _}
				<div class="border-b border-dashed border-[var(--outline-low)] h-[0.8rem]"></div>
			{/each}
		</div>
	</div>
</div>
