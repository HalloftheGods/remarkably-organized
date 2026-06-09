<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Checkbox } from '$atoms';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<div class="planner page pet-care">
	<div class="header-section">
		<div class="field title">
			<label>
				{#if showEmoji}
					<span class="emoji">🐾</span>
				{/if}
				<strong>PET CARE LOG</strong>
			</label>
			<div class="content"></div>
		</div>
		<div class="field date">
			<label>
				<strong>DATE / WEEK</strong>
			</label>
			<div class="content"></div>
		</div>
	</div>

	<div class="content-section">
		<div class="columns">
			<div class="column">
				<span class="label">FEEDING SCHEDULE</span>
				{#each Array(7) as _}
					<div class="check-row">
						<Checkbox aria-label="Feeding schedule check" />
						<div class="line"></div>
					</div>
				{/each}
			</div>
			<div class="column">
				<span class="label">WALKS / EXERCISE</span>
				{#each Array(7) as _}
					<div class="check-row">
						<Checkbox aria-label="Walks/Exercise check" />
						<div class="line"></div>
					</div>
				{/each}
			</div>
		</div>

		<div class="bottom-section">
			<span class="label">VET NOTES & MEDICATION</span>
			<div class="lines">
				{#each Array(6) as _}
					<div class="line"></div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.pet-care {
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
		gap: 2rem;
		flex: 1;
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

	.check-row {
		display: flex;
		align-items: flex-end;
		gap: 0.5rem;
	}

	.bottom-section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		.lines {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
