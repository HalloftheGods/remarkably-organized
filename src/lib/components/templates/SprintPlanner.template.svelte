<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Checkbox } from '$atoms';

	let { settings = {} }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	let rows = new Array(25);
</script>

<div class="planner page sprint-planner">
	<div class="header-section">
		<div class="top-row">
			<div class="field sprint-name-field">
				<label>
					{#if showEmoji}
						<span class="emoji">🏃</span>
					{/if}
					<strong>SPRINT NAME / NUMBER</strong>
				</label>
				<div class="content"></div>
			</div>
			<div class="field date-field">
				<label>
					{#if showEmoji}
						<span class="emoji">📅</span>
					{/if}
					<strong>START DATE</strong>
				</label>
				<div class="content">
					<div class="date-slashes">
						<span>/</span>
						<span>/</span>
					</div>
				</div>
			</div>
			>
			<div class="field date-field">
				<label>
					{#if showEmoji}
						<span class="emoji">📅</span>
					{/if}
					<strong>END DATE</strong>
				</label>
				<div class="content">
					<div class="date-slashes">
						<span>/</span>
						<span>/</span>
					</div>
				</div>
			</div>
			>
		</div>
		<div class="bottom-row">
			<div class="field goal-field">
				<label>
					{#if showEmoji}
						<span class="emoji">🥅</span>
					{/if}
					<strong>SPRINT GOAL</strong>
				</label>
				<div class="content"></div>
			</div>
		</div>
	</div>

	<div class="ledger">
		<div class="header">
			<div>
				{#if showEmoji}<span>🚨</span>
				{/if}
				<span>PRIORITY</span>
				<div class="priority-labels">
					<span>MUST</span>
					<span>SHOULD</span>
					<span>COULD</span>
					<span>WON'T</span>
				</div>
			</div>
			<div>
				{#if showEmoji}<span>🎫</span>
					<br />{/if}
				<span>TICKET #</span>
			</div>
			<div>
				{#if showEmoji}<span>📝</span>
					<br />{/if}
				<span>TASK DESCRIPTION</span>
			</div>
			<div>
				{#if showEmoji}<span>⏱️</span>
					<br />{/if}
				<span>EST</span>
			</div>
			<div>
				{#if showEmoji}<span>👤</span>
					<br />{/if}
				<span>ASSIGNEE</span>
			</div>
			<div class="status-header">
				{#if showEmoji}<span>🚦</span>
				{/if}
				<span>STATUS</span>
				<div class="status-labels">
					<span>TO DO</span>
					<span>DOING</span>
					<span>DONE</span>
				</div>
			</div>
		</div>
		{#each rows as _, i (i)}
			<div class="row">
				<div class="col priority">
					<input type="radio" name="priority-{i}" aria-label="Must have" />
					<input type="radio" name="priority-{i}" aria-label="Should have" />
					<input type="radio" name="priority-{i}" aria-label="Could have" />
					<input type="radio" name="priority-{i}" aria-label="Wont have" />
				</div>
				<div class="col ticket"></div>
				<div class="col description"></div>
				<div class="col points"></div>
				<div class="col assignee"></div>
				<div class="col status">
					<Checkbox aria-label="To Do" />
					<Checkbox aria-label="Doing" />
					<Checkbox aria-label="Done" />
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.sprint-planner {
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
		flex-direction: column;
		gap: 1.5rem;
		width: 100%;

		.date-slashes {
			display: flex;
			align-items: flex-end;
			justify-content: space-evenly;
			padding-bottom: 2px;
			color: var(--outline-high, #ccc);
			font-size: 1.2rem;
			font-weight: 300;
			width: 100%;

			span {
				line-height: 1;
			}
		}

		.top-row {
			display: flex;
			gap: 2rem;

			.sprint-name-field {
				flex: 2;
			}
			.date-field {
				flex: 1;
			}
		}

		.bottom-row {
			display: flex;
			gap: 2rem;

			.goal-field {
				flex: 1;
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
			display: grid;
			grid-template-columns: 20% 10% 38% 6% 12% 14%;
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

			.priority-labels {
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				text-align: center;
				margin-top: 0.25rem;
				font-size: 0.65em;
				color: var(--text-low);
				gap: 2px;
				letter-spacing: 1px;

				span:nth-child(1) {
					color: #dc2626;
				}
				span:nth-child(2) {
					color: #d97706;
				}
				span:nth-child(3) {
					color: #16a34a;
				}
				span:nth-child(4) {
					color: var(--text-low);
				}
			}

			.status-labels {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				text-align: center;
				margin-top: 0.25rem;
				font-size: 0.65em;
				color: var(--text-low);
				gap: 2px;
				letter-spacing: 0.5px;
			}
		}

		.row {
			display: grid;
			grid-template-columns: 20% 10% 38% 6% 12% 14%;
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

				&.priority {
					display: grid;
					grid-template-columns: repeat(4, 1fr);
					justify-items: center;
					align-items: center;

					input[type='radio'] {
						appearance: none !important;
						background-color: transparent !important;
						width: 14px !important;
						height: 14px !important;
						min-width: 14px !important;
						min-height: 14px !important;
						max-width: 14px !important;
						max-height: 14px !important;
						box-sizing: border-box !important;
						border-radius: 50% !important;
						border: 2px solid var(--outline-high);
						margin: 0 !important;
						padding: 0 !important;
						flex-shrink: 0 !important;
						cursor: pointer;

						&:nth-child(1) {
							border-color: rgba(220, 38, 38, 0.6);
						}
						&:nth-child(2) {
							border-color: rgba(217, 119, 6, 0.6);
						}
						&:nth-child(3) {
							border-color: rgba(22, 163, 74, 0.6);
						}
						&:nth-child(4) {
							border-color: var(--outline-high);
						}

						&:checked:nth-child(1) {
							background-color: #dc2626;
							border-color: #dc2626;
						}
						&:checked:nth-child(2) {
							background-color: #d97706;
							border-color: #d97706;
						}
						&:checked:nth-child(3) {
							background-color: #16a34a;
							border-color: #16a34a;
						}
						&:checked:nth-child(4) {
							background-color: var(--outline-high);
							border-color: var(--outline-high);
						}
					}
				}

				&.status {
					display: flex;
					align-items: center;
					justify-content: space-evenly;
					padding: 0 0.25rem;
				}
			}
		}
	}
</style>
