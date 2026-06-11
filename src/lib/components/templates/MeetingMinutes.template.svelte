<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Checkbox, Emoji } from '$atoms';
	import Field from '$atoms/Field.atom.svelte';
	import DateSlashes from '$molecules/DateSlashes.svelte';

	let { settings = undefined as any }: { settings?: PlannerSettings } = $props();

	const agendaRows = Array.from({ length: 12 });
	const actionRows = Array.from({ length: 8 });
</script>

<div class="planner page padded flex-col-1 gap-4">
	<header class="flex-col gap-4 mb-2">
		<div class="flex gap-4 w-full">
			<div class="field flex-[3]">
				<Field i="📌">SUBJECT</Field>
			</div>
			<div class="field flex-[1.5]">
				<DateSlashes i="📅" label="DATE" />
			</div>
			<div class="field flex-1">
				<Field i="⏱️">START TIME</Field>
			</div>
			<div class="field flex-1">
				<Field i="⏳">END TIME</Field>
			</div>
			<div class="field flex-1">
				<Field>TOTAL MINS</Field>
			</div>
		</div>
		<div class="flex gap-8 w-full mt-4">
			<div class="field flex-[5]">
				<Field i="👥">ATTENDEES</Field>
			</div>
			<div class="field flex-[4]">
				<Field i="📍">LOCATION</Field>
			</div>
		</div>
	</header>

	<div class="flex-col-1 flex-[3]">
		<div class="mb-2">
			<Emoji size="s">📝</Emoji>
			<strong>AGENDA & NOTES</strong>
		</div>
		<div class="flex-col-1 border-t border-[var(--outline)]">
			{#each agendaRows as _, i (i)}
				<div class="flex-1 border-b border-[var(--outline)]"></div>
			{/each}
		</div>
	</div>

	<div class="flex-col flex-[2] mt-4">
		<div class="mb-2">
			<Emoji size="s">✅</Emoji>
			<strong>ACTION ITEMS</strong>
		</div>
		<div class="box-container flex-1">
			<div class="ledger-header grid grid-cols-[1fr_8fr_3fr_3fr]">
				<div class="flex items-center justify-center"></div>
				<div class="flex items-center justify-center"><span>TASK / DECISION</span></div>
				<div class="flex items-center justify-center"><span>OWNER</span></div>
				<div class="flex items-center justify-center !border-r-0">
					<span>DEADLINE</span>
				</div>
			</div>
			{#each actionRows as _, i (i)}
				<div class="ledger-row grid grid-cols-[1fr_8fr_3fr_3fr]">
					<div class="ledger-col flex items-center justify-center">
						<Checkbox />
					</div>
					<div class="ledger-col"></div>
					<div class="ledger-col"></div>
					<div class="ledger-col !border-r-0"></div>
				</div>
			{/each}
		</div>
	</div>
</div>
