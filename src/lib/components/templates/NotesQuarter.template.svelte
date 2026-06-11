<script lang="ts">
	import type { Month, PlannerSettings } from '$lib';
	import { Grid, MonthEmoji } from '$molecules';

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
</script>

{#if months.length}
	<div
		class="planner page padded notes-quarter flex-col-1 items-center px-8 {settings.isLandscape
			? 'flex-row'
			: ''}">
		{#each months as month (month.id)}
			<div
				class="flex-col-1 flex-1 w-full border-t border-[var(--outline)] first:border-t-0 {settings.isLandscape
					? 'border-t-0 border-l first:border-l-0 px-2'
					: ''}">
				<a
					href="#{getMonthLink(month)}"
					class="block pt-4 pb-2 no-underline text-inherit text-center">
					<h2 class="text-[1.2em] font-normal m-0">
						<MonthEmoji {settings} {month} variant="inline" />
						{month.nameLong}
					</h2>
				</a>
				<div class="relative flex-1 w-full">
					<div class="absolute top-0 left-0 w-full h-full -z-10">
						<Grid />
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
</style>
