<script lang="ts">
	import type { Month, PlannerSettings } from '$lib';
	import { formatToString } from '$lib';
	import { MonthEmoji } from '$molecules';
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

	function capitalizeFirstLetter(string: string) {
		if (!string) return '';
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function getDayShortName(offset = 0) {
		const day = capitalizeFirstLetter(
			formatToString(
				new Date().setDate(new Date().getDate() - new Date().getDay() + offset),
				{ type: 'date', weekday: 'short' },
			),
		);
		if (day === 'Mon') return 'Mo';
		if (day === 'Tue') return 'Tu';
		if (day === 'Wed') return 'We';
		if (day === 'Thu') return 'Th';
		if (day === 'Fri') return 'Fr';
		if (day === 'Sat') return 'Sa';
		if (day === 'Sun') return 'Su';
		return day;
	}
</script>

{#if months.length}
	<Box class="grid grid-cols-3 grid-rows-4 items-center justify-items-center gap-y-0 gap-x-6 flex-1 w-full px-6 pb-4">
		{#each months as month (month.id)}
			<Link
				href="#{getMonthLink(month)}"
				class="relative z-10 block">
				<MonthEmoji {settings} {month} variant="watermark" />
				<Text tag="h2" class="text-center text-[1.1em] font-normal pb-1 leading-[1.2rem]">{month.nameLong}</Text>
				<Box class="grid grid-cols-7 grid-rows-6 justify-items-center items-center gap-y-[0.15rem] gap-x-[0.25rem]">
					{#if startWeekOnSunday}
						<Text class="text-calendar-day">{getDayShortName(0)}</Text>
					{/if}
					<Text class="text-calendar-day">{getDayShortName(1)}</Text>
					<Text class="text-calendar-day">{getDayShortName(2)}</Text>
					<Text class="text-calendar-day">{getDayShortName(3)}</Text>
					<Text class="text-calendar-day">{getDayShortName(4)}</Text>
					<Text class="text-calendar-day">{getDayShortName(5)}</Text>
					<Text class="text-calendar-day">{getDayShortName(6)}</Text>
					{#if !startWeekOnSunday}
						<Text class="text-calendar-day">{getDayShortName(0)}</Text>
					{/if}
					{#each new Array(((month.start.getUTCDay() - (startWeekOnSunday ? 0 : 1) + 7) % 7)) as _}
						<Box></Box>
					{/each}
					{#each new Array(month.end.getUTCDate()) as _, day}
						<Text class="text-calendar-date">{day + 1}</Text>
					{/each}
				</Box>
			</Link>
		{/each}
	</Box>
{/if}
