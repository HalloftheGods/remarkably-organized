<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { PAGE_TEMPLATES } from '$lib/data/templates';
	import { TemplateThumbnail } from '$molecules';
	import type { Collection, PlannerSettings } from '$lib';

	let {
		settings,
		openTemplatePicker = ((
			_allowed: any[],
			_onSelect: Function,
			_curr: string,
		) => {}) as Function,
		getAvailablePageTemplates = ((_loc: string) => PAGE_TEMPLATES) as Function,
	} = $props<{
		settings: PlannerSettings;
		openTemplatePicker: Function;
		getAvailablePageTemplates: Function;
	}>();

	let confirmDeleteId = $state<string | null>(null);
	let showAddCollectionInput = $state(false);
	let newCollectionPromptName = $state('');

	function deleteCollection(id: string) {
		settings.collections = settings.collections.filter((c: Collection) => c.id !== id);
		confirmDeleteId = null;
	}

	function confirmAddCollection() {
		if (!newCollectionPromptName.trim()) return;
		settings.collections = [
			...settings.collections,
			{
				id: `custom-${Date.now()}`,
				name: newCollectionPromptName.trim(),
				total: 100,
				type: 'lined',
				numIndexPages: 1,
				columns: 1,
				numPagesPerItem: 1,
			},
		];
		newCollectionPromptName = '';
		showAddCollectionInput = false;
	}
</script>

