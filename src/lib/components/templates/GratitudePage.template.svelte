<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Checkbox } from '$atoms';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	const isLandscape = $derived(settings?.design?.orientation === 'landscape');
	const nRows = {
		grateful: isLandscape ? 3 : 5,
		list: isLandscape ? 8 : 12,
		highlights: isLandscape ? 5 : 7,
	};
</script>

<div class="planner page gratitude-page">
	<div class="header-section">
		<div class="field title">
			<label>
				{#if showEmoji}
					<span class="emoji">💛</span>
				{/if}
				<strong>GRATITUDE & AFFIRMATIONS</strong>
			</label>
			<div class="content"></div>
		</div>
		<div class="field date">
			<label>
				{#if showEmoji}📅{/if}
				<strong>DATE</strong>
			</label>
			<div class="content"></div>
		</div>
	</div>

	<div class="content-section">
		<div class="top-section">
			<span class="section-label">
				{#if showEmoji}🙏{/if} THINGS I AM GRATEFUL FOR TODAY
			</span>
			{#each Array(nRows.grateful) as _, idx}
				<div class="gratitude-row">
					<span class="gratitude-num">{idx + 1}.</span>
					<div class="line"></div>
				</div>
			{/each}
		</div>

		<div class="split-section">
			<div class="column affirmations">
				<span class="section-label">
					{#if showEmoji}🌟{/if} DAILY POSITIVE AFFIRMATIONS
				</span>
				{#each Array(nRows.list) as _}
					<div class="bullet-row">
						<span class="heart" aria-label="Affirmation bullet">
							{#if showEmoji}
								💖
							{:else}
								♥
							{/if}
						</span>
						<div class="line"></div>
					</div>
				{/each}
			</div>

			<div class="column kindness">
				<span class="section-label">
					{#if showEmoji}🤝{/if} ACTS OF KINDNESS / CONNECTION
				</span>
				{#each Array(nRows.list) as _}
					<div class="bullet-row">
						<Checkbox aria-label="Acts of kindness check" />
						<div class="line"></div>
					</div>
				{/each}
			</div>
		</div>

		<div class="bottom-section">
			<span class="section-label">
				{#if showEmoji}☀️{/if} TODAY'S HIGHLIGHTS / MOMENTS OF JOY
			</span>
			{#each Array(nRows.highlights) as _}
				<div class="line"></div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.gratitude-page {
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
			padding-bottom: 0.25rem;
			border-bottom: 1px solid var(--outline);
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

		.top-section {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
		}

		.gratitude-row {
			display: flex;
			align-items: flex-end;
			gap: 0.5rem;
		}

		.gratitude-num {
			font-size: 0.75rem;
			font-weight: bold;
			color: var(--text-low);
			width: 1.25rem;
			padding-bottom: 0.2rem;
		}

		.split-section {
			display: flex;
			gap: 0.5rem;
		}

		.column {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
		}

		.bullet-row {
			display: flex;
			align-items: flex-end;
			gap: 0.5rem;
		}

		.heart {
			font-size: 0.9rem;
			color: var(--text-low);
			width: 1rem;
			text-align: center;
			padding-bottom: 0.15rem;
		}

		.bottom-section {
			display: flex;
			flex-direction: column;
			margin-top: auto;
		}
	}
</style>
