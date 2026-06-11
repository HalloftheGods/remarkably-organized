<script lang="ts">
	import RowInput from '$atoms/RowInput.svelte';
	import type { PlannerSettings } from '$lib';

	import { Field } from '$atoms';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
</script>

<div class="planner page padded tarot-draw gap-6">
	<header>
		<div class="field flex-[3]">
			<Field i="🃏">DAILY TAROT DRAW</Field>
		</div>
		<div class="field flex-[1]">
			<Field>DATE</Field>
		</div>
	</header>

	<div class="cards-container">
		<div class="card-slot">
			<div class="card-outline">
				<span class="card-title">Past / Situation</span>
			</div>
			<div class="notes-lines">
				{#each Array(4) as _}
					<div class="line">
						<RowInput />
					</div>
				{/each}
			</div>
		</div>

		<div class="card-slot">
			<div class="card-outline">
				<span class="card-title">Present / Action</span>
			</div>
			<div class="notes-lines">
				{#each Array(4) as _}
					<div class="line">
						<RowInput />
					</div>
				{/each}
			</div>
		</div>

		<div class="card-slot">
			<div class="card-outline">
				<span class="card-title">Future / Outcome</span>
			</div>
			<div class="notes-lines">
				{#each Array(4) as _}
					<div class="line">
						<RowInput />
					</div>
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
	.tarot-draw {
		width: 100%;
		height: 100%;
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
				border: 2px solid var(--outline);
				border-radius: 8px;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				background-color: var(--nav-bg-pdf, var(--bg-high));

				.card-title {
					position: absolute;
					bottom: -1rem;
					background-color: var(--bg-pdf, var(--bg));
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
			}
		}
	}
</style>
