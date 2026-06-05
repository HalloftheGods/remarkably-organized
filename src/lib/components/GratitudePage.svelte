<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<div class="gratitude-page">
	<div class="header-section">
		<div class="field title">
			<div class="label">
				{#if showEmoji}💛{/if} GRATITUDE & AFFIRMATIONS
			</div>
			<div class="line"></div>
		</div>
		<div class="field date">
			<div class="label">DATE</div>
			<div class="line"></div>
		</div>
	</div>

	<div class="content-section">
		<div class="top-section">
			<div class="section-label">THINGS I AM GRATEFUL FOR TODAY</div>
			{#each Array(5) as _, idx}
				<div class="gratitude-row">
					<span class="gratitude-num">{idx + 1}.</span>
					<div class="line"></div>
				</div>
			{/each}
		</div>

		<div class="split-section">
			<div class="column affirmations">
				<div class="section-label">DAILY POSITIVE AFFIRMATIONS</div>
				{#each Array(4) as _}
					<div class="bullet-row">
						<span class="heart">♥</span>
						<div class="line"></div>
					</div>
				{/each}
			</div>

			<div class="column kindness">
				<div class="section-label">ACTS OF KINDNESS / CONNECTION</div>
				{#each Array(4) as _}
					<div class="bullet-row">
						<div class="box"></div>
						<div class="line"></div>
					</div>
				{/each}
			</div>
		</div>

		<div class="bottom-section">
			<div class="section-label">TODAY'S HIGHLIGHTS / MOMENTS OF JOY</div>
			{#each Array(3) as _}
				<div class="line"></div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.gratitude-page {
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
		gap: 2rem;
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

	.box {
		width: 0.9rem;
		height: 0.9rem;
		border: 1px solid var(--outline);
		flex-shrink: 0;
		margin-bottom: 0.1rem;
	}

	.bottom-section {
		display: flex;
		flex-direction: column;
		margin-top: auto;
	}
</style>
