<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { browser } from '$app/environment';
	import * as htmlToImage from 'html-to-image';
	import LoadingIcon from '~icons/eos-icons/bubble-loading';
	import CameraIcon from '~icons/fa/camera';
	import DownloadIcon from '~icons/fa/download';
	import CaretRightIcon from '~icons/fa/caret-right';
	import { TEMPLATE_CATEGORIES } from '$lib/data/template-categories';
	import Page from '$lib/components/Page.svelte';
	import TemplateThumbnail from '$lib/components/TemplateThumbnail.svelte';
	import { toast } from '$lib/components/toast.state.svelte';
	import type { PlannerSettings, PageTemplate } from '$lib';

	let {
		onClose = (() => {}) as () => void,
		settings = {} as PlannerSettings,
		pickerMode = false,
		allowedTemplates = [] as { name: string; value: string }[],
		onSelect = ((_val: string) => {}) as (value: string) => void,
		currentTemplate = '',
	} = $props();

	let activeStep = $state(
		(() => {
			if (pickerMode && currentTemplate && allowedTemplates.length > 0) {
				const initialFiltered = TEMPLATE_CATEGORIES.map((category) => ({
					...category,
					templates: category.templates.filter((t) =>
						allowedTemplates.some((allowed) => allowed.value === t.value),
					),
				})).filter((category) => category.templates.length > 0);

				const idx = initialFiltered.findIndex((c) =>
					c.templates.some((t) => t.value === currentTemplate),
				);
				return Math.max(0, idx);
			}
			return 0;
		})(),
	);
	let exportingTemplateId = $state('');
	let isBatchExporting = $state(false);
	let batchProgress = $state('');
	let searchQuery = $state('');

	const hasSearchQuery = $derived(searchQuery.trim().length > 0);

	const filteredCategories = $derived(
		pickerMode && allowedTemplates.length > 0
			? TEMPLATE_CATEGORIES.map((category) => ({
					...category,
					templates: category.templates.filter((t) =>
						allowedTemplates.some((allowed) => allowed.value === t.value),
					),
				})).filter((category) => category.templates.length > 0)
			: TEMPLATE_CATEGORIES,
	);

	const displayCategories = $derived.by(() => {
		const base = filteredCategories;
		if (hasSearchQuery) {
			const query = searchQuery.toLowerCase().trim();
			const matchedTemplates = base
				.flatMap((c) => c.templates)
				.filter(
					(t) =>
						t.name.toLowerCase().includes(query) || t.value.toLowerCase().includes(query),
				)
				.filter((t, i, self) => self.findIndex((x) => x.value === t.value) === i);

			const resultsCat = {
				id: 'results',
				title: 'Results',
				icon: '🔍',
				description:
					matchedTemplates.length > 0
						? `Found ${matchedTemplates.length} matching templates for "${searchQuery}".`
						: `No templates matched "${searchQuery}".`,
				templates: matchedTemplates,
			};
			return [...base, resultsCat];
		}
		return base;
	});

	const activeCategory = $derived(displayCategories[activeStep] || displayCategories[0]);

	$effect(() => {
		if (hasSearchQuery) {
			const resultsIndex = displayCategories.findIndex((c) => c.id === 'results');
			const isValidIndex = resultsIndex !== -1;
			if (isValidIndex) {
				activeStep = resultsIndex;
			}
		} else {
			const isStepOutOfBounds = activeStep >= displayCategories.length;
			if (isStepOutOfBounds) {
				activeStep = 0;
			}
		}
	});

	function handleKeyup(event: KeyboardEvent) {
		const isEscape = event.key === 'Escape';
		if (isEscape) onClose();
	}

	const captureTemplate = async (cardElement: HTMLElement, templateValue: string) => {
		if (!browser || exportingTemplateId) return;
		exportingTemplateId = templateValue;

		try {
			const pageContainer = cardElement.querySelector(
				'.gallery-page-render, .page-render-wrapper',
			) as HTMLElement;
			if (!pageContainer) throw new Error('Render container not found');

			const renderWidth = 702;
			const renderHeight = Math.round(702 * (1 / (settings.design.aspectRatio || 0.75)));

			const offscreen = document.createElement('div');
			offscreen.style.cssText =
				'position:absolute;top:-9999px;left:-9999px;pointer-events:none;z-index:-9999;';

			const clone = pageContainer.cloneNode(true) as HTMLElement;
			clone.style.setProperty('width', `${renderWidth}px`, 'important');
			clone.style.setProperty('height', `${renderHeight}px`, 'important');
			clone.style.setProperty('transform', 'none', 'important');
			clone.style.setProperty('overflow', 'hidden', 'important');

			offscreen.appendChild(clone);
			document.body.appendChild(offscreen);

			await new Promise((r) => setTimeout(r, 200));

			const dataUrl = await htmlToImage.toPng(clone, {
				quality: 1.0,
				pixelRatio: 2,
				backgroundColor: settings.design.colorBg || '#ffffff',
				width: renderWidth,
				height: renderHeight,
			});

			offscreen.remove();

			const link = document.createElement('a');
			link.download = `remarkably-organized-template-${templateValue}.png`;
			link.href = dataUrl;
			link.click();
			toast.success(`Template "${templateValue}" exported!`);
		} catch (error) {
			console.error(error);
			toast.error('Failed to export template image.');
		} finally {
			exportingTemplateId = '';
		}
	};

	const batchExportCategory = async () => {
		if (!browser || isBatchExporting) return;
		isBatchExporting = true;

		const cards = Array.from(
			document.querySelectorAll('.gallery-modal .template-thumbnail'),
		) as HTMLElement[];
		const templates = activeCategory.templates;
		const totalTemplates = Math.min(cards.length, templates.length);

		for (let i = 0; i < totalTemplates; i++) {
			batchProgress = `${i + 1}/${totalTemplates}`;
			await captureTemplate(cards[i], templates[i].value);
			await new Promise((r) => setTimeout(r, 300));
		}

		batchProgress = '';
		isBatchExporting = false;
		toast.success(
			`All ${totalTemplates} templates in "${activeCategory.title}" exported!`,
		);
	};

	const TOTAL_TEMPLATES = $derived(
		filteredCategories.reduce((sum, cat) => sum + cat.templates.length, 0),
	);
