<script lang="ts">
		import type { PlannerSettings } from '$lib';
	import Field from '$atoms/Field.atom.svelte';
	import DateSlashes from '$molecules/DateSlashes.svelte';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	let actionRows = new Array(16);
	let milestoneRows = new Array(6);
	let resourceRows = new Array(6);

	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<div class="planner page">
	<div class="flex-col-1 gap-4 w-full min-h-0 shrink-0">
		<div class="flex gap-6">
			<div class="field flex-[2]">
				<Field i="📁">PROJECT NAME</Field>
			</div>
			<div class="field flex-[1.5]">
				<Field i="🤝">CLIENT / MANAGER</Field>
			</div>
			<div class="field flex-1">
				<DateSlashes i="📅" label="DEADLINE" />
			</div>
		</div>
		<div class="flex">
			<div class="field flex-1">
				<Field i="🎯">OBJECTIVES & DELIVERABLES</Field>
				<div class="border-b border-[var(--outline)] h-6"></div>
			</div>
		</div>
	</div>

	<div class="flex {settings?.isLandscape ? 'flex-row' : 'flex-col'} gap-8 flex-1 min-h-0">
		<div class="flex-col-1 flex-[1.2]">
			<div
				class="font-bold text-[0.75rem] text-[var(--text-sidebar,var(--text-low))] tracking-[0.5px] border-b-2 border-[var(--outline)] pb-1 mb-2">
				{#if showEmoji}📝{/if} ACTION ITEMS
			</div>
			<div class="flex-col-1 flex-1">
				{#each actionRows as _, i (i)}
					<div class="flex items-end flex-1 gap-2 pb-1">
						<div class="w-4 h-4 border-2 border-[var(--outline-high)] rounded-sm"></div>
						<div class="flex-1 border-b border-[var(--outline)] h-full"></div>
					</div>
				{/each}
			</div>
		</div>
		<div class="flex-col-1 flex-1 min-h-0">
			<div
				class="font-bold text-[0.75rem] text-[var(--text-sidebar,var(--text-low))] tracking-[0.5px] border-b-2 border-[var(--outline)] pb-1 mb-2">
				{#if showEmoji}🚩{/if} MILESTONES & TIMELINE
			</div>
			<div class="flex-col-1 flex-1">
				{#each milestoneRows as _, i (i)}
					<div class="flex items-end flex-1 gap-2 pb-1">
						<div class="w-12 h-5 border-b border-dashed border-[var(--outline-high)]">
						</div>
						<div class="flex-1 border-b border-[var(--outline)] h-full"></div>
					</div>
				{/each}
			</div>

			<div
				class="font-bold text-[0.75rem] text-[var(--text-sidebar,var(--text-low))] tracking-[0.5px] border-b-2 border-[var(--outline)] pb-1 mb-2 mt-6">
				{#if showEmoji}💰{/if} RESOURCES / BUDGET
			</div>
			<div class="flex-col-1 flex-1">
				{#each resourceRows as _, i (i)}
					<div class="flex items-end flex-1 gap-4 pb-1">
						<div class="flex-[2] border-b border-[var(--outline)] h-full"></div>
						<div class="flex-1 border-b border-dashed border-[var(--outline)] h-full">
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
