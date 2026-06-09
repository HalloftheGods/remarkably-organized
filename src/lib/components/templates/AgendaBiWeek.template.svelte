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

	const week1Start = $derived(
		new Date(getFirstDayOfWeek(timeframe.start, startWeekOnSunday)),
	);
	const week2Start = $derived(new Date(week1Start.getTime() + 7 * 86400000));
</script>

<div class="planner page flex flex-col w-full h-full p-6 box-border gap-6">
	<div class="flex gap-8">
		<div class="field flex-[2]" labelWeight="bold">
			<label>
				<strong>
					{!settings?.emojis?.disable ? '🏃 ' : ''}BI-WEEKLY PLANNER / SPRINT LOG
				</strong>
			</label>
			<div class="content"></div>
		</div>
		<div class="field flex-1" labelWeight="bold">
			<label>
				<strong>SPRINT CYCLE DATES</strong>
			</label>
			<div class="content"></div>
		</div>
	</div>

	<div class="flex gap-6 flex-1">
		<!-- Week 1 -->
		<div
			class="flex-1 flex flex-col border border-[var(--outline)] rounded overflow-hidden">
			<div class="section-header text-center"><strong>WEEK 1</strong></div>
			<div class="flex flex-col flex-1">
				{#each new Array(7) as _, i (i)}
					{@const date = new Date(week1Start.getTime() + i * 86400000)}
					{@const dayEvents = settings?.eventsByDay?.[date.getTime()] || []}
					<div
						class="flex-1 flex border-b border-[var(--outline)] min-h-0 {i === 6
							? 'border-b-0'
							: ''}">
						<a
							href={getDateHash(date)}
							class="w-[2.5rem] border-r border-[var(--outline)] flex flex-col items-center justify-center bg-[var(--nav-bg-pdf)] p-1 no-underline text-inherit transition-colors duration-200 ease-in hover:bg-[var(--outline-low)]">
							<span class="text-[0.6rem] text-[var(--text-low)]" weight="bold">
								{date.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}
							</span>
							<span class="text-[0.8rem] text-[var(--text)]" weight="bold">
								{date.getUTCDate()}
							</span>
						</a>
						<div class="flex-1 p-2 flex flex-col gap-1 overflow-hidden">
							{#each dayEvents as event}
								<span
									class="text-[0.65rem] bg-[var(--outline-low)] border-l-2 border-[var(--outline)] py-[0.1rem] px-[0.25rem] text-[var(--text)] whitespace-nowrap overflow-hidden text-ellipsis">
									{event.name}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Week 2 -->
		<div
			class="flex-1 flex flex-col border border-[var(--outline)] rounded overflow-hidden">
			<div class="section-header text-center"><strong>WEEK 2</strong></div>
			<div class="flex flex-col flex-1">
				{#each new Array(7) as _, i (i)}
					{@const date = new Date(week2Start.getTime() + i * 86400000)}
					{@const dayEvents = settings?.eventsByDay?.[date.getTime()] || []}
					<div
						class="flex-1 flex border-b border-[var(--outline)] min-h-0 {i === 6
							? 'border-b-0'
							: ''}">
						<a
							href={getDateHash(date)}
							class="w-[2.5rem] border-r border-[var(--outline)] flex flex-col items-center justify-center bg-[var(--nav-bg-pdf)] p-1 no-underline text-inherit transition-colors duration-200 ease-in hover:bg-[var(--outline-low)]">
							<span class="text-[0.6rem] text-[var(--text-low)]" weight="bold">
								{date.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}
							</span>
							<span class="text-[0.8rem] text-[var(--text)]" weight="bold">
								{date.getUTCDate()}
							</span>
						</a>
						<div class="flex-1 p-2 flex flex-col gap-1 overflow-hidden">
							{#each dayEvents as event}
								<span
									class="text-[0.65rem] bg-[var(--outline-low)] border-l-2 border-[var(--outline)] py-[0.1rem] px-[0.25rem] text-[var(--text)] whitespace-nowrap overflow-hidden text-ellipsis">
									{event.name}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
