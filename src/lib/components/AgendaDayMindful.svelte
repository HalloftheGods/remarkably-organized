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
	<div class="top-row section">
		<h2>Morning Intention & Gratitude</h2>
		<div class="grid-wrapper">
			<Grid {settings} display="lined" lines={4} />
		</div>
	</div>

	<div class="middle-row">
		<div class="schedule">
			<AgendaDay
				{timeframe}
				{events}
				{use24HourClock}
				{startTime}
				{endTime}
				{interval} />
		</div>
		<div class="tasks section">
			<h2>Tasks & Priorities</h2>
			<div class="grid-wrapper">
				<Grid {settings} display="todo" />
			</div>
		</div>
	</div>

	<div class="bottom-row section">
		<div class="wellness">
			<h2>Wellness Tracker</h2>
			<div class="wellness-items">
				<div class="wellness-item">
					<span class="icon">💧</span>
					<span class="label">Water</span>
					<div class="drops">
						{#each new Array(8) as _}
							<div class="drop-box"></div>
						{/each}
					</div>
				</div>
				<div class="wellness-item">
					<span class="icon">🍽️</span>
					<span class="label">Meals</span>
					<div class="meal-boxes">
						<div class="meal-box"><span>B</span></div>
						<div class="meal-box"><span>L</span></div>
						<div class="meal-box"><span>D</span></div>
						<div class="meal-box"><span>S</span></div>
					</div>
				</div>
				<div class="wellness-item">
					<span class="icon">🧘</span>
					<span class="label">Mood</span>
					<div class="mood-boxes">
						<div class="mood-box">😊</div>
						<div class="mood-box">😐</div>
						<div class="mood-box">😫</div>
					</div>
				</div>
			</div>
		</div>
		<div class="reflection">
			<h2>Evening Reflection</h2>
			<div class="grid-wrapper">
				<Grid {settings} display="lined" lines={5} />
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.mindful-layout {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		gap: 1.5rem;
		padding: 0.5rem 1.5rem 1rem 1.5rem;
	}
	.top-row {
		flex: 0 0 auto;
		min-height: 4rem;
	}
	.middle-row {
		flex: 1;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		min-height: 0; // Fixes overflow in flex columns
	}
	.schedule {
		height: 100%;
		border-right: solid 1px var(--outline);
		padding-right: 1.5rem;
		margin-top: 1.5rem;
	}
	.tasks {
		height: 100%;
		padding-top: 1rem;
	}
	.bottom-row {
		flex: 0 0 auto;
		display: grid;
		grid-template-columns: 0.8fr 1.2fr;
		gap: 2rem;
		border-top: solid 2px var(--outline);
		padding-top: 1rem;
	}
	.section {
		display: flex;
		flex-direction: column;
		h2 {
			font-size: 0.85em;
			text-transform: uppercase;
			letter-spacing: 1.5px;
			color: var(--text-low);
			margin-bottom: 0.5rem;
			font-weight: var(--font-weight-bold);
		}
	}
	.grid-wrapper {
		flex: 1;
		position: relative;
		overflow: hidden;
	}
	
	.wellness {
		display: flex;
		flex-direction: column;
		padding-right: 1.5rem;
		border-right: solid 1px var(--outline);
	}
	.reflection {
		display: flex;
		flex-direction: column;
	}
	.wellness-items {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		flex: 1;
		justify-content: center;
	}
	.wellness-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		.icon {
			font-size: 1.2em;
			filter: grayscale(0.5);
			opacity: 0.7;
		}
		.label {
			font-size: 0.7em;
			color: var(--text-low);
			font-weight: var(--font-weight-bold);
			width: 3rem;
		}
	}
	.drops {
		display: flex;
		gap: 0.3rem;
	}
	.drop-box {
		width: 1rem;
		height: 1rem;
		border: solid 1px var(--outline);
		border-radius: 50% 50% 50% 0;
		transform: rotate(-45deg);
	}
	.meal-boxes {
		display: flex;
		gap: 0.5rem;
	}
	.meal-box {
		width: 1.2rem;
		height: 1.2rem;
		border: solid 1px var(--outline);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 2px;
		span {
			font-size: 0.55em;
			color: var(--text-low);
			font-weight: var(--font-weight-bold);
		}
	}
	.mood-boxes {
		display: flex;
		gap: 0.5rem;
	}
	.mood-box {
		width: 1.5rem;
		height: 1.5rem;
		border: solid 1px var(--outline);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.9em;
		opacity: 0.5;
	}
</style>
