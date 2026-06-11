<script lang="ts">
	import PlannerLine from '$molecules/PlannerLine.svelte';
	import type { PlannerSettings } from '$lib';

	import { Field } from '$atoms';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
</script>

<div class="planner page padded property-listing">
	<header>
		<div class="field flex-[3]">
			<Field i="🏠">PROPERTY LISTING SHEET</Field>
		</div>
		<div class="field flex-[1]">
			<Field>STATUS / DATE</Field>
		</div>
	</header>

	<div class="meta-section">
		<div class="meta-row">
			<div class="field flex-[3]">
				<Field>PROPERTY ADDRESS</Field>
			</div>
			<div class="field flex-[1]">
				<Field>LIST PRICE</Field>
			</div>
		</div>
		<div class="meta-row second-row">
			<div class="field flex-[1]">
				<Field>BED / BATH / SQFT</Field>
			</div>
			<div class="field flex-[1]">
				<Field>NEIGHBORHOOD / DISTRICT</Field>
			</div>
		</div>
	</div>

	<div class="content-section">
		<div class="top-row">
			<div class="column details">
				<div class="section-label">KEY FEATURES & AMENITIES</div>
				{#each Array(5) as _}
					<div class="bullet-row">
						<div class="bullet"></div>
						<PlannerLine />
					</div>
				{/each}
			</div>

			<div class="column costs">
				<div class="section-label">UTILITIES & EXTRA COSTS</div>
				{#each Array(5) as _}
					<div class="bullet-row">
						<div class="bullet"></div>
						<PlannerLine />
					</div>
				{/each}
			</div>
		</div>

		<div class="bottom-section">
			<div class="column analysis">
				<div class="section-label">PROS / ADVANTAGES</div>
				{#each Array(4) as _}
					<div class="bullet-row">
						<span class="plus">+</span>
						<PlannerLine />
					</div>
				{/each}
			</div>
			<div class="column analysis">
				<div class="section-label">CONS / DISADVANTAGES</div>
				{#each Array(4) as _}
					<div class="bullet-row">
						<span class="minus">-</span>
						<PlannerLine />
					</div>
				{/each}
			</div>
		</div>

		<div class="feedback-section">
			<div class="section-label">CLIENT FEEDBACK / REACTION</div>
			{#each Array(3) as _}
				<PlannerLine />
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.property-listing {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 1.5rem;
		box-sizing: border-box;
		gap: 1rem;
	}

	.header-section {
		display: flex;
		gap: 2rem;
	}

	.meta-section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.meta-row {
		display: flex;
		gap: 2rem;
	}

	.section-label {
		font-size: 0.8rem;
		font-weight: bold;
		color: var(--text-low);
		border-bottom: 2px solid var(--outline);
		padding-bottom: 0.25rem;
		margin-bottom: 0.5rem;
		letter-spacing: 0.5px;
	}

	.content-section {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		flex: 1;
	}

	.top-row,
	.bottom-section {
		display: flex;
		gap: 2rem;
	}

	.column {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.bullet-row {
		display: flex;
		align-items: flex-end;
		gap: 0.5rem;
	}

	.bullet {
		width: 0.5rem;
		height: 0.5rem;
		border: 1px solid var(--outline);
		border-radius: 50%;
		flex-shrink: 0;
		margin-bottom: 0.25rem;
	}

	.plus,
	.minus {
		font-size: 1rem;
		font-weight: bold;
		color: var(--text-low);
		width: 0.75rem;
		text-align: center;
		padding-bottom: 0.1rem;
	}

	.feedback-section {
		display: flex;
		flex-direction: column;
		margin-top: auto;
	}
</style>
