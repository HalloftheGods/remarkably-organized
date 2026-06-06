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
		<Field
			label="DATE"
			emoji="📅"
			{showEmoji}
			class="title-block" />
		<Field
			label="WORKOUT / MUSCLE GROUP"
			emoji="💪"
			{showEmoji}
			class="title-block" />
		<Field
			label="DURATION"
			emoji="⏱️"
			{showEmoji}
			class="title-block" />
	</Box>

	<Box class="ledger">
		<Box class="header">
			<Box>
				{#if showEmoji}<Text tag="span">🏋️‍♂️</Text> {/if}
				<Text tag="span">EXERCISE</Text>
			</Box>
			<Box><Text>SET 1</Text></Box>
			<Box><Text>SET 2</Text></Box>
			<Box><Text>SET 3</Text></Box>
			<Box><Text>SET 4</Text></Box>
			<Box><Text>SET 5</Text></Box>
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
			gap: 1.5rem;
		}

		.header-section {
			display: grid;
			grid-template-columns: 1fr 2fr 1fr;
			align-items: flex-end;
			gap: 1.5rem;

			.title-block {
				flex: 1;

				.label {
					text-align: center;
					justify-content: center;
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

			.header {
				display: grid;
				grid-template-columns: 3.5fr 1fr 1fr 1fr 1fr 1fr;
				background-color: var(--nav-bg-pdf, #f8f8f8);
				border-bottom: 2px solid var(--outline);
				font-weight: bold;
				font-size: 0.7rem;
				text-align: center;
				color: var(--text-low);
				letter-spacing: 1px;

				> div {
					padding: 0.4rem 0.25rem;
					border-right: 1px solid var(--outline);
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					gap: 0.15rem;

					&:last-child {
						border-right: none;
					}
				}
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

				.col {
					border-right: 1px solid var(--outline);
					height: 100%;

					&:last-child {
						border-right: none;
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
	}
</style>

