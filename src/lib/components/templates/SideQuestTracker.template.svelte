<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Box, Text, Checkbox } from '$atoms';
	import { Field } from '$molecules';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	let rows = new Array(10);
</script>

<Box class="side-quest-tracker">
	<Box class="header-section">
		<Field label="SIDE QUEST TRACKER" emoji="🎮" {showEmoji} class="title-field" />
		<Box class="field date-field">
			<Text class="label">
				{#if showEmoji}📅{/if} DATE
			</Text>
			<Box class="line date-slashes">
				<Text tag="span">/</Text>
				<Text tag="span">/</Text>
			</Box>
		</Box>
	</Box>

	<Box class="tracker-table">
		<Box class="table-header">
			<Box class="col col-quest">
				{#if showEmoji}<Text tag="span">⚔️</Text>{/if}
				<Text tag="span">Quest</Text>
			</Box>
			<Box class="col col-xp">
				{#if showEmoji}<Text tag="span">⭐</Text>{/if}
				<Text tag="span">XP</Text>
			</Box>
			<Box class="col col-difficulty"><Text>Difficulty</Text></Box>
			<Box class="col col-progress">
				{#if showEmoji}<Text tag="span">📊</Text>{/if}
				<Text tag="span">Progress</Text>
			</Box>
			<Box class="col col-complete"><Text>Done</Text></Box>
		</Box>

		{#each rows as _, i (i)}
			<Box class="table-row">
				<Box class="col col-quest">
					<Box class="input-line"></Box>
				</Box>
				<Box class="col col-xp">
					<Box class="input-line"></Box>
				</Box>
				<Box class="col col-difficulty">
					<Box class="difficulty-badges">
						<Text tag="span" class="badge easy">E</Text>
						<Text tag="span" class="badge medium">M</Text>
						<Text tag="span" class="badge hard">H</Text>
					</Box>
				</Box>
				<Box class="col col-progress">
					<Box class="progress-bar"></Box>
				</Box>
				<Box class="col col-complete">
					<Checkbox aria-label="Complete" />
				</Box>
			</Box>
		{/each}
	</Box>

	<Box class="stats-section">
		<Box class="stat-box">
			<Text class="stat-label">
				{#if showEmoji}👤{/if} CURRENT LEVEL
			</Text>
			<Box class="stat-value">
				<Box class="input-line"></Box>
			</Box>
		</Box>
		<Box class="stat-box">
			<Text class="stat-label">
				{#if showEmoji}💪{/if} TOTAL XP
			</Text>
			<Box class="stat-value">
				<Box class="input-line"></Box>
			</Box>
		</Box>
		<Box class="stat-box">
			<Text class="stat-label">
				{#if showEmoji}🏆{/if} ACHIEVEMENTS
			</Text>
			<Box class="stat-value">
				<Box class="input-line"></Box>
			</Box>
		</Box>
	</Box>

	<Box class="rewards-section">
		<Text class="rewards-title">
			{#if showEmoji}🎁{/if} QUEST REWARDS
		</Text>
		<Box class="reward-lines">
			{#each [1, 2, 3] as _}
				<Box class="reward-line">
					<Text tag="span" class="reward-prefix">●</Text>
					<Box class="input-line"></Box>
				</Box>
			{/each}
		</Box>
	</Box>
</Box>

<style lang="scss">
	:global {
		.side-quest-tracker {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
			padding: 1rem 1.5rem 1.5rem;
			box-sizing: border-box;
			gap: 1.5rem;
		}

		.header-section {
			display: flex;
			gap: 2rem;
			width: 100%;
			border-bottom: 1px solid var(--outline);
			padding-bottom: 1rem;
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

		.tracker-table {
			border: 1px solid var(--outline);
			display: flex;
			flex-direction: column;
			border-radius: 4px;
			overflow: hidden;
		}

		.table-header {
			display: flex;
			background-color: var(--nav-bg-pdf, #f8f8f8);
			color: var(--text);
			border-bottom: 2px solid var(--outline);
			font-weight: bold;
			font-size: 0.7rem;
			text-align: center;
			color: var(--text-low);
			letter-spacing: 0.5px;

			.col {
				padding: 0.6rem 0.5rem;
				display: flex;
				align-items: center;
				justify-content: center;
				border-right: 1px solid var(--outline);

				&:last-child {
					border-right: none;
				}
			}

			.col-quest {
				flex: 2;
				justify-content: flex-start;
			}

			.col-xp {
				flex: 0.8;
			}

			.col-difficulty {
				flex: 0.9;
			}

			.col-progress {
				flex: 1;
			}

			.col-complete {
				flex: 0.7;
			}
		}

		.table-row {
			display: flex;
			border-bottom: 1px solid var(--outline);
			min-height: 2.5rem;
			background-color: rgba(128, 128, 128, 0.02);

			&:last-child {
				border-bottom: none;
			}

			&:nth-child(even) {
				background-color: rgba(128, 128, 128, 0.05);
			}

			.col {
				padding: 0.6rem 0.5rem;
				display: flex;
				align-items: center;
				border-right: 1px solid var(--outline);

				&:last-child {
					border-right: none;
				}
			}

			.col-quest {
				flex: 2;
			}

			.col-xp {
				flex: 0.8;
			}

			.col-difficulty {
				flex: 0.9;
				justify-content: center;
			}

			.col-progress {
				flex: 1;
			}

			.col-complete {
				flex: 0.7;
				justify-content: center;

				.checkbox {
					width: 1rem;
					height: 1rem;
					border: 1px solid var(--outline);
					border-radius: 3px;
					background-color: transparent;
				}
			}

			.input-line {
				width: 100%;
				border-bottom: 1px solid var(--outline);
			}
		}

		.difficulty-badges {
			display: flex;
			gap: 0.5rem;

			.badge {
				width: 1.2rem;
				height: 1.2rem;
				border: 1px solid var(--outline);
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 0.65rem;
				font-weight: bold;
				cursor: pointer;
				border-radius: 3px;

				&.easy {
					background-color: rgba(34, 197, 94, 0.2);
					border-color: rgba(34, 197, 94, 0.5);
					color: rgba(34, 197, 94, 0.9);
				}

				&.medium {
					background-color: rgba(249, 115, 22, 0.2);
					border-color: rgba(249, 115, 22, 0.5);
					color: rgba(249, 115, 22, 0.9);
				}

				&.hard {
					background-color: rgba(220, 38, 38, 0.2);
					border-color: rgba(220, 38, 38, 0.5);
					color: rgba(220, 38, 38, 0.9);
				}
			}
		}

		.progress-bar {
			width: 100%;
			height: 1rem;
			border: 1px solid var(--outline);
			background-color: rgba(128, 128, 128, 0.05);
			border-radius: 2px;
		}

		.stats-section {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 1rem;
			margin: 1rem 0;
			padding: 1rem;
			background-color: rgba(128, 128, 128, 0.05);
			border: 1px solid var(--outline);
			border-radius: 4px;

			.stat-box {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
				text-align: center;

				.stat-label {
					font-size: 0.7rem;
					font-weight: bold;
					text-transform: uppercase;
					letter-spacing: 0.5px;
					color: var(--text-low);
				}

				.stat-value {
					display: flex;
					align-items: center;

					.input-line {
						width: 100%;
						border-bottom: 1px solid var(--outline);
						height: 1rem;
					}
				}
			}
		}

		.rewards-section {
			border-top: 2px solid var(--outline);
			padding-top: 1rem;

			.rewards-title {
				font-weight: bold;
				font-size: 0.75rem;
				margin-bottom: 0.75rem;
				text-transform: uppercase;
				letter-spacing: 0.5px;
				color: var(--text-low);
			}

			.reward-lines {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;

				.reward-line {
					display: flex;
					align-items: flex-end;
					gap: 0.75rem;

					.reward-prefix {
						font-size: 0.7rem;
						min-width: 0.5rem;
						color: var(--outline-high);
					}

					.input-line {
						flex: 1;
						border-bottom: 1px solid var(--outline);
						height: 1rem;
					}
				}
			}
		}
	}
</style>
