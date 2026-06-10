<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Checkbox } from '$atoms';
	import Field from '$atoms/Field.atom.svelte';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	let rows = new Array(24);
</script>

<div class="planner page assignment-tracker">
	<header>
		<div class="field title-field">
			<Field i="📚">ASSIGNMENT TRACKER</Field>
		</div>
		<div class="field date-field">
			<Field i="📅">SEMESTER / QUARTER</Field>
		</div>
	</header>

	<div class="ledger">
		<div class="header">
			<div class="col-class">
				{#if showEmoji}<span>🏫</span>
				{/if}
				<span>STUDY</span>
			</div>
			<div class="col-assignment">
				{#if showEmoji}
					<span>📝</span>
				{/if}
				<span>ASSIGNMENT</span>
			</div>
			<div class="col-due">
				{#if showEmoji}<span>⏰</span>
				{/if}
				<span>DUE DATE</span>
			</div>
			<div class="col-status">
				<span>
					{#if showEmoji}🚦{/if}
					STATUS
				</span>
				<div class="status-labels">
					<span>TO DO</span>
					<span>DOING</span>
					<span>DONE</span>
				</div>
			</div>
			<div class="col-grade">
				{#if showEmoji}<span>💯</span>
				{/if}
				<span>GRADE</span>
			</div>
		</div>
		{#each rows as _, i (i)}
			<div class="row">
				<div class="col col-class"></div>
				<div class="col col-assignment"></div>
				<div class="col col-due"></div>
				<div class="col col-status">
					<Checkbox aria-label="To Do" />
					<Checkbox aria-label="Doing" />
					<Checkbox aria-label="Done" />
				</div>
				<div class="col col-grade"></div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.assignment-tracker {
		header {
			gap: 5;
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
				grid-template-columns: 1.2fr 3fr 1fr 1.5fr 0.8fr;
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

				> div {
					padding: 0.5rem 0;
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
					grid-template-columns: repeat(3, 1fr);
					width: 100%;
					margin-top: 0.25rem;
					font-size: 0.65em;
					color: inherit;
					letter-spacing: 0.5px;

					span {
						text-align: center;
					}
				}
			}

			.row {
				flex: 1;
				border-bottom: 1px solid var(--outline);

				&:last-child {
					border-bottom: none;
				}

				&:nth-child(even) {
					background-color: var(--bg-high);
				}

				.col {
					border-right: 1px solid var(--outline);
					height: 100%;

					&:last-child {
						border-right: none;
					}

					&.col-status {
						display: grid;
						grid-template-columns: repeat(3, 1fr);
						align-items: center;
						justify-items: center;
						gap: 0;
						padding: 0;
					}
				}
			}
		}
	}
</style>
