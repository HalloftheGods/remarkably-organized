<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<div class="planner page">
	<div class="flex-col-1 shrink-0">
		<span class="font-bold text-[0.75rem] text-[var(--text-low)] tracking-[0.5px] mb-1">
			{#if showEmoji}📚{/if} READING LOG
		</span>
		<div class="border-b border-[var(--outline)] h-6 w-full"></div>
	</div>

	<div class="box-container flex-1">
		<div class="flex bg-[var(--nav-bg-pdf,#f8f8f8)] border-b-2 border-[var(--outline)] p-2 font-bold text-[0.65rem] text-[var(--text-low)] text-center tracking-[0.5px]">
			<div class="flex-[4] px-2 flex justify-center"><span>BOOK TITLE & AUTHOR</span></div>
			<div class="flex-1 px-2 flex justify-center"><span>DATE</span></div>
			<div class="flex-[1.5] px-2 flex justify-center"><span>RATING</span></div>
		</div>
		{#each Array(15) as _}
			<div class="flex px-2 border-b border-[var(--outline)] h-10 items-center last:border-b-0">
				<div class="flex-[4] px-2 h-full flex items-end pb-2"><div class="border-b border-[var(--outline)] h-full w-full"></div></div>
				<div class="flex-1 px-2 h-full flex items-end pb-2"><div class="border-b border-[var(--outline)] h-full w-full"></div></div>
				<div class="flex-[1.5] px-2 h-full flex items-end pb-2 gap-1 justify-center">
					{#each Array(5) as _}
						<span class="text-[1.25rem] text-[var(--outline-high)] leading-none">☆</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
