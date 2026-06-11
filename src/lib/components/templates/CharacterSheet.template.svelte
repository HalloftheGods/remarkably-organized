<script lang="ts">
	import { Field, Checkbox } from '$atoms';
	import RowInput from '$atoms/RowInput.svelte';
	import type { PlannerSettings } from '$lib';

	let { settings = undefined as any }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<div class="planner page padded character-sheet">
	<div class="header-section">
		<Field i="🎭">Character Sheet</Field>
		<div class="field class-type">
			<Field i="🧙‍♂️">Role / Class / Type</Field>
		</div>
	</div>

	<div class="meta-section">
		<div class="meta-row">
			<div class="field name">
				<Field i="👤">Name</Field>
			</div>
			<div class="field archetype">
				<Field i="🔮">Archetype / Background</Field>
			</div>
		</div>
	</div>

	<div class="content-section">
		<div class="top-row">
			<div class="column attributes">
				<div class="section-header">
					{#if showEmoji}
						<span class="emoji">📊</span>
					{/if}
					<strong>Attributes & Abilities</strong>
				</div>
				<div class="attr-grid">
					{#each ['Strength / Force', 'Agility / Speed', 'Intellect / Mind', 'Willpower / Soul', 'Presence / Charisma', 'Perception / Senses'] as attr}
						<div class="attr-row">
							<span class="attr-name">{attr}</span>
							<div class="attr-score">
								<RowInput />
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="column traits">
				<div class="section-header">
					{#if showEmoji}
						<span class="emoji">📜</span>
					{/if}
					<strong>Traits, Flaws & Motivations</strong>
				</div>
				{#each Array(8) as _}
					<div class="line">
						<RowInput />
					</div>
				{/each}
			</div>
		</div>

		<div class="bottom-section">
			<div class="column gear">
				<div class="section-header">
					{#if showEmoji}
						<span class="emoji">🎒</span>
					{/if}
					<strong>Gear / Inventory / Companions</strong>
				</div>
				{#each Array(18) as _}
					<div class="row-item">
						<Checkbox />
						<div class="line">
							<RowInput />
						</div>
					</div>
				{/each}
			</div>

			<div class="column history">
				<div class="section-header">
					{#if showEmoji}
						<span class="emoji">📝</span>
					{/if}
					<strong>History / Notes / Campaign Log</strong>
				</div>
				{#each Array(18) as _}
					<div class="line">
						<RowInput />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.character-sheet {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		gap: 1rem;
	}

	.header-section {
		display: flex;
		gap: 2rem;

		.title {
			flex: 3;
		}
		.class-type {
			flex: 1;
		}
	}

	.meta-section {
		display: flex;
		flex-direction: column;
	}

	.meta-row {
		display: flex;
		gap: 2rem;

		.name {
			flex: 2;
		}
		.archetype {
			flex: 2;
		}
	}

	.line {
		border-bottom: 1px solid var(--outline);
		height: 1.5rem;
		width: 100%;
	}

	.content-section {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		flex: 1;
		border: none !important;
	}

	.top-row,
	.bottom-section {
		display: flex;
		gap: 1rem;
		flex: 1;
	}

	.column {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.attr-grid {
		display: grid;
		grid-template-rows: repeat(6, 1fr);
		gap: 0.4rem;
	}

	.attr-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--outline);
		padding-bottom: 0.2rem;
	}

	.attr-name {
		font-size: 0.75rem;
		color: var(--text-low);
		font-weight: 500;
	}

	.attr-score {
		width: 2.25rem;
		height: 1.5rem;
		border: 1px solid var(--outline);
	}
</style>
