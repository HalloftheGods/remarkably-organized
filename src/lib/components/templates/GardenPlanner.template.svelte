<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import Grid from '../molecules/Grid.molecule.svelte';

	let { settings = {} as PlannerSettings } = $props();
	let plantRows = new Array(8);
</script>

<div class="garden-planner">
	<div class="header-section">
		<div class="field title-field">
			<div class="label">
				{#if !settings?.emojis?.disable}🌻{/if} GARDEN PLANNER & LOG
			</div>
			<div class="line"></div>
		</div>
		<div class="field date-field">
			<div class="label">
				{#if !settings?.emojis?.disable}📅{/if} SEASON / DATE
			</div>
			<div class="line"></div>
		</div>
	</div>

	<div class="plant-inventory">
		<div class="table-header">
			<div class="col-plant">PLANT NAME / VARIETY</div>
			<div class="col-date">SOW (IN)</div>
			<div class="col-date">SOW (OUT)</div>
			<div class="col-water">WATER</div>
			<div class="col-notes">NOTES</div>
		</div>
		{#each plantRows as _, i (i)}
			<div class="table-row">
				<div class="col-plant"><div class="line"></div></div>
				<div class="col-date"><div class="line"></div></div>
				<div class="col-date"><div class="line"></div></div>
				<div class="col-water">
					<div class="checkboxes">
						<div class="box"></div>
						<div class="box"></div>
						<div class="box"></div>
						<div class="box"></div>
						<div class="box"></div>
						<div class="box"></div>
						<div class="box"></div>
					</div>
				</div>
				<div class="col-notes"><div class="line"></div></div>
			</div>
		{/each}
	</div>

	<div class="layout-section">
		<div class="label">
			{#if !settings?.emojis?.disable}📐{/if} GARDEN LAYOUT SKETCH
		</div>
		<div class="sketch-area">
			<Grid display="dotted" />
		</div>
	</div>
</div>

<style lang="scss">
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
				width: 0.6rem;
				height: 0.6rem;
				border: 1px solid var(--outline-high);
				border-radius: 50%;
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
</style>
