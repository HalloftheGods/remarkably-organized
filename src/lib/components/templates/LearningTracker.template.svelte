<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Box, Text, Checkbox } from '$atoms';
	import { Field } from '$molecules';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	let rows = new Array(12);
</script>

<Box class="learning-tracker">
	<Box class="header-section">
		<Field label="LEARNING LOG" emoji="📚" {showEmoji} class="title-field" />
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

	<Box class="course-header">
		<Field label="COURSE / SUBJECT" class="course-name" />
	</Box>

	<Box class="tracker-table">
		<Box class="table-header">
			<Box class="col col-topic">
				{#if showEmoji}<Text tag="span">💡</Text>{/if}
				<Text tag="span">Topic</Text>
			</Box>
			<Box class="col col-progress"><Text>Done</Text></Box>
			<Box class="col col-key"><Text>Key Takeaway</Text></Box>
			<Box class="col col-time">
				{#if showEmoji}<Text tag="span">⏱️</Text>{/if}
				<Text tag="span">Time</Text>
			</Box>
		</Box>

		{#each rows as _, i (i)}
			<Box class="table-row">
				<Box class="col col-topic">
					<Box class="cell-placeholder"></Box>
				</Box>
				<Box class="col col-progress">
					<Checkbox aria-label="Done" />
				</Box>
				<Box class="col col-key">
					<Box class="cell-placeholder"></Box>
				</Box>
				<Box class="col col-time">
					<Box class="cell-placeholder"></Box>
				</Box>
			</Box>
		{/each}
	</Box>

	<Box class="reflection-section">
		<Text class="reflection-title">
			{#if showEmoji}✨{/if} Reflection & Next Steps
		</Text>
		<Box class="reflection-lines">
			<Box class="input-line"></Box>
			<Box class="input-line"></Box>
			<Box class="input-line"></Box>
		</Box>
	</Box>
</Box>

<style lang="scss">
	:global {
		.learning-tracker {
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

		.course-header {
			margin-bottom: 0.75rem;

			.course-name {
				display: flex;
				flex-direction: column;
				gap: 0.25rem;

				.label {
					font-size: 0.7rem;
					font-weight: bold;
					text-transform: uppercase;
					color: var(--text-low);
					letter-spacing: 0.5px;
				}

				.line {
					border-bottom: 1px solid var(--outline);
					height: 1rem;
				}
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
			}

			.col-topic {
				flex: 2;
				justify-content: flex-start;
			}

			.col-progress {
				flex: 0.8;
				justify-content: center;
			}

			.col-key {
				flex: 2;
			}

			.col-time {
				flex: 0.8;
				justify-content: center;
			}
		}

		.table-row {
			display: flex;
			border-bottom: 1px solid var(--outline);
			min-height: 2.5rem;

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
			}

			.col-topic {
				flex: 2;
			}

			.col-progress {
				flex: 0.8;
				justify-content: center;
			}

			.col-key {
				flex: 2;
			}

			.col-time {
				flex: 0.8;
			}

			.cell-placeholder {
				width: 100%;
				min-height: 1rem;
			}
		}

		.reflection-section {
			border-top: 2px solid var(--outline);
			padding-top: 1rem;
			margin-top: 0.75rem;

			.reflection-title {
				font-weight: bold;
				font-size: 0.75rem;
				margin-bottom: 0.75rem;
				text-transform: uppercase;
				letter-spacing: 0.5px;
				color: var(--text-low);
			}

			.reflection-lines {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;

				.input-line {
					border-bottom: 1px solid var(--outline);
					height: 1rem;
				}
			}
		}
	}
</style>
