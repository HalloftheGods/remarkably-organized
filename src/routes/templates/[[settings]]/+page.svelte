<script lang="ts">
	import { PAGE_TEMPLATES } from '$lib/data/templates';
	import { PlannerSettings, carousel, fonts, getGoogleFontURL } from '$lib';
	import { LazyPage } from '$atoms';
	import { TopNav, SideNav, DesignPanel } from '$organisms';
	import PageLayout from '$layouts/Page.layout.svelte';
	import MagicIcon from '~icons/fa/magic';
	import FileIcon from '~icons/fa/file';
	import PageSizePanel from '$organisms/PageSizePanel.organism.svelte';
	import { slide } from 'svelte/transition';

	let { data } = $props();
	let settings = $derived(data.settings);
	const timeframe = {
		year: 2026,
		quarter: 1,
		month: 1,
		week: 1,
		day: 1,
		weekSinceYear: 1,
		daySinceMonth: 1,
		daySinceYear: 1,
		daySinceWeek: 1,
		start: new Date('2026-01-01T00:00:00Z'),
		end: new Date('2026-01-01T23:59:59Z'),
	};
	let showMenu = $state(false);
	let showPageSizeMenu = $state(false);
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

	<button
		onclick={() => {
			showMenu = !showMenu;
			showPageSizeMenu = false;
		}}
		class="menu-trigger no-print tooltip-left"
		data-tooltip="Design & Layout">
		<MagicIcon />
	</button>

	<button
		onclick={() => {
			showPageSizeMenu = !showPageSizeMenu;
			showMenu = false;
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
		{#each PAGE_TEMPLATES as template, i}
			<LazyPage
				id={`template-${i}`}
				showSidebar={!settings.sideNav.disable}
				class="planner-page carousel-item"
				forceVisible={true}>
				{#snippet sidebar()}
					<SideNav {settings} {timeframe} />
				{/snippet}
				<TopNav
					{settings}
					{timeframe}
					breadcrumbs={[{ name: template.name, href: `#` }]} />
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

		:global(main.view-carousel > article.carousel-active) {
			opacity: 1;
			filter: grayscale(0%) blur(0px);
			transform: scale(1.05);
			z-index: 10;
			box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
			cursor: default;
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
		pointer-events: none;
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
</style>
