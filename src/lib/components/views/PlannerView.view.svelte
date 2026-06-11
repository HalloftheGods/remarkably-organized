<script lang="ts">
	import { page } from '$app/state';
	import { replaceState, pushState } from '$app/navigation';
	import { onMount, tick, setContext, untrack } from 'svelte';
	import { slide } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import LoadingIcon from '~icons/eos-icons/bubble-loading';
	import { PlannerSettings } from '$lib/state/planner-settings.svelte';
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

	import GalleryModal from '$organisms/GalleryModal.organism.svelte';
	import StatsPanels from '$organisms/StatsPanels.organism.svelte';
	import ControlButtons from '$organisms/ControlButtons.organism.svelte';
	import PageSizePanel from '$organisms/PageSizePanel.organism.svelte';
	import { browser } from '$app/environment';
	import { fonts, getGoogleFontURL } from '$lib';
	import { PRESETS, type Preset } from '$lib/data/presets';
	import Toast from '$molecules/Toast.molecule.svelte';

	import { toast, PrintManager } from '$state';
	import pkg from '../../../../package.json';
	import { trackEvent } from '$lib/analytics';
	import LZString from 'lz-string';
	import {
		carousel,
		saveConfig,
		loadConfig,
		exportConfig,
		importConfig,
		resetConfig,
		ensureLightness,
	} from '$lib';
	import {
		PAGE_TEMPLATES as pageTemplates,
		getAvailablePageTemplates,
	} from '$lib/data/templates';
	import {
		setDateMechanic,
		setFormatterMechanic,
		setEventMechanic,
		setGridMechanic,
		setAgendaMechanic,
	} from '$lib/mechanics';

	const appVersion = pkg.version.split('.').slice(0, 2).join('.');
	let {
		settings,
		preset,
		isPrintPreview = false,
	}: { settings: PlannerSettings; preset?: Preset; isPrintPreview?: boolean } = $props();

	const textCover = $derived(
		settings.coverPage.darkBackground
			? ensureLightness(settings.design.colorCoverText || settings.design.colorText, 0.6)
			: settings.design.colorCoverText || settings.design.colorText,
	);

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
	let windowHeight = $state(900);
	let previewMode: 'single' | 'list' | 'grid' | 'carousel' = $state('single');
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

	const previewScale = $derived.by(() => {
		if (!windowWidth) return 1;
		let scale = windowWidth < docWidth + 40 ? (windowWidth - 40) / docWidth : 1;

		if (previewMode === 'single' && windowHeight) {
			const verticalPadding = 75; // Accounts for top/bottom padding and UI elements (buttons, etc)
			const maxHeight = windowHeight - verticalPadding;
			const currentScaledHeight = docHeight * scale;

			if (currentScaledHeight > maxHeight) {
				scale = maxHeight / docHeight;
			}
		}
		return scale;
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

	let customTimeframe = $state(false);
	const hasSettings = !!page.params?.settings || page.url.searchParams.has('settings');
	const hasPresetsParam = page.url.searchParams.get('presets') === 'true';
	const isHelpParamActive = page.url.searchParams.get('help') !== '0';
	const hasPreset = page.url.searchParams.has('preset');
	const hasPrintParam = page.url.searchParams.get('print') === '1';
	let showHelp = $state(
		!isPrintPreview &&
			isHelpParamActive &&
			!hasPresetsParam &&
			!hasSettings &&
			!hasPreset &&
			!hasPrintParam,
	);
	let showPresetsModal = $state(hasPresetsParam);
	let showGalleryModal = $state(false);
	let isGalleryPickerMode = $state(false);
	let wasHelpOpenDuringPicker = $state(false);
	let galleryAllowedTemplates = $state<{ name: string; value: string }[]>([]);
	let galleryOnSelect = $state<(value: string) => void>(() => {});
	let galleryCurrentTemplate = $state('');

	let showMenu = $state(false);
	let showPageSizeMenu = $state(false);

	const printManager = new PrintManager(() => settings);
	setContext('printManager', printManager);
	setContext('settings', settings);
	setDateMechanic(settings);
	setFormatterMechanic(settings);
	setEventMechanic(settings);
	setGridMechanic(settings);
	setAgendaMechanic(settings);
	export const getPrintManager = () => printManager;

	let currentHash = $state<string>('');

	let isProgrammaticHashChange = false;

	$effect(() => {
		if (browser) {
			// Initialize hash after hydration to avoid mismatch
			if (!currentHash && window.location.hash) {
				currentHash = window.location.hash.substring(1);
			}

			const handleHashChange = () => {
				if (isProgrammaticHashChange) return;
				const newHash = window.location.hash.substring(1);
				if (currentHash !== newHash) {
					currentHash = newHash;
				}
			};
			window.addEventListener('hashchange', handleHashChange);
			return () => window.removeEventListener('hashchange', handleHashChange);
		}
	});

	$effect(() => {
		if (browser && currentHash && window.location.hash !== `#${currentHash}`) {
			isProgrammaticHashChange = true;
			const url = new URL(document.location.href);
			url.hash = currentHash;
			safeReplaceState(url);
			window.dispatchEvent(new HashChangeEvent('hashchange'));
			isProgrammaticHashChange = false;
		}
	});

	$effect(() => {
		if (previewMode === 'single' && !currentHash) {
			if (!settings.coverPage.disable) {
				currentHash = 'cover';
			} else if (!settings.dashboardPage.disable) {
				currentHash = 'dashboard';
			} else if (settings.years.length > 0 && !settings.yearPage.disable) {
				currentHash = settings.years[0].id;
			} else if (settings.quarters.length > 0 && !settings.quarterPage.disable) {
				currentHash = settings.quarters[0].id;
			} else if (settings.months.length > 0 && !settings.monthPage.disable) {
				currentHash = settings.months[0].id;
			} else if (settings.weeks.length > 0 && !settings.weekPage.disable) {
				currentHash = settings.weeks[0].id;
			} else if (settings.days.length > 0 && !settings.dayPage.disable) {
				currentHash = settings.days[0].id;
			}
		}
	});

	function handleLinkClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		const link = target.closest('a');
		if (link && link.hash) {
			const hash = link.hash.substring(1);
			currentHash = hash;
			if (previewMode === 'single') {
				// Prevent default if we're in single mode to avoid scrolling
				// The hash change above will trigger the view update
				// e.preventDefault();
				// Actually, we want the hash to update in the URL too.
			}
		}
	}

	$effect(() => {
		if (previewMode !== 'grid') {
			printManager.isExportMode = false;
		}
	});
	let enableHighResolution = $state(page.url.searchParams.has('highres'));
	let loadPages = $state(
		!showHelp && (browser || page.url.searchParams.get('load') === '1'),
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

	let lastYears = $state.raw(settings.years);
	let lastQuarters = $state.raw(settings.quarters);
	let lastMonths = $state.raw(settings.months);
	let lastWeeks = $state.raw(settings.weeks);
	let lastDays = $state.raw(settings.days);
	let lastCollections = $state.raw(settings.collections);

	let lastLayout = $state.raw(untrack(() => ({
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
			.map((c: any) => `${c.type}-${c.total}-${c.numPagesPerItem}-${c.columns}`)
			.join(','),
	})));

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
		// Track these values to ensure the effect re-runs during generation
		visibleYearsCount;
		visibleQuartersCount;
		visibleMonthsCount;
		visibleWeeksCount;
		visibleDaysCount;
		visibleCollectionsCount;

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
			let isRunning = true;
			const tick = () => {
				if (!isRunning) return;
				let changed = false;
				if (visibleYearsCount < expectedYears) {
					visibleYearsCount = Math.min(expectedYears, visibleYearsCount + 2);
					changed = true;
				}
				if (visibleQuartersCount < expectedQuarters) {
					visibleQuartersCount = Math.min(expectedQuarters, visibleQuartersCount + 4);
					changed = true;
				}
				if (visibleMonthsCount < expectedMonths) {
					visibleMonthsCount = Math.min(expectedMonths, visibleMonthsCount + 6);
					changed = true;
				}
				if (visibleWeeksCount < expectedWeeks) {
					visibleWeeksCount = Math.min(expectedWeeks, visibleWeeksCount + 10);
					changed = true;
				}
				if (visibleDaysCount < expectedDays) {
					visibleDaysCount = Math.min(expectedDays, visibleDaysCount + 20);
					changed = true;
				}
				if (visibleCollectionsCount < expectedCollections) {
					visibleCollectionsCount = Math.min(
						expectedCollections,
						visibleCollectionsCount + 5,
					);
					changed = true;
				}
				if (changed) {
					requestAnimationFrame(tick);
				}
			};
			requestAnimationFrame(tick);
			return () => {
				isRunning = false;
			};
		}
	});

	let totalSpreadsExpected = $derived(settings.pageStats.total);

	let totalSpreadsVisible = $derived(
		(loadPages && !settings.coverPage.disable ? 1 : 0) +
			(loadPages && !settings.dashboardPage.disable ? 1 : 0) +
			visibleYearsCount * (1 + settings.yearPage.notePagesAmount) +
			visibleQuartersCount * (1 + settings.quarterPage.notePagesAmount) +
			visibleMonthsCount * (1 + settings.monthPage.notePagesAmount) +
			visibleWeeksCount * (1 + settings.weekPage.notePagesAmount) +
			visibleDaysCount * (1 + settings.dayPage.notePagesAmount) +
			settings.collections.slice(0, visibleCollectionsCount).reduce((sum, c) => {
				const indexPages = c.numIndexPages ?? 0;
				const totalItems = c.total * Math.max(1, indexPages);
				const itemPages = totalItems * (c.numPagesPerItem ?? 1);
				return sum + indexPages + itemPages;
			}, 0),
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
			safeReplaceState(document.location.href, { modal: 'help' });
		} else if (showPresetsModal) {
			safeReplaceState(document.location.href, { modal: 'presets' });
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
			showPageSizeMenu = modalName === 'pagesize';
			showMenu = modalName === 'design';
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
			loadPages = true;
		}
	});

	const isAnyCalendarUpdating = $derived(settings.calendars.some((c) => c.updating));

	function safeReplaceState(url: URL | string, state: any = {}) {
		if (browser) {
			try {
				replaceState(url, state);
			} catch (e: any) {
				if (e?.message?.includes('before router is initialized')) {
					setTimeout(() => safeReplaceState(url, state), 50);
				} else {
					console.warn('replaceState failed:', e);
				}
			}
		}
	}

	function safePushState(url: URL | string, state: any = {}) {
		if (browser) {
			try {
				pushState(url, state);
			} catch (e: any) {
				if (e?.message?.includes('before router is initialized')) {
					setTimeout(() => safePushState(url, state), 50);
				} else {
					console.warn('pushState failed:', e);
				}
			}
		}
	}

	let settingsUrlInitialized = false;
	let showConfigMenu = $state(false);
	let themePrints = $state<Record<string, number>>({});
	let showCalendarMenu = $state(false);
	let showCollectionsEventsMenu = $state(false);
	let settingsUrlTimer: ReturnType<typeof setTimeout>;
	$effect(() => {
		settings.serialize();

		clearTimeout(settingsUrlTimer);
		settingsUrlTimer = setTimeout(() => {
			const isBrowser = browser;
			if (!isBrowser || isPrintPreview) return;

			const url = new URL(document.location.href);
			const edits = settings.getEdits();
			const basePlannerUrl = url.pathname.substring(
				0,
				url.pathname.indexOf('/planner') + 8,
			);

			if (currentHash) {
				url.hash = currentHash;
			}

			const currentPreset = preset || page.data.preset;
			const hasCurrentPreset = !!currentPreset;

			let isPresetUnmodified = false;
			if (hasCurrentPreset) {
				const presetSettings = new PlannerSettings(currentPreset.config);
				isPresetUnmodified =
					JSON.stringify(edits) === JSON.stringify(presetSettings.getEdits());
			}

			const shouldRestorePresetUrl = isPresetUnmodified && hasCurrentPreset;
			const hasEdits = edits && Object.keys(edits).length > 0;
			const shouldUpdateToCompressedUrl = !shouldRestorePresetUrl && hasEdits;
			const shouldResetToBaseUrl =
				!shouldRestorePresetUrl && !shouldUpdateToCompressedUrl && settingsUrlInitialized;

			// Provide subtle visual feedback that settings synced to URL
			if (shouldUpdateToCompressedUrl) {
				toast.success('Settings synced to URL', 1500);
			}

			if (shouldRestorePresetUrl) {
				url.pathname = `${basePlannerUrl}/${currentPreset.id}`;
				url.searchParams.delete('settings');
				url.searchParams.delete('preset');
				safeReplaceState(url);
			} else if (shouldUpdateToCompressedUrl) {
				const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(edits));
				url.pathname = `${basePlannerUrl}/${compressed}`;
				url.searchParams.delete('settings');
				url.searchParams.delete('preset');
				safeReplaceState(url);
			} else if (shouldResetToBaseUrl) {
				url.pathname = basePlannerUrl;
				url.searchParams.delete('settings');
				url.searchParams.delete('preset');
				safeReplaceState(url);
			}
			settingsUrlInitialized = true;
		}, 1000);
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
		if (browser) safePushState('', { modal: 'presets' });
	}

	function handleBackupPresetsOpen() {
		showConfigMenu = false;
		showPresetsModal = true;
		if (browser) safePushState('', { modal: 'presets' });
	}

	function handleOpenGallery() {
		showHelp = false;
		isGalleryPickerMode = false;
		showGalleryModal = true;
		if (browser) {
			safePushState('', { modal: 'gallery' });
		}
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
		loadConfig(settings);
		showConfigMenu = false;
	}

	function handleBackupExport() {
		exportConfig(settings);
		showConfigMenu = false;
	}

	function handleBackupImport() {
		importConfig(settings);
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

	// Update the page aspect ratio based on the page size and orientation
	$effect(() => {
		settings.design.aspectRatio =
			settings.design.orientation === 'portrait' ? portraitRatio : 1 / portraitRatio;
	});

	// Update the page printing resolution
	$effect(() => {
		let element = document.getElementById('page-resolution-style');
		if (!element) {
			element = document.createElement('style');
			element.id = 'page-resolution-style';
			document.head.appendChild(element);
		}

		// Always base the PDF width on the docWidth scaled for printing
		const printWidth = enableHighResolution ? docWidth * 2 : docWidth;
		const printHeight = printWidth / (settings.design.aspectRatio || portraitRatio);

		const sizeRule = `size: ${Math.round(printWidth)}px ${Math.round(printHeight)}px;`;
		element.innerHTML = `@page { ${sizeRule} margin: 0; }`;
	});

	const toggleConfigMenu = () => {
		showConfigMenu = !showConfigMenu;
		if (showConfigMenu) {
			if (browser) safePushState('', { modal: 'config' });
			trackEvent('config_menu_toggle', { menu: 'backup' });
			showMenu = false;
			showCalendarMenu = false;
			showCollectionsEventsMenu = false;
			showPageSizeMenu = false;
		} else if (browser && window.history.state?.modal) {
			window.history.back();
		}
	};

	const toggleCalendarMenu = () => {
		showCalendarMenu = !showCalendarMenu;
		if (showCalendarMenu) {
			if (browser) safePushState('', { modal: 'calendar' });
			trackEvent('config_menu_toggle', { menu: 'calendar' });
			showMenu = false;
			showConfigMenu = false;
			showCollectionsEventsMenu = false;
			showPageSizeMenu = false;
		} else if (browser && window.history.state?.modal) {
			window.history.back();
		}
	};

	const toggleMenu = () => {
		showMenu = !showMenu;
		if (showMenu) {
			if (browser) safePushState('', { modal: 'design' });
			trackEvent('config_menu_toggle', { menu: 'design' });
			showConfigMenu = false;
			showCalendarMenu = false;
			showCollectionsEventsMenu = false;
			showPageSizeMenu = false;
		} else if (browser && window.history.state?.modal) {
			window.history.back();
		}
	};

	const toggleCollectionsEventsMenu = () => {
		showCollectionsEventsMenu = !showCollectionsEventsMenu;
		if (showCollectionsEventsMenu) {
			if (browser) safePushState('', { modal: 'extras' });
			trackEvent('config_menu_toggle', { menu: 'extras' });
			showMenu = false;
			showConfigMenu = false;
			showCalendarMenu = false;
			showPageSizeMenu = false;
		} else if (browser && window.history.state?.modal) {
			window.history.back();
		}
	};

	const togglePageSizeMenu = () => {
		showPageSizeMenu = !showPageSizeMenu;
		if (showPageSizeMenu) {
			if (browser) safePushState('', { modal: 'pagesize' });
			trackEvent('config_menu_toggle', { menu: 'pagesize' });
			showMenu = false;
			showConfigMenu = false;
			showCalendarMenu = false;
			showCollectionsEventsMenu = false;
		} else if (browser && window.history.state?.modal) {
			window.history.back();
		}
	};

	const handlePrint = () => {
		executePrint();
	};

	const executePrint = async () => {
		showHelp = false;
		showPresetsModal = false;
		showGalleryModal = false;
		showMenu = false;
		showPageSizeMenu = false;

		const edits = settings.getEdits();
		const currentPreset = preset || page.data.preset;

		let printUrl = '/print';
		if (currentPreset) {
			const presetSettings = new PlannerSettings(currentPreset.config);
			const isPresetUnmodified =
				JSON.stringify(edits) === JSON.stringify(presetSettings.getEdits());
			const presetId = currentPreset.id.replace(/^\/+/, '');
			if (isPresetUnmodified) {
				printUrl = `/print/${presetId}`;
			} else {
				const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(edits));
				printUrl = `/print/${compressed}`;
			}
		} else if (Object.keys(edits).length > 0) {
			const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(edits));
			printUrl = `/print/${compressed}`;
		}

		window.open(printUrl, '_blank');
	};

	const toggleHelp = () => {
		showHelp = !showHelp;
		const isHelpShown = showHelp;
		if (isHelpShown) {
			if (browser) {
				safePushState('', { modal: 'help' });
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
			safePushState('', { modal: 'gallery' });
		}
	};
</script>

<svelte:head>
	<title>My Remarkably Organized Planner v{appVersion}</title>
	<meta
		name="description"
		content="Build your custom planner with calendar views, habit trackers, collections, and more. Export a print-ready PDF for your reMarkable tablet." />
	{#if googleFontImport}
		{@html `<style type="text/css">${googleFontImport}</style>`}
	{/if}
</svelte:head>

{#if printManager.isPreparingPrint && !isPrintPreview}
	<div class="print-overlay">
		<div
			class="print-modal"
			style="background-color: {settings.design.colorBg || '#ffffff'}; color: {settings
				.design.colorText};">
			<svg width="0" height="0" style="position: absolute;">
				<linearGradient id="loader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stop-color="#7c3aed" />
					<stop offset="50%" stop-color="#06b6d4" />
					<stop offset="100%" stop-color="#a78bfa" />
				</linearGradient>
			</svg>
			<LoadingIcon
				font-size="3rem"
				style="fill: url(#loader-gradient) !important; stroke: url(#loader-gradient) !important; color: url(#loader-gradient) !important; margin: 0 auto 1rem;" />
			<h3>
				{printManager.printProgress === 1
					? 'Abracadabra! Be sure to "Save as PDF"'
					: 'Preparing Planner, Please Wait.'}
			</h3>
			<div class="flex justify-evenly w-full text-sm mt-2">
				<span>
					{printManager.printProgress === 1
						? 'Sending print job to browser, please wait...'
						: 'Remarkably Organizing pages, please wait...'}
				</span>
				<span>{printManager.renderedPages}/{printManager.totalPages}</span>
				<span>{Math.round(printManager.printProgress * 100)}%</span>
			</div>
			<div class="progress-bar-container">
				<div class="progress-bar-fill" style="width: {printManager.printProgress * 100}%">
				</div>
			</div>
			<div class="flex justify-between w-full text-xs mt-2 opacity-75">
				<span>Elapsed: {printManager.elapsedTimeFormatted}</span>
				<span>Remaining: {printManager.remainingTimeFormatted}</span>
			</div>
			<p class="text-sm mt-3 opacity-75">
				Go grab a coffee, for the
				<a
					href="https://buymeacoffee.com/youmeos"
					target="_blank"
					class="text-underline coffee-link"
					style="">
					both of us!
				</a>
			</p>
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
		isLoading={!loadPages || isAnyCalendarUpdating || isGeneratingSpreads} />
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
{#if showPageSizeMenu}
	<div
		class="pagesize-menu no-print"
		transition:slide={{ duration: 150 }}
		onchange={(e) => handleConfigChange(e, 'design')}>
		<PageSizePanel {settings} />
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
			onReset={() => resetConfig(settings)}
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
{#if !isPrintPreview}
	<ControlButtons
		{previewMode}
		isExportingImage={printManager.isExportingImage}
		bind:isExportMode={printManager.isExportMode}
		bind:showConfigMenu
		bind:showMenu
		bind:showCalendarMenu
		bind:showCollectionsEventsMenu
		bind:showPageSizeMenu
		bind:showGalleryModal
		{handlePrint}
		{toggleCalendarMenu}
		{toggleCollectionsEventsMenu}
		{togglePageSizeMenu}
		{toggleMenu}
		{toggleHelp} />

	<Toast />
{/if}
<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

{#if !isPrintPreview}
	<StatsPanels
		{settings}
		pageStats={settings.pageStats}
		visits={$visits}
		created={$created}
		printed={$printed}
		shared={$shared}
		timeCreatingSeconds={$timeCreatingSeconds} />
	<div id="home" style="position: absolute; top: 0; left: 0;"></div>
{/if}

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<main
	bind:this={mainElement}
	style:font-family="var(--font)"
	use:carousel={{ enabled: previewMode === 'carousel' && loadPages }}
	style:--preview-scale={previewScale}
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
	style:--text-cover={textCover}
	style:--outline={settings.design.colorLines}
	style:--dots-color={settings.design.colorDots}
	style:font-size="{font.size}rem"
	class:side-nav-right={!settings.sideNav.leftSide}
	class:side-nav-split={settings.sideNav.isSplit}
	class:high-res={enableHighResolution}
	class:export-mode={printManager.isExportMode}
	class:view-single={!isPrintPreview && previewMode === 'single'}
	class:view-grid={!isPrintPreview && previewMode === 'grid'}
	class:view-list={!isPrintPreview && previewMode === 'list'}
	class:view-carousel={!isPrintPreview && previewMode === 'carousel'}
	class="planner-view-container group"
	onclick={(e) => {
		if (printManager.isExportMode) {
			const article = (e.target as HTMLElement).closest('article');
			if (article) {
				e.preventDefault();
				e.stopPropagation();
				printManager.captureTargetNode(article);
			}
		}
		handleLinkClick(e);
	}}>
	{#if !loadPages}
		<article
			class="skeleton-loader force-visible"
			style="display: flex; align-items: center; justify-content: center; opacity: 1;">
			<LoadingIcon font-size="3rem" style="opacity: 0.2;" />
		</article>
	{/if}
	{#if !settings.coverPage.disable && loadPages}
		<CoverPage
			{settings}
			isPreparingPrint={printManager.isPreparingPrint}
			forceVisible={previewMode === 'single' && currentHash === 'cover'} />
	{/if}
	{#if !settings.dashboardPage.disable && loadPages}
		<DashboardPage
			{settings}
			isPreparingPrint={printManager.isPreparingPrint}
			forceVisible={previewMode === 'single' && currentHash === 'dashboard'} />
	{/if}

	{#if isGeneratingSpreads && !showHelp}
		{@const presetId = page.url.searchParams.get('preset')}
		{@const activePreset = PRESETS.find((p) => p.id === presetId)}
		<div
			class="print-overlay"
			style="z-index: 999; display: flex; flex-direction: column; gap: 1rem; align-items: center; justify-content: center;">
			<div
				class="print-modal"
				style="display: flex; flex-direction: column; align-items: center; background-color: {settings
					.design.colorBg || '#ffffff'}; color: {settings.design.colorText};">
				<p
					style="font-size: 1.5rem; font-weight: 600; margin: 0 0 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
					<LoadingIcon class="animated-gradient-icon" />
					{#if activePreset}
						Generating {activePreset.icon} {activePreset.name}...
					{:else}
						Generating Planner...
					{/if}
				</p>
				<p style="font-size: 1.2rem; margin: 0 0 1rem 0;">
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
		{#each settings.years as year (year.id)}
			<YearPage
				{settings}
				{year}
				{currentHash}
				isPreparingPrint={printManager.isPreparingPrint}
				forceVisible={isPrintPreview ||
					(previewMode === 'single' &&
						currentHash.toLowerCase() === year.id.toLowerCase())} />
		{/each}
	{/if}
	{#if !settings.quarterPage.disable && loadPages}
		{#each settings.quarters as quarter, i (quarter.id)}
			{#if i < visibleQuartersCount || currentHash
					.toLowerCase()
					.startsWith(quarter.id.toLowerCase()) || printManager.isPreparingPrint}
				<QuarterPage
					{settings}
					{quarter}
					{currentHash}
					isPreparingPrint={printManager.isPreparingPrint}
					forceVisible={previewMode === 'single' &&
						currentHash.toLowerCase() === quarter.id.toLowerCase()} />
			{/if}
		{/each}
	{/if}
	{#if !settings.monthPage.disable && loadPages}
		{#each settings.months as month, i (month.id)}
			{#if isPrintPreview || i < visibleMonthsCount || currentHash
					.toLowerCase()
					.startsWith(month.id.toLowerCase()) || printManager.isPreparingPrint}
				<MonthPage
					{settings}
					{month}
					{currentHash}
					isPreparingPrint={printManager.isPreparingPrint}
					forceVisible={isPrintPreview ||
						(previewMode === 'single' &&
							currentHash.toLowerCase() === month.id.toLowerCase())} />
			{/if}
		{/each}
	{/if}
	{#if !settings.weekPage.disable && loadPages}
		{#each settings.weeks as week, i (week.id)}
			{#if i < visibleWeeksCount || currentHash
					.toLowerCase()
					.startsWith(week.id.toLowerCase()) || currentHash
					.toLowerCase()
					.startsWith(`${week.year}-w${week.weekSinceYear}`.toLowerCase()) || printManager.isPreparingPrint}
				<WeekPage
					{settings}
					{week}
					{currentHash}
					isPreparingPrint={printManager.isPreparingPrint}
					forceVisible={previewMode === 'single' &&
						(currentHash.toLowerCase() === week.id.toLowerCase() ||
							`${week.year}-w${week.weekSinceYear}`.toLowerCase() ===
								currentHash.toLowerCase())} />
			{/if}
		{/each}
	{/if}
	{#if !settings.dayPage.disable && loadPages}
		{#each settings.days as day, i (day.id)}
			{#if isPrintPreview || i < visibleDaysCount || currentHash
					.toLowerCase()
					.startsWith(day.id.toLowerCase()) || printManager.isPreparingPrint}
				<DayPage
					{settings}
					{day}
					{currentHash}
					isPreparingPrint={printManager.isPreparingPrint}
					forceVisible={isPrintPreview ||
						(previewMode === 'single' &&
							currentHash.toLowerCase() === day.id.toLowerCase())} />
			{/if}
		{/each}
	{/if}
	{#if loadPages && !settings.customCollections.disable}
		{#each settings.collections as collection, i (collection.id)}
			{#if isPrintPreview || i < visibleCollectionsCount || currentHash
					.toLowerCase()
					.startsWith(collection.id.toLowerCase()) || printManager.isPreparingPrint}
				<CollectionPages
					{settings}
					{collection}
					isPreparingPrint={printManager.isPreparingPrint}
					activeHash={isPrintPreview
						? 'override'
						: previewMode === 'single'
							? currentHash
							: ''}
					forceVisible={isPrintPreview} />
			{/if}
		{/each}
	{/if}
</main>

<style>
	.planner-view-container {
		font-family: var(--font);

		@supports (color: oklch(from var(--text) calc(l - 0.15) c h)) {
			--text-low: oklch(from var(--text) calc(l + 0.2) c h);
			--text-high: oklch(from var(--text) calc(l - 0.15) c h);
			--outline-low: oklch(from var(--outline) calc(l + 0.03) c h);
			--outline-high: oklch(from var(--outline) max(0, calc(l - 0.1)) c h);
		}

		@media screen {
			overflow-y: auto;
			width: 100%;
			max-height: 100vh;
			transition: background-color 0.3s ease;

			&.view-single {
				display: grid;
				place-items: center;
				min-height: 100vh;
				padding: 2rem;
				overflow: hidden;
			}
		}

		@media screen and (min-width: 768px) {
			&.view-grid {
				display: grid;
				grid-template-columns: repeat(4, max-content);
				justify-content: center;
				gap: 0.5rem;
				padding: 2rem;
				justify-items: center;
				align-items: start;
			}

			&.view-carousel {
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
		}

		:global {
			& > article {
				display: block;
				position: relative;
				background-color: var(--bg-pdf);
				width: var(--doc-width);
				height: var(--doc-height);
				will-change: transform, opacity;
				border-radius: 5px;
				overflow: hidden;

				&::before {
					content: '';
					position: absolute;
					inset: 0;
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

				&:not(.visible)::before {
					opacity: 1;
					animation: shimmer 0.7s infinite linear;
				}

				&.visible::before {
					animation:
						shimmer 0.7s infinite linear,
						fadeOutShimmer 1.2s ease-out forwards;
				}

				&.skeleton-loader {
					background-image: linear-gradient(
						110deg,
						transparent 30%,
						color-mix(in srgb, var(--text, currentColor) 12%, transparent) 50%,
						transparent 70%
					);
					background-size: 200% 100%;
					background-repeat: no-repeat;
					animation: shimmer 0.7s infinite linear;

					&::before {
						display: none !important;
					}
				}
			}

			&.view-single > article {
				display: none;
				margin: 0 !important;

				&.force-visible {
					display: block;
				}
			}

			&.view-grid > article {
				@media screen and (min-width: 768px) {
					margin: 0 !important;
					zoom: 0.35 !important;
				}
			}

			&.view-carousel > article {
				@media screen and (min-width: 768px) {
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

					&.carousel-active {
						opacity: 1;
						filter: grayscale(0%) blur(0px);
						transform: scale(1.05);
						z-index: 10;
						box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
						cursor: default;
					}
				}
			}

			&.export-mode > article {
				@media (min-width: 768px) {
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

			@media print {
				& > article {
					display: block !important;
					will-change: auto !important;
					break-after: page;
					page-break-after: always;
					margin: 0 !important;
				}
				& > article:last-of-type {
					break-after: auto;
					page-break-after: auto;
				}
				&.high-res > article {
					zoom: 2;
				}
				& > article::before {
					display: none !important;
					animation: none !important;
				}
			}
		}
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

	.menu {
		position: fixed;
		bottom: 5rem;
		right: 1rem;
		background-color: var(--bg);
		z-index: 50;
		width: 400px;
		max-width: calc(100vw - 2rem);
		max-height: 80vh;
		border-radius: var(--radius-5);
		box-shadow: var(--shadow-4);
		padding: 0 2rem 1rem;
		overflow-y: auto;
		overflow-x: hidden;
	}

	@media (min-width: 768px) {
		.menu {
			right: 2rem;
		}
	}

	.menu::-webkit-scrollbar {
		width: 0.4rem;
		height: 0.4rem;
	}
	.menu::-webkit-scrollbar-track {
		background: transparent;
	}
	.menu::-webkit-scrollbar-thumb {
		background-color: var(--outline);
		border-radius: 9999px;
	}
	.menu::-webkit-scrollbar-thumb:hover {
		background-color: var(--text-low);
	}

	.menu::-webkit-scrollbar-track-piece:start {
		margin-top: var(--radius-5);
	}
	.menu::-webkit-scrollbar-track-piece:end {
		margin-bottom: var(--radius-5);
	}

	@media print {
		.no-print {
			display: none !important;
		}
	}

	:global(#bmc-iframe) :global(iframe[src*='buymeacoffee']) {
		height: 520px !important;
		border-radius: var(--radius-4) !important;
		box-shadow: var(--shadow-5) !important;
		border: 1px solid var(--outline) !important;
	}
	:global(#bmc-iframe) :global(iframe[src*='buymeacoffee'])::-webkit-scrollbar {
		width: 0.4rem !important;
	}
	:global(#bmc-iframe) :global(iframe[src*='buymeacoffee'])::-webkit-scrollbar-track {
		background: transparent !important;
	}
	:global(#bmc-iframe) :global(iframe[src*='buymeacoffee'])::-webkit-scrollbar-thumb {
		background-color: var(--outline) !important;
		border-radius: 9999px !important;
	}
	:global(#bmc-iframe)
		:global(iframe[src*='buymeacoffee'])::-webkit-scrollbar-thumb:hover {
		background-color: var(--text-low) !important;
	}

	.export-image-trigger,
	.print-trigger,
	.gallery-trigger,
	.backup-trigger {
		position: relative;
	}

	:global(#bmc-iframe)::before {
		top: 100%;
		left: 50%;
		margin-top: 0.75rem;
		transform: translateX(-50%) translateY(-0.25rem) scale(0.9);
		transform-origin: top center;
	}
	:global(#bmc-iframe):hover::before {
		transform: translateX(-50%) translateY(0) scale(1);
	}

	.view-trigger {
		display: none;
	}

	@media (min-width: 768px) {
		.view-trigger {
			position: fixed;
			top: 1rem;
			right: 14rem;
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
			transition: color 0.2s ease;
		}
		.view-trigger:hover {
			color: black;
		}
	}

	.config-menu {
		position: fixed;
		top: 5rem;
		right: 1rem;
		width: 330px;
		max-width: calc(100vw - 2rem);
		background-color: var(--bg);
		border-radius: var(--radius-4);
		box-shadow: var(--shadow-5);
		padding: 1.5rem;
		z-index: 50;
		display: flex;
		flex-direction: column;
		gap: 1rem;
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

	@media (min-width: 768px) {
		.config-menu {
			right: 2rem;
		}
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
		max-width: 600px;
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

	.coffee-link {
		cursor: pointer;
		font-weight: 500;
		text-decoration: underline;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		background: var(--brand-gradient, linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%));
		background-size: 200% auto;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: gradient-shift 4s ease-in-out infinite;
	}

	@media print {
		.print-overlay {
			display: none !important;
		}
	}
</style>
