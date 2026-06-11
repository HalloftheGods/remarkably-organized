<script lang="ts">
	import type { Month, PlannerSettings } from '$lib';
	import { Grid, MonthEmoji } from '$molecules';
	let {
		months = [] as Month[],
		startWeekOnSunday = false,
		settings = undefined as any,
	}: { months?: any; startWeekOnSunday?: any; settings?: PlannerSettings } = $props();

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
	<div class="planner page padded overview-quarter">
		<div class="flex justify-between w-full pb-8">
			{#each months as month (month.id)}
				<a href="#{getMonthLink(month)}" class="boxed-month small w-[30%]">
					<MonthEmoji {settings} {month} variant="watermark" />
					<h2>{month.nameLong}</h2>
					<div class="days">
						{#if startWeekOnSunday}
							<div class="label">Su</div>
						{/if}
						<div class="label">Mo</div>
						<div class="label">Tu</div>
						<div class="label">We</div>
						<div class="label">Th</div>
						<div class="label">Fr</div>
						<div class="label">Sa</div>
						{#if !startWeekOnSunday}
							<div class="label">Su</div>
						{/if}
						{#each new Array(month.end.getUTCDate()) as _, day}
							<div
								class="day"
								style:grid-column={day > 0
									? undefined
									: ((month.start.getUTCDay() - (startWeekOnSunday ? 0 : 1) + 7) % 7) +
										1}>
								{day + 1}
							</div>
						{/each}
					</div>
				</a>
			{/each}
		</div>
		<div class="flex-1 relative">
			<div class="absolute top-0 left-0 w-full h-full -z-10">
				<Grid />
			</div>
		</div>
	</div>
{/if}
