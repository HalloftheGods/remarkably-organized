<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Checkbox } from '$atoms';
	import Field from '$atoms/Field.atom.svelte';

	let { settings = {} }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<div class="planner page">
	<div class="flex gap-8">
		<div class="field flex-[3]">
			<Field i="🐾">PET CARE LOG</Field>
		</div>
		<div class="field flex-1">
			<Field>DATE / WEEK</Field>
		</div>
	</div>

	<div class="flex-col-1 gap-8 flex-1">
		<div class="flex gap-8 flex-1">
			<div class="flex-col-1 flex-1 gap-2">
				<span
					class="font-bold text-[0.75rem] text-[var(--text-sidebar,var(--text-low))] tracking-[0.5px] mb-1 border-b-2 border-[var(--outline)] pb-1">
					FEEDING SCHEDULE
				</span>
				{#each Array(7) as _}
					<div class="flex items-end gap-2">
						<Checkbox aria-label="Feeding schedule check" />
						<div class="border-b border-[var(--outline)] h-6 w-full"></div>
					</div>
				{/each}
			</div>
			<div class="flex-col-1 flex-1 gap-2">
				<span
					class="font-bold text-[0.75rem] text-[var(--text-sidebar,var(--text-low))] tracking-[0.5px] mb-1 border-b-2 border-[var(--outline)] pb-1">
					WALKS / EXERCISE
				</span>
				{#each Array(7) as _}
					<div class="flex items-end gap-2">
						<Checkbox aria-label="Walks/Exercise check" />
						<div class="border-b border-[var(--outline)] h-6 w-full"></div>
					</div>
				{/each}
			</div>
		</div>

		<div class="flex-col-1 gap-2">
			<span
				class="font-bold text-[0.75rem] text-[var(--text-sidebar,var(--text-low))] tracking-[0.5px] mb-1 border-b-2 border-[var(--outline)] pb-1">
				VET NOTES & MEDICATION
			</span>
			<div class="flex-col-1 gap-2 pt-1">
				{#each Array(6) as _}
					<div class="border-b border-[var(--outline)] h-6 w-full"></div>
				{/each}
			</div>
		</div>
	</div>
</div>
