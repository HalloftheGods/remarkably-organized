<script lang="ts">
	import type { CalendarEvent, PlannerSettings, Timeframe } from '$lib';
	import { AgendaDay } from '$templates';

	import { Grid } from '$molecules';

	let {
		settings = {} as any /* PlannerSettings */,
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		use24HourClock = false,
		startTime = 0,
		endTime = 24,
		interval = 60,
	} = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	const isTimelineOnLeft = $derived(settings?.sideNav?.leftSide !== false);
	const nRows = $derived({
		tasks: settings?.isLandscape ? 6 : 2,
		morning: settings?.isLandscape ? 2 : 3,
	});
</script>

<div class="planner page padded {isTimelineOnLeft ? 'flex-row' : 'flex-row-reverse'}">
	<div
		class="planner-col {isTimelineOnLeft
			? 'border-r border-[var(--outline)] pr-0'
			: 'border-l border-[var(--outline)] pl-0'}">
		<div class="planner-section pl-4 pb-3">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">☀️</span>{/if} Morning Intention
			</div>
			<span class="instruction-text">Today I will focus on...</span>
			<div class="lines pt-1">
				<Grid display="dotted" columns={6} lines={5} />
			</div>
		</div>

		<div class="planner-section pl-4 pb-3 border-b border-[var(--outline)]">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">🙏</span>{/if} Grateful For . . .
			</div>
			<div class="lines gap-2 pt-1">
				{#each new Array(3) as _, i}
					<div class="numbered-line">
						<span class="numbered-line-num">{i + 1}.</span>
					</div>
				{/each}
			</div>
		</div>

		<AgendaDay
			{settings}
			{timeframe}
			{events}
			{use24HourClock}
			{startTime}
			{endTime}
			{interval}
			isStandalone={false} />
	</div>

	<div class="planner-col-spaced">
		<div class="grid-container">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">✅</span>{/if} Today's Tasks
			</div>
			<div class="grid-container [&_.lined]:!pb-[5px]">
				<Grid display="todo" columns={1} lines={15} />
			</div>
		</div>

		<div class="planner-section-bordered">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">💚</span>{/if} Wellness
			</div>
			<div class="flex-col-1 gap-[0.6rem]">
				<div class="tracker-row">
					<span class="tracker-label">Water</span>
					<div class="tracker-items">
						{#each new Array(8) as _}
							<div class="tracker-circle"></div>
						{/each}
					</div>
				</div>
				<div class="tracker-row">
					<span class="tracker-label">Move</span>
					<div class="tracker-items">
						{#each new Array(4) as _}
							<div class="tracker-circle"></div>
						{/each}
					</div>
				</div>
				<div class="tracker-row">
					<span class="tracker-label">Meals</span>
					<div class="tracker-items">
						{#each ['Breakfast', 'Lunch', 'Dinner', 'Snack'] as meal}
							<div class="meal-label">{meal}</div>
						{/each}
					</div>
				</div>
				<div class="tracker-row">
					<span class="tracker-label">Sleep</span>
					<div class="flex-none w-12 border-b border-[var(--outline)] h-4"></div>
					<span class="tracker-unit">Hours</span>
				</div>
				<div class="tracker-row">
					<span class="tracker-label">Energy</span>
					<div class="energy-gauge !pt-0">
						{#each new Array(5) as _, i}
							<div class="energy-bar-mini" style="height: {(i + 1) * 20}%"></div>
						{/each}
					</div>
				</div>
				<div class="tracker-row">
					<span class="tracker-label">Mood</span>
					<div class="mood-emojis !pt-0">
						{#each ['😤', '😟', '😴', '😐', '🙂', '😊'] as emoji}
							<div class="emoji-circle-sm">{emoji}</div>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<div class="flex-col flex-none">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">🌙</span>{/if} Evening Reflection
			</div>
			<div class="reflection-prompts">
				<div class="prompt-box">
					<span class="instruction-text">Win of the day</span>
					<div class="line"></div>
				</div>
				<div class="prompt-box">
					<span class="instruction-text">What I learned</span>
					<div class="line"></div>
				</div>
				<div class="prompt-box">
					<span class="instruction-text">Tomorrow I will</span>
					<div class="line"></div>
				</div>
			</div>
		</div>
	</div>
</div>
