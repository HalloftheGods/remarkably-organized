<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Box, Text } from '$atoms';
	import { Field } from '$molecules';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	let rows = new Array(30);
</script>

<Box class="finance-tracker">
	<Box class="header-section">
		<Box class="balance-item">
			<Text class="label">STARTING BALANCE</Text>
			<Box class="line">
				{#if showEmoji}
					<Text tag="span" class="currency">💲</Text>
				{/if}
			</Box>
		</Box>
		<Field label="MONTH" class="title-block" />
		<Box class="balance-item">
			<Text class="label">ENDING BALANCE</Text>
			<Box class="line">
				{#if showEmoji}
					<Text tag="span" class="currency">💰</Text>
				{/if}
			</Box>
		</Box>
	</Box>

	<Box class="ledger">
		<Box class="header">
			<Box><Text>DATE</Text></Box>
			<Box><Text>DESCRIPTION / PAYEE</Text></Box>
			<Box><Text>CATEGORY</Text></Box>
			<Box>
				{#if showEmoji}
					<Text tag="span" class="emoji">🤑</Text>
				{/if}
				<Text tag="span">+ Income</Text>
			</Box>
			<Box>
				{#if showEmoji}
					<Text tag="span" class="emoji">💸</Text>
				{/if}
				<Text tag="span">- Expense</Text>
			</Box>
			<Box>
				{#if showEmoji}
					<Text tag="span" class="emoji">💵</Text>
				{/if}
				<Text tag="span">= Balance</Text>
			</Box>
		</Box>
		{#each rows as _, i (i)}
			<Box class="row">
				<Box class="col date"><Text tag="span">/</Text></Box>
				<Box class="col description"></Box>
				<Box class="col category"></Box>
				<Box class="col amount"></Box>
				<Box class="col amount"></Box>
				<Box class="col amount"></Box>
			</Box>
		{/each}
	</Box>
</Box>

<style lang="scss">
	:global {
		.finance-tracker {
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
			grid-template-columns: 1fr 1fr 1fr;
			align-items: flex-end;
			gap: 1.5rem;

			.label {
				font-size: 0.75rem;
				font-weight: bold;
				color: var(--text-low);
				margin-bottom: 0.25rem;
				text-align: center;
				letter-spacing: 0.5px;
				text-transform: uppercase;
			}

			.line {
				display: flex;
				align-items: flex-end;
				border-bottom: 1px solid var(--outline);
				height: 1.5rem;
				padding-bottom: 2px;

				.currency {
					font-size: 1rem;
					line-height: 1;
				}
			}

			.title-block,
			.balance-item {
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
				grid-template-columns: 1.2fr 5fr 2.5fr 2fr 2fr 2fr;
				background-color: var(--nav-bg-pdf, #f8f8f8);
				border-bottom: 2px solid var(--outline);
				font-weight: bold;
				font-size: 0.7rem;
				text-align: center;
				color: var(--text-low);
				letter-spacing: 1px;

				& > div {
					padding: 0.4rem 0.25rem;
					border-right: 1px solid var(--outline);
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					gap: 0.15rem;

					&:last-child {
						border-right: none;
					}

					.emoji {
						font-size: 1.1rem;
						line-height: 1;
					}
				}
			}

			.row {
				display: grid;
				grid-template-columns: 1.2fr 5fr 2.5fr 2fr 2fr 2fr;
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

					&.date {
						display: flex;
						align-items: center;
						justify-content: center;
						color: var(--outline-high, #ccc);
						font-weight: 300;
						font-size: 1.1rem;
					}
				}
			}
		}
	}
</style>
