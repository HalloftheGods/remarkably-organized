<script lang="ts">
	import { fade } from 'svelte/transition';
	import { PRESETS, type Preset } from '$lib/data/presets';

	let {
		customPresets = [] as any[],
		selectedPresetId = '',
		onSelectPreset = (preset: any) => {},
		onStartFromScratch = () => {},
		onDeleteCustomPreset = (id: string) => {},
	} = $props<{
		customPresets: any[];
		selectedPresetId: string;
		onSelectPreset: Function;
		onStartFromScratch: Function;
		onDeleteCustomPreset: Function;
	}>();

	let searchQuery = $state('');
	let activeCategory = $state('essentials');

	const categories = [
		{ id: 'essentials', name: 'Essentials', icon: '✨' },
		{ id: 'work', name: 'Work', icon: '💼' },
		{ id: 'academic', name: 'Academic', icon: '🎓' },
		{ id: 'lifestyle', name: 'Lifestyle', icon: '🏡' },
		{ id: 'wellness', name: 'Wellness', icon: '🧘' },
		{ id: 'hobbies', name: 'Hobbies', icon: '🎨' },
		{ id: 'my-presets', name: 'My Presets', icon: '⭐️' },
	];

	const checkCategoryMatch = (preset: Preset) => {
		const hasCategoryMatch = preset.category === activeCategory;
		return hasCategoryMatch;
	};

	const checkSearchMatch = (preset: Preset) => {
		const isSearchEmpty = searchQuery.trim() === '';
		if (isSearchEmpty) return true;

		const searchLow = searchQuery.toLowerCase();
		const nameMatches = preset.name.toLowerCase().includes(searchLow);
		const descriptionMatches = preset.description.toLowerCase().includes(searchLow);
		return nameMatches || descriptionMatches;
	};

	const filterPreset = (preset: Preset) => {
		const isCategoryMatch = checkCategoryMatch(preset);
		const isSearchMatch = checkSearchMatch(preset);
		return isCategoryMatch && isSearchMatch;
	};

	const filteredPresets = $derived(PRESETS.filter(filterPreset));

	const filteredCustomPresets = $derived.by(() => {
		if (activeCategory !== 'my-presets') return [];
		return customPresets.filter(checkSearchMatch);
	});

	const getCategoryCount = (categoryId: string) => {
		if (categoryId === 'my-presets') return customPresets.length;
		const filterByCategory = (preset: Preset) => {
			const isCategoryMatched = preset.category === categoryId;
			return isCategoryMatched;
		};
		return PRESETS.filter(filterByCategory).length;
	};
</script>

