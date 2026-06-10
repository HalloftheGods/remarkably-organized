<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Emoji, Field } from '$atoms';
	import { Grid } from '$molecules';
	import { getDaysOfWeek } from '$lib/helpers';

	let { startWeekOnSunday = false, settings = {} as PlannerSettings } = $props();
	const days = $derived(getDaysOfWeek(startWeekOnSunday));
	const nRows = $derived({
		grocery: settings.isLandscape ? 14 : 18,
		stock: settings.isLandscape ? 5 : 8,
	});
</script>

<div class="planner page meal-planner gap-4 p-1">
	<div class="flex gap-8">
		<div class="field flex-[2]">
			<Field i="💡">MEAL IDEAS & PREP</Field>
		</div>
		<div class="field flex-1">
			<Field i="💰">Grocery Budget</Field>
		</div>
	</div>

	<div class="flex flex-row gap-6 flex-1 min-h-0">
		<div class="flex-col-1 min-h-0 flex-1">
			<div class="box-container flex-1">
				<div class="table-header-row">
					<div class="table-header-cell-fixed">
						<span>DAY</span>
					</div>
					<div class="table-header-cell">
						<Emoji size="s">🥞</Emoji>
						<span>Breakfast</span>
					</div>
					<div class="table-header-cell">
						<Emoji size="s">🥪</Emoji>
						<span>Lunch</span>
					</div>
					<div class="table-header-cell">
						<Emoji size="s">🥘</Emoji>
						<span>Dinner</span>
					</div>
					<div class="table-header-cell !border-r-0">
						<Emoji size="s">🍎</Emoji>
						<span>Snacks</span>
					</div>
				</div>
				<div class="flex-col-1 min-h-0 flex-1">
					{#each days as day, i}
						<div class="table-row">
							<div class="table-cell-fixed">
								<span class="day-name">{day.toUpperCase()}</span>
							</div>
							<div class="table-cell"></div>
							<div class="table-cell"></div>
							<div class="table-cell"></div>
							<div class="table-cell !border-r-0"></div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="flex-col-1 min-h-0 flex-1 gap-0">
			<div class="flex-col-1 min-h-0 flex-[2.2]">
				<div class="section-header">
					<Emoji size="s">🛒</Emoji>
					<strong>Grocery List</strong>
				</div>
				<div class="grid-container">
					<Grid display="todo" columns={1} lines={nRows.grocery} />
				</div>
			</div>

			<div class="flex-col-1 min-h-0 flex-1">
				<div class="section-header">
					<Emoji size="s">📦</Emoji>
					<strong>Current Stock</strong>
				</div>
				<div class="grid-container">
					<Grid display="todo" columns={1} lines={nRows.stock} />
				</div>
			</div>
		</div>
	</div>
</div>
