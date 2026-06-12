<script lang="ts">
	import type { Month, PlannerSettings } from '$lib';
	import { formatToString } from '$lib';
	import { Grid, MonthEmoji } from '$molecules';
	import { Link } from '$atoms';

	let {
		months = [] as Month[],
		startWeekOnSunday = false,
		settings = undefined as any,
	} = $props();

	function getMonthLink(month: Month) {
		if (!settings.monthPage) return month.id;
		if (!settings.monthPage.disable) return month.id;
		if (!settings.weekPage.disable) {
			const week = settings.weeks.find(
				(week: any) => week.month === month.month && week.year === month.year,
			);
			return week ? week.id : '';
		}
		if (!settings.dayPage.disable) {
			const day = settings.days.find(
				(day: any) => day.year === month.year && day.month === month.month,
			);
			return day ? day.id : '';
		}
		return month.id;
	}

	const processedMonths = $derived(
		months.map((month) => {
			const daysCount = month.end.getUTCDate();
			const daysArray = new Array(daysCount).fill(0);
			const firstDayOffset =
				((month.start.getUTCDay() - (startWeekOnSunday ? 0 : 1) + 7) % 7) + 1;
			return {
				...month,
				daysArray,
				firstDayOffset,
			};
		}),
	);

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

{#if processedMonths.length}
	<div
		class="planner page padded calendar-quarter p-3
		{settings.isLandscape ? 'flex-row' : ''} items-center">
		{#each processedMonths as month, i (month.id)}
			<div
				class="flex flex-1 items-stretch w-full pt-4 pb-0 {i !==
				processedMonths.length - 1
					? settings.isLandscape
						? 'border-r border-[var(--outline)]'
						: 'border-b border-solid border-[var(--outline)]'
					: ''}">
				<Link
					href="#{getMonthLink(month)}"
					class="boxed-month">
					<MonthEmoji {settings} {month} variant="watermark" />
					<h2>{month.nameLong}</h2>
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
						{#each month.daysArray as _, day}
							<span
								class="day"
								style:grid-column={day > 0 ? undefined : month.firstDayOffset}>
								{day + 1}
							</span>
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
