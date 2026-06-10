<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} }: { settings?: PlannerSettings } = $props();
	let rows = new Array(22);
</script>

<div class="planner page content-planner">
	<div class="header-section">
		<div class="field title-field">
			<div class="label">
				{#if !settings?.emojis?.disable}🎥{/if} CONTENT CREATOR PLANNER & PIPELINE
			</div>
			<div class="line"></div>
		</div>
		<div class="field date-field">
			<div class="label">
				{#if !settings?.emojis?.disable}📅{/if} MONTH / WEEK
			</div>
			<div class="line"></div>
		</div>
	</div>

	<div class="ledger">
		<div class="header">
			<div class="col col-platform">
				{#if !settings?.emojis?.disable}📱{/if}
				PLATFORM
			</div>
			<div class="col col-idea">
				{#if !settings?.emojis?.disable}💡{/if}
				CONTENT IDEA / TITLE
			</div>
			<div class="col col-format">
				{#if !settings?.emojis?.disable}🎬{/if}
				FORMAT
			</div>
			<div class="col-status">
				{#if !settings?.emojis?.disable}🚦{/if} STATUS PIPELINE
				<div class="status-labels">
					<span>IDEA</span>
					<span>SCRIPT</span>
					<span>SHOOT</span>
					<span>EDIT</span>
					<span>POST</span>
				</div>
			</div>
		</div>
		{#each rows as _, i (i)}
			<div class="row">
				<div class="col col-platform"></div>
				<div class="col col-idea"></div>
				<div class="col col-format"></div>
				<div class="col col-status">
					<div class="checkbox" aria-label="Idea"></div>
					<div class="checkbox" aria-label="Script"></div>
					<div class="checkbox" aria-label="Shoot"></div>
					<div class="checkbox" aria-label="Edit"></div>
					<div class="checkbox" aria-label="Post"></div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.content-planner {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
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

		.header,
		.row {
			display: grid;
			grid-template-columns: 1.5fr 3fr 1.2fr 2fr;
			width: 100%;

			> * {
				min-width: 0;
			}
		}

		.header {
			background-color: var(--nav-bg-pdf, #f8f8f8);
			border-bottom: 2px solid var(--outline);
			font-weight: bold;
			font-size: 0.7rem;
			text-align: center;
			color: var(--text-sidebar, var(--text-low));
			letter-spacing: 1px;
			gap: 0;

			> div {
				padding: 0.5rem 0rem;
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
				display: grid;
				grid-template-columns: repeat(5, 1fr);
				width: 100%;
				margin-top: 0.25rem;
				font-size: 0.65em;
				color: inherit;
				letter-spacing: 0.75px;

				span {
					text-align: center;
				}
			}
		}

		.row {
			flex: 1;
			border-bottom: 1px solid var(--outline);
			gap: 0;

			&:last-child {
				border-bottom: none;
			}

			&:nth-child(even) {
				background-color: rgba(128, 128, 128, 0.05);
			}
		}

		.col {
			border-right: 1px solid var(--outline);
			height: 100%;

			&:last-child {
				border-right: none;
			}

			&.col-status {
				display: grid;
				grid-template-columns: repeat(5, 1fr);
				align-items: center;
				justify-items: center;
				padding: 0;

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
</style>
