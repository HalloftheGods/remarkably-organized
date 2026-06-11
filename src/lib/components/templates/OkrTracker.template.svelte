<script lang="ts">
	import RowInput from '$atoms/RowInput.svelte';
	import type { PlannerSettings } from '$lib';
	import Field from '$atoms/Field.atom.svelte';
	import { Checkbox } from '$atoms';
	import Emoji from '$atoms/Emoji.svelte';

	let { settings = undefined as any }: { settings?: PlannerSettings } = $props();
	const nRows = {
		objectives: settings?.isLandscape ? 3 : 3,
		keyResults: settings?.isLandscape ? 4 : 5,
	};
</script>

<div class="planner page padded okr-tracker">
	<header>
		<div class="field flex-1">
			<Field i="🎯">OBJECTIVES & KEY RESULTS</Field>
		</div>
	</header>

	<div class="content-section">
		{#each Array(nRows.objectives) as _}
			<div class="objective-block">
				<div class="objective">
					<div class="section-header">
						<Emoji>🏹</Emoji>
						OBJECTIVE {_}
					</div>
					<div class="line">
						<RowInput />
					</div>
				</div>
				<div class="key-results">
					{#each Array(nRows.keyResults) as _}
						<div class="kr-row flex items-end gap-2 mb-1">
							<Checkbox class="mb-1" />
							<div class="line flex-1 w-full relative">
								<RowInput />
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.okr-tracker {
		.content-section {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			flex: 1;
			justify-content: center;
		}

		.objective-block {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		.objective {
			.section-header {
				margin-bottom: 0.25rem;
				border-bottom: none;
				padding-bottom: 0;
			}
		}

		.key-results {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			padding-left: 2rem;
		}

		.kr-row {
			display: flex;
			align-items: flex-end;
			gap: 0.5rem;
		}
	}
</style>
