<script lang="ts">
	import type { Month } from '$lib';
	import type { PlannerSettings } from '$lib';
	import { MonthEmoji } from '$molecules';

	let {
		months = [] as Month[],
		settings = {},
	}: { months?: any; settings?: PlannerSettings } = $props();

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	function getMonthName(index: number) {
		if (months[index]) return months[index].nameLong;
		return monthNames[index];
	}

	const isLandscape = $derived(settings?.design?.orientation === 'landscape');
</script>

<div class="planner page">
	<div
		class="grid {isLandscape
			? 'grid-cols-4 grid-rows-3 grid-flow-col'
			: 'grid-cols-3 grid-rows-4'} gap-4 flex-1">
		{#each Array(12) as _, i}
			{@const hasMonth = !!months[i]}
			<div class="box-container p-2 relative">
				{#if hasMonth}
					<MonthEmoji {settings} month={months[i]} variant="watermark" />
				{/if}
				<div class="box-header relative z-10">{getMonthName(i).toUpperCase()}</div>
				<div class="flex-col-1 gap-[0.4rem] relative z-10 pt-1">
					{#each Array(5) as _}
						<div class="border-b border-dashed border-[var(--outline-low,#e0e0e0)] h-4">
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
