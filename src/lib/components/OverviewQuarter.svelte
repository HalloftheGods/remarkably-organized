<script lang="ts">
	import type { Month, PlannerSettings } from '$lib';
	import Grid from './Grid.svelte';
	import MonthEmoji from './MonthEmoji.svelte';
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
	<div class="overview">
		<div class="calendars">
			{#each months as month (month.id)}
				<a href="#{getMonthLink(month)}" class="calendar">
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
									? null
									: ((month.start.getUTCDay() - (startWeekOnSunday ? 0 : 1) + 7) % 7) +
										1}>
								{day + 1}
							</div>
						{/each}
					</div>
				</a>
			{/each}
		</div>
		<div class="notes" style:position="relative">
			<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;">
				<Grid />
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.overview {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 1rem 2rem 0;
	}
	.calendars {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 1rem 0 2rem;
	}
	.calendar {
		display: block;
		position: relative;
		z-index: 1;
		width: 30%;
		
		h2 {
			text-align: center;
			font-size: 0.85em;
			font-weight: var(--font-weight-normal);
			padding: 0 0 0.5rem;
		}
	}
	.days {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-template-rows: repeat(6, 1fr);
		justify-items: center;
		align-items: center;
		gap: 0.15rem 0.35rem;
		.label {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 0.65em;
			font-weight: var(--font-weight-bold);
			color: var(--text-low);
		}
		.day {
			font-size: 0.85em;
			font-weight: var(--font-weight-light);
		}
	}
	.notes {
		flex: 1;
		width: 100%;
	}
</style>
