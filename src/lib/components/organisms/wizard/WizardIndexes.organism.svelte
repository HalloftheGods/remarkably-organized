<script lang="ts">
	import { Box, Text, Input, Button } from '$atoms';
	import { fade } from 'svelte/transition';
	import { stripEmojis } from '$lib/helpers/string.helper';
	import { TemplateThumbnail } from '$molecules';
	import type { PlannerSettings } from '$state';

	let { settings } = $props<{ settings: PlannerSettings }>();
</script>

<Box
	class="step-content indexes-step"
	style="position: relative;"
	transition="fade"
	inDuration={150}>
	<Box class="step-title-row">
		<Text tag="h3" class="welcome-headline-gradient">
			Indexes
			<small style="margin-left: 1rem;">
				Configure index pages for your collections.
			</small>
		</Text>
	</Box>
	<Box class="collections-config">
		{#if settings.collections.length > 0}
			<Box class="collections-grid-previews">
				{#each settings.collections as collection, index}
					{@const totalPages =
						(collection.numIndexPages || 0) +
						(collection.total || 0) *
							Math.max(1, collection.numIndexPages || 1) *
							(collection.numPagesPerItem || 1)}
					<Box class="collection-col relative">
						<Box
							class="collection-header-row"
							style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
							<Text
								tag="label"
								style="flex: 1; display: flex; align-items: center; gap: 0.5rem;">
								<Input
									type="checkbox"
									checked={(collection.numIndexPages || 0) > 0}
									onchange={(e: any) => {
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
							</Text>
						</Box>
						<Box style="padding: 0 0.5rem 0.5rem 0.5rem;">
							<Text
								tag="label"
								style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem;">
								Index pages
								<Input
									type="number"
									placeholder="0"
									min="0"
									step="1"
									bind:value={collection.numIndexPages}
									style="width: 3rem; padding: 0.25rem;" />
							</Text>
							<Text
								tag="label"
								style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem;">
								Pages per item
								<Input
									type="number"
									min="1"
									max="180"
									step="1"
									bind:value={collection.total}
									style="width: 3rem; padding: 0.25rem;" />
							</Text>
						</Box>
						<TemplateThumbnail
							templateValue="collection-index"
							templateName={`${totalPages.toLocaleString()} ${
								settings.emojis.disable ? stripEmojis(collection.name) : collection.name
							} ${totalPages === 1 ? 'Page' : 'Pages'}`}
							{settings}
							timeframe={{ collection }}
							isInteractive={true}
							scaleOnHover={true} />
					</Box>
				{/each}
			</Box>
		{:else}
			<Text tag="p" class="empty-state">
				No collections configured yet. Add collections in the previous step.
			</Text>
		{/if}
	</Box>
</Box>

<style lang="scss">
	:global(.welcome-headline-gradient) {
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
	:global(.step-title-row) {
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

	:global(.collections-config) {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;

		:global(.collections-grid-previews) {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 8px;
			margin-top: 0.5rem;
			padding-right: 4px;

			@media (max-width: 768px) {
				grid-template-columns: repeat(3, 1fr);
				gap: 0.6rem;
			}

			:global(.collection-col) {
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

					:global(.truncate) {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						flex: 1;
					}
				}
			}
		}

		:global(.empty-state) {
			text-align: center;
			color: var(--text-low);
			font-style: italic;
			font-size: 0.9rem;
			margin: 1rem 0;
		}
	}
</style>
