<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Checkbox, Emoji } from '$atoms';
	import Field from '$atoms/Field.atom.svelte';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	let rows = new Array(24);
</script>

<div class="planner page padded assignment-tracker">
	<header class="flex gap-1.5">
		<div class="field flex-[3]">
			<Field i="📚">ASSIGNMENT TRACKER</Field>
		</div>
		<div class="field flex-[1]">
			<Field i="📅">SEMESTER / QUARTER</Field>
		</div>
	</header>

	<div
		class="ledger flex flex-col flex-1 border border-[var(--outline)] rounded-[4px] overflow-hidden">
		<div class="ledger-header grid grid-cols-[1.2fr_3fr_1fr_1.5fr_0.8fr]">
			<div class="col-class">
				<Emoji size="s">🏫</Emoji>
				<span>STUDY</span>
			</div>
			<div class="col-assignment">
				<Emoji size="s">📝</Emoji>
				<span>ASSIGNMENT</span>
			</div>
			<div class="col-due">
				<Emoji size="s">⏰</Emoji>
				<span>DUE DATE</span>
			</div>
			<div class="col-status">
				<span>
					<Emoji size="s">🚦</Emoji>
					STATUS
				</span>
				<div class="status-labels-grid grid grid-cols-3">
					<span>TO DO</span>
					<span>DOING</span>
					<span>DONE</span>
				</div>
			</div>
			<div class="col-grade">
				<Emoji size="s">💯</Emoji>
				<span>GRADE</span>
			</div>
		</div>
		{#each rows as _, i (i)}
			<div class="ledger-row grid grid-cols-[1.2fr_3fr_1fr_1.5fr_0.8fr]">
				<div class="col-class ledger-col"></div>
				<div class="col-assignment ledger-col"></div>
				<div class="col-due ledger-col"></div>
				<div
					class="col-status ledger-col grid grid-cols-3 items-center justify-items-center gap-0 p-0">
					<Checkbox aria-label="To Do" />
					<Checkbox aria-label="Doing" />
					<Checkbox aria-label="Done" />
				</div>
				<div class="col-grade ledger-col !border-r-0"></div>
			</div>
		{/each}
	</div>
</div>
