<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import Field from '$atoms/Field.atom.svelte';
	import { getDaysOfWeek } from '$lib/helpers';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	const days = $derived(
		getDaysOfWeek(settings?.date?.startWeekOnSunday).map((d) => d.toUpperCase()),
	);
	const nRows = $derived(settings?.isLandscape ? 14 : 20);
</script>

<div class="planner page padded language-learning">
	<div class="header-section">
		<div class="field title">
			<Field i="🗣️">LANGUAGE LEARNING</Field>
		</div>
		<div class="field date">
			<Field i="📅">DATE / WEEK</Field>
		</div>
	</div>

	<div class="content-section">
		<div class="columns">
			<div class="column">
				<div class="label">
					{#if !settings?.emojis?.disable}
						💬
					{/if}
					VOCABULARY
				</div>
				{#each Array(nRows) as _}
					<div class="vocab-row">
						<div class="line"></div>
						<span class="equals">=</span>
						<div class="line"></div>
					</div>
				{/each}
			</div>
			<div class="column">
				<div class="label">
					{#if !settings?.emojis?.disable}
						🌐
					{/if}
					GRAMMAR / CONCEPTS
				</div>
				{#each Array(nRows) as _}
					<div class="vocab-row">
						<div class="line"></div>
					</div>
				{/each}
			</div>
		</div>

		<div class="bottom-section">
			<div class="label">
				{#if !settings?.emojis?.disable}
					🎯
				{/if}
				PRACTICE TRACKER
			</div>
			<div class="practice-days">
				<!-- use planner week-start setting  -->
				{#each days as day}
					<div class="day-box">
						<div class="day-label">{day}</div>
						<div class="box"></div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.language-learning {
		.header-section {
			display: flex;
			gap: 2rem;

			.field {
				display: flex;
				flex-direction: column;
			}
			.title {
				flex: 3;
			}
			.date {
				flex: 1;
			}
		}

		.label {
			font-size: 0.75rem;
			font-weight: bold;
			color: var(--text-low);
			letter-spacing: 0.5px;
		}

		.content-section {
			display: flex;
			flex-direction: column;
			flex: 1;
		}

		.columns {
			display: flex;
			gap: 2rem;
			flex: 1;

			.column {
				flex: 1;
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
			}
		}

		.vocab-row {
			display: flex;
			align-items: flex-end;
			gap: 0.5rem;

			.equals {
				// font-size: 1rem;
				max-height: 10px;
				color: var(--text-low);
			}

			.line {
				border-bottom: 1px solid var(--outline);
				height: 1.5rem;
				width: 100%;
			}
		}
		.line {
			border-bottom: 1px solid var(--outline);
			height: 1.5rem;
			width: 100%;
		}

		.bottom-section {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			margin-top: auto;
			padding-top: 1rem;
		}

		.practice-days {
			display: flex;
			justify-content: space-between;

			.day-box {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 0.5rem;

				.day-label {
					font-size: 0.65rem;
					font-weight: bold;
					color: var(--text-low);
				}

				.box {
					width: 2rem;
					height: 2rem;
					border: 1px solid var(--outline);
				}
			}
		}
	}
</style>
