<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { startWeekOnSunday = false, settings = {} as PlannerSettings } = $props();

	const days = $derived(
		startWeekOnSunday
			? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
			: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	);
</script>

<div class="meal-planner-container">
	<div class="meal-side">
		<div class="header-section">
			<div class="title-block">
				<div class="label">{#if !settings?.emojis?.disable}💡{/if} MEAL IDEAS & PREP</div>
			</div>
		</div>

		<div class="ledger">
			<div class="header">
				<div class="day-header">DAY</div>
				<div>{#if !settings?.emojis?.disable}🥞{/if} Breakfast</div>
				<div>{#if !settings?.emojis?.disable}🥪{/if} Lunch</div>
				<div>{#if !settings?.emojis?.disable}🥘{/if} Dinner</div>
				<div>{#if !settings?.emojis?.disable}🍎{/if} Snacks</div>
			</div>
			{#each days as day, i}
				<div class="row">
					<div class="col day-col">
						<span class="day-name">{day.toUpperCase()}</span>
					</div>
					<div class="col"></div>
					<div class="col"></div>
					<div class="col"></div>
					<div class="col"></div>
				</div>
			{/each}
		</div>
	</div>

	<div class="grocery-side">
		<div class="budget-header">
			<div class="label">{#if !settings?.emojis?.disable}💰{/if} GROCERY BUDGET</div>
			<div class="line"></div>
		</div>

		<div class="header-section" style="margin-top: 0.5rem;">
			<div class="title-block">
				<div class="label">{#if !settings?.emojis?.disable}🛒{/if} GROCERY LIST</div>
			</div>
		</div>
		<div class="checkbox-container" style="flex: 2.2;">
			{#each Array(18) as _}
				<div class="checkbox-row">
					<div class="checkbox"></div>
					<div class="line"></div>
					<div class="line price-line"></div>
				</div>
			{/each}
		</div>

		<div class="header-section" style="margin-top: 0.5rem;">
			<div class="title-block">
				<div class="label">{#if !settings?.emojis?.disable}📦{/if} CURRENT STOCK</div>
			</div>
		</div>
		<div class="checkbox-container" style="flex: 1;">
			{#each Array(8) as _}
				<div class="checkbox-row">
					<div class="checkbox"></div>
					<div class="line"></div>
					<div class="line price-line"></div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.meal-planner-container {
		display: grid;
		grid-template-columns: 2.2fr 1fr;
		width: 100%;
		height: 100%;
		padding: 1rem 1.5rem 1.5rem;
		box-sizing: border-box;
		gap: 1.25rem;
	}

	.meal-side,
	.grocery-side {
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 1rem;
	}

	.budget-header {
		display: flex;
		align-items: flex-end;
		gap: 0.5rem;
		.label {
			font-size: 0.75rem;
			font-weight: bold;
			color: var(--text-low);
			margin-bottom: 0.15rem;
			letter-spacing: 0.5px;
		}
		.line {
			flex: 1;
			border-bottom: 1px solid var(--outline);
			height: 1rem;
		}
	}

	.header-section {
		display: flex;
		align-items: flex-end;
		.title-block {
			flex: 1;
			.label {
				font-size: 0.75rem;
				font-weight: bold;
				color: var(--text-low);
				text-align: left;
				letter-spacing: 0.5px;
			}
		}
	}

	.ledger {
		display: flex;
		flex-direction: column;
		flex: 1;
		border: 1px solid var(--outline);
		border-radius: 4px;
		overflow: hidden;

		.header {
			display: flex;
			background-color: var(--nav-bg-pdf, #f8f8f8);
			border-bottom: 2px solid var(--outline);
			font-weight: bold;
			font-size: 0.65rem;
			text-align: center;
			color: var(--text-low);
			letter-spacing: 1px;

			> div {
				flex: 1;
				padding: 0.6rem 0.15rem;
				border-right: 1px solid var(--outline);
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				&:last-child {
					border-right: none;
				}
			}
			.day-header {
				width: 2.5rem;
				flex: none;
			}
		}

		.row {
			display: flex;
			flex: 1;
			border-bottom: 1px solid var(--outline);

			&:last-child {
				border-bottom: none;
			}
			&:nth-child(even) {
				background-color: rgba(128, 128, 128, 0.05);
			}

			.col {
				flex: 1;
				border-right: 1px solid var(--outline);
				height: 100%;

				&:last-child {
					border-right: none;
				}

				&.day-col {
					width: 2.5rem;
					flex: none;
					display: flex;
					align-items: center;
					justify-content: center;
					color: var(--outline-high, #ccc);
					font-weight: 400;
					font-size: 0.75rem;
					letter-spacing: 1px;
					text-transform: uppercase;
				}
			}
		}
	}

	.checkbox-container {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.checkbox-row {
		display: flex;
		align-items: flex-end;
		gap: 0.5rem;
		flex: 1;
		min-height: 0; // Allows flex child to shrink properly if needed

		.checkbox {
			width: 1rem;
			height: 1rem;
			border: 1px solid var(--outline);
			border-radius: 3px;
			flex-shrink: 0;
			margin-bottom: 0.15rem;
		}
		.line {
			flex: 1;
			border-bottom: 1px solid var(--outline);
			height: 100%;
			margin-bottom: 0.2rem;
		}
		.price-line {
			flex: 0 0 2rem; // Fixed width space for a price
		}
	}
</style>
