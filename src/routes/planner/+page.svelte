<script lang="ts">
	import { page } from '$app/state';
	import { replaceState } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import PaintBrushIcon from '~icons/fa/paint-brush';
	import PuzzleIcon from '~icons/fa/puzzle-piece';
	import LoadingIcon from '~icons/eos-icons/bubble-loading';
	import CaretUpIcon from '~icons/fa/caret-up';
	import CaretDownIcon from '~icons/fa/caret-down';
	import SaveIcon from '~icons/fa/save';
	import LoadIcon from '~icons/fa/history';
	import ExportIcon from '~icons/fa/download';
	import ImportIcon from '~icons/fa/upload';
	import PrintIcon from '~icons/fa/print';
	import CalendarIcon from '~icons/fa/calendar';
	import QuestionIcon from '~icons/fa/question-circle';
	import CoverPage from './CoverPage.svelte';
	import DashboardPage from './DashboardPage.svelte';
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
	const { settings } = data;

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
	<title>Planner Builder | Remarkably Organized</title>
	{#if googleFontImport}
		{@html `<style type="text/css">${googleFontImport}</style>`}
	{/if}
</svelte:head>

{#if showHelp}<HelpModal onClose={onHelpClose} />{/if}

{#if showMenu}
	<div class="menu" transition:slide={{ duration: 200 }}>
		<h2>Design & Layout</h2>
		<form>
			<div class="checkbox" style="margin-top: 1rem; margin-bottom: 1rem;">
				<input
					type="checkbox"
					bind:checked={enableHighResolution}
					id="enableHighResolution" />
				<label for="enableHighResolution">Print in high resolution (bigger file)</label>
			</div>
			<details ontoggle={handleDetailsToggle}>
				<summary><h3>Font & Colors</h3></summary>
				<fieldset>
					<label for="designFont">Font</label>
					<select id="designFont" bind:value={settings.design.font}>
						{#each fonts as font (font.name)}
							<option value={font.name}>{font.name}</option>
						{/each}
					</select>
				</fieldset>
				<fieldset>
					<label for="textColor">Text Color</label>
					<input
						type="color"
						placeholder="Text Color"
						id="textColor"
						bind:value={settings.design.colorText} />
				</fieldset>
				<fieldset>
					<label for="linesColor">Lines/Border Color</label>
					<input
						type="color"
						placeholder="Lines/Border"
						id="linesColor"
						bind:value={settings.design.colorLines} />
				</fieldset>
				<fieldset>
					<label for="dotsColor">Dots Color</label>
					<input
						type="color"
						placeholder="Dots Color"
						id="dotsColor"
						bind:value={settings.design.colorDots} />
				</fieldset>
			</details>
			<details ontoggle={handleDetailsToggle}>
				<summary>
					<div style="display: flex; align-items: center; gap: 0.5rem;">
						<input
							type="checkbox"
							checked={!settings.coverPage.disable}
							onchange={(e) => {
								settings.coverPage.disable = !e.currentTarget.checked;
							}}
							onclick={(e) => e.stopPropagation()}
							style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
						<h3 style="margin: 0;">Cover Page</h3>
					</div>
				</summary>
				{#if !settings.coverPage.disable}
					<fieldset>
						<label for="coverPageTitle">Cover Page Title</label>
						<input
							type="text"
							placeholder="Cover Page Title"
							id="coverPageTitle"
							bind:value={settings.coverPage.title} />
					</fieldset>
					<fieldset>
						<label for="name">Contact Name</label>
						<input
							type="text"
							placeholder="Name"
							id="name"
							bind:value={settings.coverPage.name} />
					</fieldset>
					<fieldset>
						<label for="email">Contact Email/Phone</label>
						<input
							type="text"
							placeholder="Contact Email/Phone"
							id="email"
							bind:value={settings.coverPage.email} />
					</fieldset>
					<fieldset>
						<label for="coverPageFont">Font</label>
						<select id="coverPageFont" bind:value={settings.coverPage.font}>
							{#each fonts as font (font.name)}
								<option value={font.name}>{font.name}</option>
							{/each}
						</select>
					</fieldset>
					<div class="checkbox">
						<input
							type="checkbox"
							bind:checked={settings.coverPage.showCollectionLinks}
							id="coverPageShowCollectionLinks" />
						<label for="coverPageShowCollectionLinks">Show Links to Collections</label>
					</div>
					<div class="checkbox">
						<input
							type="checkbox"
							bind:checked={settings.coverPage.darkBackground}
							id="coverPageDarkBackground" />
						<label for="coverPageDarkBackground">Dark Background</label>
					</div>
				{/if}
			</details>
			<details ontoggle={handleDetailsToggle}>
				<summary>
					<div style="display: flex; align-items: center; gap: 0.5rem;">
						<input
							type="checkbox"
							checked={!settings.dashboardPage.disable}
							onchange={(e) => {
								settings.dashboardPage.disable = !e.currentTarget.checked;
							}}
							onclick={(e) => e.stopPropagation()}
							style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
						<h3 style="margin: 0;">Dashboard Page</h3>
					</div>
				</summary>
				{#if !settings.dashboardPage.disable}
					<div class="row">
						<label for="dashboardPage-title">Title</label>
						<input
							type="text"
							id="dashboardPage-title"
							bind:value={settings.dashboardPage.title}
							placeholder="Dashboard" />
					</div>
					<fieldset style="margin-top: 1rem;">
						<label for="dashboardPage-fontSize">
							Font Size Scale: {settings.dashboardPage.fontSize.toFixed(2)}x
						</label>
						<input
							type="range"
							id="dashboardPage-fontSize"
							min="0.5"
							max="1.5"
							step="0.05"
							bind:value={settings.dashboardPage.fontSize}
							style="width: 100%; cursor: pointer;" />
					</fieldset>
				{/if}
			</details>
			<details ontoggle={handleDetailsToggle}>
				<summary>
					<div style="display: flex; align-items: center; gap: 0.5rem;">
						<input
							type="checkbox"
							checked={!settings.topNav.disable}
							onchange={(e) => {
								settings.topNav.disable = !e.currentTarget.checked;
							}}
							onclick={(e) => e.stopPropagation()}
							style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
						<h3 style="margin: 0;">Topbar Navigation</h3>
					</div>
				</summary>
				{#if !settings.topNav.disable}
					<div class="checkbox">
						<input
							type="checkbox"
							bind:checked={settings.topNav.showCollectionLinks}
							id="topNavShowCollectionLinks" />
						<label for="topNavShowCollectionLinks">Show Links to Collections</label>
					</div>
					<fieldset>
						<label for="topNavFont">Font</label>
						<select id="topNavFont" bind:value={settings.topNav.font}>
							{#each fonts as font (font.name)}
								<option value={font.name}>{font.name}</option>
							{/each}
						</select>
					</fieldset>
				{/if}
			</details>
			<details ontoggle={handleDetailsToggle}>
				<summary>
					<div style="display: flex; align-items: center; gap: 0.5rem;">
						<input
							type="checkbox"
							checked={!settings.sideNav.disable}
							onchange={(e) => {
								settings.sideNav.disable = !e.currentTarget.checked;
							}}
							onclick={(e) => e.stopPropagation()}
							style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
						<h3 style="margin: 0;">Sidebar Navigation</h3>
					</div>
				</summary>
				{#if !settings.sideNav.disable}
					<div class="checkbox">
						<input
							type="checkbox"
							bind:checked={settings.sideNav.leftSide}
							id="sideNavLeftSide" />
						<label for="sideNavLeftSide">Show Sidebar on Left</label>
					</div>
					<div class="checkbox">
						<input
							type="checkbox"
							bind:checked={settings.sideNav.showCollectionLinks}
							id="sideNavShowCollectionLinks" />
						<label for="sideNavShowCollectionLinks">Show Links to Collections</label>
					</div>
					<fieldset>
						<label for="sideNavFont">Font</label>
						<select id="sideNavFont" bind:value={settings.sideNav.font}>
							{#each fonts as font (font.name)}
								<option value={font.name}>{font.name}</option>
							{/each}
						</select>
					</fieldset>
				{/if}
			</details>
		</form>
	</div>
{/if}
{#if showConfigMenu}
	<div class="config-menu" transition:slide={{ duration: 150 }}>
		<h3>Planner Settings</h3>
		<div class="config-buttons">
			<button
				type="button"
				onclick={() => {
					saveConfig();
					showConfigMenu = false;
				}}>
				<SaveIcon /> Save Settings to Browser
			</button>
			<button
				type="button"
				onclick={() => {
					loadConfig();
					showConfigMenu = false;
				}}>
				<LoadIcon /> Load Settings from Browser
			</button>
			<button
				type="button"
				onclick={() => {
					exportConfig();
					showConfigMenu = false;
				}}>
				<ExportIcon /> Export Settings to File
			</button>
			<button
				type="button"
				onclick={() => {
					importConfig();
					showConfigMenu = false;
				}}>
				<ImportIcon /> Import Settings from File
			</button>
		</div>
	</div>
{/if}
{#if showCalendarMenu}
	<div class="menu calendar-menu" transition:slide={{ duration: 200 }}>
		<h2>Calendar Views</h2>
		<form>
			<fieldset>
				<label for="timeframeBasedOnYear">Year</label>
				<select
					id="timeframeBasedOnYear"
					value={settings.date.start.getUTCMonth() === 0 &&
					settings.date.start.getUTCDate() === 1 &&
					settings.date.end.getUTCMonth() === 11 &&
					settings.date.end.getUTCDate() === 31 &&
					!customTimeframe
						? settings.date.start.getTime()
						: 0}
					onchange={onTimeframeSelection}>
					{#each new Array(7) as _, i (i)}
						{@const date = new Date(Date.UTC(new Date().getFullYear() - 1 + i))}
						<option value={date.getTime()}>
							{date.getUTCFullYear()}
						</option>
					{/each}
					<option value={0}>Custom Date Range</option>
				</select>
			</fieldset>
			{#if customTimeframe || settings.date.start.getUTCMonth() !== 0 || settings.date.start.getUTCDate() !== 1 || settings.date.end.getUTCMonth() !== 11 || settings.date.end.getUTCDate() !== 31}
				<fieldset>
					<label for="start">Start Date</label>
					<input
						type="date"
						placeholder="Start Date"
						id="start"
						max={settings.date.end.toISOString().slice(0, 10)}
						value={settings.date.start.toISOString().slice(0, 10)}
						onchange={onStartDateChange} />
				</fieldset>
				<fieldset>
					<label for="end">End Date</label>
					<input
						type="date"
						placeholder="End Date"
						id="end"
						min={settings.date.start.toISOString().slice(0, 10)}
						value={settings.date.end.toISOString().slice(0, 10)}
						onchange={onEndDateChange} />
				</fieldset>
			{/if}
			<div class="checkbox" style="margin-bottom: 1rem;">
				<input
					type="checkbox"
					bind:checked={settings.date.startWeekOnSunday}
					id="startWeekOnSunday" />
				<label for="startWeekOnSunday">Start Week on Sunday</label>
			</div>

			<details ontoggle={handleDetailsToggle}>
				<summary>
					<div style="display: flex; align-items: center; gap: 0.5rem;">
						<input
							type="checkbox"
							checked={!settings.yearPage.disable}
							onchange={(e) => {
								settings.yearPage.disable = !e.currentTarget.checked;
							}}
							onclick={(e) => e.stopPropagation()}
							style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
						<h3 style="margin: 0;">Yearly</h3>
					</div>
				</summary>
				{#if !settings.yearPage.disable}
					<fieldset>
						<label for="yearNotePagesAmount">Additional Note Pages</label>
						<input
							type="number"
							placeholder="Additional Note Pages"
							id="yearNotePagesAmount"
							min="0"
							step="1"
							bind:value={settings.yearPage.notePagesAmount} />
					</fieldset>
					{#if settings.yearPage.notePagesAmount > 0}
						<fieldset>
							<label for="yearNotePagesTemplate">Additional Note Pages Template</label>
							<select
								id="yearNotePagesTemplate"
								bind:value={settings.yearPage.notePagesTemplate}>
								{#each getAvailablePageTemplates('year') as template (template.value)}
									<option value={template.value}>{template.name}</option>
								{/each}
							</select>
						</fieldset>
					{/if}
				{/if}
			</details>

			<details ontoggle={handleDetailsToggle}>
				<summary>
					<div style="display: flex; align-items: center; gap: 0.5rem;">
						<input
							type="checkbox"
							checked={!settings.quarterPage.disable}
							onchange={(e) => {
								settings.quarterPage.disable = !e.currentTarget.checked;
							}}
							onclick={(e) => e.stopPropagation()}
							style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
						<h3 style="margin: 0;">Quarterly</h3>
					</div>
				</summary>
				{#if !settings.quarterPage.disable}
					<fieldset>
						<label for="quarterNotePagesAmount">Additional Note Pages</label>
						<input
							type="number"
							placeholder="Additional Note Pages"
							id="quarterNotePagesAmount"
							min="0"
							step="1"
							bind:value={settings.quarterPage.notePagesAmount} />
					</fieldset>
					{#if settings.quarterPage.notePagesAmount > 0}
						<fieldset>
							<label for="quarterNotePagesTemplate">Additional Note Pages Template</label>
							<select
								id="quarterNotePagesTemplate"
								bind:value={settings.quarterPage.notePagesTemplate}>
								{#each getAvailablePageTemplates('quarter') as template (template.value)}
									<option value={template.value}>{template.name}</option>
								{/each}
							</select>
						</fieldset>
					{/if}
				{/if}
			</details>

			<details ontoggle={handleDetailsToggle}>
				<summary>
					<div style="display: flex; align-items: center; gap: 0.5rem;">
						<input
							type="checkbox"
							checked={!settings.monthPage.disable}
							onchange={(e) => {
								settings.monthPage.disable = !e.currentTarget.checked;
							}}
							onclick={(e) => e.stopPropagation()}
							style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
						<h3 style="margin: 0;">Monthly</h3>
					</div>
				</summary>
				{#if !settings.monthPage.disable}
					<fieldset>
						<label for="monthPageTemplate">Month Page Template</label>
						<select id="monthPageTemplate" bind:value={settings.monthPage.template}>
							{#each getAvailablePageTemplates('month') as template (template.value)}
								<option value={template.value}>{template.name}</option>
							{/each}
						</select>
					</fieldset>
					<fieldset>
						<label for="monthNotePagesAmount">Additional Note Pages</label>
						<input
							type="number"
							placeholder="Additional Note Pages"
							id="monthNotePagesAmount"
							min="0"
							step="1"
							bind:value={settings.monthPage.notePagesAmount} />
					</fieldset>
					{#if settings.monthPage.notePagesAmount > 0}
						<fieldset>
							<label for="monthNotePagesTemplate">Additional Note Pages Template</label>
							<select
								id="monthNotePagesTemplate"
								bind:value={settings.monthPage.notePagesTemplate}>
								{#each getAvailablePageTemplates('month') as template (template.value)}
									<option value={template.value}>{template.name}</option>
								{/each}
							</select>
						</fieldset>
					{/if}
				{/if}
			</details>

			<details ontoggle={handleDetailsToggle}>
				<summary>
					<div style="display: flex; align-items: center; gap: 0.5rem;">
						<input
							type="checkbox"
							checked={!settings.weekPage.disable}
							onchange={(e) => {
								settings.weekPage.disable = !e.currentTarget.checked;
							}}
							onclick={(e) => e.stopPropagation()}
							style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
						<h3 style="margin: 0;">Weekly</h3>
					</div>
				</summary>
				{#if !settings.weekPage.disable}
					<fieldset>
						<label for="weekPageTemplate">Week Page Template</label>
						<select id="weekPageTemplate" bind:value={settings.weekPage.template}>
							{#each getAvailablePageTemplates('week') as template (template.value)}
								<option value={template.value}>{template.name}</option>
							{/each}
						</select>
					</fieldset>
					<fieldset>
						<label for="weekNotePagesAmount">Additional Note Pages</label>
						<input
							type="number"
							placeholder="Additional Note Pages"
							id="weekNotePagesAmount"
							min="0"
							step="1"
							bind:value={settings.weekPage.notePagesAmount} />
					</fieldset>
					{#if settings.weekPage.notePagesAmount > 0}
						<fieldset>
							<label for="weekNotePagesTemplate">Additional Note Pages Template</label>
							<select
								id="weekNotePagesTemplate"
								bind:value={settings.weekPage.notePagesTemplate}>
								{#each getAvailablePageTemplates('week') as template (template.value)}
									<option value={template.value}>{template.name}</option>
								{/each}
							</select>
						</fieldset>
					{/if}
					<fieldset>
						<label for="weekSideNavDisplay">Sidebar Display</label>
						<select id="weekSideNavDisplay" bind:value={settings.weekPage.sideNavDisplay}>
							<option value="days-this-week">Days of the Week</option>
							<option value="days-this-month">Days of the Month</option>
							<option value="weeks-this-year">Weeks of the Year</option>
							<option value="weeks-this-month">Weeks of the Month</option>
							<option value="months">Months</option>
							<option value="none">None</option>
						</select>
					</fieldset>
					{#if settings.weekPage.sideNavDisplay === 'weeks-this-month' || settings.weekPage.sideNavDisplay === 'weeks-this-year'}
						<div class="checkbox">
							<input
								type="checkbox"
								bind:checked={settings.weekPage.useWeekNumbersInSideNav}
								id="useWeekNumbersInSideNav" />
							<label for="useWeekNumbersInSideNav">Show week numbers in side bar</label>
						</div>
					{/if}
					<div class="checkbox">
						<input
							type="checkbox"
							bind:checked={settings.weekPage.useWeekSinceYear}
							id="useWeekSinceYear" />
						<label for="useWeekSinceYear">Use week number from start of year</label>
					</div>
				{/if}
			</details>

			<details ontoggle={handleDetailsToggle}>
				<summary>
					<div style="display: flex; align-items: center; gap: 0.5rem;">
						<input
							type="checkbox"
							checked={!settings.dayPage.disable}
							onchange={(e) => {
								settings.dayPage.disable = !e.currentTarget.checked;
							}}
							onclick={(e) => e.stopPropagation()}
							style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
						<h3 style="margin: 0;">Daily</h3>
					</div>
				</summary>
				{#if !settings.dayPage.disable}
					<fieldset>
						<label for="dayPageTemplate">Day Page Template</label>
						<select id="dayPageTemplate" bind:value={settings.dayPage.template}>
							{#each getAvailablePageTemplates('day') as template (template.value)}
								<option value={template.value}>{template.name}</option>
							{/each}
						</select>
					</fieldset>
					<fieldset>
						<label for="dayNotePagesAmount">Additional Note Pages</label>
						<input
							type="number"
							placeholder="Additional Note Pages"
							id="dayNotePagesAmount"
							min="0"
							step="1"
							bind:value={settings.dayPage.notePagesAmount} />
					</fieldset>
					{#if settings.dayPage.notePagesAmount > 0}
						<fieldset>
							<label for="dayNotePagesTemplate">Additional Note Pages Template</label>
							<select
								id="dayNotePagesTemplate"
								bind:value={settings.dayPage.notePagesTemplate}>
								{#each getAvailablePageTemplates('day') as template (template.value)}
									<option value={template.value}>{template.name}</option>
								{/each}
							</select>
						</fieldset>
					{/if}
					<fieldset>
						<label for="daySideNavDisplay">Sidebar Display</label>
						<select id="daySideNavDisplay" bind:value={settings.dayPage.sideNavDisplay}>
							<option value="days-this-week">Days of the Week</option>
							<option value="days-this-month">Days of the Month</option>
							<option value="days-this-year">Days of the Year</option>
							<option value="weeks-this-year">Weeks of the Year</option>
							<option value="weeks-this-month">Weeks of the Month</option>
							<option value="months">Months</option>
							<option value="none">None</option>
						</select>
					</fieldset>
				{/if}
			</details>
		</form>
	</div>
{/if}

{#if showCollectionsEventsMenu}
	<div class="menu collections-events-menu" transition:slide={{ duration: 200 }}>
		<h2>Extra Settings</h2>
		<form>
			<details ontoggle={handleDetailsToggle}>
				<summary><h3>Manage Collections</h3></summary>
				<div class="collections">
					{#each settings.collections as collection, i (collection.id)}
						<fieldset>
							<div
								style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
								<label for="" style="margin: 0;">Collection {i + 1}</label>
								<div style="display: flex; gap: 0.25rem;">
									<button
										type="button"
										disabled={i === 0}
										onclick={() => {
											const item = settings.collections.splice(i, 1)[0];
											settings.collections.splice(i - 1, 0, item);
										}}
										title="Move Up"
										style="padding: 0.25rem 0.5rem; display: flex; align-items: center; justify-content: center;">
										<CaretUpIcon />
									</button>
									<button
										type="button"
										disabled={i === settings.collections.length - 1}
										onclick={() => {
											const item = settings.collections.splice(i, 1)[0];
											settings.collections.splice(i + 1, 0, item);
										}}
										title="Move Down"
										style="padding: 0.25rem 0.5rem; display: flex; align-items: center; justify-content: center;">
										<CaretDownIcon />
									</button>
								</div>
							</div>
							<input type="text" bind:value={collection.name} placeholder="Name" />
							<fieldset style="margin-top: 1rem;">
								<label for="collection-{collection.id}-type">Page Template</label>
								<select id="collection-{collection.id}-type" bind:value={collection.type}>
									{#each getAvailablePageTemplates('collection') as template}
										<option value={template.value}>{template.name}</option>
									{/each}
								</select>
							</fieldset>
							{#if collection.type.startsWith('numbered') || collection.type.startsWith('lined') || collection.type.startsWith('todo')}
								<fieldset style="margin-top: 1rem;">
									<label for="collection-{collection.id}-columns">Columns</label>
									<input
										type="number"
										placeholder="Columns"
										id="collection-{collection.id}-columns"
										min="1"
										step="1"
										bind:value={collection.columns} />
								</fieldset>
							{/if}
							<fieldset style="margin-top: 1rem;">
								<label for="collection-{collection.id}-numIndexPages">
									Number of Index Pages
								</label>
								<input
									type="number"
									placeholder="Number of Index Pages"
									id="collection-{collection.id}-numIndexPages"
									min="0"
									step="1"
									bind:value={collection.numIndexPages} />
							</fieldset>
							<fieldset style="margin-top: 1rem;">
								<label for="collection-{collection.id}-total">
									Number of Items Per Index Page
								</label>
								<input
									type="number"
									placeholder="Number of Items Per Index Page"
									id="collection-{collection.id}-total"
									min="1"
									max="180"
									step="1"
									bind:value={collection.total} />
							</fieldset>
							<fieldset style="margin-top: 1rem;">
								<label for="collection-{collection.id}-numPagesPerItem">
									Number of Pages Per Item
								</label>
								<input
									type="number"
									placeholder="Number of Pages Per Item"
									id="collection-{collection.id}-numPagesPerItem"
									min="1"
									step="1"
									bind:value={collection.numPagesPerItem} />
							</fieldset>
							<button
								type="button"
								class="btn-remove"
								onclick={() => settings.collections.splice(i, 1)}>
								Remove Collection
							</button>
						</fieldset>
					{/each}
					<button
						type="button"
						class="btn-add"
						onclick={() =>
							settings.collections.push({
								name: 'Notes',
								id: `${Date.now()}`,
								total: 20,
								type: 'blank',
								numIndexPages: 1,
								numPagesPerItem: 1,
								columns: 1,
							})}>
						➕ Add New Collection
					</button>
				</div>
			</details>

			<details ontoggle={handleDetailsToggle}>
				<summary><h3>Sync Calendar Events</h3></summary>
				<div class="calendar-panel-content">
					{#each settings.calendars as calendar, i (calendar.url)}
						<div class="calendar-item">
							<div class="calendar-header-row">
								<strong>{calendar.name || 'Custom Calendar'}</strong>
								<span class="event-count">({calendar.events.length} events)</span>
							</div>
							{#if calendar.lastUpdated}
								<span class="last-updated">
									Last Updated: {new Date(calendar.lastUpdated).toLocaleString()}
								</span>
							{/if}
							<fieldset style="margin-top: 0.5rem;">
								<label for="calendar-{i}-name">Name</label>
								<input
									type="text"
									id="calendar-{i}-name"
									bind:value={calendar.name}
									placeholder="Google Holidays, Personal..." />
							</fieldset>
							<fieldset style="margin-top: 0.5rem;">
								<label for="calendar-{i}-url">ICS URL</label>
								<input
									type="text"
									id="calendar-{i}-url"
									bind:value={calendar.url}
									placeholder="https://..." />
							</fieldset>
							<div class="calendar-actions">
								<button
									type="button"
									class="btn-import"
									disabled={settings.calendars.some((c) => c.updating)}
									onclick={() => settings.importEvents(i)}>
									{calendar.updating ? 'Importing...' : 'Sync Events'}
								</button>
								<button
									type="button"
									class="btn-remove"
									disabled={settings.calendars.some((c) => c.updating)}
									onclick={() => settings.calendars.splice(i, 1)}>
									Remove URL
								</button>
							</div>
						</div>
					{/each}
					<button
						type="button"
						class="btn-add"
						disabled={settings.calendars.some((c) => c.updating)}
						onclick={() =>
							settings.calendars.push({
								events: [],
								lastUpdated: 0,
								name: '',
								updating: false,
								url: '',
							})}>
						➕ Add Calendar URL
					</button>
				</div>
			</details>
		</form>
	</div>
{/if}

<button onclick={toggleConfigMenu} class="config-trigger" data-tooltip="Backup & Restore">
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
<button onclick={handlePrint} class="print-trigger" data-tooltip="Download / Print PDF">
	<PrintIcon />
</button>
<button onclick={toggleMenu} class="menu-trigger" data-tooltip="Design & Layout">
	<PaintBrushIcon />
</button>
<button
	onclick={toggleHelp}
	class="help-trigger"
	data-tooltip="Help & Usage Guide">
	<QuestionIcon />
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
	<div id="home"></div>
	{#if !loadPages}
		<article
			style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
			<h1 style="margin-bottom: 2rem;">Loading...</h1>
			<LoadingIcon font-size="3rem" />
		</article>
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
		{#each settings.collections as collection (collection.id)}
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
		&:hover {
			color: black;
		}
		@include tablet {
			right: 10rem;
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
		h2 {
			position: sticky;
			top: 0;
			background-color: var(--bg);
			padding: 2rem 0 1rem;
			color: var(--text);
		}
		details {
			& > summary {
				position: sticky;
				top: 4rem;
				background-color: var(--bg);
				z-index: 2;
				list-style: none;
				display: flex;
				justify-content: space-between;
				align-items: center;
				cursor: pointer;
				padding: 0.75rem 0;
				margin-top: 0;
				margin-bottom: 0;
				border-bottom: 1px solid var(--outline);
				color: var(--text);

				&::-webkit-details-marker {
					display: none;
				}

				&::after {
					content: '+';
					font-size: 1.5rem;
					font-weight: 300;
					margin-left: 0.5rem;
				}

				h3 {
					position: static;
					top: auto;
					background-color: transparent;
					color: var(--text);
					padding: 0;
					margin: 0;
				}
			}

			&[open] > summary::after {
				content: '\2212';
			}
			& > fieldset,
			& > div:not(.row),
			& > .row {
				margin-top: 1rem;
				margin-bottom: 1rem;
			}
		}
		.checkbox {
			margin: 0 0 0 0.5rem;
		}
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 0;
		margin: 0;
		fieldset {
			border: none;
			display: flex;
			flex-direction: column;
			padding: 0;
			label {
				font-size: 0.75rem;
				font-weight: 300;
				margin: 0 0 0.1rem 0.25rem;
			}
			input {
				width: 100%;
			}
		}
	}
	.actions {
		position: sticky;
		bottom: -1rem;
		background-color: white;
		width: 100%;
		padding: 1rem 0;
	}
	button.export {
		background-color: var(--action);
		color: var(--action-text);
		width: 100%;
		border-radius: 999px;
		padding: 0.75rem 1rem;
		font-size: 1.25rem;
		&:hover {
			background-color: var(--action-high);
			color: var(--action-text-high);
		}
	}
	.collections {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		button {
			margin: 0.5rem 0 0;
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
		h3 {
			margin: 0;
			font-size: 1.15rem;
			color: var(--text);
			border-bottom: 1px solid var(--outline);
			padding-bottom: 0.5rem;
		}
		.config-buttons {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			button {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				gap: 0.75rem;
				width: 100%;
				padding: 0.75rem 1rem;
				background-color: var(--bg-high);
				color: var(--text);
				border: 1px solid var(--outline);
				border-radius: var(--radius-2);
				font-weight: 500;
				font-size: 0.95rem;
				cursor: pointer;
				transition: all 0.2s ease;
				&:hover {
					background-color: var(--action);
					color: var(--action-text);
					border-color: var(--action);
				}
			}
		}
	}
	.collections-events-menu {
		.btn-remove {
			background-color: transparent;
			color: var(--error);
			border: 1px solid var(--error);
			padding: 0.5rem;
			font-size: 0.85rem;
			border-radius: var(--radius-2);
			cursor: pointer;
			font-weight: 500;
			transition: all 0.2s ease;
			width: 100%;
			margin-top: 0.75rem;
			&:hover {
				background-color: var(--error);
				color: white;
			}
		}
		.calendar-panel-content {
			display: flex;
			flex-direction: column;
			gap: 1.25rem;
		}
		.calendar-item {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			border-bottom: 1px dashed var(--outline);
			padding-bottom: 1rem;
			&:last-child {
				border-bottom: none;
				padding-bottom: 0;
			}
		}
		.calendar-header-row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 0.95rem;
			strong {
				color: var(--text);
			}
			.event-count {
				font-size: 0.8rem;
				opacity: 0.7;
			}
		}
		.last-updated {
			font-size: 0.75rem;
			opacity: 0.6;
			display: block;
		}
		.calendar-actions {
			display: flex;
			gap: 0.5rem;
			margin-top: 0.75rem;
			button {
				flex: 1;
				padding: 0.5rem;
				font-size: 0.85rem;
				border-radius: var(--radius-2);
				cursor: pointer;
				font-weight: 500;
				transition: all 0.2s ease;
			}
			.btn-import {
				background-color: var(--action);
				color: var(--action-text);
				&:hover {
					background-color: var(--action-high);
					color: var(--action-text-high);
				}
			}
			.btn-remove {
				width: auto;
				margin-top: 0;
			}
		}
		.btn-add {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;
			width: 100%;
			padding: 0.75rem;
			background-color: var(--bg-high);
			color: var(--text);
			border: 1px dashed var(--outline);
			border-radius: var(--radius);
			font-weight: bold;
			font-size: 0.9rem;
			cursor: pointer;
			transition: all 0.2s ease;
			&:hover {
				background-color: var(--action);
				color: var(--action-text);
				border-color: var(--action);
			}
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
</style>
