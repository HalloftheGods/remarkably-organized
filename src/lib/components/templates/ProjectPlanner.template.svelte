<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings } = $props();
	let actionRows = new Array(16);
	let milestoneRows = new Array(6);
	let resourceRows = new Array(6);
</script>

<div class="project-planner">
	<div class="header-section">
		<div class="top-row">
			<div class="field name-field">
				<div class="label">
					{#if !settings?.emojis?.disable}📁{/if} PROJECT NAME
				</div>
				<div class="line"></div>
			</div>
			<div class="field client-field">
				<div class="label">
					{#if !settings?.emojis?.disable}🤝{/if} CLIENT / MANAGER
				</div>
				<div class="line"></div>
			</div>
			<div class="field date-field">
				<div class="label">
					{#if !settings?.emojis?.disable}📅{/if} DEADLINE
				</div>
				<div class="line date-slashes">
					<span>/</span>
					<span>/</span>
				</div>
			</div>
		</div>
		<div class="bottom-row">
			<div class="field goal-field">
				<div class="label">
					{#if !settings?.emojis?.disable}🎯{/if} OBJECTIVES & DELIVERABLES
				</div>
				<div class="line"></div>
				<div class="line"></div>
			</div>
		</div>
	</div>

	<div class="content-body">
		<div class="left-col">
			<div class="section-title">
				{#if !settings?.emojis?.disable}📝{/if} ACTION ITEMS
			</div>
			<div class="action-list">
				{#each actionRows as _, i (i)}
					<div class="row">
						<div class="checkbox"></div>
						<div class="line"></div>
					</div>
				{/each}
			</div>
		</div>
		<div class="right-col">
			<div class="section-title">
				{#if !settings?.emojis?.disable}🚩{/if} MILESTONES & TIMELINE
			</div>
			<div class="milestone-list">
				{#each milestoneRows as _, i (i)}
					<div class="row">
						<div class="date-box"></div>
						<div class="line"></div>
					</div>
				{/each}
			</div>

			<div class="section-title resource-title">
				{#if !settings?.emojis?.disable}💰{/if} RESOURCES / BUDGET
			</div>
			<div class="resource-list">
				{#each resourceRows as _, i (i)}
					<div class="row">
						<div class="item-line"></div>
						<div class="cost-line"></div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.project-planner {
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
		gap: 1rem;
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

		.top-row {
			display: flex;
			gap: 1.5rem;

			.name-field {
				flex: 2;
			}
			.client-field {
				flex: 1.5;
			}
			.date-field {
				flex: 1;
			}
		}

		.bottom-row {
			display: flex;
			.goal-field {
				flex: 1;
			}
		}
	}

	.content-body {
		display: flex;
		gap: 2rem;
		flex: 1;

		.section-title {
			font-size: 0.75rem;
			font-weight: bold;
			color: var(--text-low);
			margin-bottom: 0.5rem;
			letter-spacing: 0.5px;
			border-bottom: 2px solid var(--outline);
			padding-bottom: 0.25rem;
		}

		.left-col {
			flex: 1.2;
			display: flex;
			flex-direction: column;

			.action-list {
				display: flex;
				flex-direction: column;
				flex: 1;

				.row {
					display: flex;
					align-items: flex-end;
					flex: 1;
					gap: 0.5rem;
					padding-bottom: 0.25rem;

					.checkbox {
						width: 1rem;
						height: 1rem;
						border: 2px solid var(--outline-high);
						border-radius: 2px;
					}

					.line {
						flex: 1;
						border-bottom: 1px solid var(--outline);
						height: 100%;
					}
				}
			}
		}

		.right-col {
			flex: 1;
			display: flex;
			flex-direction: column;

			.resource-title {
				margin-top: 1.5rem;
			}

			.milestone-list {
				display: flex;
				flex-direction: column;
				flex: 1;

				.row {
					display: flex;
					align-items: flex-end;
					flex: 1;
					gap: 0.5rem;
					padding-bottom: 0.25rem;

					.date-box {
						width: 3rem;
						height: 1.25rem;
						border-bottom: 1px dashed var(--outline-high);
					}

					.line {
						flex: 1;
						border-bottom: 1px solid var(--outline);
						height: 100%;
					}
				}
			}

			.resource-list {
				display: flex;
				flex-direction: column;
				flex: 1;

				.row {
					display: flex;
					align-items: flex-end;
					flex: 1;
					gap: 1rem;
					padding-bottom: 0.25rem;

					.item-line {
						flex: 2;
						border-bottom: 1px solid var(--outline);
						height: 100%;
					}

					.cost-line {
						flex: 1;
						border-bottom: 1px dashed var(--outline);
						height: 100%;
					}
				}
			}
		}
	}
</style>
