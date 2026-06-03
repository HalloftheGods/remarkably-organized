<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { startWeekOnSunday = false, settings = {} as PlannerSettings } = $props();

	const days = $derived(
		startWeekOnSunday
			? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
			: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
	);
</script>

<div class="meal-planner">
	<div class="header-section">
		<div class="title-block">
			<div class="label">{#if !settings?.emojis?.disable}🍳{/if} WEEK OF</div>
			<div class="line"></div>
		</div>
		<div class="title-block">
			<div class="label">{#if !settings?.emojis?.disable}🛒{/if} GROCERY BUDGET</div>
			<div class="line"></div>
		</div>
	</div>

	<div class="ledger">
		<div class="header">
			<div>DAY</div>
			<div>{#if !settings?.emojis?.disable}🥞{/if} BREAKFAST</div>
			<div>{#if !settings?.emojis?.disable}🥪{/if} LUNCH</div>
			<div>{#if !settings?.emojis?.disable}🥘{/if} DINNER</div>
			<div>{#if !settings?.emojis?.disable}🍎{/if} SNACKS / NOTES</div>
		</div>
		{#each days as day, i}
			<div class="row">
				<div class="col day-col">
					<span class="day-name">{day}</span>
				</div>
				<div class="col"></div>
				<div class="col"></div>
				<div class="col"></div>
				<div class="col"></div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.meal-planner {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 1rem 1.5rem 1.5rem;
		box-sizing: border-box;
		gap: 1.5rem;
	}

	.header-section {
		display: grid;
		grid-template-columns: 2fr 1fr;
		align-items: flex-end;
		gap: 1.5rem;

		.label {
			font-size: 0.75rem;
			font-weight: bold;
			color: var(--text-low);
			margin-bottom: 0.25rem;
			text-align: center;
			letter-spacing: 0.5px;
		}

		.line {
			display: flex;
			align-items: flex-end;
			border-bottom: 1px solid var(--outline);
			height: 1.5rem;
			padding-bottom: 2px;
		}

		.title-block {
			flex: 1;
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
			display: grid;
			grid-template-columns: 1.2fr 1.5fr 1.5fr 1.5fr 1.5fr;
			background-color: var(--nav-bg-pdf, #f8f8f8);
			border-bottom: 2px solid var(--outline);
			font-weight: bold;
			font-size: 0.7rem;
			text-align: center;
			color: var(--text-low);
			letter-spacing: 1px;

			> div {
				padding: 0.6rem 0.25rem;
				border-right: 1px solid var(--outline);
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				&:last-child {
					border-right: none;
				}
			}
		}

		.row {
			display: grid;
			grid-template-columns: 1.2fr 1.5fr 1.5fr 1.5fr 1.5fr;
			flex: 1;
			border-bottom: 1px solid var(--outline);

			&:last-child {
				border-bottom: none;
			}

			&:nth-child(even) {
				background-color: rgba(128, 128, 128, 0.05);
			}

			.col {
				border-right: 1px solid var(--outline);
				height: 100%;

				&:last-child {
					border-right: none;
				}

				&.day-col {
					display: flex;
					align-items: center;
					justify-content: center;
					color: var(--outline-high, #ccc);
					font-weight: 300;
					font-size: 0.85rem;
					letter-spacing: 1px;
					text-transform: uppercase;
				}
			}
		}
	}
</style>
