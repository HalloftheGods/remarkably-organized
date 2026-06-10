<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Checkbox } from '$atoms';
	import Field from '$atoms/Field.atom.svelte';
	import DateSlashes from '$molecules/DateSlashes.svelte';

	let {
		settings = {} as PlannerSettings,
		weeks = 1,
	}: { settings?: PlannerSettings; weeks?: number } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);

	const rowsPerWeek = $derived(weeks === 1 ? 25 : weeks === 2 ? 11 : weeks === 3 ? 7 : 5);
</script>

<div class="planner page padded sprint-planner gap-6">
	<div class="header-section">
		<div class="top-row">
			<div class="field sprint-name-field">
				<Field i="🏃">SPRINT NAME / NUMBER</Field>
			</div>
			<div class="field date-field">
				<DateSlashes i="📅" label="START DATE" />
			</div>
			<div class="field date-field">
				<DateSlashes i="📅" label="END DATE" />
			</div>
		</div>
		<div class="bottom-row">
			<div class="field goal-field">
				<Field i="🥅">SPRINT GOAL</Field>
			</div>
		</div>
	</div>

	<div class="ledger flex flex-col flex-1 border border-[var(--outline)] rounded-[4px] overflow-hidden">
		<div class="ledger-header grid grid-cols-[20%_10%_38%_6%_12%_14%]">
			<div class="col-priority p-0">
				<span>
					{#if showEmoji}🚨{/if}
					PRIORITY
				</span>
				<div class="status-labels-grid grid grid-cols-4">
					<span class="text-red-600">MUST</span>
					<span class="text-amber-600">SHOULD</span>
					<span class="text-green-600">COULD</span>
					<span class="text-[var(--text-low)]">WON'T</span>
				</div>
			</div>
			<div class="col-ticket">
				{#if showEmoji}<span>🎫</span><br />{/if}
				<span>TICKET #</span>
			</div>
			<div class="col-description">
				{#if showEmoji}<span>📝</span><br />{/if}
				<span>TASK DESCRIPTION</span>
			</div>
			<div class="col-points">
				{#if showEmoji}<span>⏱️</span><br />{/if}
				<span>EST</span>
			</div>
			<div class="col-assignee">
				{#if showEmoji}<span>👤</span><br />{/if}
				<span>ASSIGNEE</span>
			</div>
			<div class="col-status p-0 !border-r-0">
				<span>
					{#if showEmoji}🚦{/if}
					STATUS
				</span>
				<div class="status-labels-grid grid grid-cols-3">
					<span>TO DO</span>
					<span>DOING</span>
					<span>DONE</span>
				</div>
			</div>
		</div>

		{#snippet row(id: string | number)}
			<div class="ledger-row grid grid-cols-[20%_10%_38%_6%_12%_14%]">
				<div class="col-priority ledger-col grid grid-cols-4 items-center justify-items-center">
					<input type="radio" name="priority-{id}" aria-label="Must have" />
					<input type="radio" name="priority-{id}" aria-label="Should have" />
					<input type="radio" name="priority-{id}" aria-label="Could have" />
					<input type="radio" name="priority-{id}" aria-label="Wont have" />
				</div>
				<div class="col-ticket ledger-col"></div>
				<div class="col-description ledger-col"></div>
				<div class="col-points ledger-col"></div>
				<div class="col-assignee ledger-col"></div>
				<div class="col-status ledger-col !border-r-0 flex items-center justify-evenly px-1">
					<Checkbox aria-label="To Do" />
					<Checkbox aria-label="Doing" />
					<Checkbox aria-label="Done" />
				</div>
			</div>
		{/snippet}

		{#if weeks === 1}
			{#each new Array(rowsPerWeek) as _, i (i)}
				{@render row(i)}
			{/each}
		{:else}
			{#each new Array(weeks) as _, w}
				<div class="flex items-center justify-center bg-[var(--nav-bg-pdf,var(--bg-high))] border-b border-[var(--outline)] font-bold text-[0.65rem] text-[var(--text-low)] tracking-[2px] p-1">
					<strong>WEEK {w + 1}</strong>
				</div>
				{#each new Array(rowsPerWeek) as _, i (i)}
					{@render row(`${w}-${i}`)}
				{/each}
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	.sprint-planner {
		width: 100%;
		height: 100%;

		.col-priority {
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
</style>
