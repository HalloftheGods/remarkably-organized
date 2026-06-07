<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Grid, Field } from '$molecules';
	import { Box, Text, Checkbox } from '$atoms';

	let { settings = {} as PlannerSettings } = $props();
	let plantRows = new Array(8);
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<Box class="garden-planner">
	<Box class="header-section">
		<Box class="field title-field">
			<Text class="label">
				{#if showEmoji}🌻{/if} GARDEN PLANNER & LOG
			</Text>
			<Box class="line"></Box>
		</Box>
		<Box class="field date-field">
			<Text class="label">
				{#if showEmoji}📅{/if} SEASON / DATE
			</Text>
			<Box class="line"></Box>
		</Box>
	</Box>

	<Box class="plant-inventory">
		<Box class="table-header">
			<Box class="col-plant"><Text>PLANT NAME / VARIETY</Text></Box>
			<Box class="col-date"><Text>SOW (IN)</Text></Box>
			<Box class="col-date"><Text>SOW (OUT)</Text></Box>
			<Box class="col-water"><Text>WATER</Text></Box>
			<Box class="col-notes"><Text>NOTES</Text></Box>
		</Box>
		{#each plantRows as _, i (i)}
			<Box class="table-row">
				<Box class="col-plant"><Box class="line"></Box></Box>
				<Box class="col-date"><Box class="line"></Box></Box>
				<Box class="col-date"><Box class="line"></Box></Box>
				<Box class="col-water">
					<Box class="checkboxes">
						<Checkbox aria-label="Water check" class="box" />
						<Checkbox aria-label="Water check" class="box" />
						<Checkbox aria-label="Water check" class="box" />
						<Checkbox aria-label="Water check" class="box" />
						<Checkbox aria-label="Water check" class="box" />
						<Checkbox aria-label="Water check" class="box" />
						<Checkbox aria-label="Water check" class="box" />
					</Box>
				</Box>
				<Box class="col-notes"><Box class="line"></Box></Box>
			</Box>
		{/each}
	</Box>

	<Box class="layout-section">
		<Text class="label">
			{#if showEmoji}📐{/if} GARDEN LAYOUT SKETCH
		</Text>
		<Box class="sketch-area">
			<Grid display="dotted" />
		</Box>
	</Box>
</Box>

<style lang="scss">
	:global {
		.garden-planner {
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
				background-color: var(--nav-bg-pdf, #f8f8f8);
				border-bottom: 2px solid var(--outline);
				padding: 0.5rem;
				font-weight: bold;
				font-size: 0.65rem;
				color: var(--text-low);
				text-align: center;
				letter-spacing: 0.5px;

				> div {
					padding: 0 0.5rem;
				}
			}

			.table-row {
				display: flex;
				padding: 0 0.5rem;
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
				}

				.line {
					width: 100%;
					border-bottom: 1px solid var(--outline);
					opacity: 0.6;
				}
			}

			.col-plant {
				flex: 3;
				text-align: left;
			}
			.col-date {
				flex: 1;
			}
			.col-water {
				flex: 1.5;
			}
			.col-notes {
				flex: 2;
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
			gap: 0.5rem;

			.label {
				font-size: 0.75rem;
				font-weight: bold;
				color: var(--text-low);
				letter-spacing: 0.5px;
			}

			.sketch-area {
				flex: 1;
				border: 1px solid var(--outline);
				border-radius: 4px;
				position: relative;
				overflow: hidden;
			}
		}
	}
</style>
