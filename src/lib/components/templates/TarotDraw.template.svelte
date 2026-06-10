<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<div class="planner page tarot-draw-container">
	<div class="header-section">
		<div class="title-block">
			<span class="label">
				{#if showEmoji}🃏{/if} DAILY TAROT DRAW
			</span>
		</div>
		<div class="date-line">
			<span class="date-label">Date:</span>
			<div class="line"></div>
		</div>
	</div>

	<div class="cards-container">
		<div class="card-slot">
			<div class="card-outline">
				<span class="card-title">Past / Situation</span>
			</div>
			<div class="notes-lines">
				{#each Array(4) as _}
					<div class="line"></div>
				{/each}
			</div>
		</div>

		<div class="card-slot">
			<div class="card-outline">
				<span class="card-title">Present / Action</span>
			</div>
			<div class="notes-lines">
				{#each Array(4) as _}
					<div class="line"></div>
				{/each}
			</div>
		</div>

		<div class="card-slot">
			<div class="card-outline">
				<span class="card-title">Future / Outcome</span>
			</div>
			<div class="notes-lines">
				{#each Array(4) as _}
					<div class="line"></div>
				{/each}
			</div>
		</div>
	</div>

	<div class="interpretation-section">
		<span class="label">Synthesis & Interpretation</span>
		<div class="dotted-area">
			<!-- CSS grid of dots for writing -->
			<div class="dots-bg"></div>
		</div>
	</div>
</div>

<style lang="scss">
	.tarot-draw-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 1.5rem;
		box-sizing: border-box;
		gap: 1.5rem;
	}

	.header-section {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		// border-bottom: 2px solid var(--outline);
		padding-bottom: 0.5rem;

		.title-block {
			.label {
				font-size: 1.25rem;
				font-weight: bold;
				color: var(--text);
				letter-spacing: 2px;
				text-transform: uppercase;
			}
		}

		.date-line {
			display: flex;
			align-items: flex-end;
			width: 150px;
			gap: 0.5rem;

			.date-label {
				font-size: 0.85rem;
				color: var(--text-low);
			}

			.line {
				flex: 1;
				border-bottom: 1px solid var(--outline);
				height: 1rem;
			}
		}
	}

	.cards-container {
		display: flex;
		justify-content: space-between;
		gap: 1.5rem;
		flex: 1;
		min-height: 40%;

		.card-slot {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 1rem;

			.card-outline {
				flex: 1;
				border: 2px dashed var(--outline);
				border-radius: 8px;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				background-color: var(--nav-bg-pdf, rgba(0, 0, 0, 0.02));

				.card-title {
					position: absolute;
					bottom: -1rem;
					background-color: var(--bg-pdf, #ffffff);
					padding: 0 0.5rem;
					font-size: 0.75rem;
					font-weight: bold;
					color: var(--text-low);
					text-transform: uppercase;
					letter-spacing: 1px;
				}
			}

			.notes-lines {
				display: flex;
				flex-direction: column;
				gap: 1.25rem;
				margin-top: 1.5rem;

				.line {
					width: 100%;
					border-bottom: 1px solid var(--outline);
				}
			}
		}
	}

	.interpretation-section {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 1rem;

		.label {
			font-size: 0.85rem;
			font-weight: bold;
			color: var(--text-low);
			text-transform: uppercase;
			letter-spacing: 1px;
		}

		.dotted-area {
			flex: 1;
			border: 1px solid var(--outline);
			border-radius: 4px;
			position: relative;
			overflow: hidden;

			.dots-bg {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background-image: radial-gradient(var(--dots, #ccc) 1px, transparent 1px);
				background-size: 20px 20px;
				background-position: 0 0;
				opacity: 0.5;
			}
		}
	}
</style>
