<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings } = $props();
	let rows = new Array(8);
</script>

<div class="client-tracker">
	<div class="header-section">
		<div class="field title-field">
			<div class="label">
				{#if !settings?.emojis?.disable}👥{/if} CLIENT RELATIONSHIP TRACKER
			</div>
			<div class="line"></div>
		</div>
		<div class="field date-field">
			<div class="label">
				{#if !settings?.emojis?.disable}📅{/if} DATE
			</div>
			<div class="line date-slashes">
				<span>/</span>
				<span>/</span>
			</div>
		</div>
	</div>

	<div class="tracker-table">
		<div class="table-header">
			<div class="col col-name">
				{#if !settings?.emojis?.disable}👤{/if} Client Name
			</div>
			<div class="col col-contact">Contact Info</div>
			<div class="col col-status">Status</div>
			<div class="col col-next">
				{#if !settings?.emojis?.disable}📞{/if} Next Touchpoint
			</div>
			<div class="col col-notes">Notes</div>
		</div>

		{#each rows as _, i (i)}
			<div class="table-row">
				<div class="col col-name">
					<div class="input-line"></div>
				</div>
				<div class="col col-contact">
					<div class="input-line"></div>
				</div>
				<div class="col col-status">
					<div class="checkbox"></div>
				</div>
				<div class="col col-next">
					<div class="input-line"></div>
				</div>
				<div class="col col-notes">
					<div class="input-line"></div>
				</div>
			</div>
		{/each}
	</div>

	<div class="action-items">
		<div class="action-title">
			{#if !settings?.emojis?.disable}✅{/if} ACTION ITEMS
		</div>
		<div class="action-list">
			{#each [1, 2, 3] as _}
				<div class="action-item">
					<div class="checkbox"></div>
					<div class="action-line"></div>
				</div>
			{/each}
		</div>
	</div>

	<div class="follow-up">
		<div class="follow-up-title">
			{#if !settings?.emojis?.disable}🔔{/if} Follow-up Reminders
		</div>
		<div class="follow-up-lines">
			<div class="input-line"></div>
			<div class="input-line"></div>
		</div>
	</div>
</div>

<style lang="scss">
	.client-tracker {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 1rem 1.5rem 1.5rem;
		box-sizing: border-box;
		gap: 1.5rem;
	}

	.header-section {
		display: flex;
		gap: 2rem;
		width: 100%;
		border-bottom: 1px solid var(--outline);
		padding-bottom: 1rem;
	}

	.field {
		display: flex;
		flex-direction: column;
	}

	.title-field {
		flex: 3;
	}

	.date-field {
		flex: 1;
	}

	.label {
		font-size: 0.75rem;
		font-weight: bold;
		color: var(--text-low);
		margin-bottom: 0.25rem;
		white-space: nowrap;
		letter-spacing: 0.5px;
	}

	.line {
		border-bottom: 1px solid var(--outline);
		height: 1.5rem;
	}

	.date-slashes {
		display: flex;
		align-items: flex-end;
		justify-content: space-evenly;
		padding-bottom: 2px;
		color: var(--outline-high, #ccc);
		font-size: 1.2rem;
		font-weight: 300;

		span {
			line-height: 1;
		}
	}

	.tracker-table {
		border: 1px solid var(--outline);
		display: flex;
		flex-direction: column;
		border-radius: 4px;
		overflow: hidden;
	}

	.table-header {
		display: flex;
		background-color: var(--nav-bg-pdf, #f8f8f8);
		border-bottom: 2px solid var(--outline);
		font-weight: bold;
		font-size: 0.7rem;
		text-align: center;
		color: var(--text-low);
		letter-spacing: 0.5px;

		.col {
			padding: 0.6rem 0.5rem;
			display: flex;
			align-items: center;
			border-right: 1px solid var(--outline);

			&:last-child {
				border-right: none;
			}
		}

		.col-name {
			flex: 1.5;
		}

		.col-contact {
			flex: 1;
		}

		.col-status {
			flex: 0.7;
		}

		.col-next {
			flex: 1.2;
		}

		.col-notes {
			flex: 1;
		}
	}

	.table-row {
		display: flex;
		border-bottom: 1px solid var(--outline);
		min-height: 2.5rem;

		&:last-child {
			border-bottom: none;
		}

		&:nth-child(even) {
			background-color: rgba(128, 128, 128, 0.05);
		}

		.col {
			padding: 0.6rem 0.5rem;
			display: flex;
			align-items: center;
			border-right: 1px solid var(--outline);

			&:last-child {
				border-right: none;
			}
		}

		.col-name {
			flex: 1.5;
		}

		.col-contact {
			flex: 1;
		}

		.col-status {
			flex: 0.7;
			justify-content: center;

			.checkbox {
				width: 1rem;
				height: 1rem;
				border: 1px solid var(--outline);
				border-radius: 3px;
				background-color: white;
			}
		}

		.col-next {
			flex: 1.2;
		}

		.col-notes {
			flex: 1;
		}

		.input-line {
			width: 100%;
			border-bottom: 1px solid var(--outline);
			height: 100%;
		}
	}

	.action-items {
		border: 1px solid var(--outline);
		padding: 0.75rem;
		background-color: rgba(217, 119, 6, 0.05);
		border-radius: 4px;

		.action-title {
			font-weight: bold;
			font-size: 0.75rem;
			margin-bottom: 0.75rem;
			text-transform: uppercase;
			letter-spacing: 0.5px;
			color: var(--text-low);
		}

		.action-list {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			.action-item {
				display: flex;
				align-items: flex-end;
				gap: 0.75rem;

				.checkbox {
					width: 1rem;
					height: 1rem;
					border: 1px solid var(--outline);
					border-radius: 3px;
					flex-shrink: 0;
					background-color: white;
				}

				.action-line {
					flex: 1;
					border-bottom: 1px solid var(--outline);
					height: 1rem;
				}
			}
		}
	}

	.follow-up {
		border-top: 2px solid var(--outline);
		padding-top: 1rem;

		.follow-up-title {
			font-weight: bold;
			font-size: 0.75rem;
			margin-bottom: 0.75rem;
			text-transform: uppercase;
			letter-spacing: 0.5px;
			color: var(--text-low);
		}

		.follow-up-lines {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			.input-line {
				border-bottom: 1px solid var(--outline);
				height: 1rem;
			}
		}
	}
</style>
