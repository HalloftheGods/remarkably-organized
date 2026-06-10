<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Checkbox, Field } from '$atoms';

	let { settings = {} as PlannerSettings } = $props();
</script>

<div class="planner page">
	<header>
		<div class="field flex-[3]">
			<Field i="🧘">Meditation & Breathwork Log</Field>
		</div>
		<div class="field flex-1">
			<Field i="🗓️">Date / Week</Field>
		</div>
	</header>

	<div class="flex-col-1 gap-5 flex-1">
		<div class="flex-col-1 gap-[0.4rem]">
			<div class="section-header">DAILY SESSION TRACKER</div>
			<div
				class="flex text-[0.65rem] font-bold text-[var(--text-sidebar,var(--text-low))] border-b border-[var(--outline)] pb-[0.2rem]">
				<span class="w-12">DAY</span>
				<span class="w-16">TIME</span>
				<span class="w-12">DUR</span>
				<span class="flex-1 pl-2">TECHNIQUE / FOCUS</span>
				<span class="flex-1 pl-2">STATE OF MIND (PRE / POST)</span>
			</div>
			{#each ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as day}
				<div class="flex items-end gap-2">
					<span
						class="w-12 text-[0.7rem] font-bold text-[var(--text-sidebar,var(--text-low))] pb-[0.2rem]">
						{day}
					</span>
					<div class="w-16 border-b border-[var(--outline)] h-6"></div>
					<div class="w-12 border-b border-[var(--outline)] h-6"></div>
					<div class="flex-1 border-b border-[var(--outline)] h-6"></div>
					<div class="flex-1 border-b border-[var(--outline)] h-6"></div>
				</div>
			{/each}
		</div>

		<div class="flex gap-8 flex-1">
			<div class="flex-col-1 flex-1">
				<div class="section-header">INSIGHTS / REVELATIONS / EXPERIENCES</div>
				{#each Array(7) as _}
					<div class="border-b border-[var(--outline)] h-6 w-full"></div>
				{/each}
			</div>

			<div class="flex-col-1 flex-1">
				<div class="section-header">WEEKLY MINDFULNESS GOALS</div>
				{#each Array(3) as _}
					<div class="flex items-end gap-2">
						<Checkbox aria-label="Goal check" />
						<div class="border-b border-[var(--outline)] h-6 w-full flex-1"></div>
					</div>
				{/each}

				<div class="section-header mt-4">BREATHWORK & HABITS</div>
				<div class="flex-col-1 gap-2 pt-1">
					{#each ['Box Breathing', 'Wim Hof Method', '4-7-8 Technique', 'Anapanasati / Focus'] as habit}
						<div class="flex justify-between items-center">
							<span class="text-[0.7rem] text-[var(--text-sidebar,var(--text-low))]">
								{habit}
							</span>
							<div class="flex gap-[0.35rem]">
								{#each ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as dayChar}
									<div class="flex-col-1 items-center gap-[0.15rem]">
										<span
											class="text-[0.55rem] font-bold text-[var(--text-sidebar,var(--text-low))]">
											{dayChar}
										</span>
										<Checkbox aria-label="Day check" class="!w-[0.85rem] !h-[0.85rem]" />
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
