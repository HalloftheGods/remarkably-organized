<script lang="ts">
	import Emoji from '$atoms/Emoji.svelte';
	import Field from '$atoms/Field.atom.svelte';
	import type { PlannerSettings } from '$lib';
	import DateSlashes from '$molecules/DateSlashes.svelte';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	const rows = $derived(new Array(settings.isLandscape ? 7 : 12));
</script>

<div class="planner page eisenhower-matrix">
	<header class="flex gap-4 w-full">
		<div class="field flex-[3]">
			<Field i="🧠">EISENHOWER MATRIX (PRIORITY PLANNER)</Field>
		</div>
		<div class="field flex-[1]">
			<DateSlashes />
		</div>
	</header>

	<div class="grid grid-cols-2 grid-rows-2 gap-2 flex-1 mt-2">
		<div class="flex flex-col border-2 border-[rgba(220,38,38,0.4)] rounded-lg overflow-hidden">
			<header class="flex flex-col items-center p-3 border-b-2 border-[rgba(220,38,38,0.4)] bg-[var(--nav-bg-pdf,var(--bg-high))] gap-0">
				<strong class="text-[1.1rem] font-bold tracking-[1px] text-[var(--text-sidebar,var(--text))]">
					<Emoji>🥇</Emoji>DO FIRST
				</strong>
				<small class="text-[0.7rem] text-[var(--text-sidebar,var(--text-low))] mt-1">Urgent & Important</small>
			</header>
			<div class="flex flex-col flex-1 py-2 px-4">
				{#each rows as _, i (i)}
					<div class="row-item">
						<div class="checkbox"></div>
						<div class="line"></div>
					</div>
				{/each}
			</div>
		</div>

		<div class="flex flex-col border-2 border-[rgba(22,163,74,0.4)] rounded-lg overflow-hidden">
			<header class="flex flex-col items-center p-3 border-b-2 border-[rgba(22,163,74,0.4)] bg-[var(--nav-bg-pdf,var(--bg-high))] gap-0">
				<strong class="text-[1.1rem] font-bold tracking-[1px] text-[var(--text-sidebar,var(--text))]">
					<Emoji>🥈</Emoji>SCHEDULE
				</strong>
				<small class="text-[0.7rem] text-[var(--text-sidebar,var(--text-low))] mt-1">Important & Not Urgent</small>
			</header>
			<div class="flex flex-col flex-1 py-2 px-4">
				{#each rows as _, i (i)}
					<div class="row-item">
						<div class="checkbox"></div>
						<div class="line"></div>
					</div>
				{/each}
			</div>
		</div>

		<div class="flex flex-col border-2 border-[rgba(217,119,6,0.4)] rounded-lg overflow-hidden">
			<header class="flex flex-col items-center p-3 border-b-2 border-[rgba(217,119,6,0.4)] bg-[var(--nav-bg-pdf,var(--bg-high))] gap-0">
				<strong class="text-[1.1rem] font-bold tracking-[1px] text-[var(--text-sidebar,var(--text))]">
					🥉 DELEGATE
				</strong>
				<small class="text-[0.7rem] text-[var(--text-sidebar,var(--text-low))] mt-1">Urgent & Not Important</small>
			</header>
			<div class="flex flex-col flex-1 py-2 px-4">
				{#each rows as _, i (i)}
					<div class="row-item">
						<div class="checkbox"></div>
						<div class="line"></div>
					</div>
				{/each}
			</div>
		</div>

		<div class="flex flex-col border-2 border-[var(--outline-high)] rounded-lg overflow-hidden">
			<header class="flex flex-col items-center p-3 border-b-2 border-[var(--outline-high)] bg-[var(--nav-bg-pdf,var(--bg-high))] gap-0">
				<strong class="text-[1.1rem] font-bold tracking-[1px] text-[var(--text-sidebar,var(--text))]">
					<Emoji>🚫</Emoji>DELETE
				</strong>
				<small class="text-[0.7rem] text-[var(--text-sidebar,var(--text-low))] mt-1">Not Urgent & Not Important</small>
			</header>
			<div class="flex flex-col flex-1 py-2 px-4">
				{#each rows as _, i (i)}
					<div class="row-item">
						<div class="checkbox"></div>
						<div class="line"></div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
