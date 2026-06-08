<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	let rows = new Array(25);
</script>

<div class="planner page workout-log">
	<header>
		<div class="field title-block date-field">
			<label>
				{#if showEmoji}
					<span class="emoji">📅</span>
				{/if}
				<strong>Date</strong>
			</label>
			<div class="content"></div>
		</div>
		<div class="field title-block workout-field">
			<label>
				{#if showEmoji}
					<span class="emoji">💪</span>
				{/if}
				<strong>Workout/Muscle Group</strong>
			</label>
			<div class="content"></div>
		</div>
		<div class="field title-block duration-field">
			<label>
				{#if showEmoji}
					<span class="emoji">⏱️</span>
				{/if}
				<strong>Duration</strong>
			</label>
			<div class="content"></div>
		</div>
	</header>

	<div class="ledger">
		<header class="ledger-header">
			<div class="col exercise-header">
				{#if showEmoji}
					<span class="emoji">🏋️‍♂️</span>
				{/if}
				<span>EXERCISE</span>
			</div>
			<div class="col set-header"><span>SET 1</span></div>
			<div class="col set-header"><span>SET 2</span></div>
			<div class="col set-header"><span>SET 3</span></div>
			<div class="col set-header"><span>SET 4</span></div>
			<div class="col set-header"><span>SET 5</span></div>
		</header>
		{#each rows as _, i (i)}
			<div class="row">
				<div class="col exercise"></div>
				<div class="col set">
					<div class="sub-col"></div>
					<div class="sub-col"></div>
				</div>
				<div class="col set">
					<div class="sub-col"></div>
					<div class="sub-col"></div>
				</div>
				<div class="col set">
					<div class="sub-col"></div>
					<div class="sub-col"></div>
				</div>
				<div class="col set">
					<div class="sub-col"></div>
					<div class="sub-col"></div>
				</div>
				<div class="col set">
					<div class="sub-col"></div>
					<div class="sub-col"></div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.workout-log {
		padding: 1rem 1.5rem 1.5rem;
		box-sizing: border-box;
		gap: 1rem;
	}

	header {
		display: grid;
		grid-template-columns: 3.5fr 4fr 1fr;
		align-items: flex-end;
		gap: 1.5rem;

		.title-block {
			flex: 1;

			label {
				text-align: center;
				justify-content: center;
				text-transform: capitalize;
			}

			.content {
				border-bottom: none;
			}
		}
	}

	.ledger {
		display: flex;
		flex-direction: column;
		flex: 1;
		border: 1px solid var(--outline);
		border-radius: 4px;
		overflow: hidden;

		.ledger-header {
			display: grid;
			grid-template-columns: 3.5fr 1fr 1fr 1fr 1fr 1fr;
			background-color: var(--nav-bg-pdf, #f8f8f8);
			border-bottom: 2px solid var(--outline);
			font-weight: bold;
			font-size: 0.7rem;
			text-align: center;
			color: var(--text-low);
			letter-spacing: 1px;
		}

		.row {
			display: grid;
			grid-template-columns: 3.5fr 1fr 1fr 1fr 1fr 1fr;
			flex: 1;
			border-bottom: 1px solid var(--outline);

			&:last-child {
				border-bottom: none;
			}

			&:nth-child(even) {
				background-color: rgba(128, 128, 128, 0.05);
			}
		}

		.col {
			border-right: 1px solid var(--outline);
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;

			&:last-child {
				border-right: none;
			}

			&.exercise-header {
				flex-direction: row;
				gap: 0.25rem;
				padding: 0.4rem 0.25rem;
			}

			&.set-header {
				flex-direction: column;
				padding: 0.4rem 0.25rem;
			}

			&.set {
				display: flex;
				flex-direction: row;

				.sub-col {
					flex: 1;
					height: 100%;
					border-right: 1px dashed var(--outline);

					&:last-child {
						border-right: none;
					}
				}
			}
		}
	}
</style>

