<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} }: { settings?: PlannerSettings } = $props();
</script>

<div class="planner page pomodoro-tracker">
	<div class="header-section">
		<span class="label">
			{#if !settings?.emojis?.disable}🍅{/if} POMODORO TRACKER
		</span>
		<div class="line"></div>
	</div>

	<div class="content-section">
		<div class="table-header">
			<div class="col-task"><span>TASK</span></div>
			<div class="col-est"><span>EST</span></div>
			<div class="col-act"><span>ACT</span></div>
			<div class="col-pomodoros"><span>POMODOROS</span></div>
		</div>
		{#each Array(15) as _}
			<div class="table-row">
				<div class="col-task"><div class="line"></div></div>
				<div class="col-est"><div class="line"></div></div>
				<div class="col-act"><div class="line"></div></div>
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
</style>
