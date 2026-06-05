<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { stripEmojis } from '$lib/helpers/string.helper';
	import { PAGE_TEMPLATES } from '$lib/data/templates';
	import TemplateThumbnail from '$lib/components/TemplateThumbnail.svelte';
	import type { PlannerSettings } from '$lib/state/planner-settings.svelte';

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

	let showAddCollectionInput = $state(false);
	let newCollectionPromptName = $state('');

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
				{#each settings.collections as collection, index}
					<div class="collection-col relative">
						<label>
							<span class="truncate">
								{settings.emojis.disable ? stripEmojis(collection.name) : collection.name}
							</span>
							<button
								class="delete-btn-small"
								onclick={() =>
									(settings.collections = settings.collections.filter(
										(_: any, i: number) => i !== index,
									))}
								aria-label="Delete Collection"
								title="Delete Collection">
								✕
							</button>
						</label>
						<TemplateThumbnail
							templateValue={collection.type}
							templateName={PAGE_TEMPLATES.find((t) => t.value === collection.type)
								?.name || 'Select Template'}
							{settings}
							timeframe={{}}
							onclick={() =>
								openTemplatePicker(
									getAvailablePageTemplates('collection'),
									(val: any) => (collection.type = val),
									collection.type,
								)} />
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

					.delete-btn-small {
						background: none;
						border: none;
						color: var(--text-low);
						cursor: pointer;
						padding: 2px 4px;
						font-size: 0.8rem;
						transition: color 0.2s;

						&:hover {
							color: var(--danger, red);
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