<div class="step-content presets-step" in:fade={{ duration: 150 }}>
	<div class="search-box">
		<span class="search-icon">🔎</span>
		<input
			type="text"
			placeholder="Search presets..."
			bind:value={searchQuery}
			class="search-input" />
		{#if searchQuery}
			<button
				class="clear-search-btn"
				onclick={() => (searchQuery = '')}
				aria-label="Clear search">
				✕
			</button>
		{/if}
	</div>
	<h3 class="welcome-headline-gradient">Presets Library</h3>
	<p>
		Start with a pre-configured template or <button
			class="text-link"
			onclick={onStartFromScratch}>
			build your layout from scratch
		</button>
		.
	</p>

	<div class="presets-toolbar">
		<div class="category-tabs">
			{#each categories as cat}
				{@const count = getCategoryCount(cat.id)}
				<button
					class="category-tab"
					class:active={activeCategory === cat.id}
					class:welcome-headline-gradient={activeCategory === cat.id}
					onclick={() => (activeCategory = cat.id)}>
					<span class="cat-icon">{cat.icon}</span>
					<span class="cat-name">{cat.name}</span>
					<span class="cat-count">{count}</span>
				</button>
			{/each}
		</div>
	</div>

	{#if filteredPresets.length > 0 || filteredCustomPresets.length > 0}
		<div class="preset-cards-grid">
			{#each filteredPresets as preset}
				{@const isSelected = selectedPresetId === preset.id}
				<button
					class="preset-card tooltip-bottom"
					class:selected={isSelected}
					onclick={() => onSelectPreset(preset)}
					data-tooltip={preset.description}>
					<div class="preset-icon">{preset.icon}</div>
					<div class="preset-info">
						<h4>{preset.name}</h4>
					</div>
				</button>
			{/each}

			{#each filteredCustomPresets as preset}
				{@const isSelected = selectedPresetId === preset.id}
				<div class="custom-preset-wrapper">
					<button
						class="preset-card tooltip-bottom"
						class:selected={isSelected}
						onclick={() => onSelectPreset(preset)}
						data-tooltip={preset.description}>
						<div class="preset-icon">{preset.icon}</div>
						<div class="preset-info">
							<h4>{preset.name}</h4>
						</div>
					</button>
					<button
						class="delete-preset-btn"
						onclick={(e) => {
							e.stopPropagation();
							if (confirm('Are you sure you want to delete this custom preset?')) {
								onDeleteCustomPreset(preset.id);
							}
						}}
						aria-label="Delete preset">
						✕
					</button>
				</div>
			{/each}
		</div>
	{:else}
		<div class="empty-presets-state">
			<span class="empty-icon">🔍</span>
			<h3>No matching presets found</h3>
			<p>Try searching for a different keyword or choosing another category.</p>
			<button
				class="reset-filter-btn"
				onclick={() => {
					searchQuery = '';
					activeCategory = 'essentials';
				}}>
				Reset Filters
			</button>
		</div>
	{/if}
</div>

<style lang="scss">
	.search-box {
		position: relative;
		float: right;
		display: flex;
		align-items: center;
		flex: 1;
		max-width: 100%;

		@media (min-width: 768px) {
			max-width: 320px;
		}

		.search-icon {
			position: absolute;
			left: 0.75rem;
			opacity: 0.6;
			font-size: 0.9rem;
			pointer-events: none;
		}

		.search-input {
			width: 100%;
			padding: 0.5rem 2rem 0.5rem 2.25rem;
			border-radius: var(--radius-2);
			border: 1px solid var(--outline);
			background-color: var(--bg-high);
			color: var(--text);
			font-size: 0.9rem;
			transition: all 0.2s ease;

			&:focus {
				outline: none;
				border-color: var(--action);
				box-shadow: 0 0 0 1px var(--action);
			}
		}

		.clear-search-btn {
			position: absolute;
			right: 0.75rem;
			background: none;
			border: none;
			color: var(--text);
			opacity: 0.5;
			cursor: pointer;
			font-size: 0.8rem;
			padding: 0.2rem;
			display: flex;
			align-items: center;
			justify-content: center;

			&:hover {
				opacity: 1;
				color: var(--action);
			}
		}
	}
	.presets-toolbar {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1rem;
		margin-bottom: 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 1px dashed var(--outline);

		@media (min-width: 768px) {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}

		.category-tabs {
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			gap: 0.5rem;
			align-items: center;
			justify-content: space-evenly;

			.category-tab {
				display: flex;
				align-items: center;
				gap: 0.4rem;
				padding: 0.4rem 0.75rem;
				border-radius: var(--radius-2);
				border: 1px solid transparent;
				background-color: var(--bg);
				color: var(--text);
				font-size: 0.85rem;
				font-weight: 500;
				cursor: pointer;
				transition: all 0.2s ease;

				&:hover {
					background-color: var(--bg-high);
				}

				&.active {
					color: var(--action-text);
					border-color: transparent;

					.cat-count {
						background-color: rgba(255, 255, 255, 0.2);
						color: inherit;
					}
				}

				.cat-icon {
					font-size: 0.95rem;
				}

				.cat-count {
					font-size: 0.75rem;
					padding: 0.05rem 0.35rem;
					border-radius: var(--radius-round);
					background-color: var(--bg-high);
					color: var(--text-low);
					font-weight: 600;
				}
			}
		}
	}

	.welcome-headline-gradient {
		background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #a78bfa 100%);
		background-size: 200% auto;
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

	.empty-presets-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 3rem 1.5rem;
		text-align: center;
		border: 1px dashed var(--outline);
		border-radius: var(--radius-3);
		margin-top: 1.5rem;

		.empty-icon {
			font-size: 2.5rem;
			margin-bottom: 1rem;
			opacity: 0.5;
		}

		h3 {
			margin: 0 0 0.5rem;
			font-size: 1.15rem;
			font-weight: 600;
		}

		p {
			margin: 0 0 1.25rem;
			font-size: 0.85rem;
			color: var(--text-low);
			max-width: 320px;
		}

		.reset-filter-btn {
			padding: 0.5rem 1rem;
			border-radius: var(--radius-2);
			border: 1px solid var(--action);
			background-color: var(--action);
			color: var(--action-text);
			font-size: 0.85rem;
			font-weight: 600;
			cursor: pointer;
		}
	}
	.preset-cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 1.5rem;
		.preset-card {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 1rem;
			padding: 1.5rem 1rem;
			border-radius: var(--radius-3);
			background: none;
			border: 2px solid transparent;
			color: var(--text);
			cursor: pointer;
			text-align: center;
			transition: all 0.2s ease;
			&:hover {
				background: linear-gradient(
					135deg,
					rgba(124, 58, 237, 0.1) 0%,
					rgba(6, 182, 212, 0.1) 100%
				);
				transform: translateY(-4px);

				.preset-icon {
					transform: scale(1.1);
				}

				h4 {
					opacity: 1;
				}
			}
			&.selected {
				background: linear-gradient(
					135deg,
					rgba(124, 58, 237, 0.15) 0%,
					rgba(6, 182, 212, 0.15) 100%
				);
				border-color: var(--action);
			}
			.preset-icon {
				font-size: 2.5rem;
				transition: transform 0.2s ease;
			}
			.preset-info {
				display: flex;
				flex-direction: column;
				gap: 0.25rem;
				h4 {
					margin: 0;
					font-size: 0.9rem;
					font-weight: 600;
					opacity: 0.9;
				}
			}
		}
	}
	.preset-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 1.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--outline);

		.custom-preset-wrapper {
			position: relative;
			display: inline-flex;
			.delete-preset-btn {
				position: absolute;
				top: -6px;
				right: -6px;
				width: 18px;
				height: 18px;
				border-radius: 50%;
				background-color: var(--bg-high);
				border: 1px solid var(--outline);
				color: var(--text-low);
				font-size: 10px;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				padding: 0;
				z-index: 10;
				transition: all 0.2s ease;

				&:hover {
					background-color: var(--danger, #ff4444);
					color: white;
					border-color: var(--danger, #ff4444);
				}
			}
		}

		.preset-btn {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			padding: 0.5rem 1rem;
			border-radius: var(--radius-3);
			background-color: var(--bg-high);
			border: 2px solid var(--outline);
			color: var(--text);
			cursor: pointer;
			transition: all 0.2s ease;
			&:hover {
				border-color: var(--action);
				background-color: var(--bg);
			}
			&.selected {
				border-color: var(--action);
				background-color: rgba(var(--action-rgb), 0.1);
			}
			.preset-icon {
				font-size: 1.25rem;
			}
			.preset-name {
				font-weight: 600;
				font-size: 0.9rem;
			}
		}
	}
	.text-link {
		background: none;
		border: none;
		color: var(--action);
		text-decoration: underline;
		cursor: pointer;
		padding: 0;
		font-size: inherit;
		font-family: inherit;
		opacity: 0.9;
		&:hover {
			opacity: 1;
		}
	}
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
</style>
