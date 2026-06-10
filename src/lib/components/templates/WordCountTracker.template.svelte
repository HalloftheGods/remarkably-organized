<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<div class="planner page">
	<div class="flex gap-8">
		<div class="field flex-[3] flex-col-1">
			<div
				class="font-bold text-[0.75rem] text-[var(--text-sidebar,var(--text-low))] tracking-[0.5px] mb-1">
				{#if showEmoji}✍️{/if} WORD COUNT TRACKER
			</div>
			<div class="border-b border-[var(--outline)] h-6 w-full"></div>
		</div>
		<div class="field flex-1 flex-col-1">
			<div
				class="font-bold text-[0.75rem] text-[var(--text-sidebar,var(--text-low))] tracking-[0.5px] mb-1">
				MONTH / PERIOD
			</div>
			<div class="border-b border-[var(--outline)] h-6 w-full"></div>
		</div>
	</div>

	<div class="flex-col-1">
		<div class="flex gap-8">
			<div class="field flex-2 flex-col-1">
				<div
					class="font-bold text-[0.75rem] text-[var(--text-sidebar,var(--text-low))] tracking-[0.5px] mb-1">
					PROJECT / NOVEL TITLE
				</div>
				<div class="border-b border-[var(--outline)] h-6 w-full"></div>
			</div>
			<div class="field flex-1 flex-col-1">
				<div
					class="font-bold text-[0.75rem] text-[var(--text-sidebar,var(--text-low))] tracking-[0.5px] mb-1">
					TOTAL TARGET WORD COUNT
				</div>
				<div class="border-b border-[var(--outline)] h-6 w-full"></div>
			</div>
		</div>
	</div>

	<div class="flex-col-1 flex-1">
		<div class="flex gap-6 flex-1">
			<div class="flex-1 flex-col-1">
				<div
					class="font-bold text-[0.8rem] text-[var(--text-sidebar,var(--text-low))] border-b-2 border-[var(--outline)] pb-1 mb-2 tracking-[0.5px]">
					DAILY LOG
				</div>
				<div class="flex-col-1 gap-1">
					<div
						class="flex font-bold text-[0.6rem] text-[var(--text-sidebar,var(--text-low))] border-b border-[var(--outline)] pb-[0.2rem] mb-[0.1rem]">
						<span class="w-9">DAY</span>
						<span class="flex-1 text-center">WORDS</span>
						<span class="flex-1 text-center">CUMULATIVE</span>
					</div>
					{#each Array(15) as _, idx}
						<div class="flex items-end gap-2">
							<span
								class="w-9 text-[0.65rem] text-[var(--text-sidebar,var(--text-low))] pb-[0.15rem]">
								D{idx + 1}
							</span>
							<div class="flex-1 border-b border-[var(--outline)] h-[1.2rem]"></div>
							<div class="flex-1 border-b border-[var(--outline)] h-[1.2rem]"></div>
						</div>
					{/each}
				</div>
			</div>

			<div class="flex-1 flex-col-1">
				<div
					class="font-bold text-[0.8rem] text-[var(--text-sidebar,var(--text-low))] border-b-2 border-[var(--outline)] pb-1 mb-2 tracking-[0.5px] invisible">
					&nbsp;
				</div>
				<div class="flex-col-1 gap-1">
					<div
						class="flex font-bold text-[0.6rem] text-[var(--text-sidebar,var(--text-low))] border-b border-[var(--outline)] pb-[0.2rem] mb-[0.1rem]">
						<span class="w-9">DAY</span>
						<span class="flex-1 text-center">WORDS</span>
						<span class="flex-1 text-center">CUMULATIVE</span>
					</div>
					{#each Array(16) as _, idx}
						<div class="flex items-end gap-2">
							<span
								class="w-9 text-[0.65rem] text-[var(--text-sidebar,var(--text-low))] pb-[0.15rem]">
								D{idx + 16}
							</span>
							<div class="flex-1 border-b border-[var(--outline)] h-[1.2rem]"></div>
							<div class="flex-1 border-b border-[var(--outline)] h-[1.2rem]"></div>
						</div>
					{/each}
				</div>
			</div>

			<div class="flex-[1.5] flex-col-1">
				<div
					class="font-bold text-[0.8rem] text-[var(--text-sidebar,var(--text-low))] border-b-2 border-[var(--outline)] pb-1 mb-2 tracking-[0.5px]">
					PROGRESS CHART (VISUAL TRACKER)
				</div>
				<div class="flex h-40 border border-[var(--outline)] relative mt-1">
					<div
						class="flex-col-1 justify-between text-[0.6rem] text-[var(--text-sidebar,var(--text-low))] py-2 px-1 border-r border-[var(--outline)] text-right w-8">
						<span>100%</span>
						<span>75%</span>
						<span>50%</span>
						<span>25%</span>
						<span>0%</span>
					</div>
					<div class="flex-1 relative">
						<div class="flex-col-1 justify-between h-full w-full py-2 box-border">
							{#each Array(5) as _}
								<div class="border-t border-dashed border-[var(--outline-low)] w-full">
								</div>
							{/each}
						</div>
					</div>
				</div>

				<div
					class="font-bold text-[0.8rem] text-[var(--text-sidebar,var(--text-low))] border-b-2 border-[var(--outline)] pb-1 mb-2 tracking-[0.5px] mt-4">
					IDEAS / BEATS / SCENE OUTLINES
				</div>
				{#each Array(7) as _}
					<div class="border-b border-[var(--outline)] h-6 w-full"></div>
				{/each}
			</div>
		</div>
	</div>
</div>
