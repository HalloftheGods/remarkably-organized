<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Checkbox } from '$atoms';

	let {
		startWeekOnSunday = false,
		settings = {},
	}: { startWeekOnSunday?: any; settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	const isLandscape = $derived(settings?.design?.orientation === 'landscape');

	const days = $derived(
		startWeekOnSunday
			? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
			: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	);
</script>

<div
	class="planner page grid {isLandscape
		? 'grid-cols-[2.2fr_1fr]'
		: 'grid-cols-1 grid-rows-[auto_1fr]'}">
	<div class="flex-col-1 h-full gap-4">
		<div class="flex items-end">
			<div class="flex-1">
				<strong
					class="font-bold text-[0.75rem] text-[var(--text-sidebar,var(--text-low))] text-left tracking-[0.5px] uppercase">
					{#if showEmoji}💡
					{/if}MEAL IDEAS & PREP
				</strong>
			</div>
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
		<div class="flex flex-row items-end gap-2">
			<label
				class="font-bold text-[0.75rem] text-[var(--text-sidebar,var(--text-low))] text-left tracking-[0.5px] uppercase mb-[0.15rem]">
				{#if showEmoji}
					<span class="emoji">💰</span>
				{/if}
				<strong>GROCERY BUDGET</strong>
			</label>
			<div class="flex-1 min-h-[1rem] border-b border-[var(--outline)]"></div>
		</div>

		<div class="flex items-end mt-2">
			<div class="flex-1">
				<strong
					class="font-bold text-[0.75rem] text-[var(--text-sidebar,var(--text-low))] text-left tracking-[0.5px] uppercase">
					{#if showEmoji}🛒
					{/if}GROCERY LIST
				</strong>
			</div>
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

		<div class="flex items-end mt-2">
			<div class="flex-1">
				<strong
					class="font-bold text-[0.75rem] text-[var(--text-sidebar,var(--text-low))] text-left tracking-[0.5px] uppercase">
					{#if showEmoji}📦
					{/if}CURRENT STOCK
				</strong>
			</div>
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
