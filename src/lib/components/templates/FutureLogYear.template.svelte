<script lang="ts">
	import type { Month } from '$lib';
	import type { PlannerSettings } from '$lib';
	import { MonthEmoji } from '$molecules';
	import Grid from '$molecules/Grid.molecule.svelte';

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

<div class="planner page padded future-log-year w-full h-full relative">
	<div
		class="grid gap-2 {settings.isLandscape
			? 'grid-cols-4 grid-rows-3 grid-flow-col '
			: 'grid-cols-3 grid-rows-4 '}
			flex-1 w-full h-full">
		{#each Array(12) as _, i}
			{@const hasMonth = !!months[i]}
			<div
				class="box-container relative flex flex-col border-l border-b border-[var(--outline)]">
				{#if hasMonth}
					<MonthEmoji {settings} month={months[i]} variant="watermark" />
				{/if}
				<div class="box-header relative z-10 flex justify-between items-baseline mb-1">
					<strong>{getMonthName(i).toUpperCase()}</strong>
					{#if hasMonth}
						<strong>{months[i].year}</strong>
					{/if}
				</div>
				<Grid display="lined" lines={7}></Grid>
			</div>
		{/each}
	</div>
</div>
