<script lang="ts">
	import RowInput from '$atoms/RowInput.svelte';
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	const nRows = {
		students: settings?.isLandscape ? 13 : 22,
	};
</script>

<div class="planner page padded grade-tracker">
	<div class="header-section">
		<div class="field title">
			<div class="label">
				{#if showEmoji}
					🏫
				{/if} GRADE & ROSTER TRACKER
			</div>
			<div class="line">
				<RowInput />
			</div>
		</div>
		<div class="field class-name">
			<div class="label">
				{#if showEmoji}
					🎓
				{/if}
				CLASS / PERIOD
			</div>
			<div class="line">
				<RowInput />
			</div>
		</div>
		<div class="field term">
			<div class="label">
				{#if showEmoji}🗓️{/if} TERM / SEMESTER
			</div>
			<div class="line">
				<RowInput />
			</div>
		</div>
	</div>

	<div class="content-section">
		<div class="roster-table">
			<div class="table-header">
				<span class="col-num">#</span>
				<span class="col-student">
					{#if showEmoji}
						👤
					{/if}
					STUDENT NAME
				</span>

				{#each Array(8) as _, idx}
					<!-- Explain what A* means: 
						A1 = Assignment 1
						A2 = Assignment 2
						A3 = Assignment 3
						A4 = Assignment 4
						A5 = Assignment 5
						A6 = Assignment 6
						A7 = Assignment 7
						A8 = Assignment 8
					  -->
					<span class="col-assign">A{idx + 1}</span>
				{/each}
				<span class="col-grade">
					{#if showEmoji}
						⭐
					{/if}
					GRADE
				</span>
			</div>
			{#each Array(nRows.students) as _, sIdx}
				<div class="table-row">
					<span class="student-num">{sIdx + 1}</span>
					<RowInput />
					{#each Array(8) as _}
						<div class="grade-box">
							<RowInput />
						</div>
					{/each}
					<div class="grade-box final-grade-box">
						<RowInput />
					</div>
				</div>
			{/each}
		</div>

		<div class="bottom-section">
			<div class="column weights">
				<div class="section-label">
					{#if showEmoji}⚖️{/if} ASSIGNMENT KEY & WEIGHTS
				</div>
				<div class="weights-grid">
					{#each Array(4) as _, idx}
						<div class="weight-row">
							<span class="weight-key">A{idx + 1}:</span>
							<div class="line">
								<RowInput />
							</div>
							<span class="weight-key">A{idx + 5}:</span>
							<div class="line">
								<RowInput />
							</div>
						</div>
					{/each}
				</div>
			</div>
			<div class="column notes">
				<div class="section-label">
					{#if showEmoji}📝{/if} CLASS NOTES / REMINDERS
				</div>
				{#each Array(4) as _}
					<div class="line">
						<RowInput />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.grade-tracker {
		.header-section {
			display: flex;
			gap: 2rem;

			.field {
				display: flex;
				flex-direction: column;
			}
			.title {
				flex: 2;
			}
			.class-name {
				flex: 1;
			}
			.term {
				flex: 1;
			}
		}

		.label {
			font-size: 0.75rem;
			font-weight: bold;
			color: var(--text-low);
			margin-bottom: 0.25rem;
			letter-spacing: 0.5px;
		}

		.section-label {
			font-size: 0.8rem;
			font-weight: bold;
			color: var(--text-low);
			// border-bottom: 2px solid var(--outline);
			padding-bottom: 0.25rem;
			margin-bottom: 0.5rem;
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
			gap: 1rem;
			flex: 1;
		}

		.roster-table {
			display: flex;
			flex-direction: column;
			gap: 0rem;
			flex: 1;
		}

		.table-header {
			display: flex;
			align-items: center;
			gap: 0.4rem;
			font-size: 0.65rem;
			font-weight: bold;
			color: var(--text-low);
			border-bottom: 1px solid var(--outline);
			padding-bottom: 0.25rem;
		}

		.col-num {
			width: 1.5rem;
		}

		.col-student {
			flex: 1;
		}

		.col-assign {
			width: 2rem;
			text-align: center;
		}

		.col-grade {
			width: 3rem;
			text-align: center;
		}

		.table-row {
			display: flex;
			align-items: flex-end;
			gap: 0.4rem;
		}

		.student-num {
			width: 1.5rem;
			font-size: 0.65rem;
			color: var(--text-low);
			padding-bottom: 0.25rem;
		}

		.student-name-line {
			flex: 1;
		}

		.grade-box {
			width: 2rem;
			// height: 1rem;
			border-bottom: 1px solid var(--outline);
			flex-shrink: 0;
			// margin-bottom: 2px;
		}

		.final-grade-box {
			width: 3rem;
			background-color: var(--outline-low);
		}

		.bottom-section {
			display: flex;
			gap: 2rem;
			height: 8rem;
		}

		.column {
			flex: 1;
			display: flex;
			flex-direction: column;
		}

		.weights-grid {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
		}

		.weight-row {
			display: flex;
			align-items: flex-end;
			gap: 0.5rem;
		}

		.weight-key {
			font-size: 0.65rem;
			font-weight: bold;
			color: var(--text-low);
			padding-bottom: 0.25rem;
		}
	}
</style>
