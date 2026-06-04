<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { PRESETS } from '$lib/data/presets';
	import { THEMES } from '$lib/data/themes';
	import { browser } from '$app/environment';
	import { fonts, getGoogleFontURL, getFontInfo } from '../fonts/fonts';
	import { PlannerSettings } from '$lib/state/planner-settings.svelte';
	import MagicIcon from '~icons/fa/magic';
	import FontIcon from '~icons/fa/font';
	import CalendarIcon from '~icons/fa/calendar';
	import BookIcon from '~icons/fa/book';
	import PuzzleIcon from '~icons/fa/puzzle-piece';
	import SaveIcon from '~icons/fa/save';
	import KeyboardIcon from '~icons/fa/keyboard-o';
	import LinkIcon from '~icons/fa/link';
	import CaretRightIcon from '~icons/fa/caret-right';
	import Page from '$lib/components/Page.svelte';
	import TemplateThumbnail from '$lib/components/TemplateThumbnail.svelte';

	const appVersion = __APP_VERSION__;

	let {
		onClose = (() => {}) as () => void,
		onOpenPresets = (() => {}) as () => void,
		onOpenGallery = (() => {}) as () => void,
		openTemplatePicker = ((_allowed: any[], _onSelect: Function, _curr: string) => {}) as Function,
		getAvailablePageTemplates = ((_loc: string) => PAGE_TEMPLATES) as Function,
		settings = {} as PlannerSettings,
	} = $props();

	function handleKeyup(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
		}
	}

	let activeStep = $state(0);

	const steps = [
		{ id: 'presets', title: 'Presets', icon: MagicIcon },
		{ id: 'design', title: 'Design', icon: FontIcon },
		{ id: 'calendar', title: 'Calendar', icon: CalendarIcon },
		{ id: 'templates', title: 'Templates', icon: BookIcon },
		{ id: 'collections', title: 'Collections', icon: PuzzleIcon },
		{ id: 'events', title: 'Events', icon: LinkIcon },
		{ id: 'export', title: 'Export', icon: SaveIcon },
	];

	import { PAGE_TEMPLATES } from '$lib/data/templates';

	let isPeeking = $state(false);
	let selectedPresetId = $state('');
	let activeFontPicker = $state<'font' | 'fontDisplay' | 'coverFont' | 'topNavFont' | 'sideNavFont' | null>(null);

	const fontPickerTitle = $derived.by(() => {
		const isBody = activeFontPicker === 'font';
		const isDisplay = activeFontPicker === 'fontDisplay';
		const isCover = activeFontPicker === 'coverFont';
		const isTopNav = activeFontPicker === 'topNavFont';
		if (isBody) return 'Body Font';
		if (isDisplay) return 'Display Font';
		if (isCover) return 'Cover Font';
		if (isTopNav) return 'Topbar Font';
		return 'Sidebar Font';
	});

	const selectedFontName = $derived.by(() => {
		const isBody = activeFontPicker === 'font';
		const isDisplay = activeFontPicker === 'fontDisplay';
		const isCover = activeFontPicker === 'coverFont';
		const isTopNav = activeFontPicker === 'topNavFont';
		if (isBody) return settings.design.font;
		if (isDisplay) return settings.design.fontDisplay;
		if (isCover) return settings.coverPage.font;
		if (isTopNav) return settings.topNav.font;
		return settings.sideNav.font;
	});

	const fontBaseSize = $derived.by(() => {
		const isDisplayOrCover = activeFontPicker === 'fontDisplay' || activeFontPicker === 'coverFont';
		return isDisplayOrCover ? '1.5rem' : '1.1rem';
	});

	const previewFontsURLs = $derived.by(() => {
		const batchSize = 10;
		const urls: string[] = [];
		const fontNames = fonts.map((f) => f.name);
		
		for (let i = 0; i < fontNames.length; i += batchSize) {
			const batch = fontNames.slice(i, i + batchSize);
			const params = new URLSearchParams(batch.map((name) => ['family', `${name}:wght@400`]));
			params.append('display', 'swap');
			urls.push(`https://fonts.googleapis.com/css2?${params.toString()}`);
		}
		
		return urls;
	});
	
	let customPresets = $state<{id: string, name: string, icon: string, description: string, config: any}[]>([]);
	let showSaveConfirm = $state(false);
	let newPresetName = $state('');
	let newPresetIcon = $state('✨');

	$effect(() => {
		const isBrowserContext = browser;
		if (isBrowserContext) {
			const stored = localStorage.getItem('ro_custom_presets');
			const hasStoredPresets = !!stored;
			if (hasStoredPresets) {
				try {
					customPresets = JSON.parse(stored);
				} catch (e) {
					console.error('Failed to parse custom presets', e);
				}
			}
			selectedPresetId = localStorage.getItem('ro_selected_preset_id') || 'standard';
		}
	});

	function saveCustomPreset() {
		const isNameEmpty = !newPresetName.trim();
		if (isNameEmpty) return;
		const newPreset = {
			id: `custom-${Date.now()}`,
			name: newPresetName.trim(),
			icon: newPresetIcon,
			description: 'Custom preset created by you.',
			config: settings.serialize()
		};
		customPresets = [...customPresets, newPreset];
		const isBrowserContext = browser;
		if (isBrowserContext) {
			localStorage.setItem('ro_custom_presets', JSON.stringify(customPresets));
		}
		showSaveConfirm = false;
		newPresetName = '';
	}

	function deleteCustomPreset(id: string) {
		customPresets = customPresets.filter(p => p.id !== id);
		const isBrowserContext = browser;
		if (isBrowserContext) {
			localStorage.setItem('ro_custom_presets', JSON.stringify(customPresets));
		}
	}

	function applyPresetConfig(presetConfig: any, isStandard: boolean) {
		const url = new URL(document.location.href);
		if (isStandard) {
			url.searchParams.delete('settings');
		} else {
			url.searchParams.set('settings', JSON.stringify(presetConfig));
		}
		window.history.replaceState({}, '', url);
		
		const defaultSettings = new PlannerSettings().serialize();
		settings.deserialize(defaultSettings);
		settings.deserialize(presetConfig);
	}

	function loadPreset(preset: (typeof PRESETS)[number] | typeof customPresets[number]) {
		const isNotBrowser = !browser;
		if (isNotBrowser) return;
		const isStandardPreset = preset.id === 'standard';
		applyPresetConfig(preset.config, isStandardPreset);
		selectedPresetId = preset.id;
		localStorage.setItem('ro_selected_preset_id', preset.id);
		setTimeout(() => {
			activeStep = 1;
		}, 400);
	}

	function startFromScratch() {
		const defaultSettings = new PlannerSettings().serialize();
		applyPresetConfig(defaultSettings, true);
		selectedPresetId = '';
		const isBrowserContext = browser;
		if (isBrowserContext) {
			localStorage.removeItem('ro_selected_preset_id');
		}
		activeStep = 1;
	}

	function downloadJson() {
		const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings.serialize(), null, 2));
		const downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute("href",     dataStr);
		downloadAnchorNode.setAttribute("download", "planner-preset.json");
		document.body.appendChild(downloadAnchorNode); // required for firefox
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	}

	function copyShareableLink() {
		const url = new URL(document.location.href);
		url.searchParams.set('settings', JSON.stringify(settings.serialize()));
		navigator.clipboard.writeText(url.toString()).then(() => {
			// Silently succeed
		});
	}

	function updateDate(type: 'start' | 'end', event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.value) {
			const [year, month, day] = target.value.split('-').map(Number);
			settings.date[type] = new Date(Date.UTC(year, month - 1, day));
		}
	}
	
	function formatDateForInput(d: Date) {
		const year = d.getUTCFullYear();
		const month = String(d.getUTCMonth() + 1).padStart(2, '0');
		const day = String(d.getUTCDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	let newCollectionName = $state('');
	function addCollection() {
		if (!newCollectionName.trim()) return;
		settings.collections = [
			...settings.collections,
			{
				id: `custom-${Date.now()}`,
				name: newCollectionName.trim(),
				total: 100,
				type: 'lined',
				numIndexPages: 1,
				columns: 1,
				numPagesPerItem: 1,
			}
		];
		newCollectionName = '';
	}

	let newCalendarName = $state('');
	let newCalendarUrl = $state('');
	function addCalendar() {
		if (!newCalendarUrl.trim()) return;
		settings.calendars = [
			...settings.calendars,
			{
				url: newCalendarUrl.trim(),
				name: newCalendarName.trim() || 'New Calendar',
				events: [],
				updating: false,
				lastUpdated: 0,
			}
		];
		newCalendarName = '';
		newCalendarUrl = '';
	}

	function cycleFont(type: 'font' | 'fontDisplay', direction: 'next' | 'prev') {
		const currentFontName = type === 'font' ? settings.design.font : settings.design.fontDisplay;
		const currentIndex = fonts.findIndex((f) => f.name === currentFontName);
		const fontNotFound = currentIndex === -1;
		if (fontNotFound) return;

		const isNext = direction === 'next';
		let newIndex = currentIndex + (isNext ? 1 : -1);
		const reachedEnd = newIndex >= fonts.length;
		const reachedStart = newIndex < 0;

		if (reachedEnd) {
			newIndex = 0;
		} else if (reachedStart) {
			newIndex = fonts.length - 1;
		}

		const isBodyFont = type === 'font';
		if (isBodyFont) {
			settings.design.font = fonts[newIndex].name;
		} else {
			settings.design.fontDisplay = fonts[newIndex].name;
		}
	}

	function applyTheme(themeId: string) {
		const theme = THEMES.find((t) => t.id === themeId);
		if (!theme) return;

		settings.design.themeId = theme.id;
		settings.design.font = theme.config.design.font;
		settings.design.fontDisplay = theme.config.design.fontDisplay;
		settings.design.colorBg = theme.config.design.colorBg;
		settings.design.colorNavBg = theme.config.design.colorNavBg;
		settings.design.colorText = theme.config.design.colorText;
		settings.design.colorLines = theme.config.design.colorLines;
		settings.design.colorDots = theme.config.design.colorDots;

		settings.coverPage.font = theme.config.coverPage.font;
		settings.coverPage.darkBackground = theme.config.coverPage.darkBackground;
		if (theme.config.coverPage.backgroundStyle) {
			settings.coverPage.backgroundStyle = theme.config.coverPage.backgroundStyle;
		}
		if (theme.config.coverPage.backgroundSeed !== undefined) {
			settings.coverPage.backgroundSeed = theme.config.coverPage.backgroundSeed;
		}
		if (theme.config.coverPage.backgroundComplexity !== undefined) {
			settings.coverPage.backgroundComplexity = theme.config.coverPage.backgroundComplexity;
		}
		if (theme.config.coverPage.backgroundPalette) {
			settings.coverPage.backgroundPalette = [...theme.config.coverPage.backgroundPalette];
		}

		settings.topNav.font = theme.config.topNav.font;
		settings.sideNav.font = theme.config.sideNav.font;

		if (theme.config.dashboardPage?.fontSize !== undefined) {
			settings.dashboardPage.fontSize = theme.config.dashboardPage.fontSize;
		}
	}
</script>

<svelte:window on:keyup={handleKeyup} />

<div class="help-modal">
	<div class="wizard" class:peeking={isPeeking} transition:scale={{ duration: 150 }}>
		<header>
			<h2>Remarkably Organized Planner Guide</h2>
			<div class="header-actions">
				<button 
					class="peek-btn" 
					onpointerdown={() => isPeeking = true} 
					onpointerup={() => isPeeking = false}
					onpointerleave={() => isPeeking = false}
					title="Hold to Peek">
					👁️
				</button>
				<button class="close-btn" aria-label="Close guide" onclick={onClose}>✕</button>
			</div>
		</header>

		<div class="wizard-progress">
			{#each steps as step, index}
				{@const Icon = step.icon}
				<button
					class="step-item"
					class:active={activeStep === index}
					class:completed={activeStep > index}
					onclick={() => (activeStep = index)}
					type="button">
					<div class="step-icon">
						<Icon />
					</div>
					<span class="step-label">{step.title}</span>
				</button>
				{#if index < steps.length - 1}
					<div class="step-separator">
						<CaretRightIcon />
					</div>
				{/if}
			{/each}
		</div>

		<div class="wizard-body">
			{#if activeStep === 0}
				<!-- Presets -->
				<div class="step-content" in:fade={{ duration: 150 }}>
					<h3>Presets Library</h3>
					<p>
						Start with a pre-configured template or <button class="text-link" onclick={startFromScratch}>build your layout from scratch</button>.
					</p>
					
					<div class="preset-cards-grid">
						{#each PRESETS as preset}
							{@const isSelected = selectedPresetId === preset.id}
							<button
								class="preset-card tooltip-target"
								class:selected={isSelected}
								onclick={() => loadPreset(preset)}
								data-tooltip={preset.description}>
								<div class="preset-icon">{preset.icon}</div>
								<div class="preset-info">
									<h4>{preset.name}</h4>
								</div>
							</button>
						{/each}
					</div>

					{#if customPresets.length > 0}
						<h4 style="margin-top: 2rem; margin-bottom: 0.5rem; font-size: 1rem;">My Presets</h4>
						<div class="preset-buttons" style="margin-top: 0; padding-top: 0; border-top: none;">
							{#each customPresets as preset}
								{@const isSelectedCustom = selectedPresetId === preset.id}
								<div class="custom-preset-wrapper">
									<button
										class="preset-btn tooltip-target"
										class:selected={isSelectedCustom}
										onclick={() => loadPreset(preset)}
										data-tooltip={preset.description}>
										<span class="preset-icon">{preset.icon}</span>
										<span class="preset-name">{preset.name}</span>
									</button>
									<button class="delete-preset-btn" onclick={() => deleteCustomPreset(preset.id)} title="Delete Preset">✕</button>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{:else if activeStep === 1}
				<!-- Design -->
				<div class="step-content" style="position: relative;" in:fade={{ duration: 150 }}>
					<h3>Design & Typography</h3>
					<p>Configure the physical aesthetics, fonts, and colors of your planner.</p>
					
					<div class="design-config design-rows">
						<div class="design-row-item">
							<h4>Theme Colors</h4>
							<div class="colors-row">
								
								<div class="color-picker-item">
									<label for="guide-color-bg">Page</label>
									<input type="color" id="guide-color-bg" bind:value={settings.design.colorBg} title={settings.design.colorBg} />
								</div>
								<div class="color-picker-item">
									<label for="guide-color-nav">Sidebar</label>
									<input type="color" id="guide-color-nav" bind:value={settings.design.colorNavBg} title={settings.design.colorNavBg} />
								</div>
								<div class="color-picker-item">
									<label for="guide-color-text">Text</label>
									<input type="color" id="guide-color-text" bind:value={settings.design.colorText} title={settings.design.colorText} />
								</div>
								<div class="color-picker-item">
									<label for="guide-color-lines">Lines</label>
									<input type="color" id="guide-color-lines" bind:value={settings.design.colorLines} title={settings.design.colorLines} />
								</div>
								<div class="color-picker-item">
									<label for="guide-color-dots">Dots</label>
									<input type="color" id="guide-color-dots" bind:value={settings.design.colorDots} title={settings.design.colorDots} />
								</div>
								<div class="color-picker-item theme-col">
									<label for="guide-theme-select">Load Preset</label>
									<select id="guide-theme-select" value={settings.design.themeId} onchange={(e) => applyTheme((e.target as HTMLSelectElement).value)}>
										{#each THEMES as themeOption}
											<option value={themeOption.id}>{themeOption.icon} {themeOption.name}</option>
										{/each}
									</select>
								</div>
							</div>
						</div>

						<div class="design-row-item">
							<h4>Typography</h4>
							<div class="typography-rows-container">
								<div class="font-selector-row" style="font-family: '{settings.design.font}' !important; font-size: calc(1.1rem * {getFontInfo(settings.design.font)?.size || 1});">
									<span class="font-label">Body Font:</span>
									<button 
										type="button" 
										class="font-name-link" 
										onclick={() => activeFontPicker = 'font'}
										aria-label="Select body font">
										{settings.design.font}
									</button>
								</div>
								
								<div class="font-selector-row" style="font-family: '{settings.design.fontDisplay}' !important; font-size: calc(1.5rem * {getFontInfo(settings.design.fontDisplay)?.size || 1});">
									<span class="font-label">Display Font:</span>
									<button 
										type="button" 
										class="font-name-link" 
										onclick={() => activeFontPicker = 'fontDisplay'}
										aria-label="Select display font">
										{settings.design.fontDisplay}
									</button>
								</div>
								<div class="font-selector-row" style="font-family: '{settings.coverPage.font}' !important; font-size: calc(1.5rem * {getFontInfo(settings.coverPage.font)?.size || 1});">
									<span class="font-label">Cover Font:</span>
									<button 
										type="button" 
										class="font-name-link" 
										onclick={() => activeFontPicker = 'coverFont'}
										aria-label="Select cover page font">
										{settings.coverPage.font}
									</button>
								</div>

								<div class="font-selector-row" style="font-family: '{settings.topNav.font}' !important; font-size: calc(1.1rem * {getFontInfo(settings.topNav.font)?.size || 1});">
									<span class="font-label">Top Nav Font:</span>
									<button 
										type="button" 
										class="font-name-link" 
										onclick={() => activeFontPicker = 'topNavFont'}
										aria-label="Select top nav font">
										{settings.topNav.font}
									</button>
								</div>

								<div class="font-selector-row" style="font-family: '{settings.sideNav.font}' !important; font-size: calc(1.1rem * {getFontInfo(settings.sideNav.font)?.size || 1});">
									<span class="font-label">Side Nav Font:</span>
									<button 
										type="button" 
										class="font-name-link" 
										onclick={() => activeFontPicker = 'sideNavFont'}
										aria-label="Select side nav font">
										{settings.sideNav.font}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			{:else if activeStep === 2}
				<!-- Calendar -->
				<div class="step-content" in:fade={{ duration: 150 }}>
					<h3>Calendar Spreads</h3>
					<p>Generate highly structured, interlinked chronological spreads.</p>
					
					<div class="calendar-config">
						<div class="date-row">
							<div class="date-field">
								<label for="guide-date-start">Start Date</label>
								<input type="date" id="guide-date-start" value={formatDateForInput(settings.date.start)} onchange={(e) => updateDate('start', e)} />
							</div>
							<div class="date-field">
								<label for="guide-date-end">End Date</label>
								<input type="date" id="guide-date-end" value={formatDateForInput(settings.date.end)} onchange={(e) => updateDate('end', e)} />
							</div>
						</div>
						
						<h4>Enable Spreads</h4>
						<div class="toggles-grid">
							<label class="toggle-label">
								<input type="checkbox" checked={!settings.yearPage.disable} onchange={(e) => settings.yearPage.disable = !e.currentTarget.checked} />
								Yearly Overview
							</label>
							<label class="toggle-label">
								<input type="checkbox" checked={!settings.quarterPage.disable} onchange={(e) => settings.quarterPage.disable = !e.currentTarget.checked} />
								Quarterly Pages
							</label>
							<label class="toggle-label">
								<input type="checkbox" checked={!settings.monthPage.disable} onchange={(e) => settings.monthPage.disable = !e.currentTarget.checked} />
								Monthly Calendars
							</label>
							<label class="toggle-label">
								<input type="checkbox" checked={!settings.weekPage.disable} onchange={(e) => settings.weekPage.disable = !e.currentTarget.checked} />
								Weekly Agendas
							</label>
							<label class="toggle-label">
								<input type="checkbox" checked={!settings.customCollections.disable} onchange={(e) => settings.customCollections.disable = !e.currentTarget.checked} />
								Custom Collections
							</label>
							<label class="toggle-label">
								<input type="checkbox" checked={!settings.dayPage.disable} onchange={(e) => settings.dayPage.disable = !e.currentTarget.checked} />
								Daily Pages
							</label>
						</div>
					</div>
				</div>
			{:else if activeStep === 3}
				<!-- Templates -->
				<div class="step-content" in:fade={{ duration: 150 }}>
					<h3>Page Templates</h3>
					<p>Pick the best layout for your notes, tasks, and habits.</p>
					
					<div class="templates-config">
						<div class="template-previews">
							<div class="preview-col">
								<label>Monthly Layout</label>
								<TemplateThumbnail
									templateValue={settings.monthPage.template}
									templateName={PAGE_TEMPLATES.find(t => t.value === settings.monthPage.template)?.name || 'Select Template'}
									{settings}
									timeframe={settings.months[0] || {}}
									disabled={settings.monthPage.disable}
									onclick={() => openTemplatePicker(
										getAvailablePageTemplates('month'),
										(val: any) => settings.monthPage.template = val,
										settings.monthPage.template
									)} />
							</div>
							
							<div class="preview-col">
								<label>Weekly Layout</label>
								<TemplateThumbnail
									templateValue={settings.weekPage.template}
									templateName={PAGE_TEMPLATES.find(t => t.value === settings.weekPage.template)?.name || 'Select Template'}
									{settings}
									timeframe={settings.weeks[0] || {}}
									disabled={settings.weekPage.disable}
									onclick={() => openTemplatePicker(
										getAvailablePageTemplates('week'),
										(val: any) => settings.weekPage.template = val,
										settings.weekPage.template
									)} />
							</div>
							
							<div class="preview-col">
								<label>Daily Layout</label>
								<TemplateThumbnail
									templateValue={settings.dayPage.template}
									templateName={PAGE_TEMPLATES.find(t => t.value === settings.dayPage.template)?.name || 'Select Template'}
									{settings}
									timeframe={settings.days[0] || {}}
									disabled={settings.dayPage.disable}
									onclick={() => openTemplatePicker(
										getAvailablePageTemplates('day'),
										(val: any) => settings.dayPage.template = val,
										settings.dayPage.template
									)} />
							</div>
						</div>
					</div>
				</div>
			{:else if activeStep === 4}
				<!-- Collections -->
				<div class="step-content" in:fade={{ duration: 150 }}>
					<h3>Custom Collections</h3>
					<p>Extend your planner with modular notebooks and custom sections.</p>
					
					<div class="collections-config">
						<div class="add-collection-row">
							<input type="text" placeholder="New collection name..." bind:value={newCollectionName} onkeydown={(e) => e.key === 'Enter' && addCollection()} />
							<button class="add-btn" onclick={addCollection}>Add</button>
						</div>
						
						{#if settings.collections.length > 0}
							<div class="collections-grid-previews">
								{#each settings.collections as collection, index}
									<div class="collection-col relative">
										<label>
											<span class="truncate">{collection.name}</span>
											<button class="delete-btn-small" onclick={() => settings.collections = settings.collections.filter((_, i) => i !== index)} aria-label="Delete Collection" title="Delete Collection">✕</button>
										</label>
										<TemplateThumbnail
											templateValue={collection.type}
											templateName={PAGE_TEMPLATES.find(t => t.value === collection.type)?.name || 'Select Template'}
											{settings}
											timeframe={{}}
											onclick={() => openTemplatePicker(
												getAvailablePageTemplates('collection'),
												(val: any) => collection.type = val,
												collection.type
											)} />
									</div>
								{/each}
							</div>
						{:else}
							<p class="empty-state">No custom collections yet.</p>
						{/if}
					</div>
				</div>
			{:else if activeStep === 5}
				<!-- Events -->
				<div class="step-content" in:fade={{ duration: 150 }}>
					<h3>Sync Calendar Events</h3>
					<p>Automatically populate your spreads with real-world events via public ICS links.</p>
					
					<div class="events-config">
						<div class="add-event-row">
							<input type="text" placeholder="Name (e.g. Holidays)" bind:value={newCalendarName} />
							<input type="url" placeholder="https://.../basic.ics" bind:value={newCalendarUrl} onkeydown={(e) => e.key === 'Enter' && addCalendar()} />
							<button class="add-btn" onclick={addCalendar}>Add</button>
						</div>
						
						{#if settings.calendars.length > 0}
							<div class="calendars-list">
								{#each settings.calendars as calendar, index}
									<div class="calendar-item">
										<div class="calendar-info">
											<span class="calendar-name">{calendar.name || 'Untitled Calendar'}</span>
											<span class="calendar-url">{calendar.url}</span>
										</div>
										<button class="delete-btn" onclick={() => settings.calendars = settings.calendars.filter((_, i) => i !== index)} aria-label="Delete Calendar">✕</button>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			{:else if activeStep === 6}
				<!-- Export -->
				<div class="step-content export-step" in:fade={{ duration: 150 }}>
					<h3>Backup & Export</h3>
					<p>Save your setup, generate a shareable link, or compile your master digital planner.</p>
					
					<div class="export-actions">
						{#if !showSaveConfirm}
							<button class="export-btn primary" onclick={() => showSaveConfirm = true}>
								<span class="icon">💾</span> Save as Custom Preset
							</button>
							<button class="export-btn" onclick={copyShareableLink}>
								<span class="icon">🔗</span> Copy Shareable Link
							</button>
							<button class="export-btn" onclick={downloadJson}>
								<span class="icon">⬇️</span> Download Settings (.json)
							</button>
						{:else}
							<div class="save-confirm-box" in:fade={{ duration: 150 }}>
								<h4>Save Custom Preset</h4>
								<div class="input-group-row">
									<div class="input-group icon-input">
										<label for="guide-preset-icon">Icon</label>
										<input id="guide-preset-icon" type="text" maxlength="2" bind:value={newPresetIcon} />
									</div>
									<div class="input-group name-input">
										<label for="guide-preset-name">Preset Name</label>
										<input id="guide-preset-name" type="text" placeholder="My Awesome Planner" bind:value={newPresetName} onkeydown={(e) => e.key === 'Enter' && saveCustomPreset()} />
									</div>
								</div>
								<div class="save-actions">
									<button class="cancel-btn" onclick={() => showSaveConfirm = false}>Cancel</button>
									<button class="save-btn" onclick={saveCustomPreset} disabled={!newPresetName.trim()}>Save Preset</button>
								</div>
							</div>
						{/if}
					</div>
				</div>
			{/if}
		</div>

		<footer class="wizard-footer">
			<button class="btn-nav" disabled={activeStep === 0} onclick={() => activeStep--}>
				Back
			</button>
			<div class="footer-center">
				<div class="footer-dots">
					{#each steps as _, index}
						<span class="dot" class:active={activeStep === index}></span>
					{/each}
				</div>
				<span class="version">v{appVersion}</span>
			</div>
			{#if activeStep < steps.length - 1}
				<button class="btn-nav primary" onclick={() => activeStep++}>Next</button>
			{:else}
				<a href="https://www.buymeacoffee.com/youmeos" target="_blank" rel="noopener noreferrer" onclick={onClose} class="buy-coffee-link" style="display: flex; align-items: center; justify-content: center; overflow: visible; height: 50px;"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a Taco&emoji=🌮&slug=youmeos&button_colour=555555&font_colour=ffffff&font_family=Cookie&outline_colour=000000&coffee_colour=FFDD00" alt="Buy a Taco" style="height: 100%; border-radius: var(--radius-3); box-shadow: var(--shadow-2);" /></a>
			{/if}
		</footer>
	</div>
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="help-bg"
		class:peeking={isPeeking}
		role="presentation"
		transition:fade={{ duration: 150 }}
		onclick={onClose}>
	</div>

	{#if activeFontPicker !== null}
		<div class="font-picker-modal" transition:fade={{ duration: 150 }}>
			<div class="font-picker-content" transition:scale={{ duration: 150 }}>
				<header>
					<h3>Select {fontPickerTitle}</h3>
					<button class="close-btn" onclick={() => activeFontPicker = null}>✕</button>
				</header>
				<div class="font-csv-list">
					{#each fonts as fontOption, index}
						{@const isSelected = selectedFontName === fontOption.name}
						<button
							type="button"
							class="font-csv-item"
							class:selected={isSelected}
							style="font-family: '{fontOption.name}' !important; font-size: calc({fontBaseSize} * {fontOption.size || 1}) !important;"
							onclick={() => {
								if (activeFontPicker === 'font') {
									settings.design.font = fontOption.name;
								} else if (activeFontPicker === 'fontDisplay') {
									settings.design.fontDisplay = fontOption.name;
								} else if (activeFontPicker === 'coverFont') {
									settings.coverPage.font = fontOption.name;
								} else if (activeFontPicker === 'topNavFont') {
									settings.topNav.font = fontOption.name;
								} else if (activeFontPicker === 'sideNavFont') {
									settings.sideNav.font = fontOption.name;
								}
								activeFontPicker = null;
							}}>
							{fontOption.name}
						</button>
						{#if index < fonts.length - 1}
							<span class="separator">, </span>
						{/if}
					{/each}
				</div>
			</div>
			<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
			<div class="font-picker-bg" onclick={() => activeFontPicker = null}></div>
		</div>
	{/if}
</div>

<svelte:head>
	{#if activeStep === 1 || activeFontPicker !== null}
		{#each previewFontsURLs as url}
			<link rel="stylesheet" href={url} />
		{/each}
	{/if}
</svelte:head>

<style lang="scss">
	.help-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(4px);
		z-index: 50;
		transition: opacity 0.2s ease;
		&.peeking {
			opacity: 0 !important;
		}
	}
	
	/* Added styles for the new wizard interactive elements */
	.calendar-config, .templates-config, .collections-config, .events-config {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-top: 1rem;
		
		h4 {
			margin: 0 0 0.5rem;
			font-size: 1rem;
			font-weight: 600;
			color: var(--text);
		}
		
		.date-row {
			display: flex;
			gap: 1rem;
			.date-field {
				display: flex;
				flex-direction: column;
				gap: 0.25rem;
				flex: 1;
				label {
					font-size: 0.75rem;
					font-weight: 600;
					color: var(--text-low);
					text-transform: uppercase;
					letter-spacing: 0.05em;
				}
				input[type="date"] {
					padding: 0.6rem;
					border-radius: var(--radius-2);
					border: 1px solid var(--outline);
					background-color: var(--bg);
					color: var(--text);
					font-family: inherit;
				}
			}
		}

		.toggles-grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
			gap: 0.75rem;
			.toggle-label {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				font-size: 0.9rem;
				cursor: pointer;
				input[type="checkbox"] {
					width: 1rem;
					height: 1rem;
					cursor: pointer;
					accent-color: var(--action);
				}
			}
		}
		
		.template-field {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			label {
				font-size: 0.8rem;
				font-weight: 600;
				color: var(--text);
			}
			select {
				padding: 0.6rem;
				border-radius: var(--radius-2);
				border: 1px solid var(--outline);
				background-color: var(--bg);
				color: var(--text);
				font-family: inherit;
				cursor: pointer;
				&:disabled {
					opacity: 0.5;
					cursor: not-allowed;
				}
			}
		}

		.template-previews {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			gap: 4px;
			margin-top: 1.5rem;
			width: 100%;

			.preview-col {
				width: calc(33.333% - 4px);
				max-width: calc(33.333% - 4px);
				flex-shrink: 0;
				display: flex;
				flex-direction: column;
				gap: 0.5rem;

				label {
					font-size: 0.8rem;
					font-weight: 600;
					color: var(--text);
					text-align: center;
				}
			}
		}

		.add-collection-row, .add-event-row {
			display: flex;
			gap: 0.5rem;
			input {
				flex: 1;
				padding: 0.6rem;
				border-radius: var(--radius-2);
				border: 1px solid var(--outline);
				background-color: var(--bg);
				color: var(--text);
				font-family: inherit;
			}
			.add-btn {
				padding: 0 1rem;
				border-radius: var(--radius-2);
				background-color: var(--bg-high);
				border: 1px solid var(--outline);
				color: var(--text);
				font-weight: 600;
				cursor: pointer;
				transition: all 0.2s ease;
				&:hover {
					background-color: var(--action);
					color: var(--action-text);
					border-color: var(--action);
				}
			}
		}

		.collections-grid-previews {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 8px;
			margin-top: 1.5rem;
			max-height: 300px;
			overflow-y: auto;
			padding-right: 4px;

			.collection-col {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;

				label {
					font-size: 0.8rem;
					font-weight: 600;
					color: var(--text);
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 0.25rem;

					.truncate {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						flex: 1;
					}

					.delete-btn-small {
						background: none;
						border: none;
						color: var(--text-low);
						cursor: pointer;
						padding: 2px 4px;
						font-size: 0.8rem;
						transition: color 0.2s;
						
						&:hover {
							color: var(--danger, red);
						}
					}
				}
			}
		}

		.calendars-list {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			max-height: 200px;
			overflow-y: auto;
			@include scrollbar;
			
			.calendar-item {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				background-color: var(--bg-high);
				padding: 0.5rem 0.75rem;
				border-radius: var(--radius-2);
				border: 1px solid var(--outline);
				
				.calendar-info {
					flex: 1;
					display: flex;
					flex-direction: column;
					gap: 0.1rem;
					min-width: 0;

					.calendar-name {
						font-size: 0.9rem;
						font-weight: 500;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.calendar-url {
						font-size: 0.75rem;
						color: var(--text-low);
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
				
				.delete-btn {
					background: none;
					border: none;
					color: var(--text-low);
					cursor: pointer;
					width: 1.5rem;
					height: 1.5rem;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 50%;
					transition: all 0.2s ease;
					&:hover {
						background-color: rgba(255, 0, 0, 0.1);
						color: red;
					}
				}
			}
		}
		
		.empty-state {
			text-align: center;
			color: var(--text-low);
			font-style: italic;
			font-size: 0.9rem;
			margin: 1rem 0;
		}
	}

	.export-actions {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: 1.5rem;
		
		.export-btn {
			display: flex;
			align-items: center;
			gap: 0.75rem;
			padding: 0.85rem 1.25rem;
			border-radius: var(--radius-3);
			background-color: var(--bg-high);
			border: 1px solid var(--outline);
			color: var(--text);
			font-weight: 600;
			font-size: 1rem;
			cursor: pointer;
			transition: all 0.2s ease;
			
			.icon {
				font-size: 1.25rem;
			}
			
			&:hover {
				background-color: var(--action);
				color: var(--action-text);
				border-color: var(--action);
				transform: translateY(-2px);
			}
			
			&.primary {
				background-color: var(--action);
				color: var(--action-text);
				border-color: var(--action);
				&:hover {
					opacity: 0.9;
				}
			}
		}
	}

	.save-confirm-box {
		background-color: var(--bg-high);
		border: 1px solid var(--outline);
		border-radius: var(--radius-3);
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		
		h4 {
			margin: 0;
			font-size: 1.1rem;
			color: var(--text);
		}
		
		.input-group-row {
			display: flex;
			gap: 1rem;
			.input-group {
				display: flex;
				flex-direction: column;
				gap: 0.35rem;
				label {
					font-size: 0.8rem;
					font-weight: 600;
					color: var(--text-low);
				}
				input {
					padding: 0.6rem;
					border-radius: var(--radius-2);
					border: 1px solid var(--outline);
					background-color: var(--bg);
					color: var(--text);
					font-family: inherit;
				}
				&.icon-input {
					flex: 0 0 60px;
					input { text-align: center; font-size: 1.2rem; }
				}
				&.name-input {
					flex: 1;
				}
			}
		}
		
		.save-actions {
			display: flex;
			justify-content: flex-end;
			gap: 0.5rem;
			margin-top: 0.5rem;
			
			button {
				padding: 0.6rem 1rem;
				border-radius: var(--radius-2);
				font-weight: 600;
				cursor: pointer;
				transition: all 0.2s ease;
				
				&.cancel-btn {
					background: none;
					border: 1px solid var(--outline);
					color: var(--text);
					&:hover { background-color: var(--bg); }
				}
				
				&.save-btn {
					background-color: var(--action);
					border: 1px solid var(--action);
					color: var(--action-text);
					&:hover:not(:disabled) { opacity: 0.9; }
					&:disabled {
						opacity: 0.5;
						cursor: not-allowed;
					}
				}
			}
		}
	}
	
	.help-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
		.wizard {
			background-color: var(--bg);
			color: var(--text);
			border-radius: var(--radius-5);
			box-shadow: var(--shadow-6);
			width: 55%;
			max-width: 1200px;
			max-height: 85vh;
			position: relative;
			z-index: 100;
			display: flex;
			flex-direction: column;
			border: 1px solid var(--outline);

			@media (max-width: 768px) {
				width: 100% !important;
				max-width: 100% !important;
				height: 100% !important;
				max-height: 100% !important;
				border-radius: 0 !important;
				border: none !important;

				.wizard-footer {
					border-radius: 0 !important;
				}
			}
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
				.header-actions {
					display: flex;
					align-items: center;
					gap: 0.5rem;
				}
			}

			&.peeking {
				opacity: 0.15;
				pointer-events: none;
				transition: opacity 0.2s ease;
			}

			.peek-btn {
				width: 2.25rem;
				height: 2.25rem;
				padding: 0;
				border-radius: var(--radius-round);
				border: 1px solid var(--outline);
				background-color: var(--bg-high);
				color: var(--text);
				font-size: 1rem;
				cursor: grab;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 0.2s ease;
				flex-shrink: 0;
				&:hover {
					background-color: var(--action);
					border-color: var(--action);
				}
				&:active {
					cursor: grabbing;
					transform: scale(0.95);
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
						font-size: 1rem;
						color: var(--text-low);
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
							color: #ffffff;
						}
						.step-label {
							color: var(--text);
						}
					}

					&.completed {
						.step-icon {
							background-color: var(--bg-high);
							border-color: var(--outline);
							color: var(--text-low);
						}
						.step-label {
							color: var(--text-low);
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

			.wizard-body {
				padding: 2.5rem;
				flex: 1;
				overflow-y: auto;
				min-height: 250px;
				@include scrollbar;

				.step-content {
					h3 {
						margin: 0 0 1rem;
						font-size: 1.4rem;
						font-weight: 600;
						color: var(--text);
					}
					p {
						font-size: 0.95rem;
						line-height: 1.5;
						margin: 0 0 1.25rem;
						opacity: 0.85;
					}
					ul {
						margin: 0;
						padding-left: 1.25rem;
						display: flex;
						flex-direction: column;
						gap: 0.75rem;
						li {
							font-size: 0.9rem;
							line-height: 1.5;
							strong {
								color: var(--text-high);
							}
						}
					}

					.link-btn {
						background: none;
						border: none;
						color: var(--action);
						text-decoration: underline;
						cursor: pointer;
						padding: 0;
						font-size: inherit;
						font-family: inherit;
						opacity: 0.9;
						&:hover {
							opacity: 1;
						}
					}

					.preset-cards-grid {
						display: grid;
						grid-template-columns: repeat(6, 1fr);
						gap: 1rem;
						margin-top: 1.5rem;
						
						.preset-card {
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							gap: 0.5rem;
							background-color: var(--bg-high);
							border: 1px solid var(--outline);
							padding: 1.25rem 0.5rem;
							border-radius: var(--radius-3);
							cursor: pointer;
							transition: all 0.2s ease;
							text-align: center;
							
							.preset-icon {
								font-size: 2rem;
							}
							
							.preset-info {
								display: flex;
								flex-direction: column;
								
								h4 {
									margin: 0;
									font-size: 0.9rem;
									font-weight: 600;
									color: var(--text);
								}
							}
							
							&:hover {
								border-color: var(--action);
								background-color: var(--bg);
								transform: translateY(-2px);
								box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
							}

							&.selected {
								border-color: var(--action);
								background-color: var(--bg);
								box-shadow: 0 0 0 2px var(--action);
							}
						}
					}

					.tooltip-target {
						position: relative;
						
						&::after {
							content: attr(data-tooltip);
							position: absolute;
							bottom: calc(100% + 8px);
							left: 50%;
							transform: translate(-50%, 4px) scale(0.95);
							background: rgba(0, 0, 0, 0.85);
							backdrop-filter: blur(4px);
							color: #ffffff;
							padding: 0.5rem 0.75rem;
							border-radius: var(--radius-2);
							font-size: 0.75rem;
							font-weight: 500;
							line-height: 1.3;
							white-space: normal;
							width: max-content;
							max-width: 220px;
							pointer-events: none;
							opacity: 0;
							visibility: hidden;
							transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
							box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
							z-index: 200;
							text-align: center;
						}
						
						&:hover::after {
							opacity: 1;
							visibility: visible;
							transform: translate(-50%, 0) scale(1);
						}
					}

					.text-link {
						background: none;
						border: none;
						color: var(--action);
						text-decoration: underline;
						cursor: pointer;
						padding: 0;
						font-size: inherit;
						font-family: inherit;
						opacity: 0.9;
						
						&:hover {
							opacity: 1;
						}
					}

					.preset-buttons {
						display: flex;
						flex-wrap: wrap;
						gap: 0.5rem;
						margin-top: 1.5rem;
						padding-top: 1.5rem;
						border-top: 1px dashed var(--outline);
						
						.custom-preset-wrapper {
							display: flex;
							align-items: center;
							position: relative;
							.delete-preset-btn {
								position: absolute;
								top: -6px;
								right: -6px;
								width: 1.25rem;
								height: 1.25rem;
								border-radius: 50%;
								background-color: var(--bg-low);
								color: var(--text);
								border: 1px solid var(--outline);
								font-size: 0.6rem;
								cursor: pointer;
								display: flex;
								align-items: center;
								justify-content: center;
								opacity: 0;
								transition: all 0.2s ease;
								&:hover {
									background-color: var(--action);
									color: var(--action-text);
									border-color: var(--action);
								}
							}
							&:hover .delete-preset-btn {
								opacity: 1;
							}
						}

						.preset-btn {
							display: flex;
							align-items: center;
							gap: 0.5rem;
							background-color: var(--bg-high);
							border: 1px solid var(--outline);
							padding: 0.4rem 0.75rem;
							border-radius: var(--radius-3);
							cursor: pointer;
							transition: all 0.2s ease;
							color: var(--text);
							
							.preset-icon {
								font-size: 1.1rem;
							}
							
							.preset-name {
								font-size: 0.8rem;
								font-weight: 500;
							}
							
							&:hover {
								background-color: var(--action);
								color: var(--action-text);
								border-color: var(--action);
								transform: translateY(-2px);
							}

							&.selected {
								background-color: var(--action);
								color: var(--action-text);
								border-color: var(--action);
							}
						}
					}

					.typography-rows-container {
						display: flex;
						flex-direction: row;
						justify-content: space-around;
						align-items: center;
						flex-wrap: wrap;
						gap: 1.25rem;
						margin-top: 0.5rem;
						margin-bottom: 0.5rem;
						
						.font-selector-row {
							display: flex;
							align-items: baseline;
							gap: 0.75rem;
							line-height: 1.2;
							
							.font-label {
								color: var(--text-low);
								font-weight: 500;
								white-space: nowrap;
								font-family: inherit;
								font-size: inherit;
							}
							
							.font-name-link {
								background: none;
								border: none;
								padding: 0;
								color: var(--action);
								font-weight: 700;
								text-decoration: underline;
								cursor: pointer;
								transition: all 0.2s ease;
								text-align: left;
								font-family: inherit;
								font-size: inherit;
								
								&:hover {
									opacity: 0.8;
									transform: translateY(-1px);
								}
							}
						}
					}
					.design-config {
						margin-top: 1rem;
						
						&.design-rows {
							display: flex;
							flex-direction: column;
							gap: 1.5rem;
							
							.design-row-item {
								display: flex;
								flex-direction: column;
								gap: 0.5rem;
							}
						}
						
						h4 {
							margin: 0 0 0.5rem;
							font-size: 1rem;
							font-weight: 600;
							color: var(--text);
						}

						.colors-row {
							display: flex;
							flex-direction: row;
							justify-content: space-around;
							gap: 1.25rem;
							flex-wrap: wrap;
							margin-top: 0.5rem;
							
							.color-picker-item {
								display: flex;
								flex-direction: column;
								align-items: center;
								gap: 0.5rem;
								
								label {
									font-size: 0.75rem;
									font-weight: 600;
									color: var(--text-low);
									text-transform: uppercase;
									letter-spacing: 0.05em;
									text-align: center;
									white-space: nowrap;
								}
								
								input[type="color"] {
									-webkit-appearance: none;
									-moz-appearance: none;
									appearance: none;
									width: 2.5rem;
									height: 2.5rem;
									background: none;
									border: none;
									padding: 0;
									cursor: pointer;
									
									&::-webkit-color-swatch-wrapper {
										padding: 0;
									}
									&::-webkit-color-swatch {
										border: 1px solid var(--outline);
										border-radius: 50%;
									}
									&::-moz-color-swatch {
										border: 1px solid var(--outline);
										border-radius: 50%;
									}
								}

								&.theme-col {
									align-items: flex-start;

									select {
										padding: 0.55rem 0.75rem;
										border-radius: var(--radius-2);
										border: 1px solid var(--outline);
										background-color: var(--bg);
										color: var(--text);
										font-family: inherit;
										cursor: pointer;
										height: 2.5rem;
										font-size: 0.85rem;
										max-width: 170px;

										&:focus {
											border-color: var(--action);
											outline: none;
										}
									}
								}
							}
						}
					}
				}
			}

			.wizard-footer {
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

					.version {
						font-size: 0.7rem;
						font-weight: 500;
						opacity: 0.5;
					}
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

		.font-picker-modal {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 200;
			
			.font-picker-content {
				background-color: var(--bg);
				color: var(--text);
				padding: 2rem;
				border-radius: var(--radius-4);
				box-shadow: var(--shadow-6);
				max-width: min(calc(100vw - 2rem), 850px);
				max-height: 80vh;
				width: 100%;
				position: relative;
				z-index: 201;
				display: flex;
				flex-direction: column;
				border: 1px solid var(--outline);
				
				header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 1.5rem;
					
					h3 {
						margin: 0;
						font-size: 1.35rem;
						font-weight: 600;
					}
					
					.close-btn {
						width: 2rem;
						height: 2rem;
						padding: 0;
						border-radius: 50%;
						border: 1px solid var(--outline);
						background-color: var(--bg-high);
						color: var(--text);
						font-size: 0.9rem;
						cursor: pointer;
						display: flex;
						align-items: center;
						justify-content: center;
						transition: all 0.2s ease;
						&:hover {
							background-color: var(--action);
							color: var(--action-text);
							border-color: var(--action);
						}
					}
				}
				
				.font-csv-list {
					display: block;
					line-height: 2.2;
					overflow-y: auto;
					padding-right: 0.5rem;
					max-height: 50vh;
					@include scrollbar;
					text-align: left;
					
					.font-csv-item {
						background: none;
						border: none;
						padding: 0;
						margin: 0;
						color: var(--text);
						cursor: pointer;
						transition: all 0.2s ease;
						display: inline;
						font-family: inherit;
						font-weight: 400;
						text-decoration: none;
						
						&:hover {
							color: var(--action);
							transform: scale(1.05);
						}
						
						&.selected {
							font-weight: 700 !important;
							text-decoration: underline !important;
							color: var(--action);
						}
					}
					
					.separator {
						color: var(--text-low);
						opacity: 0.4;
						margin: 0 0.15rem;
						font-family: var(--font-sans) !important;
						font-size: 1.1rem !important;
						display: inline;
					}
				}
			}
			
			.font-picker-bg {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.4);
				backdrop-filter: blur(6px);
				z-index: 200;
			}
		}

		.help-bg {
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
