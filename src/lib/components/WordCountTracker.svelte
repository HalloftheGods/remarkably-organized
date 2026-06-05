<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<div class="word-count-tracker">
	<div class="header-section">
		<div class="field title">
			<div class="label">
				{#if showEmoji}✍️{/if} WORD COUNT TRACKER
			</div>
			<div class="line"></div>
		</div>
		<div class="field date">
			<div class="label">MONTH / PERIOD</div>
			<div class="line"></div>
		</div>
	</div>

	<div class="meta-section">
		<div class="meta-row">
			<div class="field project">
				<div class="label">PROJECT / NOVEL TITLE</div>
				<div class="line"></div>
			</div>
			<div class="field target">
				<div class="label">TOTAL TARGET WORD COUNT</div>
				<div class="line"></div>
			</div>
		</div>
	</div>

	<div class="content-section">
		<div class="tracker-layout">
			<div class="days-column">
				<div class="section-label">DAILY LOG</div>
				<div class="log-grid">
					<div class="table-header">
						<span class="col-day">DAY</span>
						<span class="col-words">WORDS</span>
						<span class="col-total">CUMULATIVE</span>
					</div>
					{#each Array(15) as _, idx}
						<div class="table-row">
							<span class="day-num">D{idx + 1}</span>
							<div class="line small-line"></div>
							<div class="line small-line"></div>
						</div>
					{/each}
				</div>
			</div>

			<div class="days-column second-column">
				<div class="section-label">&nbsp;</div>
				<div class="log-grid">
					<div class="table-header">
						<span class="col-day">DAY</span>
						<span class="col-words">WORDS</span>
						<span class="col-total">CUMULATIVE</span>
					</div>
					{#each Array(16) as _, idx}
						<div class="table-row">
							<span class="day-num">D{idx + 16}</span>
							<div class="line small-line"></div>
							<div class="line small-line"></div>
						</div>
					{/each}
				</div>
			</div>

			<div class="graph-column">
				<div class="section-label">PROGRESS CHART (VISUAL TRACKER)</div>
				<div class="chart-box">
					<div class="y-axis">
						<span>100%</span>
						<span>75%</span>
						<span>50%</span>
						<span>25%</span>
						<span>0%</span>
					</div>
					<div class="chart-area">
						<div class="grid-lines">
							{#each Array(5) as _}
								<div class="grid-line"></div>
							{/each}
						</div>
					</div>
				</div>

				<div class="section-label ideas-label">IDEAS / BEATS / SCENE OUTLINES</div>
				{#each Array(7) as _}
					<div class="line"></div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.word-count-tracker {
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
		}
		.project {
			flex: 2;
		}
		.target {
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

	.ideas-label {
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
		flex: 1;
	}

	.tracker-layout {
		display: flex;
		gap: 1.5rem;
		flex: 1;
	}

	.days-column {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.second-column {
		margin-top: 0rem;
	}

	.graph-column {
		flex: 1.5;
		display: flex;
		flex-direction: column;
	}

	.log-grid {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.table-header {
		display: flex;
		font-size: 0.6rem;
		font-weight: bold;
		color: var(--text-low);
		border-bottom: 1px solid var(--outline);
		padding-bottom: 0.2rem;
		margin-bottom: 0.1rem;
	}

	.col-day {
		width: 2.25rem;
	}

	.col-words,
	.col-total {
		flex: 1;
		text-align: center;
	}

	.table-row {
		display: flex;
		align-items: flex-end;
		gap: 0.5rem;
	}

	.day-num {
		width: 2.25rem;
		font-size: 0.65rem;
		color: var(--text-low);
		padding-bottom: 0.15rem;
	}

	.small-line {
		flex: 1;
		height: 1.2rem;
	}

	.chart-box {
		display: flex;
		height: 10rem;
		border: 1px solid var(--outline);
		position: relative;
		margin-top: 0.25rem;
	}

	.y-axis {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 0.6rem;
		color: var(--text-low);
		padding: 0.5rem 0.25rem;
		border-right: 1px solid var(--outline);
		text-align: right;
		width: 2rem;
	}

	.chart-area {
		flex: 1;
		position: relative;
	}

	.grid-lines {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		width: 100%;
		padding: 0.5rem 0;
		box-sizing: border-box;

		.grid-line {
			border-top: 1px dashed var(--outline-low);
			width: 100%;
		}
	}
</style>
