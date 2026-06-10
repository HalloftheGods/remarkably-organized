<script lang="ts">
	import RowInput from '$atoms/RowInput.svelte';
	import type { PlannerSettings } from '$lib';
	import Field from '$atoms/Field.atom.svelte';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
</script>

<div class="planner page padded recipe-card">
	<header>
		<div class="field flex-[3]">
			<Field i="🥘">RECIPE NAME</Field>
		</div>
		<div class="field flex-1">
			<Field>PREP / COOK TIME</Field>
		</div>
	</header>

	<div class="content-section mt-4">
		<div class="columns">
			<div class="column">
				<div class="section-header">INGREDIENTS</div>
				{#each Array(15) as _}
					<div class="row-item">
						<div class="box"></div>
						<div class="line">
									<RowInput />
								</div>
					</div>
				{/each}
			</div>
			<div class="column">
				<div class="section-header">DIRECTIONS</div>
				<div class="lines">
					{#each Array(15) as _}
						<div class="line">
									<RowInput />
								</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="bottom-section mt-4">
			<div class="section-header">NOTES / NUTRITION</div>
			<div class="lines">
				{#each Array(3) as _}
					<div class="line">
									<RowInput />
								</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.recipe-card {
		.content-section {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			flex: 1;
		}

		.columns {
			display: flex;
			gap: 2rem;
			flex: 1;

			.column {
				flex: 1;
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
			}
		}

		.row-item {
			margin-bottom: 0.25rem;
		}

		.box {
			width: 1.25rem;
			height: 1.25rem;
			border: 1px solid var(--outline);
			flex-shrink: 0;
		}

		.bottom-section {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
