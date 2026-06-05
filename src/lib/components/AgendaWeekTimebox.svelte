<script lang="ts">
	import { getFirstDayOfWeek, type Timeframe, type CalendarEvent } from '$lib';

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

<div class="week-timebox">
	<div class="header-section">
		<div class="field title">
			<div class="label">
				{#if !settings?.emojis?.disable}📅{/if} WEEKLY TIME-BLOCKED AGENDA
			</div>
			<div class="line"></div>
		</div>
		<div class="field week-dates">
			<div class="label">WEEK OF</div>
			<div class="line"></div>
		</div>
	</div>

	<div class="grid-table" style="--total-hours: {hours.length};">
		<!-- Top header row -->
		<div class="time-col-header"></div>
		{#each new Array(7) as _, i (i)}
			{@const date = new Date(weekStart.getTime() + i * 86400000)}
			<div class="day-col-header">
				<span class="day-name">
					{date
						.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })
						.toUpperCase()}
				</span>
				<span class="day-date">{date.getUTCDate()}</span>
			</div>
		{/each}

		<!-- Grid rows -->
		{#each hours as hour}
			<div class="time-label">{formatHour(hour)}</div>
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
				<div class="grid-cell">
					{#each dayEvents as event}
						<div class="event-tag">{event.name}</div>
					{/each}
				</div>
			{/each}
		{/each}
	</div>
</div>

<style lang="scss">
	.week-timebox {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 1.5rem;
		box-sizing: border-box;
		gap: 1.5rem;
	}

	.header-section {
		display: flex;
		gap: 2rem;

		.field {
			display: flex;
			flex-direction: column;
		}
		.title {
			flex: 3;
		}
		.week-dates {
			flex: 1;
		}
	}

	.label {
		font-size: 0.75rem;
		font-weight: bold;
		color: var(--text-low);
		margin-bottom: 0.25rem;
		letter-spacing: 0.5px;
	}

	.line {
		border-bottom: 1px solid var(--outline);
		height: 1.5rem;
		width: 100%;
	}

	.grid-table {
		display: grid;
		grid-template-columns: 3rem repeat(7, minmax(0, 1fr));
		grid-template-rows: 2.5rem repeat(var(--total-hours, 15), 1fr);
		border: 1px solid var(--outline);
		border-radius: 4px;
		flex: 1;
		overflow: hidden;
	}

	.time-col-header {
		background-color: var(--nav-bg-pdf, #f8f8f8);
		border-bottom: 2px solid var(--outline);
		border-right: 1px solid var(--outline);
	}

	.day-col-header {
		background-color: var(--nav-bg-pdf, #f8f8f8);
		border-bottom: 2px solid var(--outline);
		border-right: 1px solid var(--outline);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0.25rem;

		&:last-child {
			border-right: none;
		}

		.day-name {
			font-size: 0.6rem;
			color: var(--text-low);
			font-weight: bold;
		}

		.day-date {
			font-size: 0.8rem;
			font-weight: bold;
			color: var(--text);
		}
	}

	.time-label {
		font-size: 0.6rem;
		color: var(--text-low);
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1px solid var(--outline);
		border-right: 1px solid var(--outline);
		background-color: var(--nav-bg-pdf, #f8f8f8);
	}

	.grid-cell {
		border-bottom: 1px solid var(--outline);
		border-right: 1px solid var(--outline);
		position: relative;
		padding: 0.1rem;

		&:last-child {
			border-right: none;
		}
	}

	.event-tag {
		font-size: 0.55rem;
		background-color: var(--nav-bg-pdf, rgba(0, 0, 0, 0.03));
		border-left: 2px solid var(--outline);
		padding: 0.05rem 0.2rem;
		color: var(--text);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
