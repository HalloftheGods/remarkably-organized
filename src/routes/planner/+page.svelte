<script lang="ts">
	import { page } from '$app/state';
	import { replaceState } from '$app/navigation';
	import { onMount, tick } from 'svelte';
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
	import PresetsModal from './PresetsModal.svelte';
	import SyncPromptModal from './SyncPromptModal.svelte';
	import { browser } from '$app/environment';
	import { fonts, getGoogleFontURL } from '../fonts/fonts';
	import Toast from '$lib/components/Toast.svelte';
	import { toast } from '$lib/components/toast.state.svelte';
	import pkg from '../../../package.json';
	import { trackEvent } from '$lib/analytics';

	const appVersion = pkg.version.split('.').slice(0, 2).join('.');
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
		{ name: 'Quarter Calendar', value: 'calendar-quarter' },
		{ name: 'Quarter Goals', value: 'goals-quarter' },
		{ name: 'Quarter Overview', value: 'overview-quarter' },
		{ name: 'Monthly Calendar', value: 'calendar-month' },
		{ name: 'Monthly Calendar - With Notes', value: 'calendar-month-with-notes' },
		{ name: 'Daily Agenda', value: 'agenda-day' },
		{ name: 'Daily Agenda - Executive', value: 'agenda-day-executive' },
		{ name: 'Daily Agenda - Time-Boxer', value: 'agenda-day-timebox' },
		{ name: 'Daily Agenda - Mindful', value: 'agenda-day-mindful' },
		{ name: 'Weekly Agenda', value: 'agenda-week' },
		{ name: 'Yearly Notes', value: 'notes-year' },
		{ name: 'Quarterly Notes', value: 'notes-quarter' },
		{ name: 'Weekly Notes', value: 'notes-week' },
		{ name: 'Weekly Notes - Columns', value: 'notes-week-columns' },
		{ name: 'Weekly Notes - Rows', value: 'notes-week-rows' },
		{ name: 'Daily Notes', value: 'notes-day' },
		{ name: 'Habit Checkboxes - Grouped by Week', value: 'habit-year-by-week' },
		{ name: 'Habit Checkboxes - Grouped by Month', value: 'habit-year-by-month' },
		{ name: 'Meeting Minutes', value: 'meeting-minutes' },
		{ name: 'Budget / Finance Tracker', value: 'finance-tracker' },
		{ name: 'Workout Log', value: 'workout-log' },
		{ name: 'Meal Planner', value: 'meal-planner' },
		{ name: 'Sprint Planner', value: 'sprint-planner' },
	].sort((a, b) => a.name.localeCompare(b.name));

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

	const pageStats = $derived.by(() => {
		let cover = 0,
			dashboard = 0,
			year = 0,
			quarter = 0,
			month = 0,
			week = 0,
			day = 0,
			collections = 0;

		const isCoverEnabled = !settings.coverPage.disable;
		const isDashboardEnabled = !settings.dashboardPage.disable;
		const isYearEnabled = !settings.yearPage.disable;
		const isQuarterEnabled = !settings.quarterPage.disable;
		const isMonthEnabled = !settings.monthPage.disable;
		const isWeekEnabled = !settings.weekPage.disable;
		const isDayEnabled = !settings.dayPage.disable;

		if (isCoverEnabled) cover = 1;
		if (isDashboardEnabled) dashboard = 1;
		if (isYearEnabled)
			year = settings.years.length * (1 + settings.yearPage.notePagesAmount);
		if (isQuarterEnabled)
			quarter = settings.quarters.length * (1 + settings.quarterPage.notePagesAmount);
		if (isMonthEnabled)
			month = settings.months.length * (1 + settings.monthPage.notePagesAmount);
		if (isWeekEnabled)
			week = settings.weeks.length * (1 + settings.weekPage.notePagesAmount);
		if (isDayEnabled) day = settings.days.length * (1 + settings.dayPage.notePagesAmount);

		collections = settings.customCollections.disable
			? 0
			: settings.collections.reduce((sum, c) => {
					const indexPages = c.numIndexPages ?? 0;
					const itemPages = c.total * (c.numPagesPerItem ?? 1);
					return sum + indexPages + itemPages;
				}, 0);

		const total = cover + dashboard + year + quarter + month + week + day + collections;
		return { cover, dashboard, year, quarter, month, week, day, collections, total };
	});

	function getAvailablePageTemplates(
		location: 'collection' | 'year' | 'month' | 'quarter' | 'week' | 'day',
	) {
		return pageTemplates.filter((t) => {
			if (
				!t.value.startsWith('notes') &&
				!t.value.startsWith('habit') &&
				!t.value.startsWith('calendar') &&
				!t.value.startsWith('agenda')
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
	let showHelp = $state(page.url.searchParams.get('help') === '1');
	let showPresetsModal = $state(false);
	let showSyncPrompt = $state(false);
	let isSyncingBeforePrint = $state(false);
	let showMenu = $state(false);
	let enableHighResolution = $state(page.url.searchParams.has('highres'));
	let previewMode: 'list' | 'grid' | 'carousel' = $state('list');
	let loadPages = $state(
		page.url.searchParams.get('help') === '0' &&
			(browser || page.url.searchParams.get('load') === '1'),
	);

	let mainElement: HTMLElement | null = $state(null);

	$effect(() => {
		if (previewMode !== 'carousel' || !mainElement || !loadPages) return;
		let observer: IntersectionObserver;
		const timeout = setTimeout(() => {
			observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							entry.target.classList.add('carousel-active');
						} else {
							entry.target.classList.remove('carousel-active');
						}
					});
				},
				{
					root: mainElement,
					rootMargin: '0px -49% 0px -49%',
					threshold: 0,
				},
			);

			const observeArticles = () => {
				const articles = mainElement!.querySelectorAll('article');
				articles.forEach((a) => observer.observe(a));
			};
			observeArticles();

			const mutationObserver = new MutationObserver((mutations) => {
				let shouldObserve = false;
				for (const mutation of mutations) {
					if (mutation.addedNodes.length > 0) {
						shouldObserve = true;
						break;
					}
				}
				if (shouldObserve) observeArticles();
			});
			mutationObserver.observe(mainElement!, { childList: true, subtree: true });

			// Attach mutationObserver to observer for cleanup
			(observer as any)._mutationObserver = mutationObserver;
		}, 200);

		const handleWheel = (e: WheelEvent) => {
			if (e.deltaY !== 0) {
				e.preventDefault();
				mainElement!.scrollBy({
					left: e.deltaY * 2,
					behavior: 'auto',
				});
			}
		};

		const handleClickCapture = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const article = target.closest('article');

			if (article && !article.classList.contains('carousel-active')) {
				e.preventDefault();
				e.stopPropagation();
				article.scrollIntoView({
					behavior: 'smooth',
					inline: 'center',
					block: 'nearest',
				});
				return;
			}

			const anchor = target.closest('a');
			if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
				const targetId = anchor.getAttribute('href')?.substring(1);
				const targetEl = document.getElementById(targetId || '');
				if (targetEl) {
					e.preventDefault();
					e.stopPropagation();
					if (window.history.pushState) {
						window.history.pushState(null, '', anchor.hash);
					} else {
						window.location.hash = anchor.hash;
					}
					targetEl.scrollIntoView({
						behavior: 'smooth',
						inline: 'center',
						block: 'nearest',
					});
				}
			}
		};

		mainElement.addEventListener('wheel', handleWheel, { passive: false });
		mainElement.addEventListener('click', handleClickCapture, { capture: true });

		return () => {
			clearTimeout(timeout);
			mainElement!.removeEventListener('wheel', handleWheel);
			mainElement!.removeEventListener('click', handleClickCapture, { capture: true });
			if (observer) {
				if ((observer as any)._mutationObserver) {
					(observer as any)._mutationObserver.disconnect();
				}
				observer.disconnect();
			}
			if (mainElement) {
				mainElement
					.querySelectorAll('article')
					.forEach((a) => a.classList.remove('carousel-active'));
			}
		};
	});

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

		return () => {
			window.removeEventListener('mousemove', updateActivity);
			window.removeEventListener('keydown', updateActivity);
			window.removeEventListener('click', updateActivity);
			window.removeEventListener('scroll', updateActivity);
			window.removeEventListener('visibilitychange', handleVisibilityChange);
			window.removeEventListener('beforeunload', sendTimeCreating);
			clearInterval(tickInterval);
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
			if (browser) {
				window.history.replaceState({}, '', url);
			}
		}
	}

	let settingsUrlInitialized = false;
	let showConfigMenu = $state(false);
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
						'Calendar auto-sync is disabled to save API limits. Click the puzzle icon to sync events manually.',
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
		const url = new URL(document.location.href);
		url.searchParams.set('help', '0');
		safeReplaceState(url);
		setTimeout(() => (loadPages = true), 180);
	}

	function saveConfig() {
		if (!browser) return;
		try {
			localStorage.setItem('planner-config', JSON.stringify(settings.edits));
			trackEvent('preset_action', { action: 'save_local' });
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
				trackEvent('preset_action', { action: 'load' });
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
			trackEvent('preset_action', { action: 'export' });
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
					trackEvent('preset_action', { action: 'import' });
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
		trackEvent('preset_action', { action: 'reset' });
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
			trackEvent('config_menu_toggle', { menu: 'backup' });
			showMenu = false;
			showCalendarMenu = false;
			showCollectionsEventsMenu = false;
		}
	};

	const toggleCalendarMenu = () => {
		showCalendarMenu = !showCalendarMenu;
		if (showCalendarMenu) {
			trackEvent('config_menu_toggle', { menu: 'calendar' });
			showMenu = false;
			showConfigMenu = false;
			showCollectionsEventsMenu = false;
		}
	};

	const toggleMenu = () => {
		showMenu = !showMenu;
		if (showMenu) {
			trackEvent('config_menu_toggle', { menu: 'design' });
			showConfigMenu = false;
			showCalendarMenu = false;
			showCollectionsEventsMenu = false;
		}
	};

	const toggleCollectionsEventsMenu = () => {
		showCollectionsEventsMenu = !showCollectionsEventsMenu;
		if (showCollectionsEventsMenu) {
			trackEvent('config_menu_toggle', { menu: 'extras' });
			showMenu = false;
			showConfigMenu = false;
			showCalendarMenu = false;
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
		await tick();

		// Increment printed in KV backend
		fetch('/api/stats', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ type: 'printed' }),
		}).catch(console.error);

		sendTimeCreating();

		// Fire Google Analytics event
		if (typeof window !== 'undefined' && 'gtag' in window) {
			// @ts-ignore
			window.gtag('event', 'planner_printed');
		}

		setTimeout(() => window.print(), 100);
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
		await tick(); // Wait for DOM to update

		// Give the browser 500ms to visually paint the closed modal and new calendar events
		// before we freeze the main thread with the print dialog
		setTimeout(() => {
			executePrint();
		}, 500);
	};

	const toggleHelp = () => {
		showHelp = !showHelp;
		if (showHelp) {
			trackEvent('help_modal_open');
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
		// Try to identify the setting that changed
		const name = target.id || target.getAttribute('name') || target.tagName.toLowerCase();
		let value = '';

		if (target instanceof HTMLInputElement) {
			if (target.type === 'checkbox') value = target.checked ? 'on' : 'off';
			else if (target.type === 'range') value = target.value;
			else if (target.type === 'color') value = target.value;
			// We skip logging the actual text input for privacy, just say it was changed
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
</script>

<svelte:head>
	<title>Planner Builder | Remarkably Organized v{appVersion}</title>
	<meta
		name="description"
		content="Build your custom planner with calendar views, habit trackers, collections, and more. Export a print-ready PDF for your reMarkable tablet." />
	{#if googleFontImport}
		{@html `<style type="text/css">${googleFontImport}</style>`}
	{/if}
</svelte:head>

{#if showHelp}<HelpModal onClose={onHelpClose} />{/if}
{#if showPresetsModal}<PresetsModal
		onClose={() => (showPresetsModal = false)}
		onExport={exportConfig} />{/if}

{#if showMenu}
	<div
		class="menu"
		transition:slide={{ duration: 200 }}
		onchange={(e) => handleConfigChange(e, 'design')}>
		<DesignPanel {settings} {fonts} bind:enableHighResolution bind:previewMode />
	</div>
{/if}
{#if showConfigMenu}
	<div
		class="config-menu"
		transition:slide={{ duration: 150 }}
		onchange={(e) => handleConfigChange(e, 'backup')}>
		<BackupPanel
			onSave={() => {
				saveConfig();
				showConfigMenu = false;
			}}
			onLoad={() => {
				loadConfig();
				showConfigMenu = false;
			}}
			onExport={() => {
				exportConfig();
				showConfigMenu = false;
			}}
			onImport={() => {
				importConfig();
				showConfigMenu = false;
			}}
			onShowPresets={() => {
				showPresetsModal = true;
				showConfigMenu = false;
			}}
			onReset={resetConfig} />
	</div>
{/if}
{#if showCalendarMenu}
	<div
		class="menu calendar-menu"
		transition:slide={{ duration: 200 }}
		onchange={(e) => handleConfigChange(e, 'calendar')}>
		<CalendarPanel
			{settings}
			bind:customTimeframe
			{onTimeframeSelection}
			{onStartDateChange}
			{onEndDateChange}
			{getAvailablePageTemplates} />
	</div>
{/if}
{#if showCollectionsEventsMenu}
	<div
		class="menu collections-events-menu"
		transition:slide={{ duration: 200 }}
		onchange={(e) => handleConfigChange(e, 'extras')}>
		<ExtrasPanel {settings} {getAvailablePageTemplates} />
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
	data-tooltip="Collections & Events">
	<PuzzleIcon />
</button>
<button onclick={toggleMenu} class="menu-trigger" data-tooltip="Design & Layout">
	<PaintBrushIcon />
</button>
<button onclick={toggleHelp} class="help-trigger" data-tooltip="Help & Usage Guide">
	<HelpIcon />
</button>
<Toast />
<svelte:window bind:innerWidth={windowWidth} />

<main
	bind:this={mainElement}
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
	style:--font-size="{font.size}rem"
	style:--font-weight-bold={font.boldWeight}
	style:--font-weight-normal={font.normalWeight}
	style:--font-weight-light={font.lightWeight}
	style:--bg-pdf={settings.design.colorBg || '#ffffff'}
	style:--nav-bg-pdf={settings.design.colorNavBg || '#f2f2f2'}
	style:--text={settings.design.colorText}
	style:--outline={settings.design.colorLines}
	style:--dots-color={settings.design.colorDots}
	style:font-size="{font.size}rem"
	class:side-nav-right={!settings.sideNav.leftSide}
	class:high-res={enableHighResolution}
	class="view-{previewMode}">
	<div class="desktop-stats-panel">
		<h3>Pages</h3>
		<ul>
			{#if pageStats.cover > 0}<li>
					<a href="#cover">Cover</a>
					<span>{pageStats.cover.toLocaleString()}</span>
				</li>{/if}
			{#if pageStats.dashboard > 0}<li>
					<a href="#dashboard">Dashboard</a>
					<span>{pageStats.dashboard.toLocaleString()}</span>
				</li>{/if}
			{#if pageStats.year > 0}<li>
					<a href="#{settings.years[0]?.id}">Yearly Views</a>
					<span>{pageStats.year.toLocaleString()}</span>
				</li>{/if}
			{#if pageStats.quarter > 0}<li>
					<a href="#{settings.quarters[0]?.id}">Quarterly Views</a>
					<span>{pageStats.quarter.toLocaleString()}</span>
				</li>{/if}
			{#if pageStats.month > 0}<li>
					<a href="#{settings.months[0]?.id}">Monthly Views</a>
					<span>{pageStats.month.toLocaleString()}</span>
				</li>{/if}
			{#if pageStats.week > 0}<li>
					<a href="#{settings.weeks[0]?.id}">Weekly Views</a>
					<span>{pageStats.week.toLocaleString()}</span>
				</li>{/if}
			{#if pageStats.day > 0}<li>
					<a href="#{settings.days[0]?.id}">Daily Views</a>
					<span>{pageStats.day.toLocaleString()}</span>
				</li>{/if}
			{#if pageStats.collections > 0}<li>
					<a href="#{settings.collections[0]?.id}">Collections</a>
					<span>{pageStats.collections.toLocaleString()}</span>
				</li>{/if}
		</ul>
		<hr />
		<strong>
			<span>Total Pages</span>
			<span>{pageStats.total.toLocaleString()}</span>
		</strong>
	</div>
	<div class="progress-bar" class:active={!loadPages || isAnyCalendarUpdating}></div>
	<div id="home"></div>
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
			transition: background-color 0.3s ease;
		}

		@include tablet {
			main.view-grid {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
				gap: 2rem;
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

		.desktop-stats-panel {
			display: none;
			position: fixed;
			top: 50%;
			transform: translateY(-50%);
			left: 2rem;
			color: white;
			z-index: 5;
			pointer-events: none;
			width: 200px;

			@include desktop {
				display: block;
			}

			h3 {
				font-size: 1.15rem;
				margin: 0 0 1rem;
				opacity: 0.9;
				color: white;
				border: none;
				text-transform: uppercase;
				letter-spacing: 1px;
			}
			ul {
				list-style: none;
				padding: 0;
				margin: 0;
				display: flex;
				flex-direction: column;
				gap: 0.75rem;
				opacity: 0.8;
			}
			li {
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 1rem;
				opacity: 0.7;
				margin-bottom: 0.25rem;
				font-size: 0.95rem;
				a {
					flex: 1;
					color: inherit;
					text-decoration: none;
					transition: opacity 0.2s;
					pointer-events: auto;
					&:hover {
						text-decoration: underline;
						opacity: 1;
					}
				}
				&::before {
					content: '•';
					font-size: 1.25rem;
					line-height: 0.5;
					opacity: 0.5;
					margin-right: -0.25rem;
				}
			}
			hr {
				border: none;
				border-top: 1px dashed rgba(255, 255, 255, 0.2);
				margin: 1.25rem 0;
			}
			strong {
				font-size: 1.1rem;
				display: flex;
				justify-content: space-between;
				gap: 1rem;
			}
		}
	}
	:global(main > article) {
		display: block;
		position: relative;
		background-color: var(--bg-pdf);
		width: var(--doc-width);
		height: var(--doc-height);
		content-visibility: auto;
		contain-intrinsic-size: var(--doc-width) var(--doc-height);
		will-change: transform, opacity;
	}
	@include tablet {
		:global(main.view-grid > article) {
			margin: 0 !important;
			zoom: 0.3 !important;
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
			transparent 8%,
			rgba(128, 128, 128, 0.1) 18%,
			transparent 33%
		);
		background-size: 200% 100%;
		pointer-events: none;
		z-index: -1;
	}
	:global(main > article:not(.visible)::before) {
		opacity: 1;
		animation: shimmer 1.5s infinite linear;
	}
	:global(main > article.visible::before) {
		animation:
			shimmer 1.5s infinite linear,
			fadeOutShimmer 1.2s ease-out forwards;
	}
	:global(main > article.skeleton-loader::before) {
		display: none !important;
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
	@keyframes fadeOutShimmer {
		0%,
		40% {
			opacity: 1;
		}
		100% {
			opacity: 0;
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
		:global(main > article::before) {
			display: none !important;
			animation: none !important;
		}
		:global(main > article) {
			content-visibility: visible !important;
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
		.print-trigger,
		.view-trigger,
		.help-trigger,
		.config-trigger,
		.reset-trigger,
		.calendar-trigger,
		.collections-events-trigger,
		.menu,
		.menu-trigger,
		.print-trigger,
		.view-trigger,
		.config-trigger,
		.config-menu,
		.calendar-trigger,
		.calendar-menu,
		.collections-trigger,
		.help-trigger,
		.desktop-stats-panel,
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
	.config-trigger,
	.view-trigger {
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
			right: 10rem;
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
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
		&:hover {
			background-color: var(--action-high);
			color: var(--action-text-high);
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
