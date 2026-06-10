<script lang="ts">
	import type { CalendarEvent, PlannerSettings, Timeframe } from '$lib';

	let {
		settings = {} as any /* PlannerSettings */,
		timeframe = {} as Timeframe,
		events = [] as CalendarEvent[],
		use24HourClock = false,
		startTime = 5,
		endTime = 22,
		interval = 60,
	} = $props();

	const showEmoji = $derived(!settings?.emojis?.disable);

	const safeStartTime = $derived(Math.max(0, Math.min(23, Number(startTime) || 5)));
	const safeEndTime = $derived(
		Math.max(safeStartTime + 1, Math.min(24, Number(endTime) || 22)),
	);
	const numHours = $derived(safeEndTime - safeStartTime);
	const timelineHours = $derived(
		Array.from({ length: numHours }, (_, i) => safeStartTime + i),
	);

	const formatHour = (hour: number) => {
		if (use24HourClock) return `${hour.toString().padStart(2, '0')}:00`;
		if (hour === 0 || hour === 24) return '12 AM';
		if (hour === 12) return '12 PM';
		return `${hour % 12} ${hour < 12 ? 'AM' : 'PM'}`;
	};
</script>

<div class="planner page p-2">
	<div
		class="flex items-center justify-between border-b-2 border-[var(--outline)] pb-2 mb-4 shrink-0">
		<div class="flex items-center gap-2">
			{#if showEmoji}<span class="text-2xl">🚀</span>{/if}
			<h1
				class="text-xl font-bold font-display uppercase tracking-widest text-[var(--text)] m-0">
				High Performance Day
			</h1>
		</div>
		<div class="flex items-center gap-4">
			<div class="flex flex-col text-right">
				<span
					class="text-[0.6rem] font-bold text-[var(--text-sidebar,var(--text-low))] tracking-wider">
					DATE
				</span>
				<div class="border-b border-[var(--outline)] w-24 h-4"></div>
			</div>
			<div class="flex flex-col text-right">
				<span
					class="text-[0.6rem] font-bold text-[var(--text-sidebar,var(--text-low))] tracking-wider">
					FOCUS SCORE
				</span>
				<div class="flex gap-1 h-4 items-end justify-end">
					{#each Array(5) as _, i}
						<div
							class="w-3 border border-[var(--outline)] rounded-sm bg-[var(--bg-high)]"
							style="height: {(i + 1) * 20}%">
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<div
		class="flex {settings?.isLandscape ? 'flex-row' : 'flex-col'} gap-6 flex-1 min-h-0">
		<!-- Left Side: Focus & Timeline -->
		<div class="flex-[1.2] flex flex-col gap-4 min-h-0">
			<!-- Top 3 Priorities -->
			<div class="box-container flex-[0.4]">
				<div class="box-header">TOP 3 PRIORITIES</div>
				<div class="p-2 flex-col-1 gap-2">
					{#each [1, 2, 3] as num}
						<div class="flex items-center gap-2">
							<span
								class="text-[0.75rem] font-bold text-[var(--text-sidebar,var(--text-low))]">
								{num}
							</span>
							<div class="border-b border-[var(--outline-low,#e0e0e0)] h-6 flex-1"></div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Hourly Timeline -->
			<div class="box-container flex-1 min-h-0">
				<div class="box-header">HOURLY SCHEDULE</div>
				<div class="p-2 flex-col-1 gap-1 overflow-y-auto">
					{#each timelineHours as hour}
						<div class="flex items-end gap-2 h-6">
							<span
								class="text-[0.6rem] font-bold text-[var(--text-sidebar,var(--text-low))] w-[2.8rem] text-right">
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
		<div class="flex-col-1 gap-4 min-h-0">
			<!-- Energy Check-ins -->
			<div class="box-container flex-[0.3]">
				<div class="box-header">ENERGY & FOCUS CHECKS</div>
				<div class="p-2 flex-col-1 gap-2 justify-around">
					<div class="flex items-center justify-between">
						<span
							class="text-[0.65rem] text-[var(--text-sidebar,var(--text-low))] font-bold">
							AM Focus:
						</span>
						<div class="flex gap-[0.4rem]">
							{#each Array(5) as _, i}
								<div class="w-3 h-3 border border-[var(--outline)] rounded-full"></div>
							{/each}
						</div>
					</div>
					<div class="flex items-center justify-between">
						<span
							class="text-[0.65rem] text-[var(--text-sidebar,var(--text-low))] font-bold">
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
			<div class="box-container flex-[0.5]">
				<div class="box-header">NETWORKING & OUTREACH</div>
				<div class="p-2 flex-col-1 gap-2">
					{#each Array(settings?.isLandscape ? 3 : 4) as _}
						<div class="flex items-center gap-2">
							<div class="w-3 h-3 border border-[var(--outline)] rounded-sm"></div>
							<div class="border-b border-[var(--outline-low,#e0e0e0)] h-6 flex-1"></div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Evening Reflection -->
			<div class="box-container flex-1">
				<div class="box-header">EVENING REFLECTION & WINS</div>
				<div class="p-2 flex-col-1 gap-1">
					<span
						class="text-[0.65rem] font-bold text-[var(--text-sidebar,var(--text-low))] mt-1">
						What went well today?
					</span>
					<div class="border-b border-[var(--outline-low,#e0e0e0)] h-6 flex-1"></div>
					<div class="border-b border-[var(--outline-low,#e0e0e0)] h-6 flex-1"></div>
					<span
						class="text-[0.65rem] font-bold text-[var(--text-sidebar,var(--text-low))] mt-1">
						How can I improve tomorrow?
					</span>
					<div class="border-b border-[var(--outline-low,#e0e0e0)] h-6 flex-1"></div>
					<div class="border-b border-[var(--outline-low,#e0e0e0)] h-6 flex-1"></div>
				</div>
			</div>
		</div>
	</div>
</div>
