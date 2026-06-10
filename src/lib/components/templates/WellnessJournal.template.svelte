<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<div class="planner page padded flex flex-col gap-6">
	<!-- Header -->
	<div class="flex gap-8 w-full">
		<div class="flex flex-col flex-[3]">
			<span class="text-xs font-bold text-[var(--text-low)] mb-1 whitespace-nowrap tracking-[0.5px]">
				{#if showEmoji}🧘{/if} WELLNESS JOURNAL
			</span>
			<div class="border-b border-[var(--outline)] h-6"></div>
		</div>
		<div class="flex flex-col flex-1">
			<span class="text-xs font-bold text-[var(--text-low)] mb-1 whitespace-nowrap tracking-[0.5px]">
				{#if showEmoji}📅{/if} DATE
			</span>
			<div class="flex items-end justify-evenly pb-[2px] text-[var(--outline-high,#ccc)] text-[1.2rem] font-light border-b border-[var(--outline)] h-6">
				<span class="leading-none">/</span>
				<span class="leading-none">/</span>
			</div>
		</div>
	</div>

	<!-- Content -->
	<div class="flex flex-col gap-6 flex-1 min-h-0">
		
		<!-- Physical Health -->
		<div class="flex flex-col gap-2 flex-1 min-h-0">
			<div class="flex items-center gap-2 font-bold text-[0.8rem] text-[var(--text)] tracking-[0.5px] uppercase">
				<span class="text-base">{#if showEmoji}💪{/if}</span>
				<span>Physical Health</span>
			</div>
			<div class="flex flex-col gap-2 flex-1">
				<div class="border-b border-[var(--outline)] flex-1 min-h-4"></div>
				<div class="border-b border-[var(--outline)] flex-1 min-h-4"></div>
			</div>
		</div>

		<!-- Mental & Emotional -->
		<div class="flex flex-col gap-2 flex-1 min-h-0">
			<div class="flex items-center gap-2 font-bold text-[0.8rem] text-[var(--text)] tracking-[0.5px] uppercase">
				<span class="text-base">{#if showEmoji}🧠{/if}</span>
				<span>Mental & Emotional</span>
			</div>
			<div class="flex flex-col gap-2 flex-1">
				<div class="border-b border-[var(--outline)] flex-1 min-h-4"></div>
				<div class="border-b border-[var(--outline)] flex-1 min-h-4"></div>
			</div>
		</div>

		<!-- Sleep & Rest -->
		<div class="flex flex-col gap-2 flex-1 min-h-0">
			<div class="flex items-center gap-2 font-bold text-[0.8rem] text-[var(--text)] tracking-[0.5px] uppercase">
				<span class="text-base">{#if showEmoji}😴{/if}</span>
				<span>Sleep & Rest</span>
			</div>
			<div class="flex flex-col gap-4 flex-1 justify-center">
				<div class="flex items-end gap-3 text-xs">
					<span class="min-w-[3rem] font-semibold text-[var(--text)]">Quality:</span>
					<div class="flex gap-1 text-[0.9rem] tracking-[0.1em] text-[var(--outline-high)]">
						<span class="w-4 text-center">★</span>
						<span class="w-4 text-center">★</span>
						<span class="w-4 text-center">★</span>
						<span class="w-4 text-center">★</span>
						<span class="w-4 text-center">★</span>
					</div>
				</div>
				<div class="flex items-end gap-3 text-xs flex-1 min-h-4">
					<span class="min-w-[3rem] font-semibold text-[var(--text)]">Hours:</span>
					<div class="flex-1 border-b border-[var(--outline)] h-full"></div>
				</div>
			</div>
		</div>

		<!-- Gratitude & Reflections -->
		<div class="flex flex-col gap-2 flex-[1.5] min-h-0">
			<div class="flex items-center gap-2 font-bold text-[0.8rem] text-[var(--text)] tracking-[0.5px] uppercase">
				<span class="text-base">{#if showEmoji}🙏{/if}</span>
				<span>Gratitude & Reflections</span>
			</div>
			<div class="flex flex-col gap-2 flex-1">
				<div class="border-b border-[var(--outline)] flex-1 min-h-4"></div>
				<div class="border-b border-[var(--outline)] flex-1 min-h-4"></div>
				<div class="border-b border-[var(--outline)] flex-1 min-h-4"></div>
			</div>
		</div>

		<!-- Energy Level -->
		<div class="flex flex-col gap-2 shrink-0">
			<div class="flex items-center gap-2 font-bold text-[0.8rem] text-[var(--text)] tracking-[0.5px] uppercase">
				<span class="text-base">{#if showEmoji}⚡{/if}</span>
				<span>Energy Level</span>
			</div>
			<div class="flex gap-2 h-6">
				{#each [1, 2, 3, 4, 5] as level}
					<div class="flex-1 border border-[var(--outline)] rounded-sm"></div>
				{/each}
			</div>
		</div>

	</div>
</div>
