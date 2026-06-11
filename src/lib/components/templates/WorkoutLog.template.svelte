<script lang="ts">
	import { Emoji, type PlannerSettings } from '$lib';
	import Field from '$atoms/Field.atom.svelte';
	import DateSlashes from '$molecules/DateSlashes.svelte';
	import RowInput from '$atoms/RowInput.svelte';

	let { settings = undefined as any }: { settings?: PlannerSettings } = $props();

	const rows = Array.from({ length: 25 });
	const sets = Array.from({ length: 5 });
</script>

<div class="planner page padded">
	<header class="flex gap-4">
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

	<div class="box-container flex-1">
		<!-- Header -->
		<div class="ledger-header grid grid-cols-[3.5fr_1fr_1fr_1fr_1fr_1fr]">
			<div class="flex items-center justify-center gap-1 font-body">
				<Emoji>🏋️‍♂️</Emoji>
				Exercise
			</div>
			{#each sets as _, i}
				<div class="flex items-center justify-center font-body">
					Set {i + 1}
				</div>
			{/each}
		</div>

		<!-- Rows -->
		<div class="flex-1 flex flex-col">
			{#each rows as _, i}
				<div class="ledger-row grid grid-cols-[3.5fr_1fr_1fr_1fr_1fr_1fr]">
					<div class="ledger-col">
						<RowInput />
					</div>
					{#each sets as _}
						<div class="ledger-col grid grid-cols-2 !p-0">
							<div class="border-r border-solid border-[var(--outline)]">
								<RowInput />
							</div>

							<div>
								<RowInput />
							</div>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>