<div
	class="step-content collections-step"
	style="position: relative;"
	in:fade={{ duration: 150 }}>
	<div class="step-title-row">
		<h3 class="welcome-headline-gradient">
			Custom Collections
			<small style="margin-left: 1rem;">
				Extend your planner with modular notebooks and custom sections.
			</small>
		</h3>
		<button class="add-collection-btn" onclick={() => (showAddCollectionInput = true)}>
			+ Add Collection
		</button>
	</div>

	{#if showAddCollectionInput}
		<div class="custom-prompt-overlay" transition:fade={{ duration: 150 }}>
			<div class="custom-prompt-card" transition:scale={{ duration: 150 }}>
				<h4>New Collection</h4>
				<input
					type="text"
					placeholder="Collection name..."
					bind:value={newCollectionPromptName}
					onkeydown={(e) => e.key === 'Enter' && confirmAddCollection()} />
				<div class="prompt-actions">
					<button
						class="cancel-btn"
						onclick={() => {
							showAddCollectionInput = false;
							newCollectionPromptName = '';
						}}>
						Cancel
					</button>
					<button
						class="confirm-btn"
						onclick={confirmAddCollection}
						disabled={!newCollectionPromptName.trim()}>
						Add
					</button>
				</div>
			</div>
		</div>
	{/if}

	<div class="collections-config">
		{#if settings.collections.length > 0}
			<div class="collections-grid-previews">
				{#each settings.collections as collection}
					<div class="collection-col relative">
						<div class="collection-header">
							<input
								type="text"
								class="title-editor"
								bind:value={collection.name}
								placeholder="Collection name..."
								title="Edit collection name" />
							<button
								class="delete-btn-small"
								onclick={() => (confirmDeleteId = collection.id)}
								aria-label="Delete Collection"
								title="Delete Collection">
								✕
							</button>
						</div>

						<div class="thumbnail-wrapper relative">
							<TemplateThumbnail
								templateValue={collection.type}
								templateName={PAGE_TEMPLATES.find((t) => t.value === collection.type)
									?.name || 'Select Template'}
								{settings}
								timeframe={{}}
								scaleOnHover={false}
								onclick={() =>
									openTemplatePicker(
										getAvailablePageTemplates('collection'),
										(val: any) => (collection.type = val),
										collection.type,
									)} />

							{#if confirmDeleteId === collection.id}
								<div class="delete-confirm-overlay" transition:fade={{ duration: 100 }}>
									<div class="confirm-card" transition:scale={{ duration: 100 }}>
										<span>Remove?</span>
										<div class="confirm-actions">
											<button class="no" onclick={() => (confirmDeleteId = null)}>
												No
											</button>
											<button class="yes" onclick={() => deleteCollection(collection.id)}>
												Yes
											</button>
										</div>
									</div>
								</div>
							{/if}
						</div>

						<div class="thumb-caption">
							<label
								style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem;">
								Pages per Index Link
								<input
									type="number"
									min="1"
									step="1"
									bind:value={collection.numPagesPerItem}
									style="width: 3rem; padding: 0.25rem;" />
							</label>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<p class="empty-state">No custom collections yet.</p>
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

		.add-collection-btn {
			background-color: var(--action);
			color: var(--action-text);
			border: 1px solid var(--action);
			padding: 0.5rem 1rem;
			border-radius: var(--radius-2);
			font-weight: 600;
			font-size: 0.85rem;
			cursor: pointer;
			transition: all 0.2s ease;

			&:hover {
				opacity: 0.9;
			}
		}
	}

	.custom-prompt-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(6px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 150;
		border-radius: var(--radius-5);

		.custom-prompt-card {
			background-color: var(--bg);
			border: 1px solid var(--outline);
			border-radius: var(--radius-4);
			padding: 1.5rem;
			width: 300px;
			box-shadow: var(--shadow-6);
			display: flex;
			flex-direction: column;
			gap: 1rem;

			h4 {
				margin: 0;
				font-size: 1.1rem;
				font-weight: 600;
				color: var(--text);
			}

			input {
				padding: 0.6rem 0.8rem;
				border-radius: var(--radius-2);
				border: 1px solid var(--outline);
				background-color: var(--bg-high);
				color: var(--text);
				font-family: inherit;
				font-size: 0.95rem;
				width: 100%;
				box-sizing: border-box;

				&:focus {
					border-color: var(--action);
					outline: none;
				}
			}

			.prompt-actions {
				display: flex;
				justify-content: flex-end;
				gap: 0.5rem;

				button {
					padding: 0.5rem 1rem;
					border-radius: var(--radius-2);
					font-weight: 600;
					font-size: 0.85rem;
					cursor: pointer;
					transition: all 0.2s ease;

					&.cancel-btn {
						background: none;
						border: 1px solid var(--outline);
						color: var(--text);
						&:hover {
							background-color: var(--bg-high);
						}
					}

					&.confirm-btn {
						background-color: var(--action);
						border: 1px solid var(--action);
						color: var(--action-text);
						&:hover:not(:disabled) {
							opacity: 0.9;
						}
						&:disabled {
							opacity: 0.5;
							cursor: not-allowed;
						}
					}
				}
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
			padding-right: 4px;

			@media (max-width: 768px) {
				grid-template-columns: repeat(2, 1fr);
			}

			.collection-col {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
				position: relative;

				.collection-header {
					display: flex;
					align-items: center;
					gap: 0.25rem;
					padding: 0 0.25rem;

					.title-editor {
						flex: 1;
						background: transparent;
						border: 1px solid transparent;
						color: var(--text);
						font-size: 0.8rem;
						font-weight: 600;
						padding: 2px 4px;
						border-radius: var(--radius-1);
						width: 0; // Allows flex-grow to work properly with truncate effect if needed
						min-width: 0;

						&:hover {
							background: var(--bg-high);
							border-color: var(--outline);
						}

						&:focus {
							background: var(--bg-high);
							border-color: var(--action);
							outline: none;
						}
					}

					.delete-btn-small {
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

				.thumbnail-wrapper {
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

					.delete-confirm-overlay {
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

						.confirm-card {
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

							.confirm-actions {
								display: flex;
								gap: 0.5rem;

								button {
									padding: 0.25rem 0.75rem;
									font-size: 0.75rem;
									font-weight: 600;
									border-radius: var(--radius-2);
									cursor: pointer;
									transition: all 0.2s;

									&.no {
										background: var(--bg-high);
										border: 1px solid var(--outline);
										color: var(--text);
										&:hover {
											background: var(--bg-higher);
										}
									}

									&.yes {
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

		.empty-state {
			text-align: center;
			color: var(--text-low);
			font-style: italic;
			font-size: 0.9rem;
			margin: 1rem 0;
		}
	}
</style>
