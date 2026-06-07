<script lang="ts">
	import { Box, Text } from '$atoms';
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

<Box class="flex flex-col w-full h-full p-6 box-border gap-6">
	<Box class="flex gap-8">
		<Box class="flex-3 flex flex-col">
			<Text class="text-[0.75rem] font-bold text-[var(--text-low)] mb-1 tracking-[0.5px]">
				{#if !settings?.emojis?.disable}🚀{/if} HIGH-PERFORMANCE DAILY AGENDA
			</Text>
			<Box class="border-b border-[var(--outline)] h-2 w-full"></Box>
		</Box>
		<Box class="flex-1 flex flex-col">
			<Text class="text-[0.75rem] font-bold text-[var(--text-low)] mb-1 tracking-[0.5px]">
				DATE
			</Text>
			<Text class="text-[0.9rem] font-bold text-[var(--text)] h-[1.2rem]">
				{#if timeframe.year}
					{timeframe.month}/{timeframe.daySinceMonth}/{timeframe.year}
				{/if}
			</Text>
			<Box class="border-b border-[var(--outline)] h-2 w-full"></Box>
		</Box>
	</Box>

	<Box class="flex gap-6 flex-1 min-h-0">
		<!-- Left Side: Focus & Timeline -->
		<Box class="flex-[1.2] flex flex-col gap-4 min-h-0">
			<!-- Top 3 Priorities -->
			<Box
				class="border border-[var(--outline)] rounded flex flex-col overflow-hidden flex-[0.4]">
				<Box
					class="bg-[var(--nav-bg-pdf,#f8f8f8)] border-b-2 border-[var(--outline)] py-[0.4rem] px-[0.5rem] text-[0.7rem] font-bold text-[var(--text)] tracking-[0.5px]">
					TOP 3 PRIORITIES
				</Box>
				<Box class="p-2 flex flex-col gap-2 flex-1">
					{#each [1, 2, 3] as num}
						<Box class="flex items-center gap-2">
							<Text class="text-[0.75rem] font-bold text-[var(--text-low)]">{num}</Text>
							<Box class="border-b border-[var(--outline-low,#e0e0e0)] h-6 flex-1"></Box>
						</Box>
					{/each}
				</Box>
			</Box>

			<!-- Hourly Timeline -->
			<Box
				class="border border-[var(--outline)] rounded flex flex-col overflow-hidden flex-1 min-h-0">
				<Box
					class="bg-[var(--nav-bg-pdf,#f8f8f8)] border-b-2 border-[var(--outline)] py-[0.4rem] px-[0.5rem] text-[0.7rem] font-bold text-[var(--text)] tracking-[0.5px]">
					HOURLY SCHEDULE
				</Box>
				<Box class="p-2 flex flex-col gap-1 flex-1 overflow-y-auto">
					{#each timelineHours as hour}
						<Box class="flex items-end gap-2 h-6">
							<Text
								class="text-[0.6rem] font-bold text-[var(--text-low)] w-[2.8rem] text-right">
								{formatHour(hour)}
							</Text>
							<Box
								class="border-b border-dashed border-[var(--outline-low,#e0e0e0)] flex-1 h-full"
							></Box>
						</Box>
					{/each}
				</Box>
			</Box>
		</Box>

		<!-- Right Side: Energy, Connections, Reflection -->
		<Box class="flex-1 flex flex-col gap-4 min-h-0">
			<!-- Energy Check-ins -->
			<Box
				class="border border-[var(--outline)] rounded flex flex-col overflow-hidden flex-[0.3]">
				<Box
					class="bg-[var(--nav-bg-pdf,#f8f8f8)] border-b-2 border-[var(--outline)] py-[0.4rem] px-[0.5rem] text-[0.7rem] font-bold text-[var(--text)] tracking-[0.5px]">
					ENERGY & FOCUS CHECKS
				</Box>
				<Box class="p-2 flex flex-col gap-2 flex-1 justify-around">
					<Box class="flex items-center justify-between">
						<Text class="text-[0.65rem] text-[var(--text-low)] font-bold">AM Focus:</Text>
						<Box class="flex gap-[0.4rem]">
							{#each Array(5) as _, i}
								<Box class="w-3 h-3 border border-[var(--outline)] rounded-full"></Box>
							{/each}
						</Box>
					</Box>
					<Box class="flex items-center justify-between">
						<Text class="text-[0.65rem] text-[var(--text-low)] font-bold">
							PM Energy:
						</Text>
						<Box class="flex gap-[0.4rem]">
							{#each Array(5) as _, i}
								<Box class="w-3 h-3 border border-[var(--outline)] rounded-full"></Box>
							{/each}
						</Box>
					</Box>
				</Box>
			</Box>

			<!-- Networking & Connections -->
			<Box
				class="border border-[var(--outline)] rounded flex flex-col overflow-hidden flex-[0.5]">
				<Box
					class="bg-[var(--nav-bg-pdf,#f8f8f8)] border-b-2 border-[var(--outline)] py-[0.4rem] px-[0.5rem] text-[0.7rem] font-bold text-[var(--text)] tracking-[0.5px]">
					NETWORKING & OUTREACH
				</Box>
				<Box class="p-2 flex flex-col gap-2 flex-1">
					{#each Array(4) as _}
						<Box class="flex items-center gap-2">
							<Box class="w-3 h-3 border border-[var(--outline)] rounded-sm"></Box>
							<Box class="border-b border-[var(--outline-low,#e0e0e0)] h-6 flex-1"></Box>
						</Box>
					{/each}
				</Box>
			</Box>

			<!-- Evening Reflection -->
			<Box
				class="border border-[var(--outline)] rounded flex flex-col overflow-hidden flex-1">
				<Box
					class="bg-[var(--nav-bg-pdf,#f8f8f8)] border-b-2 border-[var(--outline)] py-[0.4rem] px-[0.5rem] text-[0.7rem] font-bold text-[var(--text)] tracking-[0.5px]">
					EVENING REFLECTION & WINS
				</Box>
				<Box class="p-2 flex flex-col gap-1 flex-1">
					<Text class="text-[0.65rem] font-bold text-[var(--text-low)] mt-1">
						What went well today?
					</Text>
					<Box class="border-b border-[var(--outline-low,#e0e0e0)] h-6 flex-1"></Box>
					<Box class="border-b border-[var(--outline-low,#e0e0e0)] h-6 flex-1"></Box>
					<Text class="text-[0.65rem] font-bold text-[var(--text-low)] mt-1">
						How can I improve tomorrow?
					</Text>
					<Box class="border-b border-[var(--outline-low,#e0e0e0)] h-6 flex-1"></Box>
					<Box class="border-b border-[var(--outline-low,#e0e0e0)] h-6 flex-1"></Box>
				</Box>
			</Box>
		</Box>
	</Box>
</Box>
