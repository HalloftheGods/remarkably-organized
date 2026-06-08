<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Box, Text } from '$atoms';
	import { Field } from '$molecules';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	let rows = new Array(25);
</script>

<Box class="workout-log">
	<Box class="header-section">
		<Field label="Date" emoji="📅" {showEmoji} class="title-block date-field" />
		<Field
			label="Workout/Muscle Group"
			emoji="💪"
			{showEmoji}
			class="title-block workout-field" />
		<Field label="Duration" emoji="⏱️" {showEmoji} class="title-block duration-field" />
	</Box>

	<Box class="ledger">
		<Box class="ledger-header">
			<Box class="col exercise-header">
				{#if showEmoji}<Text tag="span">🏋️‍♂️</Text>
				{/if}
				<Text tag="span">EXERCISE</Text>
			</Box>
			<Box class="col set-header"><Text>SET 1</Text></Box>
			<Box class="col set-header"><Text>SET 2</Text></Box>
			<Box class="col set-header"><Text>SET 3</Text></Box>
			<Box class="col set-header"><Text>SET 4</Text></Box>
			<Box class="col set-header"><Text>SET 5</Text></Box>
		</Box>
		{#each rows as _, i (i)}
			<Box class="row">
				<Box class="col exercise"></Box>
				<Box class="col set">
					<Box class="sub-col"></Box>
					<Box class="sub-col"></Box>
				</Box>
				<Box class="col set">
					<Box class="sub-col"></Box>
					<Box class="sub-col"></Box>
				</Box>
				<Box class="col set">
					<Box class="sub-col"></Box>
					<Box class="sub-col"></Box>
				</Box>
				<Box class="col set">
					<Box class="sub-col"></Box>
					<Box class="sub-col"></Box>
				</Box>
				<Box class="col set">
					<Box class="sub-col"></Box>
					<Box class="sub-col"></Box>
				</Box>
			</Box>
		{/each}
	</Box>
</Box>

<style lang="scss">
	:global {
		.workout-log {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
			padding: 1rem 1.5rem 1.5rem;
			box-sizing: border-box;
			gap: 1rem;
		}

		.header-section {
			display: grid;
			grid-template-columns: 3.5fr 4fr 1fr;
			align-items: flex-end;
			gap: 1.5rem;

			.title-block {
				flex: 1;

				.label {
					text-align: center;
					justify-content: center;
					text-transform: capitalize;
				}

				:global(.content) {
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
	}
</style>
