<script lang="ts">
	import type { CalendarEvent, PlannerSettings, Timeframe } from '$lib';
	import { AgendaDay } from '$templates';

	import { Grid } from '$molecules';

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

<div
	class="planner page flex w-full h-full gap-0 pt-2 pl-2 pr-1 {isTimelineOnLeft
		? 'flex-row'
		: 'flex-row-reverse'}">
	<div
		class="flex flex-col flex-1 h-full border-[var(--outline)] {isTimelineOnLeft
			? 'border-r pr-0'
			: 'border-l pl-0'}">
		<div class="flex flex-col pt-2 pl-4 pb-3">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">☀️</span>{/if}
				<strong>Morning Intention</strong>
			</div>
			<span class="text-[0.75em] text-[var(--text-low)] italic mb-1 pl-1">
				Today I will focus on...
			</span>
			<div class="flex flex-col gap-3 pt-1">
				{#each new Array(3) as _}
					<div class="border-b border-[var(--outline)] h-[1.4rem]"></div>
				{/each}
			</div>
		</div>

		<div class="flex flex-col pl-4 pb-3 border-b border-[var(--outline)]">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">🙏</span>{/if}
				<strong>Grateful For . . .</strong>
			</div>
			<div class="flex flex-col gap-2 pt-1">
				{#each new Array(3) as _, i}
					<div
						class="flex items-end border-b border-[var(--outline)] h-[1.4rem] pb-[0.15rem]">
						<span class="font-light text-[0.8em] text-[var(--text-low)] mr-2">
							{i + 1}.
						</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="flex-1 min-h-0 pt-5 pl-3">
			<AgendaDay
				{settings}
				{timeframe}
				{events}
				{use24HourClock}
				{startTime}
				{endTime}
				{interval} />
		</div>
	</div>

	<div class="flex flex-col flex-1 h-full gap-6 pt-2">
		<div class="flex flex-col flex-1 min-h-0 [&_.lined]:!pb-[5px]">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">✅</span>{/if}
				<strong>Today's Tasks</strong>
			</div>
			<div class="flex-1 min-h-0 flex flex-col relative overflow-hidden">
				<Grid display="todo" columns={1} lines={15} />
			</div>
		</div>

		<div class="flex flex-col flex-none border-t border-b border-[var(--outline)] py-3">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">💚</span>{/if}
				<strong>Wellness</strong>
			</div>
			<div class="flex flex-col gap-[0.6rem]">
				<div class="flex items-center gap-3">
					<span
						class="text-[0.75em] text-[var(--text-low)] font-bold uppercase tracking-[0.5px] w-14 shrink-0">
						Water
					</span>
					<div class="flex gap-[0.4rem]">
						{#each new Array(8) as _}
							<div
								class="w-[0.9rem] h-[0.9rem] border border-[var(--outline)] rounded-full">
							</div>
						{/each}
					</div>
				</div>
				<div class="flex items-center gap-3">
					<span
						class="text-[0.75em] text-[var(--text-low)] font-bold uppercase tracking-[0.5px] w-14 shrink-0">
						Move
					</span>
					<div class="flex gap-[0.4rem]">
						{#each new Array(4) as _}
							<div
								class="w-[0.9rem] h-[0.9rem] border border-[var(--outline)] rounded-full">
							</div>
						{/each}
					</div>
				</div>
				<div class="flex items-center gap-3">
					<span
						class="text-[0.75em] text-[var(--text-low)] font-bold uppercase tracking-[0.5px] w-14 shrink-0">
						Meals
					</span>
					<div class="flex gap-[0.4rem]">
						{#each ['Breakfast', 'Lunch', 'Dinner', 'Snack'] as meal}
							<div>
								<span
									class="text-[0.75em] text-[var(--text-low)] font-bold tracking-[1px]">
									{meal}
								</span>
							</div>
						{/each}
					</div>
				</div>
				<div class="flex items-center gap-3">
					<span
						class="text-[0.75em] text-[var(--text-low)] font-bold uppercase tracking-[0.5px] w-14 shrink-0">
						Sleep
					</span>
					<div class="flex-none w-12 border-b border-[var(--outline)] h-4"></div>
					<span class="text-[0.8em] text-[var(--text-low)]">Hours</span>
				</div>
				<div class="flex items-center gap-3">
					<span
						class="text-[0.75em] text-[var(--text-low)] font-bold uppercase tracking-[0.5px] w-14 shrink-0">
						Energy
					</span>
					<div class="flex items-end gap-1 h-[1.2rem]">
						{#each new Array(5) as _, i}
							<div
								class="w-[0.9rem] border border-[var(--outline)] rounded-sm"
								style="height: {(i + 1) * 20}%">
							</div>
						{/each}
					</div>
				</div>
				<div class="flex items-center gap-3">
					<span
						class="text-[0.75em] text-[var(--text-low)] font-bold uppercase tracking-[0.5px] w-14 shrink-0">
						Mood
					</span>
					<div class="flex gap-[0.4rem]">
						{#each ['😤', '😟', '😴', '😐', '🙂', '😊'] as emoji}
							<div
								class="w-[1.6rem] h-[1.6rem] flex items-center justify-center text-[1.1em] grayscale-[0.3] opacity-80">
								{emoji}
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<div class="flex flex-col flex-none">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">🌙</span>{/if}
				<strong>Evening Reflection</strong>
			</div>
			<div class="flex flex-col gap-[0.6rem]">
				<div class="flex flex-col">
					<span class="text-[0.75em] text-[var(--text-low)] italic pl-[0.15rem]">
						Win of the day
					</span>
					<div class="border-b border-[var(--outline)] h-[1.4rem]"></div>
				</div>
				<div class="flex flex-col">
					<span class="text-[0.75em] text-[var(--text-low)] italic pl-[0.15rem]">
						What I learned
					</span>
					<div class="border-b border-[var(--outline)] h-[1.4rem]"></div>
				</div>
				<div class="flex flex-col">
					<span class="text-[0.75em] text-[var(--text-low)] italic pl-[0.15rem]">
						Tomorrow I will
					</span>
					<div class="border-b border-[var(--outline)] h-[1.4rem]"></div>
				</div>
			</div>
		</div>
	</div>
</div>
