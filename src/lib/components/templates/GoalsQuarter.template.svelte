<script lang="ts">
	import type { Month } from '$lib';
	import type { PlannerSettings } from '$lib';
	import { Grid, MonthEmoji } from '$molecules';

	let {
		months = [] as Month[],
		columns = 1,
		settings = {},
	}: { months?: any; columns?: any; settings?: PlannerSettings } = $props();

	function getMonthLink(month: Month) {
		if (!settings.monthPage) return month.id;
		if (!settings.monthPage.disable) return month.id;
		if (!settings.weekPage?.disable) {
			const week = settings.weeks?.find(
				(week) => week.month === month.month && week.year === month.year,
			);
			return week ? week.id : '';
		}
		if (!settings.dayPage?.disable) {
			const day = settings.days?.find(
				(day) => day.year === month.year && day.month === month.month,
			);
			return day ? day.id : '';
		}
		return month.id;
	}

	const isLandscape = $derived(settings.isLandscape);

	const nRows = isLandscape ? 15 : 9;

	const monthItems = $derived(
		months.map((month: Month) => ({
			...month,
			href: getMonthLink(month),
		})),
	);
</script>

{#if monthItems.length}
	<div class="planner page oals-quarter" class:landscape={isLandscape}>
		<div class="goals-wrapper">
			{#each monthItems as month (month.id)}
				<div class="goals-month-item">
					<a href="#{month.href}" class="month-link">
						<h2 class="month-heading">
							<MonthEmoji {settings} {month} variant="inline" />
							{month.nameLong}
						</h2>
					</a>
					<div class="month-grid-container pl-4">
						<Grid display="todo" {columns} lines={nRows} />
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	@use '$lib/styles/app.css';
	.goals-quarter {
		&.landscape .goals-wrapper {
			flex-direction: row;
		}

		&.landscape .goals-month-item {
			border-top: 0;
			border-left: 1px solid var(--outline);
			padding-left: 0.5rem;
			padding-right: 0.5rem;

			&:first-child {
				border-left: 0;
			}
		}
	}

	.goals-wrapper {
		@apply flex-col-1;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.goals-month-item {
		@apply flex-col-1;
		flex: 1;
		width: 100%;
		border-top: 1px solid var(--outline);

		&:first-child {
			border-top: 0;
		}
	}

	.month-link {
		display: block;
		padding-top: 1rem;
		padding-bottom: 0.5rem;
		text-decoration: none;
		color: inherit;
	}

	.month-heading {
		text-align: left;
		font-size: 1.2em;
		font-weight: 400;
		padding: 0 1rem;
		margin: 0;
	}

	.month-grid-container {
		flex: 1;
		width: 100%;
		position: relative;
		overflow: hidden;
		padding-bottom: 0.5rem;
	}
</style>
