<script lang="ts">
	import Field from '$atoms/Field.atom.svelte';
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	let rows = new Array(27);
</script>

<div class="planner page">
	<header>
		<div class="field flex-2">
			<Field i="💲">Starting Balance</Field>
		</div>
		<div class="field flex-1">
			<Field i="🗓️">Month</Field>
		</div>
		<div class="field flex-2">
			<Field i="🏦">Ending Balance</Field>
		</div>
	</header>

	<div class="box-container flex-1">
		<div
			class="grid grid-cols-[1.2fr_5fr_2.5fr_2fr_2fr_2fr] bg-[var(--nav-bg-pdf, var(--bg-high))] border-b-2 border-[var(--outline)] font-bold text-[0.7rem] text-center text-[var(--text-sidebar,var(--text-low))] tracking-[1px]">
			<div
				class="flex flex-col items-center justify-center gap-[0.15rem] py-[0.4rem] px-[0.25rem] border-r border-[var(--outline)]">
				{#if showEmoji}
					<span class="text-[1.1rem] leading-none">🗓️</span>
				{/if}
				<span>DATE</span>
			</div>
			<div
				class="flex flex-col items-center justify-center gap-[0.15rem] py-[0.4rem] px-[0.25rem] border-r border-[var(--outline)]">
				{#if showEmoji}
					<span class="text-[1.1rem] leading-none">👤</span>
				{/if}
				<span>DESCRIPTION / PAYEE</span>
			</div>
			<div
				class="flex flex-col items-center justify-center gap-[0.15rem] py-[0.4rem] px-[0.25rem] border-r border-[var(--outline)]">
				{#if showEmoji}
					<span class="text-[1.1rem] leading-none">🏷️</span>
				{/if}
				<span>CATEGORY</span>
			</div>
			<div
				class="flex flex-col items-center justify-center gap-[0.15rem] py-[0.4rem] px-[0.25rem] border-r border-[var(--outline)]">
				{#if showEmoji}
					<span class="text-[1.1rem] leading-none">💵</span>
				{/if}
				<span>+ INCOME</span>
			</div>
			<div
				class="flex flex-col items-center justify-center gap-[0.15rem] py-[0.4rem] px-[0.25rem] border-r border-[var(--outline)]">
				{#if showEmoji}
					<span class="text-[1.1rem] leading-none">💸</span>
				{/if}
				<span>- EXPENSE</span>
			</div>
			<div
				class="flex flex-col items-center justify-center gap-[0.15rem] py-[0.4rem] px-[0.25rem]">
				{#if showEmoji}
					<span class="text-[1.1rem] leading-none">💰</span>
				{/if}
				<span>= BALANCE</span>
			</div>
		</div>
		{#each rows as _, i (i)}
			<div
				class="grid grid-cols-[1.2fr_5fr_2.5fr_2fr_2fr_2fr] flex-1 border-b border-[var(--outline)] last:border-b-0 even:bg-[var(--bg-high)]">
				<div
					class="border-r border-[var(--outline)] h-full flex items-center justify-center text-[var(--outline-high,#ccc)] font-light text-[1.1rem]">
					<span>/</span>
				</div>
				<div class="border-r border-[var(--outline)] h-full"></div>
				<div class="border-r border-[var(--outline)] h-full"></div>
				<div class="border-r border-[var(--outline)] h-full"></div>
				<div class="border-r border-[var(--outline)] h-full"></div>
				<div class="h-full"></div>
			</div>
		{/each}
	</div>
</div>
