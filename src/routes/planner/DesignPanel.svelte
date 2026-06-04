<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { fonts as fontsList } from '../fonts/fonts';
	import { THEMES } from '$lib/data/themes';
	import MagicIcon from '~icons/fa/magic';
	import ListIcon from '~icons/fa/file-text-o';
	import ThIcon from '~icons/fa/picture-o';
	import CarouselIcon from '~icons/fa/files-o';

	type FontEntry = (typeof fontsList)[number];

	let {
		settings,
		fonts,
		enableHighResolution = $bindable(false),
		previewMode = $bindable('list'),
		onOpenPresets = () => {}
	}: {
		settings: PlannerSettings;
		fonts: FontEntry[];
		enableHighResolution: boolean;
		previewMode: 'list' | 'grid' | 'carousel';
		onOpenPresets?: () => void;
	} = $props();

	const handleDetailsToggle = (e: Event) => {
		const target = e.currentTarget as HTMLDetailsElement;
		const isOpened = target.open;
		if (isOpened) {
			setTimeout(() => {
				target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
			}, 100);
		}
	};

	const applyTheme = (e: Event) => {
		const target = e.currentTarget as HTMLSelectElement;
		const themeId = target.value;
		if (!themeId) return;

		const theme = THEMES.find((t) => t.id === themeId);
		if (!theme) return;

		// Merge design
		settings.design.font = theme.config.design.font;
		settings.design.fontDisplay = theme.config.design.fontDisplay;
		settings.design.colorBg = theme.config.design.colorBg;
		settings.design.colorNavBg = theme.config.design.colorNavBg;
		settings.design.colorText = theme.config.design.colorText;
		settings.design.colorLines = theme.config.design.colorLines;
		settings.design.colorDots = theme.config.design.colorDots;

		// Merge cover
		settings.coverPage.font = theme.config.coverPage.font;
		settings.coverPage.darkBackground = theme.config.coverPage.darkBackground;

		// Merge navs
		settings.topNav.font = theme.config.topNav.font;
		settings.sideNav.font = theme.config.sideNav.font;

		// Merge dashboardPage
		if (theme.config.dashboardPage?.fontSize !== undefined) {
			settings.dashboardPage.fontSize = theme.config.dashboardPage.fontSize;
		}

		// Removed target.value = ""; so the selected theme remains visible
	};
</script>

<h2>
	Design & Layout
	<MagicIcon style="opacity: 0.5;" />
</h2>

