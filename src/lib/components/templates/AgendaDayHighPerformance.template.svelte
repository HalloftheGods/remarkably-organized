<script lang="ts">
	import type { Timeframe, PlannerSettings } from '$lib';

	let { timeframe = {} as Timeframe, settings = {} as PlannerSettings } = $props();

	// Timeline hours: 6 AM to 9 PM (16 hours total)
	const timelineHours = Array.from({ length: 16 }, (_, i) => 6 + i);

	const formatHour = (hour: number) => {
		if (hour === 12) return '12 PM';
		if (hour > 12) return `${hour - 12} PM`;
		return `${hour} AM`;
	};
</script>

<div class="planner page flex flex-col w-full h-full p-6 box-border gap-6">
	<div class="flex gap-8">
		<div class="flex-3 flex flex-col">
			<span class="text-[0.75rem] font-bold text-[var(--text-low)] mb-1 tracking-[0.5px]">
				{#if !settings?.emojis?.disable}🚀{/if} HIGH-PERFORMANCE DAILY AGENDA
			</span>
			<div class="border-b border-[var(--outline)] h-2 w-full"></div>
		</div>
		<div class="flex-1 flex flex-col">
			<span class="text-[0.75rem] font-bold text-[var(--text-low)] mb-1 tracking-[0.5px]">
				DATE
			</span>
			<span class="text-[0.9rem] font-bold text-[var(--text)] h-[1.2rem]">
				{#if timeframe.year}
					{timeframe.month}/{timeframe.daySinceMonth}/{timeframe.year}
				{/if}
			</span>
			<div class="border-b border-[var(--outline)] h-2 w-full"></div>
		</div>
	</div>

	<div class="flex gap-6 flex-1 min-h-0">
		<!-- Left Side: Focus & Timeline -->
		<div class="flex-[1.2] flex flex-col gap-4 min-h-0">
			<!-- Top 3 Priorities -->
			<div
				class="border border-[var(--outline)] rounded flex flex-col overflow-hidden flex-[0.4]">
				<div
					class="bg-[var(--nav-bg-pdf,#f8f8f8)] border-b-2 border-[var(--outline)] py-[0.4rem] px-[0.5rem] text-[0.7rem] font-bold text-[var(--text)] tracking-[0.5px]">
					TOP 3 PRIORITIES
				</div>
				<div class="p-2 flex flex-col gap-2 flex-1">
					{#each [1, 2, 3] as num}
						<div class="flex items-center gap-2">
							<span class="text-[0.75rem] font-bold text-[var(--text-low)]">{num}</span>
							<div class="border-b border-[var(--outline-low,#e0e0e0)] h-6 flex-1"></div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Hourly Timeline -->
			<div
				class="border border-[var(--outline)] rounded flex flex-col overflow-hidden flex-1 min-h-0">
				<div
					class="bg-[var(--nav-bg-pdf,#f8f8f8)] border-b-2 border-[var(--outline)] py-[0.4rem] px-[0.5rem] text-[0.7rem] font-bold text-[var(--text)] tracking-[0.5px]">
					HOURLY SCHEDULE
				</div>
				<div class="p-2 flex flex-col gap-1 flex-1 overflow-y-auto">
					{#each timelineHours as hour}
						<div class="flex items-end gap-2 h-6">
							<span
								class="text-[0.6rem] font-bold text-[var(--text-low)] w-[2.8rem] text-right">
								{formatHour(hour)}
							</span>
							<div
								class="border-b border-dashed border-[var(--outline-low,#e0e0e0)] flex-1 h-full">
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Right Side: Energy, Connections, Reflection -->
		<div class="flex-1 flex flex-col gap-4 min-h-0">
			<!-- Energy Check-ins -->
			<div
				class="border border-[var(--outline)] rounded flex flex-col overflow-hidden flex-[0.3]">
				<div
					class="bg-[var(--nav-bg-pdf,#f8f8f8)] border-b-2 border-[var(--outline)] py-[0.4rem] px-[0.5rem] text-[0.7rem] font-bold text-[var(--text)] tracking-[0.5px]">
					ENERGY & FOCUS CHECKS
				</div>
				<div class="p-2 flex flex-col gap-2 flex-1 justify-around">
					<div class="flex items-center justify-between">
						<span class="text-[0.65rem] text-[var(--text-low)] font-bold">AM Focus:</span>
						<div class="flex gap-[0.4rem]">
							{#each Array(5) as _, i}
								<div class="w-3 h-3 border border-[var(--outline)] rounded-full"></div>
							{/each}
						</div>
					</div>
					<div class="flex items-center justify-between">
						<span class="text-[0.65rem] text-[var(--text-low)] font-bold">
							PM Energy:
						</span>
						<div class="flex gap-[0.4rem]">
							{#each Array(5) as _, i}
								<div class="w-3 h-3 border border-[var(--outline)] rounded-full"></div>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<!-- Networking & Connections -->
			<div
				class="border border-[var(--outline)] rounded flex flex-col overflow-hidden flex-[0.5]">
				<div
					class="bg-[var(--nav-bg-pdf,#f8f8f8)] border-b-2 border-[var(--outline)] py-[0.4rem] px-[0.5rem] text-[0.7rem] font-bold text-[var(--text)] tracking-[0.5px]">
					NETWORKING & OUTREACH
				</div>
				<div class="p-2 flex flex-col gap-2 flex-1">
					{#each Array(4) as _}
						<div class="flex items-center gap-2">
							<div class="w-3 h-3 border border-[var(--outline)] rounded-sm"></div>
							<div class="border-b border-[var(--outline-low,#e0e0e0)] h-6 flex-1"></div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Evening Reflection -->
			<div
				class="border border-[var(--outline)] rounded flex flex-col overflow-hidden flex-1">
				<div
					class="bg-[var(--nav-bg-pdf,#f8f8f8)] border-b-2 border-[var(--outline)] py-[0.4rem] px-[0.5rem] text-[0.7rem] font-bold text-[var(--text)] tracking-[0.5px]">
					EVENING REFLECTION & WINS
				</div>
				<div class="p-2 flex flex-col gap-1 flex-1">
					<span class="text-[0.65rem] font-bold text-[var(--text-low)] mt-1">
						What went well today?
					</span>
					<div class="border-b border-[var(--outline-low,#e0e0e0)] h-6 flex-1"></div>
					<div class="border-b border-[var(--outline-low,#e0e0e0)] h-6 flex-1"></div>
					<span class="text-[0.65rem] font-bold text-[var(--text-low)] mt-1">
						How can I improve tomorrow?
					</span>
					<div class="border-b border-[var(--outline-low,#e0e0e0)] h-6 flex-1"></div>
					<div class="border-b border-[var(--outline-low,#e0e0e0)] h-6 flex-1"></div>
				</div>
			</div>
		</div>
	</div>
</div>
