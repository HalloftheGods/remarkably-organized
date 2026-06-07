<script lang="ts">
	import { page } from '$app/state';
	import { replaceState, pushState } from '$app/navigation';
	import { onMount, tick } from 'svelte';
	import { slide } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import LoadingIcon from '~icons/eos-icons/bubble-loading';
	import { type PlannerSettings } from '$lib';
	import CoverPage from '$templates/CoverPage.template.svelte';
	import DashboardPage from '$templates/DashboardPage.template.svelte';
	import YearPage from '$templates/YearPage.template.svelte';
	import QuarterPage from '$templates/QuarterPage.template.svelte';
	import MonthPage from '$templates/MonthPage.template.svelte';
	import WeekPage from '$templates/WeekPage.template.svelte';
	import DayPage from '$templates/DayPage.template.svelte';
	import CollectionPages from '$templates/CollectionPages.template.svelte';
	import DesignPanel from '$organisms/DesignPanel.organism.svelte';
	import CalendarPanel from '$organisms/CalendarPanel.organism.svelte';
	import BackupPanel from '$organisms/BackupPanel.organism.svelte';
	import ExtrasPanel from '$organisms/ExtrasPanel.organism.svelte';
	import HelpModal from '$organisms/HelpModal.organism.svelte';
	import PresetsModal from '$organisms/PresetsModal.organism.svelte';
	import SyncPromptModal from '$organisms/SyncPromptModal.organism.svelte';
	import GalleryModal from '$organisms/GalleryModal.organism.svelte';
	import StatsPanels from '$organisms/StatsPanels.organism.svelte';
	import ControlButtons from '$organisms/ControlButtons.organism.svelte';
	import { browser } from '$app/environment';
	import { fonts, getGoogleFontURL } from '$lib';
	import Toast from '$molecules/Toast.molecule.svelte';
	import { toast, PrintManager } from '$state';
	import pkg from '../../../package.json';
	import { trackEvent } from '$lib/analytics';
	import {
		carousel,
		saveConfig,
		loadConfig,
		exportConfig,
		importConfig,
		resetConfig,
	} from '$lib';
	import {
		PAGE_TEMPLATES as pageTemplates,
		getAvailablePageTemplates,
	} from '$lib/data/templates';

	const appVersion = pkg.version.split('.').slice(0, 2).join('.');
	let { data } = $props();
	const settings = $derived(data.settings);

	const visits = tweened(0, { duration: 2000, easing: cubicOut });
	const created = tweened(0, { duration: 2200, easing: cubicOut });
	const printed = tweened(0, { duration: 2500, easing: cubicOut });
	const shared = tweened(0, { duration: 2800, easing: cubicOut });
	const timeCreatingSeconds = tweened(0, { duration: 3000, easing: cubicOut });

	const formatTime = (totalSeconds: number) => {
		if (!totalSeconds) return '0m';
		const days = Math.floor(totalSeconds / 86400);
		const hours = Math.floor((totalSeconds % 86400) / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);

		let parts = [];
		if (days > 0) parts.push(`${days}d`);
		if (hours > 0) parts.push(`${hours}h`);
		if (minutes > 0 || parts.length === 0) parts.push(`${minutes}m`);

		return parts.join(' ');
	};

	let windowWidth = $state(750);
	const previewScale = $derived(
		windowWidth && windowWidth < 750 ? (windowWidth - 32) / 702 : 1,
	);

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

	let customTimeframe = $state(false);
	const hasPresetsParam = page.url.searchParams.get('presets') === 'true';
	const isHelpParamActive = page.url.searchParams.get('help') !== '0';
	let showHelp = $state(isHelpParamActive && !hasPresetsParam);
	let showPresetsModal = $state(hasPresetsParam);
	let showGalleryModal = $state(false);
	let isGalleryPickerMode = $state(false);
	let wasHelpOpenDuringPicker = $state(false);
	let galleryAllowedTemplates = $state<{ name: string; value: string }[]>([]);
	let galleryOnSelect = $state<(value: string) => void>(() => {});
	let galleryCurrentTemplate = $state('');
	let showSyncPrompt = $state(false);
	let isSyncingBeforePrint = $state(false);
	let showMenu = $state(false);

	const printManager = new PrintManager(() => settings);

	$effect(() => {
		if (previewMode !== 'grid') {
			printManager.isExportMode = false;
		}
	});
	let enableHighResolution = $state(page.url.searchParams.has('highres'));
	let previewMode: 'list' | 'grid' | 'carousel' = $state('list');
	let loadPages = $state(
		page.url.searchParams.get('help') === '0' &&
			(browser || page.url.searchParams.get('load') === '1'),
	);

	let visibleYearsCount = $state(0);
	let visibleQuartersCount = $state(0);
	let visibleMonthsCount = $state(0);
	let visibleWeeksCount = $state(0);
	let visibleDaysCount = $state(0);
	let visibleCollectionsCount = $state(0);

	const expectedYears = $derived(
		!settings.yearPage.disable && loadPages ? settings.years.length : 0,
	);
	const expectedQuarters = $derived(
		!settings.quarterPage.disable && loadPages ? settings.quarters.length : 0,
	);
	const expectedMonths = $derived(
		!settings.monthPage.disable && loadPages ? settings.months.length : 0,
	);
	const expectedWeeks = $derived(
		!settings.weekPage.disable && loadPages ? settings.weeks.length : 0,
	);
	const expectedDays = $derived(
		!settings.dayPage.disable && loadPages ? settings.days.length : 0,
	);
	const expectedCollections = $derived(
		!settings.customCollections.disable && loadPages ? settings.collections.length : 0,
	);

	const isGeneratingSpreads = $derived(
		loadPages &&
			(visibleYearsCount < expectedYears ||
				visibleQuartersCount < expectedQuarters ||
				visibleMonthsCount < expectedMonths ||
				visibleWeeksCount < expectedWeeks ||
				visibleDaysCount < expectedDays ||
				visibleCollectionsCount < expectedCollections),
	);

	let lastYears = settings.years;
	let lastQuarters = settings.quarters;
	let lastMonths = settings.months;
	let lastWeeks = settings.weeks;
	let lastDays = settings.days;
	let lastCollections = settings.collections;

	let lastLayout = $state({
		yearTemplate: settings.yearPage.template,
		yearNotes: settings.yearPage.notePagesTemplate,
		yearNoteAmount: settings.yearPage.notePagesAmount,
		yearNoteColumns: settings.yearPage.notePagesColumns,
		quarterTemplate: settings.quarterPage.template,
		quarterNotes: settings.quarterPage.notePagesTemplate,
		quarterNoteAmount: settings.quarterPage.notePagesAmount,
		quarterNoteColumns: settings.quarterPage.notePagesColumns,
		monthTemplate: settings.monthPage.template,
		monthColumns: settings.monthPage.columns,
		monthNotes: settings.monthPage.notePagesTemplate,
		monthNoteAmount: settings.monthPage.notePagesAmount,
		monthNoteColumns: settings.monthPage.notePagesColumns,
		weekTemplate: settings.weekPage.template,
		weekColumns: settings.weekPage.columns,
		weekNotes: settings.weekPage.notePagesTemplate,
		weekNoteAmount: settings.weekPage.notePagesAmount,
		weekNoteColumns: settings.weekPage.notePagesColumns,
		dayTemplate: settings.dayPage.template,
		dayColumns: settings.dayPage.columns,
		dayNotes: settings.dayPage.notePagesTemplate,
		dayNoteAmount: settings.dayPage.notePagesAmount,
		dayNoteColumns: settings.dayPage.notePagesColumns,
		collectionFingerprint: settings.collections
			.map((c) => `${c.type}-${c.total}-${c.numPagesPerItem}-${c.columns}`)
			.join(','),
	});

	$effect.pre(() => {
		const layoutChanged =
			lastLayout.yearTemplate !== settings.yearPage.template ||
			lastLayout.yearNotes !== settings.yearPage.notePagesTemplate ||
			lastLayout.yearNoteAmount !== settings.yearPage.notePagesAmount ||
			lastLayout.yearNoteColumns !== settings.yearPage.notePagesColumns ||
			lastLayout.quarterTemplate !== settings.quarterPage.template ||
			lastLayout.quarterNotes !== settings.quarterPage.notePagesTemplate ||
			lastLayout.quarterNoteAmount !== settings.quarterPage.notePagesAmount ||
			lastLayout.quarterNoteColumns !== settings.quarterPage.notePagesColumns ||
			lastLayout.monthTemplate !== settings.monthPage.template ||
			lastLayout.monthColumns !== settings.monthPage.columns ||
			lastLayout.monthNotes !== settings.monthPage.notePagesTemplate ||
			lastLayout.monthNoteAmount !== settings.monthPage.notePagesAmount ||
			lastLayout.monthNoteColumns !== settings.monthPage.notePagesColumns ||
			lastLayout.weekTemplate !== settings.weekPage.template ||
			lastLayout.weekColumns !== settings.weekPage.columns ||
			lastLayout.weekNotes !== settings.weekPage.notePagesTemplate ||
			lastLayout.weekNoteAmount !== settings.weekPage.notePagesAmount ||
			lastLayout.weekNoteColumns !== settings.weekPage.notePagesColumns ||
			lastLayout.dayTemplate !== settings.dayPage.template ||
			lastLayout.dayColumns !== settings.dayPage.columns ||
			lastLayout.dayNotes !== settings.dayPage.notePagesTemplate ||
			lastLayout.dayNoteAmount !== settings.dayPage.notePagesAmount ||
			lastLayout.dayNoteColumns !== settings.dayPage.notePagesColumns ||
			lastLayout.collectionFingerprint !==
				settings.collections
					.map((c) => `${c.type}-${c.total}-${c.numPagesPerItem}-${c.columns}`)
					.join(',');

		if (layoutChanged) {
			lastLayout = {
				yearTemplate: settings.yearPage.template,
				yearNotes: settings.yearPage.notePagesTemplate,
				yearNoteAmount: settings.yearPage.notePagesAmount,
				yearNoteColumns: settings.yearPage.notePagesColumns,
				quarterTemplate: settings.quarterPage.template,
				quarterNotes: settings.quarterPage.notePagesTemplate,
				quarterNoteAmount: settings.quarterPage.notePagesAmount,
				quarterNoteColumns: settings.quarterPage.notePagesColumns,
				monthTemplate: settings.monthPage.template,
				monthColumns: settings.monthPage.columns,
				monthNotes: settings.monthPage.notePagesTemplate,
				monthNoteAmount: settings.monthPage.notePagesAmount,
				monthNoteColumns: settings.monthPage.notePagesColumns,
				weekTemplate: settings.weekPage.template,
				weekColumns: settings.weekPage.columns,
				weekNotes: settings.weekPage.notePagesTemplate,
				weekNoteAmount: settings.weekPage.notePagesAmount,
				weekNoteColumns: settings.weekPage.notePagesColumns,
				dayTemplate: settings.dayPage.template,
				dayColumns: settings.dayPage.columns,
				dayNotes: settings.dayPage.notePagesTemplate,
				dayNoteAmount: settings.dayPage.notePagesAmount,
				dayNoteColumns: settings.dayPage.notePagesColumns,
				collectionFingerprint: settings.collections
					.map((c) => `${c.type}-${c.total}-${c.numPagesPerItem}-${c.columns}`)
					.join(','),
			};
		}
	});

	$effect(() => {
		if (lastYears !== settings.years) {
			lastYears = settings.years;
		}
		if (lastQuarters !== settings.quarters) {
			lastQuarters = settings.quarters;
		}
		if (lastMonths !== settings.months) {
			lastMonths = settings.months;
		}
		if (lastWeeks !== settings.weeks) {
			lastWeeks = settings.weeks;
		}
		if (lastDays !== settings.days) {
			lastDays = settings.days;
		}
		if (lastCollections !== settings.collections) {
			lastCollections = settings.collections;
		}

		// Immediately shrink if needed
		if (visibleYearsCount > expectedYears) visibleYearsCount = expectedYears;
		if (visibleQuartersCount > expectedQuarters) visibleQuartersCount = expectedQuarters;
		if (visibleMonthsCount > expectedMonths) visibleMonthsCount = expectedMonths;
		if (visibleWeeksCount > expectedWeeks) visibleWeeksCount = expectedWeeks;
		if (visibleDaysCount > expectedDays) visibleDaysCount = expectedDays;
		if (visibleCollectionsCount > expectedCollections)
			visibleCollectionsCount = expectedCollections;

		if (isGeneratingSpreads) {
			let req = requestAnimationFrame(() => {
				if (visibleYearsCount < expectedYears)
					visibleYearsCount = Math.min(expectedYears, visibleYearsCount + 2);
				if (visibleQuartersCount < expectedQuarters)
					visibleQuartersCount = Math.min(expectedQuarters, visibleQuartersCount + 4);
				if (visibleMonthsCount < expectedMonths)
					visibleMonthsCount = Math.min(expectedMonths, visibleMonthsCount + 6);
				if (visibleWeeksCount < expectedWeeks)
					visibleWeeksCount = Math.min(expectedWeeks, visibleWeeksCount + 10);
				if (visibleDaysCount < expectedDays)
					visibleDaysCount = Math.min(expectedDays, visibleDaysCount + 20);
				if (visibleCollectionsCount < expectedCollections)
					visibleCollectionsCount = Math.min(
						expectedCollections,
						visibleCollectionsCount + 5,
					);
			});
			return () => cancelAnimationFrame(req);
		}
	});

	let totalSpreadsExpected = $derived(
		expectedYears +
			expectedQuarters +
			expectedMonths +
			expectedWeeks +
			expectedDays +
			expectedCollections,
	);

	let totalSpreadsVisible = $derived(
		visibleYearsCount +
			visibleQuartersCount +
			visibleMonthsCount +
			visibleWeeksCount +
			visibleDaysCount +
			visibleCollectionsCount,
	);

	let mainElement: HTMLElement | null = $state(null);

	let accumulatedSeconds = 0;
	let lastInteraction = Date.now();

	const sendTimeCreating = () => {
		if (accumulatedSeconds > 0) {
			const amount = accumulatedSeconds;
			accumulatedSeconds = 0;
			fetch('/api/stats', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ type: 'time_creating', amount }),
				keepalive: true,
			}).catch(() => {
				accumulatedSeconds += amount; // Re-add if failed
			});
		}
	};

	onMount(() => {
		const hasVisited = sessionStorage.getItem('ro_visited');
		const isNewSession = !hasVisited;
		if (isNewSession) {
			sessionStorage.setItem('ro_visited', 'true');
			fetch('/api/stats', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ type: 'visits' }),
			}).catch(console.error);
		}

		fetch('/api/stats', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ type: 'created' }),
		}).catch(console.error);

		if (showHelp) {
			replaceState(document.location.href, { modal: 'help' });
		} else if (showPresetsModal) {
			replaceState(document.location.href, { modal: 'presets' });
		}

		const fetchStats = async () => {
			try {
				const res = await fetch('/api/stats');
				if (res.ok) {
					const data = await res.json();
					visits.set(data.visits);
					created.set(data.created);
					printed.set(data.printed);
					shared.set(data.shared || 0);
					timeCreatingSeconds.set(data.timeCreating || 0);
					if (data.themePrints) {
						themePrints = data.themePrints;
					}
				}
			} catch (e) {
				console.error('Failed to fetch stats', e);
			}
		};
		fetchStats();
		const statsInterval = setInterval(fetchStats, 60000);

		const INACTIVITY_LIMIT = 60000;

		const updateActivity = () => (lastInteraction = Date.now());
		window.addEventListener('mousemove', updateActivity, { passive: true });
		window.addEventListener('keydown', updateActivity, { passive: true });
		window.addEventListener('click', updateActivity, { passive: true });
		window.addEventListener('scroll', updateActivity, { passive: true });

		const tickInterval = setInterval(() => {
			if (Date.now() - lastInteraction < INACTIVITY_LIMIT) {
				accumulatedSeconds++;
			}
		}, 1000);

		const handleVisibilityChange = () => {
			if (document.visibilityState === 'hidden') {
				sendTimeCreating();
			}
		};

		window.addEventListener('visibilitychange', handleVisibilityChange);
		window.addEventListener('beforeunload', sendTimeCreating);

		const handlePopState = (e: PopStateEvent) => {
			const modalName = e.state?.modal;
			const isExitingPicker = isGalleryPickerMode && modalName !== 'gallery';
			if (isExitingPicker) {
				const shouldRestoreHelp = wasHelpOpenDuringPicker;
				showHelp = shouldRestoreHelp;
				isGalleryPickerMode = false;
				wasHelpOpenDuringPicker = false;
			} else {
				showHelp = modalName === 'help';
			}
			showPresetsModal = modalName === 'presets';
			showGalleryModal = modalName === 'gallery';
			showConfigMenu = modalName === 'config';
			showCalendarMenu = modalName === 'calendar';
			showCollectionsEventsMenu = modalName === 'extras';
			showMenu = modalName === 'design';
			showSyncPrompt = modalName === 'sync';
		};
		window.addEventListener('popstate', handlePopState);

		return () => {
			window.removeEventListener('mousemove', updateActivity);
			window.removeEventListener('keydown', updateActivity);
			window.removeEventListener('click', updateActivity);
			window.removeEventListener('scroll', updateActivity);
			window.removeEventListener('visibilitychange', handleVisibilityChange);
			window.removeEventListener('beforeunload', sendTimeCreating);
			window.removeEventListener('popstate', handlePopState);
			clearInterval(tickInterval);
			clearInterval(statsInterval);
		};
	});

	$effect(() => {
		if (browser && !loadPages) {
			setTimeout(() => {
				loadPages = true;
			}, 500); // Load pages in background after help modal has a chance to animate in
		}
	});

	const isAnyCalendarUpdating = $derived(settings.calendars.some((c) => c.updating));

	function safeReplaceState(url: URL) {
		try {
			replaceState(url, {});
		} catch (e) {
			// Ignore error when a navigation is in progress
		}
	}

	let settingsUrlInitialized = false;
	let showConfigMenu = $state(false);
	let themePrints = $state<Record<string, number>>({});
	let showCalendarMenu = $state(false);
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

	let promptedSync = false;
	$effect(() => {
		if (browser && !promptedSync) {
			const needsSync = settings.calendars.some(
				(c) => c.url && !c.events.length && !c.lastUpdated,
			);
			if (needsSync) {
				promptedSync = true;
				setTimeout(() => {
					toast.info(
						'Calendar auto-sync is disabled to save API limits.\nClick the open book icon to sync events manually.',
					);
				}, 2000);
			}
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
		if (browser && window.history.state?.modal) window.history.back();
		const url = new URL(document.location.href);
		url.searchParams.set('help', '0');
		safeReplaceState(url);
		setTimeout(() => (loadPages = true), 180);
	}

	function onPresetsClose() {
		showPresetsModal = false;
		if (browser && window.history.state?.modal) window.history.back();
		const url = new URL(document.location.href);
		if (url.searchParams.has('presets')) {
			url.searchParams.delete('presets');
			safeReplaceState(url);
		}
	}

	function handleOpenPresets() {
		showHelp = false;
		showPresetsModal = true;
		if (browser) pushState('', { modal: 'presets' });
	}

	function handleBackupPresetsOpen() {
		showConfigMenu = false;
		showPresetsModal = true;
		if (browser) pushState('', { modal: 'presets' });
	}

	function handleOpenGallery() {
		showHelp = false;
		isGalleryPickerMode = false;
		showGalleryModal = true;
		if (browser) pushState('', { modal: 'gallery' });
	}

	function handleGalleryClose() {
		showGalleryModal = false;
		galleryAllowedTemplates = [];
		galleryOnSelect = () => {};
		galleryCurrentTemplate = '';
		const hasModalHistory = browser && window.history.state?.modal;
		if (hasModalHistory) {
			window.history.back();
		} else {
			isGalleryPickerMode = false;
			wasHelpOpenDuringPicker = false;
		}
	}

	function handleBackupSave() {
		saveConfig(settings);
		showConfigMenu = false;
	}

	function handleBackupLoad() {
		loadConfig();
		showConfigMenu = false;
	}

	function handleBackupExport() {
		exportConfig(settings);
		showConfigMenu = false;
	}

	function handleBackupImport() {
		importConfig();
		showConfigMenu = false;
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
			if (browser) pushState('', { modal: 'config' });
			trackEvent('config_menu_toggle', { menu: 'backup' });
			showMenu = false;
			showCalendarMenu = false;
			showCollectionsEventsMenu = false;
		} else if (browser && window.history.state?.modal) {
			window.history.back();
		}
	};

	const toggleCalendarMenu = () => {
		showCalendarMenu = !showCalendarMenu;
		if (showCalendarMenu) {
			if (browser) pushState('', { modal: 'calendar' });
			trackEvent('config_menu_toggle', { menu: 'calendar' });
			showMenu = false;
			showConfigMenu = false;
			showCollectionsEventsMenu = false;
		} else if (browser && window.history.state?.modal) {
			window.history.back();
		}
	};

	const toggleMenu = () => {
		showMenu = !showMenu;
		if (showMenu) {
			if (browser) pushState('', { modal: 'design' });
			trackEvent('config_menu_toggle', { menu: 'design' });
			showConfigMenu = false;
			showCalendarMenu = false;
			showCollectionsEventsMenu = false;
		} else if (browser && window.history.state?.modal) {
			window.history.back();
		}
	};

	const toggleCollectionsEventsMenu = () => {
		showCollectionsEventsMenu = !showCollectionsEventsMenu;
		if (showCollectionsEventsMenu) {
			if (browser) pushState('', { modal: 'extras' });
			trackEvent('config_menu_toggle', { menu: 'extras' });
			showMenu = false;
			showConfigMenu = false;
			showCalendarMenu = false;
		} else if (browser && window.history.state?.modal) {
			window.history.back();
		}
	};

	const handlePrint = () => {
		const needsSync = settings.calendars.some(
			(c) => c.url && !c.events.length && !c.lastUpdated,
		);
		if (needsSync) {
			showSyncPrompt = true;
			return;
		}
		executePrint();
	};

	const executePrint = async () => {
		showSyncPrompt = false;
		showHelp = false;
		showPresetsModal = false;
		showGalleryModal = false;
		showMenu = false;
		await printManager.executePrint(sendTimeCreating);
	};

	const handleSyncAndPrint = async () => {
		isSyncingBeforePrint = true;
		const syncPromises = settings.calendars.map((c, i) => {
			if (c.url && !c.events.length && !c.lastUpdated) {
				return settings.importEvents(i);
			}
			return Promise.resolve();
		});
		await Promise.all(syncPromises);
		isSyncingBeforePrint = false;
		showSyncPrompt = false;
		await tick();
		setTimeout(() => {
			executePrint();
		}, 500);
	};

	const toggleHelp = () => {
		showHelp = !showHelp;
		const isHelpShown = showHelp;
		if (isHelpShown) {
			const isBrowserContext = browser;
			if (isBrowserContext) {
				pushState('', { modal: 'help' });
			}
			trackEvent('wizard_open');
		} else {
			const hasModal = browser && window.history.state?.modal;
			if (hasModal) {
				window.history.back();
			}
		}
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

	const handleConfigChange = (e: Event, panel: string) => {
		const target = e.target as HTMLElement;
		const name = target.id || target.getAttribute('name') || target.tagName.toLowerCase();
		let value = '';

		if (target instanceof HTMLInputElement) {
			if (target.type === 'checkbox') value = target.checked ? 'on' : 'off';
			else if (target.type === 'range') value = target.value;
			else if (target.type === 'color') value = target.value;
			else if (target.type === 'text') value = 'updated';
		} else if (target instanceof HTMLSelectElement) {
			value = target.value;
		}

		if (name) {
			trackEvent('config_change', {
				panel,
				setting_name: name,
				setting_value: value,
			});
		}
	};
	const openTemplatePicker = (
		allowedTemplates: { name: string; value: string }[],
		onSelect: (value: string) => void,
		currentTemplate: string = '',
	) => {
		galleryAllowedTemplates = allowedTemplates;
		galleryOnSelect = (val: string) => {
			const isWizardActive = showHelp;
			trackEvent('template_picker_select', {
				template_value: val,
				previous_template: currentTemplate,
				is_wizard: isWizardActive,
			});
			requestAnimationFrame(() => {
				onSelect(val);
			});
		};
		galleryCurrentTemplate = currentTemplate;
		isGalleryPickerMode = true;
		wasHelpOpenDuringPicker = showHelp;
		showGalleryModal = true;
		const isBrowserContext = browser;
		if (isBrowserContext) {
			pushState('', { modal: 'gallery' });
		}
	};
</script>

<svelte:head>
	<title>Remarkably Organized Planner v{appVersion}</title>
	<meta
		name="description"
		content="Build your custom planner with calendar views, habit trackers, collections, and more. Export a print-ready PDF for your reMarkable tablet." />
	{#if googleFontImport}
		{@html `<style type="text/css">${googleFontImport}</style>`}
	{/if}
</svelte:head>

{#if printManager.isPreparingPrint}
	<div class="print-overlay">
		<div
			class="print-modal"
			style="background-color: {settings.design.colorBg || '#ffffff'}; color: {settings
				.design.colorText};">
			<LoadingIcon font-size="3rem" style="opacity: 0.5; margin: 0 auto 1rem;" />
			<h3>Preparing PDF</h3>
			<p>Rendering pages... {Math.round(printManager.printProgress * 100)}%</p>
			<div class="progress-bar-container">
				<div class="progress-bar-fill" style="width: {printManager.printProgress * 100}%">
				</div>
			</div>
		</div>
	</div>
{/if}

{#if showHelp}
	<HelpModal
		onClose={onHelpClose}
		{settings}
		onOpenPresets={handleOpenPresets}
		onOpenGallery={handleOpenGallery}
		onPrint={handlePrint}
		{openTemplatePicker}
		{getAvailablePageTemplates}
		isLoading={!loadPages || isAnyCalendarUpdating} />
{/if}
{#if showPresetsModal}<PresetsModal
		onClose={onPresetsClose}
		onExport={() => exportConfig(settings)}
		{settings} />{/if}
{#if showGalleryModal}
	<GalleryModal
		onClose={handleGalleryClose}
		{settings}
		pickerMode={isGalleryPickerMode}
		allowedTemplates={galleryAllowedTemplates}
		onSelect={galleryOnSelect}
		currentTemplate={galleryCurrentTemplate} />
{/if}

{#if showMenu}
	<div
		class="menu no-print"
		transition:slide={{ duration: 200 }}
		onchange={(e) => handleConfigChange(e, 'design')}>
		<DesignPanel
			{settings}
			{fonts}
			{themePrints}
			bind:enableHighResolution
			bind:previewMode />
	</div>
{/if}
{#if showConfigMenu}
	<div
		class="config-menu no-print"
		transition:slide={{ duration: 150 }}
		onchange={(e) => handleConfigChange(e, 'backup')}>
		<BackupPanel
			onSave={handleBackupSave}
			onLoad={handleBackupLoad}
			onExport={handleBackupExport}
			onImport={handleBackupImport}
			onReset={resetConfig}
			onOpenPresets={handleBackupPresetsOpen} />
	</div>
{/if}
{#if showCalendarMenu}
	<div
		class="menu calendar-menu no-print"
		transition:slide={{ duration: 200 }}
		onchange={(e) => handleConfigChange(e, 'calendar')}>
		<CalendarPanel
			{settings}
			bind:customTimeframe
			{onTimeframeSelection}
			{onStartDateChange}
			{onEndDateChange}
			{getAvailablePageTemplates}
			{openTemplatePicker} />
	</div>
{/if}
{#if showCollectionsEventsMenu}
	<div
		class="menu collections-events-menu no-print"
		transition:slide={{ duration: 200 }}
		onchange={(e) => handleConfigChange(e, 'extras')}>
		<ExtrasPanel {settings} {getAvailablePageTemplates} {openTemplatePicker} />
	</div>
{/if}
<ControlButtons
	{previewMode}
	isExportingImage={printManager.isExportingImage}
	bind:isExportMode={printManager.isExportMode}
	bind:showConfigMenu
	bind:showMenu
	bind:showCalendarMenu
	bind:showCollectionsEventsMenu
	bind:showGalleryModal
	{handlePrint}
	{toggleCalendarMenu}
	{toggleCollectionsEventsMenu}
	{toggleMenu}
	{toggleHelp} />

<Toast />
<svelte:window bind:innerWidth={windowWidth} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<main
	bind:this={mainElement}
	use:carousel={{ enabled: previewMode === 'carousel' && loadPages }}
	style:--preview-scale={previewScale}
	style:--doc-width="{702}px"
	style:--doc-height="{702 * (1 / (settings.design.aspectRatio || 1))}px"
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
	style:font-size="{font.size}rem"
	class:side-nav-right={!settings.sideNav.leftSide}
	class:high-res={enableHighResolution}
	class:export-mode={printManager.isExportMode}
	class="view-{previewMode} group"
	onclick={(e) => {
		if (printManager.isExportMode) {
			const article = (e.target as HTMLElement).closest('article');
			if (article) {
				e.preventDefault();
				e.stopPropagation();
				printManager.captureTargetNode(article);
			}
		}
	}}>
	<StatsPanels
		{settings}
		pageStats={settings.pageStats}
		visits={$visits}
		created={$created}
		printed={$printed}
		shared={$shared}
		timeCreatingSeconds={$timeCreatingSeconds} />
	<div id="home" style="position: absolute; top: 0; left: 0;"></div>
	{#if !loadPages}
		{#each Array(4) as _, i}
			<article
				class="skeleton-loader"
				style="display: flex; align-items: center; justify-content: center; opacity: {1 -
					i * 0.15};">
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

	{#if showSyncPrompt}
		<SyncPromptModal
			isSyncing={isSyncingBeforePrint}
			onClose={() => (showSyncPrompt = false)}
			onPrintAnyway={() => {
				showSyncPrompt = false;
				executePrint();
			}}
			onSyncAndPrint={handleSyncAndPrint} />
	{/if}

	{#if isGeneratingSpreads}
		<div
			class="print-overlay"
			style="z-index: 9999999; display: flex; flex-direction: column; gap: 1rem; align-items: center; justify-content: center;">
			<div
				class="print-modal"
				style="display: flex; flex-direction: column; align-items: center; background-color: {settings
					.design.colorBg || '#ffffff'}; color: {settings.design.colorText};">
				<p
					style="font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
					<LoadingIcon /> Generating Planner...
				</p>
				<p style="opacity: 0.7; font-size: 0.9rem; margin: 0 0 1rem 0;">
					Adding pages ({totalSpreadsVisible}/{totalSpreadsExpected})
				</p>
				<div class="progress-bar-container" style="width: 100%; max-width: 250px;">
					<div
						class="progress-bar-fill"
						style="width: {(totalSpreadsVisible / Math.max(1, totalSpreadsExpected)) *
							100}%;">
					</div>
				</div>
			</div>
		</div>
	{/if}

	{#if !settings.yearPage.disable && loadPages}
		{#each settings.years.slice(0, visibleYearsCount) as year (year.id)}
			<YearPage {settings} {year} />
		{/each}
	{/if}
	{#if !settings.quarterPage.disable && loadPages}
		{#each settings.quarters.slice(0, visibleQuartersCount) as quarter (quarter.id)}
			<QuarterPage {settings} {quarter} />
		{/each}
	{/if}
	{#if !settings.monthPage.disable && loadPages}
		{#each settings.months.slice(0, visibleMonthsCount) as month (month.id)}
			<MonthPage {settings} {month} />
		{/each}
	{/if}
	{#if !settings.weekPage.disable && loadPages}
		{#each settings.weeks.slice(0, visibleWeeksCount) as week (week.id)}
			<WeekPage {settings} {week} />
		{/each}
	{/if}
	{#if !settings.dayPage.disable && loadPages}
		{#each settings.days.slice(0, visibleDaysCount) as day (day.id)}
			<DayPage {settings} {day} />
		{/each}
	{/if}
	{#if loadPages && !settings.customCollections.disable}
		{#each settings.collections.slice(0, visibleCollectionsCount) as collection (collection.id)}
			<CollectionPages {settings} {collection} />
		{/each}
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
			transition: background-color 0.3s ease;
		}

		@include tablet {
			main.export-mode {
				:global(article) {
					cursor: pointer !important;
					transition:
						transform 0.2s ease,
						box-shadow 0.2s ease !important;
					&:hover {
						transform: scale(1.02) !important;
						box-shadow:
							0 0 0 4px var(--action),
							var(--shadow-5) !important;
						z-index: 10;
					}
				}
			}
			main.view-grid {
				display: grid;
				grid-template-columns: repeat(4, max-content);
				justify-content: center;
				gap: 0.5rem;
				padding: 2rem;
				justify-items: center;
				align-items: start;
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
					&:hover {
						background-color: rgba(255, 255, 255, 0.5);
					}
				}
			}
		}
	}
	:global(main > article) {
		display: block;
		position: relative;
		background-color: var(--bg-pdf);
		width: var(--doc-width);
		height: var(--doc-height);
		will-change: transform, opacity;
		border-radius: 5px;
		overflow: hidden;
	}
	@include tablet {
		:global(main.view-grid > article) {
			margin: 0 !important;
			zoom: 0.35 !important;
		}
		:global(main.view-carousel > article) {
			margin: 0 !important;
			zoom: 0.8 !important;
			flex-shrink: 0;
			scroll-snap-align: center;
			transition: all 0.4s var(--ease-out-4);
			opacity: 0.3;
			filter: grayscale(80%) blur(2px);
			transform: scale(0.8);
			transform-origin: center center;
			box-shadow: var(--shadow-6) !important;
			border-radius: var(--radius-3);
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
	:global(main > article::before) {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: linear-gradient(
			110deg,
			transparent 30%,
			color-mix(in srgb, var(--text, currentColor) 12%, transparent) 50%,
			transparent 70%
		);
		background-size: 200% 100%;
		background-repeat: no-repeat;
		pointer-events: none;
		z-index: -1;
	}
	:global(main > article:not(.visible)::before) {
		opacity: 1;
		animation: shimmer 0.7s infinite linear;
	}
	:global(main > article.visible::before) {
		animation:
			shimmer 0.7s infinite linear,
			fadeOutShimmer 1.2s ease-out forwards;
	}
	:global(main > article.skeleton-loader::before) {
		display: none !important;
	}
	.skeleton-loader {
		background-image: linear-gradient(
			110deg,
			transparent 30%,
			color-mix(in srgb, var(--text, currentColor) 12%, transparent) 50%,
			transparent 70%
		);
		background-size: 200% 100%;
		background-repeat: no-repeat;
		animation: shimmer 0.7s infinite linear;
	}
	@keyframes fadeOutShimmer {
		0%,
		40% {
			opacity: 1;
		}
		100% {
			opacity: 0;
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
		:global(main > article::before) {
			display: none !important;
			animation: none !important;
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
		.no-print {
			display: none !important;
		}
	}

	:global(#bmc-iframe) {
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
		.export-image-trigger,
		.print-trigger,
		.gallery-trigger,
		.backup-trigger {
			position: relative;
		}

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
	.view-trigger {
		display: none;
		@include tablet {
			position: fixed;
			top: 1rem;
			right: 14rem;
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

	.print-overlay {
		position: fixed;
		inset: 0;
		background: rgba(15, 23, 42, 0.8);
		backdrop-filter: blur(8px);
		z-index: 999999;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}
	.print-modal {
		background: var(--bg);
		color: var(--text);
		padding: 2rem;
		border-radius: var(--radius-4);
		box-shadow: var(--shadow-5);
		width: 90%;
		max-width: 400px;
		text-align: center;
	}
	.progress-bar-container {
		height: 8px;
		background: rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		overflow: hidden;
		margin-top: 1rem;
	}
	.progress-bar-fill {
		height: 100%;
		background: var(--brand-gradient);
		background-size: 200% auto;
		animation: gradient-shift 3s ease infinite;
		transition: width 0.1s;
	}
	@media print {
		.print-overlay {
			display: none !important;
		}
	}
</style>
