<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import Field from '$atoms/Field.atom.svelte';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	const nRows = {
		objectives: settings?.isLandscape ? 3 : 3,
		keyResults: settings?.isLandscape ? 4 : 7,
	};
</script>

<div class="planner page okr-tracker">
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
						<span class="emoji">🏹</span> OBJECTIVE {_}
					</div>
					<div class="line"></div>
				</div>
				<div class="key-results">
					{#each Array(nRows.keyResults) as _}
						<div class="kr-row">
							<div class="box"></div>
							<div class="line"></div>
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

			.box {
				width: 1.25rem;
				height: 1.25rem;
				border: 1px solid var(--outline);
				flex-shrink: 0;
			}
		}
	}
</style>
