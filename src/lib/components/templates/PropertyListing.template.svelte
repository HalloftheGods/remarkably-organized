<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<div class="property-listing">
	<div class="header-section">
		<div class="field title">
			<div class="label">
				{#if showEmoji}🏠{/if} PROPERTY LISTING SHEET
			</div>
			<div class="line"></div>
		</div>
		<div class="field status">
			<div class="label">STATUS / DATE</div>
			<div class="line"></div>
		</div>
	</div>

	<div class="meta-section">
		<div class="meta-row">
			<div class="field address">
				<div class="label">PROPERTY ADDRESS</div>
				<div class="line"></div>
			</div>
			<div class="field price">
				<div class="label">LIST PRICE</div>
				<div class="line"></div>
			</div>
		</div>
		<div class="meta-row second-row">
			<div class="field specs">
				<div class="label">BED / BATH / SQFT</div>
				<div class="line"></div>
			</div>
			<div class="field school">
				<div class="label">NEIGHBORHOOD / DISTRICT</div>
				<div class="line"></div>
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
						<div class="line"></div>
					</div>
				{/each}
			</div>

			<div class="column costs">
				<div class="section-label">UTILITIES & EXTRA COSTS</div>
				{#each Array(5) as _}
					<div class="bullet-row">
						<div class="bullet"></div>
						<div class="line"></div>
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
						<div class="line"></div>
					</div>
				{/each}
			</div>
			<div class="column analysis">
				<div class="section-label">CONS / DISADVANTAGES</div>
				{#each Array(4) as _}
					<div class="bullet-row">
						<span class="minus">-</span>
						<div class="line"></div>
					</div>
				{/each}
			</div>
		</div>

		<div class="feedback-section">
			<div class="section-label">CLIENT FEEDBACK / REACTION</div>
			{#each Array(3) as _}
				<div class="line"></div>
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

		.field {
			display: flex;
			flex-direction: column;
		}
		.title {
			flex: 3;
		}
		.status {
			flex: 1;
		}
	}

	.meta-section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.meta-row {
		display: flex;
		gap: 2rem;

		.field {
			display: flex;
			flex-direction: column;
		}
		.address {
			flex: 3;
		}
		.price {
			flex: 1;
		}
		.specs {
			flex: 1;
		}
		.school {
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

	.section-label {
		font-size: 0.8rem;
		font-weight: bold;
		color: var(--text-low);
		border-bottom: 2px solid var(--outline);
		padding-bottom: 0.25rem;
		margin-bottom: 0.5rem;
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
