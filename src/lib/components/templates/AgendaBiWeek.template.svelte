<script lang="ts">
	import { getFirstDayOfWeek, type Timeframe, type CalendarEvent } from '$lib';
	import { Box, Text } from '$atoms';
	import { SectionHeader, Field } from '$molecules';

	let {
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		startWeekOnSunday = false,
		settings = undefined as any,
	} = $props();

	const week1Start = $derived(
		new Date(getFirstDayOfWeek(timeframe.start, startWeekOnSunday)),
	);
	const week2Start = $derived(new Date(week1Start.getTime() + 7 * 86400000));
</script>

<Box class="agenda-biweek">
	<Box class="header-section">
		<Field
			class="title"
			label="{!settings?.emojis?.disable ? '🏃 ' : ''}BI-WEEKLY PLANNER / SPRINT LOG"
			labelWeight="bold" />
		<Field class="dates" label="SPRINT CYCLE DATES" labelWeight="bold" />
	</Box>

	<Box class="weeks-container">
		<!-- Week 1 -->
		<Box class="week-column">
			<SectionHeader title="WEEK 1" center />
			<Box class="days-list">
				{#each new Array(7) as _, i (i)}
					{@const date = new Date(week1Start.getTime() + i * 86400000)}
					{@const dayEvents = events.filter((e) => {
						if (!timeframe.start) return false;
						const dayStart = date.getTime();
						const dayEnd = dayStart + 86400000;
						const eventStart = e.start * 1000;
						const eventEnd = eventStart + (e.duration || 86400) * 1000;
						return eventStart < dayEnd && eventEnd > dayStart;
					})}
					<Box class="day-row">
						<a
							href="#{date.getUTCFullYear()}-{date.getUTCMonth() + 1}-{date.getUTCDate()}"
							class="day-label">
							<Text class="short-name" weight="bold">
								{date.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}
							</Text>
							<Text class="date-num" weight="bold">{date.getUTCDate()}</Text>
						</a>
						<Box class="day-notes">
							{#each dayEvents as event}
								<Text class="event-tag">{event.name}</Text>
							{/each}
						</Box>
					</Box>
				{/each}
			</Box>
		</Box>

		<!-- Week 2 -->
		<Box class="week-column">
			<SectionHeader title="WEEK 2" center />
			<Box class="days-list">
				{#each new Array(7) as _, i (i)}
					{@const date = new Date(week2Start.getTime() + i * 86400000)}
					{@const dayEvents = events.filter((e) => {
						if (!timeframe.start) return false;
						const dayStart = date.getTime();
						const dayEnd = dayStart + 86400000;
						const eventStart = e.start * 1000;
						const eventEnd = eventStart + (e.duration || 86400) * 1000;
						return eventStart < dayEnd && eventEnd > dayStart;
					})}
					<Box class="day-row">
						<a
							href="#{date.getUTCFullYear()}-{date.getUTCMonth() + 1}-{date.getUTCDate()}"
							class="day-label">
							<Text class="short-name" weight="bold">
								{date.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}
							</Text>
							<Text class="date-num" weight="bold">{date.getUTCDate()}</Text>
						</a>
						<Box class="day-notes">
							{#each dayEvents as event}
								<Text class="event-tag">{event.name}</Text>
							{/each}
						</Box>
					</Box>
				{/each}
			</Box>
		</Box>
	</Box>
</Box>

<style lang="scss">
	.agenda-biweek {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 1.5rem;
		box-sizing: border-box;
		gap: 1.5rem;

		:global(.header-section) {
			display: flex;
			gap: 2rem;

			:global(.title) {
				flex: 2;
			}
			:global(.dates) {
				flex: 1;
			}
		}

		:global(.weeks-container) {
			display: flex;
			gap: 1.5rem;
			flex: 1;
		}

		:global(.week-column) {
			flex: 1;
			display: flex;
			flex-direction: column;
			border: 1px solid var(--outline);
			border-radius: 4px;
			overflow: hidden;
		}

		:global(.days-list) {
			display: flex;
			flex-direction: column;
			flex: 1;
		}

		:global(.day-row) {
			flex: 1;
			display: flex;
			border-bottom: 1px solid var(--outline);
			min-height: 0;

			&:last-child {
				border-bottom: none;
			}
		}

		:global(.day-label) {
			width: 2.5rem;
			border-right: 1px solid var(--outline);
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background-color: var(--nav-bg-pdf);
			padding: 0.25rem;
			text-decoration: none;
			color: inherit;
			transition: background-color 0.2s ease;

			&:hover {
				background-color: var(--outline-low);
			}

			:global(.short-name) {
				font-size: 0.6rem;
				color: var(--text-low);
			}

			:global(.date-num) {
				font-size: 0.8rem;
				color: var(--text);
			}
		}

		:global(.day-notes) {
			flex: 1;
			padding: 0.5rem;
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			overflow: hidden;
		}

		:global(.event-tag) {
			font-size: 0.65rem;
			background-color: var(--outline-low);
			border-left: 2px solid var(--outline);
			padding: 0.1rem 0.25rem;
			color: var(--text);
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
</style>
