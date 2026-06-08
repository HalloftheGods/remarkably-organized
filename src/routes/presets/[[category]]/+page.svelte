<script lang="ts">
	import { PRESETS, type Preset } from '$lib/data/presets';
	import { toast } from '$state';
	import { Toast } from '$molecules';
	import LZString from 'lz-string';
	import Footer from '$organisms/Footer.organism.svelte';
	import pkg from '../../../../package.json';
	import { trackEvent } from '$lib/analytics';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let presetLoads = $state<Record<string, number>>({});

	onMount(async () => {
		try {
			const res = await fetch('/api/stats');
			const data = await res.json();
			presetLoads = data.presetLoads || {};
		} catch (e) {
			console.error('Failed to load stats', e);
		}
	});

	const fullVersion = pkg.version;

	const handleSupportTicketClick = () => {
		trackEvent('outbound_link_click', { link_id: 'support_ticket' });
	};
	const handleHallOfTheGodsClick = () => {
		trackEvent('outbound_link_click', { link_id: 'hall_of_the_gods' });
	};
	const handleMyCompassClick = () => {
		trackEvent('outbound_link_click', { link_id: 'my_compass_consulting' });
	};

	let searchQuery = $state('');
	const activeCategory = $derived(page.params.category || 'all');

	const categories = [
		{ id: 'all', name: 'Top Planners', icon: '🔥' },
		{ id: 'essentials', name: 'Essentials', icon: '✨' },
		{ id: 'work', name: 'Work', icon: '💼' },
		{ id: 'academic', name: 'Academic', icon: '🎓' },
		{ id: 'lifestyle', name: 'Lifestyle', icon: '🏡' },
		{ id: 'wellness', name: 'Wellness', icon: '🧘' },
		{ id: 'hobbies', name: 'Hobbies', icon: '🎨' },
	];

	const activeCategoryInfo = $derived(
		categories.find((c) => c.id === activeCategory) || categories[0],
	);

	const isDefaultCategory = $derived(activeCategoryInfo.id === 'all');

	const pageTitle = $derived(
		isDefaultCategory
			? 'E-Ink Planner Presets Library — My Remarkably Organized'
			: `${activeCategoryInfo.name} Custom E-Ink Planner Presets — My Remarkably Organized`,
	);

	const pageDescription = $derived(
		isDefaultCategory
			? 'Browse our library of custom e-ink planner presets. Search and download configurations for minimalist, productivity, student, and mindfulness planners.'
			: `Browse our library of ${activeCategoryInfo.name.toLowerCase()} custom e-ink planner presets. Search and download configurations for minimalist, productivity, student, and mindfulness planners.`,
	);

	const isAuthorSetupPreset = (p: Preset) => p.id === 'author-setup';
	const authorPreset = PRESETS.find(isAuthorSetupPreset);
	const isNotAuthorSetup = (p: Preset) => p.id !== 'author-setup';

	const filterPresets = (preset: Preset) => {
		const count = presetLoads[preset.id] || 0;
		const hasCount = count > 0;
		const isCategoryMatch =
			activeCategory === 'all' ? hasCount : preset.category === activeCategory;

		const searchTrimmed = searchQuery.trim().toLowerCase();
		const hasNoSearchQuery = !searchTrimmed;
		if (hasNoSearchQuery) return isCategoryMatch;

		const isNameMatch = preset.name.toLowerCase().includes(searchTrimmed);
		const isDescriptionMatch = preset.description.toLowerCase().includes(searchTrimmed);
		const isCategoryTextMatch = preset.category?.toLowerCase().includes(searchTrimmed);

		const isSearchMatch = isNameMatch || isDescriptionMatch || isCategoryTextMatch;
		return isCategoryMatch && isSearchMatch;
	};

	const sortPresetsByPlannedCount = (a: Preset, b: Preset) => {
		const countA = presetLoads[a.id] || 0;
		const countB = presetLoads[b.id] || 0;
		return countB - countA;
	};

	const getFilteredPresets = () => {
		const isAllCategory = activeCategory === 'all';
		const searchTrimmed = searchQuery.trim().toLowerCase();
		const hasSearchQuery = searchTrimmed.length > 0;

		if (isAllCategory) {
			const filterOtherPresets = (p: Preset) => isNotAuthorSetup(p) && filterPresets(p);
			const otherMatching = PRESETS.filter(filterOtherPresets);
			const sortedOthers = otherMatching.sort(sortPresetsByPlannedCount);

			const hasNoAuthorPreset = !authorPreset;
			if (hasNoAuthorPreset) {
				return sortedOthers;
			}

			const isAuthorNameMatch = authorPreset.name.toLowerCase().includes(searchTrimmed);
			const isAuthorDescMatch = authorPreset.description
				.toLowerCase()
				.includes(searchTrimmed);
			const isAuthorCatMatch =
				authorPreset.category?.toLowerCase().includes(searchTrimmed) ?? false;
			const isAuthorSearchMatch =
				isAuthorNameMatch || isAuthorDescMatch || isAuthorCatMatch;
			const shouldIncludeAuthor = !hasSearchQuery || isAuthorSearchMatch;

			if (shouldIncludeAuthor) {
				return [authorPreset, ...sortedOthers];
			}
			return sortedOthers;
		}

		return PRESETS.filter(filterPresets);
	};

	const filteredPresets = $derived(getFilteredPresets());

	const getPresetUrl = (preset: Preset) => {
		return `/planner?preset=${preset.id}`;
	};

	const getAbsolutePresetUrl = (preset: Preset) => {
		return `https://planner.mycompassconsulting.com/planner?preset=${preset.id}`;
	};

	const getCategoryCount = (categoryId: string) => {
		const isAllCategory = categoryId === 'all';
		if (isAllCategory) {
			const hasPlannedCount = (p: Preset) => (presetLoads[p.id] || 0) > 0;
			const otherPresetsWithCount = PRESETS.filter(
				(p) => isNotAuthorSetup(p) && hasPlannedCount(p),
			);
			const hasAuthor = PRESETS.some(isAuthorSetupPreset);
			const authorIncrement = hasAuthor ? 1 : 0;
			return otherPresetsWithCount.length + authorIncrement;
		}
		const filterByCategory = (preset: Preset) => preset.category === categoryId;
		return PRESETS.filter(filterByCategory).length;
	};

	const copyMarkdownList = () => {
		let markdownText = '🖋️ **My Remarkably Organized - Custom E-Ink Planners**\n';
		markdownText +=
			'*Click any link below to open and customize the layout directly in your browser:*\n\n';

		const mapToMarkdownItem = (preset: Preset) => {
			const url = getAbsolutePresetUrl(preset);
			return `* ${preset.icon} [**${preset.name}**](${url}): ${preset.description}`;
		};

		const isNotAllCategory = (cat: { id: string }) => cat.id !== 'all';
		const activeCategories = categories.filter(isNotAllCategory);

		const buildCategorySection = (cat: (typeof categories)[0]) => {
			const filterByCategory = (preset: Preset) => preset.category === cat.id;
			const categoryPresets = PRESETS.filter(filterByCategory);

			const isCategoryNotEmpty = categoryPresets.length > 0;
			if (!isCategoryNotEmpty) return '';

			const headerText = `### ${cat.icon} ${cat.name}\n`;
			const itemsText = categoryPresets.map(mapToMarkdownItem).join('\n');
			return `${headerText}${itemsText}\n`;
		};

		const filterEmptySections = (sectionText: string) => sectionText !== '';
		const sections = activeCategories
			.map(buildCategorySection)
			.filter(filterEmptySections);

		markdownText += sections.join('\n');

		navigator.clipboard
			.writeText(markdownText)
			.then(() => {
				toast.success('Markdown list copied to clipboard! Ready to share.');
			})
			.catch(() => {
				toast.error('Failed to copy to clipboard.');
			});
	};
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<main class="presets-page">
	<div class="glass-container">
		<header class="page-header">
			<button class="btn-markdown" onclick={copyMarkdownList}>
				📋 Copy to clipboard
			</button>
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
			<div class="flex items-center gap-4">
				<img src="/web-app-manifest-512x512.png" alt="Logo" class="w-16 h-16" />
				<h1>E-Ink Planner Presets</h1>
			</div>

			<p class="subtitle">
				Pick a starter layout to customize, or use
				<a href="/planner" class="back-link">the Wizard</a>
				to build your own.
			</p>
		</header>

		<div class="presets-toolbar">
			<div class="category-tabs">
				{#each categories as cat}
					{@const count = getCategoryCount(cat.id)}
					<a
						href="/presets/{cat.id === 'all' ? '' : cat.id}"
						class="category-tab"
						class:active={activeCategory === cat.id}
						onclick={() => trackEvent('preset_category_click', { category: cat.id })}>
						<span class="cat-icon">{cat.icon}</span>
						<span class="cat-name">{cat.name}</span>
						<span class="cat-count">{count}</span>
					</a>
				{/each}
			</div>
		</div>

		{#if filteredPresets.length > 0}
			<div class="presets-grid">
				{#each filteredPresets as preset}
					<a
						href={getPresetUrl(preset)}
						class="preset-card"
						onclick={() => trackEvent('preset_click', { preset_id: preset.id })}>
						<div class="preset-icon">{preset.icon}</div>
						<div class="preset-info">
							<h3>{preset.name}</h3>
							{#if preset.category}
								<span class="category-tag">{preset.category}</span>
							{/if}
							<p>{preset.description}</p>
						</div>
						<span
							class="load-count"
							style="position: absolute; bottom: 1rem; right: 1rem; font-size: 0.75rem; opacity: 0.7;">
							Planned: {presetLoads[preset.id] || 0} times
						</span>
					</a>
				{/each}
			</div>
		{:else}
			<div class="empty-presets-state">
				<span class="empty-icon">🔍</span>
				<h3>No matching presets found</h3>
				<p>Try searching for a different keyword or choosing another category.</p>
				<a
					href="/presets"
					class="reset-filter-btn"
					onclick={() => {
						searchQuery = '';
					}}>
					Reset Filters
				</a>
			</div>
		{/if}
	</div>
	<Toast />
	<Footer
		{fullVersion}
		{handleSupportTicketClick}
		{handleHallOfTheGodsClick}
		{handleMyCompassClick} />
</main>

<style lang="scss">
	.presets-page {
		min-height: 100vh;
		background-color: #00326e;
		background-image: linear-gradient(135deg, #012b67 0%, #01559d 50%, #0184ba 100%);
		display: flex;
		justify-content: center;
		padding: 4rem 1rem 6rem;
		position: relative;
		font-family: var(--font-body, system-ui, sans-serif);
	}

	.glass-container {
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 20px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
		padding: 3rem;
		max-width: 1200px;
		width: 100%;
		color: white;

		@media (max-width: 768px) {
			padding: 1.5rem;
		}
	}

	.page-header {
		// margin-bottom: 2rem;
		// border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		// padding-bottom: 2rem;

		h1 {
			margin: 0.5rem 0 0.5rem;
			font-size: 2.5rem;
			font-weight: 900;
			text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
			background: var(
				--brand-gradient,
				linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)
			);
			background-size: 200% auto;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
			animation: gradient-shift 4s ease-in-out infinite;
			display: inline-block;
		}

		.subtitle {
			line-height: 1.6;
			opacity: 0.9;
			margin-bottom: 2.5rem;
			max-width: 700px;
		}

		.back-link {
			display: inline-block;
			color: #06b6d4;
			text-decoration: none;
			font-weight: 600;
			transition:
				opacity 0.2s,
				color 0.2s;

			&:hover {
				opacity: 0.8;
				color: white;
				text-decoration: underline;
			}
		}

		.btn-markdown {
			display: inline-flex;
			align-items: center;
			background: var(
				--brand-gradient,
				linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)
			);
			float: right;
			background-size: 200% auto;
			border: none;
			color: white;
			padding: 0.75rem 1.5rem;
			border-radius: 8px;
			font-weight: 600;
			cursor: pointer;
			transition:
				transform 0.2s,
				filter 0.2s;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
			animation: gradient-shift 4s ease-in-out infinite;
			margin-left: 0.5rem;

			&:hover {
				transform: translateY(-2px);
				filter: brightness(1.1);
			}

			&:active {
				transform: translateY(0);
			}
		}

		.search-box {
			position: relative;
			display: flex;
			align-items: center;
			width: 100%;
			max-width: 250px;
			float: right;

			.search-icon {
				position: absolute;
				left: 1rem;
				opacity: 0.7;
				font-size: 1rem;
				pointer-events: none;
			}

			.search-input {
				width: 100%;
				padding: 0.75rem 2.5rem 0.75rem 2.75rem;
				border-radius: 10px;
				border: 1px solid rgba(255, 255, 255, 0.2);
				background: rgba(255, 255, 255, 0.1);
				color: white;
				font-size: 1rem;
				backdrop-filter: blur(5px);
				transition: all 0.2s ease;

				&::placeholder {
					color: rgba(255, 255, 255, 0.6);
				}

				&:focus {
					outline: none;
					border-color: #06b6d4;
					background: rgba(255, 255, 255, 0.15);
					box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.2);
				}
			}

			.clear-search-btn {
				position: absolute;
				right: 1rem;
				background: none;
				border: none;
				color: white;
				opacity: 0.6;
				cursor: pointer;
				font-size: 0.9rem;
				padding: 0.2rem;
				display: flex;
				align-items: center;
				justify-content: center;

				&:hover {
					opacity: 1;
					color: #06b6d4;
				}
			}
		}
	}

	.presets-toolbar {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		// margin-bottom: 2.5rem;

		.category-tabs {
			display: flex;
			flex-wrap: wrap;
			gap: 0.75rem;

			.category-tab {
				display: flex;
				align-items: center;
				gap: 0.1rem;
				padding: 0.5rem 1rem;
				border-radius: 8px;
				border: 1px solid rgba(255, 255, 255, 0.1);
				background: rgba(255, 255, 255, 0.05);
				color: white;
				font-size: 0.9rem;
				font-weight: 500;
				cursor: pointer;
				transition: all 0.2s ease;

				&:hover {
					background: rgba(255, 255, 255, 0.15);
					border-color: rgba(255, 255, 255, 0.2);
				}

				&.active {
					background: var(
						--brand-gradient,
						linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)
					);
					background-size: 200% auto;
					color: white;
					border-color: transparent;
					font-weight: 700;
					animation: gradient-shift 4s ease-in-out infinite;

					.cat-count {
						background-color: rgba(255, 255, 255, 0.2);
						color: white;
					}
				}

				.cat-icon {
					font-size: 1.1rem;
				}

				.cat-count {
					font-size: 0.8rem;
					padding: 0.1rem 0.5rem;
					border-radius: 12px;
					background-color: rgba(255, 255, 255, 0.15);
					color: white;
					font-weight: 600;
				}
			}
		}
	}

	.presets-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 0.5rem;

		.preset-card {
			display: flow-root;
			position: relative;
			background: rgba(255, 255, 255, 0.06);
			border: 1px solid rgba(255, 255, 255, 0.1);
			border-radius: 15px;
			padding: 1.5rem;
			padding-bottom: 2.5rem;
			text-decoration: none;
			color: white;
			transition:
				transform 0.2s,
				background-color 0.2s,
				box-shadow 0.2s;

			.preset-icon {
				font-size: 5rem;
				line-height: 1;
				transition: transform 0.2s ease;
				float: right;
				margin-left: 0.25rem;
				margin-bottom: 0.5rem;
			}

			.preset-info {
				display: block;

				h3 {
					margin: 0 0 0.25rem 0;
					font-size: 1.25rem;
					font-weight: 700;
					background: var(
						--brand-gradient,
						linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)
					);
					background-size: 200% auto;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
					animation: gradient-shift 4s ease-in-out infinite;
					display: inline-block;
				}

				.category-tag {
					display: block;
					font-size: 0.75rem;
					text-transform: uppercase;
					letter-spacing: 0.05em;
					color: #06b6d4;
					font-weight: 700;
					margin-bottom: 0.5rem;
				}

				p {
					margin: 0;
					font-size: 0.9rem;
					line-height: 1.5;
					opacity: 0.8;
				}
			}

			&:hover {
				transform: translateY(-4px);
				background: rgba(255, 255, 255, 0.12);
				border-color: rgba(255, 255, 255, 0.25);
				box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

				.preset-icon {
					transform: scale(1.1);
				}
			}
		}
	}

	.empty-presets-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 4rem 2rem;
		text-align: center;
		// border: 2px dashed rgba(255, 255, 255, 0.2);
		border-radius: 15px;
		background: rgba(255, 255, 255, 0.02);

		.empty-icon {
			font-size: 3rem;
			margin-bottom: 1rem;
			opacity: 0.6;
		}

		h3 {
			margin: 0 0 0.5rem;
			font-size: 1.25rem;
			font-weight: 700;
		}

		p {
			margin: 0 0 1.5rem;
			font-size: 0.95rem;
			opacity: 0.8;
			max-width: 350px;
		}

		.reset-filter-btn {
			padding: 0.5rem 1.5rem;
			border-radius: 8px;
			border: none;
			background: var(
				--brand-gradient,
				linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)
			);
			background-size: 200% auto;
			color: white;
			font-size: 0.95rem;
			font-weight: 700;
			cursor: pointer;
			transition:
				opacity 0.2s,
				transform 0.2s;
			animation: gradient-shift 4s ease-in-out infinite;

			&:hover {
				filter: brightness(1.1);
				transform: translateY(-1px);
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
</style>
