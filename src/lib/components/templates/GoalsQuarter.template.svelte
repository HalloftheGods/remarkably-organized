<script lang="ts">
		import type { Month } from '$lib';
	import type { PlannerSettings } from '$lib';
	import { Grid, MonthEmoji } from '$molecules';

	let {
		months = [] as Month[],
		columns = 1,
		settings = {},
	}: { months?: any; columns?: any; settings?: PlannerSettings } = $props();

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
		class="flex-col-1 items-center w-full h-full px-8 py-0 {settings?.isLandscape
			? 'flex-row'
			: ''}">
		{#each months as month (month.id)}
			<div
				class="flex-col-1 flex-1 w-full border-t border-[var(--outline)] first:border-t-0 {settings?.isLandscape
					? 'border-t-0 border-l first:border-l-0 px-2'
					: ''}">
				<a
					href="#{getMonthLink(month)}"
					class="block pt-4 pb-2 no-underline text-inherit">
					<h2 class="text-left text-[1.2em] font-normal px-4 m-0">
						<MonthEmoji {settings} {month} variant="inline" />
						{month.nameLong}
					</h2>
				</a>
				<div class="flex-1 w-full relative overflow-hidden">
					<Grid display="todo" {columns} lines={10} />
				</div>
			</div>
		{/each}
	</div>
{/if}
