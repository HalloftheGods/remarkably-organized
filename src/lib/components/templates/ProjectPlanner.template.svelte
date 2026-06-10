<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} }: { settings?: PlannerSettings } = $props();
	let actionRows = new Array(16);
	let milestoneRows = new Array(6);
	let resourceRows = new Array(6);
	
	const showEmoji = $derived(!settings?.emojis?.disable);
	const isLandscape = $derived(settings?.design?.orientation === 'landscape');
</script>

<div class="planner page">
	<div class="flex-col-1 gap-4 w-full min-h-0 shrink-0">
		<div class="flex gap-6">
			<div class="field flex-[2]">
				<div class="label font-bold text-[0.75rem] text-[var(--text-low)] tracking-[0.5px] mb-1">
					{#if showEmoji}📁{/if} PROJECT NAME
				</div>
				<div class="border-b border-[var(--outline)] h-6"></div>
			</div>
			<div class="field flex-[1.5]">
				<div class="label font-bold text-[0.75rem] text-[var(--text-low)] tracking-[0.5px] mb-1">
					{#if showEmoji}🤝{/if} CLIENT / MANAGER
				</div>
				<div class="border-b border-[var(--outline)] h-6"></div>
			</div>
			<div class="field flex-1">
				<div class="label font-bold text-[0.75rem] text-[var(--text-low)] tracking-[0.5px] mb-1">
					{#if showEmoji}📅{/if} DEADLINE
				</div>
				<div class="flex items-end justify-evenly pb-[2px] text-[var(--outline-high,#ccc)] text-[1.2rem] font-light border-b border-[var(--outline)] h-6">
					<span class="leading-none">/</span>
					<span class="leading-none">/</span>
				</div>
			</div>
		</div>
		<div class="flex">
			<div class="field flex-1">
				<div class="label font-bold text-[0.75rem] text-[var(--text-low)] tracking-[0.5px] mb-1">
					{#if showEmoji}🎯{/if} OBJECTIVES & DELIVERABLES
				</div>
				<div class="border-b border-[var(--outline)] h-6"></div>
				<div class="border-b border-[var(--outline)] h-6"></div>
			</div>
		</div>
	</div>

	<div class="flex {isLandscape ? 'flex-row' : 'flex-col'} gap-8 flex-1 min-h-0">
		<div class="flex-col-1 flex-[1.2]">
			<div class="font-bold text-[0.75rem] text-[var(--text-low)] tracking-[0.5px] border-b-2 border-[var(--outline)] pb-1 mb-2">
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
			<div class="font-bold text-[0.75rem] text-[var(--text-low)] tracking-[0.5px] border-b-2 border-[var(--outline)] pb-1 mb-2">
				{#if showEmoji}🚩{/if} MILESTONES & TIMELINE
			</div>
			<div class="flex-col-1 flex-1">
				{#each milestoneRows as _, i (i)}
					<div class="flex items-end flex-1 gap-2 pb-1">
						<div class="w-12 h-5 border-b border-dashed border-[var(--outline-high)]"></div>
						<div class="flex-1 border-b border-[var(--outline)] h-full"></div>
					</div>
				{/each}
			</div>

			<div class="font-bold text-[0.75rem] text-[var(--text-low)] tracking-[0.5px] border-b-2 border-[var(--outline)] pb-1 mb-2 mt-6">
				{#if showEmoji}💰{/if} RESOURCES / BUDGET
			</div>
			<div class="flex-col-1 flex-1">
				{#each resourceRows as _, i (i)}
					<div class="flex items-end flex-1 gap-4 pb-1">
						<div class="flex-[2] border-b border-[var(--outline)] h-full"></div>
						<div class="flex-1 border-b border-dashed border-[var(--outline)] h-full"></div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
