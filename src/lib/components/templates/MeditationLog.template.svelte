<script lang="ts">
	import RowInput from '$atoms/RowInput.svelte';
	import type { PlannerSettings } from '$lib';
	import { Checkbox } from '$atoms';
	import Field from '$atoms/Field.atom.svelte';

	let { settings = {} as PlannerSettings } = $props();
</script>

<div class="planner page padded meditation-log">
	<header>
		<div class="field flex-[3]">
			<Field i="🧘">Meditation & Breathwork Log</Field>
		</div>
		<div class="field flex-1">
			<Field i="🗓️">Date / Week</Field>
		</div>
	</header>

	<div class="content-section flex-col-1 gap-5 flex-1 mt-4">
		<div class="flex-col-1 gap-2">
			<div class="section-header">DAILY SESSION TRACKER</div>
			<div class="table-header">
				<span class="col-day">DAY</span>
				<span class="col-time">TIME</span>
				<span class="col-dur">DUR</span>
				<span class="flex-1 pl-2">TECHNIQUE / FOCUS</span>
				<span class="flex-1 pl-2">STATE OF MIND (PRE / POST)</span>
			</div>
			{#each ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as day}
				<div class="table-row">
					<span class="col-day label-day">{day}</span>
					<div class="col-time line-box"></div>
					<div class="col-dur line-box"></div>
					<div class="flex-1 line-box"></div>
					<div class="flex-1 line-box"></div>
				</div>
			{/each}
		</div>

		<div class="flex gap-8 flex-1 mt-4">
			<div class="flex-col-1 flex-1">
				<div class="section-header">INSIGHTS / REVELATIONS / EXPERIENCES</div>
				<div class="lines">
					{#each Array(7) as _}
						<div class="line">
					<RowInput />
				</div>
					{/each}
				</div>
			</div>

			<div class="flex-col-1 flex-1">
				<div class="section-header">WEEKLY MINDFULNESS GOALS</div>
				{#each Array(3) as _}
					<div class="row-item">
						<Checkbox aria-label="Goal check" />
						<div class="line">
					<RowInput />
				</div>
					</div>
				{/each}

				<div class="section-header mt-6">BREATHWORK & HABITS</div>
				<div class="flex-col-1 gap-2 pt-1">
					{#each ['Box Breathing', 'Wim Hof Method', '4-7-8 Technique', 'Anapanasati / Focus'] as habit}
						<div class="habit-row">
							<span class="habit-name">{habit}</span>
							<div class="days-grid">
								{#each ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as dayChar}
									<div class="day-check">
										<span class="day-char">{dayChar}</span>
										<Checkbox aria-label="Day check" class="small-checkbox" />
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.meditation-log {
		.table-header {
			display: flex;
			font-family: var(--font-display);
			font-size: 0.65rem;
			font-weight: bold;
			color: var(--text-sidebar, var(--text-low));
			border-bottom: 1px solid var(--outline);
			padding-bottom: 0.2rem;
		}

		.table-row {
			display: flex;
			align-items: flex-end;
			gap: 0.5rem;
			margin-bottom: 0.25rem;
		}

		.col-day {
			width: 3rem;
		}
		.col-time {
			width: 4rem;
		}
		.col-dur {
			width: 3rem;
		}

		.label-day {
			font-family: var(--font-display);
			font-size: 0.7rem;
			font-weight: bold;
			color: var(--text-sidebar, var(--text-low));
			padding-bottom: 0.2rem;
		}

		.line-box {
			border-bottom: 1px solid var(--outline);
			height: 1.5rem;
		}

		.habit-row {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.habit-name {
				font-size: 0.7rem;
				color: var(--text-sidebar, var(--text-low));
			}

			.days-grid {
				display: flex;
				gap: 0.35rem;
			}

			.day-check {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 0.15rem;

				.day-char {
					font-family: var(--font-display);
					font-size: 0.55rem;
					font-weight: bold;
					color: var(--text-sidebar, var(--text-low));
				}

				:global(.small-checkbox) {
					width: 0.85rem !important;
					height: 0.85rem !important;
				}
			}
		}
	}
</style>
