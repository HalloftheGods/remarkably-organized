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

<div class="timebox-layout">
	<div class="left-column">
		<div class="brain-dump section">
			<h2>{#if !settings?.emojis?.disable}🧠{/if} Brain Dump</h2>
			<div class="grid-wrapper">
				<Grid display="dotted" />
			</div>
		</div>
		<div class="prioritize section">
			<h2>{#if !settings?.emojis?.disable}⏱️{/if} Timebox Focus</h2>
			<div class="timebox-list">
				<div class="timebox-header">
					<span>Task</span>
					<span class="est">25m Block Estimate</span>
				</div>
				{#each new Array(14) as _, i}
					<div class="timebox-line">
						<input type="checkbox" class="timebox-check" />
						<div class="timebox-task"></div>
						<div class="timebox-boxes">
							<div class="est-box"></div>
							<div class="est-box"></div>
							<div class="est-box"></div>
							<div class="est-box"></div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div class="schedule">
		<AgendaDay
			{timeframe}
			{events}
			{use24HourClock}
			{startTime}
			{endTime}
			{interval} />
	</div>
</div>

<style lang="scss">
	.timebox-layout {
		display: grid;
		grid-template-columns: 1.2fr 0.8fr;
		width: 100%;
		height: 100%;
		gap: 0.75rem;
		padding: 0.5rem 1rem 1rem 1rem;
	}
	.left-column {
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 2rem;
		padding-top: 1rem;
	}
	.schedule {
		height: 100%;
		border-left: solid 1px var(--outline);
		padding-left: 0.75rem;
	}
	.schedule :global(.day) {
		padding: 1rem 0 0 0 !important;
	}
	.section {
		display: flex;
		flex-direction: column;
		h2 {
			font-size: 0.9em;
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
	.brain-dump {
		flex: 1;
	}
	.prioritize {
		flex: 1.2;
	}
	.grid-wrapper {
		flex: 1;
		position: relative;
		overflow: hidden;
	}
	.timebox-list {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.timebox-header {
		display: flex;
		justify-content: space-between;
		font-size: 0.8em;
		color: var(--text-low);
		font-weight: var(--font-weight-bold);
		letter-spacing: 1px;
		padding: 0 0.5rem 0.25rem;
		border-bottom: solid 1px var(--outline);
		.est {
			text-align: right;
			padding-right: 0;
		}
	}
	.timebox-line {
		display: flex;
		align-items: center;
		flex: 1;
		border-bottom: solid 1px var(--outline);
		padding: 0.25rem 0.5rem;
	}
	.timebox-check {
		width: 1rem;
		height: 1rem;
		margin: 0;
		margin-right: 0.75rem;
		accent-color: var(--text);
		cursor: pointer;
	}
	.timebox-task {
		flex: 1;
		height: 100%;
	}
	.timebox-boxes {
		display: flex;
		gap: 0.4rem;
	}
	.est-box {
		width: 1.2rem;
		height: 1.2rem;
		border: solid 1px var(--outline);
		background-color: transparent;
		border-radius: 2px;
	}
</style>
