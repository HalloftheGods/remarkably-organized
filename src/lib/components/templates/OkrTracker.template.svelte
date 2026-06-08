<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings } = $props();
</script>

<div class="planner page okr-tracker">
	<div class="header-section">
		<span class="label">
			{#if !settings?.emojis?.disable}🎯{/if} OBJECTIVES & KEY RESULTS
		</span>
		<div class="line"></div>
	</div>

	<div class="content-section">
		{#each Array(3) as _}
			<div class="objective-block">
				<div class="objective">
					<span class="label">OBJECTIVE</span>
					<div class="line"></div>
				</div>
				<div class="key-results">
					{#each Array(4) as _}
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
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
			padding: 1.5rem;
			box-sizing: border-box;
			gap: 1.5rem;
		}

		.label {
			font-size: 0.75rem;
			font-weight: bold;
			color: var(--text-low);
			margin-bottom: 0.25rem;
			letter-spacing: 0.5px;
		}

		.line {
			border-bottom: 1px solid var(--outline);
			height: 1.5rem;
			width: 100%;
		}

		.content-section {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			flex: 1;
		}

		.objective-block {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		.key-results {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			padding-left: 2rem;
		}

		.kr-row {
			display: flex;
			align-items: flex-end;
			gap: 0.5rem;

			.box {
				width: 1rem;
				height: 1rem;
				border: 1px solid var(--outline);
				flex-shrink: 0;
			}
		}
	
</style>
