<script lang="ts">
	import type { Month, PlannerSettings } from '$lib';
	import { Grid } from '$molecules';

	let {
		months = [] as Month[],
		settings = undefined as any,
	}: { months?: any; settings?: PlannerSettings } = $props();

	function getMonthLink(month: Month) {
		if (!settings.monthPage) return month.id;
		if (!settings.monthPage.disable) return month.id;
		if (!settings.weekPage.disable) {
			const week = settings.weeks.find(
				(week) => week.month === month.month && week.year === month.year,
			);
			return week ? week.id : '';
		}
		if (!settings.dayPage.disable) {
			const day = settings.days.find(
				(day) => day.year === month.year && day.month === month.month,
			);
			return day ? day.id : '';
		}
		return month.id;
	}

	const isLandscape = $derived(settings.isLandscape);
</script>

<div class="planner page padded gap-0 notes-year relative w-full h-full">
	<div class="absolute inset-0 w-full h-full box-border">
		<div
			class="relative w-full h-full [&_.dots]:absolute [&_.dots]:left-0 [&_.dots]:top-0 [&_.dots]:w-full [&_.dots]:h-full [&_.dots]:z-0 [&_.dots]:!p-0">
			<Grid display="dotted-small" />
		</div>
	</div>

	{#if months.length}
		<div
			class="relative z-10 grid {isLandscape
				? 'grid-cols-4 grid-rows-3 grid-flow-col [&>*:nth-child(3n)]:border-b-0 [&>*:nth-child(-n+3)]:border-l-0'
				: 'grid-cols-3 grid-rows-4 [&>*:nth-child(3n+1)]:border-l-0 [&>*:nth-last-child(-n+3)]:border-b-0'} flex-1 w-full h-full">
			{#each months as month (month.id)}
				<a
					href="#{getMonthLink(month)}"
					class="border-l border-b border-[var(--outline)] relative">
					<h2 class="text-center text-[1em] py-2 font-light">
						{month.nameLong}
					</h2>
				</a>
			{/each}
		</div>
	{:else}
		<div
			class="relative z-10 grid {isLandscape
				? 'grid-cols-4 grid-rows-3 grid-flow-col [&>*:nth-child(3n)]:border-b-0 [&>*:nth-child(-n+3)]:border-l-0'
				: 'grid-cols-3 grid-rows-4 [&>*:nth-child(3n+1)]:border-l-0 [&>*:nth-last-child(-n+3)]:border-b-0'} flex-1 w-full h-full">
			{#each new Array(12) as _, i (i)}
				<div class="border-l border-b border-[var(--outline)] relative">
					<h2 class="text-center text-[1em] py-2 font-light">
						{new Date(new Date().setMonth(i)).toLocaleString('default', {
							month: 'long',
						})}
					</h2>
				</div>
			{/each}
		</div>
	{/if}
</div>
