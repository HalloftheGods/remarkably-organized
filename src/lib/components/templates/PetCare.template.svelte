<script lang="ts">
	import RowInput from '$atoms/RowInput.svelte';
	import type { PlannerSettings } from '$lib';
	import { Checkbox } from '$atoms';
	import Field from '$atoms/Field.atom.svelte';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
</script>

<div class="planner page padded pet-care">
	<header>
		<div class="field flex-[3]">
			<Field i="🐾">PET CARE LOG</Field>
		</div>
		<div class="field flex-1">
			<Field>DATE / WEEK</Field>
		</div>
	</header>

	<div class="content-section flex-col-1 gap-8 flex-1 mt-4">
		<div class="flex gap-8 flex-1">
			<div class="flex-col-1 flex-1 gap-2">
				<div class="section-header">FEEDING SCHEDULE</div>
				{#each Array(7) as _}
					<div class="row-item">
						<Checkbox aria-label="Feeding schedule check" />
						<div class="line">
							<RowInput />
						</div>
					</div>
				{/each}
			</div>
			<div class="flex-col-1 flex-1 gap-2">
				<div class="section-header">WALKS / EXERCISE</div>
				{#each Array(7) as _}
					<div class="row-item">
						<Checkbox aria-label="Walks/Exercise check" />
						<div class="line">
							<RowInput />
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="flex-col-1 gap-2">
			<div class="section-header">VET NOTES & MEDICATION</div>
			<div class="lines">
				{#each Array(6) as _}
					<div class="line">
						<RowInput />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.pet-care {
		.row-item {
			margin-bottom: 0.25rem;
		}
	}
</style>
