<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import Field from '$atoms/Field.atom.svelte';
	import DateSlashes from '$molecules/DateSlashes.svelte';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();

	const rows = Array.from({ length: 25 });
	const sets = Array.from({ length: 5 });
</script>

<div class="planner page workout-log">
	<header>
		<div class="field text-center flex-[2.25]">
			<Field i="💪">Workout / Muscle Group</Field>
		</div>
		<div class="field text-center flex-[2]">
			<Field i="⏱️">Duration</Field>
		</div>
		<div class="field text-center flex-[1]">
			<DateSlashes />
		</div>
	</header>

	<div class="flex-1 flex flex-col border border-[var(--outline)]">
		<!-- Header -->
		<div
			class="grid grid-cols-[3.5fr_1fr_1fr_1fr_1fr_1fr] bg-[var(--nav-bg-pdf,#f8f8f8)] border-b-2 border-[var(--outline)]">
			<div
				class="flex items-center justify-center py-1.5 gap-1 border-r border-[var(--outline)] text-[0.65rem] font-bold font-display text-[var(--text-sidebar,var(--text-low))]">
				<span class="emoji">🏋️‍♂️</span>
				EXERCISE
			</div>
			{#each sets as _, i}
				<div
					class="flex items-center justify-center py-1.5 border-r last:border-r-0 border-[var(--outline)] text-[0.65rem] font-bold font-display text-[var(--text-sidebar,var(--text-low))]">
					SET {i + 1}
				</div>
			{/each}
		</div>

		<!-- Rows -->
		<div class="flex-1 flex flex-col bg-white">
			{#each rows as _, i}
				<div
					class="grid grid-cols-[3.5fr_1fr_1fr_1fr_1fr_1fr] flex-1 border-b border-[var(--outline)] last:border-b-0 even:bg-black/5">
					<div class="border-r border-[var(--outline)]"></div>
					{#each sets as _}
						<div
							class="grid grid-cols-2 border-r last:border-r-0 border-[var(--outline)]">
							<div class="border-r border-dashed border-[var(--outline)]"></div>
							<div></div>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>
