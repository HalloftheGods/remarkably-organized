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

	const dayNames = $derived.by(() => {
		const names = [];
		const baseDate = new Date();
		baseDate.setDate(baseDate.getDate() - baseDate.getDay());
		for (let i = 0; i < 7; i++) {
			const day = formatToString(
				baseDate.setDate(baseDate.getDate() + (i === 0 ? 0 : 1)),
				{
					type: 'date',
					weekday: 'short',
				},
			);
			const capitalized = day ? day.charAt(0).toUpperCase() + day.slice(1) : '';

			if (capitalized === 'Mon') names[i] = 'Mo';
			else if (capitalized === 'Tue') names[i] = 'Tu';
			else if (capitalized === 'Wed') names[i] = 'We';
			else if (capitalized === 'Thu') names[i] = 'Th';
			else if (capitalized === 'Fri') names[i] = 'Fr';
			else if (capitalized === 'Sat') names[i] = 'Sa';
			else if (capitalized === 'Sun') names[i] = 'Su';
			else names[i] = capitalized;
		}
		return names;
	});
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
						<span class="label">{dayNames[0]}</span>
					{/if}
					<span class="label">{dayNames[1]}</span>
					<span class="label">{dayNames[2]}</span>
					<span class="label">{dayNames[3]}</span>
					<span class="label">{dayNames[4]}</span>
					<span class="label">{dayNames[5]}</span>
					<span class="label">{dayNames[6]}</span>
					{#if !startWeekOnSunday}
						<span class="label">{dayNames[0]}</span>
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
