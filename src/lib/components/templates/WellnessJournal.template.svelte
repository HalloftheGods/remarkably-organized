<script lang="ts">
	import PlannerLine from '$molecules/PlannerLine.svelte';
	import { Field } from '$atoms';
	import DateSlashes from '$molecules/DateSlashes.svelte';
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<div class="planner page padded flex flex-col gap-6">
	<!-- Header -->
	<header class="flex gap-8 w-full">
		<div class="flex-[3] flex flex-col">
			<Field i="🧘">WELLNESS JOURNAL</Field>
		</div>
		<div class="flex-1 flex flex-col">
			<DateSlashes i="📅" label="DATE" />
		</div>
	</header>

	<!-- Content -->
	<div class="flex flex-col gap-6 flex-1 min-h-0">
		
		<!-- Physical Health -->
		<div class="flex flex-col gap-2 flex-1 min-h-0">
			<div class="flex items-center gap-2 font-bold text-[0.8rem] text-[var(--text)] tracking-[0.5px] uppercase">
				<span class="text-base">{#if showEmoji}💪{/if}</span>
				<span>Physical Health</span>
			</div>
			<div class="flex flex-col gap-2 flex-1">
				<PlannerLine />
				<PlannerLine />
			</div>
		</div>

		<!-- Mental & Emotional -->
		<div class="flex flex-col gap-2 flex-1 min-h-0">
			<div class="flex items-center gap-2 font-bold text-[0.8rem] text-[var(--text)] tracking-[0.5px] uppercase">
				<span class="text-base">{#if showEmoji}🧠{/if}</span>
				<span>Mental & Emotional</span>
			</div>
			<div class="flex flex-col gap-2 flex-1">
				<PlannerLine />
				<PlannerLine />
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
					<PlannerLine />
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
				<PlannerLine />
				<PlannerLine />
				<PlannerLine />
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
