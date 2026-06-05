<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<div class="devotional-page">
	<div class="header-section">
		<div class="field title">
			<div class="label">
				{#if showEmoji}🙏{/if} DEVOTIONAL & SCRIPTURE PAGE
			</div>
			<div class="line"></div>
		</div>
		<div class="field date">
			<div class="label">DATE</div>
			<div class="line"></div>
		</div>
	</div>

	<div class="meta-section">
		<div class="meta-row">
			<div class="field Scripture">
				<div class="label">SCRIPTURE PASSAGE / REF / THEME</div>
				<div class="line"></div>
			</div>
		</div>
	</div>

	<div class="content-section">
		<div class="key-verse-block">
			<div class="section-label">KEY VERSE / FOCUS QUOTE</div>
			{#each Array(3) as _}
				<div class="line"></div>
			{/each}
		</div>

		<div class="notes-split">
			<div class="column reflection">
				<div class="section-label">REFLECTION & UNDERSTANDING</div>
				{#each Array(10) as _}
					<div class="line"></div>
				{/each}
			</div>

			<div class="column application">
				<div class="section-label">PRACTICAL LIFE APPLICATION</div>
				{#each Array(4) as _}
					<div class="line"></div>
				{/each}

				<div class="section-label prayers-label">PRAYER REQUESTS & PRAISE REPORTS</div>
				{#each Array(5) as _}
					<div class="prayer-row">
						<div class="bullet"></div>
						<div class="line"></div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.devotional-page {
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
		.date {
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
			width: 100%;
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

	.prayers-label {
		margin-top: 1rem;
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

	.key-verse-block {
		display: flex;
		flex-direction: column;
	}

	.notes-split {
		display: flex;
		gap: 2rem;
		flex: 1;
	}

	.column {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.prayer-row {
		display: flex;
		align-items: flex-end;
		gap: 0.5rem;
	}

	.bullet {
		width: 0.5rem;
		height: 0.5rem;
		border: 1px solid var(--outline);
		border-radius: 50%;
		flex-shrink: 0;
		margin-bottom: 0.25rem;
	}
</style>
