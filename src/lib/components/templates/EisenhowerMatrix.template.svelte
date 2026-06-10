<script lang="ts">
		import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	const showEmoji = !settings?.emojis?.disable;
	let rows = new Array(settings?.isLandscape ? 7 : 12);
</script>

<div class="planner page eisenhower-matrix">
	<header>
		<div class="field title-field">
			<label>
				{#if showEmoji}
					<span class="emoji">🧠</span>
				{/if}
				<strong>EISENHOWER MATRIX (PRIORITY PLANNER)</strong>
			</label>
			<div class="content"></div>
		</div>
		<div class="field date-field">
			<label>
				{#if showEmoji}
					<span class="emoji">📅</span>
				{/if}
				<strong>DATE</strong>
			</label>
			<div class="content">
				<div class="date-slashes">
					<span>/</span>
					<span>/</span>
				</div>
			</div>
		</div>
	</header>

	<div class="matrix">
		<div class="quadrant q-do">
			<header class="q-header">
				<strong class="q-title">DO FIRST</strong>
				<small class="q-subtitle">Urgent & Important</small>
			</header>
			<div class="q-body">
				{#each rows as _, i (i)}
					<div class="row-item">
						<div class="checkbox"></div>
						<div class="line"></div>
					</div>
				{/each}
			</div>
		</div>

		<div class="quadrant q-schedule">
			<header class="q-header">
				<strong class="q-title">SCHEDULE</strong>
				<small class="q-subtitle">Not Urgent & Important</small>
			</header>
			<div class="q-body">
				{#each rows as _, i (i)}
					<div class="row-item">
						<div class="checkbox"></div>
						<div class="line"></div>
					</div>
				{/each}
			</div>
		</div>

		<div class="quadrant q-delegate">
			<header class="q-header">
				<strong class="q-title">DELEGATE</strong>
				<small class="q-subtitle">Urgent & Not Important</small>
			</header>
			<div class="q-body">
				{#each rows as _, i (i)}
					<div class="row-item">
						<div class="checkbox"></div>
						<div class="line"></div>
					</div>
				{/each}
			</div>
		</div>

		<div class="quadrant q-drop">
			<header class="q-header">
				<strong class="q-title">DON'T DO</strong>
				<small class="q-subtitle">Not Urgent & Not Important</small>
			</header>
			<div class="q-body">
				{#each rows as _, i (i)}
					<div class="row-item">
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
		header {
			display: flex;
			gap: 2rem;
			width: 100%;

			.title-field {
				flex: 3;
			}

			.date-field {
				flex: 1;
			}

			.date-slashes {
				display: flex;
				align-items: flex-end;
				justify-content: space-evenly;
				padding-bottom: 2px;
				color: var(--outline-high, #ccc);
				font-size: 1.2rem;
				font-weight: 300;
				width: 100%;

				span {
					line-height: 1;
				}
			}
		}

		.matrix {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr 1fr;
			gap: 0.5rem;
			flex: 1;

			.quadrant {
				display: flex;
				flex-direction: column;
				border: 2px solid var(--outline);
				border-radius: 8px;
				overflow: hidden;

				&.q-do {
					border-color: rgba(220, 38, 38, 0.4);
					.q-header {
						border-bottom-color: rgba(220, 38, 38, 0.4);
					}
				}
				&.q-schedule {
					border-color: rgba(22, 163, 74, 0.4);
					.q-header {
						border-bottom-color: rgba(22, 163, 74, 0.4);
					}
				}
				&.q-delegate {
					border-color: rgba(217, 119, 6, 0.4);
					.q-header {
						border-bottom-color: rgba(217, 119, 6, 0.4);
					}
				}
				&.q-drop {
					border-color: var(--outline-high);
					.q-header {
						border-bottom-color: var(--outline-high);
					}
				}

				.q-header {
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 0.75rem;
					border-bottom: 2px solid var(--outline);
					background-color: var(--nav-bg-pdf, #f8f8f8);
					gap: 0;

					.q-title {
						font-size: 1.1rem;
						font-weight: bold;
						letter-spacing: 1px;
						color: var(--text-sidebar, var(--text));
					}

					.q-subtitle {
						font-size: 0.7rem;
						color: var(--text-sidebar, var(--text-low));
						margin-top: 0.25rem;
					}
				}

				.q-body {
					display: flex;
					flex-direction: column;
					flex: 1;
					padding: 0.5rem 1rem;
				}
			}
		}
	}
</style>
