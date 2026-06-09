<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<div class="planner page travel-planner">
	<div class="header-section">
		<div class="field title">
			<label>
				{#if showEmoji}
					<span class="emoji">✈️</span>
				{/if}
				<strong>TRAVEL ITINERARY</strong>
			</label>
			<div class="content"></div>
		</div>
		<div class="field dates">
			<label>
				<strong>DATES</strong>
			</label>
			<div class="content"></div>
		</div>
	</div>

	<div class="content-section">
		<div class="flight-info">
			<strong class="label">DEPARTURE / ARRIVAL</strong>
			<div class="line"></div>
			<div class="line"></div>
		</div>

		<div class="columns">
			<div class="column">
				<strong class="label">ITINERARY</strong>
				{#each Array(10) as _}
					<div class="time-row">
						<div class="time-box"></div>
						<div class="line"></div>
					</div>
				{/each}
			</div>
			<div class="column">
				<strong class="label">PACKING LIST</strong>
				{#each Array(10) as _}
					<div class="row-item">
						<div class="checkbox"></div>
						<div class="line"></div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.travel-planner {
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
		gap: 2rem;

		.title {
			flex: 3;
		}
		.dates {
			flex: 1;
		}
	}

	.label {
		font-size: 0.75rem;
		font-weight: bold;
		color: var(--text-low);
		margin-bottom: 0.25rem;
		letter-spacing: 0.5px;
		text-transform: uppercase;
	}

	.line {
		border-bottom: 1px solid var(--outline);
		height: 1.5rem;
		width: 100%;
	}

	.content-section {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		flex: 1;
	}

	.flight-info {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.columns {
		display: flex;
		gap: 2rem;
		flex: 1;

		.column {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}
	}

	.time-row {
		display: flex;
		align-items: flex-end;
		gap: 0.5rem;

		.time-box {
			width: 3rem;
			height: 1.5rem;
			border-bottom: 1px solid var(--outline);
			flex-shrink: 0;
		}
	}
</style>
