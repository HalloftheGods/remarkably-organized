<script lang="ts">
		import type { PlannerSettings } from '$lib';

	import { Field, Checkbox } from '$atoms';
	import Label from '$atoms/Label.svelte';

	let { settings = {} as PlannerSettings } = $props();
	const nRows = $derived(settings?.isLandscape ? 14 : 21);
</script>

<div class="planner page travel-planner">
	<header>
		<div class="field flex-[3]">
			<Field i="🗺️">Travel Itinerary</Field>
		</div>
		<div class="field flex-1">
			<Field i="🗓️">Dates</Field>
		</div>
	</header>
	<div class="flight-info">
		<div class="field">
			<Field i="🛫">Departure</Field>
		</div>
		<div class="field">
			<Field i="🛬">Arrival</Field>
		</div>
	</div>

	<div class="content-section">
		<div class="columns">
			<div class="column">
				<div class="section-header">
					<Label i="🛣️">ITINERARY</Label>
				</div>
				{#each Array(nRows) as _}
					<div class="time-row">
						<div class="time-box"></div>
						<div class="line"></div>
					</div>
				{/each}
			</div>
			<div class="column">
				<div class="section-header">
					<Label i="🧳">PACKING LIST</Label>
				</div>
				{#each Array(nRows) as _}
					<div class="row-item">
						<div class="checkbox"></div>
						<div class="line"></div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.travel-planner {
		.content-section {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			flex: 1;
		}

		.flight-info {
			display: flex;
			flex-direction: row;
			gap: 2rem;
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

		.time-row {
			display: flex;
			align-items: flex-end;
			gap: 0.5rem;

			.time-box {
				width: 3rem;
				height: 1.5rem;
				border-bottom: 1px solid var(--outline);
				flex-shrink: 0;
			}
		}
	}
</style>
