<script lang="ts">
	import {
		formatToString,
		getFirstDayOfWeek,
		getDateHash,
		type Timeframe,
		type CalendarEvent,
		isMoonEvent,
		getMoonEmoji,
	} from '$lib';
	import { Box, Text } from '$atoms';
	import { Grid } from '$molecules';

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
	const isSidebarLeft = $derived(settings?.sideNav?.leftSide ?? false);
</script>

<Box
	class="notes-week-wrapper"
	style="--sidebar-padding-left: {isSidebarLeft
		? '2rem'
		: '0'}; --sidebar-padding-right: {isSidebarLeft ? '0' : '2rem'}">
	<Grid display="dotted-small" />
	<Box class="notes-week {display} align-{alignDayText}">
		{#each new Array(7) as _, i (i)}
			{@const date = new Date(weekStart.getTime() + i * 86400000)}
			{@const moonEvent = events.find(
				(e) => !e.duration && e.start * 1000 === date.getTime() && isMoonEvent(e),
			)}
			{@const allDayEvents = (settings?.eventsByDay?.[date.getTime()] ||
				[]) as CalendarEvent[]}
			{@const dayEvents = allDayEvents.filter((e) => !isMoonEvent(e))}
			{#if timeframe.weekStart}
				<a class="day {isDateDisabled(date) ? 'dim' : ''}" href={getDateHash(date)}>
					<Box class="day-header">
						{#if moonEvent}
							<Text tag="span" class="moon">{getMoonEmoji(moonEvent.name)}</Text>
						{/if}
						{#if display === 'columns'}
							<Text>
								{date.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}
								{@html formatToString(date.getUTCDate(), { type: 'ordinal', html: true })}
							</Text>
						{:else}
							<Text>
								{date.toLocaleString('default', { weekday: 'long', timeZone: 'UTC' })}, {date.toLocaleString(
									'default',
									{ month: 'long', timeZone: 'UTC' },
								)}
								{@html formatToString(date.getUTCDate(), { type: 'ordinal', html: true })}
							</Text>
						{/if}
					</Box>
					{#if dayEvents.length > 0}
						<Box class="events-list">
							{#each dayEvents as event}
								<Box class="event-item" title={event.name}>
									{#if event.duration && event.duration < 86400}
										{@const eventTime = new Date(event.start * 1000)}
										<Text tag="span" class="event-time">
											{eventTime
												.toLocaleTimeString('default', {
													hour: 'numeric',
													minute: '2-digit',
													hour12: true,
													timeZone: 'UTC',
												})
												.replace(':00', '')}
										</Text>
									{/if}
									<Text tag="span" class="event-name">{event.name}</Text>
								</Box>
							{/each}
						</Box>
					{/if}
				</a>
			{:else}
				<Box class="day {isDateDisabled(date) ? 'dim' : ''}">
					<Box class="day-header">
						{#if moonEvent}
							<Text tag="span" class="moon">{getMoonEmoji(moonEvent.name)}</Text>
						{/if}
						{#if display === 'columns'}
							<Text>
								{date.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}
								{@html formatToString(date.getUTCDate(), { type: 'ordinal', html: true })}
							</Text>
						{:else}
							<Text>
								{date.toLocaleString('default', { weekday: 'long', timeZone: 'UTC' })}, {date.toLocaleString(
									'default',
									{ month: 'long', timeZone: 'UTC' },
								)}
								{@html formatToString(date.getUTCDate(), { type: 'ordinal', html: true })}
							</Text>
						{/if}
					</Box>
					{#if dayEvents.length > 0}
						<Box class="events-list">
							{#each dayEvents as event}
								<Box class="event-item" title={event.name}>
									{#if event.duration && event.duration < 86400}
										{@const eventTime = new Date(event.start * 1000)}
										<Text tag="span" class="event-time">
											{eventTime
												.toLocaleTimeString('default', {
													hour: 'numeric',
													minute: '2-digit',
													hour12: true,
													timeZone: 'UTC',
												})
												.replace(':00', '')}
										</Text>
									{/if}
									<Text tag="span" class="event-name">{event.name}</Text>
								</Box>
							{/each}
						</Box>
					{/if}
				</Box>
			{/if}
		{/each}
		<Box class="day notes">
			<Text>Notes</Text>
		</Box>
	</Box>
</Box>

<style lang="scss">
	:global {
		.notes-week-wrapper {
			position: relative;
			width: 100%;
			height: 100%;
			padding-left: var(--sidebar-padding-left);
			padding-right: var(--sidebar-padding-right);
			--dots-top: 0px;
			:global(.dots) {
				position: absolute;
				top: var(--dots-top);
				left: 0;
				width: 100%;
				height: calc(100% - var(--dots-top));
				z-index: 0;
				padding: 0 !important;
			}
		}
		.notes-week {
			position: relative;
			z-index: 1;
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: repeat(4, 1fr);
			width: 100%;
			height: 100%;
			justify-items: stretch;
			align-items: stretch;
			gap: 0;

			&.columns {
				--dots-top: 3.25rem;
				grid-template-columns: repeat(7, minmax(0, 1fr));
				grid-template-rows: 1fr;
				.notes {
					display: none;
				}
				:global(.day) {
					border-top: none;
					flex-grow: 1;
					:global(.day-header) {
						border-bottom: solid 1px var(--outline);
						padding-bottom: 0.5rem;
						width: 100%;
						display: block;
						height: 3.25rem;
						box-sizing: border-box;
						&:nth-child(even) {
							background-color: var(--outline-low);
						}
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
				:global(.day) {
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
				:global(.day) {
					text-align: center;
					:global(.moon) {
						float: none;
						display: inline-block;
						margin-left: 0.25rem;
					}
				}
			}
			&.align-right {
				:global(.day) {
					text-align: right;
					:global(.moon) {
						float: left;
					}
				}
			}

			:global(.day) {
				font-size: 0.9em;
				border-top: solid 1px var(--outline);
				text-align: left;
				padding: 0;
				font-weight: var(--font-weight-light);
				display: flex;
				flex-direction: column;
				min-height: 0;
				overflow: hidden;
				text-decoration: none;
				color: inherit;

				:global(.day-header) {
					padding: 0.5rem;
				}

				:global(.ordinal) {
					font-size: 0.75em;
					vertical-align: text-top;
				}

				:global(.moon) {
					float: right;
					font-size: 1.1em;
					vertical-align: text-top;
					line-height: 1;
				}

				&.dim {
					opacity: 0.35;
					pointer-events: none;
				}
			}

			:global(.day-header) {
				width: 100%;
			}
			:global(.events-list) {
				display: flex;
				flex-direction: column;
				gap: 2px;
				margin-top: 0.35rem;
				width: 100%;
				overflow: hidden;
			}
			:global(.event-item) {
				font-size: 0.75em;
				line-height: 1.2;
				padding: 0.1rem 0.25rem;
				background-color: var(--outline-low);
				border-left: solid 2px var(--outline);
				border-radius: 2px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				display: flex;
				gap: 0.25rem;
				align-items: center;
				color: var(--text);

				:global(.event-time) {
					font-size: 0.85em;
					color: var(--text-low);
					font-weight: 500;
					flex-shrink: 0;
				}
				:global(.event-name) {
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>
