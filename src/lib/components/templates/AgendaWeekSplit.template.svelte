<script lang="ts">
	import { getFirstDayOfWeek, type Timeframe, type CalendarEvent } from '$lib';
	import { Box, Text } from '$atoms';
	import { SectionHeader } from '$molecules';

	let {
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		startWeekOnSunday = false,
		settings = undefined as any,
	} = $props();

	const weekStart = $derived(
		new Date(getFirstDayOfWeek(timeframe.start, startWeekOnSunday)),
	);
</script>

<Box class="agenda-split">
	<Box class="left-pane">
		{#each new Array(7) as _, i (i)}
			{@const date = new Date(weekStart.getTime() + i * 86400000)}
			{@const dayEvents = events.filter((e) => {
				if (!timeframe.start) return false;
				const dayStart = date.getTime();
				const dayEnd = dayStart + 86400000;
				const eventStart = e.start * 1000;
				const eventEnd = eventStart + (e.duration || 86400) * 1000;
				return eventStart < dayEnd && eventEnd > dayStart;
			})}
			<Box class="day-block">
				<a
					href="#{date.getUTCFullYear()}-{date.getUTCMonth() + 1}-{date.getUTCDate()}"
					class="day-header">
					<Text class="day-name" weight="bold">
						{date
							.toLocaleString('default', { weekday: 'long', timeZone: 'UTC' })
							.toUpperCase()}
					</Text>
					<Text class="day-date">
						{date.toLocaleString('default', { month: 'short', timeZone: 'UTC' })}
						{date.getUTCDate()}
					</Text>
				</a>
				<Box class="day-content">
					{#each dayEvents as event}
						<Text class="event-item">• {event.name}</Text>
					{/each}
				</Box>
			</Box>
		{/each}
	</Box>

	<Box class="divider"></Box>

	<Box class="right-pane">
		<SectionHeader title="NOTES & LOGS" />
		<Box class="grid-pattern">
			{#each Array(32) as _}
				<Box class="grid-line"></Box>
			{/each}
		</Box>
	</Box>
</Box>

<style lang="scss">
	:global {
		.agenda-split {
			display: flex;
			width: 100%;
			height: 100%;
			padding: 1.5rem;
			box-sizing: border-box;
			gap: 1.5rem;

			.left-pane {
				flex: 1;
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
			}

			.day-block {
				flex: 1;
				border: 1px solid var(--outline);
				border-radius: 4px;
				display: flex;
				flex-direction: column;
				padding: 0.5rem;
				min-height: 0;
			}

			.day-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid var(--outline-low);
				padding-bottom: 0.25rem;
				margin-bottom: 0.25rem;
				text-decoration: none;
				color: inherit;
				transition: color 0.2s ease;

				&:hover {
					.day-name {
						color: var(--text-high);
					}
				}
			}

			.day-name {
				font-size: 0.7rem;
				color: var(--text);
				letter-spacing: 0.5px;
			}

			.day-date {
				font-size: 0.65rem;
				color: var(--text-low);
			}

			.day-content {
				flex: 1;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				gap: 0.2rem;
			}

			.event-item {
				font-size: 0.65rem;
				color: var(--text);
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.divider {
				width: 1px;
				background-color: var(--outline);
				align-self: stretch;
			}

			.right-pane {
				flex: 1;
				display: flex;
				flex-direction: column;
				border: 1px solid var(--outline);
				border-radius: 4px;
				padding: 1rem;
			}

			.grid-pattern {
				flex: 1;
				display: flex;
				flex-direction: column;
				gap: 0.8rem;
				overflow: hidden;
			}

			.grid-line {
				border-bottom: 1px dashed var(--outline-low);
				height: 0.8rem;
			}
		}
	}
</style>
