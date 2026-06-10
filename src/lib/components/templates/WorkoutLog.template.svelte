<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	let rows = new Array(25);
</script>

<div class="planner page">
	<header class="grid grid-cols-[3.5fr_4fr_1fr] items-end gap-6 shrink-0">
		<div class="field flex-1 text-center justify-center capitalize">
			<label class="justify-center">
				{#if showEmoji}
					<span class="emoji">📅</span>
				{/if}
				<strong>Date</strong>
			</label>
			<div class="content !border-b-0"></div>
		</div>
		<div class="field flex-1 text-center justify-center capitalize">
			<label class="justify-center">
				{#if showEmoji}
					<span class="emoji">💪</span>
				{/if}
				<strong>Workout/Muscle Group</strong>
			</label>
			<div class="content !border-b-0"></div>
		</div>
		<div class="field flex-1 text-center justify-center capitalize">
			<label class="justify-center">
				{#if showEmoji}
					<span class="emoji">⏱️</span>
				{/if}
				<strong>Duration</strong>
			</label>
			<div class="content !border-b-0"></div>
		</div>
	</header>

	<div class="box-container flex-1">
		<header
			class="grid grid-cols-[3.5fr_1fr_1fr_1fr_1fr_1fr] bg-[var(--nav-bg-pdf,#f8f8f8)] border-b-2 border-[var(--outline)] font-bold text-[0.7rem] text-center text-[var(--text-sidebar,var(--text-low))] tracking-[1px]">
			<div
				class="border-r border-[var(--outline)] h-full flex flex-row items-center justify-center box-border gap-1 py-[0.4rem] px-[0.25rem]">
				{#if showEmoji}
					<span class="emoji">🏋️‍♂️</span>
				{/if}
				<span>EXERCISE</span>
			</div>
			<div
				class="border-r border-[var(--outline)] h-full flex flex-col items-center justify-center box-border py-[0.4rem] px-[0.25rem]">
				<span>SET 1</span>
			</div>
			<div
				class="border-r border-[var(--outline)] h-full flex flex-col items-center justify-center box-border py-[0.4rem] px-[0.25rem]">
				<span>SET 2</span>
			</div>
			<div
				class="border-r border-[var(--outline)] h-full flex flex-col items-center justify-center box-border py-[0.4rem] px-[0.25rem]">
				<span>SET 3</span>
			</div>
			<div
				class="border-r border-[var(--outline)] h-full flex flex-col items-center justify-center box-border py-[0.4rem] px-[0.25rem]">
				<span>SET 4</span>
			</div>
			<div
				class="h-full flex flex-col items-center justify-center box-border py-[0.4rem] px-[0.25rem]">
				<span>SET 5</span>
			</div>
		</header>
		{#each rows as _, i (i)}
			<div
				class="grid grid-cols-[3.5fr_1fr_1fr_1fr_1fr_1fr] flex-1 border-b border-[var(--outline)] last:border-b-0 even:bg-[rgba(128,128,128,0.05)]">
				<div
					class="border-r border-[var(--outline)] h-full flex items-center justify-center box-border">
				</div>
				<div
					class="border-r border-[var(--outline)] h-full flex flex-row items-center justify-center box-border">
					<div class="flex-1 h-full border-r border-dashed border-[var(--outline)]"></div>
					<div class="flex-1 h-full"></div>
				</div>
				<div
					class="border-r border-[var(--outline)] h-full flex flex-row items-center justify-center box-border">
					<div class="flex-1 h-full border-r border-dashed border-[var(--outline)]"></div>
					<div class="flex-1 h-full"></div>
				</div>
				<div
					class="border-r border-[var(--outline)] h-full flex flex-row items-center justify-center box-border">
					<div class="flex-1 h-full border-r border-dashed border-[var(--outline)]"></div>
					<div class="flex-1 h-full"></div>
				</div>
				<div
					class="border-r border-[var(--outline)] h-full flex flex-row items-center justify-center box-border">
					<div class="flex-1 h-full border-r border-dashed border-[var(--outline)]"></div>
					<div class="flex-1 h-full"></div>
				</div>
				<div class="h-full flex flex-row items-center justify-center box-border">
					<div class="flex-1 h-full border-r border-dashed border-[var(--outline)]"></div>
					<div class="flex-1 h-full"></div>
				</div>
			</div>
		{/each}
	</div>
</div>
