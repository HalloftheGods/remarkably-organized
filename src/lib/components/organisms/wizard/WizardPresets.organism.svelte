<script lang="ts">
	import { Box, Text, Input, Button } from '$atoms';
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

<Box class="step-content presets-step" transition="fade" inDuration={150}>
	<Box class="search-box">
		<span class="search-icon">🔎</span>
		<Input
			type="text"
			placeholder="Search presets..."
			bind:value={searchQuery}
			class="search-input" />
		{#if searchQuery}
			<Button
				class="clear-search-btn"
				onclick={() => (searchQuery = '')}
				aria-label="Clear search">
				✕
			</Button>
		{/if}
	</Box>
	<Text tag="h3" class="welcome-headline-gradient">Presets Library</Text>
	<Text tag="p">
		Start with a pre-configured template or <Button
			class="text-link"
			onclick={onStartFromScratch}>
			build your layout from scratch
		</Button>
		.
	</Text>

	<Box class="presets-toolbar">
		<Box class="category-tabs">
			{#each categories as cat}
				{@const count = getCategoryCount(cat.id)}
				<Button
					class="category-tab {activeCategory === cat.id ? 'active' : ''}"
					onclick={() => (activeCategory = cat.id)}>
					<span class="cat-icon">{cat.icon}</span>
					<span class="cat-name">{cat.name}</span>
					<span class="cat-count">{count}</span>
				</Button>
			{/each}
		</Box>
	</Box>

	{#if filteredPresets.length > 0 || filteredCustomPresets.length > 0}
		<Box class="preset-cards-grid">
			{#each filteredPresets as preset}
				{@const isSelected = selectedPresetId === preset.id}
				<Button
					class="preset-card tooltip-top {isSelected ? 'selected' : ''}"
					onclick={() => onSelectPreset(preset)}
					data-tooltip={preset.description}>
					<Box class="preset-icon">{preset.icon}</Box>
					<Box class="preset-info">
						<Text tag="h4">{preset.name}</Text>
					</Box>
				</Button>
			{/each}

			{#each filteredCustomPresets as preset}
				{@const isSelected = selectedPresetId === preset.id}
				<Box class="custom-preset-wrapper">
					<Button
						class="preset-card tooltip-top {isSelected ? 'selected' : ''}"
						onclick={() => onSelectPreset(preset)}
						data-tooltip={preset.description}>
						<Box class="preset-icon">{preset.icon}</Box>
						<Box class="preset-info">
							<Text tag="h4">{preset.name}</Text>
						</Box>
					</Button>
					<Button
						class="delete-preset-btn"
						onclick={(e: any) => {
							e.stopPropagation();
							if (confirm('Are you sure you want to delete this custom preset?')) {
								onDeleteCustomPreset(preset.id);
							}
						}}
						aria-label="Delete preset">
						✕
					</Button>
				</Box>
			{/each}
		</Box>
	{:else}
		<Box class="empty-presets-state">
			<span class="empty-icon">🔍</span>
			<Text tag="h3">No matching presets found</Text>
			<Text tag="p">
				Try searching for a different keyword or choosing another category.
			</Text>
			<Button
				class="reset-filter-btn"
				onclick={() => {
					searchQuery = '';
					activeCategory = 'essentials';
				}}>
				Reset Filters
			</Button>
		</Box>
	{/if}
</Box>

<style lang="scss">
	:global(.search-box) {
		position: relative;
		float: right;
		display: flex;
		align-items: center;
		flex: 1;
		max-width: 100%;

		@media (min-width: 768px) {
			max-width: 320px;
		}

		:global(.search-icon) {
			position: absolute;
			left: 0.75rem;
			opacity: 0.6;
			font-size: 0.9rem;
			pointer-events: none;
		}

		:global(.search-input) {
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

		:global(.clear-search-btn) {
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
	:global(.presets-toolbar) {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin-top: 1rem;
		margin-bottom: 1.5rem;
		// padding-bottom: 1rem;
		// border-bottom: 1px dashed var(--outline);

		@media (min-width: 768px) {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}

		:global(.category-tabs) {
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			gap: 0.5rem;
			align-items: center;
			justify-content: space-evenly;

			:global(.category-tab) {
				display: flex;
				align-items: center;
				gap: 0.4rem;
				padding: 0.4rem;
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

				:global(.cat-icon) {
					font-size: 0.95rem;
				}

				:global(.cat-count) {
					font-size: 0.75rem;
					padding: 0.05rem 0.35rem;
					border-radius: var(--radius-round);
					background-color: var(--bg-high);
					color: var(--text-low);
					font-weight: 600;
				}
			}

			:global(.category-tab.active) {
				background: var(--brand-gradient) !important;
				background-size: 200% auto;
				animation: gradient-shift 4s ease-in-out infinite;
				color: #ffffff !important;
				border-color: transparent !important;

				:global(.cat-icon) {
					filter: grayscale(100%);
				}

				:global(.cat-count) {
					background-color: rgba(255, 255, 255, 0.2);
					color: #ffffff;
				}
			}
		}
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

	:global(.empty-presets-state) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 3rem 1.5rem;
		text-align: center;
		border: 1px dashed var(--outline);
		border-radius: var(--radius-3);
		margin-top: 1.5rem;

		:global(.empty-icon) {
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

		:global(.reset-filter-btn) {
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
	:global(.preset-cards-grid) {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 1.5rem;

		@media (max-width: 768px) {
			grid-template-columns: repeat(3, 1fr);
			gap: 0.5rem;

			:global(.preset-card) {
				padding: 1rem 0.5rem;
				gap: 0.5rem;

				:global(.preset-icon) {
					font-size: 1.75rem;
				}

				:global(.preset-info) :global(h4) {
					font-size: 0.75rem;
				}
			}
		}
		:global(.preset-card) {
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

				:global(.preset-icon) {
					transform: scale(1.1);
				}

				:global(h4) {
					opacity: 1;
				}
			}
			&:global(.selected) {
				background: linear-gradient(
					135deg,
					rgba(124, 58, 237, 0.15) 0%,
					rgba(6, 182, 212, 0.15) 100%
				);
				border-color: var(--action);
			}
			:global(.preset-icon) {
				font-size: 2.5rem;
				transition: transform 0.2s ease;
			}
			:global(.preset-info) {
				display: flex;
				flex-direction: column;
				gap: 0.25rem;
				:global(h4) {
					margin: 0;
					font-size: 0.9rem;
					font-weight: 600;
					opacity: 0.9;
				}
			}
		}
	}
	:global(.custom-preset-wrapper) {
		position: relative;
		display: inline-flex;

		:global(.delete-preset-btn) {
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

	:global(.text-link) {
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
</style>
