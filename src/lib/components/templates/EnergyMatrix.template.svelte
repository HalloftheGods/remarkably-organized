<script lang="ts">
	import Emoji from '$atoms/Emoji.svelte';
	import Label from '$atoms/Label.svelte';
	import type { PlannerSettings } from '$lib';
	import DateSlashes from '$molecules/DateSlashes.svelte';
	import DateField from '$molecules/DateSlashes.svelte';
	import Field from '$molecules/Field.molecule.svelte';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	const isLandscape = $derived(settings.design.orientation === 'landscape');
	const nRows = $derived({
		quadrant: 6,
		energy: isLandscape ? 7 : 6,
		notes: isLandscape ? 4 : 3,
	});
</script>

<div class="planner page energy-matrix">
	<header>
		<div class="title field">
			<Label i="⚡">ENERGY & MOOD MATRIX</Label>
			<div class="content"></div>
		</div>

		<div class="date field">
			<DateSlashes />
		</div>
	</header>

	<div class="matrix-content">
		<div class="trackers-row">
			<div class="tracker-section">
				<div class="section-header">
					<Emoji>🔋</Emoji>
					Energy Level
				</div>
				<div class="energy-gauge">
					{#each new Array(nRows.quadrant) as _, i}
						<div class="gauge-bar" style="height: {(i + 1) * 20}%"></div>
					{/each}
				</div>
			</div>

			<div class="tracker-section">
				<div class="section-header">
					{#if showEmoji}<span class="emoji">🎭</span>{/if} Overall Mood
				</div>
				<div class="mood-emojis">
					{#each ['😤', '😟', '😴', '😐', '🙂', '😊'] as emoji}
						<div class="emoji-circle">{emoji}</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="matrix-container">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">🧬</span>{/if} Emotion Quadrants
			</div>
			<div class="quadrants {isLandscape ? 'grid-cols-4' : 'grid-cols-2'}">
				<!-- Top Left: High Energy / Negative -->
				<div class="quadrant high-energy negative">
					<strong class="quadrant-title">
						{#if showEmoji}<span class="emoji">🤬</span>{/if}
						Tense & Anxious
					</strong>
					<div class="quadrant-subtitle">Stressed, Frustrated, Nervous, Angry</div>
					<div class="lines">
						{#each new Array(nRows.energy) as _}
							<div class="line"></div>
						{/each}
					</div>
				</div>

				<!-- Top Right: High Energy / Positive -->
				<div class="quadrant high-energy positive">
					<strong class="quadrant-title">
						{#if showEmoji}<span class="emoji">🤩</span>{/if}
						Excited & Energized
					</strong>
					<div class="quadrant-subtitle">Happy, Alert, Motivated, Elated</div>
					<div class="lines">
						{#each new Array(nRows.energy) as _}
							<div class="line"></div>
						{/each}
					</div>
				</div>

				<!-- Bottom Left: Low Energy / Negative -->
				<div class="quadrant low-energy negative">
					<strong class="quadrant-title">
						{#if showEmoji}<span class="emoji">🫠</span>{/if}
						Tired & Sluggish
					</strong>
					<div class="quadrant-subtitle">Sad, Depressed, Lethargic, Fatigued</div>
					<div class="lines">
						{#each new Array(nRows.energy) as _}
							<div class="line"></div>
						{/each}
					</div>
				</div>

				<!-- Bottom Right: Low Energy / Positive -->
				<div class="quadrant low-energy positive">
					<strong class="quadrant-title">
						{#if showEmoji}<span class="emoji">😌</span>{/if}
						Calm & Peaceful
					</strong>
					<div class="quadrant-subtitle">Relaxed, Serene, Content, Rested</div>
					<div class="lines">
						{#each new Array(nRows.energy) as _}
							<div class="line"></div>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<div class="notes-section">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">📝</span>{/if} Reflections & Triggers
			</div>
			<div class="lines">
				{#each new Array(nRows.notes) as _}
					<div class="line"></div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@use '$lib/styles/app.css';

	.energy-matrix {
		header {
			.title {
				@apply flex-[3];
			}

			.date {
				@apply flex-1;
			}
		}

		.matrix-content {
			@apply flex flex-col flex-1 gap-2 pt-2;
		}

		.trackers-row {
			@apply flex gap-4;

			.tracker-section {
				@apply flex-1 flex flex-col gap-0;
			}
		}

		.energy-gauge {
			@apply flex items-end gap-1 h-8 pt-1;

			.gauge-bar {
				@apply flex-1 border border-[var(--outline)] rounded-sm bg-[rgba(128,128,128,0.05)];
			}
		}

		.mood-emojis {
			@apply flex justify-around items-center h-8 pt-1;

			.emoji-circle {
				@apply flex items-center justify-center text-[1.3rem] grayscale-[0.3] opacity-80;
			}
		}

		.matrix-container {
			@apply flex flex-col flex-1 min-h-0
			gap-1;
			.quadrants {
				@apply grid 

					gap-1
					flex-1 
					overflow-hidden;

				.quadrant {
					@apply flex flex-col p-2
border border-[var(--outline)]
						rounded-md text-center;

					/* Internal grid borders to prevent double borders */
					/* Quadrant tints */
					&.high-energy.negative {
						@apply bg-[rgba(239,68,68,0.05)];
					}
					&.high-energy.positive {
						@apply bg-[rgba(249,115,22,0.05)];
					}
					&.low-energy.negative {
						@apply bg-[rgba(168,85,247,0.05)];
					}
					&.low-energy.positive {
						@apply bg-[rgba(34,197,94,0.05)];
					}

					.quadrant-title {
						@apply font-bold text-[0.85rem] text-[var(--text)] uppercase tracking-[0.5px];
					}

					.quadrant-subtitle {
						@apply text-[0.7rem] text-[var(--text-low)] mb-3;
					}

					.lines {
						@apply flex flex-col gap-3 flex-1;

						.line {
							@apply border-b border-[var(--outline)] h-5;
						}
					}
				}
			}
		}

		.notes-section {
			@apply flex flex-col mt-2;

			.lines {
				@apply flex flex-col gap-3;

				.line {
					@apply border-b border-[var(--outline)] h-5;
				}
			}
		}
	}
</style>
