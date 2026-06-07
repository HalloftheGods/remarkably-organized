<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { PRESETS, type Preset } from '$lib/data/presets';
	import { browser } from '$app/environment';
	import { replaceState } from '$app/navigation';
	import { PlannerSettings } from '$state';
	import LoadingIcon from '~icons/eos-icons/bubble-loading';

	let {
		onClose = (() => {}) as () => void,
		onExport = (() => {}) as () => void,
		settings = {} as PlannerSettings,
		onBeforeLoad = (() => {}) as () => void,
	}: {
		onClose?: () => void;
		onExport?: () => void;
		settings?: PlannerSettings;
		onBeforeLoad?: () => void;
	} = $props();

	let isLoadingPreset = $state(false);
	let selectedPresetId = $state('');
	let searchQuery = $state('');
	let activeCategory = $state('essentials');

	const categories = [
		{ id: 'essentials', name: 'Essentials', icon: '✨' },
		{ id: 'work', name: 'Work', icon: '💼' },
		{ id: 'academic', name: 'Academic', icon: '🎓' },
		{ id: 'lifestyle', name: 'Lifestyle', icon: '🏡' },
		{ id: 'wellness', name: 'Wellness', icon: '🧘' },
		{ id: 'hobbies', name: 'Hobbies', icon: '🎨' },
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

	const getCategoryCount = (categoryId: string) => {
		const filterByCategory = (preset: Preset) => {
			const isCategoryMatched = preset.category === categoryId;
			return isCategoryMatched;
		};
		return PRESETS.filter(filterByCategory).length;
	};

	let customPresets = $state<
		{ id: string; name: string; icon: string; description: string; config: any }[]
	>([]);

	const filteredCustomPresets = $derived(
		customPresets.filter((preset) => {
			const isSearchEmpty = searchQuery.trim() === '';
			if (isSearchEmpty) return true;
			const searchLow = searchQuery.toLowerCase();
			return (
				preset.name.toLowerCase().includes(searchLow) ||
				preset.description.toLowerCase().includes(searchLow)
			);
		}),
	);

	$effect(() => {
		const isBrowserContext = browser;
		if (isBrowserContext) {
			selectedPresetId = localStorage.getItem('ro_selected_preset_id') || 'standard';
			const stored = localStorage.getItem('ro_custom_presets');
			if (stored) {
				try {
					customPresets = JSON.parse(stored);
				} catch (e) {
					console.error('Failed to parse custom presets', e);
				}
			}
		}
	});

	function handleKeyup(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
		}
	}

	function loadPreset(preset: Preset) {
		if (!browser) return;
		isLoadingPreset = true;
		onBeforeLoad();

		setTimeout(() => {
			const url = new URL(document.location.href);

			const isStandardPreset = preset.id === 'standard';
			// If standard, just clear settings so defaults are loaded
			if (isStandardPreset) {
				url.searchParams.delete('settings');
			} else {
				url.searchParams.set('settings', JSON.stringify(preset.config));
			}

			// Remove presets parameter to prevent looping when reloading
			url.searchParams.delete('presets');

			// We replace the state cleanly without full reload
			try {
				replaceState(url, {});
			} catch (e) {
				// Ignore error when a navigation is in progress
			}

			const defaultSettings = new PlannerSettings().serialize();
			settings.deserialize(defaultSettings);
			settings.deserialize(preset.config);

			localStorage.setItem('ro_selected_preset_id', preset.id);

			setTimeout(() => {
				isLoadingPreset = false;
				onClose();
			}, 400);
		}, 50);
	}
</script>

<svelte:window on:keyup={handleKeyup} />

