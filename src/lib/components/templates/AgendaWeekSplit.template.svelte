<script lang="ts">
	import {
		getFirstDayOfWeek,
		type Timeframe,
		type CalendarEvent,
		getDateHash,
	} from '$lib';
	import { Emoji } from '$atoms';

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

<div class="planner page padded agenda-week-split">
	<div class="flex-1 flex flex-col gap-2">
		{#each new Array(7) as _, i (i)}
			{@const date = new Date(weekStart.getTime() + i * 86400000)}
			{@const dayEvents = settings?.eventsByDay?.[date.getTime()] || []}
			<div class="agenda-split-day">
				<a href={getDateHash(date)} class="agenda-split-day-header">
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
				<div class="agenda-split-event-list">
					{#each dayEvents as event}
						<span class="agenda-split-event">
							• {event.name}
						</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<div class="w-[1px] bg-[var(--outline)] self-stretch"></div>

	<div class="agenda-split-notes">
		<div class="section-header">
			<Emoji size="s">📝</Emoji>
			<strong>NOTES & LOGS</strong>
		</div>
		<div class="agenda-split-notes-lines">
			{#each Array(32) as _}
				<div class="agenda-split-notes-line"></div>
			{/each}
		</div>
	</div>
</div>
