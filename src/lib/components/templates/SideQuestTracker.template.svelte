<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Checkbox } from '$atoms';
	import Field from '$atoms/Field.atom.svelte';
	import DateSlashes from '$molecules/DateSlashes.svelte';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	let rows = new Array(10);
</script>

<div class="planner page padded side-quest-tracker">
	<div class="header-section">
		<div class="field title-field">
			<Field i="🎮">SIDE QUEST TRACKER</Field>
		</div>
		<div class="field date-field">
			<DateSlashes i="📅" label="DATE" />
		</div>
	</div>

	<div class="ledger flex flex-col flex-1 border border-[var(--outline)] rounded-[4px] overflow-hidden">
		<div class="ledger-header grid grid-cols-[2fr_0.8fr_0.9fr_1fr_0.7fr]">
			<div class="col-quest">
				{#if showEmoji}<span>⚔️</span>{/if}
				<span>Quest</span>
			</div>
			<div class="col-xp">
				{#if showEmoji}<span>⭐</span>{/if}
				<span>XP</span>
			</div>
			<div class="col-difficulty"><span>Difficulty</span></div>
			<div class="col-progress">
				{#if showEmoji}<span>👾</span>{/if}
				<span>Progress</span>
			</div>
			<div class="col-complete p-0">
				{#if showEmoji}<span>✅</span>{/if}
				<span>Done</span>
			</div>
		</div>

		{#each rows as _, i (i)}
			<div class="ledger-row grid grid-cols-[2fr_0.8fr_0.9fr_1fr_0.7fr]">
				<div class="col-quest ledger-col">
					<!-- <div class="input-line"></div> -->
				</div>
				<div class="col-xp ledger-col">
					<!-- <div class="input-line"></div> -->
				</div>
				<div class="col-difficulty ledger-col flex items-center justify-center">
					<div class="difficulty-badges">
						<span class="badge easy">E</span>
						<span class="badge medium">M</span>
						<span class="badge hard">H</span>
					</div>
				</div>
				<div class="col-progress ledger-col flex items-center p-2">
					<div class="progress-bar"></div>
				</div>
				<div class="col-complete ledger-col !border-r-0 flex items-center justify-center p-0">
					<Checkbox aria-label="Complete" />
				</div>
			</div>
		{/each}
	</div>

	<div class="stats-section">
		<div class="stat-box">
			<span class="stat-label">
				{#if showEmoji}👤{/if} CURRENT LEVEL
			</span>
			<div class="stat-value">
				<div class="input-line"></div>
			</div>
		</div>
		<div class="stat-box">
			<span class="stat-label">
				{#if showEmoji}💪{/if} TOTAL XP
			</span>
			<div class="stat-value">
				<div class="input-line"></div>
			</div>
		</div>
		<div class="stat-box">
			<span class="stat-label">
				{#if showEmoji}🏆{/if} ACHIEVEMENTS
			</span>
			<div class="stat-value">
				<div class="input-line"></div>
			</div>
		</div>
	</div>

	<div class="rewards-section">
		<span class="rewards-title">
			{#if showEmoji}🎁{/if} QUEST REWARDS
		</span>
		<div class="reward-lines">
			{#each [1, 2, 3] as _}
				<div class="reward-line">
					<span class="reward-prefix">●</span>
					<div class="input-line"></div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.side-quest-tracker {
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
			background-color: var(--bg-high);
			border-radius: 2px;
		}

		.stats-section {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 1rem;
			margin: 1rem 0;
			padding: 1rem;
			background-color: var(--bg-high);
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
