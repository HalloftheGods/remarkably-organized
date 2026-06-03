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
		{#if timeframe.weekStart}
			<a
				class="day"
				class:dim={isDateDisabled(date)}
				href="#{date.getUTCFullYear()}-{date.getUTCMonth() + 1}-{date.getUTCDate()}">
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
			</a>
		{:else}
			<div class="day" class:dim={isDateDisabled(date)}>
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
		padding: 0.5rem 0.5rem 0;
		font-weight: var(--font-weight-light);

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
</style>
