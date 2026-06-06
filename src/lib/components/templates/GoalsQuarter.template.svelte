<script lang="ts">
	import type { Month, PlannerSettings } from '$lib';
	import { Grid, MonthEmoji } from '$molecules';

	let {
		settings = {} as PlannerSettings,
		months = [] as Month[],
		columns = 1,
	} = $props();

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
				<a href="#{getMonthLink(month)}">
					<h2><MonthEmoji {settings} {month} variant="inline" /> {month.nameLong}</h2>
				</a>
				<div class="goals">
					<Grid display="todo" {columns} lines={10} />
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
		padding: 0 2rem 0;
	}
	.month {
		display: flex;
		flex-direction: column;
		flex: 1;
		width: 100%;
		border-top: solid 1px var(--outline);
		&:first-child {
			border-top: none;
		}

		a {
			display: block;
			padding: 1rem 0 0.5rem;
		}

		h2 {
			text-align: left;
			font-size: 1.2em;
			font-weight: var(--font-weight-normal);
			padding: 0 1rem;
		}
	}
	.goals {
		flex: 1;
		width: 100%;
		position: relative;
		overflow: hidden;
	}
</style>
