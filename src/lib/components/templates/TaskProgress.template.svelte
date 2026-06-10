<script lang="ts">
	import type { Timeframe } from '$lib';

	let { timeframe = {} as Timeframe } = $props();

	// timeframe.month is 1-12
	const monthStr = $derived(timeframe.month ? timeframe.month.toString() : '');
</script>

<div class="planner page padded task-progress">
	<div class="header">
		<div><strong>Due</strong></div>
		<div><strong>Tasks</strong></div>
		<div>
			<strong>Priority</strong>
			<div class="priority-labels">
				<span>MUST</span>
				<span>SHOULD</span>
				<span>COULD</span>
				<span>WON'T</span>
			</div>
		</div>
		<div><strong>Progress</strong></div>
	</div>
	{#each new Array(25) as _, i (i)}
		<div class="row">
			<div class="due-date">
				{#if monthStr}
					<span class="month-num">{monthStr}</span>
				{/if}
				<span>/</span>
			</div>
			<div class="task"></div>
			<div class="priority">
				<input type="radio" name="priority-{i}" aria-label="Must have" />
				<input type="radio" name="priority-{i}" aria-label="Should have" />
				<input type="radio" name="priority-{i}" aria-label="Could have" />
				<input type="radio" name="priority-{i}" aria-label="Wont have" />
			</div>
			<div class="progress-percent"><span>%</span></div>
		</div>
	{/each}
</div>

<style lang="scss">
	.task-progress {
		display: grid;
		grid-template-rows: auto repeat(25, 1fr);
		gap: 0;
		width: 100%;
		height: 100%;

		.header {
			display: grid;
			grid-template-columns: 0.6fr 3.2fr 1.4fr 0.8fr;
			font-weight: bold;
			text-align: center;
			letter-spacing: 1px;
			padding-bottom: 0.5rem;
			border-bottom: 1px solid var(--outline);

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
		}

		.row {
			display: grid;
			grid-template-columns: 0.6fr 3.2fr 1.4fr 0.8fr;
			align-items: center;
			gap: 0;
			height: 2rem;
			border-bottom: 1px solid var(--outline);

			.priority {
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				justify-items: center;
				align-items: center;

				input[type='radio'] {
					appearance: none !important;
					width: 16px !important;
					height: 16px !important;
					min-width: 16px !important;
					min-height: 16px !important;
					max-width: 16px !important;
					max-height: 16px !important;
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

			.due-date,
			.progress-percent {
				display: flex;
				align-items: flex-end;
				height: 100%;
				padding-bottom: 2px;
				color: var(--outline-high, #ccc);
				font-weight: 300;
				line-height: 1;
			}
			.due-date {
				justify-content: center;
				font-size: 1.2rem;
				gap: 0.15rem;

				.month-num {
					color: var(--outline-high, #ccc);
					opacity: 0.5;
				}
			}
			.progress-percent {
				justify-content: flex-end;
				padding-right: 0.5rem;
				font-size: 1rem;
			}
		}
	}
</style>
