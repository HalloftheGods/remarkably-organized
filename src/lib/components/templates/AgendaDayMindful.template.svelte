<script lang="ts">
	import type { CalendarEvent, PlannerSettings, Timeframe } from '$lib';
	import { AgendaDay } from '$templates';

	import { Grid } from '$molecules';

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
	const isTimelineOnLeft = $derived(settings?.sideNav?.leftSide !== false);
	const isLandscape = $derived(settings?.design.orientation === 'landscape');
	const nRows = {
		tasks: isLandscape ? 6 : 2,
		morning: isLandscape ? 2 : 3,
	};
</script>

<div
	class="planner page agenda-day-mindful {isTimelineOnLeft
		? 'timeline-left'
		: 'timeline-right'}">
	<div class="mindful-col">
		<div class="intention-section">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">☀️</span>{/if} Morning Intention
			</div>
			<span class="instruction-text">Today I will focus on...</span>
			<div class="lines pt-1">
				<Grid display="dotted" columns={6} lines={5} />
			</div>
		</div>

		<div class="gratitude-section">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">🙏</span>{/if} Grateful For . . .
			</div>
			<div class="lines gap-2 pt-1">
				{#each new Array(3) as _, i}
					<div class="numbered-line">
						<span class="number">{i + 1}.</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="agenda-container">
			<AgendaDay
				{settings}
				{timeframe}
				{events}
				{use24HourClock}
				{startTime}
				{endTime}
				{interval} />
		</div>
	</div>

	<div class="tracking-col">
		<div class="tasks-section [&_.lined]:!pb-[5px]">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">✅</span>{/if} Today's Tasks
			</div>
			<div class="grid-container">
				<Grid display="todo" columns={1} lines={15} />
			</div>
		</div>

		<div class="wellness-section">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">💚</span>{/if} Wellness
			</div>
			<div class="wellness-trackers">
				<div class="tracker-row">
					<span class="tracker-label">Water</span>
					<div class="tracker-items">
						{#each new Array(8) as _}
							<div class="circle"></div>
						{/each}
					</div>
				</div>
				<div class="tracker-row">
					<span class="tracker-label">Move</span>
					<div class="tracker-items">
						{#each new Array(4) as _}
							<div class="circle"></div>
						{/each}
					</div>
				</div>
				<div class="tracker-row">
					<span class="tracker-label">Meals</span>
					<div class="tracker-items">
						{#each ['Breakfast', 'Lunch', 'Dinner', 'Snack'] as meal}
							<div class="meal-label">{meal}</div>
						{/each}
					</div>
				</div>
				<div class="tracker-row">
					<span class="tracker-label">Sleep</span>
					<div class="sleep-input"></div>
					<span class="tracker-unit">Hours</span>
				</div>
				<div class="tracker-row">
					<span class="tracker-label">Energy</span>
					<div class="energy-bars">
						{#each new Array(5) as _, i}
							<div class="bar" style="height: {(i + 1) * 20}%"></div>
						{/each}
					</div>
				</div>
				<div class="tracker-row">
					<span class="tracker-label">Mood</span>
					<div class="mood-emojis">
						{#each ['😤', '😟', '😴', '😐', '🙂', '😊'] as emoji}
							<div class="emoji-circle">{emoji}</div>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<div class="evening-section">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">🌙</span>{/if} Evening Reflection
			</div>
			<div class="reflection-prompts">
				<div class="prompt">
					<span class="instruction-text">Win of the day</span>
					<div class="line"></div>
				</div>
				<div class="prompt">
					<span class="instruction-text">What I learned</span>
					<div class="line"></div>
				</div>
				<div class="prompt">
					<span class="instruction-text">Tomorrow I will</span>
					<div class="line"></div>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@use '$lib/styles/app.css';

	.agenda-day-mindful {
		&.timeline-left {
			@apply flex-row;

			.mindful-col {
				@apply border-r border-[var(--outline)] pr-0;
			}
		}

		&.timeline-right {
			@apply flex-row-reverse;

			.mindful-col {
				@apply border-l border-[var(--outline)] pl-0;
			}
		}

		.mindful-col {
			@apply flex flex-col flex-1 h-full;

			.intention-section {
				@apply flex flex-col pt-2 pl-4 pb-3;
			}

			.gratitude-section {
				@apply flex flex-col pl-4 pb-3 border-b border-[var(--outline)];

				.numbered-line {
					@apply flex items-end border-b border-[var(--outline)] h-[1.4rem] pb-[0.15rem];

					.number {
						@apply font-light text-[0.8em] text-[var(--text-low)] mr-2;
					}
				}
			}

			.agenda-container {
				@apply flex-1 min-h-0 pt-5 pl-3;
			}
		}

		.tracking-col {
			@apply flex flex-col flex-1 h-full gap-6 pt-2;

			.tasks-section {
				@apply flex flex-col flex-1 min-h-0;

				.grid-container {
					@apply flex-1 min-h-0 flex flex-col relative overflow-hidden;
				}
			}

			.wellness-section {
				@apply flex flex-col flex-none border-t border-b border-[var(--outline)] py-3;

				.wellness-trackers {
					@apply flex flex-col gap-[0.6rem];

					.tracker-row {
						@apply flex items-center gap-3;

						.tracker-label {
							@apply text-[0.75em] text-[var(--text-low)] font-bold uppercase tracking-[0.5px] w-14 shrink-0;
						}

						.tracker-items {
							@apply flex gap-[0.4rem];

							.circle {
								@apply w-[0.9rem] h-[0.9rem] border border-[var(--outline)] rounded-full;
							}

							.meal-label {
								@apply text-[0.75em] text-[var(--text-low)] font-bold tracking-[1px];
							}
						}

						.sleep-input {
							@apply flex-none w-12 border-b border-[var(--outline)] h-4;
						}

						.tracker-unit {
							@apply text-[0.8em] text-[var(--text-low)];
						}

						.energy-bars {
							@apply flex items-end gap-1 h-[1.2rem];

							.bar {
								@apply w-[0.9rem] border border-[var(--outline)] rounded-sm;
							}
						}

						.mood-emojis {
							@apply flex gap-[0.4rem];

							.emoji-circle {
								@apply w-[1.6rem] h-[1.6rem] flex items-center justify-center text-[1.1em] grayscale-[0.3] opacity-80;
							}
						}
					}
				}
			}

			.evening-section {
				@apply flex flex-col flex-none;

				.reflection-prompts {
					@apply flex flex-col gap-[0.6rem];

					.prompt {
						@apply flex flex-col;
					}
				}
			}
		}

		.instruction-text {
			@apply text-[0.85em] text-[var(--text-low)] mb-1 pl-1;
		}
	}
</style>
