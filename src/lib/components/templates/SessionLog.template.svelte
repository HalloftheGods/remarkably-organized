<script lang="ts">
	import PlannerLine from '$molecules/PlannerLine.svelte';
	import type { PlannerSettings } from '$lib';

	import { Field } from '$atoms';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
</script>

<div class="planner page padded session-log">
	<header>
		<div class="field flex-[3]">
			<Field i="🎛️">STUDIO SESSION LOG</Field>
		</div>
		<div class="field flex-[1]">
			<Field>DATE</Field>
		</div>
	</header>

	<div class="meta-section">
		<div class="meta-row">
			<div class="field flex-[3]">
				<Field>PROJECT / SONG</Field>
			</div>
			<div class="field flex-[1]">
				<Field>TEMPO / KEY</Field>
			</div>
		</div>
	</div>

	<div class="content-section">
		<div class="column left">
			<div class="section-label">GEAR & SIGNAL CHAIN / SETUP</div>
			{#each Array(5) as _}
				<PlannerLine />
			{/each}

			<div class="section-label notes-label">TAKES & AUDIO TRACKS</div>
			<div class="takes-table">
				<div class="table-header">
					<span class="col-take">TK</span>
					<span class="col-desc">DESCRIPTION / SETTINGS</span>
					<span class="col-rating">RATE</span>
				</div>
				{#each Array(5) as _}
					<div class="table-row">
						<div class="take-box"></div>
						<PlannerLine />
						<div class="rating-dots">
							{#each Array(5) as _}
								<span class="rating-dot"></span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="column right">
			<div class="section-label">SESSION NOTES / OBSERVATIONS</div>
			{#each Array(7) as _}
				<PlannerLine />
			{/each}

			<div class="section-label steps-label">NEXT STEPS / MIX PLAN</div>
			{#each Array(5) as _}
				<div class="todo-row">
					<div class="todo-box"></div>
					<PlannerLine />
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.session-log {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 1.5rem;
		box-sizing: border-box;
		gap: 1rem;
	}

	.header-section {
		display: flex;
		gap: 2rem;
	}

	.meta-section {
		display: flex;
		flex-direction: column;
	}

	.meta-row {
		display: flex;
		gap: 2rem;
	}

	.section-label {
		font-size: 0.8rem;
		font-weight: bold;
		color: var(--text-low);
		border-bottom: 2px solid var(--outline);
		padding-bottom: 0.25rem;
		margin-top: 0.5rem;
		margin-bottom: 0.25rem;
		letter-spacing: 0.5px;
	}

	.notes-label,
	.steps-label {
		margin-top: 1rem;
	}

	.content-section {
		display: flex;
		gap: 2rem;
		flex: 1;
	}

	.column {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.takes-table {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		margin-top: 0.25rem;
	}

	.table-header {
		display: flex;
		font-size: 0.65rem;
		font-weight: bold;
		color: var(--text-low);
		padding-bottom: 0.25rem;
		border-bottom: 1px solid var(--outline);
	}

	.col-take {
		width: 2rem;
	}

	.col-desc {
		flex: 1;
		padding-left: 0.5rem;
	}

	.col-rating {
		width: 5rem;
		text-align: right;
	}

	.table-row {
		display: flex;
		align-items: flex-end;
		gap: 0.5rem;
	}

	.take-box {
		width: 1.5rem;
		height: 1.25rem;
		border: 1px solid var(--outline);
		flex-shrink: 0;
	}

	.rating-dots {
		display: flex;
		gap: 0.25rem;
		width: 5rem;
		justify-content: flex-end;
		padding-bottom: 0.25rem;
	}

	.rating-dot {
		width: 0.5rem;
		height: 0.5rem;
		border: 1px solid var(--outline);
		border-radius: 50%;
	}

	.todo-row {
		display: flex;
		align-items: flex-end;
		gap: 0.5rem;
	}

	.todo-box {
		width: 1rem;
		height: 1rem;
		border: 1px solid var(--outline);
		flex-shrink: 0;
		margin-bottom: 0.1rem;
	}
</style>
