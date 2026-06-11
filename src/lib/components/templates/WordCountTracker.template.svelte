<script lang="ts">
	import RowInput from '$atoms/RowInput.svelte';
	import type { PlannerSettings } from '$lib';
	import Field from '$atoms/Field.atom.svelte';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
</script>

<div class="planner page padded word-count-tracker">
	<header>
		<div class="field flex-[3]">
			<Field i="✍️">WORD COUNT TRACKER</Field>
		</div>
		<div class="field flex-1">
			<Field>MONTH / PERIOD</Field>
		</div>
	</header>

	<div class="flex-col-1 shrink-0 mt-4 mb-4">
		<div class="flex gap-8">
			<div class="field flex-[2]">
				<Field>PROJECT / NOVEL TITLE</Field>
			</div>
			<div class="field flex-[1]">
				<Field>TOTAL TARGET WORD COUNT</Field>
			</div>
		</div>
	</div>

	<div class="content-section flex-col-1 flex-1">
		<div class="flex gap-6 flex-1">
			<!-- Col 1 -->
			<div class="flex-1 flex-col-1">
				<div class="section-header">DAILY LOG</div>
				<div class="table-container">
					<div class="table-header">
						<span class="w-9">DAY</span>
						<span class="flex-1 text-center">WORDS</span>
						<span class="flex-1 text-center">CUMULATIVE</span>
					</div>
					{#each Array(15) as _, idx}
						<div class="table-row">
							<span class="day-label">D{idx + 1}</span>
							<div class="line">
								<RowInput />
							</div>
							<div class="line">
								<RowInput />
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Col 2 -->
			<div class="flex-1 flex-col-1">
				<div class="section-header invisible">&nbsp;</div>
				<div class="table-container">
					<div class="table-header">
						<span class="w-9">DAY</span>
						<span class="flex-1 text-center">WORDS</span>
						<span class="flex-1 text-center">CUMULATIVE</span>
					</div>
					{#each Array(16) as _, idx}
						<div class="table-row">
							<span class="day-label">D{idx + 16}</span>
							<div class="line">
								<RowInput />
							</div>
							<div class="line">
								<RowInput />
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Col 3 -->
			<div class="flex-[1.5] flex-col-1">
				<div class="section-header">PROGRESS CHART (VISUAL TRACKER)</div>
				<div class="progress-chart">
					<div class="y-axis">
						<span>100%</span>
						<span>75%</span>
						<span>50%</span>
						<span>25%</span>
						<span>0%</span>
					</div>
					<div class="chart-area relative flex-1">
						<div class="chart-grid">
							{#each Array(5) as _}
								<div class="grid-line"></div>
							{/each}
						</div>
					</div>
				</div>

				<div class="section-header mt-4">IDEAS / BEATS / SCENE OUTLINES</div>
				<div class="lines">
					{#each Array(7) as _}
						<div class="line">
							<RowInput />
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.word-count-tracker {
		.table-container {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
		}

		.table-header {
			display: flex;
			font-family: var(--font-display);
			font-size: 0.6rem;
			font-weight: bold;
			color: var(--text-sidebar, var(--text-low));
			border-bottom: 1px solid var(--outline);
			padding-bottom: 0.2rem;
			margin-bottom: 0.1rem;
		}

		.table-row {
			display: flex;
			align-items: flex-end;
			gap: 0.5rem;
		}

		.day-label {
			width: 2.25rem;
			font-size: 0.65rem;
			color: var(--text-sidebar, var(--text-low));
			padding-bottom: 0.15rem;
		}

		.progress-chart {
			display: flex;
			height: 10rem;
			border: 1px solid var(--outline);
			position: relative;
			margin-top: 0.25rem;

			.y-axis {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				font-size: 0.6rem;
				color: var(--text-sidebar, var(--text-low));
				padding: 0.5rem 0.25rem;
				border-right: 1px solid var(--outline);
				text-align: right;
				width: 2.5rem;
			}

			.chart-grid {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 100%;
				width: 100%;
				padding: 0.5rem 0;
				box-sizing: border-box;

				.grid-line {
					border-top: 1px solid var(--outline-low);
					width: 100%;
				}
			}
		}
	}
</style>
