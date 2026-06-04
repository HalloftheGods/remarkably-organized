<script lang="ts">
	import type { Month, PlannerSettings } from '$lib';
	import Grid from './Grid.svelte';
	import MonthEmoji from './MonthEmoji.svelte';

	let { settings = {} as PlannerSettings, months = [] as Month[] } = $props();

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
	<div class="months">
		{#each months as month (month.id)}
			<div class="month">
				<a
					href="#{getMonthLink(month)}"
					style="position: relative; z-index: 1; display: block;">
					<h2><MonthEmoji {settings} {month} variant="inline" /> {month.nameLong}</h2>
				</a>
				<div class="dots" style="position: relative; flex: 1; width: 100%;">
					<div
						style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;">
						<Grid />
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	.months {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
		padding: 0 3rem 0;
		h2 {
			text-align: center;
			font-size: 1em;
			font-weight: var(--font-weight-light);
			padding: 0.5rem 0;
		}
	}
	.month {
		display: flex;
		flex-direction: column;
		flex: 1;
		align-items: stretch;
		justify-content: flex-start;
		width: 100%;
		border-top: solid 1px var(--outline);
	}
</style>
