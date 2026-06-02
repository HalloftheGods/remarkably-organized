<script lang="ts">
	let rows = new Array(30);
</script>

<div class="finance-tracker">
	<div class="header-section">
		<div class="balance-item">
			<div class="label">STARTING BALANCE</div>
			<div class="line">
				<span class="currency">💲</span>
			</div>
		</div>
		<div class="title-block">
			<div class="label">MONTH</div>
			<div class="line"></div>
		</div>
		<div class="balance-item">
			<div class="label">ENDING BALANCE</div>
			<div class="line">
				<span class="currency">💰</span>
			</div>
		</div>
	</div>

	<div class="ledger">
		<div class="header">
			<div>DATE</div>
			<div>DESCRIPTION / PAYEE</div>
			<div>CATEGORY</div>
			<div>
				<span class="emoji">🤑</span>
				<span>+ Income</span>
			</div>
			<div>
				<span class="emoji">💸</span>
				<span>- Expense</span>
			</div>
			<div>
				<span class="emoji">💵</span>
				<span>= Balance</span>
			</div>
		</div>
		{#each rows as _, i (i)}
			<div class="row">
				<div class="col date"><span>/</span></div>
				<div class="col description"></div>
				<div class="col category"></div>
				<div class="col amount"></div>
				<div class="col amount"></div>
				<div class="col amount"></div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
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
			background-color: #f8f8f8;
			border-bottom: 2px solid var(--outline);
			font-weight: bold;
			font-size: 0.7rem;
			text-align: center;
			color: var(--text-low);
			letter-spacing: 1px;

			> div {
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
				background-color: rgba(0, 0, 0, 0.015);
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
</style>
