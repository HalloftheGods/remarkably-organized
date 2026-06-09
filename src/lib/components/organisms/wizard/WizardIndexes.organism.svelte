<script lang="ts">
	import { Box, Text, Input, Button } from '$atoms';
	import { fade, scale } from 'svelte/transition';
	import { stripEmojis } from '$lib/helpers/string.helper';
	import { TemplateThumbnail } from '$molecules';
	import type { PlannerSettings } from '$state';
	import Toggle from '$atoms/Toggle.atom.svelte';

	let { settings } = $props<{ settings: PlannerSettings }>();
	let confirmDeleteId = $state<string | null>(null);

	function deleteCollection(id: string) {
		settings.collections = settings.collections.filter((c) => c.id !== id);
		confirmDeleteId = null;
	}
</script>

<Box
	class="step-content indexes-step"
	style="position: relative;"
	transition="fade"
	inDuration={150}>
	<Box class="step-title-row">
		<Text tag="h3" class="welcome-headline-gradient">
			Collection Indexes
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
								style="flex: 1; display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
								<Toggle
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
							<Button
								class="delete-btn-small"
								onclick={() => (confirmDeleteId = collection.id)}
								aria-label="Delete Collection"
								title="Delete Collection">
								✕
							</Button>
						</Box>
						<Box class="thumbnail-wrapper relative">
							<TemplateThumbnail
								templateValue="collection-index"
								templateName={`${totalPages.toLocaleString()} ${
									settings.emojis.disable ? stripEmojis(collection.name) : collection.name
								} ${totalPages === 1 ? 'Page' : 'Pages'}`}
								{settings}
								timeframe={{ collection }}
								isInteractive={true}
								scaleOnHover={false} />
						</Box>
						<Box
							style="display: flex; flex-direction: column; gap: 0.15rem; margin-top: 0.5rem;">
							<Text
								tag="label"
								style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; font-size: 0.85rem;">
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
								style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; font-size: 0.85rem;">
								List Items per index
								<Input
									type="number"
									min="1"
									max="180"
									step="1"
									bind:value={collection.total}
									style="width: 3rem; padding: 0.25rem;" />
							</Text>
							<Text
								tag="label"
								style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; font-size: 0.85rem;">
								Pages per list item
								<Input
									type="number"
									min="1"
									step="1"
									bind:value={collection.numPagesPerItem}
									style="width: 3rem; padding: 0.25rem;" />
							</Text>
						</Box>
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
			gap: 1.5rem;
			margin-top: 0.5rem;
			padding-right: 4px;

			@media (max-width: 1024px) {
				grid-template-columns: repeat(3, 1fr);
			}

			@media (max-width: 768px) {
				grid-template-columns: repeat(2, 1fr);
				gap: 0.6rem;
			}

			@media (max-width: 480px) {
				grid-template-columns: 1fr;
			}

			:global(.collection-col) {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
				position: relative;

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

				:global(.collection-header-row) {
					:global(.delete-btn-small) {
						background: none;
						border: none;
						color: var(--text-low);
						cursor: pointer;
						padding: 4px;
						font-size: 0.85rem;
						display: flex;
						align-items: center;
						justify-content: center;
						transition: all 0.2s;
						border-radius: 50%;

						&:hover {
							color: var(--danger, #ef4444);
							background-color: rgba(239, 68, 68, 0.1);
						}
					}
				}

				:global(.thumbnail-wrapper) {
					position: relative;
					overflow: hidden;
					border-radius: var(--radius-2);
					transition: all 0.4s var(--ease-out-back);
					z-index: 1;

					&:hover {
						transform: scale(1.75) translateY(-5px);
						z-index: 100;
						box-shadow: var(--shadow-5);
					}

					:global(.delete-confirm-overlay) {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background: rgba(0, 0, 0, 0.6);
						backdrop-filter: blur(4px);
						display: flex;
						align-items: center;
						justify-content: center;
						z-index: 10;

						:global(.confirm-card) {
							background: var(--bg);
							padding: 0.75rem;
							border-radius: var(--radius-3);
							box-shadow: var(--shadow-6);
							display: flex;
							flex-direction: column;
							align-items: center;
							gap: 0.5rem;
							border: 1px solid var(--outline);

							span {
								font-size: 0.8rem;
								font-weight: 600;
								color: var(--text);
							}

							:global(.confirm-actions) {
								display: flex;
								gap: 0.5rem;

								button {
									padding: 0.25rem 0.75rem;
									font-size: 0.75rem;
									font-weight: 600;
									border-radius: var(--radius-2);
									cursor: pointer;
									transition: all 0.2s;

									&:global(.no) {
										background: var(--bg-high);
										border: 1px solid var(--outline);
										color: var(--text);
										&:hover {
											background: var(--bg-higher);
										}
									}

									&:global(.yes) {
										background: var(--danger, #ef4444);
										border: 1px solid var(--danger, #ef4444);
										color: white;
										&:hover {
											filter: brightness(1.1);
										}
									}
								}
							}
						}
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
