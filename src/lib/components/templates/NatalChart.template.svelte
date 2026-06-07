<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Box, Text } from '$atoms';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<Box class="natal-chart-container">
	<Box class="header-section">
		<Box class="title-block">
			<Text class="label">
				{#if showEmoji}✨{/if} NATAL CHART & TRANSITS
			</Text>
		</Box>
		<Box class="date-line">
			<Text class="date-label">Name/Event:</Text>
			<Box class="line"></Box>
		</Box>
		<Box class="date-line">
			<Text class="date-label">Date/Time:</Text>
			<Box class="line" style="flex: 0.6"></Box>
			<Text class="date-label">Loc:</Text>
			<Box class="line"></Box>
		</Box>
	</Box>

	<Box class="chart-main">
		<Box class="wheel-section">
			<Box class="wheel-outline">
				<Box class="wheel-inner"></Box>
				<!-- SVG for the 12 houses -->
				<svg viewBox="0 0 100 100" class="wheel-svg">
					<circle
						cx="50"
						cy="50"
						r="48"
						fill="none"
						stroke="currentColor"
						stroke-width="0.5" />
					<circle
						cx="50"
						cy="50"
						r="32"
						fill="none"
						stroke="currentColor"
						stroke-width="0.5" />
					<circle
						cx="50"
						cy="50"
						r="16"
						fill="none"
						stroke="currentColor"
						stroke-width="0.5" />
					{#each Array(12) as _, i}
						<line
							x1="50"
							y1="50"
							x2={50 + 48 * Math.cos((i * 30 * Math.PI) / 180)}
							y2={50 + 48 * Math.sin((i * 30 * Math.PI) / 180)}
							stroke="currentColor"
							stroke-width="0.5" />
					{/each}
				</svg>
			</Box>
		</Box>

		<Box class="data-section">
			<Box class="table-container">
				<Box class="table-header">
					<Text class="col">Planet</Text>
					<Text class="col">Sign</Text>
					<Text class="col">Degree</Text>
					<Text class="col">House</Text>
				</Box>
				{#each Array(10) as _}
					<Box class="table-row">
						<Box class="col"><Box class="line"></Box></Box>
						<Box class="col"><Box class="line"></Box></Box>
						<Box class="col"><Box class="line"></Box></Box>
						<Box class="col"><Box class="line"></Box></Box>
					</Box>
				{/each}
			</Box>

			<Box class="aspects-container">
				<Text class="label">Major Aspects</Text>
				{#each Array(6) as _}
					<Box class="aspect-row">
						<Box class="dot"></Box>
						<Box class="line"></Box>
					</Box>
				{/each}
			</Box>
		</Box>
	</Box>

	<Box class="notes-section">
		<Text class="label">Interpretation Notes</Text>
		<Box class="lined-area">
			{#each Array(6) as _}
				<Box class="line-row"></Box>
			{/each}
		</Box>
	</Box>
</Box>

<style lang="scss">
	:global {
		.natal-chart-container {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
			padding: 1.5rem;
			box-sizing: border-box;
			gap: 1.5rem;
		}

		.header-section {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
			border-bottom: 2px solid var(--outline);
			padding-bottom: 0.75rem;

			.title-block {
				.label {
					font-size: 1.25rem;
					font-weight: bold;
					color: var(--text);
					letter-spacing: 2px;
					text-transform: uppercase;
				}
			}

			.date-line {
				display: flex;
				align-items: flex-end;
				width: 100%;
				gap: 0.5rem;

				.date-label {
					font-size: 0.85rem;
					color: var(--text-low);
					font-weight: bold;
				}

				.line {
					flex: 1;
					border-bottom: 1px solid var(--outline);
					height: 1rem;
				}
			}
		}

		.chart-main {
			display: flex;
			gap: 2rem;
			flex: 1;
			min-height: 40%;
		}

		.wheel-section {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;

			.wheel-outline {
				width: 100%;
				max-width: 350px;
				aspect-ratio: 1;
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				color: var(--outline-high, #999);

				.wheel-svg {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
				}
			}
		}

		.data-section {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 1.5rem;

			.table-container {
				display: flex;
				flex-direction: column;
				border: 1px solid var(--outline);
				border-radius: 4px;

				.table-header {
					display: flex;
					background-color: var(--nav-bg-pdf, rgba(0, 0, 0, 0.02));
					border-bottom: 1px solid var(--outline);

					.col {
						flex: 1;
						padding: 0.5rem;
						font-size: 0.75rem;
						font-weight: bold;
						color: var(--text-low);
						text-align: center;
						border-right: 1px solid var(--outline);
						&:last-child {
							border-right: none;
						}
					}
				}

				.table-row {
					display: flex;
					border-bottom: 1px solid var(--outline);
					&:last-child {
						border-bottom: none;
					}

					.col {
						flex: 1;
						padding: 0.5rem;
						border-right: 1px solid var(--outline);
						display: flex;
						align-items: flex-end;
						&:last-child {
							border-right: none;
						}

						.line {
							width: 100%;
							border-bottom: 1px dotted var(--outline);
							height: 1rem;
						}
					}
				}
			}

			.aspects-container {
				display: flex;
				flex-direction: column;
				gap: 0.75rem;

				.label {
					font-size: 0.85rem;
					font-weight: bold;
					color: var(--text-low);
					text-transform: uppercase;
				}

				.aspect-row {
					display: flex;
					align-items: flex-end;
					gap: 0.5rem;

					.dot {
						width: 8px;
						height: 8px;
						border: 1px solid var(--outline);
						border-radius: 50%;
						margin-bottom: 0.2rem;
					}

					.line {
						flex: 1;
						border-bottom: 1px solid var(--outline);
						height: 1rem;
					}
				}
			}
		}

		.notes-section {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			.label {
				font-size: 0.85rem;
				font-weight: bold;
				color: var(--text-low);
				text-transform: uppercase;
				letter-spacing: 1px;
			}

			.lined-area {
				display: flex;
				flex-direction: column;
				gap: 1.5rem;
				margin-top: 0.5rem;

				.line-row {
					width: 100%;
					border-bottom: 1px solid var(--outline);
				}
			}
		}
	}
</style>
