<script lang="ts">
	import { getFirstDayOfWeek, type Timeframe } from '$lib';
	import { Box, Text } from '$atoms';
	import { SectionHeader, Field } from '$molecules';

	let {
		timeframe = {} as Timeframe,
		startWeekOnSunday = false,
		settings = undefined as any,
	} = $props();

	const weekStart = $derived(
		new Date(getFirstDayOfWeek(timeframe.start, startWeekOnSunday)),
	);
</script>

<Box class="flex flex-col w-full h-full p-6 box-border gap-6">
	<Box class="flex gap-8">
		<Field
			class="flex-[3]"
			label="{!settings?.emojis?.disable ? '🎯 ' : ''}WEEKLY FOCUS & REVIEW"
			labelWeight="bold" />
		<Field class="flex-1" label="WEEK OF" labelWeight="bold" />
	</Box>

	<Box class="flex flex-col gap-4 flex-1 min-h-0">
		<!-- Top Half: Focus & Projects -->
		<Box class="flex gap-4 flex-1 min-h-0">
			<Box class="flex flex-col flex-1 border border-[var(--outline)] rounded overflow-hidden">
				<SectionHeader title="WEEKLY FOCUS & INTENTION" />
				<Box class="flex flex-col gap-[0.4rem] flex-1 justify-around p-2">
					<Box class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></Box>
					<Box class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></Box>
					<Box class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></Box>
				</Box>
			</Box>

			<Box class="flex flex-col flex-1 border border-[var(--outline)] rounded overflow-hidden">
				<SectionHeader title="ACTIVE PROJECTS" />
				<Box class="flex flex-col gap-[0.4rem] flex-1 justify-around p-2">
					{#each Array(3) as _}
						<Box class="flex items-center gap-2">
							<Box class="w-3 h-3 border border-[var(--outline)] rounded-sm"></Box>
							<Box class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></Box>
						</Box>
					{/each}
				</Box>
			</Box>
		</Box>

		<!-- Mid Section: Daily Highlight Trackers -->
		<Box class="flex flex-col flex-[1.5] min-h-0 border border-[var(--outline)] rounded overflow-hidden">
			<SectionHeader title="DAILY HIGHLIGHTS & DEEP WORK TRACKER" />
			<Box class="flex flex-col gap-[0.4rem] flex-1 justify-between p-2">
				{#each new Array(7) as _, i (i)}
					{@const date = new Date(weekStart.getTime() + i * 86400000)}
					<Box class="flex items-center gap-4">
						<a
							href="#{date.getUTCFullYear()}-{date.getUTCMonth() + 1}-{date.getUTCDate()}"
							class="no-underline color-[var(--text-low)] w-[3.5rem] text-[0.65rem] transition-colors duration-200 ease-in hover:text-[var(--text)]">
							<Text weight="bold">
								{date
									.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })
									.toUpperCase()}
								{date.getUTCDate()}
							</Text>
						</a>
						<Box class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></Box>
					</Box>
				{/each}
			</Box>
		</Box>

		<!-- Bottom Section: Wins & Review -->
		<Box class="flex gap-4 flex-1 min-h-0">
			<Box class="flex flex-col flex-1 border border-[var(--outline)] rounded overflow-hidden">
				<SectionHeader title="WEEKLY WINS & SUCCESSES" />
				<Box class="flex flex-col gap-[0.4rem] flex-1 justify-around p-2">
					{#each Array(3) as _}
						<Box class="flex items-center gap-2">
							<Text class="text-[0.8rem] text-[var(--text-low)]">★</Text>
							<Box class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></Box>
						</Box>
					{/each}
				</Box>
			</Box>

			<Box class="flex flex-col flex-1 border border-[var(--outline)] rounded overflow-hidden">
				<SectionHeader title="REFLECTIONS & REVIEW NOTES" />
				<Box class="flex flex-col gap-[0.4rem] flex-1 justify-around p-2">
					<Box class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></Box>
					<Box class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></Box>
					<Box class="border-b border-[var(--outline-low)] h-[1.2rem] flex-1"></Box>
				</Box>
			</Box>
		</Box>
	</Box>
</Box>

