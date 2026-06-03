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

<div class="executive-layout">
	<div class="schedule">
		<AgendaDay
			{timeframe}
			{events}
			{use24HourClock}
			{startTime}
			{endTime}
			{interval} />
	</div>
	<div class="right-column">
		<div class="priorities section">
			<h2>🎯 Top Priorities</h2>
			<div class="priority-list">
				{#each [1, 2, 3] as num}
					<div class="priority-line">
						<span class="num">{num}.</span>
					</div>
				{/each}
			</div>
		</div>
		<div class="action-items section">
			<h2>📋 Action Items</h2>
			<div class="grid-wrapper">
				<Grid {settings} display="todo" columns={1} lines={14} />
			</div>
		</div>
		<div class="notes section">
			<h2>📝 Notes</h2>
			<div class="grid-wrapper">
				<Grid {settings} display="dotted" />
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.executive-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100%;
		height: 100%;
		gap: 2rem;
		padding: 0.5rem 1rem 1rem 1rem;
	}
	.schedule {
		height: 100%;
		border-right: solid 1px var(--outline);
		padding-right: 0.75rem;
	}
	.schedule :global(.day) {
		padding: 1rem 0 0 0 !important;
	}
	.right-column {
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 1.5rem;
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
	.priorities {
		flex: 0 0 auto;
		margin-bottom: 0.5rem;
	}
	.priority-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-top: 0.25rem;
	}
	.priority-line {
		display: flex;
		align-items: flex-end;
		border-bottom: solid 1px var(--outline);
		height: 2rem;
		padding-bottom: 0.2rem;
		.num {
			font-weight: var(--font-weight-bold);
			font-size: 0.9em;
			margin-right: 0.5rem;
		}
	}
	.action-items {
		flex: 1;
		:global(.lined) {
			padding-bottom: 10px !important;
		}
	}
	.notes {
		flex: 0.7;
	}
	.grid-wrapper {
		flex: 1;
		position: relative;
		overflow: hidden;
	}
</style>
