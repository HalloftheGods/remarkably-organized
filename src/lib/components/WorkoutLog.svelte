<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings } = $props();
	let rows = new Array(25);
</script>

<div class="workout-log">
	<div class="header-section">
		<div class="title-block">
			<div class="label">
				{#if !settings?.emojis?.disable}📅{/if} DATE
			</div>
			<div class="line"></div>
		</div>
		<div class="title-block">
			<div class="label">
				{#if !settings?.emojis?.disable}💪{/if} WORKOUT / MUSCLE GROUP
			</div>
			<div class="line"></div>
		</div>
		<div class="title-block">
			<div class="label">
				{#if !settings?.emojis?.disable}⏱️{/if} DURATION
			</div>
			<div class="line"></div>
		</div>
	</div>

	<div class="ledger">
		<div class="header">
			<div>
				{#if !settings?.emojis?.disable}🏋️‍♂️{/if} EXERCISE
			</div>
			<div>SET 1</div>
			<div>SET 2</div>
			<div>SET 3</div>
			<div>SET 4</div>
			<div>SET 5</div>
		</div>
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

		.label {
			font-size: 0.75rem;
			font-weight: bold;
			color: var(--text-low);
			margin-bottom: 0.25rem;
			text-align: center;
			letter-spacing: 0.5px;
		}

		.line {
			display: flex;
			align-items: flex-end;
			border-bottom: 1px solid var(--outline);
			height: 1.5rem;
			padding-bottom: 2px;
		}

		.title-block {
			flex: 1;
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
</style>
