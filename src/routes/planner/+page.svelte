<script lang="ts">
	import { page } from '$app/state';
	import { replaceState } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import PaintBrushIcon from '~icons/fa/paint-brush';
	import PuzzleIcon from '~icons/fa/puzzle-piece';
	import CalendarIcon from '~icons/fa/calendar';
	import CogIcon from '~icons/fa/cog';
	import SaveIcon from '~icons/fa/save';
	import HelpIcon from '~icons/fa/question-circle';
	import PrintIcon from '~icons/fa/print';
	import LoadingIcon from '~icons/eos-icons/bubble-loading';
	import { type PlannerSettings } from '$lib';
	import CoverPage from './CoverPage.svelte';
	import DashboardPage from './DashboardPage.svelte';
	import DesignPanel from './DesignPanel.svelte';
	import CalendarPanel from './CalendarPanel.svelte';
	import BackupPanel from './BackupPanel.svelte';
	import ExtrasPanel from './ExtrasPanel.svelte';
	import MonthPage from './MonthPage.svelte';
	import YearPage from './YearPage.svelte';
	import QuarterPage from './QuarterPage.svelte';
	import WeekPage from './WeekPage.svelte';
	import DayPage from './DayPage.svelte';
	import CollectionPages from './CollectionPages.svelte';
	import HelpModal from './HelpModal.svelte';
	import { browser } from '$app/environment';
	import { fonts, getGoogleFontURL } from '../fonts/fonts';
	import Toast from '$lib/components/Toast.svelte';
	import { toast } from '$lib/components/toast.state.svelte';
	let { data } = $props();
	const settings = $derived(data.settings);

	let windowWidth = $state(750);
	const previewScale = $derived(
		windowWidth && windowWidth < 750 ? (windowWidth - 32) / 702 : 1,
	);

	const pageTemplates = [
		{ name: 'Blank Page', value: 'blank' },
		{ name: 'Dotted Grid - Small', value: 'dotted-small' },
		{ name: 'Dotted Grid - Medium', value: 'dotted' },
		{ name: 'Dotted Grid - Large', value: 'dotted-large' },
		{ name: 'Grid - Small', value: 'grid-small' },
		{ name: 'Grid - Medium', value: 'grid' },
		{ name: 'Grid - Large', value: 'grid-large' },
		{ name: 'Lined - Small', value: 'lined-small' },
		{ name: 'Lined - Medium', value: 'lined' },
		{ name: 'Lined - Large', value: 'lined-large' },
		{ name: 'Numbered - Small', value: 'numbered-small' },
		{ name: 'Numbered - Medium', value: 'numbered' },
		{ name: 'Numbered - Large', value: 'numbered-large' },
		{ name: 'To-do List - Small', value: 'todo-small' },
		{ name: 'To-do List - Medium', value: 'todo' },
		{ name: 'To-do List - Large', value: 'todo-large' },
		{ name: 'Task List - Progress', value: 'tasklist-progress' },
		{ name: 'Calendar', value: 'calendar-month' },
		{ name: 'Calendar - With Notes', value: 'calendar-month-with-notes' },
		{ name: 'Agenda - Daily', value: 'agenda-day' },
		{ name: 'Agenda - Weekly', value: 'agenda-week' },
		{ name: 'Notes - Yearly', value: 'notes-year' },
		{ name: 'Notes - Quarterly', value: 'notes-quarter' },
		{ name: 'Notes - Weekly', value: 'notes-week' },
		{ name: 'Notes - Weekly - Columns', value: 'notes-week-columns' },
		{ name: 'Notes - Weekly - Rows', value: 'notes-week-rows' },
		{ name: 'Notes - Daily', value: 'notes-day' },
		{ name: 'Habit Checkboxes - Grouped by Week', value: 'habit-year-by-week' },
		{ name: 'Habit Checkboxes - Grouped by Month', value: 'habit-year-by-month' },
		{ name: 'Meeting Minutes', value: 'meeting-minutes' },
		{ name: 'Finance / Budget Tracker', value: 'finance-tracker' },
	];

	const font = $derived(fonts.find((f) => f.name === settings.design.font) ?? fonts[0]);
	const googleFontURL = $derived(
		getGoogleFontURL([
			settings.design.font,
			settings.coverPage.font,
			settings.topNav.font,
			settings.sideNav.font,
		]),
	);
	const googleFontImport = $derived(
		googleFontURL ? `@import url("${googleFontURL}");` : '',
	);

	const estimatedPageCount = $derived.by(() => {
		let count = 0;
		const isCoverEnabled = !settings.coverPage.disable;
		const isDashboardEnabled = !settings.dashboardPage.disable;
		const isYearEnabled = !settings.yearPage.disable;
		const isQuarterEnabled = !settings.quarterPage.disable;
		const isMonthEnabled = !settings.monthPage.disable;
		const isWeekEnabled = !settings.weekPage.disable;
		const isDayEnabled = !settings.dayPage.disable;

		if (isCoverEnabled) count += 1;
		if (isDashboardEnabled) count += 1;
		if (isYearEnabled) count += settings.years.length * (1 + settings.yearPage.notePagesAmount);
		if (isQuarterEnabled) count += settings.quarters.length * (1 + settings.quarterPage.notePagesAmount);
		if (isMonthEnabled) count += settings.months.length * (1 + settings.monthPage.notePagesAmount);
		if (isWeekEnabled) count += settings.weeks.length * (1 + settings.weekPage.notePagesAmount);
		if (isDayEnabled) count += settings.days.length * (1 + settings.dayPage.notePagesAmount);

		const collectionPageCount = settings.customCollections.disable ? 0 : settings.collections.reduce((sum, c) => {
			const indexPages = c.numIndexPages ?? 0;
			const itemPages = c.total * (c.numPagesPerItem ?? 1);
			return sum + indexPages + itemPages;
		}, 0);
		count += collectionPageCount;

		return count;
	});

	function getAvailablePageTemplates(
		location: 'collection' | 'year' | 'month' | 'quarter' | 'week' | 'day',
	) {
		return pageTemplates.filter((t) => {
			if (
				!t.value.startsWith('notes') &&
				!t.value.startsWith('habit') &&
				!t.value.startsWith('calendar')
			) {
				return true;
			}
			if (location === 'collection') {
				return ![
					'notes-quarter',
					'notes-month',
					'calendar-month',
					'calendar-month-with-notes',
				].includes(t.value);
			}
			const timeframe = t.value.split('-')[1];
			return location === timeframe;
		});
	}

	let customTimeframe = $state(false);
	let showHelp = $state(page.url.searchParams.get('help') !== '0');
	let showMenu = $state(false);
	let enableHighResolution = $state(page.url.searchParams.has('highres'));
	let loadPages = $state(
		page.url.searchParams.get('help') === '0' &&
			(browser || page.url.searchParams.get('load') === '1'),
	);

	const isAnyCalendarUpdating = $derived(settings.calendars.some((c) => c.updating));

	function safeReplaceState(url: URL) {
		try {
			replaceState(url, {});
		} catch (e) {
			if (browser) {
				window.history.replaceState({}, '', url);
			}
		}
	}

	let settingsUrlInitialized = false;
	let showConfigMenu = $state(false);
	let showCalendarMenu = $state(true);
	let showCollectionsEventsMenu = $state(false);
	$effect(() => {
		const url = new URL(document.location.href);
		if (settings.edits) {
			const safeEdits = { ...settings.edits };
			if (Object.keys(safeEdits).length > 0) {
				url.searchParams.set('settings', JSON.stringify(safeEdits));
			} else {
				url.searchParams.delete('settings');
			}
			safeReplaceState(url);
		} else if (settingsUrlInitialized) {
			url.searchParams.delete('settings');
			safeReplaceState(url);
		}
		settingsUrlInitialized = true;
	});

	$effect(() => {
		if (browser) {
			settings.calendars.forEach((calendar, i) => {
				if (calendar.url && !calendar.events.length && !calendar.updating) {
					settings.importEvents(i);
				}
			});
		}
	});
	$effect(() => {
		const url = new URL(document.location.href);
		if (enableHighResolution && !url.searchParams.has('highres')) {
			url.searchParams.set('highres', '');
			safeReplaceState(url);
		}
		if (!enableHighResolution && url.searchParams.has('highres')) {
			url.searchParams.delete('highres');
			safeReplaceState(url);
		}
	});

	const debounces = new Map<string, number>();
	function debounce(key: string, wait: number, func: () => void) {
		const later = () => {
			debounces.set(key, 0);
			func();
		};
		clearTimeout(debounces.get(key));
		debounces.set(key, setTimeout(later, wait));
	}

	function onStartDateChange(e: Event) {
		const target = e.target as HTMLInputElement;
		if (!target.value) return;
		try {
			const date = new Date(target.value);
			debounce('onStartDateChange', 1000, () => {
				date.setUTCHours(0, 0, 0, 0);
				if (date.getTime()) settings.date.start = date;
			});
		} catch (error) {
			// ignore
		}
	}
	function onEndDateChange(e: Event) {
		const target = e.target as HTMLInputElement;
		if (!target.value) return;
		try {
			const date = new Date(target.value);
			debounce('onEndDateChange', 1000, () => {
				date.setUTCHours(0, 0, 0, 0);
				if (date.getTime()) settings.date.end = date;
			});
		} catch (error) {
			// ignore
		}
	}

	function onHelpClose() {
		showHelp = false;
		const url = new URL(document.location.href);
		url.searchParams.set('help', '0');
		safeReplaceState(url);
		setTimeout(() => (loadPages = true), 180);
	}

	function saveConfig() {
		if (!browser) return;
		try {
			localStorage.setItem('planner-config', JSON.stringify(settings.edits));
			toast.success('Configuration saved successfully!');
		} catch (e) {
			toast.error('Failed to save configuration. Your browser storage might be full.');
		}
	}

	function loadConfig() {
		if (!browser) return;
		try {
			const config = localStorage.getItem('planner-config');
			if (config) {
				const url = new URL(document.location.href);
				url.searchParams.set('settings', config);
				safeReplaceState(url);
				window.location.reload();
			} else {
				toast.error('No saved configuration found.');
			}
		} catch (e) {
			toast.error('Failed to load configuration.');
		}
	}

	function exportConfig() {
		if (!browser) return;
		try {
			const configStr = JSON.stringify(settings.serialize(), null, 2);
			const blob = new Blob([configStr], { type: 'application/json' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'remarkably-organized-settings.json';
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
			toast.success('Configuration exported successfully!');
		} catch (e) {
			toast.error('Failed to export configuration.');
		}
	}

	function importConfig() {
		if (!browser) return;
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = '.json';
		input.onchange = async (e) => {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (!file) return;
			try {
				const text = await file.text();
				const parsed = JSON.parse(text);
				if (parsed && typeof parsed === 'object') {
					const url = new URL(document.location.href);
					url.searchParams.set('settings', JSON.stringify(parsed));
					safeReplaceState(url);
					window.location.reload();
				} else {
					toast.error('Invalid settings file format.');
				}
			} catch (err) {
				toast.error('Failed to parse settings file.');
			}
		};
		input.click();
	}

	function resetConfig() {
		if (!browser) return;
		const url = new URL(document.location.href);
		url.searchParams.delete('settings');
		localStorage.removeItem('planner-config');
		safeReplaceState(url);
		window.location.reload();
	}

	function onTimeframeSelection(e: Event) {
		const target = e.target as HTMLSelectElement;
		if (!target.value) return;
		const startTime = +target.value;
		if (!startTime) {
			customTimeframe = true;
			return;
		}
		const newStart = new Date(startTime);
		const newEnd = new Date(Date.UTC(newStart.getUTCFullYear(), 11, 31));
		if (
			newStart.getTime() !== settings.date.start.getTime() ||
			newEnd.getTime() !== settings.date.end.getTime()
		) {
			settings.date.start = newStart;
			settings.date.end = newEnd;
		}
		customTimeframe = false;
	}

	// Update the page printing resolution
	$effect(() => {
		let element = document.getElementById('page-resolution-style');
		if (!element) {
			element = document.createElement('style');
			element.id = 'page-resolution-style';
			document.head.appendChild(element);
		}
		element.innerHTML = `@page {${
			enableHighResolution ? 'size: 1404px 1872px;' : 'size: 702px 936px;'
		}margin: 0;}`;
	});

	const toggleConfigMenu = () => {
		showConfigMenu = !showConfigMenu;
		if (showConfigMenu) {
			showMenu = false;
			showCalendarMenu = false;
			showCollectionsEventsMenu = false;
		}
	};

	const toggleCalendarMenu = () => {
		showCalendarMenu = !showCalendarMenu;
		if (showCalendarMenu) {
			showMenu = false;
			showConfigMenu = false;
			showCollectionsEventsMenu = false;
		}
	};

	const toggleMenu = () => {
		showMenu = !showMenu;
		if (showMenu) {
			showConfigMenu = false;
			showCalendarMenu = false;
			showCollectionsEventsMenu = false;
		}
	};

	const toggleCollectionsEventsMenu = () => {
		showCollectionsEventsMenu = !showCollectionsEventsMenu;
		if (showCollectionsEventsMenu) {
			showMenu = false;
			showConfigMenu = false;
			showCalendarMenu = false;
		}
	};

	const handlePrint = () => {
		window.print();
	};

	const toggleHelp = () => {
		showHelp = !showHelp;
	};

	const handleDetailsToggle = (e: Event) => {
		const target = e.currentTarget as HTMLDetailsElement;
		const isOpened = target.open;
		if (isOpened) {
			setTimeout(() => {
				target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
			}, 100);
		}
	};
</script>

<svelte:head>
	<title>Planner Builder | Remarkably Organized v26</title>
	<meta name="description" content="Build your custom planner with calendar views, habit trackers, collections, and more. Export a print-ready PDF for your reMarkable tablet." />
	{#if googleFontImport}
		{@html `<style type="text/css">${googleFontImport}</style>`}
	{/if}
</svelte:head>

{#if showHelp}<HelpModal onClose={onHelpClose} />{/if}

{#if showMenu}
	<div class="menu" transition:slide={{ duration: 200 }}>
		<DesignPanel {settings} {fonts} bind:enableHighResolution />
	</div>
{/if}
{#if showConfigMenu}
	<div class="config-menu" transition:slide={{ duration: 150 }}>
		<BackupPanel 
			{estimatedPageCount} 
			onSave={() => { saveConfig(); showConfigMenu = false; }}
			onLoad={() => { loadConfig(); showConfigMenu = false; }}
			onExport={() => { exportConfig(); showConfigMenu = false; }}
			onImport={() => { importConfig(); showConfigMenu = false; }}
			onReset={resetConfig} 
		/>
	</div>
{/if}
{#if showCalendarMenu}
	<div class="menu calendar-menu" transition:slide={{ duration: 200 }}>
		<CalendarPanel 
			{settings} 
			bind:customTimeframe 
			{onTimeframeSelection} 
			{onStartDateChange} 
			{onEndDateChange} 
			{getAvailablePageTemplates} 
		/>
	</div>
{/if}
{#if showCollectionsEventsMenu}
	<div class="menu collections-events-menu" transition:slide={{ duration: 200 }}>
		<ExtrasPanel 
			{settings} 
			{getAvailablePageTemplates} 
		/>
	</div>
{/if}
<button onclick={handlePrint} class="print-trigger" data-tooltip="Download / Print PDF">
	<PrintIcon />
</button>
<button
	onclick={() => {
		showConfigMenu = !showConfigMenu;
		if (showConfigMenu) {
			showMenu = false;
			showCalendarMenu = false;
			showCollectionsEventsMenu = false;
		}
	}}
	class="config-trigger"
	data-tooltip="Backup & Restore">
	<SaveIcon />
</button>
<button
	onclick={toggleCalendarMenu}
	class="calendar-trigger"
	data-tooltip="Calendar Views">
	<CalendarIcon />
</button>
<button
	onclick={toggleCollectionsEventsMenu}
	class="collections-trigger"
	data-tooltip="Extras & Extensions">
	<PuzzleIcon />
</button>
<button onclick={toggleMenu} class="menu-trigger" data-tooltip="Design & Layout">
	<PaintBrushIcon />
</button>
<button
	onclick={toggleHelp}
	class="help-trigger"
	data-tooltip="Help & Usage Guide">
	<HelpIcon />
</button>
<Toast />
<svelte:window bind:innerWidth={windowWidth} />

<main
	style:--preview-scale={previewScale}
	style:--doc-width="{702}px"
	style:--doc-height="{702 * (1 / (settings.design.aspectRatio || 1))}px"
	style:--sidenav-width="{settings.sideNav.disable ? 0 : settings.sideNav.width}px"
	style:--topnav-height="{settings.topNav.disable ? 0 : settings.topNav.height}px"
	style:--font="'{font.name}'"
	style:--font-size="{font.size}rem"
	style:--font-weight-bold={font.boldWeight}
	style:--font-weight-normal={font.normalWeight}
	style:--font-weight-light={font.lightWeight}
	style:--text={settings.design.colorText}
	style:--outline={settings.design.colorLines}
	style:--dots-color={settings.design.colorDots}
	style:font-size="{font.size}rem"
	class:side-nav-right={!settings.sideNav.leftSide}
	class:high-res={enableHighResolution}>
	<div class="progress-bar" class:active={!loadPages || isAnyCalendarUpdating}></div>
	<div id="home"></div>
	{#if !loadPages}
		{#each Array(4) as _, i}
			<article class="skeleton-loader" style="display: flex; align-items: center; justify-content: center; opacity: {1 - i * 0.15};">
				<LoadingIcon font-size="3rem" style="opacity: 0.2;" />
			</article>
		{/each}
	{/if}
	{#if !settings.coverPage.disable && loadPages}
		<CoverPage {settings} />
	{/if}
	{#if !settings.dashboardPage.disable && loadPages}
		<DashboardPage {settings} />
	{/if}
	{#if !settings.yearPage.disable && loadPages}
		{#each settings.years as year, i}
			<YearPage {settings} {year} />
		{/each}
	{/if}
	{#if !settings.quarterPage.disable && loadPages}
		{#each settings.quarters as quarter, i (i)}
			<QuarterPage {settings} {quarter} />
		{/each}
	{/if}
	{#if !settings.monthPage.disable && loadPages}
		{#each settings.months as month, i (i)}
			<MonthPage {settings} {month} />
		{/each}
	{/if}
	{#if !settings.weekPage.disable && loadPages}
		{#each settings.weeks as week, i (i)}
			<WeekPage {settings} {week} />
		{/each}
	{/if}
	{#if !settings.dayPage.disable && loadPages}
		{#each settings.days as day, i (i)}
			<DayPage {settings} {day} />
		{/each}
	{/if}
	{#if loadPages}
		{#if !settings.customCollections.disable}
			{#each settings.collections as collection (collection.id)}
				<CollectionPages {settings} {collection} />
			{/each}
		{/if}
	{/if}
</main>

<style lang="scss">
	main {
		font-family: var(--font);
		@supports (color: oklch(from var(--text) calc(l - 0.15) c h)) {
			--text-low: oklch(from var(--text) calc(l + 0.2) c h);
			--text-high: oklch(from var(--text) calc(l - 0.15) c h);
			--outline-low: oklch(from var(--outline) calc(l + 0.03) c h);
			--outline-high: oklch(from var(--outline) max(0, calc(l - 0.1)) c h);
		}
	}
	@media screen {
		main {
			overflow-y: auto;
			overflow-x: hidden;
			max-width: 100vw;
			max-height: 100vh;
		}
	}
	:global(main > article) {
		display: block;
		position: relative;
		background-color: var(--bg);
		width: var(--doc-width);
		height: var(--doc-height);
		content-visibility: auto;
		contain-intrinsic-size: 1px var(--doc-height);
	}
	.skeleton-loader {
		background-image: linear-gradient(
			110deg,
			transparent 8%,
			rgba(128, 128, 128, 0.1) 18%,
			transparent 33%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite linear;
	}
	@keyframes shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}
	.progress-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background-image: linear-gradient(
			90deg,
			var(--brand, #156990) 0%,
			#5f7fff 25%,
			var(--brand, #156990) 50%,
			#5f7fff 75%,
			var(--brand, #156990) 100%
		);
		background-size: 200% 100%;
		animation: shimmer-progress 1.5s infinite linear;
		z-index: 99999;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.3s;

		&.active {
			opacity: 1;
		}
	}
	@keyframes shimmer-progress {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}
	@media print {
		:global(main.high-res > article) {
			transform: scale(2);
			transform-origin: top left;
		}
		:global(main.high-res > article:not(:nth-child(2))) {
			margin-top: calc(var(--doc-height) * 2);
		}
	}

	.menu-trigger {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		z-index: 10;
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
		@include tablet {
			right: 2rem;
		}
	}
	.menu {
		position: fixed;
		bottom: 5rem;
		right: 1rem;
		background-color: var(--bg);
		z-index: 10;
		width: 400px;
		max-width: calc(100vw - 2rem);
		max-height: 80vh;
		border-radius: var(--radius-5);
		box-shadow: var(--shadow-4);
		padding: 0 2rem 1rem;
		overflow-y: auto;
		overflow-x: hidden;
		@include tablet {
			right: 2rem;
		}

		@include scrollbar;
		&::-webkit-scrollbar-track-piece:start {
			margin-top: var(--radius-5);
		}
		&::-webkit-scrollbar-track-piece:end {
			margin-bottom: var(--radius-5);
		}
	}
	@media print {
		.menu,
		.menu-trigger,
		.print-trigger,
		.config-trigger,
		.config-menu,
		.calendar-trigger,
		.calendar-menu,
		.collections-trigger,
		.help-trigger,
		[data-tooltip]::before {
			display: none !important;
		}
	}
	:global(#bmc-iframe),
	:global(iframe[src*='buymeacoffee']) {
		height: 520px !important;
		border-radius: var(--radius-4) !important;
		box-shadow: var(--shadow-5) !important;
		border: 1px solid var(--outline) !important;

		&::-webkit-scrollbar {
			width: 0.4rem !important;
		}
		&::-webkit-scrollbar-track {
			background: transparent !important;
		}
		&::-webkit-scrollbar-thumb {
			background-color: var(--outline) !important;
			border-radius: 9999px !important;
			&:hover {
				background-color: var(--text-low) !important;
			}
		}
	}

	[data-tooltip] {
		&::before {
			content: attr(data-tooltip);
			position: absolute;
			background: rgba(15, 23, 42, 0.92);
			backdrop-filter: blur(8px);
			color: #f8fafc;
			padding: 0.5rem 0.85rem;
			border-radius: var(--radius-2);
			font-size: 0.75rem;
			font-weight: 500;
			white-space: nowrap;
			box-shadow: var(--shadow-4);
			border: 1px solid rgba(255, 255, 255, 0.08);
			opacity: 0;
			pointer-events: none;
			transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
			z-index: 100;
		}
		&:hover::before {
			opacity: 1;
		}
	}

	.menu-trigger,
	.calendar-trigger,
	.collections-trigger {
		&::before {
			bottom: 100%;
			left: 50%;
			margin-bottom: 0.75rem;
			transform: translateX(-50%) translateY(0.25rem) scale(0.9);
			transform-origin: bottom center;
		}
		&:hover::before {
			transform: translateX(-50%) translateY(0) scale(1);
		}
	}

	.print-trigger,
	.config-trigger {
		&::before {
			top: 100%;
			left: 50%;
			margin-top: 0.75rem;
			transform: translateX(-50%) translateY(-0.25rem) scale(0.9);
			transform-origin: top center;
		}
		&:hover::before {
			transform: translateX(-50%) translateY(0) scale(1);
		}
	}
	.print-trigger {
		position: fixed;
		top: 1rem;
		right: 5rem;
		z-index: 10;
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
		@include tablet {
			right: 6rem;
		}
	}
	.config-menu {
		position: fixed;
		top: 5rem;
		right: 1rem;
		@include tablet {
			right: 2rem;
		}
		width: 330px;
		max-width: calc(100vw - 2rem);
		background-color: var(--bg);
		border-radius: var(--radius-4);
		box-shadow: var(--shadow-5);
		padding: 1.5rem;
		z-index: 10;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.config-trigger {
		position: fixed;
		top: 1rem;
		right: 1rem;
		z-index: 10;
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
		transition: color 0.2s ease;
		&:hover {
			color: black;
		}
		@include tablet {
			right: 2rem;
		}
	}
	.calendar-trigger {
		position: fixed;
		bottom: 1rem;
		right: 9rem;
		z-index: 10;
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
		transition: color 0.2s ease;
		&:hover {
			color: black;
		}
		@include tablet {
			right: 10rem;
		}
	}
	.collections-trigger {
		position: fixed;
		bottom: 1rem;
		right: 5rem;
		z-index: 10;
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
		transition: color 0.2s ease;
		&:hover {
			color: black;
		}
		@include tablet {
			right: 6rem;
		}
	}
	.help-trigger {
		position: fixed;
		top: 1rem;
		left: 1rem;
		z-index: 10;
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
		transition: color 0.2s ease;
		&:hover {
			color: black;
		}
		&::before {
			top: 50% !important;
			left: 100% !important;
			right: auto !important;
			bottom: auto !important;
			margin-left: 0.75rem !important;
			margin-right: 0 !important;
			margin-bottom: 0 !important;
			margin-top: 0 !important;
			transform: translateY(-50%) scale(0.9) !important;
			transform-origin: left center !important;
		}
		&:hover::before {
			transform: translateY(-50%) scale(1) !important;
			opacity: 1 !important;
		}
	}
</style>
