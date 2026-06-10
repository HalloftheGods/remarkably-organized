<script lang="ts">
	import type { PlannerSettings } from '$lib';

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
		<div class="field title-field">
			<label>
				{#if showEmoji}
					<span class="emoji">⚡</span>
				{/if}
				ENERGY & MOOD MATRIX
			</label>
			<div class="content"></div>
		</div>
		<div class="field date-field">
			<label>
				{#if showEmoji}
					<span class="emoji">📅</span>
				{/if} DATE
			</label>
			<div class="content date-slashes">
				<span>/</span>
				<span>/</span>
			</div>
		</div>
	</header>

	<div class="matrix-content">
		<div class="trackers-row">
			<div class="tracker-section">
				<div class="section-header">
					{#if showEmoji}<span class="emoji">🔋</span>{/if} Energy Level
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
					<div class="quadrant-title">
						{#if showEmoji}<span class="emoji">🤬</span>{/if}
						Tense & Anxious
					</div>
					<div class="quadrant-subtitle">Stressed, Frustrated, Nervous, Angry</div>
					<div class="lines">
						{#each new Array(nRows.energy) as _}
							<div class="line"></div>
						{/each}
					</div>
				</div>

				<!-- Top Right: High Energy / Positive -->
				<div class="quadrant high-energy positive">
					<div class="quadrant-title">
						{#if showEmoji}<span class="emoji">🤩</span>{/if}
						Excited & Energized
					</div>
					<div class="quadrant-subtitle">Happy, Alert, Motivated, Elated</div>
					<div class="lines">
						{#each new Array(nRows.energy) as _}
							<div class="line"></div>
						{/each}
					</div>
				</div>

				<!-- Bottom Left: Low Energy / Negative -->
				<div class="quadrant low-energy negative">
					<div class="quadrant-title">
						{#if showEmoji}<span class="emoji">🫠</span>{/if}
						Tired & Sluggish
					</div>
					<div class="quadrant-subtitle">Sad, Depressed, Lethargic, Fatigued</div>
					<div class="lines">
						{#each new Array(nRows.energy) as _}
							<div class="line"></div>
						{/each}
					</div>
				</div>

				<!-- Bottom Right: Low Energy / Positive -->
				<div class="quadrant low-energy positive">
					<div class="quadrant-title">
						{#if showEmoji}<span class="emoji">😌</span>{/if}
						Calm & Peaceful
					</div>
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
			.title-field {
				@apply flex-[3];
			}

			.date-field {
				@apply flex-1;

				.date-slashes {
					@apply flex items-end justify-evenly pb-[2px] text-[var(--outline-high,#ccc)] text-[1.2rem] font-light;

					span {
						@apply leading-none;
					}
				}
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
