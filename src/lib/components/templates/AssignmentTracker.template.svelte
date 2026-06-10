<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Checkbox, Emoji } from '$atoms';
	import Field from '$atoms/Field.atom.svelte';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	let rows = new Array(24);
</script>

<div class="planner page assignment-tracker">
	<header class="flex gap-1.5">
		<div class="field flex-[3]">
			<Field i="📚">ASSIGNMENT TRACKER</Field>
		</div>
		<div class="field flex-[1]">
			<Field i="📅">SEMESTER / QUARTER</Field>
		</div>
	</header>

	<div class="ledger flex flex-col flex-1 border border-[var(--outline)] rounded-[4px] overflow-hidden">
		<div class="header grid grid-cols-[1.2fr_3fr_1fr_1.5fr_0.8fr] w-full bg-[var(--nav-bg-pdf,var(--bg-high))] border-b-2 border-[var(--outline)] font-bold text-[0.7rem] text-center text-[var(--text-sidebar,var(--text-low))] tracking-[1px] [&>*]:min-w-0 [&>div]:py-2 [&>div]:border-r [&>div]:border-[var(--outline)] [&>div]:flex [&>div]:flex-col [&>div]:items-center [&>div]:justify-center [&>div:last-child]:border-r-0">
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
				<div class="status-labels grid grid-cols-3 w-full mt-1 text-[0.65em] text-inherit tracking-[0.5px] [&>span]:text-center">
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
			<div class="row flex-1 border-b border-[var(--outline)] last:border-b-0 even:bg-[var(--bg-high)] grid grid-cols-[1.2fr_3fr_1fr_1.5fr_0.8fr] w-full [&>*]:min-w-0">
				<div class="col col-class border-r border-[var(--outline)] h-full"></div>
				<div class="col col-assignment border-r border-[var(--outline)] h-full"></div>
				<div class="col col-due border-r border-[var(--outline)] h-full"></div>
				<div class="col col-status border-r border-[var(--outline)] h-full grid grid-cols-3 items-center justify-items-center gap-0 p-0">
					<Checkbox aria-label="To Do" />
					<Checkbox aria-label="Doing" />
					<Checkbox aria-label="Done" />
				</div>
				<div class="col col-grade h-full border-r-0"></div>
			</div>
		{/each}
	</div>
</div>
