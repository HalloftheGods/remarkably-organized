<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<div class="planner page padded character-sheet">
	<div class="header-section">
		<div class="field title">
			<label>
				{#if showEmoji}
					<span class="emoji">🎭</span>
				{/if}
				<strong>CHARACTER SHEET</strong>
			</label>
			<div class="content"></div>
		</div>
		<div class="field class-type">
			<label>
				{#if showEmoji}
					<span class="emoji">🧙‍♂️</span>
				{/if}
				<strong>ROLE / CLASS / TYPE</strong>
			</label>
			<div class="content"></div>
		</div>
	</div>

	<div class="meta-section">
		<div class="meta-row">
			<div class="field name">
				<label>
					{#if showEmoji}
						<span class="emoji">👤</span>
					{/if}
					<strong>NAME</strong>
				</label>
				<div class="content"></div>
			</div>
			<div class="field archetype">
				<label>
					{#if showEmoji}
						<span class="emoji">🔮</span>
					{/if}
					<strong>ARCHETYPE / BACKGROUND</strong>
				</label>
				<div class="content"></div>
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
					<strong>ATTRIBUTES & ABILITIES</strong>
				</div>
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
				<div class="section-header">
					{#if showEmoji}
						<span class="emoji">📜</span>
					{/if}
					<strong>TRAITS, FLAWS & MOTIVATIONS</strong>
				</div>
				{#each Array(8) as _}
					<div class="line"></div>
				{/each}
			</div>
		</div>

		<div class="bottom-section">
			<div class="column gear">
				<div class="section-header">
					{#if showEmoji}
						<span class="emoji">🎒</span>
					{/if}
					<strong>GEAR / INVENTORY / COMPANIONS</strong>
				</div>
				{#each Array(18) as _}
					<div class="row-item">
						<div class="checkbox"></div>
						<div class="line"></div>
					</div>
				{/each}
			</div>

			<div class="column history">
				<div class="section-header">
					{#if showEmoji}
						<span class="emoji">📝</span>
					{/if}
					<strong>HISTORY / NOTES / CAMPAIGN LOG</strong>
				</div>
				{#each Array(18) as _}
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
</style>
