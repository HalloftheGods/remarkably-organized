<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Checkbox, Field } from '$atoms';
	import { getDaysOfWeek } from '$lib/helpers';

	let {
		startWeekOnSunday = false,
		settings = {},
	}: { startWeekOnSunday?: any; settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);

	const days = $derived(getDaysOfWeek(startWeekOnSunday));
</script>

<div
	class="planner page grid {settings?.isLandscape
		? 'grid-cols-[2.2fr_1fr]'
		: 'grid-cols-1 grid-rows-[auto_1fr]'}">
	<div class="flex-col-1 h-full gap-4">
		<div class="section-header !border-b-0">
			{#if showEmoji}💡 {/if}MEAL IDEAS & PREP
		</div>

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
			{#each days as day, i}
				<div
					class="flex flex-1 border-b border-[var(--outline)] last:border-b-0 even:bg-[rgba(128,128,128,0.05)]">
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

	<div class="flex-col-1 h-full gap-4">
		<header>
			<div class="field flex-1">
				<Field i="💰">Grocery Budget</Field>
			</div>
		</header>

		<div class="section-header !border-b-0 mt-2">
			{#if showEmoji}🛒 {/if}GROCERY LIST
		</div>
		<div class="flex-col-1 gap-0 flex-[2.2]">
			{#each Array(18) as _}
				<div class="flex items-end gap-2 flex-1 min-h-0">
					<Checkbox />
					<div class="flex-1 border-b border-[var(--outline)] h-full mb-[0.2rem]"></div>
					<div
						class="flex-[0_0_2rem] border-b border-[var(--outline)] h-full mb-[0.2rem]">
					</div>
				</div>
			{/each}
		</div>

		<div class="section-header !border-b-0 mt-2">
			{#if showEmoji}📦 {/if}CURRENT STOCK
		</div>
		<div class="flex-col-1 gap-0 flex-1">
			{#each Array(8) as _}
				<div class="flex items-end gap-2 flex-1 min-h-0">
					<Checkbox />
					<div class="flex-1 border-b border-[var(--outline)] h-full mb-[0.2rem]"></div>
					<div
						class="flex-[0_0_2rem] border-b border-[var(--outline)] h-full mb-[0.2rem]">
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
