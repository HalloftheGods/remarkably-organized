<script lang="ts">
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
</script>

<div class="planner page padded energy-matrix">
	<header class="flex gap-4 w-full">
		<div class="title field flex-[3]">
			<Field i="⚡">ENERGY & MOOD MATRIX</Field>
		</div>

		<div class="date field flex-1">
			<DateSlashes />
		</div>
	</header>

	<div class="flex-col-1 gap-2 pt-2">
		<div class="flex gap-4">
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

		<div class="grid-container gap-1 mt-2">
			<div class="section-header">
				{#if showEmoji}<span class="emoji">🧬</span>{/if} Emotion Quadrants
			</div>
			<div class="quadrant-grid {settings?.isLandscape ? 'grid-cols-4' : 'grid-cols-2'}">
				<!-- Top Left: High Energy / Negative -->
				<div class="quadrant-box bg-[rgba(239,68,68,0.05)]">
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
				<div class="quadrant-box bg-[rgba(249,115,22,0.05)]">
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
				<div class="quadrant-box bg-[rgba(168,85,247,0.05)]">
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
				<div class="quadrant-box bg-[rgba(34,197,94,0.05)]">
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

		<div class="planner-section mt-2">
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
