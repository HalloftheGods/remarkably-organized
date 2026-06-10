<script lang="ts">
	import type { Month, PlannerSettings } from '$lib';
	import { formatToString } from '$lib';
	import { MonthEmoji } from '$molecules';
	import { Link } from '$atoms';

	let {
		months = [] as Month[],
		startWeekOnSunday = false,
		settings = {},
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
	{@const isLandscape = settings?.isLandscape}
	<div
		class="grid {isLandscape
			? 'grid-cols-4 grid-rows-3 grid-flow-col'
			: 'grid-cols-3 grid-rows-4'} items-center justify-items-center gap-y-4 gap-x-6 flex-1 w-full px-6 pb-4 min-h-0">
		{#each months as month (month.id)}
			<Link href="#{getMonthLink(month)}" class="boxed-month">
				<MonthEmoji {settings} {month} variant="watermark" />
				<h2>
					{month.nameLong}
				</h2>
				<div class="days">
					{#if startWeekOnSunday}
						<span class="label">{getDayShortName(0)}</span>
					{/if}
					<span class="label">{getDayShortName(1)}</span>
					<span class="label">{getDayShortName(2)}</span>
					<span class="label">{getDayShortName(3)}</span>
					<span class="label">{getDayShortName(4)}</span>
					<span class="label">{getDayShortName(5)}</span>
					<span class="label">{getDayShortName(6)}</span>
					{#if !startWeekOnSunday}
						<span class="label">{getDayShortName(0)}</span>
					{/if}
					{#each new Array(month.end.getUTCDate()) as _, day}
						<span
							class="day"
							style:grid-column={day > 0
								? undefined
								: ((month.start.getUTCDay() - (startWeekOnSunday ? 0 : 1) + 7) % 7) + 1}>
							{day + 1}
						</span>
					{/each}
				</div>
			</Link>
		{/each}
	</div>
{/if}