</script>

<svelte:window on:keyup={handleKeyup} />

<div class="gallery-modal">
	<div class="gallery" transition:scale={{ duration: 150 }}>
		<header>
			<h2>{pickerMode ? 'Select a Template' : 'Template Gallery'} ({TOTAL_TEMPLATES})</h2>
			<div class="header-right">
				<div class="search-box">
					<span class="search-icon">🔎</span>
					<input
						type="text"
						placeholder="Search templates..."
						bind:value={searchQuery}
						class="search-input" />
					{#if hasSearchQuery}
						<button
							class="clear-search-btn"
							onclick={() => (searchQuery = '')}
							aria-label="Clear search">
							✕
						</button>
					{/if}
				</div>
				<button class="close-btn" aria-label="Close gallery" onclick={onClose}>✕</button>
			</div>
		</header>

		<div class="wizard-progress">
			{#each displayCategories as category, index}
				<button
					class="step-item"
					class:active={activeStep === index}
					class:completed={activeStep > index}
					onclick={() => (activeStep = index)}
					type="button">
					<div class="step-icon">{category.icon}</div>
					<span class="step-label">{category.title} ({category.templates.length})</span>
				</button>
				{#if index < displayCategories.length - 1}
					<div class="step-separator">
						<CaretRightIcon />
					</div>
				{/if}
			{/each}
		</div>

		<div class="gallery-body">
			{#key activeCategory.id}
				<div class="category-section" in:fade={{ duration: 150 }}>
					<div class="category-header">
						<p class="category-description">{activeCategory.description}</p>
						{#if !pickerMode}
							<button
								class="batch-export-btn"
								disabled={isBatchExporting || !!exportingTemplateId}
								onclick={batchExportCategory}>
								{#if isBatchExporting}
									<LoadingIcon />
									<span>Exporting {batchProgress}...</span>
								{:else}
									<DownloadIcon />
									<span>Download All</span>
								{/if}
							</button>
						{/if}
					</div>
					<div class="template-grid">
						{#each activeCategory?.templates || [] as template (template.value)}
							{@const isExporting = exportingTemplateId === template.value}
							{@const isYear = template.value.includes('year')}
							{@const isQuarter = template.value.includes('quarter')}
							{@const isWeek = template.value.includes('week')}
							{@const isDay = template.value.includes('day')}
							{@const tf = isYear
								? settings.years[0]
								: isQuarter
									? settings.quarters[0]
									: isWeek
										? settings.weeks[0]
										: isDay
											? settings.days[0]
											: settings.months[0]}
							<TemplateThumbnail
								templateValue={template.value}
								templateName={template.name}
								{settings}
								timeframe={tf || {}}
								isActive={pickerMode && currentTemplate === template.value}
								isInteractive={pickerMode}
								scaleOnHover={true}
								hoverScale={1.25}
								onclick={() => {
									if (pickerMode) {
										onSelect(template.value);
										toast.success(`Selected template: ${template.name}`);
										onClose();
									}
								}}>
								{#if !pickerMode}
									<button
										class="export-btn"
										aria-label="Export {template.name} as image"
										disabled={isExporting}
										onclick={(e) => {
											e.stopPropagation();
											captureTemplate(
												e.currentTarget.closest('.template-thumbnail') as HTMLElement,
												template.value,
											);
										}}>
										{#if isExporting}
											<LoadingIcon />
										{:else}
											<CameraIcon />
										{/if}
									</button>
								{/if}
							</TemplateThumbnail>
						{/each}
					</div>
				</div>
			{/key}
		</div>

		<footer class="gallery-footer">
			<button class="btn-nav" disabled={activeStep === 0} onclick={() => activeStep--}>
				Back
			</button>
			<div class="footer-center">
				<div class="footer-dots">
					{#each displayCategories as _, index}
						<span class="dot" class:active={activeStep === index}></span>
					{/each}
				</div>
			</div>
			{#if activeStep < displayCategories.length - 1}
				<button class="btn-nav primary" onclick={() => activeStep++}>Next</button>
			{:else}
				<button class="btn-nav finish" onclick={onClose}>Finish</button>
			{/if}
		</footer>
	</div>
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="gallery-bg"
		role="presentation"
		transition:fade={{ duration: 150 }}
		onclick={onClose}>
	</div>
</div>

<style lang="scss">
	.gallery-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;

		.gallery {
			background-color: var(--bg);
			color: var(--text);
			border-radius: var(--radius-5);
			box-shadow: var(--shadow-6);
			max-width: min(calc(100vw - 2rem), 1100px);
			max-height: 90vh;
			width: 100%;
			position: relative;
			z-index: 100;
			display: flex;
			flex-direction: column;
			border: 1px solid var(--outline);

			header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 2rem 2.5rem 1.5rem;
				h2 {
					margin: 0;
					font-size: 1.85rem;
					font-weight: 700;
				}

				.header-right {
					display: flex;
					align-items: center;
					gap: 1rem;

					.search-box {
						position: relative;
						display: flex;
						align-items: center;
						width: 240px;

						.search-icon {
							position: absolute;
							left: 0.75rem;
							opacity: 0.6;
							font-size: 0.9rem;
							pointer-events: none;
						}

						.search-input {
							width: 100%;
							padding: 0.45rem 2rem 0.45rem 2.25rem;
							border-radius: var(--radius-2);
							border: 1px solid var(--outline);
							background-color: var(--bg-high);
							color: var(--text);
							font-size: 0.85rem;
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
				}
			}

			.close-btn {
				width: 2.25rem;
				height: 2.25rem;
				padding: 0;
				border-radius: var(--radius-round);
				border: 1px solid var(--outline);
				background-color: var(--bg-high);
				color: var(--text);
				font-size: 1rem;
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

			.wizard-progress {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 2.5rem 1.5rem;
				border-bottom: 1px solid var(--outline);

				.step-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					flex: 1;
					opacity: 0.4;
					transition: opacity 0.3s ease;
					background: none;
					border: none;
					padding: 0;
					cursor: pointer;
					font-family: inherit;

					.step-icon {
						width: 2.5rem;
						height: 2.5rem;
						border-radius: 50%;
						background-color: var(--bg-high);
						border: 2px solid var(--outline);
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 1.15rem;
						z-index: 2;
						transition: all 0.3s ease;
					}

					.step-label {
						margin-top: 0.5rem;
						font-size: 0.7rem;
						font-weight: 600;
						text-transform: uppercase;
						letter-spacing: 0.05em;
						color: var(--text-low);
						transition: all 0.3s ease;
					}

					&.active {
						opacity: 1;
						.step-icon {
							border-color: #6b7280;
							background-color: #6b7280;
						}
						.step-label {
							color: var(--text);
						}
					}

					&.completed {
						opacity: 0.7;
						.step-icon {
							background-color: var(--bg-high);
							border-color: var(--outline);
						}
					}
				}

				.step-separator {
					display: flex;
					align-items: center;
					justify-content: center;
					color: var(--outline);
					opacity: 0.8;
					font-size: 0.95rem;
					height: 2.5rem;
					align-self: flex-start;
					margin: 0 -0.25rem;
				}
			}

			.gallery-body {
				padding: 2rem 2.5rem;
				flex: 1;
				overflow-y: auto;
				min-height: 300px;
				@include scrollbar;

				.category-header {
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 1rem;
					margin-bottom: 1.5rem;

					.category-description {
						margin: 0;
						font-size: 0.95rem;
						opacity: 0.75;
						line-height: 1.5;
					}
				}

				.batch-export-btn {
					display: flex;
					align-items: center;
					gap: 0.5rem;
					padding: 0.5rem 1rem;
					border-radius: var(--radius-3);
					border: 1px solid var(--outline);
					background-color: var(--bg-high);
					color: var(--text);
					font-size: 0.8rem;
					font-weight: 600;
					cursor: pointer;
					white-space: nowrap;
					transition: all 0.2s ease;
					flex-shrink: 0;
					&:hover:not(:disabled) {
						background-color: var(--action);
						color: var(--action-text);
						border-color: var(--action);
					}
					&:disabled {
						opacity: 0.5;
						cursor: wait;
					}
				}

				.template-grid {
					display: grid;
					grid-template-columns: repeat(2, 1fr);
					gap: 1.25rem;

					@include desktop {
						grid-template-columns: repeat(3, 1fr);
					}
				}
			}

			.export-btn {
				width: 1.75rem;
				height: 1.75rem;
				padding: 0;
				border-radius: var(--radius-round);
				border: 1px solid var(--outline);
				background-color: var(--bg-high);
				color: var(--text);
				font-size: 0.75rem;
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 0.2s ease;
				flex-shrink: 0;
				&:hover:not(:disabled) {
					background-color: var(--action);
					color: var(--action-text);
					border-color: var(--action);
				}
				&:disabled {
					opacity: 0.5;
					cursor: wait;
				}
			}

			.gallery-footer {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 1.5rem 2.5rem;
				border-top: 1px solid var(--outline);
				background-color: var(--bg-high);
				border-bottom-left-radius: var(--radius-5);
				border-bottom-right-radius: var(--radius-5);

				.btn-nav {
					padding: 0.75rem 1.5rem;
					border-radius: var(--radius-3);
					font-size: 0.95rem;
					font-weight: 600;
					cursor: pointer;
					transition: all 0.2s ease;
					border: 1px solid var(--outline);
					background-color: var(--bg);
					color: var(--text);
					min-width: 100px;

					&:hover:not(:disabled) {
						background-color: var(--outline);
					}

					&:disabled {
						opacity: 0.4;
						cursor: not-allowed;
					}

					&.primary,
					&.finish {
						background-color: var(--action);
						color: var(--action-text);
						border-color: var(--action);
						&:hover {
							opacity: 0.9;
						}
					}
				}

				.footer-center {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 0.35rem;
				}

				.footer-dots {
					display: flex;
					gap: 0.5rem;

					.dot {
						width: 8px;
						height: 8px;
						border-radius: 50%;
						background-color: var(--outline);
						transition: all 0.2s ease;

						&.active {
							background-color: var(--action);
							transform: scale(1.25);
						}
					}
				}
			}
		}

		.gallery-bg {
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
