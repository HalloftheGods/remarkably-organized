<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings } = $props();
	let rows = new Array(12);
</script>

<div class="learning-tracker">
	<div class="header-section">
		<div class="field title-field">
			<div class="label">
				{#if !settings?.emojis?.disable}📚{/if} LEARNING LOG
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

	<div class="course-header">
		<div class="course-name">
			<div class="label">COURSE / SUBJECT</div>
			<div class="line"></div>
		</div>
	</div>

	<div class="tracker-table">
		<div class="table-header">
			<div class="col col-topic">
				{#if !settings?.emojis?.disable}💡{/if} Topic
			</div>
			<div class="col col-progress">Done</div>
			<div class="col col-key">Key Takeaway</div>
			<div class="col col-time">
				{#if !settings?.emojis?.disable}⏱️{/if} Time
			</div>
		</div>

		{#each rows as _, i (i)}
			<div class="table-row">
				<div class="col col-topic">
					<div class="cell-placeholder"></div>
				</div>
				<div class="col col-progress">
					<div class="checkbox"></div>
				</div>
				<div class="col col-key">
					<div class="cell-placeholder"></div>
				</div>
				<div class="col col-time">
					<div class="cell-placeholder"></div>
				</div>
			</div>
		{/each}
	</div>

	<div class="reflection-section">
		<div class="reflection-title">
			{#if !settings?.emojis?.disable}✨{/if} Reflection & Next Steps
		</div>
		<div class="reflection-lines">
			<div class="input-line"></div>
			<div class="input-line"></div>
			<div class="input-line"></div>
		</div>
	</div>
</div>

<style lang="scss">
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

			.checkbox {
				width: 1rem;
				height: 1rem;
				border: 1px solid var(--outline);
				border-radius: 3px;
				background-color: transparent;
			}
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
</style>
