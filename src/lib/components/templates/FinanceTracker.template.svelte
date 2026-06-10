<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	let rows = new Array(27);
</script>

<div class="planner page">
	<div class="grid grid-cols-[1fr_1fr_1fr] items-end gap-6 shrink-0 pb-2">
		<div class="flex-1 flex-col-1">
			<strong class="font-bold text-[0.75rem] text-[var(--text-low)] text-center tracking-[0.5px] uppercase mb-1">STARTING BALANCE</strong>
			<div class="flex items-end border-b border-[var(--outline)] h-6 pb-[2px]">
				{#if showEmoji}
					<span class="text-[1rem] leading-none">💲</span>
				{/if}
			</div>
		</div>
		<div class="field flex-1">
			<label class="justify-center">
				<strong>MONTH</strong>
			</label>
			<div class="content !border-b-0"></div>
		</div>
		<div class="flex-1 flex-col-1">
			<strong class="font-bold text-[0.75rem] text-[var(--text-low)] text-center tracking-[0.5px] uppercase mb-1">ENDING BALANCE</strong>
			<div class="flex items-end border-b border-[var(--outline)] h-6 pb-[2px]">
				{#if showEmoji}
					<span class="text-[1rem] leading-none">🏦</span>
				{/if}
			</div>
		</div>
	</div>

	<div class="box-container flex-1">
		<div class="grid grid-cols-[1.2fr_5fr_2.5fr_2fr_2fr_2fr] bg-[var(--nav-bg-pdf,#f8f8f8)] border-b-2 border-[var(--outline)] font-bold text-[0.7rem] text-center text-[var(--text-low)] tracking-[1px]">
			<div class="flex flex-col items-center justify-center gap-[0.15rem] py-[0.4rem] px-[0.25rem] border-r border-[var(--outline)]">
				{#if showEmoji}
					<span class="text-[1.1rem] leading-none">🗓️</span>
				{/if}
				<span>DATE</span>
			</div>
			<div class="flex flex-col items-center justify-center gap-[0.15rem] py-[0.4rem] px-[0.25rem] border-r border-[var(--outline)]">
				{#if showEmoji}
					<span class="text-[1.1rem] leading-none">👤</span>
				{/if}
				<span>DESCRIPTION / PAYEE</span>
			</div>
			<div class="flex flex-col items-center justify-center gap-[0.15rem] py-[0.4rem] px-[0.25rem] border-r border-[var(--outline)]">
				{#if showEmoji}
					<span class="text-[1.1rem] leading-none">🏷️</span>
				{/if}
				<span>CATEGORY</span>
			</div>
			<div class="flex flex-col items-center justify-center gap-[0.15rem] py-[0.4rem] px-[0.25rem] border-r border-[var(--outline)]">
				{#if showEmoji}
					<span class="text-[1.1rem] leading-none">💵</span>
				{/if}
				<span>+ INCOME</span>
			</div>
			<div class="flex flex-col items-center justify-center gap-[0.15rem] py-[0.4rem] px-[0.25rem] border-r border-[var(--outline)]">
				{#if showEmoji}
					<span class="text-[1.1rem] leading-none">💸</span>
				{/if}
				<span>- EXPENSE</span>
			</div>
			<div class="flex flex-col items-center justify-center gap-[0.15rem] py-[0.4rem] px-[0.25rem]">
				{#if showEmoji}
					<span class="text-[1.1rem] leading-none">💰</span>
				{/if}
				<span>= BALANCE</span>
			</div>
		</div>
		{#each rows as _, i (i)}
			<div class="grid grid-cols-[1.2fr_5fr_2.5fr_2fr_2fr_2fr] flex-1 border-b border-[var(--outline)] last:border-b-0 even:bg-[rgba(128,128,128,0.05)]">
				<div class="border-r border-[var(--outline)] h-full flex items-center justify-center text-[var(--outline-high,#ccc)] font-light text-[1.1rem]"><span>/</span></div>
				<div class="border-r border-[var(--outline)] h-full"></div>
				<div class="border-r border-[var(--outline)] h-full"></div>
				<div class="border-r border-[var(--outline)] h-full"></div>
				<div class="border-r border-[var(--outline)] h-full"></div>
				<div class="h-full"></div>
			</div>
		{/each}
	</div>
</div>
