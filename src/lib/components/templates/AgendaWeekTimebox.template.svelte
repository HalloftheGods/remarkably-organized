<script lang="ts">
	import { getFirstDayOfWeek, type Timeframe, type CalendarEvent } from '$lib';
	import { Box, Text } from '$atoms';
	import { Field } from '$molecules';

	let {
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		startWeekOnSunday = false,
		settings = undefined as any,
		startTime = 7,
		endTime = 21,
		use24HourClock = false,
	} = $props();

	const weekStart = $derived(
		new Date(getFirstDayOfWeek(timeframe.start, startWeekOnSunday)),
	);

	// Hourly rows based on custom settings
	const hours = $derived(
		Array.from({ length: Math.max(0, endTime - startTime) }, (_, i) => startTime + i),
	);

	const formatHour = (hour: number) => {
		if (use24HourClock) {
			return `${hour.toString().padStart(2, '0')}:00`;
		}
		const normalizedHour = hour % 24;
		if (normalizedHour === 12) return '12 PM';
		if (normalizedHour === 0) return '12 AM';
		if (normalizedHour > 12) return `${normalizedHour - 12} PM`;
		return `${normalizedHour} AM`;
	};
</script>

<Box class="week-timebox">
	<Box class="header-section">
		<Field
			class="title"
			label="{!settings?.emojis?.disable ? '📅 ' : ''}WEEKLY TIME-BLOCKED AGENDA"
			labelWeight="bold" />
		<Field class="week-dates" label="WEEK OF" labelWeight="bold" />
	</Box>

	<Box class="grid-table" style="--total-hours: {hours.length};">
		<!-- Top header row -->
		<Box class="time-col-header"></Box>
		{#each new Array(7) as _, i (i)}
			{@const date = new Date(weekStart.getTime() + i * 86400000)}
			<a
				href="#{date.getUTCFullYear()}-{date.getUTCMonth() + 1}-{date.getUTCDate()}"
				class="day-col-header">
				<Text class="day-name" weight="bold">
					{date
						.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })
						.toUpperCase()}
				</Text>
				<Text class="day-date" weight="bold">{date.getUTCDate()}</Text>
			</a>
		{/each}

		<!-- Grid rows -->
		{#each hours as hour}
			<Box class="time-label">
				<Text weight="bold">{formatHour(hour)}</Text>
			</Box>
			{#each new Array(7) as _, i (i)}
				{@const date = new Date(weekStart.getTime() + i * 86400000)}
				{@const dayEvents = events.filter((e) => {
					if (!timeframe.start) return false;
					const dayStart = date.getTime();
					const dayEnd = dayStart + 86400000;
					const eventStart = e.start * 1000;
					const eventEnd = eventStart + (e.duration || 86400) * 1000;
					const isOnDay = eventStart < dayEnd && eventEnd > dayStart;
					if (!isOnDay) return false;
					if (e.duration && e.duration < 86400) {
						// Filter to correct hour block
						const eventDate = new Date(eventStart);
						const eventHour = eventDate.getUTCHours();
						return eventHour === hour;
					}
					return false;
				})}
				<Box class="grid-cell">
					{#each dayEvents as event}
						<Text class="event-tag">{event.name}</Text>
					{/each}
				</Box>
			{/each}
		{/each}
	</Box>
</Box>

<style lang="scss">
	:global {
		.week-timebox {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
			padding: 1.5rem;
			box-sizing: border-box;
			gap: 1.5rem;

			.header-section {
				display: flex;
				gap: 2rem;

				.title {
					flex: 3;
				}
				.week-dates {
					flex: 1;
				}
			}

			.grid-table {
				display: grid;
				grid-template-columns: 3.3rem repeat(7, minmax(0, 1fr));
				grid-template-rows: 2.5rem repeat(var(--total-hours, 15), 1fr);
				border: 1px solid var(--outline);
				border-radius: 4px;
				flex: 1;
				overflow: hidden;
			}

			.time-col-header {
				background-color: var(--nav-bg-pdf);
				border-bottom: 2px solid var(--outline);
				border-right: 1px solid var(--outline);
			}

			.day-col-header {
				background-color: var(--nav-bg-pdf);
				border-bottom: 2px solid var(--outline);
				border-right: 1px solid var(--outline);
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 0.25rem;
				text-decoration: none;
				color: inherit;
				transition: background-color 0.2s ease;

				&:hover {
					background-color: var(--outline-low);
				}

				&:last-child {
					border-right: none;
				}

				.day-name {
					font-size: 0.6rem;
					color: var(--text-low);
				}

				.day-date {
					font-size: 0.8rem;
					color: var(--text);
				}
			}

			.time-label {
				font-size: 0.6rem;
				color: var(--text-low);
				display: flex;
				align-items: center;
				justify-content: center;
				border-bottom: 1px solid var(--outline);
				border-right: 1px solid var(--outline);
				background-color: var(--nav-bg-pdf);
			}

			.grid-cell {
				border-bottom: 1px solid var(--outline);
				border-right: 1px solid var(--outline);
				position: relative;
				padding: 0.1rem;

				&:last-of-type {
					border-right: none;
				}
			}

			.event-tag {
				font-size: 0.55rem;
				background-color: var(--outline-low);
				border-left: 2px solid var(--outline);
				padding: 0.05rem 0.2rem;
				color: var(--text);
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
</style>
