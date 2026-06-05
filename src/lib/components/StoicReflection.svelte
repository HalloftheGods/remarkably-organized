<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<div class="stoic-reflection">
	<div class="header-section">
		<div class="field title">
			<div class="label">
				{#if showEmoji}🏛️{/if} STOIC AM/PM JOURNAL
			</div>
			<div class="line"></div>
		</div>
		<div class="field date">
			<div class="label">DATE</div>
			<div class="line"></div>
		</div>
	</div>

	<div class="content-section">
		<div class="half-section morning">
			<div class="section-label">MORNING PREPARATION</div>
			<div class="prompt-block">
				<div class="prompt-label">What is within my control today? What is not?</div>
				{#each Array(4) as _}
					<div class="line"></div>
				{/each}
			</div>
			<div class="prompt-block">
				<div class="prompt-label">Setting intention & anticipating obstacles:</div>
				{#each Array(4) as _}
					<div class="line"></div>
				{/each}
			</div>
		</div>

		<div class="half-section evening">
			<div class="section-label">EVENING REVIEW</div>
			<div class="prompt-block">
				<div class="prompt-label">Did I act in accordance with my values?</div>
				{#each Array(3) as _}
					<div class="line"></div>
				{/each}
			</div>
			<div class="prompt-block">
				<div class="prompt-label">Where did I falter, and what could I do better?</div>
				{#each Array(3) as _}
					<div class="line"></div>
				{/each}
			</div>
		</div>

		<div class="virtues-section">
			<div class="section-label">VIRTUES CHECK-IN</div>
			<div class="virtues-grid">
				{#each ['Wisdom', 'Courage', 'Justice', 'Temperance'] as virtue}
					<div class="virtue-row">
						<span class="virtue-name">{virtue}</span>
						<div class="virtue-boxes">
							{#each Array(5) as _, idx}
								<div class="dot-box"></div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.stoic-reflection {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 1.5rem;
		box-sizing: border-box;
		gap: 1.25rem;
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
		.date {
			flex: 1;
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

	.prompt-label {
		font-size: 0.7rem;
		font-style: italic;
		color: var(--text-low);
		margin-top: 0.25rem;
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

	.half-section {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.prompt-block {
		display: flex;
		flex-direction: column;
	}

	.virtues-section {
		margin-top: auto;
		display: flex;
		flex-direction: column;
	}

	.virtues-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;
		padding-top: 0.5rem;
	}

	.virtue-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px dashed var(--outline);
		padding-bottom: 0.25rem;
	}

	.virtue-name {
		font-size: 0.75rem;
		font-weight: bold;
		color: var(--text-low);
	}

	.virtue-boxes {
		display: flex;
		gap: 0.4rem;
	}

	.dot-box {
		width: 0.75rem;
		height: 0.75rem;
		border: 1px solid var(--outline);
		border-radius: 50%;
	}
</style>