<form>
	<div class="checkbox" style="margin-top: 1rem; margin-bottom: 1rem;">
		<input
			type="checkbox"
			bind:checked={enableHighResolution}
			id="enableHighResolution" />
		<label for="enableHighResolution">Print in high resolution (bigger file)</label>
	</div>
	<fieldset>
		<label for="visualTheme">Theme</label>
		<select id="visualTheme" onchange={applyTheme}>
			<option value="">-- Choose a Theme --</option>
			{#each THEMES as theme}
				<option value={theme.id}>{theme.icon} {theme.name}</option>
			{/each}
		</select>
	</fieldset>

	<details class="preview-details" ontoggle={handleDetailsToggle}>
		<summary><h3>Planner Preview</h3></summary>
		<div class="layout-toggle">
			<button
				type="button"
				class:active={previewMode === 'list'}
				onclick={() => (previewMode = 'list')}
				data-tooltip="Single Page View">
				<ListIcon /> Pages
			</button>
			<button
				type="button"
				class:active={previewMode === 'grid'}
				onclick={() => (previewMode = 'grid')}
				data-tooltip="Grid Gallery View">
				<ThIcon /> Gallery
			</button>
			<button
				type="button"
				class:active={previewMode === 'carousel'}
				onclick={() => (previewMode = 'carousel')}
				data-tooltip="Cover Flow View">
				<CarouselIcon /> Slider
			</button>
		</div>
	</details>

	<details ontoggle={handleDetailsToggle}>
		<summary><h3>Font & Colors</h3></summary>
		<fieldset>
			<label for="designFont">Font</label>
			<select id="designFont" bind:value={settings.design.font}>
				{#each fontsList as font (font.name)}
					<option value={font.name}>{font.name}</option>
				{/each}
			</select>
		</fieldset>
		<fieldset>
			<label for="designFontDisplay">Display/Header Font</label>
			<select id="designFontDisplay" bind:value={settings.design.fontDisplay}>
				{#each fontsList as font (font.name)}
					<option value={font.name}>{font.name}</option>
				{/each}
			</select>
		</fieldset>
		<fieldset>
			<label for="colorBg">Background Color (PDF)</label>
			<input type="color" id="colorBg" bind:value={settings.design.colorBg} />
		</fieldset>
		<fieldset>
			<label for="colorNavBg">Sidebar Background</label>
			<input type="color" id="colorNavBg" bind:value={settings.design.colorNavBg} />
		</fieldset>
		<fieldset>
			<label for="colorText">Text Color</label>
			<input type="color" id="colorText" bind:value={settings.design.colorText} />
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
		<summary><h3>Safe Margins</h3></summary>
		<p style="font-size: 0.85em; color: var(--text-low); margin: 0 0 1rem;">
			Adjust margins (in inches) to prevent content from hiding under your device's
			toolbar.
		</p>
		<fieldset>
			<div
				style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 0.25rem;">
				<div>
					<label for="marginTop" style="font-size: 0.8em; color: var(--text-low);">
						Top
					</label>
					<input
						type="number"
						id="marginTop"
						step="0.05"
						min="0"
						max="1"
						bind:value={settings.design.margin.top}
						style="width: 100%;" />
				</div>
				<div>
					<label for="marginBottom" style="font-size: 0.8em; color: var(--text-low);">
						Bottom
					</label>
					<input
						type="number"
						id="marginBottom"
						step="0.05"
						min="0"
						max="1"
						bind:value={settings.design.margin.bottom}
						style="width: 100%;" />
				</div>
				<div>
					<label for="marginLeft" style="font-size: 0.8em; color: var(--text-low);">
						Left
					</label>
					<input
						type="number"
						id="marginLeft"
						step="0.05"
						min="0"
						max="1"
						bind:value={settings.design.margin.left}
						style="width: 100%;" />
				</div>
				<div>
					<label for="marginRight" style="font-size: 0.8em; color: var(--text-low);">
						Right
					</label>
					<input
						type="number"
						id="marginRight"
						step="0.05"
						min="0"
						max="1"
						bind:value={settings.design.margin.right}
						style="width: 100%;" />
				</div>
			</div>
		</fieldset>
	</details>
	<details ontoggle={handleDetailsToggle}>
		<summary
			onclick={(e) => {
				if (settings.emojis.disable) e.preventDefault();
			}}
			style:cursor={settings.emojis.disable ? 'default' : 'pointer'}>
			<div style="display: flex; align-items: center; gap: 0.5rem;">
				<input
					type="checkbox"
					checked={!settings.emojis.disable}
					onchange={(e) => {
						settings.emojis.disable = !e.currentTarget.checked;
						if (settings.emojis.disable) {
							const details = (e.currentTarget as HTMLElement).closest('details');
							if (details) details.open = false;
						}
					}}
					onclick={(e) => e.stopPropagation()}
					style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
				<h3 style="margin: 0;">Emojis</h3>
			</div>
		</summary>
		{#if !settings.emojis.disable}
			<div
				style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; padding: 0.5rem 0; align-items: end;">
				<!-- Q1 -->
				<fieldset style="margin: 0; padding: 0.25rem;">
					<label for="emoji-q1">Q1</label>
					<input
						type="text"
						id="emoji-q1"
						bind:value={settings.emojis.q1}
						style="width: 100%;" />
				</fieldset>
				<fieldset style="margin: 0; padding: 0.25rem;">
					<label for="emoji-jan">Jan</label>
					<input
						type="text"
						id="emoji-jan"
						bind:value={settings.emojis.january}
						style="width: 100%;" />
				</fieldset>
				<fieldset style="margin: 0; padding: 0.25rem;">
					<label for="emoji-feb">Feb</label>
					<input
						type="text"
						id="emoji-feb"
						bind:value={settings.emojis.february}
						style="width: 100%;" />
				</fieldset>
				<fieldset style="margin: 0; padding: 0.25rem;">
					<label for="emoji-mar">Mar</label>
					<input
						type="text"
						id="emoji-mar"
						bind:value={settings.emojis.march}
						style="width: 100%;" />
				</fieldset>

				<!-- Q2 -->
				<fieldset style="margin: 0; padding: 0.25rem;">
					<label for="emoji-q2">Q2</label>
					<input
						type="text"
						id="emoji-q2"
						bind:value={settings.emojis.q2}
						style="width: 100%;" />
				</fieldset>
				<fieldset style="margin: 0; padding: 0.25rem;">
					<label for="emoji-apr">Apr</label>
					<input
						type="text"
						id="emoji-apr"
						bind:value={settings.emojis.april}
						style="width: 100%;" />
				</fieldset>
				<fieldset style="margin: 0; padding: 0.25rem;">
					<label for="emoji-may">May</label>
					<input
						type="text"
						id="emoji-may"
						bind:value={settings.emojis.may}
						style="width: 100%;" />
				</fieldset>
				<fieldset style="margin: 0; padding: 0.25rem;">
					<label for="emoji-jun">Jun</label>
					<input
						type="text"
						id="emoji-jun"
						bind:value={settings.emojis.june}
						style="width: 100%;" />
				</fieldset>

				<!-- Q3 -->
				<fieldset style="margin: 0; padding: 0.25rem;">
					<label for="emoji-q3">Q3</label>
					<input
						type="text"
						id="emoji-q3"
						bind:value={settings.emojis.q3}
						style="width: 100%;" />
				</fieldset>
				<fieldset style="margin: 0; padding: 0.25rem;">
					<label for="emoji-jul">Jul</label>
					<input
						type="text"
						id="emoji-jul"
						bind:value={settings.emojis.july}
						style="width: 100%;" />
				</fieldset>
				<fieldset style="margin: 0; padding: 0.25rem;">
					<label for="emoji-aug">Aug</label>
					<input
						type="text"
						id="emoji-aug"
						bind:value={settings.emojis.august}
						style="width: 100%;" />
				</fieldset>
				<fieldset style="margin: 0; padding: 0.25rem;">
					<label for="emoji-sep">Sep</label>
					<input
						type="text"
						id="emoji-sep"
						bind:value={settings.emojis.september}
						style="width: 100%;" />
				</fieldset>

				<!-- Q4 -->
				<fieldset style="margin: 0; padding: 0.25rem;">
					<label for="emoji-q4">Q4</label>
					<input
						type="text"
						id="emoji-q4"
						bind:value={settings.emojis.q4}
						style="width: 100%;" />
				</fieldset>
				<fieldset style="margin: 0; padding: 0.25rem;">
					<label for="emoji-oct">Oct</label>
					<input
						type="text"
						id="emoji-oct"
						bind:value={settings.emojis.october}
						style="width: 100%;" />
				</fieldset>
				<fieldset style="margin: 0; padding: 0.25rem;">
					<label for="emoji-nov">Nov</label>
					<input
						type="text"
						id="emoji-nov"
						bind:value={settings.emojis.november}
						style="width: 100%;" />
				</fieldset>
				<fieldset style="margin: 0; padding: 0.25rem;">
					<label for="emoji-dec">Dec</label>
					<input
						type="text"
						id="emoji-dec"
						bind:value={settings.emojis.december}
						style="width: 100%;" />
				</fieldset>
			</div>
		{/if}
	</details>
	<details ontoggle={handleDetailsToggle}>
		<summary
			onclick={(e) => {
				if (settings.coverPage.disable) e.preventDefault();
			}}
			style:cursor={settings.coverPage.disable ? 'default' : 'pointer'}>
			<div style="display: flex; align-items: center; gap: 0.5rem;">
				<input
					type="checkbox"
					checked={!settings.coverPage.disable}
					onchange={(e) => {
						settings.coverPage.disable = !e.currentTarget.checked;
						if (settings.coverPage.disable) {
							const details = (e.currentTarget as HTMLElement).closest('details');
							if (details) details.open = false;
						}
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
		<summary
			onclick={(e) => {
				if (settings.dashboardPage.disable) e.preventDefault();
			}}
			style:cursor={settings.dashboardPage.disable ? 'default' : 'pointer'}>
			<div style="display: flex; align-items: center; gap: 0.5rem;">
				<input
					type="checkbox"
					checked={!settings.dashboardPage.disable}
					onchange={(e) => {
						settings.dashboardPage.disable = !e.currentTarget.checked;
						if (settings.dashboardPage.disable) {
							const details = (e.currentTarget as HTMLElement).closest('details');
							if (details) details.open = false;
						}
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
		<summary
			onclick={(e) => {
				if (settings.topNav.disable) e.preventDefault();
			}}
			style:cursor={settings.topNav.disable ? 'default' : 'pointer'}>
			<div style="display: flex; align-items: center; gap: 0.5rem;">
				<input
					type="checkbox"
					checked={!settings.topNav.disable}
					onchange={(e) => {
						settings.topNav.disable = !e.currentTarget.checked;
						if (settings.topNav.disable) {
							const details = (e.currentTarget as HTMLElement).closest('details');
							if (details) details.open = false;
						}
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
		<summary
			onclick={(e) => {
				if (settings.sideNav.disable) e.preventDefault();
			}}
			style:cursor={settings.sideNav.disable ? 'default' : 'pointer'}>
			<div style="display: flex; align-items: center; gap: 0.5rem;">
				<input
					type="checkbox"
					checked={!settings.sideNav.disable}
					onchange={(e) => {
						settings.sideNav.disable = !e.currentTarget.checked;
						if (settings.sideNav.disable) {
							const details = (e.currentTarget as HTMLElement).closest('details');
							if (details) details.open = false;
						}
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


<div class="presets-sticky">
	<button type="button" class="presets-cta" onclick={onOpenPresets}>
		<MagicIcon />
		Load from Presets Library
	</button>
</div>

<style lang="scss">
	@import './_panels.scss';
	.preview-details {
		@media (max-width: 1024px) {
			display: none;
		}
		summary {
			cursor: pointer;
			list-style: revert;
			h3 {
				display: inline;
				margin: 0;
			}
		}
	}
	.presets-sticky {
		position: sticky;
		bottom: -1rem;
		padding: 1rem 0;
		background: var(--bg);
		z-index: 10;
		margin-top: 1rem;
	}
	.presets-cta {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 1rem;
		border: none;
		background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
		background-size: 200% 200%;
		color: #ffffff;
		border-radius: var(--radius-3);
		font-family: var(--font-body);
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
		transition: all 0.3s ease;
		animation: gradient-shift 5s ease infinite;

		&:hover {
			transform: translateY(-2px);
			box-shadow: 0 6px 20px rgba(236, 72, 153, 0.4);
		}

		&:active {
			transform: translateY(1px);
			box-shadow: 0 2px 10px rgba(236, 72, 153, 0.3);
		}
	}

	@keyframes gradient-shift {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
	.layout-toggle {
		display: flex;
		gap: 0.5rem;
		margin: 0.5rem 0 0;
		button {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;
			padding: 0.75rem 0.5rem;
			border: 1px solid var(--outline);
			background: var(--bg);
			color: var(--text);
			border-radius: var(--radius-2);
			cursor: pointer;
			opacity: 0.7;
			transition: all 0.2s;
			font-family: var(--font-body);
			&.active {
				background: #333;
				color: white;
				border-color: #333;
				opacity: 1;
			}
			&:hover:not(.active) {
				opacity: 1;
				background: rgba(255, 255, 255, 0.1);
			}
		}
	}
</style>
