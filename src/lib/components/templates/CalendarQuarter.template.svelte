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
	{@const isLandscape = settings.design.orientation === 'landscape'}
	<div
		class="planner page flex {isLandscape
			? 'flex-row'
			: 'flex-col'} items-center w-full h-full">
		{#each months as month, i (month.id)}
			<div
				class="flex flex-1 items-stretch w-full pt-4 pb-0 {i !== months.length - 1
					? isLandscape
						? 'border-r border-[var(--outline)]'
						: 'border-b border-[var(--outline)]'
					: ''}">
				<Link
					href="#{getMonthLink(month)}"
					class="boxed-month small !justify-center -mt-[35px]">
					<MonthEmoji {settings} {month} variant="watermark" />
					<h2>{month.nameLong}</h2>
					<div class="days">
						{#if startWeekOnSunday}
							<span class="label">Su</span>
						{/if}
						<span class="label">Mo</span>
						<span class="label">Tu</span>
						<span class="label">We</span>
						<span class="label">Th</span>
						<span class="label">Fr</span>
						<span class="label">Sa</span>
						{#if !startWeekOnSunday}
							<span class="label">Su</span>
						{/if}
						{#each new Array(month.end.getUTCDate()) as _, day}
							<span
								class="day"
								style:grid-column={day > 0
									? undefined
									: ((month.start.getUTCDay() - (startWeekOnSunday ? 0 : 1) + 7) % 7) +
										1}>
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

