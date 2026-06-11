<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Checkbox } from '$atoms';
	import Field from '$atoms/Field.atom.svelte';
	import DateSlashes from '$molecules/DateSlashes.svelte';
	import PlannerLine from '$molecules/PlannerLine.svelte';
	import RowInput from '$atoms/RowInput.svelte';

	let { settings = undefined as any }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	const nRows = {
		topics: settings?.isLandscape ? 8 : 13,
	};
</script>

<div class="planner page padded learning-tracker">
	<div class="header-section">
		<div class="field title-field">
			<Field i="📚">LEARNING LOG</Field>
		</div>
		<div class="field date-field">
			<DateSlashes i="📅" label="DATE" />
		</div>
	</div>

	<div class="course-header">
		<div class="field course-name">
			<Field i="🏷️">COURSE / SUBJECT</Field>
		</div>
	</div>

	<div
		class="ledger flex flex-col flex-1 border border-[var(--outline)] rounded-[4px] overflow-hidden">
		<div class="ledger-header grid grid-cols-[2fr_0.8fr_2fr_0.8fr]">
			<div class="col-topic">
				{#if showEmoji}<span>💡</span>{/if}
				<span>Topic</span>
			</div>
			<div class="col-progress">
				<span>
					{#if showEmoji}
						✅
					{:else}
						✓
					{/if}
					Done
				</span>
			</div>
			<div class="col-key">
				<span>
					{#if showEmoji}
						🔐
					{/if}
					Key Takeaway
				</span>
			</div>
			<div class="col-time">
				{#if showEmoji}<span>⏱️</span>{/if}
				<span>Time</span>
			</div>
		</div>

		{#each Array(nRows.topics) as _, i (i)}
			<div class="ledger-row grid grid-cols-[2fr_0.8fr_2fr_0.8fr]">
				<div class="col-topic ledger-col">
					<RowInput />
				</div>
				<div class="col-progress ledger-col flex items-center justify-center p-0">
					<Checkbox aria-label="Done" />
				</div>
				<div class="col-key ledger-col">
					<RowInput />
				</div>
				<div class="col-time ledger-col !border-r-0">
					<RowInput />
				</div>
			</div>
		{/each}
	</div>

	<div class="reflection-section">
		<span class="reflection-title">
			{#if showEmoji}✨{/if} Reflection & Next Steps
		</span>
		<div class="reflection-lines">
			<PlannerLine />
			<PlannerLine />
			<PlannerLine />
			<PlannerLine />
		</div>
	</div>
</div>

<style lang="scss">
	.learning-tracker {
		.header-section {
			display: flex;
			gap: 1rem;
			width: 100%;
		}

		.title-field {
			flex: 3;
		}

		.date-field {
			flex: 1;
		}

		.date-slashes {
			display: flex;
			align-items: flex-end;
			justify-content: space-evenly;
			padding-bottom: 2px;
			color: var(--outline-high, #ccc);
			font-size: 1.2rem;
			font-weight: 300;

			span {
				line-height: 1;
			}
		}

		.course-header {
			margin-bottom: 0.75rem;

			.course-name {
				display: flex;
				flex-direction: column;
				gap: 0.25rem;
			}
		}

		.reflection-section {
			border-top: 2px solid var(--outline);
			padding-top: 1rem;
			margin-top: 0.75rem;

			.reflection-title {
				font-weight: bold;
				font-size: 0.75rem;
				margin-bottom: 0.75rem;
				text-transform: uppercase;
				letter-spacing: 0.5px;
				color: var(--text-low);
			}

			.reflection-lines {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
			}
		}
	}
</style>
