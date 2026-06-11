<script lang="ts">
	import RowInput from '$atoms/RowInput.svelte';
	import {
		type CalendarEvent,
		type Timeframe,
		filterAgendaEvents,
		calculateSplitAgendaMetrics,
		calculateEventStyle,
	} from '$lib';
	import { AgendaEvent } from '$molecules';

	let {
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		use24HourClock = false,
		startTime = 0,
		endTime = 24,
		interval = 60,
		settings = undefined as any,
	} = $props();

	const metrics = $derived(calculateSplitAgendaMetrics(startTime, endTime, interval));

	const dayEvents = $derived(
		(timeframe.start && settings?.eventsByDay?.[timeframe.start.getTime()]) || [],
	);

	const agendaEvents = $derived(
		filterAgendaEvents(dayEvents, timeframe, metrics.safeStartTime, metrics.safeEndTime),
	);

	const hasAllDayEvents = $derived(agendaEvents.allDayEvents.length > 0);
</script>

<div class="planner page agenda-day-split">
	{#if hasAllDayEvents}
		<div class="all-day-section">
			<div class="all-day-label">
				<span>
					All
					<br />
					Day
				</span>
			</div>
			<div class="all-day-events">
				{#each agendaEvents.allDayEvents as event}
					<AgendaEvent {event} type="all-day" />
				{/each}
			</div>
		</div>
	{/if}

	<div class="split-grid">
		<!-- AM Section -->
		<div
			class="time-section am-section"
			style="grid-template-rows: repeat(var(--total-rows), 1fr); --total-rows: {metrics.maxTotalRows};">
			{#each new Array(metrics.numAmHours) as _, h (h)}
				{@const hour = metrics.amStart + h}
				{@const isStandardHour = hour > 0 && hour < 24}
				{@const isMidnight = hour === 24}
				<div
					class="time-label"
					style="grid-column: 1; grid-row: {h * metrics.rowsPerHour +
						1} / span {metrics.rowsPerHour};">
					{#if use24HourClock}
						<span>{hour.toString().padStart(2, '0')}:00</span>
					{:else if isStandardHour}
						<span>
							{hour === 12 ? 12 : hour % 12}
							<small>{hour < 12 ? 'AM' : 'PM'}</small>
						</span>
					{:else if isMidnight}
						<span>
							12 <small>AM</small>
						</span>
					{:else}
						<span>
							12 <small>AM</small>
						</span>
					{/if}
				</div>
			{/each}

			{#each new Array(metrics.amTotalRows) as _, r (r)}
				<div
					class="grid-line {r % metrics.rowsPerHour === 0 ? '' : 'sub-line'}"
					style="grid-column: 2; grid-row: {r + 1};">
					<RowInput />
				</div>
			{/each}

			<div class="events-container" style="grid-row: 1 / span {metrics.amTotalRows};">
				{#each agendaEvents.timedEvents as event}
					{@const eventStartMs = event.start * 1000 - timeframe.start.getTime()}
					{@const eventDurationMs = event.duration ? event.duration * 1000 : 0}
					{@const agendaStartMs = metrics.amStart * 3600000}
					{@const agendaEndMs = metrics.amEnd * 3600000}
					{@const style = calculateEventStyle(
						eventStartMs,
						eventDurationMs,
						agendaStartMs,
						agendaEndMs,
					)}

					{#if style.isVisible}
						<AgendaEvent
							{event}
							type="timed"
							class="w-1/2"
							style="top: {style.top}%; height: {style.height}%;" />
					{/if}
				{/each}
			</div>
		</div>

		<!-- PM Section -->
		<div
			class="time-section pm-section"
			style="grid-template-rows: repeat(var(--total-rows), 1fr); --total-rows: {metrics.maxTotalRows};">
			{#each new Array(metrics.numPmHours) as _, h (h)}
				{@const hour = metrics.pmStart + h}
				{@const isStandardHour = hour > 0 && hour < 24}
				{@const isMidnight = hour === 24}
				<div
					class="time-label"
					style="grid-column: 1; grid-row: {h * metrics.rowsPerHour +
						1} / span {metrics.rowsPerHour};">
					{#if use24HourClock}
						<span>{hour.toString().padStart(2, '0')}:00</span>
					{:else if isStandardHour}
						<span>
							{hour === 12 ? 12 : hour % 12}
							<small>{hour < 12 ? 'AM' : 'PM'}</small>
						</span>
					{:else if isMidnight}
						<span>
							12 <small>AM</small>
						</span>
					{:else}
						<span>
							12 <small>AM</small>
						</span>
					{/if}
				</div>
			{/each}

			{#each new Array(metrics.pmTotalRows) as _, r (r)}
				<div
					class="grid-line {r % metrics.rowsPerHour === 0 ? '' : 'sub-line'}"
					style="grid-column: 2; grid-row: {r + 1};">
					<RowInput />
				</div>
			{/each}

			<div class="events-container" style="grid-row: 1 / span {metrics.pmTotalRows};">
				{#each agendaEvents.timedEvents as event}
					{@const eventStartMs = event.start * 1000 - timeframe.start.getTime()}
					{@const eventDurationMs = event.duration ? event.duration * 1000 : 0}
					{@const agendaStartMs = metrics.pmStart * 3600000}
					{@const agendaEndMs = metrics.pmEnd * 3600000}
					{@const style = calculateEventStyle(
						eventStartMs,
						eventDurationMs,
						agendaStartMs,
						agendaEndMs,
					)}

					{#if style.isVisible}
						<AgendaEvent
							{event}
							type="timed"
							class="w-1/2"
							style="top: {style.top}%; height: {style.height}%;" />
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@use '$lib/styles/app.css';
	.agenda-day-split {
		.all-day-section {
			@apply grid grid-cols-[2.5rem_1fr] w-full py-1 shrink-0;
		}
		.all-day-label {
			@apply flex items-center justify-center text-[0.6em] font-light text-[var(--text-sidebar,var(--text-low))] text-center;
		}
		.all-day-events {
			@apply flex flex-wrap gap-2 px-2 items-center;
		}
		.split-grid {
			@apply grid grid-cols-2 w-full h-full gap-0;
		}
		.time-section {
			@apply relative grid grid-cols-[2.5rem_1fr] w-full h-full justify-items-stretch items-stretch grid-flow-col pt-4;

			&.am-section {
				@apply pr-2 border-r border-[var(--outline)];
			}
			&.pm-section {
				@apply pl-1 pr-[5px] bg-[var(--nav-bg-pdf,var(--bg-high))] text-[var(--text-sidebar,var(--text-low))];
			}
		}
		.time-label {
			@apply text-center col-start-1 font-light text-[0.7em] text-[var(--text-sidebar,var(--text-low))] -mt-2;

			small {
				@apply text-[0.6em] text-inherit;
			}
		}
		.grid-line {
			@apply relative after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:border-t after:border-[var(--outline)];

			&.sub-line {
				@apply after:border-solid after:opacity-50;
			}
		}
		.events-container {
			@apply col-start-2 relative pointer-events-none;
		}
	}
</style>
