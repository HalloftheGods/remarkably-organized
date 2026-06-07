<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Box, Text } from '$atoms';

	let { settings = {} as PlannerSettings } = $props();
</script>

<Box class="okr-tracker">
	<Box class="header-section">
		<Text class="label">
			{#if !settings?.emojis?.disable}🎯{/if} OBJECTIVES & KEY RESULTS
		</Text>
		<Box class="line"></Box>
	</Box>

	<Box class="content-section">
		{#each Array(3) as _}
			<Box class="objective-block">
				<Box class="objective">
					<Text class="label">OBJECTIVE</Text>
					<Box class="line"></Box>
				</Box>
				<Box class="key-results">
					{#each Array(4) as _}
						<Box class="kr-row">
							<Box class="box"></Box>
							<Box class="line"></Box>
						</Box>
					{/each}
				</Box>
			</Box>
		{/each}
	</Box>
</Box>

<style lang="scss">
	:global {
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
	}
</style>
