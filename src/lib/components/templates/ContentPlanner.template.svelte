<script lang="ts">
	import type { PlannerSettings } from '$lib';

	import { Emoji, Field } from '$atoms';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	let rows = new Array(22);
</script>

<div class="planner page content-planner">
	<header>
		<div class="field flex-[3]">
			<Field i="🎥">CONTENT CREATOR PLANNER & PIPELINE</Field>
		</div>
		<div class="field flex-[1]">
			<Field i="📅">MONTH / WEEK</Field>
		</div>
	</header>

	<div class="ledger">
		<div class="header">
			<div class="col col-platform">
				<Emoji size="s">📱</Emoji>
				PLATFORM
			</div>
			<div class="col col-idea">
				<Emoji size="s">💡</Emoji>
				CONTENT IDEA / TITLE
			</div>
			<div class="col col-format">
				<Emoji size="s">🎬</Emoji>
				FORMAT
			</div>
			<div class="col-status">
				<Emoji size="s">🚦</Emoji> STATUS PIPELINE
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
			background-color: var(--nav-bg-pdf, var(--bg-high));
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
				background-color: var(--bg-high);
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
