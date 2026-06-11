<script lang="ts">
	import RowInput from '$atoms/RowInput.svelte';
	import type { PlannerSettings } from '$lib';
	import { Field, Checkbox, Emoji } from '$atoms';
	import PlannerLine from '$molecules/PlannerLine.svelte';

	let { settings = undefined as any } = $props();
	const nRows = $derived(settings?.isLandscape ? 14 : 21);
</script>

<div class="planner page padded travel-planner">
	<header>
		<div class="field flex-[3]">
			<Field i="🗺️">Travel Itinerary</Field>
		</div>
		<div class="field flex-1">
			<Field i="🗓️">Dates</Field>
		</div>
	</header>

	<div class="flight-info mt-4 mb-4">
		<div class="field flex-1">
			<Field i="🛫">Departure</Field>
		</div>
		<div class="field flex-1">
			<Field i="🛬">Arrival</Field>
		</div>
	</div>

	<div class="content-section flex-1">
		<div class="columns">
			<div class="column">
				<div class="section-header">
					<Emoji>🛣️</Emoji>
					ITINERARY
				</div>
				{#each Array(nRows) as _}
					<div class="time-row">
						<div class="time-box"></div>
						<PlannerLine />
					</div>
				{/each}
			</div>
			<div class="column">
				<div class="section-header">
					<Emoji>🧳</Emoji>
					PACKING LIST
				</div>
				{#each Array(nRows) as _}
					<div class="row-item">
						<Checkbox />
						<div class="line">
							<RowInput />
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.travel-planner {
		.flight-info {
			display: flex;
			gap: 2rem;
		}

		.columns {
			display: flex;
			gap: 2rem;
			height: 100%;

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
			flex: 1;

			.time-box {
				width: 3rem;
				height: 100%;
				border-bottom: 1px solid var(--outline);
				flex-shrink: 0;
			}
		}

		.row-item {
			flex: 1;
			margin-bottom: 0.2rem;
		}
	}
</style>
