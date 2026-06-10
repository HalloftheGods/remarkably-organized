<script lang="ts">
	import {
		getFirstDayOfWeek,
		type Timeframe,
		type CalendarEvent,
		getDateHash,
	} from '$lib';
	import Field from '$atoms/Field.atom.svelte';

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

	const weeks = $derived([
		{ title: 'WEEK 1', start: week1Start },
		{ title: 'WEEK 2', start: week2Start },
	]);

	const showEmoji = $derived(!settings?.emojis?.disable);
	const isTimelineOnLeft = $derived(settings?.sideNav?.leftSide !== false);
</script>

<div class="planner page padded">
	<div class="flex gap-8">
		<div class="field flex-[2]">
			<Field i="🏃">BI-WEEKLY PLANNER / SPRINT LOG</Field>
		</div>
		<div class="field flex-1">
			<Field>SPRINT CYCLE DATES</Field>
		</div>
	</div>

	<div
		class="flex {settings?.isLandscape ? 'flex-row' : 'flex-col'} gap-6 flex-1 min-h-0">
		{#each weeks as week}
			<div class="box-container flex-1">
				<div class="box-header text-center">{week.title}</div>
				<div class="flex-col-1 min-h-0">
					{#each new Array(7) as _, i (i)}
						{@const date = new Date(week.start.getTime() + i * 86400000)}
						{@const dayEvents = settings?.eventsByDay?.[date.getTime()] || []}
						<div
							class="flex-1 flex border-b border-[var(--outline)] min-h-0 {i === 6
								? 'border-b-0'
								: ''} {isTimelineOnLeft ? 'flex-row' : 'flex-row-reverse'}">
							<a
								href={getDateHash(date)}
								class="w-[15%] flex flex-col items-center justify-center bg-[var(--nav-bg-pdf)] p-1 no-underline text-inherit {isTimelineOnLeft
									? 'border-r'
									: 'border-l'} border-[var(--outline)]">
								<span
									class="text-[0.6rem] text-[var(--text-sidebar,var(--text-low))]"
									weight="bold">
									{date.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}
								</span>
								<span class="text-[0.8rem] text-[var(--text)]" weight="bold">
									{date.getUTCDate()}
								</span>
							</a>
							<div class="flex-1 p-2 flex-col-1 gap-1 overflow-hidden">
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
		{/each}
	</div>
</div>
