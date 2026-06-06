<script lang="ts">
	import type { CalendarEvent, PlannerSettings, Timeframe } from '$lib';
	import { Box, Text } from '$atoms';
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

<Box class="executive-layout">
	<Box class="schedule">
		<AgendaDay {timeframe} {events} {use24HourClock} {startTime} {endTime} {interval} />
	</Box>
	<Box class="right-column">
		<Box class="priorities section">
			<SectionHeader label="Top Priorities" emoji="🎯" {showEmoji} />
			<Box class="priority-list">
				{#each [1, 2, 3] as num}
					<Box class="priority-line">
						<Text class="num">{num}.</Text>
					</Box>
				{/each}
			</Box>
		</Box>
		<Box class="action-items section">
			<SectionHeader label="Action Items" emoji="✅" {showEmoji} />
			<Box class="grid-wrapper">
				<Grid display="todo" columns={1} lines={14} />
			</Box>
		</Box>
		<Box class="notes section">
			<SectionHeader label="Notes" emoji="📝" {showEmoji} />
			<Box class="grid-wrapper">
				<Grid display="dotted" />
			</Box>
		</Box>
	</Box>
</Box>

<style lang="scss">
	:global {
		.executive-layout {
			display: grid;
			grid-template-columns: 1fr 1fr;
			width: 100%;
			height: 100%;
			gap: 0.75rem;
			padding: 0.5rem 1rem 1rem 1rem;
		}
		.schedule {
			height: 100%;
			border-right: solid 1px var(--outline);
			padding-right: 0.75rem;
		}
		.schedule .day {
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
			min-height: 0;
			.lined {
				padding-bottom: 10px !important;
			}
		}
		.notes {
			flex: 0.7;
			min-height: 0;
		}
		.grid-wrapper {
			flex: 1;
			min-height: 0;
			display: flex;
			flex-direction: column;
			position: relative;
			overflow: hidden;
		}
	}
</style>

