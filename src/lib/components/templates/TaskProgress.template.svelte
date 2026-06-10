<script lang="ts">
	import type { Timeframe } from '$lib';

	let { timeframe = {} as Timeframe } = $props();

	// timeframe.month is 1-12
	const monthStr = $derived(timeframe.month ? timeframe.month.toString() : '');
</script>

<div class="planner page padded task-progress">
	<div class="ledger flex flex-col flex-1 border border-[var(--outline)] rounded-[4px] overflow-hidden">
		<div class="ledger-header grid grid-cols-[0.6fr_3.2fr_1.4fr_0.8fr]">
			<div class="col-due">
				<strong>Due</strong>
			</div>
			<div class="col-tasks">
				<strong>Tasks</strong>
			</div>
			<div class="col-priority p-0">
				<strong>Priority</strong>
				<div class="status-labels-grid grid grid-cols-4">
					<span class="text-red-600">MUST</span>
					<span class="text-amber-600">SHOULD</span>
					<span class="text-green-600">COULD</span>
					<span class="text-[var(--text-low)]">WON'T</span>
				</div>
			</div>
			<div class="col-progress">
				<strong>Progress</strong>
			</div>
		</div>
		{#each new Array(25) as _, i (i)}
			<div class="ledger-row grid grid-cols-[0.6fr_3.2fr_1.4fr_0.8fr]">
				<div class="col-due ledger-col flex items-end justify-center pb-[2px] text-[1.2rem] text-[var(--outline-high,#ccc)] font-light gap-[0.15rem]">
					{#if monthStr}
						<span class="text-[var(--outline-high,#ccc)] opacity-50">{monthStr}</span>
					{/if}
					<span class="leading-none">/</span>
				</div>
				<div class="col-tasks ledger-col"></div>
				<div class="col-priority ledger-col grid grid-cols-4 items-center justify-items-center">
					<input type="radio" name="priority-{i}" aria-label="Must have" />
					<input type="radio" name="priority-{i}" aria-label="Should have" />
					<input type="radio" name="priority-{i}" aria-label="Could have" />
					<input type="radio" name="priority-{i}" aria-label="Wont have" />
				</div>
				<div class="col-progress ledger-col !border-r-0 flex items-end justify-end pb-[2px] pr-2 text-[1rem] text-[var(--outline-high,#ccc)] font-light leading-none">
					<span>%</span>
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.task-progress {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;

		.col-priority {
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
	}
</style>
