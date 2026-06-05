<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<div class="character-sheet">
	<div class="header-section">
		<div class="field title">
			<div class="label">
				{#if showEmoji}🎭{/if} CHARACTER SHEET
			</div>
			<div class="line"></div>
		</div>
		<div class="field class-type">
			<div class="label">ROLE / CLASS / TYPE</div>
			<div class="line"></div>
		</div>
	</div>

	<div class="meta-section">
		<div class="meta-row">
			<div class="field name">
				<div class="label">NAME</div>
				<div class="line"></div>
			</div>
			<div class="field archetype">
				<div class="label">ARCHETYPE / BACKGROUND</div>
				<div class="line"></div>
			</div>
		</div>
	</div>

	<div class="content-section">
		<div class="top-row">
			<div class="column attributes">
				<div class="section-label">ATTRIBUTES & ABILITIES</div>
				<div class="attr-grid">
					{#each ['Strength / Force', 'Agility / Speed', 'Intellect / Mind', 'Willpower / Soul', 'Presence / Charisma', 'Perception / Senses'] as attr}
						<div class="attr-row">
							<span class="attr-name">{attr}</span>
							<div class="attr-score"></div>
						</div>
					{/each}
				</div>
			</div>

			<div class="column traits">
				<div class="section-label">TRAITS, FLAWS & MOTIVATIONS</div>
				{#each Array(6) as _}
					<div class="line"></div>
				{/each}
			</div>
		</div>

		<div class="bottom-section">
			<div class="column gear">
				<div class="section-label">GEAR / INVENTORY / COMPANIONS</div>
				{#each Array(6) as _}
					<div class="bullet-row">
						<div class="box"></div>
						<div class="line"></div>
					</div>
				{/each}
			</div>

			<div class="column history">
				<div class="section-label">HISTORY / NOTES / CAMPAIGN LOG</div>
				{#each Array(6) as _}
					<div class="line"></div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.character-sheet {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 1.5rem;
		box-sizing: border-box;
		gap: 1rem;
	}

	.header-section {
		display: flex;
		gap: 2rem;

		.field {
			display: flex;
			flex-direction: column;
		}
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

		.field {
			display: flex;
			flex-direction: column;
		}
		.name {
			flex: 2;
		}
		.archetype {
			flex: 2;
		}
	}

	.label {
		font-size: 0.75rem;
		font-weight: bold;
		color: var(--text-low);
		margin-bottom: 0.25rem;
		letter-spacing: 0.5px;
	}

	.section-label {
		font-size: 0.8rem;
		font-weight: bold;
		color: var(--text-low);
		border-bottom: 2px solid var(--outline);
		padding-bottom: 0.25rem;
		margin-bottom: 0.5rem;
		letter-spacing: 0.5px;
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
	}

	.top-row, .bottom-section {
		display: flex;
		gap: 2rem;
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
		border-bottom: 1px dashed var(--outline);
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

	.bullet-row {
		display: flex;
		align-items: flex-end;
		gap: 0.5rem;
	}

	.box {
		width: 0.9rem;
		height: 0.9rem;
		border: 1px solid var(--outline);
		flex-shrink: 0;
		margin-bottom: 0.1rem;
	}
</style>
