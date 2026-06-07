<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Box, Text } from '$atoms';

	let { settings = {} as PlannerSettings } = $props();
</script>

<Box class="pomodoro-tracker">
	<Box class="header-section">
		<Text class="label">
			{#if !settings?.emojis?.disable}🍅{/if} POMODORO TRACKER
		</Text>
		<Box class="line"></Box>
	</Box>

	<Box class="content-section">
		<Box class="table-header">
			<Box class="col-task"><Text>TASK</Text></Box>
			<Box class="col-est"><Text>EST</Text></Box>
			<Box class="col-act"><Text>ACT</Text></Box>
			<Box class="col-pomodoros"><Text>POMODOROS</Text></Box>
		</Box>
		{#each Array(15) as _}
			<Box class="table-row">
				<Box class="col-task"><Box class="line"></Box></Box>
				<Box class="col-est"><Box class="line"></Box></Box>
				<Box class="col-act"><Box class="line"></Box></Box>
				<Box class="col-pomodoros">
					{#each Array(8) as _}
						<Box class="tomato"></Box>
					{/each}
				</Box>
			</Box>
		{/each}
	</Box>
</Box>

<style lang="scss">
	:global {
		.pomodoro-tracker {
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
			border: 1px solid var(--outline);
			border-radius: 4px;
		}

		.table-header {
			display: flex;
			background-color: var(--nav-bg-pdf, #f8f8f8);
			border-bottom: 2px solid var(--outline);
			padding: 0.5rem;
			font-weight: bold;
			font-size: 0.65rem;
			color: var(--text-low);
			text-align: center;
			letter-spacing: 0.5px;

			> div {
				padding: 0 0.5rem;
			}
		}

		.table-row {
			display: flex;
			padding: 0 0.5rem;
			border-bottom: 1px solid var(--outline);
			height: 2.5rem;
			align-items: center;

			&:last-child {
				border-bottom: none;
			}
			> div {
				padding: 0 0.5rem;
				height: 100%;
				display: flex;
				align-items: flex-end;
				padding-bottom: 0.5rem;
			}
		}

		.col-task {
			flex: 4;
		}
		.col-est {
			flex: 1;
		}
		.col-act {
			flex: 1;
		}
		.col-pomodoros {
			flex: 4;
			display: flex;
			gap: 0.5rem;
			align-items: center;
			padding-bottom: 0.25rem !important;

			.tomato {
				width: 1rem;
				height: 1rem;
				border: 1px dashed var(--outline-high);
				border-radius: 50%;
			}
		}
	}
</style>
