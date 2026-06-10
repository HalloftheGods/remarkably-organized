<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Grid } from '$molecules';
	import { Checkbox } from '$atoms';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	let plantRows = new Array(8);
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<div class="planner page garden-planner">
	<div class="header-section">
		<div class="field title-field">
			<span class="label">
				{#if showEmoji}🌻{/if} GARDEN PLANNER & LOG
			</span>
			<div class="line"></div>
		</div>
		<div class="field date-field">
			<span class="label">
				{#if showEmoji}📅{/if} SEASON / DATE
			</span>
			<div class="line"></div>
		</div>
	</div>

	<div class="plant-inventory">
		<div class="table-header">
			<div class="col-plant">
				<span>
					{#if showEmoji}🌿{/if}
					PLANT NAME / VARIETY
				</span>
			</div>
			<div class="col-date">
				<span>
					{#if showEmoji}🌱{/if}
					SOW IN
				</span>
			</div>
			<div class="col-date">
				<span>
					{#if showEmoji}📅{/if}
					SOW OUT
				</span>
			</div>
			<div class="col-water">
				<span>
					{#if showEmoji}💧{/if}
					WATER
				</span>
			</div>
			<div class="col-notes">
				<span>
					{#if showEmoji}📝{/if}
					NOTES
				</span>
			</div>
		</div>
		{#each plantRows as _, i (i)}
			<div class="table-row">
				<div class="col-plant"><div class="line"></div></div>
				<div class="col-date"><div class="line"></div></div>
				<div class="col-date"><div class="line"></div></div>
				<div class="col-water">
					<div class="checkboxes">
						<Checkbox aria-label="Water check" class="box" />
						<Checkbox aria-label="Water check" class="box" />
						<Checkbox aria-label="Water check" class="box" />
						<Checkbox aria-label="Water check" class="box" />
						<Checkbox aria-label="Water check" class="box" />
						<Checkbox aria-label="Water check" class="box" />
						<Checkbox aria-label="Water check" class="box" />
					</div>
				</div>
				<div class="col-notes"><div class="line"></div></div>
			</div>
		{/each}
	</div>

	<div class="layout-section">
		<span class="label">
			{#if showEmoji}📐{/if} GARDEN LAYOUT SKETCH
		</span>
		<div class="sketch-area">
			<Grid display="dotted" />
		</div>
	</div>
</div>

<style lang="scss">
	.garden-planner {
		.header-section {
			display: flex;
			gap: 2rem;
			width: 100%;

			.label {
				font-size: 0.75rem;
				font-weight: bold;
				color: var(--text-low);
				margin-bottom: 0.25rem;
				white-space: nowrap;
				letter-spacing: 0.5px;
			}

			.line {
				border-bottom: 1px solid var(--outline);
				height: 1.5rem;
			}

			.field {
				display: flex;
				flex-direction: column;
			}

			.title-field {
				flex: 3;
			}

			.date-field {
				flex: 1;
			}
		}

		.plant-inventory {
			display: flex;
			flex-direction: column;
			width: 100%;
			border: 1px solid var(--outline);
			border-radius: 4px;

			.table-header {
				display: flex;
				background-color: var(--nav-bg-pdf, var(--bg-high));
				border-bottom: 2px solid var(--outline);
				font-weight: bold;
				font-size: 0.65rem;
				color: var(--text-sidebar, var(--text-low));
				text-align: center;
				letter-spacing: 0.5px;
				align-items: center;

				> div {
					padding: 0.5rem;
					border-right: 1px solid var(--outline);
					&:last-child {
						border-right: none;
					}
				}
			}

			.table-row {
				display: flex;
				border-bottom: 1px solid var(--outline);
				height: 2rem;
				align-items: flex-end;

				&:last-child {
					border-bottom: none;
				}

				> div {
					padding: 0 0.5rem 0.25rem;
					height: 100%;
					display: flex;
					align-items: flex-end;
					border-right: 1px solid var(--outline);
					&:last-child {
						border-right: none;
					}
				}

				.line {
					width: 100%;
					opacity: 0.6;
				}
			}

			.col-plant {
				flex: 0 0 35%;
				width: 35%;
				text-align: left;
			}
			.col-date {
				flex: 0 0 10%;
				width: 10%;
			}
			.col-water {
				flex: 0 0 25%;
				width: 25%;
			}
			.col-notes {
				flex: 0 0 20%;
				width: 20%;
				text-align: left;
			}

			.col-water .checkboxes {
				display: flex;
				justify-content: space-between;
				width: 100%;
				padding-bottom: 2px;

				.box {
					width: 0.6rem !important;
					height: 0.6rem !important;
					border-radius: 50% !important;
					min-width: 0.6rem;
					min-height: 0.6rem;
				}
			}
		}

		.layout-section {
			display: flex;
			flex-direction: column;
			flex: 1;
			gap: 1rem;

			.label {
				font-size: 0.75rem;
				font-weight: bold;
				color: var(--text-low);
				letter-spacing: 0.5px;
			}

			.sketch-area {
				flex: 1;
				// border: 1px solid var(--outline);
				border-radius: 4px;
				position: relative;
				overflow: hidden;
			}
		}
	}
</style>
