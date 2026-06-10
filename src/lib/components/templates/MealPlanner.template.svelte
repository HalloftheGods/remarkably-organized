<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Field } from '$atoms';
	import { Grid } from '$molecules';
	import { getDaysOfWeek } from '$lib/helpers';

	let { startWeekOnSunday = false, settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	const days = $derived(getDaysOfWeek(startWeekOnSunday));
	const nRows = {
		grocery: settings?.isLandscape ? 14 : 18,
		stock: settings?.isLandscape ? 5 : 8,
	};
</script>

<div class="planner page meal-planner gap-4">
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
				<div
					class="flex bg-[var(--nav-bg-pdf,#f8f8f8)] border-b-2 border-[var(--outline)] font-bold text-[0.65rem] text-center text-[var(--text-sidebar,var(--text-low))] tracking-[1px]">
					<div
						class="w-10 flex-none py-[0.6rem] px-[0.15rem] border-r border-[var(--outline)] flex-col-1 items-center justify-center">
						<span>DAY</span>
					</div>
					<div
						class="flex-1 py-[0.6rem] px-[0.15rem] border-r border-[var(--outline)] flex-col-1 items-center justify-center">
						{#if showEmoji}<span>🥞</span>{/if}
						<span>Breakfast</span>
					</div>
					<div
						class="flex-1 py-[0.6rem] px-[0.15rem] border-r border-[var(--outline)] flex-col-1 items-center justify-center">
						{#if showEmoji}<span>🥪</span>{/if}
						<span>Lunch</span>
					</div>
					<div
						class="flex-1 py-[0.6rem] px-[0.15rem] border-r border-[var(--outline)] flex-col-1 items-center justify-center">
						{#if showEmoji}<span>🥘</span>{/if}
						<span>Dinner</span>
					</div>
					<div
						class="flex-1 py-[0.6rem] px-[0.15rem] flex-col-1 items-center justify-center">
						{#if showEmoji}<span>🍎</span>{/if}
						<span>Snacks</span>
					</div>
				</div>
				<div class="flex-col-1 min-h-0 flex-1">
					{#each days as day, i}
						<div
							class="flex flex-1 border-b border-[var(--outline)] last:border-b-0 even:bg-[rgba(128,128,128,0.05)] min-h-0">
							<div
								class="w-10 flex-none border-r border-[var(--outline)] h-full flex items-center justify-center text-[var(--outline-high,#ccc)] font-normal text-[0.75rem] tracking-[1px] uppercase">
								<span class="day-name">{day.toUpperCase()}</span>
							</div>
							<div class="flex-1 border-r border-[var(--outline)] h-full"></div>
							<div class="flex-1 border-r border-[var(--outline)] h-full"></div>
							<div class="flex-1 border-r border-[var(--outline)] h-full"></div>
							<div class="flex-1 h-full"></div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="flex-col-1 min-h-0 flex-1 gap-0">
			<div class="flex-col-1 min-h-0 flex-[2.2]">
				<div class="section-header">
					{#if showEmoji}<span class="emoji">🛒</span>{/if}
					<strong>Grocery List</strong>
				</div>
				<div class="grid-container">
					<Grid display="todo" columns={1} lines={nRows.grocery} />
				</div>
			</div>

			<div class="flex-col-1 min-h-0 flex-1">
				<div class="section-header">
					{#if showEmoji}<span class="emoji">📦</span>{/if}
					<strong>Current Stock</strong>
				</div>
				<div class="grid-container">
					<Grid display="todo" columns={1} lines={nRows.stock} />
				</div>
			</div>
		</div>
	</div>
</div>
