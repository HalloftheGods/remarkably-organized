<script lang="ts">
		import type { PlannerSettings } from '$lib';
	import { Checkbox, Field } from '$atoms';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	const nRows = $derived({
		list: 22,
		expenses: 8,
	});
</script>

<div class="planner page event-planner">
	<header>
		<div class="field flex-[3]">
			<Field i="🎉">Event Planner</Field>
		</div>
		<div class="field flex-[1]">
			<Field i="🗓️">Date / Time</Field>
		</div>
	</header>

	<div class="content-section">
		<div class="columns">
			<div class="column">
				<div class="section-header">
					{#if showEmoji}
						<span class="emoji">👥</span>
					{/if}
					GUEST LIST
				</div>
				<div class={settings?.isLandscape ? 'grid grid-cols-2 gap-1' : 'flex-col'}>
					{#each Array(nRows.list) as _}
						<div class="check-row">
							<Checkbox aria-label="Guest list check" />
							<div class="line"></div>
						</div>
					{/each}
				</div>
			</div>
			<div class="column">
				<div class="section-header">
					{#if showEmoji}
						<span class="emoji">📋</span>
					{/if}
					TO DO
				</div>
				<div class={settings?.isLandscape ? 'grid grid-cols-2 gap-1' : 'flex-col'}>
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
			<div class="section-header">
				{#if showEmoji}
					<span class="emoji">💰</span>
				{/if}
				EXPENSES
			</div>
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
