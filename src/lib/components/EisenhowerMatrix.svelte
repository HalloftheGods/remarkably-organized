<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings } = $props();
	let rows = new Array(11);
</script>

<div class="eisenhower-matrix">
	<div class="header-section">
		<div class="field title-field">
			<div class="label">
				{#if !settings?.emojis?.disable}🧠{/if} EISENHOWER MATRIX (PRIORITY PLANNER)
			</div>
			<div class="line"></div>
		</div>
		<div class="field date-field">
			<div class="label">
				{#if !settings?.emojis?.disable}📅{/if} DATE
			</div>
			<div class="line date-slashes">
				<span>/</span>
				<span>/</span>
			</div>
		</div>
	</div>

	<div class="matrix">
		<!-- DO FIRST (Urgent & Important) -->
		<div class="quadrant q-do">
			<div class="q-header">
				<div class="q-title">DO FIRST</div>
				<div class="q-subtitle">Urgent & Important</div>
			</div>
			<div class="q-body">
				{#each rows as _, i (i)}
					<div class="row">
						<div class="checkbox"></div>
						<div class="line"></div>
					</div>
				{/each}
			</div>
		</div>

		<!-- SCHEDULE (Not Urgent & Important) -->
		<div class="quadrant q-schedule">
			<div class="q-header">
				<div class="q-title">SCHEDULE</div>
				<div class="q-subtitle">Not Urgent & Important</div>
			</div>
			<div class="q-body">
				{#each rows as _, i (i)}
					<div class="row">
						<div class="checkbox"></div>
						<div class="line"></div>
					</div>
				{/each}
			</div>
		</div>

		<!-- DELEGATE (Urgent & Not Important) -->
		<div class="quadrant q-delegate">
			<div class="q-header">
				<div class="q-title">DELEGATE</div>
				<div class="q-subtitle">Urgent & Not Important</div>
			</div>
			<div class="q-body">
				{#each rows as _, i (i)}
					<div class="row">
						<div class="checkbox"></div>
						<div class="line"></div>
					</div>
				{/each}
			</div>
		</div>

		<!-- DON'T DO (Not Urgent & Not Important) -->
		<div class="quadrant q-drop">
			<div class="q-header">
				<div class="q-title">DON'T DO</div>
				<div class="q-subtitle">Not Urgent & Not Important</div>
			</div>
			<div class="q-body">
				{#each rows as _, i (i)}
					<div class="row">
						<div class="checkbox"></div>
						<div class="line"></div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.eisenhower-matrix {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 1.5rem;
		box-sizing: border-box;
		gap: 1.5rem;
	}

	.header-section {
		display: flex;
		gap: 2rem;
		width: 100%;

		.label {
			font-size: 0.75rem;
			font-weight: bold;
			color: var(--text-low);
			margin-bottom: 0.25rem;
			white-space: nowrap;
			letter-spacing: 0.5px;
		}

		.line {
			border-bottom: 1px solid var(--outline);
			height: 1.5rem;
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

		.field {
			display: flex;
			flex-direction: column;
		}

		.title-field {
			flex: 3;
		}

		.date-field {
			flex: 1;
		}
	}

	.matrix {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 1.5rem;
		flex: 1;

		.quadrant {
			display: flex;
			flex-direction: column;
			border: 2px solid var(--outline);
			border-radius: 8px;
			overflow: hidden;

			&.q-do {
				border-color: rgba(220, 38, 38, 0.4);
			}
			&.q-schedule {
				border-color: rgba(22, 163, 74, 0.4);
			}
			&.q-delegate {
				border-color: rgba(217, 119, 6, 0.4);
			}
			&.q-drop {
				border-color: var(--outline-high);
			}

			.q-header {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 0.75rem;
				border-bottom: 2px solid var(--outline);
				background-color: var(--nav-bg-pdf, #f8f8f8);

				.q-title {
					font-size: 1.1rem;
					font-weight: bold;
					letter-spacing: 1px;
					color: var(--text);
				}

				.q-subtitle {
					font-size: 0.7rem;
					color: var(--text-low);
					margin-top: 0.25rem;
				}
			}

			.q-body {
				display: flex;
				flex-direction: column;
				flex: 1;
				padding: 0.5rem 1rem;

				.row {
					display: flex;
					align-items: flex-end;
					flex: 1;
					gap: 0.75rem;

					.checkbox {
						width: 1rem;
						height: 1rem;
						border: 2px solid var(--outline-high);
						border-radius: 2px;
						margin-bottom: 0.25rem;
					}

					.line {
						flex: 1;
						border-bottom: 1px solid var(--outline);
						height: 100%;
					}
				}
			}
		}

		.q-do .q-header {
			border-bottom-color: rgba(220, 38, 38, 0.4);
		}
		.q-schedule .q-header {
			border-bottom-color: rgba(22, 163, 74, 0.4);
		}
		.q-delegate .q-header {
			border-bottom-color: rgba(217, 119, 6, 0.4);
		}
		.q-drop .q-header {
			border-bottom-color: var(--outline-high);
		}
	}
</style>
