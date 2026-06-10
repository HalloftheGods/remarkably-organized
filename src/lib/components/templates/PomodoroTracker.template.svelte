<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import Field from '$atoms/Field.atom.svelte';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
</script>

<div class="planner page pomodoro-tracker">
	<header>
		<div class="field flex-1">
			<Field i="🍅">POMODORO TRACKER</Field>
		</div>
	</header>

	<div class="content-section flex-col-1 flex-1 mt-4">
		<div class="table-header section-header">
			<div class="col-task">TASK</div>
			<div class="col-est border-l border-[var(--outline)]">EST</div>
			<div class="col-act border-l border-r border-[var(--outline)]">ACT</div>
			<div class="col-pomodoros">POMODOROS</div>
		</div>
		{#each Array(15) as _}
			<div class="table-row">
				<div class="col-task"><div class="line"></div></div>
				<div class="col-est border-l border-[var(--outline)]"><div class="line"></div></div>
				<div class="col-act border-l border-r border-[var(--outline)]"><div class="line"></div></div>
				<div class="col-pomodoros">
					{#each Array(8) as _}
						<div class="tomato"></div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.pomodoro-tracker {
		.content-section {
			border: 1px solid var(--outline);
			border-radius: 4px;
		}

		.table-header {
			display: flex;
			background-color: var(--nav-bg-pdf, var(--bg-high));
			border-bottom: 2px solid var(--outline);
			padding: 0;
			margin-bottom: 0;
			text-align: center;

			> div {
				padding: 0.5rem;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.table-row {
			display: flex;
			flex: 1;
			border-bottom: 1px solid var(--outline);

			&:last-child {
				border-bottom: none;
			}
			
			> div {
				padding: 0 0.5rem;
				height: 100%;
				display: flex;
				align-items: flex-end;
				padding-bottom: 0.5rem;
				box-sizing: border-box;
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
			justify-content: center;
			padding-bottom: 0.25rem !important;

			.tomato {
				width: 1.25rem;
				height: 1.25rem;
				border: 1px dashed var(--outline-high);
				border-radius: 50%;
			}
		}
	}
</style>
