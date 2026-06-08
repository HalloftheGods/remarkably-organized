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
</script>

<div class="planner page flex flex-col w-full h-full p-6 box-border gap-6">
	<div class="flex gap-8">
		<div class="field flex-[3]" labelWeight="bold">
		<label>
			<strong>{!settings?.emojis?.disable ? '🎯 ' : ''}WEEKLY FOCUS & REVIEW</strong>
		</label>
		<div class="content "></div>
	</div>
		<div class="field flex-1" labelWeight="bold">
		<label>
			<strong>WEEK OF</strong>
		</label>
		<div class="content "></div>
	</div>
	</div>

	<div class="flex flex-col gap-4 flex-1 min-h-0">
		<!-- Top Half: Focus & Projects -->
		<div class="flex gap-4 flex-1 min-h-0">
			<div class="flex flex-col flex-1 border border-[var(--outline)] rounded overflow-hidden">
				<div class="section-header"><strong>WEEKLY FOCUS & INTENTION</strong></div>
				<div class="flex flex-col gap-[0.4rem] flex-1 justify-around p-2">
					<div class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></div>
					<div class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></div>
					<div class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></div>
				</div>
			</div>

			<div class="flex flex-col flex-1 border border-[var(--outline)] rounded overflow-hidden">
				<div class="section-header"><strong>ACTIVE PROJECTS</strong></div>
				<div class="flex flex-col gap-[0.4rem] flex-1 justify-around p-2">
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
		<div class="flex flex-col flex-[1.5] min-h-0 border border-[var(--outline)] rounded overflow-hidden">
			<div class="section-header"><strong>DAILY HIGHLIGHTS & DEEP WORK TRACKER</strong></div>
			<div class="flex flex-col gap-[0.4rem] flex-1 justify-between p-2">
				{#each new Array(7) as _, i (i)}
					{@const date = new Date(weekStart.getTime() + i * 86400000)}
					<div class="flex items-center gap-4">
						<a
							href={getDateHash(date)}
							class="no-underline color-[var(--text-low)] w-[3.5rem] text-[0.65rem] transition-colors duration-200 ease-in hover:text-[var(--text)]">
							<span weight="bold">
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
		<div class="flex gap-4 flex-1 min-h-0">
			<div class="flex flex-col flex-1 border border-[var(--outline)] rounded overflow-hidden">
				<div class="section-header"><strong>WEEKLY WINS & SUCCESSES</strong></div>
				<div class="flex flex-col gap-[0.4rem] flex-1 justify-around p-2">
					{#each Array(3) as _}
						<div class="flex items-center gap-2">
							<span class="text-[0.8rem] text-[var(--text-low)]">★</span>
							<div class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></div>
						</div>
					{/each}
				</div>
			</div>

			<div class="flex flex-col flex-1 border border-[var(--outline)] rounded overflow-hidden">
				<div class="section-header"><strong>REFLECTIONS & REVIEW NOTES</strong></div>
				<div class="flex flex-col gap-[0.4rem] flex-1 justify-around p-2">
					<div class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></div>
					<div class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></div>
					<div class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></div>
				</div>
			</div>
		</div>
	</div>
</div>

