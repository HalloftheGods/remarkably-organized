<script lang="ts">
	import { getFirstDayOfWeek, type Timeframe, getDateHash } from '$lib';

	let {
		timeframe = {} as Timeframe,
		startWeekOnSunday = false,
		settings = undefined as any,
	} = $props();

	const weekStart = $derived(
		new Date(getFirstDayOfWeek(timeframe.start, startWeekOnSunday)),
	);
	import { Field } from '$atoms';
</script>

<div class="planner page padded agenda-week-focus">
	<header>
		<div class="field flex-[3]">
			<Field i="🎯">WEEKLY FOCUS & REVIEW</Field>
		</div>
		<div class="field flex-[1]">
			<Field>WEEK OF</Field>
		</div>
	</header>

	<div class="flex-col-1 gap-4 min-h-0">
		<!-- Top Half: Focus & Projects -->
		<div
			class="flex {settings.isLandscape ? 'flex-row' : 'flex-col'} gap-4 flex-1 min-h-0">
			<div class="box-container flex-1">
				<div class="box-header">WEEKLY FOCUS & INTENTION</div>
				<div class="flex-col-1 gap-[0.4rem] justify-around p-2">
					<div class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></div>
					<div class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></div>
					<div class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></div>
				</div>
			</div>

			<div class="box-container flex-1">
				<div class="box-header">ACTIVE PROJECTS</div>
				<div class="flex-col-1 gap-[0.4rem] justify-around p-2">
					{#each Array(3) as _}
						<div class="flex items-center gap-2">
							<div class="w-3 h-3 border border-[var(--outline)] rounded-sm"></div>
							<div class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Mid Section: Daily Highlight Trackers -->
		<div class="box-container flex-[1.5] min-h-0">
			<div class="box-header">DAILY HIGHLIGHTS & DEEP WORK TRACKER</div>
			<div class="flex-col-1 gap-[0.4rem] justify-between p-2">
				{#each new Array(7) as _, i (i)}
					{@const date = new Date(weekStart.getTime() + i * 86400000)}
					<div class="flex items-center gap-4">
						<a
							href={getDateHash(date)}
							class="no-underline color-[var(--text-low)] w-[3.5rem] text-[0.65rem] transition-colors duration-200 ease-in hover:text-[var(--text)] font-bold">
							<span>
								{date
									.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })
									.toUpperCase()}
								{date.getUTCDate()}
							</span>
						</a>
						<div class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Bottom Section: Wins & Review -->
		<div
			class="flex {settings.isLandscape ? 'flex-row' : 'flex-col'} gap-4 flex-1 min-h-0">
			<div class="box-container flex-1">
				<div class="box-header">WEEKLY WINS & SUCCESSES</div>
				<div class="flex-col-1 gap-[0.4rem] justify-around p-2">
					{#each Array(3) as _}
						<div class="flex items-center gap-2">
							<span class="text-[0.8rem] text-[var(--text-sidebar,var(--text-low))]">
								★
							</span>
							<div class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></div>
						</div>
					{/each}
				</div>
			</div>

			<div class="box-container flex-1">
				<div class="box-header">REFLECTIONS & REVIEW NOTES</div>
				<div class="flex-col-1 gap-[0.4rem] justify-around p-2">
					<div class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></div>
					<div class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></div>
					<div class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></div>
				</div>
			</div>
		</div>
	</div>
</div>
