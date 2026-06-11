<script lang="ts">
	import RowInput from '$atoms/RowInput.svelte';
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

<div
	class="planner page padded agenda-day-mindful"
	class:timeline-left={isTimelineOnLeft}
	class:timeline-right={!isTimelineOnLeft}>
	<div
		class="mindful-agenda-col"
		class:left-side={isTimelineOnLeft}
		class:right-side={!isTimelineOnLeft}>
		<div class="planner-section morning-section">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">☀️</span>{/if} Morning Intention
			</div>
			<span class="instruction-text">Today I will focus on...</span>
			<div class="morning-grid">
				<Grid display="dotted" columns={6} lines={5} />
			</div>
		</div>

		<div class="planner-section gratitude-section">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">🙏</span>{/if} Grateful For . . .
			</div>
			<div class="gratitude-lines">
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
			<div class="grid-container tasks-grid">
				<Grid display="todo" columns={1} lines={15} />
			</div>
		</div>

		<div class="planner-section-bordered">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">💚</span>{/if} Wellness
			</div>
			<div class="wellness-trackers">
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
					<div class="sleep-input"></div>
					<span class="tracker-unit">Hours</span>
				</div>
				<div class="tracker-row">
					<span class="tracker-label">Energy</span>
					<div class="energy-gauge">
						{#each new Array(5) as _, i}
							<div class="energy-bar-mini" style="height: {(i + 1) * 20}%"></div>
						{/each}
					</div>
				</div>
				<div class="tracker-row">
					<span class="tracker-label">Mood</span>
					<div class="mood-emojis">
						{#each ['😤', '😟', '😴', '😐', '🙂', '😊'] as emoji}
							<div class="emoji-circle-sm">{emoji}</div>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<div class="evening-section">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">🌙</span>{/if} Evening Reflection
			</div>
			<div class="reflection-prompts">
				<div class="prompt-box">
					<span class="instruction-text">Win of the day</span>
					<div class="line">
						<RowInput />
					</div>
				</div>
				<div class="prompt-box">
					<span class="instruction-text">What I learned</span>
					<div class="line">
						<RowInput />
					</div>
				</div>
				<div class="prompt-box">
					<span class="instruction-text">Tomorrow I will</span>
					<div class="line">
						<RowInput />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.agenda-day-mindful {
		&.timeline-left {
			display: flex;
			flex-direction: row;
		}
		&.timeline-right {
			display: flex;
			flex-direction: row-reverse;
		}
	}

	.mindful-agenda-col {
		display: flex;
		flex-direction: column;
		flex: 1;
		height: 100%;

		&.left-side {
			border-right: 1px solid var(--outline);
			padding-right: 0;
		}
		&.right-side {
			border-left: 1px solid var(--outline);
			padding-left: 0;
		}
	}

	.morning-section {
		padding-left: 1rem;
		padding-bottom: 0.75rem;
	}

	.morning-grid {
		padding-top: 0.25rem;
	}

	.gratitude-section {
		padding-left: 1rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--outline);
	}

	.gratitude-lines {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-top: 0.25rem;
	}

	.wellness-trackers {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.sleep-input {
		flex: none;
		width: 3rem;
		border-bottom: 1px solid var(--outline);
		height: 1rem;
	}

	.tasks-grid {
		:global(.lined) {
			padding-bottom: 5px !important;
		}
	}

	.evening-section {
		display: flex;
		flex-direction: column;
		flex: none;
	}
</style>
