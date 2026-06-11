<script lang="ts">
	import { setContext } from 'svelte';
	import { PAGE_TEMPLATES } from '$lib/data/templates';
	import { carousel, fonts, getGoogleFontURL } from '$lib';
	import { PlannerSettings } from '$lib/state/planner-settings.svelte';
	import {
		setDateMechanic,
		setFormatterMechanic,
		setEventMechanic,
		setGridMechanic,
		setAgendaMechanic,
	} from '$lib/mechanics';
	import { LazyPage } from '$atoms';
	import { TopNav, SideNav, DesignPanel } from '$organisms';
	import PageLayout from '$layouts/Page.layout.svelte';
	import MagicIcon from '~icons/fa/magic';
	import FileIcon from '~icons/fa/file';
	import ListIcon from '~icons/fa/list';
	import PageSizePanel from '$organisms/PageSizePanel.organism.svelte';
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import { replaceState } from '$app/navigation';
	import { browser } from '$app/environment';
	import LZString from 'lz-string';

	let { data } = $props();
	setContext('settings', data.settings);
	setDateMechanic(data.settings);
	setFormatterMechanic(data.settings);
	setEventMechanic(data.settings);
	setGridMechanic(data.settings);
	setAgendaMechanic(data.settings);
	let settings = $derived(data.settings);
	const now = new Date();
	const currentYear = now.getFullYear();
	const currentMonth = now.getMonth();
	const currentDate = now.getDate();
	const timeframe = {
		year: currentYear,
		quarter: Math.floor(currentMonth / 3) + 1,
		month: currentMonth + 1,
		week: Math.ceil(currentDate / 7),
		day: currentDate,
		weekSinceYear: Math.ceil(
			(now.getTime() - new Date(currentYear, 0, 1).getTime()) / 604800000,
		),
		daySinceMonth: currentDate,
		daySinceYear: Math.ceil(
			(now.getTime() - new Date(currentYear, 0, 1).getTime()) / 86400000,
		),
		daySinceWeek: now.getDay() + 1,
		start: new Date(Date.UTC(currentYear, currentMonth, currentDate, 0, 0, 0, 0)),
		end: new Date(Date.UTC(currentYear, currentMonth, currentDate, 23, 59, 59, 999)),
	};
	let showMenu = $state(false);
	let showPageSizeMenu = $state(false);
	let showListBuilder = $state(false);
	const portraitRatios: Record<string, number> = {
		remarkable: 0.75,
		'remarkable-pro': 0.75,
		'remarkable-move': 0.5625,
		goodnotes: 0.75,
		supernote: 0.75,
		kindle: 0.75,
		boox: 0.75,
		'ipad-11': 0.698,
		'ipad-13': 0.75,
		a4: 0.707,
		letter: 0.773,
	};
	const portraitRatio = $derived(portraitRatios[settings.design.pageSize] || 0.75);
	const docWidth = $derived(
		settings.design.orientation === 'portrait' ? 702 : 702 / portraitRatio,
	);
	const docHeight = $derived(docWidth / (settings.design.aspectRatio || portraitRatio));

	// Update the page aspect ratio based on the page size and orientation
	$effect(() => {
		settings.design.aspectRatio =
			settings.design.orientation === 'portrait' ? portraitRatio : 1 / portraitRatio;
	});

	const font = $derived(fonts.find((f) => f.name === settings.design.font) ?? fonts[0]);
	const googleFontURL = $derived(
		getGoogleFontURL([
			settings.design.font,
			settings.design.fontDisplay,
			settings.coverPage.font,
			settings.topNav.font,
			settings.sideNav.font,
		]),
	);
	const googleFontImport = $derived(
		googleFontURL ? `@import url("${googleFontURL}");` : '',
	);
	let enableHighResolution = $state(false);
	let previewMode = $state('carousel' as const);

	let initialFilters: string[] = [];
	let initialBuilder: string[] = [];
	if (browser) {
		try {
			const hash = window.location.hash.substring(1);
			if (hash) {
				const decompressed = LZString.decompressFromEncodedURIComponent(hash);
				if (decompressed) {
					const parsed = JSON.parse(decompressed);
					if (parsed.f) initialFilters = parsed.f;
					if (parsed.b) initialBuilder = parsed.b;
				}
			}
		} catch (e) {
			// ignore
		}
	}

	let filterSelection = $state<string[]>(initialFilters);
	let builderTemplates = $state<string[]>(initialBuilder);

	$effect(() => {
		const f = filterSelection;
		const b = builderTemplates;
		const url = new URL(window.location.href);

		if (f.length > 0 || b.length > 0) {
			const compressed = LZString.compressToEncodedURIComponent(JSON.stringify({ f, b }));
			if (url.hash !== `#${compressed}`) {
				url.hash = compressed;
				replaceState(url, $page.state);
			}
		} else {
			if (url.hash) {
				url.hash = '';
				replaceState(url, $page.state);
			}
		}
	});

	const visibleTemplates = $derived(
		filterSelection.length > 0
			? PAGE_TEMPLATES.filter((t) => filterSelection.includes(t.value))
			: PAGE_TEMPLATES,
	);

	function toggleBuilder(val: string) {
		if (builderTemplates.includes(val)) {
			builderTemplates = builderTemplates.filter((v) => v !== val);
		} else {
			builderTemplates = [...builderTemplates, val];
		}
	}

	function toggleFilter(val: string) {
		if (filterSelection.includes(val)) {
			filterSelection = filterSelection.filter((v) => v !== val);
		} else {
			filterSelection = [...filterSelection, val];
		}
	}

	function copyList() {
		const text = builderTemplates
			.map((val) => {
				const t = PAGE_TEMPLATES.find((p) => p.value === val);
				return t ? `- ${t.name} (${t.value})` : val;
			})
			.join('\n');
		navigator.clipboard.writeText(text);
	}
