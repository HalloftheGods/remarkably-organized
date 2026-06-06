<script lang="ts">
	import type { CalendarEvent, PlannerSettings, Timeframe } from '$lib';
	import { Box, Text, Checkbox } from '$atoms';
	import { Grid, SectionHeader } from '$molecules';
	import { AgendaDay } from '$templates';

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
</script>

<Box class="timebox-layout">
	<Box class="left-column">
		<Box class="brain-dump section">
			<SectionHeader label="Brain Dump" emoji="🧠" {showEmoji} />
			<Box class="grid-wrapper">
				<Grid display="dotted" />
			</Box>
		</Box>
		<Box class="prioritize section">
			<SectionHeader label="Timebox Focus" emoji="⏱️" {showEmoji} />
			<Box class="timebox-list">
				<Box class="timebox-header">
					<Text>Task</Text>
					<Text class="est">25m Block Estimate</Text>
				</Box>
				{#each new Array(14) as _, i}
					<Box class="timebox-line">
						<Box class="timebox-check">
							<Checkbox />
						</Box>
						<Box class="timebox-task"></Box>
						<Box class="timebox-boxes">
							<Box class="est-box"></Box>
							<Box class="est-box"></Box>
							<Box class="est-box"></Box>
							<Box class="est-box"></Box>
						</Box>
					</Box>
				{/each}
			</Box>
		</Box>
	</Box>
	<Box class="schedule">
		<AgendaDay {timeframe} {events} {use24HourClock} {startTime} {endTime} {interval} />
	</Box>
</Box>

<style lang="scss">
	:global {
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
		.schedule .day {
			padding: 1rem 0 0 0 !important;
		}
		.section {
			display: flex;
			flex-direction: column;
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
	}
</style>

