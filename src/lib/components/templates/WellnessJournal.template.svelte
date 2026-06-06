<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings } = $props();
</script>

<div class="wellness-journal">
	<div class="header-section">
		<div class="field title-field">
			<div class="label">
				{#if !settings?.emojis?.disable}🧘{/if} WELLNESS JOURNAL
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

	<div class="wellness-content">
		<div class="wellness-section">
			<div class="section-header">
				<span class="emoji">
					{#if !settings?.emojis?.disable}💪{/if}
				</span>
				<span class="section-title">Physical Health</span>
			</div>
			<div class="input-area">
				<div class="input-line"></div>
				<div class="input-line"></div>
			</div>
		</div>

		<div class="wellness-section">
			<div class="section-header">
				<span class="emoji">
					{#if !settings?.emojis?.disable}🧠{/if}
				</span>
				<span class="section-title">Mental & Emotional</span>
			</div>
			<div class="input-area">
				<div class="input-line"></div>
				<div class="input-line"></div>
			</div>
		</div>

		<div class="wellness-section">
			<div class="section-header">
				<span class="emoji">
					{#if !settings?.emojis?.disable}😴{/if}
				</span>
				<span class="section-title">Sleep & Rest</span>
			</div>
			<div class="input-area quality-tracker">
				<div class="row">
					<span class="label">Quality:</span>
					<div class="stars">
						<span class="star">★</span>
						<span class="star">★</span>
						<span class="star">★</span>
						<span class="star">★</span>
						<span class="star">★</span>
					</div>
				</div>
				<div class="row">
					<span class="label">Hours:</span>
					<div class="line hours-input"></div>
				</div>
			</div>
		</div>

		<div class="wellness-section">
			<div class="section-header">
				<span class="emoji">
					{#if !settings?.emojis?.disable}🙏{/if}
				</span>
				<span class="section-title">Gratitude & Reflections</span>
			</div>
			<div class="input-area large">
				<div class="input-line"></div>
				<div class="input-line"></div>
				<div class="input-line"></div>
			</div>
		</div>

		<div class="wellness-section">
			<div class="section-header">
				<span class="emoji">
					{#if !settings?.emojis?.disable}⚡{/if}
				</span>
				<span class="section-title">Energy Level</span>
			</div>
			<div class="energy-gauge">
				{#each [1, 2, 3, 4, 5] as level}
					<div class="gauge-block" data-level={level}></div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.wellness-journal {
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

	.wellness-content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		flex: 1;
	}

	.wellness-section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.75rem;
		border: 1px solid var(--outline);
		border-radius: 4px;
		background-color: rgba(128, 128, 128, 0.02);

		.section-header {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			font-weight: bold;
			font-size: 0.8rem;
			color: var(--text);
			letter-spacing: 0.5px;

			.emoji {
				font-size: 1rem;
			}

			.section-title {
				text-transform: uppercase;
			}
		}

		.input-area {
			display: flex;
			flex-direction: column;
			gap: 0.4rem;

			&.large {
				.input-line {
					height: 1.2rem;
				}
			}
		}

		.input-line {
			border-bottom: 1px solid var(--outline);
			height: 1rem;
		}

		.quality-tracker {
			gap: 0.6rem;

			.row {
				display: flex;
				align-items: flex-end;
				gap: 0.75rem;
				font-size: 0.75rem;

				.label {
					min-width: 3rem;
					font-weight: 600;
					color: var(--text);
					margin-bottom: 0;
				}

				.hours-input {
					flex: 1;
					border-bottom: 1px solid var(--outline);
				}

				.stars {
					display: flex;
					gap: 0.25rem;
					font-size: 0.9rem;
					letter-spacing: 0.1em;
					color: var(--outline-high);

					.star {
						width: 1rem;
						text-align: center;
					}
				}
			}
		}
	}

	.energy-gauge {
		display: flex;
		gap: 0.5rem;
		height: 1.5rem;

		.gauge-block {
			flex: 1;
			border: 1px solid var(--outline);
			background-color: rgba(128, 128, 128, 0.05);
			border-radius: 2px;

			&[data-level='1'] {
				background-color: rgba(239, 68, 68, 0.15);
			}

			&[data-level='2'] {
				background-color: rgba(249, 115, 22, 0.15);
			}

			&[data-level='3'] {
				background-color: rgba(234, 179, 8, 0.15);
			}

			&[data-level='4'] {
				background-color: rgba(34, 197, 94, 0.15);
			}

			&[data-level='5'] {
				background-color: rgba(34, 197, 94, 0.3);
			}
		}
	}
</style>