</script>

<svelte:head>
	<title>Template Library — My Remarkably Organized</title>
	{#if googleFontImport}
		{@html `<style type="text/css">${googleFontImport}</style>`}
	{/if}
</svelte:head>

<div
	class="planner-wrapper theme-{settings.theme}"
	style:--page-aspect-ratio={settings.design.aspectRatio}
	style:--doc-width="{docWidth}px"
	style:--doc-height="{docHeight}px"
	style:--sidenav-width="{settings.sideNav.disable ? 0 : settings.sideNav.width}px"
	style:--topnav-height="{settings.topNav.disable ? 0 : settings.topNav.height}px"
	style:--margin-top="{settings.design.margin?.top || 0}in"
	style:--margin-right="{settings.design.margin?.right || 0}in"
	style:--margin-bottom="{settings.design.margin?.bottom || 0}in"
	style:--margin-left="{settings.design.margin?.left || 0}in"
	style:--font="'{font.name}'"
	style:--font-body="'{settings.design.font}'"
	style:--font-display="'{settings.design.fontDisplay}'"
	style:--font-cover="'{settings.coverPage.font}'"
	style:--font-topnav="'{settings.topNav.font}'"
	style:--font-sidenav="'{settings.sideNav.font}'"
	style:--font-size="{font.size}rem"
	style:--font-weight-bold={font.boldWeight}
	style:--font-weight-normal={font.normalWeight}
	style:--font-weight-light={font.lightWeight}
	style:--bg-pdf={settings.design.colorBg || '#ffffff'}
	style:--nav-bg-pdf={settings.design.colorNavBg || '#f2f2f2'}
	style:--text={settings.design.colorText}
	style:--text-display={settings.design.colorTextDisplay || settings.design.colorText}
	style:--text-sidebar={settings.design.colorSideNavText || settings.design.colorText}
	style:--text-topbar={settings.design.colorTopNavText || settings.design.colorText}
	style:--text-cover={settings.design.colorCoverText || settings.design.colorText}
	style:--outline={settings.design.colorLines}
	style:--dots-color={settings.design.colorDots}
	style:font-size="{font.size}rem">
	{#if showMenu}
		<div
			class="menu design-menu no-print"
			transition:slide={{ duration: 200, axis: 'x' }}>
			<DesignPanel
				{settings}
				{fonts}
				themePrints={{}}
				bind:enableHighResolution
				bind:previewMode />
		</div>
	{/if}

	{#if showPageSizeMenu}
		<div class="pagesize-menu no-print" transition:slide={{ duration: 150 }}>
			<PageSizePanel {settings} />
		</div>
	{/if}
	<div class="template-builder no-print">
		<div class="builder-header">
			<small>Target Builder ({builderTemplates.length})</small>
			<div class="builder-actions">
				{#if builderTemplates.length > 0}
					<button class="action-btn" onclick={copyList}>Copy</button>
					<button class="action-btn" onclick={() => (builderTemplates = [])}>
						Clear
					</button>
				{/if}
			</div>
		</div>
		{#if builderTemplates.length > 0}
			<ul class="builder-list">
				{#each builderTemplates as val}
					{@const t = PAGE_TEMPLATES.find((p) => p.value === val)}
					{#if t}
						<li>
							<button class="remove-btn" onclick={() => toggleBuilder(val)}>
								&times;
							</button>
							<span>
								{t.name}
								<span class="id-text">({t.value})</span>
							</span>
						</li>
					{/if}
				{/each}
			</ul>
		{:else}
			<p class="empty-text" style="margin-top: 1rem;">
				Click templates to add them here.
			</p>
		{/if}
	</div>

	{#if showListBuilder}
		<div
			class="list-builder-menu no-print"
			transition:slide={{ duration: 200, axis: 'x' }}>
			<!-- Filter Section -->
			<div class="builder-header">
				<small>
					Filter Carousel ({filterSelection.length > 0 ? filterSelection.length : 'All'})
				</small>
				<div class="builder-actions">
					{#if filterSelection.length > 0}
						<button class="action-btn" onclick={() => (filterSelection = [])}>
							Clear
						</button>
					{/if}
				</div>
			</div>
			<div
				class="template-select custom-listbox"
				role="listbox"
				aria-multiselectable="true"
				tabindex="0"
				onkeydown={(e) => {
					// Handle listbox navigation and selection
					const activeEl = document.activeElement;
					const isListbox = activeEl?.classList.contains('custom-listbox');

					// Find currently focused item or default to first
					let currentFocus = activeEl?.closest('.template-option') as HTMLElement;
					const options = Array.from(
						e.currentTarget.querySelectorAll('.template-option'),
					) as HTMLElement[];

					if (!options.length) return;

					let currentIndex = currentFocus ? options.indexOf(currentFocus) : -1;

					if (e.key === 'ArrowDown') {
						e.preventDefault();
						const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
						const nextOpt = options[nextIndex];
						if (nextOpt) {
							nextOpt.focus();
							filterSelection = [nextOpt.dataset.value || ''];
						}
					} else if (e.key === 'ArrowUp') {
						e.preventDefault();
						const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
						const prevOpt = options[prevIndex];
						if (prevOpt) {
							prevOpt.focus();
							filterSelection = [prevOpt.dataset.value || ''];
						}
					}
				}}>
				{#each PAGE_TEMPLATES as template}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<div
						role="option"
						tabindex="-1"
						data-value={template.value}
						aria-selected={filterSelection.includes(template.value)}
						class="template-option {filterSelection.includes(template.value)
							? 'selected'
							: ''}"
						onclick={() => toggleFilter(template.value)}
						onkeydown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								toggleFilter(template.value);
							} else if (e.key === ' ') {
								e.preventDefault();
								toggleBuilder(template.value);
							}
						}}>
						<span class="template-name">{template.name}</span>
						{#if builderTemplates.includes(template.value)}
							<span
								class="builder-badge no-print tooltip-left"
								data-tooltip="In Target Builder">
								🎯
							</span>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<button
		onclick={() => {
			showMenu = !showMenu;
			showPageSizeMenu = false;
			showListBuilder = false;
		}}
		class="menu-trigger no-print tooltip-left"
		data-tooltip="Design & Layout">
		<MagicIcon />
	</button>

	<button
		onclick={() => {
			showListBuilder = !showListBuilder;
			showMenu = false;
			showPageSizeMenu = false;
		}}
		class="listbuilder-trigger no-print tooltip-left"
		data-tooltip="Target Builder">
		<ListIcon />
	</button>

	<button
		onclick={() => {
			showPageSizeMenu = !showPageSizeMenu;
			showMenu = false;
			showListBuilder = false;
		}}
		class="pagesize-trigger no-print tooltip-top"
		data-tooltip="Page Size">
		<FileIcon />
	</button>

	<main
		class="view-carousel group {settings.sideNav.isSplit
			? 'side-nav-split'
			: ''} {!settings.sideNav.leftSide ? 'side-nav-right' : ''}"
		use:carousel={{ enabled: true }}>
		{#each visibleTemplates as template, i (template.value)}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<LazyPage
				id={`template-${i}`}
				showSidebar={!settings.sideNav.disable}
				class="planner-page carousel-item {builderTemplates.includes(template.value)
					? 'selected'
					: ''}"
				forceVisible={true}
				onclick={() => toggleBuilder(template.value)}>
				{#snippet sidebar()}
					<SideNav {settings} {timeframe} />
				{/snippet}
				<TopNav {settings} {timeframe} />
				<div class="template-name-banner">{template.name}</div>
				<PageLayout display={template.value as any} {settings} {timeframe} />
			</LazyPage>
		{/each}
	</main>
</div>

<style lang="scss">
	:global(body) {
		background-color: var(--bg-body, #1a1a1a);
		margin: 0;
		padding: 0;
	}

	main.view-carousel {
		display: flex;
		flex-direction: row;
		overflow-x: auto;
		overflow-y: hidden;
		scroll-snap-type: x mandatory;
		padding: 0 calc(50vw - (var(--doc-width) * 0.8 / 2));
		height: 100vh;
		gap: -3rem;
		align-items: center;

		&::-webkit-scrollbar {
			height: 12px;
		}
		&::-webkit-scrollbar-track {
			background: rgba(0, 0, 0, 0.1);
			border-radius: 6px;
		}
		&::-webkit-scrollbar-thumb {
			background-color: rgba(255, 255, 255, 0.3);
			border-radius: 6px;
		}
		&::-webkit-scrollbar-thumb:hover {
			background-color: rgba(255, 255, 255, 0.5);
		}
	}

	:global(main.view-carousel > article) {
		display: block;
		position: relative;
		background-color: var(--bg-pdf, white);
		width: var(--doc-width);
		height: var(--doc-height);
		will-change: transform, opacity;
		border-radius: 5px;
		overflow: visible !important;
	}

	@media screen and (min-width: 768px) {
		:global(main.view-carousel > article) {
			margin: 0 !important;
			zoom: 0.8 !important;
			flex-shrink: 0;
			scroll-snap-align: center;
			transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
			opacity: 0.3;
			filter: grayscale(80%) blur(2px);
			transform: scale(0.8);
			transform-origin: center center;
			box-shadow:
				0 4px 6px -1px rgba(0, 0, 0, 0.1),
				0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
			border-radius: 8px;
			cursor: pointer;
		}

		:global(main.view-carousel > article.carousel-active),
		:global(main.view-carousel > article.selected) {
			opacity: 1;
			filter: grayscale(0%) blur(0px);
			transform: scale(1.05);
			z-index: 10;
			box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
		}

		:global(main.view-carousel > article.carousel-active) {
			cursor: default;
		}

		:global(main.view-carousel > article.selected) {
			outline: 6px solid var(--action, #3b82f6);
			outline-offset: 4px;
			cursor: pointer;
		}
	}

	:global(.template-name-banner) {
		position: absolute;
		bottom: -4rem;
		left: 50%;
		transform: translateX(-50%);
		background: rgba(0, 0, 0, 0.7);
		color: white;
		text-align: center;
		padding: 0.5rem 1.5rem;
		border-radius: 9999px;
		z-index: 100;
		font-weight: 800;
		pointer-events: auto;
		cursor: pointer;
		letter-spacing: 0.05em;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
		white-space: nowrap;
	}

	.menu-trigger {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		z-index: 50;
		background-color: var(--bg);
		color: currentColor;
		border-radius: 100%;
		width: 3.5rem;
		height: 3.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.35em;
		box-shadow: var(--shadow-4);
		cursor: pointer;
		&:hover {
			color: black;
		}
		@media screen and (min-width: 768px) {
			right: 2rem;
		}
	}

	.menu {
		position: fixed;
		bottom: 5rem;
		right: 1rem;
		background-color: var(--bg);
		z-index: 50;
		width: 400px;
		max-width: calc(100vw - 2rem);
		max-height: 80vh;
		border-radius: var(--radius-5, 10px);
		box-shadow: var(--shadow-4);
		padding: 0 2rem 1rem;
		overflow-y: auto;
		overflow-x: hidden;

		@media screen and (min-width: 768px) {
			right: 2rem;
		}

		&::-webkit-scrollbar {
			width: 0.4rem;
			height: 0.4rem;
		}
		&::-webkit-scrollbar-track {
			background: transparent;
		}
		&::-webkit-scrollbar-thumb {
			background-color: var(--outline, #ccc);
			border-radius: 9999px;
		}
		&::-webkit-scrollbar-thumb:hover {
			background-color: var(--text-low, #888);
		}
		&::-webkit-scrollbar-track-piece:start {
			margin-top: var(--radius-5, 10px);
		}
		&::-webkit-scrollbar-track-piece:end {
			margin-bottom: var(--radius-5, 10px);
		}
	}

	.pagesize-trigger {
		position: fixed;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 50;
		background-color: var(--action);
		color: var(--action-text);
		border-radius: 100%;
		width: 3.5rem;
		height: 3.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.35em;
		box-shadow: var(--shadow-4);
		cursor: pointer;
		transition: background-color 0.2s ease;
		&:hover {
			background-color: var(--action-high);
			color: var(--action-text-high);
		}
	}

	.pagesize-menu {
		position: fixed;
		bottom: 5rem;
		left: 50%;
		transform: translateX(-50%);
		width: 330px;
		max-width: calc(100vw - 2rem);
		background-color: var(--bg);
		border-radius: var(--radius-4);
		box-shadow: var(--shadow-5);
		padding: 0 2rem 1.5rem;
		z-index: 50;
		display: flex;
		flex-direction: column;
	}

	.listbuilder-trigger {
		position: fixed;
		top: 1rem;
		right: 1rem;
		z-index: 50;
		background-color: var(--bg);
		color: currentColor;
		border-radius: 100%;
		width: 3.5rem;
		height: 3.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.35em;
		box-shadow: var(--shadow-4);
		cursor: pointer;
		&:hover {
			color: black;
		}
	}

	.template-builder {
		position: fixed;
		top: 1rem;
		left: 1rem;
		z-index: 50;
		background-color: var(--bg);
		padding: 0.75rem;
		border-radius: var(--radius-2, 6px);
		box-shadow: var(--shadow-4);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		max-width: 300px;
		max-height: 80vh;
		overflow-y: auto;

		&::-webkit-scrollbar {
			width: 0.3rem;
		}
		&::-webkit-scrollbar-track {
			background: transparent;
		}
		&::-webkit-scrollbar-thumb {
			background-color: var(--outline, #ccc);
			border-radius: 9999px;
		}
	}

	.list-builder-menu {
		position: fixed;
		top: 1rem;
		right: 5.5rem;
		background-color: var(--bg);
		z-index: 50;
		width: 350px;
		max-width: calc(100vw - 2rem);
		height: 90vh;
		border-radius: var(--radius-5, 10px);
		box-shadow: var(--shadow-4);
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.builder-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.85rem;

		li {
			display: flex;
			align-items: flex-start;
			gap: 0.5rem;
			color: var(--text);
			line-height: 1.2;
		}
	}

	.divider {
		border: 0;
		border-top: 1px solid var(--outline, #ccc);
		margin: 0.5rem 0;
	}

	.empty-text {
		color: var(--text-low);
		font-size: 0.85em;
		text-align: center;
		margin-top: 2rem;
		font-style: italic;
	}

	.template-select.custom-listbox {
		flex: 1;
		width: 100%;
		min-height: 150px;
		background: var(--bg-surface, #fff);
		color: var(--text, #000);
		border: 1px solid var(--outline, #ccc);
		border-radius: 4px;
		padding: 0.5rem;
		font-family: inherit;
		outline: none;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 2px;

		&:focus-within {
			border-color: var(--action, #3b82f6);
		}
	}

	.template-option {
		padding: 0.25rem 0.5rem;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 4px;
		transition: background 0.1s ease;

		&:hover,
		&:focus {
			background: var(--action-low, rgba(59, 130, 246, 0.1));
			outline: none;
		}

		&.selected {
			background: var(--action, #3b82f6);
			color: var(--action-text, #fff);
		}
	}

	.builder-badge {
		font-size: 0.8rem;
	}

	.builder-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 0.25rem;
		color: var(--text-high);
		font-weight: bold;
		gap: 1rem;
	}

	.builder-actions {
		display: flex;
		gap: 0.5rem;
	}

	.action-btn {
		background: transparent;
		color: var(--action);
		border: none;
		cursor: pointer;
		font-size: 0.8rem;
		padding: 0;
		text-decoration: underline;
		&:hover {
			color: var(--action-high);
		}
	}
</style>
