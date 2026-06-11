<script lang="ts">
	import RowInput from '$atoms/RowInput.svelte';
	import { Emoji, Field, Checkbox } from '$atoms';
	import type { PlannerSettings } from '$lib';
	import DateSlashes from '$molecules/DateSlashes.svelte';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	const rows = $derived(new Array(settings.isLandscape ? 7 : 12));
</script>

<div class="planner page padded eisenhower-matrix">
	<header class="flex gap-4 w-full">
		<div class="field flex-[3]">
			<Field i="🧠">Eisenhower Matrix (Priority Planner)</Field>
		</div>
		<div class="field flex-[1]">
			<DateSlashes />
		</div>
	</header>

	<div class="grid grid-cols-2 grid-rows-2 gap-2 flex-1 mt-2">
		<div class="flex flex-col border-2 border-[var(--outline)] rounded-lg overflow-hidden">
			<header
				class="flex flex-col items-center p-3 border-b-2 border-[var(--outline)] bg-[var(--nav-bg-pdf,var(--bg-high))] gap-0">
				<strong
					class="text-[1.1rem] font-bold tracking-[1px] text-[var(--text-sidebar,var(--text))]">
					<Emoji>🥇</Emoji>Do First
				</strong>
				<small class="text-[0.7rem] text-[var(--text-sidebar,var(--text-low))] mt-1">
					Urgent & Important
				</small>
			</header>
			<div class="flex flex-col flex-1 py-2 px-4">
				{#each rows as _, i (i)}
					<div class="row-item">
						<Checkbox />
						<div class="line">
									<RowInput />
								</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="flex flex-col border-2 border-[var(--outline)] rounded-lg overflow-hidden">
			<header
				class="flex flex-col items-center p-3 border-b-2 border-[var(--outline)] bg-[var(--nav-bg-pdf,var(--bg-high))] gap-0">
				<strong
					class="text-[1.1rem] font-bold tracking-[1px] text-[var(--text-sidebar,var(--text))]">
					<Emoji>🥈</Emoji>Schedule
				</strong>
				<small class="text-[0.7rem] text-[var(--text-sidebar,var(--text-low))] mt-1">
					Important & Not Urgent
				</small>
			</header>
			<div class="flex flex-col flex-1 py-2 px-4">
				{#each rows as _, i (i)}
					<div class="row-item">
						<Checkbox />
						<div class="line">
									<RowInput />
								</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="flex flex-col border-2 border-[var(--outline)] rounded-lg overflow-hidden">
			<header
				class="flex flex-col items-center p-3 border-b-2 border-[var(--outline)] bg-[var(--nav-bg-pdf,var(--bg-high))] gap-0">
				<strong
					class="text-[1.1rem] font-bold tracking-[1px] text-[var(--text-sidebar,var(--text))]">
					🥉 Delegate
				</strong>
				<small class="text-[0.7rem] text-[var(--text-sidebar,var(--text-low))] mt-1">
					Urgent & Not Important
				</small>
			</header>
			<div class="flex flex-col flex-1 py-2 px-4">
				{#each rows as _, i (i)}
					<div class="row-item">
						<Checkbox />
						<div class="line">
									<RowInput />
								</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="flex flex-col border-2 border-[var(--outline-high)] rounded-lg overflow-hidden">
			<header
				class="flex flex-col items-center p-3 border-b-2 border-[var(--outline-high)] bg-[var(--nav-bg-pdf,var(--bg-high))] gap-0">
				<strong
					class="text-[1.1rem] font-bold tracking-[1px] text-[var(--text-sidebar,var(--text))]">
					<Emoji>🚫</Emoji>Delete
				</strong>
				<small class="text-[0.7rem] text-[var(--text-sidebar,var(--text-low))] mt-1">
					Not Urgent & Not Important
				</small>
			</header>
			<div class="flex flex-col flex-1 py-2 px-4">
				{#each rows as _, i (i)}
					<div class="row-item">
						<Checkbox />
						<div class="line">
									<RowInput />
								</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