<div class="presets-modal no-print">
	<div class="modal-content" transition:scale={{ duration: 150 }}>
		{#if isLoadingPreset}
			<div class="loader-overlay" transition:fade={{ duration: 150 }}>
				<div class="loader-modal" transition:scale={{ duration: 150 }}>
					<LoadingIcon font-size="3rem" style="opacity: 0.5; margin: 0 auto 1rem;" />
					<h3>Loading Preset</h3>
					<p>Applying settings and generating planner spreads...</p>
				</div>
			</div>
		{/if}

		<header>
			<h2>Presets Library</h2>
			<button class="close-btn" aria-label="Close presets" onclick={onClose}>✕</button>
		</header>

		<p class="subtitle">
			Pick a starter planner to set up your layout instantly. <strong>
				Note: Loading a starter will replace your current design!
			</strong>
			<button class="link-btn" onclick={onExport}>
				Click here to save a backup of your work first.
			</button>
		</p>

		<div class="presets-toolbar">
			<div class="search-box">
				<span class="search-icon">🔎</span>
				<input
					type="text"
					placeholder="Search 40+ presets..."
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

			<div class="category-tabs">
				{#each categories as cat}
					{@const count = getCategoryCount(cat.id)}
					{@const isActiveCategory = activeCategory === cat.id}
					<button
						class="category-tab"
						class:active={isActiveCategory}
						onclick={() => (activeCategory = cat.id)}>
						<span class="cat-icon">{cat.icon}</span>
						<span class="cat-name">{cat.name}</span>
						<span class="cat-count">{count}</span>
					</button>
				{/each}
			</div>
		</div>

		{#if filteredPresets.length > 0 || filteredCustomPresets.length > 0}
			<div class="presets-grid">
				{#each filteredPresets as preset}
					{@const isSelected = selectedPresetId === preset.id}
					<button
						class="preset-card tooltip-bottom"
						class:selected={isSelected}
						onclick={() => loadPreset(preset)}
						data-tooltip={preset.description}>
						<div class="preset-icon">{preset.icon}</div>
						<div class="preset-info">
							<h3>{preset.name}</h3>
						</div>
					</button>
				{/each}

				{#each filteredCustomPresets as preset}
					{@const isSelected = selectedPresetId === preset.id}
					<div class="custom-preset-wrapper">
						<button
							class="preset-card tooltip-bottom"
							class:selected={isSelected}
							onclick={() => loadPreset(preset)}
							data-tooltip={preset.description}>
							<div class="preset-icon">{preset.icon}</div>
							<div class="preset-info">
								<h3>{preset.name}</h3>
							</div>
						</button>
						<button
							class="delete-preset-btn"
							onclick={(e) => {
								e.stopPropagation();
								if (confirm('Are you sure you want to delete this custom preset?')) {
									customPresets = customPresets.filter((p) => p.id !== preset.id);
									localStorage.setItem(
										'ro_custom_presets',
										JSON.stringify(customPresets),
									);
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
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="modal-bg"
		role="presentation"
		transition:fade={{ duration: 150 }}
		onclick={onClose}>
	</div>
</div>

<style lang="scss">
	.presets-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;

		.modal-content {
			background-color: var(--bg);
			color: var(--text);
			padding: 2rem;
			border-radius: var(--radius-5);
			box-shadow: var(--shadow-6);
			max-width: min(calc(100vw - 2rem), 1000px);
			max-height: 85vh;
			width: 100%;
			position: relative;
			z-index: 100;
			overflow-y: scroll;
			overflow-x: hidden;
			border: 1px solid var(--outline);
			@include scrollbar;

			@media (max-width: 768px) {
				max-width: 100% !important;
				height: 100% !important;
				max-height: 100% !important;
				border-radius: 0 !important;
				border: none !important;
				padding: 1.5rem 1rem !important;

				header {
					top: -1.5rem !important;
					padding-top: 1.5rem !important;
					h2 {
						font-size: 1.3rem !important;
					}
				}
			}

			header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 0.5rem;
				position: sticky;
				top: -2rem;
				background-color: var(--bg);
				padding: 0 0 0.5rem;
				z-index: 1;
				h2 {
					margin: 0;
					font-size: 1.65rem;
					font-weight: 700;
				}
			}

			.subtitle {
				margin-top: 0;
				margin-bottom: 1.25rem;
				font-size: 0.9rem;
				opacity: 0.8;
				strong {
					color: var(--action);
				}
				.link-btn {
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
			}

			.close-btn {
				width: 2rem;
				height: 2rem;
				padding: 0;
				border-radius: var(--radius-round);
				border: 1px solid var(--outline);
				background-color: var(--bg-high);
				color: var(--text);
				font-size: 0.9rem;
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 0.2s ease;
				flex-shrink: 0;
				&:hover {
					background-color: var(--action);
					color: var(--action-text);
					border-color: var(--action);
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

				@include desktop {
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
				}

				.search-box {
					position: relative;
					display: flex;
					align-items: center;
					flex: 1;
					max-width: 100%;

					@include desktop {
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

				.category-tabs {
					display: flex;
					flex-wrap: wrap;
					gap: 0.5rem;

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
							background: var(--brand-gradient);
							background-size: 200% auto;
							animation: gradient-shift 4s ease-in-out infinite;
							color: #ffffff;
							border-color: transparent;

							.cat-icon {
								filter: grayscale(100%);
							}

							.cat-count {
								background-color: rgba(255, 255, 255, 0.2);
								color: #ffffff;
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
					transition: all 0.2s ease;

					&:hover {
						opacity: 0.9;
					}
				}
			}

			.presets-grid {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: 1.5rem;
				margin-top: 1.5rem;

				@include desktop {
					grid-template-columns: repeat(5, 1fr);
				}

				.custom-preset-wrapper {
					position: relative;
					width: 100%;

					.delete-preset-btn {
						position: absolute;
						top: -0.25rem;
						right: -0.25rem;
						width: 1.5rem;
						height: 1.5rem;
						border-radius: 50%;
						background: var(--bg-high);
						border: 1px solid var(--outline);
						color: var(--text);
						font-size: 0.7rem;
						cursor: pointer;
						display: flex;
						align-items: center;
						justify-content: center;
						transition: all 0.2s ease;
						z-index: 2;

						&:hover {
							background: #ff4444;
							color: white;
							border-color: #ff4444;
							transform: scale(1.1);
						}
					}
				}
			}

			.preset-card {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				gap: 1rem;
				background: none;
				border: 1px solid transparent;
				padding: 1.5rem 0.5rem;
				border-radius: var(--radius-3);
				cursor: pointer;
				transition: all 0.2s ease;
				text-align: center;
				position: relative;

				.preset-icon {
					font-size: 2.5rem;
					transition: transform 0.2s ease;
				}

				.preset-info {
					display: flex;
					flex-direction: column;

					h3 {
						margin: 0;
						font-size: 0.9rem;
						font-weight: 600;
						color: var(--text);
						opacity: 0.9;
					}
				}

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

					h3 {
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
			}

			.loader-overlay {
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
				z-index: 200;
				border-radius: var(--radius-5);

				.loader-modal {
					background-color: var(--bg);
					border: 1px solid var(--outline);
					border-radius: var(--radius-4);
					padding: 2rem;
					text-align: center;
					box-shadow: var(--shadow-6);
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 0.5rem;

					h3 {
						margin: 0;
						font-size: 1.25rem;
						font-weight: 600;
						color: var(--text);
					}

					p {
						margin: 0;
						font-size: 0.9rem;
						opacity: 0.8;
						color: var(--text-low);
					}
				}
			}
		}

		.modal-bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 0;
			background-color: rgba(0, 0, 0, 0.4);
			backdrop-filter: blur(8px);
		}
	}
</style>
