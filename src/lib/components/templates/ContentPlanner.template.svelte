<script lang="ts">
	import type { PlannerSettings } from '$lib';

	import { Emoji, Field } from '$atoms';
	import RowInput from '$atoms/RowInput.svelte';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	let rows = new Array(22);
</script>

<div class="planner page padded content-planner">
	<header>
		<div class="field flex-[3]">
			<Field i="🎥">CONTENT CREATOR PLANNER & PIPELINE</Field>
		</div>
		<div class="field flex-[1]">
			<Field i="📅">MONTH / WEEK</Field>
		</div>
	</header>

	<div
		class="ledger flex flex-col flex-1 border border-[var(--outline)] rounded-[4px] overflow-hidden">
		<div class="ledger-header grid grid-cols-[1.5fr_3fr_1.2fr_2fr]">
			<div class="col-platform">
				<Emoji size="s">📱</Emoji>
				<span>PLATFORM</span>
			</div>
			<div class="col-idea">
				<Emoji size="s">💡</Emoji>
				<span>CONTENT IDEA / TITLE</span>
			</div>
			<div class="col-format">
				<Emoji size="s">🎬</Emoji>
				<span>FORMAT</span>
			</div>
			<div class="col-status p-0">
				<span><Emoji size="s">🚦</Emoji> STATUS PIPELINE</span>
				<div class="status-labels-grid grid grid-cols-5">
					<span>IDEA</span>
					<span>SCRIPT</span>
					<span>SHOOT</span>
					<span>EDIT</span>
					<span>POST</span>
				</div>
			</div>
		</div>
		{#each rows as _, i (i)}
			<div class="ledger-row grid grid-cols-[1.5fr_3fr_1.2fr_2fr]">
				<div class="col-platform ledger-col">
					<RowInput />
				</div>
				<div class="col-idea ledger-col">
					<RowInput />
				</div>
				<div class="col-format ledger-col">
					<RowInput />
				</div>
				<div
					class="col-status ledger-col !border-r-0 grid grid-cols-5 items-center justify-items-center p-0 gap-0">
					<div class="planner checkbox circle" aria-label="Idea"></div>
					<div class="planner checkbox" aria-label="Script"></div>
					<div class="planner checkbox" aria-label="Shoot"></div>
					<div class="planner checkbox" aria-label="Edit"></div>
					<div class="planner checkbox" aria-label="Post"></div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.content-planner {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}
</style>
