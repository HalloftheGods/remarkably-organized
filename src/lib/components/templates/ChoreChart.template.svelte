<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import Field from '$atoms/Field.atom.svelte';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	const nRows = $derived(settings?.design?.orientation === 'portrait' ? 19 : 13);
</script>

<div class="planner page chore-chart">
	<header>
		<div class="field flex-1">
			<Field i="🧹">CHORE & MAINTENANCE CHART</Field>
		</div>
	</header>

	<div class="box-container flex-1 mt-4">
		<div class="table-header section-header">
			<div class="col-chore border-r border-[var(--outline)]">
				<span class="emoji">🗑️</span> CHORE
			</div>
			<div class="col-freq border-r border-[var(--outline)]">
				<span class="emoji">📅</span> FREQUENCY
			</div>
			<div class="col-done">
				<span class="emoji">✅</span> DONE
			</div>
		</div>
		{#each Array(nRows) as _}
			<div class="table-row">
				<div class="col-chore border-r border-[var(--outline)]">
					<div class="line"></div>
				</div>
				<div class="col-freq border-r border-[var(--outline)]">
					<div class="line"></div>
				</div>
				<div class="col-done">
					<div class="check-box"></div>
					<div class="check-box"></div>
					<div class="check-box"></div>
					<div class="check-box"></div>
					<div class="check-box"></div>
					<div class="check-box"></div>
					<div class="check-box"></div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.chore-chart {
		.table-header {
			display: flex;
			background-color: var(--nav-bg-pdf, #f8f8f8);
			border-bottom: 2px solid var(--outline);
			padding: 0;
			margin-bottom: 0;
			text-align: center;

			> div {
				padding: 0.5rem;
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 0.25rem;
			}
		}

		.table-row {
			display: flex;
			flex: 1;
			border-bottom: 1px solid var(--outline);

			&:last-child {
				border-bottom: none;
			}
			
			> div {
				padding: 0 0.5rem;
				height: 100%;
				display: flex;
				align-items: flex-end;
				padding-bottom: 0.5rem;
				box-sizing: border-box;
			}
		}

		.col-chore {
			flex: 3;
		}
		.col-freq {
			flex: 1.5;
		}
		.col-done {
			flex: 1;
			display: flex;
			gap: 0.5rem;
			align-items: center;
			justify-content: center;
			padding-bottom: 0.5rem !important;

			.check-box {
				width: 1rem;
				height: 1rem;
				border: 1px solid var(--outline-high);
				border-radius: 2px;
			}
		}
	}
</style>
