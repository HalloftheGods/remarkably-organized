<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Checkbox } from '$atoms';
	import RowInput from '$atoms/RowInput.svelte';
	import DateSlashes from '$molecules/DateSlashes.svelte';
	import Field from '$atoms/Field.atom.svelte';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	const nClientRows = $derived(new Array(settings?.isLandscape ? 7 : 10));
	const nActionItems = $derived(new Array(settings?.isLandscape ? 3 : 7));
	const nFollowUp = $derived(new Array(settings?.isLandscape ? 3 : 4));
</script>

<div class="planner-page gap-2">
	<div class="header-section hidden">
		<div class="field title-field">
			<Field i="👥">Client Relationship</Field>
		</div>
		<div class="field date-field">
			<DateSlashes />
		</div>
	</div>

	<div class="box-container flex-1">
		<div class="ledger-header grid grid-cols-[1.25fr_1fr_0.65fr_1fr_1.25fr]">
			<div class="col-name">
				{#if showEmoji}<span>👤&nbsp;</span>{/if}
				<span>Client</span>
			</div>
			<div class="col-contact">
				{#if showEmoji}<span>📞&nbsp;</span>{/if}
				<span>Contact</span>
			</div>
			<div class="col-status">
				{#if showEmoji}<span>✅&nbsp;</span>{/if}
				<span>Status</span>
			</div>
			<div class="col-next">
				{#if showEmoji}<span>🤝&nbsp;</span>{/if}
				<span>Next Touch</span>
			</div>
			<div class="col-notes">
				{#if showEmoji}<span>📝&nbsp;</span>{/if}
				<span>Notes</span>
			</div>
		</div>

		{#each nClientRows as _, i (i)}
			<div class="ledger-row grid grid-cols-[1.25fr_1fr_0.65fr_1fr_1.25fr]">
				<div class="col-name ledger-col">
					<RowInput />
				</div>
				<div class="col-contact ledger-col">
					<RowInput />
				</div>
				<div class="col-status ledger-col flex-center !border-r">
					<Checkbox aria-label="Status" />
				</div>
				<div class="col-next ledger-col">
					<RowInput />
				</div>
				<div class="col-notes ledger-col !border-r-0">
					<RowInput />
				</div>
			</div>
		{/each}
	</div>

	<div class="action-items">
		<span class="action-title">
			{#if showEmoji}✅{/if} Action Items
		</span>
		<div class="action-list">
			{#each nActionItems as _}
				<div
					class="flex items-end gap-3 flex-1 border-b border-[var(--outline)] pb-1 h-[1.5rem]">
					<Checkbox aria-label="Action Item" />
					<RowInput />
				</div>
			{/each}
		</div>
	</div>

	<div class="follow-up">
		<span class="follow-up-title">
			{#if showEmoji}🔔{/if} Follow-up Reminders
		</span>
		<div class="follow-up-lines">
			{#each nFollowUp as _}
				<div class="border-b border-[var(--outline)] h-[1.5rem]">
					<RowInput />
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.header-section {
		display: flex;
		gap: 2rem;
		width: 100%;
		// border-bottom: 1px solid var(--outline);
		// padding-bottom: 1rem;
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

	.action-items {
		border: 1px solid var(--outline);
		padding: 0.75rem;
		background-color: var(--nav-bg-pdf, var(--bg-high));
		color: var(--text-sidebar, var(--text));
		border-radius: 4px;

		.action-title {
			font-weight: bold;
			font-size: 0.75rem;
			margin-bottom: 0.75rem;
			letter-spacing: 0.5px;
			color: var(--text-low);
		}
	}

	.follow-up {
		border-top: 2px solid var(--outline);
		padding-top: 1rem;

		.follow-up-title {
			font-weight: bold;
			font-size: 0.75rem;
			margin-bottom: 0.75rem;
			letter-spacing: 0.5px;
			color: var(--text-low);
		}

		.follow-up-lines {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
