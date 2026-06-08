<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings } = $props();
</script>

<div class="flex flex-col w-full h-full pt-4 px-6 pb-6 box-border gap-6">
	<div class="flex gap-8 w-full border-b border-[var(--outline)] pb-4">
		<div class="flex flex-col flex-[3]">
			<div class="text-xs font-bold text-[var(--text-low)] mb-1 whitespace-nowrap tracking-[0.5px]">
				{#if !settings?.emojis?.disable}⚡{/if} ENERGY & MOOD MATRIX
			</div>
			<div class="border-b border-[var(--outline)] h-6"></div>
		</div>
		<div class="flex flex-col flex-1">
			<div class="text-xs font-bold text-[var(--text-low)] mb-1 whitespace-nowrap tracking-[0.5px]">
				{#if !settings?.emojis?.disable}📅{/if} DATE
			</div>
			<div class="flex items-end justify-evenly pb-[2px] text-[var(--outline-high,#ccc)] text-[1.2rem] font-light leading-none border-b border-[var(--outline)] h-6">
				<span>/</span>
				<span>/</span>
			</div>
		</div>
	</div>

	<div class="flex flex-col gap-4 border border-[var(--outline)] rounded p-4 bg-[rgba(128,128,128,0.02)]">
		<!-- High Energy -->
		<div class="flex gap-4">
			<div class="[writing-mode:vertical-rl] [text-orientation:mixed] rotate-180 font-bold text-[0.85rem] flex items-center justify-center whitespace-nowrap tracking-[0.5px] text-[rgba(220,38,38,0.7)]">
				{#if !settings?.emojis?.disable}🔥{/if} HIGH ENERGY
			</div>
			<div class="flex-1 border border-[var(--outline)] rounded p-3 bg-[rgba(249,115,22,0.08)] flex flex-col gap-3">
				<div class="text-[0.7rem] font-bold text-center pb-2 border-b border-[var(--outline)] text-[var(--text)]">Energized & Happy</div>
				<div class="flex flex-col gap-2">
					<div class="border-b border-[var(--outline)] h-4"></div>
					<div class="border-b border-[var(--outline)] h-4"></div>
					<div class="border-b border-[var(--outline)] h-4"></div>
				</div>
			</div>
			<div class="flex-1 border border-[var(--outline)] rounded p-3 bg-[rgba(220,38,38,0.08)] flex flex-col gap-3">
				<div class="text-[0.7rem] font-bold text-center pb-2 border-b border-[var(--outline)] text-[var(--text)]">Stressed & Anxious</div>
				<div class="flex flex-col gap-2">
					<div class="border-b border-[var(--outline)] h-4"></div>
					<div class="border-b border-[var(--outline)] h-4"></div>
					<div class="border-b border-[var(--outline)] h-4"></div>
				</div>
			</div>
		</div>

		<!-- Low Energy -->
		<div class="flex gap-4">
			<div class="[writing-mode:vertical-rl] [text-orientation:mixed] rotate-180 font-bold text-[0.85rem] flex items-center justify-center whitespace-nowrap tracking-[0.5px] text-[rgba(34,197,94,0.7)]">
				{#if !settings?.emojis?.disable}💤{/if} LOW ENERGY
			</div>
			<div class="flex-1 border border-[var(--outline)] rounded p-3 bg-[rgba(34,197,94,0.08)] flex flex-col gap-3">
				<div class="text-[0.7rem] font-bold text-center pb-2 border-b border-[var(--outline)] text-[var(--text)]">Calm & Peaceful</div>
				<div class="flex flex-col gap-2">
					<div class="border-b border-[var(--outline)] h-4"></div>
					<div class="border-b border-[var(--outline)] h-4"></div>
					<div class="border-b border-[var(--outline)] h-4"></div>
				</div>
			</div>
			<div class="flex-1 border border-[var(--outline)] rounded p-3 bg-[rgba(168,85,247,0.08)] flex flex-col gap-3">
				<div class="text-[0.7rem] font-bold text-center pb-2 border-b border-[var(--outline)] text-[var(--text)]">Tired & Sluggish</div>
				<div class="flex flex-col gap-2">
					<div class="border-b border-[var(--outline)] h-4"></div>
					<div class="border-b border-[var(--outline)] h-4"></div>
					<div class="border-b border-[var(--outline)] h-4"></div>
				</div>
			</div>
		</div>
	</div>

	<div class="border-t-2 border-[var(--outline)] pt-4">
		<div class="font-bold text-xs mb-3 uppercase tracking-[0.5px] text-[var(--text-low)]">
			{#if !settings?.emojis?.disable}📊{/if} Overall Energy Level
		</div>
		<div class="flex gap-3 justify-between">
			{#each [1, 2, 3, 4, 5] as level}
				<div class="flex-1 flex flex-col items-center gap-2">
					<div class="w-full h-6 border border-[var(--outline)] bg-[rgba(128,128,128,0.05)] rounded-[3px]"></div>
					<div class="text-xs font-bold text-center text-[var(--text-low)]">{level}</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="mt-4">
		<div class="font-bold text-xs mb-3 uppercase tracking-[0.5px] text-[var(--text-low)]">
			{#if !settings?.emojis?.disable}📝{/if} Notes & Observations
		</div>
		<div class="flex flex-col gap-2">
			<div class="border-b border-[var(--outline)] h-4"></div>
			<div class="border-b border-[var(--outline)] h-4"></div>
		</div>
	</div>
</div>
