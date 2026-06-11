<script lang="ts">
	import RowInput from '$atoms/RowInput.svelte';
	import Emoji from '$atoms/Emoji.svelte';
	import Label from '$atoms/Label.svelte';
	import Field from '$atoms/Field.atom.svelte';
	import type { PlannerSettings } from '$lib';
	import DateSlashes from '$molecules/DateSlashes.svelte';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	const nRows = $derived({
		quadrant: 6,
		energy: settings?.isLandscape ? 7 : 6,
		notes: settings?.isLandscape ? 4 : 3,
	});

	const quadrants = [
		{
			emoji: '🤬',
			title: 'Tense & Anxious',
			subtitle: 'Stressed, Frustrated, Nervous, Angry',
		},
		{
			emoji: '🤩',
			title: 'Excited & Energized',
			subtitle: 'Happy, Alert, Motivated, Elated',
		},
		{
			emoji: '🫠',
			title: 'Tired & Sluggish',
			subtitle: 'Sad, Depressed, Lethargic, Fatigued',
		},
		{
			emoji: '😌',
			title: 'Calm & Peaceful',
			subtitle: 'Relaxed, Serene, Content, Rested',
		},
	];
</script>

<div class="planner page padded energy-matrix">
	<header class="header-section">
		<div class="title field flex-[3]">
			<Field i="⚡">Energy & Mood Matrix</Field>
		</div>

		<div class="date field flex-1">
			<DateSlashes />
		</div>
	</header>

	<div class="matrix-content">
		<div class="top-gauges">
			<div class="flex-col-1 gap-0">
				<div class="section-header">
					<Emoji>🔋</Emoji>
					Energy Level
				</div>
				<div class="energy-gauge">
					{#each new Array(nRows.quadrant) as _, i}
						<div class="energy-bar" style="height: {(i + 1) * 20}%"></div>
					{/each}
				</div>
			</div>

			<div class="flex-col-1 gap-0">
				<div class="section-header">
					{#if showEmoji}<span class="emoji">🎭</span>{/if} Overall Mood
				</div>
				<div class="mood-emojis-spaced">
					{#each ['😤', '😟', '😴', '😐', '🙂', '😊'] as emoji}
						<div class="emoji-circle">{emoji}</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="quadrants-container">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">🧬</span>{/if} Emotion Quadrants
			</div>
			<div class="quadrant-grid" class:landscape={settings?.isLandscape}>
				{#each quadrants as quadrant}
					<div class="quadrant-box quadrant-filled">
						<strong class="quadrant-title">
							{#if showEmoji}<span class="emoji">{quadrant.emoji}</span>{/if}
							{quadrant.title}
						</strong>
						<div class="quadrant-subtitle">{quadrant.subtitle}</div>
						<div class="lines">
							{#each new Array(nRows.energy) as _}
								<div class="line">
									<RowInput />
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="planner-section reflections">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">📝</span>{/if} Reflections & Triggers
			</div>
			<div class="lines">
				{#each new Array(nRows.notes) as _}
					<div class="line">
						<RowInput />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@use '$lib/styles/app.css';
	.matrix-content {
		@apply flex-col-1;
		gap: 0.5rem;
		padding-top: 0.5rem;
	}

	.top-gauges {
		@apply flex gap-4;
	}

	.quadrants-container {
		@apply grid-container;
		gap: 0.25rem;
		margin-top: 0.5rem;
	}

	.quadrant-grid {
		&.landscape {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.quadrant-filled {
		background-color: var(--nav-bg-pdf, var(--bg-high));
		color: var(--text-sidebar, var(--text));
	}

	.reflections {
		margin-top: 0.5rem;
	}
</style>
