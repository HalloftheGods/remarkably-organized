<script lang="ts">
	import type { Month, PlannerSettings } from '$lib';
	import { Grid, MonthEmoji } from '$molecules';
	import { Box, Text, Link } from '$atoms';

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
	<Box class="flex flex-col items-center w-full h-full px-8 pt-0 pb-0">
		{#each months as month, i (month.id)}
			<Box class="flex flex-1 items-stretch w-full pt-4 pb-0 {i !== months.length - 1 ? 'border-b border-[var(--outline)]' : ''}">
				<Link
					href="#{getMonthLink(month)}"
					class="relative z-10 flex flex-col justify-center -mt-[35px]">
					<MonthEmoji {settings} {month} variant="watermark" />
					<Text tag="h2" class="text-center text-[0.85em] font-normal pb-2">{month.nameLong}</Text>
					<Box class="grid grid-cols-7 grid-rows-6 justify-items-center items-center gap-y-[0.15rem] gap-x-[0.55rem]">
						{#if startWeekOnSunday}
							<Text class="text-calendar-day">Su</Text>
						{/if}
						<Text class="text-calendar-day">Mo</Text>
						<Text class="text-calendar-day">Tu</Text>
						<Text class="text-calendar-day">We</Text>
						<Text class="text-calendar-day">Th</Text>
						<Text class="text-calendar-day">Fr</Text>
						<Text class="text-calendar-day">Sa</Text>
						{#if !startWeekOnSunday}
							<Text class="text-calendar-day">Su</Text>
						{/if}
						{#each new Array(((month.start.getUTCDay() - (startWeekOnSunday ? 0 : 1) + 7) % 7)) as _}
							<Box></Box>
						{/each}
						{#each new Array(month.end.getUTCDate()) as _, day}
							<Text class="text-calendar-date">{day + 1}</Text>
						{/each}
					</Box>
				</Link>
				<Box class="flex-1 relative">
					<Box class="absolute top-0 left-0 w-full h-full -z-10">
						<Grid />
					</Box>
				</Box>
			</Box>
		{/each}
	</Box>
{/if}
