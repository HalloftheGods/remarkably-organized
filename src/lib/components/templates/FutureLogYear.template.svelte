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
</script>

<div class="planner page padded future-log-year gap-0 w-full h-full relative">
	<div
		class="grid {settings.isLandscape
			? 'grid-cols-4 grid-rows-3 grid-flow-col [&>*:nth-child(3n)]:border-b-0 [&>*:nth-child(-n+3)]:border-l-0'
			: 'grid-cols-3 grid-rows-4 [&>*:nth-child(3n+1)]:border-l-0 [&>*:nth-last-child(-n+3)]:border-b-0'} flex-1 w-full h-full">
		{#each Array(12) as _, i}
			{@const hasMonth = !!months[i]}
			<div
				class="box-container relative flex flex-col border-l border-b border-[var(--outline)] p-3">
				{#if hasMonth}
					<MonthEmoji {settings} month={months[i]} variant="watermark" />
				{/if}
				<div class="box-header relative z-10 flex justify-between items-baseline mb-1">
					<strong>{getMonthName(i).toUpperCase()}</strong>
					{#if hasMonth}
						<strong>{months[i].year}</strong>
					{/if}
				</div>
				<div class="flex-col-1 gap-[0.4rem] relative z-10 pt-1 flex-1">
					{#each Array(5) as _}
						<div class="border-b border-solid border-[var(--outline-low,#e0e0e0)] h-4">
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
