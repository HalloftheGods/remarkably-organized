<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Checkbox } from '$atoms';
	import RowInput from '$atoms/RowInput.svelte';
	import DateSlashes from '$molecules/DateSlashes.svelte';
	import Field from '$atoms/Field.atom.svelte';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	const nClientRows = $derived(new Array(settings?.isLandscape ? 7 : 14));
	const nActionItems = $derived(new Array(settings?.isLandscape ? 4 : 5));
	const nFollowUp = $derived(new Array(settings?.isLandscape ? 4 : 5));
</script>

<div class="planner-page gap-4">
	<header class="flex gap-6 w-full shrink-0">
		<div class="flex-[3]">
			<Field i="👥">Client Relationship Tracker</Field>
		</div>
		<div class="flex-[1]">
			<Field>
				DATE
				{#snippet content()}
					<div class="w-full flex justify-end pb-[2px]">
						<DateSlashes />
					</div>
				{/snippet}
			</Field>
		</div>
	</header>

	<div class="box-container flex-1 mt-2">
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

	<div class="grid grid-cols-2 gap-8 w-full shrink-0 pt-4 mt-2 border-t-2 border-[var(--outline)]">
		<div class="flex flex-col">
			<span class="font-bold text-[0.75rem] mb-[0.75rem] tracking-[0.5px] text-[var(--text-low)]">
				{#if showEmoji}✅&nbsp;{/if}Action Items
			</span>
			<div class="flex flex-col gap-[0.4rem]">
				{#each nActionItems as _}
					<div class="flex items-end gap-3 flex-1 border-b border-[var(--outline)] pb-1 h-[1.5rem]">
						<Checkbox aria-label="Action Item" />
						<RowInput />
					</div>
				{/each}
			</div>
		</div>

		<div class="flex flex-col">
			<span class="font-bold text-[0.75rem] mb-[0.75rem] tracking-[0.5px] text-[var(--text-low)]">
				{#if showEmoji}🔔&nbsp;{/if}Follow-up Reminders
			</span>
			<div class="flex flex-col gap-[0.4rem]">
				{#each nFollowUp as _}
					<div class="border-b border-[var(--outline)] h-[1.5rem] w-full flex items-end pb-1">
						<RowInput />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
