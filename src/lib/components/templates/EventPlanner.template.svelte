<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Checkbox } from '$atoms';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	const isLandscape = $derived(settings.design.orientation === 'landscape');
	const nRows = $derived({
		list: 22,
		expenses: 8,
	});
</script>

<div class="planner page event-planner">
	<div class="header-section">
		<div class="field title">
			<label>
				{#if showEmoji}
					<span class="emoji">🎉</span>
				{/if}
				<strong>EVENT PLANNER</strong>
			</label>
			<div class="content"></div>
		</div>
		<div class="field date">
			<label>
				<strong>
					{#if showEmoji}
						<span class="emoji">🗓️</span>
					{/if}
					DATE / TIME
				</strong>
			</label>
			<div class="content"></div>
		</div>
	</div>

	<div class="content-section">
		<div class="columns">
			<div class="column">
				<span class="label">
					{#if showEmoji}
						<span class="emoji">👥</span>
					{/if}
					GUEST LIST
				</span>
				<div class={isLandscape ? 'grid grid-cols-2 gap-1' : 'flex-col'}>
					{#each Array(nRows.list) as _}
						<div class="check-row">
							<Checkbox aria-label="Guest list check" />
							<div class="line"></div>
						</div>
					{/each}
				</div>
			</div>
			<div class="column">
				<span class="label">
					{#if showEmoji}
						<span class="emoji">📋</span>
					{/if}
					TO DO
				</span>
				<div class={isLandscape ? 'grid grid-cols-2 gap-1' : 'flex-col'}>
					{#each Array(nRows.list) as _}
						<div class="check-row">
							<Checkbox aria-label="To do check" />
							<div class="line"></div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="bottom-section">
			<span class="label">
				{#if showEmoji}
					<span class="emoji">💰</span>
				{/if}
				EXPENSES
			</span>
			<div class="budget-grid">
				{#each Array(nRows.expenses) as _}
					<div class="budget-row">
						<div class="item-line"></div>
						<div class="amount-line"></div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.event-planner {
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
			margin-bottom: 0.25rem;
			letter-spacing: 0.5px;
		}

		.line {
			border-bottom: 1px solid var(--outline);
			height: 1.5rem;
			width: 100%;
		}

		.content-section {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			/* prevent the columns from stretching to fill the page so the budget
			   block sits closer to the columns instead of the bottom whitespace */
		}

		.columns {
			display: flex;
			gap: 1.5rem;
			/* don't grow vertically */
			flex: none;

			.column {
				flex: 1;
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
			}
		}

		.check-row {
			display: flex;
			align-items: flex-end;
			gap: 0.5rem;
		}

		.bottom-section {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			.budget-grid {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
			}

			.budget-row {
				display: flex;
				align-items: flex-end;
				gap: 1rem;
			}

			.item-line {
				border-bottom: 1px solid var(--outline);
				height: 1.2rem;
				flex: 1;
			}

			.amount-line {
				border-bottom: 1px solid var(--outline);
				height: 1.2rem;
				width: 6.5rem;
				text-align: right;
			}
		}
	}
</style>
