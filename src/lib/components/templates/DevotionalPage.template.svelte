<script lang="ts">
		import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	const nRows = {
		keyVerse: settings?.isLandscape ? 2 : 4,
		reflection: settings?.isLandscape ? 13 : 20,
		application: settings?.isLandscape ? 4 : 8,
		prayers: settings?.isLandscape ? 7 : 10,
	};
</script>

<div class="planner page devotional-page">
	<div class="header-section">
		<div class="field title">
			<div class="label">
				{#if showEmoji}🙏{/if} DEVOTIONAL & SCRIPTURE PAGE
			</div>
			<div class="line"></div>
		</div>
		<div class="field date">
			<div class="label">
				{#if showEmoji}📅{/if} DATE
			</div>
			<div class="line"></div>
		</div>
	</div>

	<div class="meta-section">
		<div class="meta-row">
			<div class="field Scripture">
				<div class="label">
					{#if showEmoji}📖{/if} SCRIPTURE PASSAGE / REF / THEME
				</div>
				<div class="line"></div>
			</div>
		</div>
	</div>

	<div class="content-section">
		<div class="key-verse-block">
			<div class="section-label">
				{#if showEmoji}📜{/if} KEY VERSE / FOCUS QUOTE
			</div>
			{#each Array(nRows.keyVerse) as _}
				<div class="line"></div>
			{/each}
		</div>

		<div class="notes-split">
			<div class="column reflection">
				<div class="section-label">
					{#if showEmoji}📝{/if} REFLECTION & UNDERSTANDING
				</div>
				{#each Array(nRows.reflection) as _}
					<div class="line"></div>
				{/each}
			</div>

			<div class="column application">
				<div class="section-label">
					{#if showEmoji}⚙️{/if} PRACTICAL LIFE APPLICATION
				</div>
				{#each Array(nRows.application) as _}
					<div class="line"></div>
				{/each}

				<div class="section-label prayers-label">
					{#if showEmoji}🙏{/if} PRAYER REQUESTS & PRAISE REPORTS
				</div>
				{#each Array(nRows.prayers) as _}
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
		gap: 2;
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
			gap: 1.5rem;
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
	}
</style>
