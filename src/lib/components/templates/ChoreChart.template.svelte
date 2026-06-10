<script lang="ts">
	import Label from '$atoms/Label.svelte';
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings } = $props();
	const nRows = settings?.design?.orientation === 'portrait' ? 19 : 13;
</script>

<div class="planner page chore-chart">
	<header>
		<div class="field title">
			<Label i="🧹">CHORE & MAINTENANCE CHART</Label>
			<div class="content"></div>
		</div>
	</header>
	<div class="header-section">
		<div class="field title">
			<div class="label">
				{#if !settings?.emojis?.disable}🧹{/if} CHORE & MAINTENANCE CHART
			</div>
			<div class="line"></div>
		</div>
		<!-- <div class="field date">
			<div class="label">
				{#if !settings?.emojis?.disable}🗓️{/if} MONTH
			</div>
			<div class="line"></div>
		</div> -->
	</div>

	<div class="content-section">
		<div class="table-header">
			<div class="col-task">
				{#if !settings?.emojis?.disable}🗑️{/if} CHORE
			</div>
			<div class="col-freq">
				{#if !settings?.emojis?.disable}📅{/if} FREQUENCY
			</div>
			<div class="col-done">
				{#if !settings?.emojis?.disable}✅{/if} DONE
				<br />
			</div>
		</div>
		{#each Array(nRows) as _}
			<div class="table-row">
				<div class="col-task"><div class="line"></div></div>
				<div class="col-freq"><div class="line"></div></div>
				<div class="col-done">
					<div class="box"></div>
					<div class="box"></div>
					<div class="box"></div>
					<div class="box"></div>
					<div class="box"></div>
					<div class="box"></div>
					<div class="box"></div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.chore-chart {
		.header-section {
			display: flex;
			gap: 2rem;

			.field {
				display: flex;
				flex-direction: column;
			}
			.title {
				flex: 3;
			}
			.date {
				flex: 1;
			}
		}

		.label {
			font-size: 0.75rem;
			font-weight: bold;
			color: var(--text-low);
			margin-bottom: 0.25rem;
			letter-spacing: 0.5px;
		}

		.line {
			border-bottom: 1px solid var(--outline);
			height: 1.5rem;
			width: 100%;
		}

		.content-section {
			display: flex;
			flex-direction: column;
			border: 1px solid var(--outline);
			border-radius: 4px;
		}

		.table-header {
			display: flex;
			background-color: var(--nav-bg-pdf, #f8f8f8);
			border-bottom: 2px solid var(--outline);
			padding: 0.5rem;
			font-weight: bold;
			font-size: 0.7rem;
			color: var(--text-low);
			text-align: center;
			letter-spacing: 0.5px;

			> div {
				padding: 0 0.5rem;
				align-items: center;
				display: flex;
				justify-content: center;
			}
		}

		.table-row {
			display: flex;
			border-bottom: 1px solid var(--outline);
			height: 2.5rem;
			align-items: center;

			&:last-child {
				border-bottom: none;
			}
			> div {
				padding: 0 0.5rem;
				height: 100%;
				display: flex;
				align-items: flex-end;
				padding-bottom: 0.5rem;
			}
		}

		.col-task {
			flex: 3;
		}
		.col-freq {
			flex: 1.5;
		}
		.col-done {
			flex: 1;
			display: flex;
			gap: 0.5rem;
			align-items: center;

			.box {
				width: 1rem;
				height: 1rem;
				border: 1px solid var(--outline-high);
				border-radius: 2px;
			}
		}
	}
</style>
