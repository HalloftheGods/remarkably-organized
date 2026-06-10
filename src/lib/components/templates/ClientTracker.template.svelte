<script lang="ts">
		import type { PlannerSettings } from '$lib';
	import { Checkbox } from '$atoms';
	import DateSlashes from '$molecules/DateSlashes.svelte';
	import Field from '$atoms/Field.atom.svelte';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	const nClientRows = $derived(new Array(settings?.isLandscape ? 7 : 10));
	const nActionItems = $derived(new Array(settings?.isLandscape ? 3 : 7));
	const nFollowUp = $derived(new Array(settings?.isLandscape ? 3 : 4));
</script>

<div class="planner page client-tracker">
	<div class="header-section hidden">
		<div class="field title-field">
			<Field i="👥">CLIENT RELATIONSHIP</Field>
		</div>
		<div class="field date-field">
			<DateSlashes />
		</div>
	</div>

	<div class="tracker-table">
		<div class="table-header">
			<div class="col col-name">
				{#if showEmoji}<span>👤&nbsp;</span>{/if}
				<span>CLIENT</span>
			</div>
			<div class="col col-contact">
				{#if showEmoji}<span>📞&nbsp;</span>{/if}
				<span>CONTACT</span>
			</div>
			<div class="col col-status">
				{#if showEmoji}<span>✅&nbsp;</span>{/if}
				<span>STATUS</span>
			</div>
			<div class="col col-next">
				{#if showEmoji}<span>🤝&nbsp;</span>{/if}
				<span>NEXT TOUCH</span>
			</div>
			<div class="col col-notes">
				{#if showEmoji}<span>📝&nbsp;</span>{/if}
				<span>NOTES</span>
			</div>
		</div>

		{#each nClientRows as _, i (i)}
			<div class="table-row">
				<div class="col col-name">
					<!-- <div class="input-line"></div> -->
				</div>
				<div class="col col-contact">
					<!-- <div class="input-line"></div> -->
				</div>
				<div class="col col-status">
					<Checkbox aria-label="Status" />
				</div>
				<div class="col col-next">
					<!-- <div class="input-line"></div> -->
				</div>
				<div class="col col-notes">
					<!-- <div class="input-line"></div> -->
				</div>
			</div>
		{/each}
	</div>

	<div class="action-items">
		<span class="action-title">
			{#if showEmoji}✅{/if} ACTION ITEMS
		</span>
		<div class="action-list">
			{#each nActionItems as _}
				<div class="action-item">
					<Checkbox aria-label="Action Item" />
					<div class="action-line"></div>
				</div>
			{/each}
		</div>
	</div>

	<div class="follow-up">
		<span class="follow-up-title">
			{#if showEmoji}🔔{/if} Follow-up Reminders
		</span>
		<div class="follow-up-lines">
			{#each nFollowUp as _}
				<div class="input-line"></div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.client-tracker {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		gap: 0.5rem;
	}

	.header-section {
		display: flex;
		gap: 2rem;
		width: 100%;
		// border-bottom: 1px solid var(--outline);
		// padding-bottom: 1rem;
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

	.col-name {
		flex: 1.25;
	}

	.col-contact,
	.col-next {
		flex: 1;
	}

	.col-status {
		flex: 0.65;
		justify-content: center;

		.checkbox {
			width: 1rem;
			height: 1rem;
			border: 1px solid var(--outline);
			border-radius: 3px;
			background-color: white;
		}
	}

	.col-notes {
		flex: 1.25;
	}

	.table-header {
		display: flex;
		background-color: var(--nav-bg-pdf, #f8f8f8);
		border-bottom: 2px solid var(--outline);
		font-weight: bold;
		font-size: 0.7rem;
		text-align: center;
		color: var(--text-sidebar, var(--text-low));
		letter-spacing: 0.5px;
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

		.input-line {
			width: 100%;
			border-bottom: 1px solid var(--outline);
			height: 100%;
		}
	}

	.action-items {
		border: 1px solid var(--outline);
		padding: 0.75rem;
		background-color: rgba(217, 119, 6, 0.05);
		border-radius: 4px;

		.action-title {
			font-weight: bold;
			font-size: 0.75rem;
			margin-bottom: 0.75rem;
			text-transform: uppercase;
			letter-spacing: 0.5px;
			color: var(--text-low);
		}

		.action-list {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			.action-item {
				display: flex;
				align-items: flex-end;
				gap: 0.75rem;

				.checkbox {
					width: 1rem;
					height: 1rem;
					border: 1px solid var(--outline);
					border-radius: 3px;
					flex-shrink: 0;
					background-color: white;
				}

				.action-line {
					flex: 1;
					border-bottom: 1px solid var(--outline);
					height: 1rem;
				}
			}
		}
	}

	.follow-up {
		border-top: 2px solid var(--outline);
		padding-top: 1rem;

		.follow-up-title {
			font-weight: bold;
			font-size: 0.75rem;
			margin-bottom: 0.75rem;
			text-transform: uppercase;
			letter-spacing: 0.5px;
			color: var(--text-low);
		}

		.follow-up-lines {
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
