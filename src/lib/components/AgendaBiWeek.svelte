<script lang="ts">
	import { getFirstDayOfWeek, type Timeframe, type CalendarEvent } from '$lib';

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

<div class="agenda-biweek">
	<div class="header-section">
		<div class="field title">
			<div class="label">
				{#if !settings?.emojis?.disable}🏃{/if} BI-WEEKLY PLANNER / SPRINT LOG
			</div>
			<div class="line"></div>
		</div>
		<div class="field dates">
			<div class="label">SPRINT CYCLE DATES</div>
			<div class="line"></div>
		</div>
	</div>

	<div class="weeks-container">
		<!-- Week 1 -->
		<div class="week-column">
			<div class="week-title">WEEK 1</div>
			<div class="days-list">
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
					<div class="day-row">
						<div class="day-label">
							<span class="short-name">
								{date.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}
							</span>
							<span class="date-num">{date.getUTCDate()}</span>
						</div>
						<div class="day-notes">
							{#each dayEvents as event}
								<span class="event-tag">{event.name}</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Week 2 -->
		<div class="week-column">
			<div class="week-title">WEEK 2</div>
			<div class="days-list">
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
					<div class="day-row">
						<div class="day-label">
							<span class="short-name">
								{date.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}
							</span>
							<span class="date-num">{date.getUTCDate()}</span>
						</div>
						<div class="day-notes">
							{#each dayEvents as event}
								<span class="event-tag">{event.name}</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.agenda-biweek {
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
			flex: 2;
		}
		.dates {
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

	.weeks-container {
		display: flex;
		gap: 1.5rem;
		flex: 1;
	}

	.week-column {
		flex: 1;
		display: flex;
		flex-direction: column;
		border: 1px solid var(--outline);
		border-radius: 4px;
	}

	.week-title {
		background-color: var(--nav-bg-pdf, #f8f8f8);
		border-bottom: 2px solid var(--outline);
		padding: 0.5rem;
		font-weight: bold;
		font-size: 0.75rem;
		color: var(--text);
		text-align: center;
		letter-spacing: 1px;
	}

	.days-list {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.day-row {
		flex: 1;
		display: flex;
		border-bottom: 1px solid var(--outline);
		min-height: 0;

		&:last-child {
			border-bottom: none;
		}
	}

	.day-label {
		width: 2.5rem;
		border-right: 1px solid var(--outline);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: var(--nav-bg-pdf, #f8f8f8);
		padding: 0.25rem;

		.short-name {
			font-size: 0.6rem;
			color: var(--text-low);
			font-weight: bold;
		}

		.date-num {
			font-size: 0.8rem;
			font-weight: bold;
			color: var(--text);
		}
	}

	.day-notes {
		flex: 1;
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		overflow: hidden;
	}

	.event-tag {
		font-size: 0.65rem;
		background-color: var(--nav-bg-pdf, rgba(0, 0, 0, 0.03));
		border-left: 2px solid var(--outline);
		padding: 0.1rem 0.25rem;
		color: var(--text);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
