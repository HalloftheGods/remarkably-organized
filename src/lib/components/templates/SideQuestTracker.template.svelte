<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings } = $props();
	let rows = new Array(10);
</script>

<div class="side-quest-tracker">
	<div class="header-section">
		<div class="field title-field">
			<div class="label">
				{#if !settings?.emojis?.disable}🎮{/if} SIDE QUEST TRACKER
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

	<div class="tracker-table">
		<div class="table-header">
			<div class="col col-quest">
				{#if !settings?.emojis?.disable}⚔️{/if} Quest
			</div>
			<div class="col col-xp">
				{#if !settings?.emojis?.disable}⭐{/if} XP
			</div>
			<div class="col col-difficulty">Difficulty</div>
			<div class="col col-progress">
				{#if !settings?.emojis?.disable}📊{/if} Progress
			</div>
			<div class="col col-complete">Done</div>
		</div>

		{#each rows as _, i (i)}
			<div class="table-row">
				<div class="col col-quest">
					<div class="input-line"></div>
				</div>
				<div class="col col-xp">
					<div class="input-line"></div>
				</div>
				<div class="col col-difficulty">
					<div class="difficulty-badges">
						<span class="badge easy">E</span>
						<span class="badge medium">M</span>
						<span class="badge hard">H</span>
					</div>
				</div>
				<div class="col col-progress">
					<div class="progress-bar"></div>
				</div>
				<div class="col col-complete">
					<div class="checkbox"></div>
				</div>
			</div>
		{/each}
	</div>

	<div class="stats-section">
		<div class="stat-box">
			<div class="stat-label">
				{#if !settings?.emojis?.disable}👤{/if} CURRENT LEVEL
			</div>
			<div class="stat-value">
				<div class="input-line"></div>
			</div>
		</div>
		<div class="stat-box">
			<div class="stat-label">
				{#if !settings?.emojis?.disable}💪{/if} TOTAL XP
			</div>
			<div class="stat-value">
				<div class="input-line"></div>
			</div>
		</div>
		<div class="stat-box">
			<div class="stat-label">
				{#if !settings?.emojis?.disable}🏆{/if} ACHIEVEMENTS
			</div>
			<div class="stat-value">
				<div class="input-line"></div>
			</div>
		</div>
	</div>

	<div class="rewards-section">
		<div class="rewards-title">
			{#if !settings?.emojis?.disable}🎁{/if} QUEST REWARDS
		</div>
		<div class="reward-lines">
			<div class="reward-line">
				<span class="reward-prefix">●</span>
				<div class="input-line"></div>
			</div>
			<div class="reward-line">
				<span class="reward-prefix">●</span>
				<div class="input-line"></div>
			</div>
			<div class="reward-line">
				<span class="reward-prefix">●</span>
				<div class="input-line"></div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
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
</style>
