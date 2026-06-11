<script lang="ts">
	import type { CalendarEvent, PlannerSettings, Timeframe } from '$lib';
	import { Emoji } from '$atoms';
	import { Grid } from '$molecules';
	import { AgendaDay } from '$templates';

	let {
		settings = {} as PlannerSettings,
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		use24HourClock = false,
		interval = 60,
	} = $props();

	const isTimelineOnLeft = $derived(settings?.sideNav?.leftSide !== false);
</script>

<div
	class="planner page padded agenda-day-high-performance {isTimelineOnLeft
		? 'flex-row'
		: 'flex-row-reverse'}">
	<div
		class="h-full flex-1 border-[var(--outline)] [&>.day]:!pt-4 [&>.day]:!px-0 [&>.day]:!pb-0 {isTimelineOnLeft
			? 'border-r pr-3'
			: 'border-l pl-3'}">
		<AgendaDay
			{settings}
			{timeframe}
			{events}
			{use24HourClock}
			{interval}
			isStandalone={false} />
	</div>
	<div class="planner-col-spaced pt-4 {settings.isLandscape ? 'flex-row' : 'flex-col'}">
		<div class="flex-col-none mb-2 {settings.isLandscape ? 'flex-[0.8]' : ''}">
			<div class="section-header">
				<Emoji size="s">🎯</Emoji>
				<strong>Top 3 Priorities</strong>
			</div>
			<div class="flex-col-1 gap-2 pt-1">
				{#each [1, 2, 3] as num}
					<div class="numbered-line">
						<span class="numbered-line-num font-bold !text-[0.9em]">{num}.</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="flex-col-none mb-2 {settings.isLandscape ? 'flex-[0.5]' : ''}">
			<div class="section-header">
				<Emoji size="s">⚡</Emoji>
				<strong>Energy & Focus Checks</strong>
			</div>
			<div class="flex-col-1 gap-3 pt-2 justify-around px-2">
				<div class="flex items-center justify-between">
					<span class="text-[0.7em] font-bold text-[var(--text-sidebar,var(--text-low))]">
						AM Focus
					</span>
					<div class="flex gap-[0.4rem]">
						{#each Array(5) as _}
							<div class="w-3 h-3 border border-[var(--outline)] rounded-full"></div>
						{/each}
					</div>
				</div>
				<div class="flex items-center justify-between">
					<span class="text-[0.7em] font-bold text-[var(--text-sidebar,var(--text-low))]">
						PM Energy
					</span>
					<div class="flex gap-[0.4rem]">
						{#each Array(5) as _}
							<div class="w-3 h-3 border border-[var(--outline)] rounded-full"></div>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<div
			class="flex flex-col flex-[0.8] min-h-0 {settings.isLandscape
				? 'flex-1'
				: ''} [&_.lined]:!pb-[10px]">
			<div class="section-header">
				<Emoji size="s">🤝</Emoji>
				<strong>Networking & Outreach</strong>
			</div>
			<div class="grid-container">
				<Grid display="todo" columns={1} lines={settings.isLandscape ? 3 : 4} />
			</div>
		</div>

		<div
			class="flex flex-col flex-[1.2] min-h-0 {settings.isLandscape
				? 'flex-1'
				: ''} [&_.lined]:!pb-[10px]">
			<div class="section-header">
				<Emoji size="s">🌙</Emoji>
				<strong>Evening Reflection & Wins</strong>
			</div>
			<div class="flex-col-1 gap-1 pt-1">
				<span
					class="text-[0.7em] font-bold text-[var(--text-sidebar,var(--text-low))] mt-1">
					What went well today?
				</span>
				<div class="grid-container mb-2">
					<Grid display="lined" lines={2} />
				</div>
				<span
					class="text-[0.7em] font-bold text-[var(--text-sidebar,var(--text-low))] mt-1">
					How can I improve tomorrow?
				</span>
				<div class="grid-container">
					<Grid display="lined" lines={2} />
				</div>
			</div>
		</div>
	</div>
</div>
