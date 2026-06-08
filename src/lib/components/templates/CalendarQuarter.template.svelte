<script lang="ts">
	import type { Month, PlannerSettings } from '$lib';
	import { Grid, MonthEmoji } from '$molecules';
	import { Link } from '$atoms';

	let {
		settings = {} as PlannerSettings,
		months = [] as Month[],
		startWeekOnSunday = false,
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
	<div class="planner page flex flex-col items-center w-full h-full px-8 pt-0 pb-0">
		{#each months as month, i (month.id)}
			<div class="flex flex-1 items-stretch w-full pt-4 pb-0 {i !== months.length - 1
					? 'border-b border-[var(--outline)]'
					: ''}">
				<Link
					href="#{getMonthLink(month)}"
					class="relative z-10 flex flex-col justify-center -mt-[35px]">
					<MonthEmoji {settings} {month} variant="watermark" />
					<h2 class="text-center text-[0.85em] font-normal pb-2">
						{month.nameLong}
					</h2>
					<div class="grid grid-cols-7 grid-rows-6 justify-items-center items-center gap-y-[0.15rem] gap-x-[0.55rem]">
						{#if startWeekOnSunday}
							<span class="text-calendar-day">Su</span>
						{/if}
						<span class="text-calendar-day">Mo</span>
						<span class="text-calendar-day">Tu</span>
						<span class="text-calendar-day">We</span>
						<span class="text-calendar-day">Th</span>
						<span class="text-calendar-day">Fr</span>
						<span class="text-calendar-day">Sa</span>
						{#if !startWeekOnSunday}
							<span class="text-calendar-day">Su</span>
						{/if}
						{#each new Array((month.start.getUTCDay() - (startWeekOnSunday ? 0 : 1) + 7) % 7) as _}
							<div></div>
						{/each}
						{#each new Array(month.end.getUTCDate()) as _, day}
							<span class="text-calendar-date">{day + 1}</span>
						{/each}
					</div>
				</Link>
				<div class="flex-1 relative">
					<div class="absolute top-0 left-0 w-full h-full -z-10">
						<Grid />
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}

