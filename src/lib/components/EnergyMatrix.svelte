<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings } = $props();
</script>

<div class="energy-matrix">
	<div class="header-section">
		<div class="field title-field">
			<div class="label">
				{#if !settings?.emojis?.disable}⚡{/if} ENERGY & MOOD MATRIX
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

	<div class="matrix-container">
		<!-- High Energy -->
		<div class="energy-section high-energy">
			<div class="section-header">
				{#if !settings?.emojis?.disable}🔥{/if} HIGH ENERGY
			</div>
			<div class="quadrant high-energy-positive">
				<div class="quadrant-label">Energized & Happy</div>
				<div class="input-area">
					<div class="input-line"></div>
					<div class="input-line"></div>
					<div class="input-line"></div>
				</div>
			</div>
			<div class="quadrant high-energy-negative">
				<div class="quadrant-label">Stressed & Anxious</div>
				<div class="input-area">
					<div class="input-line"></div>
					<div class="input-line"></div>
					<div class="input-line"></div>
				</div>
			</div>
		</div>

		<!-- Low Energy -->
		<div class="energy-section low-energy">
			<div class="section-header">
				{#if !settings?.emojis?.disable}💤{/if} LOW ENERGY
			</div>
			<div class="quadrant low-energy-positive">
				<div class="quadrant-label">Calm & Peaceful</div>
				<div class="input-area">
					<div class="input-line"></div>
					<div class="input-line"></div>
					<div class="input-line"></div>
				</div>
			</div>
			<div class="quadrant low-energy-negative">
				<div class="quadrant-label">Tired & Sluggish</div>
				<div class="input-area">
					<div class="input-line"></div>
					<div class="input-line"></div>
					<div class="input-line"></div>
				</div>
			</div>
		</div>
	</div>

	<div class="tracking-section">
		<div class="tracking-title">
			{#if !settings?.emojis?.disable}📊{/if} Overall Energy Level
		</div>
		<div class="energy-scale">
			{#each [1, 2, 3, 4, 5] as level}
				<div class="scale-item">
					<div class="scale-block"></div>
					<div class="scale-label">{level}</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="notes-section">
		<div class="notes-title">
			{#if !settings?.emojis?.disable}📝{/if} Notes & Observations
		</div>
		<div class="notes-lines">
			<div class="input-line"></div>
			<div class="input-line"></div>
		</div>
	</div>
</div>

<style lang="scss">
	.energy-matrix {
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

	.matrix-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border: 1px solid var(--outline);
		border-radius: 4px;
		padding: 1rem;
		background-color: rgba(128, 128, 128, 0.02);
	}

	.energy-section {
		display: flex;
		gap: 1rem;

		.section-header {
			writing-mode: vertical-rl;
			text-orientation: mixed;
			transform: rotate(180deg);
			font-weight: bold;
			font-size: 0.85rem;
			display: flex;
			align-items: center;
			white-space: nowrap;
			color: var(--text);
			letter-spacing: 0.5px;
		}
	}

	.high-energy {
		.section-header {
			color: rgba(220, 38, 38, 0.7);
		}
	}

	.low-energy {
		.section-header {
			color: rgba(34, 197, 94, 0.7);
		}
	}

	.quadrant {
		flex: 1;
		border: 1px solid var(--outline);
		border-radius: 4px;
		padding: 0.75rem;
		background-color: white;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;

		.quadrant-label {
			font-size: 0.7rem;
			font-weight: bold;
			text-align: center;
			padding-bottom: 0.5rem;
			border-bottom: 1px solid var(--outline);
			color: var(--text);
		}

		.input-area {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		.input-line {
			border-bottom: 1px solid var(--outline);
			height: 1rem;
		}
	}

	.high-energy-positive {
		background-color: rgba(249, 115, 22, 0.08);
	}

	.high-energy-negative {
		background-color: rgba(220, 38, 38, 0.08);
	}

	.low-energy-positive {
		background-color: rgba(34, 197, 94, 0.08);
	}

	.low-energy-negative {
		background-color: rgba(168, 85, 247, 0.08);
	}

	.tracking-section {
		border-top: 2px solid var(--outline);
		padding-top: 1rem;

		.tracking-title {
			font-weight: bold;
			font-size: 0.75rem;
			margin-bottom: 0.75rem;
			text-transform: uppercase;
			letter-spacing: 0.5px;
			color: var(--text-low);
		}

		.energy-scale {
			display: flex;
			gap: 0.75rem;
			justify-content: space-between;
		}

		.scale-item {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.5rem;

			.scale-block {
				width: 100%;
				height: 1.5rem;
				border: 1px solid var(--outline);
				background-color: rgba(128, 128, 128, 0.05);
				border-radius: 3px;
			}

			.scale-label {
				font-size: 0.75rem;
				font-weight: bold;
				text-align: center;
				color: var(--text-low);
			}
		}
	}

	.notes-section {
		margin-top: 1rem;

		.notes-title {
			font-weight: bold;
			font-size: 0.75rem;
			margin-bottom: 0.75rem;
			text-transform: uppercase;
			letter-spacing: 0.5px;
			color: var(--text-low);
		}

		.notes-lines {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			.input-line {
				border-bottom: 1px solid var(--outline);
				height: 1rem;
			}
		}
	}
</style>
