<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Checkbox } from '$atoms';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
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
				<strong>DATE / TIME</strong>
			</label>
			<div class="content"></div>
		</div>
	</div>

	<div class="content-section">
		<div class="columns">
			<div class="column">
				<span class="label">GUEST LIST</span>
				{#each Array(15) as _}
					<div class="check-row">
						<Checkbox aria-label="Guest list check" />
						<div class="line"></div>
					</div>
				{/each}
			</div>
			<div class="column">
				<span class="label">TO DO</span>
				{#each Array(15) as _}
					<div class="check-row">
						<Checkbox aria-label="To do check" />
						<div class="line"></div>
					</div>
				{/each}
			</div>
		</div>

		<div class="bottom-section">
			<span class="label">EXPENSES</span>
			<div class="budget-grid">
				{#each Array(6) as _}
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
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 1.5rem;
		box-sizing: border-box;
		gap: 1.5rem;
	}

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
</style>
