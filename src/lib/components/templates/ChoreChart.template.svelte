<script lang="ts">
	import Label from '$atoms/Label.svelte';
	import type { PlannerSettings } from '$lib';

	let { settings = {} }: { settings?: PlannerSettings } = $props();
	const nRows = settings?.design?.orientation === 'portrait' ? 19 : 13;
</script>

<div class="planner page">
	<header>
		<div class="field flex-col-1">
			<Label i="🧹">CHORE & MAINTENANCE CHART</Label>
			<div class="content"></div>
		</div>
	</header>
	<div class="flex gap-8">
		<div class="field flex-[3] flex-col-1">
			<div class="font-bold text-[0.75rem] text-[var(--text-low)] tracking-[0.5px] mb-1">
				{#if !settings?.emojis?.disable}🧹{/if} CHORE & MAINTENANCE CHART
			</div>
			<div class="border-b border-[var(--outline)] h-6 w-full"></div>
		</div>
		<!-- <div class="field flex-1 flex-col-1">
			<div class="font-bold text-[0.75rem] text-[var(--text-low)] tracking-[0.5px] mb-1">
				{#if !settings?.emojis?.disable}🗓️{/if} MONTH
			</div>
			<div class="border-b border-[var(--outline)] h-6 w-full"></div>
		</div> -->
	</div>

	<div class="box-container flex-1">
		<div class="flex bg-[var(--nav-bg-pdf,#f8f8f8)] border-b-2 border-[var(--outline)] p-2 font-bold text-[0.7rem] text-[var(--text-low)] text-center tracking-[0.5px]">
			<div class="flex-[3] px-2 flex items-center justify-center">
				{#if !settings?.emojis?.disable}🗑️{/if} CHORE
			</div>
			<div class="flex-[1.5] px-2 flex items-center justify-center">
				{#if !settings?.emojis?.disable}📅{/if} FREQUENCY
			</div>
			<div class="flex-1 px-2 flex items-center justify-center gap-2">
				{#if !settings?.emojis?.disable}✅{/if} DONE
				<br />
			</div>
		</div>
		{#each Array(nRows) as _}
			<div class="flex border-b border-[var(--outline)] h-10 items-center last:border-b-0">
				<div class="flex-[3] px-2 h-full flex items-end pb-2"><div class="border-b border-[var(--outline)] h-full w-full"></div></div>
				<div class="flex-[1.5] px-2 h-full flex items-end pb-2"><div class="border-b border-[var(--outline)] h-full w-full"></div></div>
				<div class="flex-1 px-2 h-full flex items-center justify-center gap-2">
					<div class="w-4 h-4 border border-[var(--outline-high)] rounded-sm"></div>
					<div class="w-4 h-4 border border-[var(--outline-high)] rounded-sm"></div>
					<div class="w-4 h-4 border border-[var(--outline-high)] rounded-sm"></div>
					<div class="w-4 h-4 border border-[var(--outline-high)] rounded-sm"></div>
					<div class="w-4 h-4 border border-[var(--outline-high)] rounded-sm"></div>
					<div class="w-4 h-4 border border-[var(--outline-high)] rounded-sm"></div>
					<div class="w-4 h-4 border border-[var(--outline-high)] rounded-sm"></div>
				</div>
			</div>
		{/each}
	</div>
</div>
