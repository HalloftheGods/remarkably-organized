<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import Field from '$atoms/Field.atom.svelte';
	import Checkbox from '$atoms/Checkbox.atom.svelte';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	const isLandscape = $derived(settings.isLandscape);
	const nRows = $derived(settings?.design?.orientation === 'portrait' ? 23 : 15);
</script>

<div class="planner page padded chore-chart">
	<header>
		<div class="field flex-1">
			<Field i="🧹">Chore & Maintenance Chart</Field>
		</div>
	</header>

	<div class="box-container flex-1 mt-4">
		<div class="table-header section-header">
			<div class="col-chore border-r border-[var(--outline)]">
				<span class="emoji">🗑️</span>
				Chore
			</div>
			<div class="col-freq border-r border-[var(--outline)]">
				<span class="emoji">📅</span>
				Frequency
			</div>

			<div class="col-done flex-[{isLandscape ? 1.5 : 2}]">
				<span class="emoji">✅</span>
				Done
			</div>
		</div>
		{#each Array(nRows) as _}
			<div class="table-row">
				<div class="col-chore border-r border-[var(--outline)]"></div>
				<div class="col-freq border-r border-[var(--outline)]"></div>
				<div class="col-done flex-[{isLandscape ? 1.5 : 2}]">
					<Checkbox />
					<Checkbox />
					<Checkbox />
					<Checkbox />
					<Checkbox />
					<Checkbox />
					<Checkbox />
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.chore-chart {
		.table-header {
			display: flex;
			background-color: var(--nav-bg-pdf, var(--bg-high));
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
			display: flex;
			gap: 0.5rem;
			align-items: center;
			justify-content: space-evenly;
			padding-bottom: 0.5rem !important;
		}
	}
</style>
