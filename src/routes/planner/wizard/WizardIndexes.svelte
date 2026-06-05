<script lang="ts">
	import { fade } from 'svelte/transition';
	import { stripEmojis } from '$lib/helpers/string.helper';
	import TemplateThumbnail from '$lib/components/TemplateThumbnail.svelte';
	import type { PlannerSettings } from '$lib/state/planner-settings.svelte';

	let { settings } = $props<{ settings: PlannerSettings }>();
</script>

<div
	class="step-content indexes-step"
	style="position: relative;"
	in:fade={{ duration: 150 }}>
	<div class="step-title-row">
		<h3 class="welcome-headline-gradient">
			Indexes
			<small style="margin-left: 1rem;">
				Configure index pages for your collections.
			</small>
		</h3>
	</div>
	<div class="collections-config">
		{#if settings.collections.length > 0}
			<div class="collections-grid-previews">
				{#each settings.collections as collection, index}
					{@const totalPages =
						(collection.numIndexPages || 0) +
						(collection.total || 0) *
							Math.max(1, collection.numIndexPages || 1) *
							(collection.numPagesPerItem || 1)}
					<div class="collection-col relative">
						<div
							class="collection-header-row"
							style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
							<label style="flex: 1; display: flex; align-items: center; gap: 0.5rem;">
								<input
									type="checkbox"
									checked={(collection.numIndexPages || 0) > 0}
									onchange={(e) => {
										if (
											e.currentTarget.checked &&
											(collection.numIndexPages || 0) === 0
										) {
											collection.numIndexPages = 1;
										} else if (!e.currentTarget.checked) {
											collection.numIndexPages = 0;
										}
									}} />
								<span class="truncate" style="font-weight: 500;">
									{settings.emojis.disable
										? stripEmojis(collection.name)
										: collection.name}
								</span>
							</label>
						</div>
						<div style="padding: 0 0.5rem 0.5rem 0.5rem;">
							<label
								style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem;">
								Index Page Count
								<input
									type="number"
									placeholder="0"
									min="0"
									step="1"
									bind:value={collection.numIndexPages}
									style="width: 3rem; padding: 0.25rem;" />
							</label>
							<label
								style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem;">
								Entries per Page
								<input
									type="number"
									min="1"
									max="180"
									step="1"
									bind:value={collection.total}
									style="width: 3rem; padding: 0.25rem;" />
							</label>
						</div>
						<TemplateThumbnail
							templateValue="collection-index"
							templateName={`${totalPages.toLocaleString()} ${
								settings.emojis.disable ? stripEmojis(collection.name) : collection.name
							} ${totalPages === 1 ? 'Page' : 'Pages'}`}
							{settings}
							timeframe={{ collection }}
							isInteractive={false} />
					</div>
				{/each}
			</div>
		{:else}
			<p class="empty-state">
				No collections configured yet. Add collections in the previous step.
			</p>
		{/if}
	</div>
</div>

<style lang="scss">
	.welcome-headline-gradient {
		background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #a78bfa 100%);
		background-size: 200% auto;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: gradient-shift 4s ease-in-out infinite;
	}
	@keyframes gradient-shift {
		0%,
		100% {
			background-position: 0% center;
		}
		50% {
			background-position: 100% center;
		}
	}
	.step-title-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;

		h3 {
			margin: 0;
			small {
				font-size: 0.8rem;
				font-weight: normal;
				color: var(--text-low);
			}
		}
	}

	.collections-config {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;

		.collections-grid-previews {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 8px;
			margin-top: 0.5rem;
			max-height: 55vh;
			overflow-y: auto;
			padding-right: 4px;

			@media (max-width: 768px) {
				grid-template-columns: repeat(2, 1fr);
			}

			.collection-col {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;

				label {
					font-size: 0.8rem;
					font-weight: 600;
					color: var(--text);
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 0.25rem;

					.truncate {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						flex: 1;
					}
				}
			}
		}

		.empty-state {
			text-align: center;
			color: var(--text-low);
			font-style: italic;
			font-size: 0.9rem;
			margin: 1rem 0;
		}
	}
</style>
