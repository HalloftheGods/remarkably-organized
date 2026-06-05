<script lang="ts">
	import {
		formatToString,
		getFirstDayOfWeek,
		type Timeframe,
		type CalendarEvent,
		isMoonEvent,
		getMoonEmoji,
	} from '$lib';

	let {
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		startWeekOnSunday = false,
		alignDayText = 'left' as 'left' | 'center' | 'right',
		display = 'grid' as 'grid' | 'columns' | 'rows',
		settings = undefined as any,
	} = $props();

	const isDateDisabled = (date: Date) => {
		if (!settings) return false;
		if (settings.dayPage?.disable) return true;
		const time = date.getTime();
		const start = settings.date?.start?.getTime() || 0;
		const end = settings.date?.end?.getTime() || Infinity;
		return time < start || time > end;
	};

	const weekStart = $derived(
		timeframe.weekStart || new Date(getFirstDayOfWeek(new Date(), startWeekOnSunday)),
	);
</script>

<div class="week {display} align-{alignDayText}">
	{#each new Array(7) as _, i (i)}
		{@const date = new Date(weekStart.getTime() + i * 86400000)}
		{@const moonEvent = events.find(
			(e) => !e.duration && e.start * 1000 === date.getTime() && isMoonEvent(e),
		)}
		{@const dayEvents = events.filter((e) => {
			const dayStart = date.getTime();
			const dayEnd = dayStart + 86400000;
			const eventStart = e.start * 1000;
			const eventEnd = eventStart + (e.duration || 86400) * 1000;
			const isMoon = isMoonEvent(e);
			const isWithinDay = eventStart < dayEnd && eventEnd > dayStart;
			return isWithinDay && !isMoon;
		})}
		{#if timeframe.weekStart}
			<a
				class="day"
				class:dim={isDateDisabled(date)}
				href="#{date.getUTCFullYear()}-{date.getUTCMonth() + 1}-{date.getUTCDate()}">
				<div class="day-header">
					{#if moonEvent}
						<span class="moon">{getMoonEmoji(moonEvent.name)}</span>
					{/if}
					{#if display === 'columns'}
						{date.toLocaleString('default', { weekday: 'long', timeZone: 'UTC' })}
						<br />
						{date.toLocaleString('default', { month: 'short', timeZone: 'UTC' })}
					{:else}
						{date.toLocaleString('default', { weekday: 'long', timeZone: 'UTC' })}, {date.toLocaleString(
							'default',
							{ month: 'long', timeZone: 'UTC' },
						)}
					{/if}
					{@html formatToString(date.getUTCDate(), { type: 'ordinal', html: true })}
				</div>
				{#if dayEvents.length > 0}
					<div class="events-list">
						{#each dayEvents as event}
							<div class="event-item" title={event.name}>
								{#if event.duration && event.duration < 86400}
									{@const eventTime = new Date(event.start * 1000)}
									<span class="event-time">
										{eventTime.toLocaleTimeString('default', {
											hour: 'numeric',
											minute: '2-digit',
											hour12: true,
											timeZone: 'UTC'
										}).replace(':00', '')}
									</span>
								{/if}
								<span class="event-name">{event.name}</span>
							</div>
						{/each}
					</div>
				{/if}
			</a>
		{:else}
			<div class="day" class:dim={isDateDisabled(date)}>
				<div class="day-header">
					{#if moonEvent}
						<span class="moon">{getMoonEmoji(moonEvent.name)}</span>
					{/if}
					{#if display === 'columns'}
						{date.toLocaleString('default', { weekday: 'long', timeZone: 'UTC' })}
						<br />
						{date.toLocaleString('default', { month: 'short', timeZone: 'UTC' })}
					{:else}
						{date.toLocaleString('default', { weekday: 'long', timeZone: 'UTC' })}, {date.toLocaleString(
							'default',
							{ month: 'long', timeZone: 'UTC' },
						)}
					{/if}
				</div>
				{#if dayEvents.length > 0}
					<div class="events-list">
						{#each dayEvents as event}
							<div class="event-item" title={event.name}>
								{#if event.duration && event.duration < 86400}
									{@const eventTime = new Date(event.start * 1000)}
									<span class="event-time">
										{eventTime.toLocaleTimeString('default', {
											hour: 'numeric',
											minute: '2-digit',
											hour12: true,
											timeZone: 'UTC'
										}).replace(':00', '')}
									</span>
								{/if}
								<span class="event-name">{event.name}</span>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	{/each}
	<div class="day notes">Notes</div>
</div>

<style lang="scss">
	.week {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: repeat(4, 1fr);
		width: 100%;
		height: 100%;
		justify-items: stretch;
		align-items: stretch;

		&.columns {
			grid-template-columns: repeat(7, 1fr);
			grid-template-rows: 1fr;
			.notes {
				display: none;
			}
			.day {
				border-top: none;
				&:not(:first-child) {
					border-left: solid 1px var(--outline);
				}
			}
		}
		&.rows {
			grid-template-columns: 1fr;
			grid-template-rows: repeat(7, 1fr);
			.notes {
				display: none;
			}
		}
		&.grid {
			.day {
				&:nth-child(1),
				&:nth-child(2) {
					border-top: none;
				}
				&:nth-child(2n) {
					border-left: solid 1px var(--outline);
				}
			}
		}
		&.align-center {
			.day {
				text-align: center;
				.moon {
					float: none;
					display: inline-block;
					margin-left: 0.25rem;
				}
			}
		}
		&.align-right {
			.day {
				text-align: right;
				.moon {
					float: left;
				}
			}
		}
	}
	.day {
		font-size: 0.9em;
		border-top: solid 1px var(--outline);
		text-align: left;
		padding: 0.5rem 0.5rem 0.5rem;
		font-weight: var(--font-weight-light);
		display: flex;
		flex-direction: column;
		min-height: 0;
		overflow: hidden;

		:global(.ordinal) {
			font-size: 0.75em;
			vertical-align: text-top;
		}

		.moon {
			float: right;
			font-size: 1.1em;
			vertical-align: text-top;
			line-height: 1;
		}
	}
	.day.dim {
		opacity: 0.35;
		pointer-events: none;
	}
	.day-header {
		width: 100%;
	}
	.events-list {
		display: flex;
		flex-direction: column;
		gap: 2px;
		margin-top: 0.35rem;
		width: 100%;
		overflow: hidden;
	}
	.event-item {
		font-size: 0.75em;
		line-height: 1.2;
		padding: 0.1rem 0.25rem;
		background-color: var(--event-bg, rgba(0, 0, 0, 0.03));
		border-left: solid 2px var(--outline);
		border-radius: 2px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: flex;
		gap: 0.25rem;
		align-items: center;
		color: var(--text);

		.event-time {
			font-size: 0.85em;
			color: var(--text-low);
			font-weight: 500;
			flex-shrink: 0;
		}
		.event-name {
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
</style>
