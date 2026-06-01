<script lang="ts">
	import { page } from '$app/state';
	import { replaceState } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import SettingsIcon from '~icons/fa/cog';
	import LoadingIcon from '~icons/eos-icons/bubble-loading';
	import CaretUpIcon from '~icons/fa/caret-up';
	import CaretDownIcon from '~icons/fa/caret-down';
	import SaveIcon from '~icons/fa/save';
	import LoadIcon from '~icons/fa/history';
	import ExportIcon from '~icons/fa/download';
	import ImportIcon from '~icons/fa/upload';
	import PrintIcon from '~icons/fa/print';
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
	let showMenu = $state(true);
	let showAdvancedSettings = $state(false);
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
		<h2>Settings</h2>
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
			<div class="checkbox">
				<input
					type="checkbox"
					bind:checked={settings.date.startWeekOnSunday}
					id="startWeekOnSunday" />
				<label for="startWeekOnSunday">Start Week on Sunday</label>
			</div>
			<div class="checkbox">
				<input
					type="checkbox"
					bind:checked={enableHighResolution}
					id="enableHighResolution" />
				<label for="enableHighResolution">Print in high resolution (bigger file)</label>
			</div>

			{#if showAdvancedSettings}
				<details>
					<summary><h3>Design</h3></summary>
					<fieldset>
						<label for="designFont">Font</label>
						<select id="designFont" bind:value={settings.design.font}>
							{#each fonts as font (font.name)}
								<option value={font.name}>{font.name}</option>
							{/each}
						</select>
					</fieldset>
					<fieldset>
						<label for="start">Text Color</label>
						<input
							type="color"
							placeholder="Text Color"
							id="start"
							bind:value={settings.design.colorText} />
					</fieldset>
					<fieldset>
						<label for="start">Lines/Border Color</label>
						<input
							type="color"
							placeholder="Lines/Border"
							id="start"
							bind:value={settings.design.colorLines} />
					</fieldset>
					<fieldset>
						<label for="start">Dots Color</label>
						<input
							type="color"
							placeholder="Lines/Border"
							id="start"
							bind:value={settings.design.colorDots} />
					</fieldset>
				</details>
				<details>
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
				<details>
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
				<details>
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

				<details>
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
							<h3 style="margin: 0;">Dashboard View</h3>
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

				<details>
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
							<h3 style="margin: 0;">Yearly View</h3>
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

				<details>
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
							<h3 style="margin: 0;">Quarterly View</h3>
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
								<label for="quarterNotePagesTemplate">
									Additional Note Pages Template
								</label>
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

				<details>
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
							<h3 style="margin: 0;">Monthly View</h3>
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

				<details>
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
							<h3 style="margin: 0;">Weekly View</h3>
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
							<label for="sideNavDisplay">Sidebar Display</label>
							<select id="sideNavDisplay" bind:value={settings.weekPage.sideNavDisplay}>
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

				<details>
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
							<h3 style="margin: 0;">Daily View</h3>
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
							<label for="sideNavDisplay">Sidebar Display</label>
							<select id="sideNavDisplay" bind:value={settings.dayPage.sideNavDisplay}>
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

				<details>
					<summary><h3>Collections</h3></summary>
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
									<select
										id="collection-{collection.id}-type"
										bind:value={collection.type}>
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
									onclick={() => settings.collections.splice(i, 1)}
									style:color="var(--error)">
									Remove Collection
								</button>
							</fieldset>
						{/each}
						<button
							type="button"
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
							Add New Collection
						</button>
					</div>
				</details>

				<details>
					<summary><h3>Calendar Events</h3></summary>
					{#each settings.calendars as calendar, i (calendar.url)}
						<h4 style="margin-top: 1rem;">
							{calendar.name || 'Custom Calendar'} ({calendar.events.length} Events)
							{#if calendar.lastUpdated}
								<p
									style="display: block; font-weight: normal; font-size: .8rem; opacity: .8">
									Last Updated: {new Date(calendar.lastUpdated).toLocaleString()}
								</p>
							{/if}
						</h4>
						<fieldset>
							<label for="calendar-{i}-url">Calendar URL (ICS file)</label>
							<input
								type="text"
								placeholder="Calendar URL (ICS file)"
								id="calendar-{i}-url"
								bind:value={calendar.url} />
						</fieldset>
						<div style="display: flex;">
							<button
								type="button"
								style="flex: 1"
								disabled={settings.calendars.some((calendar) => calendar.updating)}
								onclick={() => settings.importEvents(i)}>
								{calendar.updating ? `Importing...` : `Import Events`}
							</button>
							<button
								type="button"
								style="flex: 1"
								disabled={settings.calendars.some((calendar) => calendar.updating)}
								onclick={() => settings.calendars.splice(i, 1)}
								style:color="var(--error)">
								Remove Calendar
							</button>
						</div>
					{/each}
					<button
						type="button"
						disabled={settings.calendars.some((calendar) => calendar.updating)}
						onclick={() =>
							settings.calendars.push({
								events: [],
								lastUpdated: 0,
								name: '',
								updating: false,
								url: '',
							})}>
						Add New Calendar
					</button>
				</details>
			{:else}
				<button
					type="button"
					style="margin: 1rem 0;"
					onclick={() => (showAdvancedSettings = true)}>
					Advanced Settings
				</button>
			{/if}

			<div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
				<button
					class="secondary"
					style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
					type="button"
					onclick={saveConfig}>
					<SaveIcon /> Save
				</button>
				<button
					class="secondary"
					style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
					type="button"
					onclick={loadConfig}>
					<LoadIcon /> Load
				</button>
			</div>
			<div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
				<button
					class="secondary"
					style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
					type="button"
					onclick={exportConfig}>
					<ExportIcon /> Export
				</button>
				<button
					class="secondary"
					style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
					type="button"
					onclick={importConfig}>
					<ImportIcon /> Import
				</button>
			</div>
		</form>
	</div>
{/if}
<button onclick={() => window.print()} class="print-trigger" title="Print to PDF">
	<PrintIcon />
</button>
<button onclick={() => (showMenu = !showMenu)} class="menu-trigger">
	<SettingsIcon />
</button>
<Toast />

<main
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
		bottom: 1rem;
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
	@media print {
		.menu,
		.menu-trigger,
		.print-trigger {
			display: none;
		}
	}
</style>
