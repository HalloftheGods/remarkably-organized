<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings } = $props();
	let rows = new Array(24);
</script>

<div class="assignment-tracker">
	<div class="header-section">
		<div class="field title-field">
			<div class="label">
				{#if !settings?.emojis?.disable}📚{/if} ASSIGNMENT TRACKER
			</div>
			<div class="line"></div>
		</div>
		<div class="field date-field">
			<div class="label">
				{#if !settings?.emojis?.disable}📅{/if} SEMESTER / QUARTER
			</div>
			<div class="line"></div>
		</div>
	</div>

	<div class="ledger">
		<div class="header">
			<div class="col-class">
				{#if !settings?.emojis?.disable}🏫{/if}
				<br />
				CLASS / COURSE
			</div>
			<div class="col-assignment">
				{#if !settings?.emojis?.disable}📝{/if}
				<br />
				ASSIGNMENT
			</div>
			<div class="col-due">
				{#if !settings?.emojis?.disable}⏰{/if}
				<br />
				DUE DATE
			</div>
			<div class="col-status">
				{#if !settings?.emojis?.disable}🚦{/if} STATUS
				<div class="status-labels">
					<span>TO DO</span>
					<span>DOING</span>
					<span>DONE</span>
				</div>
			</div>
			<div class="col-grade">
				{#if !settings?.emojis?.disable}💯{/if}
				<br />
				GRADE
			</div>
		</div>
		{#each rows as _, i (i)}
			<div class="row">
				<div class="col col-class"></div>
				<div class="col col-assignment"></div>
				<div class="col col-due"></div>
				<div class="col col-status">
					<div class="checkbox" aria-label="To Do"></div>
					<div class="checkbox" aria-label="Doing"></div>
					<div class="checkbox" aria-label="Done"></div>
				</div>
				<div class="col col-grade"></div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.assignment-tracker {
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
		width: 100%;

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
			font-size: 0.7rem;
			text-align: center;
			color: var(--text-low);
			letter-spacing: 1px;

			> div {
				padding: 0.5rem 0.25rem;
				border-right: 1px solid var(--outline);
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				&:last-child {
					border-right: none;
				}
			}

			.status-labels {
				display: flex;
				justify-content: space-evenly;
				width: 100%;
				margin-top: 0.25rem;
				font-size: 0.65em;
				color: var(--text-low);
				letter-spacing: 0.5px;

				span {
					flex: 1;
					text-align: center;
				}
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
				border-right: 1px solid var(--outline);
				height: 100%;

				&:last-child {
					border-right: none;
				}

				&.col-status {
					display: flex;
					align-items: center;
					justify-content: space-evenly;
					padding: 0 0.25rem;

					.checkbox {
						width: 0.9rem;
						height: 0.9rem;
						border: 2px solid var(--outline-high);
						border-radius: 50%;
						cursor: pointer;
					}
				}
			}
		}

		.col-class {
			flex: 1.5;
		}
		.col-assignment {
			flex: 3;
		}
		.col-due {
			flex: 1;
		}
		.col-status {
			flex: 1.5;
		}
		.col-grade {
			flex: 0.8;
		}
	}
</style>
