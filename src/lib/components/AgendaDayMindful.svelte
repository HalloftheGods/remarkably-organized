<script lang="ts">
	import type { CalendarEvent, PlannerSettings, Timeframe } from '$lib';
	import AgendaDay from './AgendaDay.svelte';
	import Grid from './Grid.svelte';

	let {
		settings = {} as PlannerSettings,
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		use24HourClock = false,
		startTime = 0,
		endTime = 24,
		interval = 60,
	} = $props();
</script>

<div class="mindful-layout">
	<div class="left-column">
		<div class="intention section">
			<h2>
				{#if !settings?.emojis?.disable}☀️{/if} Morning Intention
			</h2>
			<div class="intention-prompt">Today I will focus on...</div>
			<div class="intention-lines">
				{#each new Array(3) as _}
					<div class="intention-line"></div>
				{/each}
			</div>
		</div>

		<div class="gratitude section">
			<h2>
				{#if !settings?.emojis?.disable}🙏{/if} Grateful For . . .
			</h2>
			<div class="gratitude-list">
				{#each new Array(3) as _, i}
					<div class="gratitude-line">
						<span class="num">{i + 1}.</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="schedule-section">
			<AgendaDay {timeframe} {events} {use24HourClock} {startTime} {endTime} {interval} />
		</div>
	</div>

	<div class="right-column">
		<div class="tasks section">
			<h2>
				{#if !settings?.emojis?.disable}✅{/if} Today's Tasks
			</h2>
			<div class="grid-wrapper">
				<Grid display="todo" columns={1} lines={15} />
			</div>
		</div>

		<div class="wellness section">
			<h2>
				{#if !settings?.emojis?.disable}💚{/if} Wellness
			</h2>
			<div class="wellness-grid">
				<div class="wellness-row">
					<span class="wellness-label">Water</span>
					<div class="tracker-dots">
						{#each new Array(8) as _}
							<div class="dot"></div>
						{/each}
					</div>
				</div>
				<div class="wellness-row">
					<span class="wellness-label">Move</span>
					<div class="tracker-dots">
						{#each new Array(4) as _}
							<div class="dot"></div>
						{/each}
					</div>
				</div>
				<div class="wellness-row">
					<span class="wellness-label">Meals</span>
					<div class="meal-tracker">
						{#each ['Breakfast', 'Lunch', 'Dinner', 'Snack'] as meal}
							<div class="meal-item">
								<span>{meal}</span>
							</div>
						{/each}
					</div>
				</div>
				<div class="wellness-row">
					<span class="wellness-label">Sleep</span>
					<div class="sleep-line"></div>
					<span class="sleep-unit">Hours</span>
				</div>
				<div class="wellness-row">
					<span class="wellness-label">Energy</span>
					<div class="energy-bar">
						{#each new Array(5) as _, i}
							<div class="energy-block" style="height: {(i + 1) * 20}%"></div>
						{/each}
					</div>
				</div>
				<div class="wellness-row">
					<span class="wellness-label">Mood</span>
					<div class="mood-track">
						{#each ['😡', '😟', '😴', '😐', '🙂', '😊'] as emoji}
							<div class="mood-circle">{emoji}</div>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<div class="reflection section">
			<h2>
				{#if !settings?.emojis?.disable}🌙{/if} Evening Reflection
			</h2>
			<div class="reflection-prompts">
				<div class="prompt-block">
					<span class="prompt-label">Win of the day</span>
					<div class="prompt-line"></div>
				</div>
				<div class="prompt-block">
					<span class="prompt-label">What I learned</span>
					<div class="prompt-line"></div>
				</div>
				<div class="prompt-block">
					<span class="prompt-label">Tomorrow I will</span>
					<div class="prompt-line"></div>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.mindful-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100%;
		height: 100%;
		gap: 0.75rem;
		padding: 0.5rem 1rem 1rem 1rem;
	}
	.left-column {
		display: flex;
		flex-direction: column;
		height: 100%;
		border-right: solid 1px var(--outline);
		padding-right: 0.75rem;
	}
	.right-column {
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 1.5rem;
		padding-top: 0.5rem;
	}
	.section {
		display: flex;
		flex-direction: column;
		h2 {
			font-size: 0.8em;
			text-transform: uppercase;
			letter-spacing: 1.5px;
			color: var(--text-low);
			margin-bottom: 0.5rem;
			font-weight: var(--font-weight-bold);
			display: flex;
			align-items: center;
			gap: 0.25rem;
			line-height: 1.4;
		}
	}

	.intention {
		padding: 0.5rem 0 0.75rem 1rem;
	}
	.intention-prompt {
		font-size: 0.75em;
		color: var(--text-low);
		font-style: italic;
		margin-bottom: 0.25rem;
		padding-left: 0.25rem;
	}
	.intention-lines {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding-top: 0.25rem;
	}
	.intention-line {
		border-bottom: solid 1px var(--outline);
		height: 1.4rem;
	}

	.gratitude {
		padding: 0 0 0.75rem 1rem;
		border-bottom: solid 1px var(--outline);
	}
	.gratitude-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-top: 0.25rem;
	}
	.gratitude-line {
		display: flex;
		align-items: flex-end;
		border-bottom: solid 1px var(--outline);
		height: 1.4rem;
		padding-bottom: 0.15rem;
		.num {
			font-weight: var(--font-weight-light);
			font-size: 0.8em;
			color: var(--text-low);
			margin-right: 0.5rem;
		}
	}

	.schedule-section {
		flex: 1;
		min-height: 0;
		padding-top: 0.5rem;
	}

	.tasks {
		flex: 1;
		min-height: 0;
		:global(.lined) {
			padding-bottom: 5px !important;
		}
	}
	.grid-wrapper {
		flex: 1;
		min-height: 0;
		display: flex;
		flex-direction: column;
		position: relative;
		overflow: hidden;
	}

	.wellness {
		flex: 0 0 auto;
		border-top: solid 1px var(--outline);
		border-bottom: solid 1px var(--outline);
		padding: 0.75rem 0;
	}
	.wellness-grid {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}
	.wellness-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.wellness-label {
		font-size: 0.75em;
		color: var(--text-low);
		font-weight: var(--font-weight-bold);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		width: 3.5rem;
		flex-shrink: 0;
	}
	.tracker-dots {
		display: flex;
		gap: 0.4rem;
	}
	.dot {
		width: 0.9rem;
		height: 0.9rem;
		border: solid 1px var(--outline);
		border-radius: 50%;
	}
	.meal-tracker {
		display: flex;
		gap: 0.4rem;
	}
	.meal-item {
		span {
			font-size: 0.75em;
			color: var(--text-low);
			font-weight: var(--font-weight-bold);
			letter-spacing: 1px;
		}
	}
	.sleep-line {
		flex: 0 0 3rem;
		border-bottom: solid 1px var(--outline);
		height: 1rem;
	}
	.sleep-unit {
		font-size: 0.8em;
		color: var(--text-low);
	}
	.energy-bar {
		display: flex;
		align-items: flex-end;
		gap: 0.25rem;
		height: 1.2rem;
	}
	.energy-block {
		width: 0.9rem;
		border: solid 1px var(--outline);
		border-radius: 2px;
	}
	.mood-track {
		display: flex;
		gap: 0.4rem;
	}
	.mood-circle {
		width: 1.6rem;
		height: 1.6rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.1em;
		filter: grayscale(0.3);
		opacity: 0.8;
	}

	.reflection {
		flex: 0 0 auto;
	}
	.reflection-prompts {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}
	.prompt-block {
		display: flex;
		flex-direction: column;
	}
	.prompt-label {
		font-size: 0.75em;
		color: var(--text-low);
		font-style: italic;
		padding-left: 0.15rem;
	}
	.prompt-line {
		border-bottom: solid 1px var(--outline);
		height: 1.4rem;
	}
</style>
