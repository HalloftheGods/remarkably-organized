<script lang="ts">
	import { fade } from 'svelte/transition';
	import { THEMES, type Theme } from '$lib/data/themes';
	import { getFontInfo, getGoogleFontURL } from '$lib';
	import FontPickerModal from './FontPickerModal.svelte';
	import ThemePickerModal from '../ThemePickerModal.svelte';
	import type { PlannerSettings } from '$lib/state/planner-settings.svelte';
	import { trackEvent } from '$lib/analytics';

	let { settings } = $props<{ settings: PlannerSettings }>();

	let activeFontPicker = $state<
		'font' | 'fontDisplay' | 'coverFont' | 'topNavFont' | 'sideNavFont' | null
	>(null);

	let showThemeModal = $state(false);

	const fontsUrl = $derived(
		getGoogleFontURL([
			settings.design.font,
			settings.design.fontDisplay,
			settings.coverPage.font,
			settings.topNav.font,
			settings.sideNav.font,
		]),
	);

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
		const isDisplay =
			activeFontPicker === 'fontDisplay' || activeFontPicker === 'coverFont';
		return isDisplay ? '1.5rem' : '1.1rem';
	});

	function applyTheme(theme: Theme) {
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
			settings.coverPage.backgroundComplexity =
				theme.config.coverPage.backgroundComplexity;
		}
		if (theme.config.coverPage.backgroundPalette) {
			settings.coverPage.backgroundPalette = [
				...theme.config.coverPage.backgroundPalette,
			];
		}

		settings.topNav.font = theme.config.topNav.font;
		settings.sideNav.font = theme.config.sideNav.font;

		if (theme.config.dashboardPage?.fontSize !== undefined) {
			settings.dashboardPage.fontSize = theme.config.dashboardPage.fontSize;
		}

		trackEvent('wizard_config_change', {
			step: 'design',
			setting_name: 'theme',
			setting_value: theme.id,
		});
	}

	function handleFontSelect(fontName: string) {
		const fontField = activeFontPicker;
		if (fontField === 'font') {
			settings.design.font = fontName;
		} else if (fontField === 'fontDisplay') {
			settings.design.fontDisplay = fontName;
		} else if (fontField === 'coverFont') {
			settings.coverPage.font = fontName;
		} else if (fontField === 'topNavFont') {
			settings.topNav.font = fontName;
		} else if (fontField === 'sideNavFont') {
			settings.sideNav.font = fontName;
		}

		const hasFontField = !!fontField;
		if (hasFontField) {
			trackEvent('wizard_config_change', {
				step: 'design',
				setting_name: fontField,
				setting_value: fontName,
			});
		}
		activeFontPicker = null;
	}
</script>

<div
	class="step-content design-step"
	style="position: relative;"
	in:fade={{ duration: 150 }}>
	<h3 class="welcome-headline-gradient">Design & Typography</h3>
	<p>Configure the physical aesthetics, fonts, and colors of your planner.</p>

	<div class="design-config design-rows">
		<div class="design-row-item">
			<h4>Theme Colors</h4>
			<div class="colors-row">
				<div class="color-picker-item theme-col">
					<label for="guide-theme-btn">Load Theme</label>
					<button
						id="guide-theme-btn"
						type="button"
						class="theme-picker-btn"
						onclick={() => (showThemeModal = true)}>
						{THEMES.find((t) => t.id === settings.design.themeId)?.icon || '🎨'}
						{THEMES.find((t) => t.id === settings.design.themeId)?.name ||
							'Choose a Theme'}
					</button>
				</div>
				<div class="color-picker-item">
					<label for="guide-color-bg">Page</label>
					<input
						type="color"
						id="guide-color-bg"
						bind:value={settings.design.colorBg}
						title={settings.design.colorBg} />
				</div>
				<div class="color-picker-item">
					<label for="guide-color-nav">Sidebar</label>
					<input
						type="color"
						id="guide-color-nav"
						bind:value={settings.design.colorNavBg}
						title={settings.design.colorNavBg} />
				</div>
				<div class="color-picker-item">
					<label for="guide-color-text">Text</label>
					<input
						type="color"
						id="guide-color-text"
						bind:value={settings.design.colorText}
						title={settings.design.colorText} />
				</div>
				<div class="color-picker-item">
					<label for="guide-color-lines">Lines</label>
					<input
						type="color"
						id="guide-color-lines"
						bind:value={settings.design.colorLines}
						title={settings.design.colorLines} />
				</div>
				<div class="color-picker-item">
					<label for="guide-color-dots">Dots</label>
					<input
						type="color"
						id="guide-color-dots"
						bind:value={settings.design.colorDots}
						title={settings.design.colorDots} />
				</div>
			</div>
		</div>

		<div class="design-row-item">
			<h4>Typography</h4>
			<div class="typography-rows-container">
				<div class="font-selector-row">
					<button
						type="button"
						class="font-name-link"
						style="font-family: '{settings.design
							.font}' !important; font-size: calc(1.25rem * {getFontInfo(
							settings.design.font,
						)?.size || 1}) !important;"
						onclick={() => (activeFontPicker = 'font')}
						aria-label="Select body font">
						Body Font
					</button>
				</div>

				<div class="font-selector-row">
					<button
						type="button"
						class="font-name-link"
						style="font-family: '{settings.design
							.fontDisplay}' !important; font-size: calc(1.65rem * {getFontInfo(
							settings.design.fontDisplay,
						)?.size || 1}) !important;"
						onclick={() => (activeFontPicker = 'fontDisplay')}
						aria-label="Select display font">
						Display Font
					</button>
				</div>
				<div class="font-selector-row">
					<button
						type="button"
						class="font-name-link"
						style="font-family: '{settings.coverPage
							.font}' !important; font-size: calc(1.65rem * {getFontInfo(
							settings.coverPage.font,
						)?.size || 1}) !important;"
						onclick={() => (activeFontPicker = 'coverFont')}
						aria-label="Select cover font">
						Cover Font
					</button>
				</div>
				<div class="font-selector-row">
					<button
						type="button"
						class="font-name-link"
						style="font-family: '{settings.topNav
							.font}' !important; font-size: calc(1.25rem * {getFontInfo(
							settings.topNav.font,
						)?.size || 1}) !important;"
						onclick={() => (activeFontPicker = 'topNavFont')}
						aria-label="Select top nav font">
						Top Nav Font
					</button>
				</div>

				<div class="font-selector-row">
					<button
						type="button"
						class="font-name-link"
						style="font-family: '{settings.sideNav
							.font}' !important; font-size: calc(1.25rem * {getFontInfo(
							settings.sideNav.font,
						)?.size || 1}) !important;"
						onclick={() => (activeFontPicker = 'sideNavFont')}
						aria-label="Select side nav font">
						Side Nav Font
					</button>
				</div>
			</div>
		</div>

		<!-- Emojis -->
		<div class="design-row-item">
			<h4>Emojis</h4>
			<div
				class="colors-row"
				style="justify-content: flex-start; align-items: center; min-height: 4rem; flex-wrap: wrap; gap: 1rem; width: 100%;">
				<div
					class="color-picker-item"
					style="flex: 0 0 auto; min-width: unset; align-items: flex-start; gap: 0.25rem;">
					<label
						class="toggle-label"
						style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; user-select: none;">
						<input
							type="checkbox"
							checked={!settings.emojis.disable}
							onchange={(e) => {
								settings.emojis.disable = !e.currentTarget.checked;
							}}
							style="width: 1.25rem; height: 1.25rem; cursor: pointer; accent-color: var(--action);" />
						<div style="display: flex; flex-direction: column;">
							<!-- <span
								style="font-weight: 600; font-size: 0.85rem; white-space: nowrap; color: var(--text);">
								Toggle Emojis
							</span> -->
							<span
								style="font-weight: 400; font-size: 0.75rem; white-space: nowrap; color: var(--text-low);">
								{!settings.emojis.disable ? 'Yes, Emojis.' : 'No Emojis!'}
							</span>
						</div>
					</label>
				</div>

				{#if !settings.emojis.disable}
					<div
						style="display: flex; flex-direction: row; justify-content: space-around; flex-grow: 1; gap: 0.25rem; align-items: center; flex-wrap: wrap; margin-top: 0.5rem;">
						<!-- Q1 group -->
						<div
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Q1
							</span>
							<input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.q1}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</div>
						<div
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Jan
							</span>
							<input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.january}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</div>
						<div
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Feb
							</span>
							<input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.february}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</div>
						<div
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Mar
							</span>
							<input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.march}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</div>

						<span
							style="color: var(--text-low); font-size: 0.75rem; margin: 0.8rem 0.1rem 0;">
							|
						</span>

						<!-- Q2 group -->
						<div
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Q2
							</span>
							<input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.q2}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</div>
						<div
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Apr
							</span>
							<input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.april}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</div>
						<div
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								May
							</span>
							<input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.may}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</div>
						<div
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Jun
							</span>
							<input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.june}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</div>

						<span
							style="color: var(--text-low); font-size: 0.75rem; margin: 0.8rem 0.1rem 0;">
							|
						</span>

						<!-- Q3 group -->
						<div
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Q3
							</span>
							<input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.q3}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</div>
						<div
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Jul
							</span>
							<input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.july}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</div>
						<div
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Aug
							</span>
							<input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.august}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</div>
						<div
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Sep
							</span>
							<input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.september}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</div>

						<span
							style="color: var(--text-low); font-size: 0.75rem; margin: 0.8rem 0.1rem 0;">
							|
						</span>

						<!-- Q4 group -->
						<div
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Q4
							</span>
							<input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.q4}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</div>
						<div
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Oct
							</span>
							<input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.october}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</div>
						<div
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Nov
							</span>
							<input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.november}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</div>
						<div
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Dec
							</span>
							<input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.december}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

{#if activeFontPicker !== null}
	<FontPickerModal
		title={fontPickerTitle}
		selectedFont={selectedFontName}
		baseSize={fontBaseSize}
		onSelect={handleFontSelect}
		onClose={() => (activeFontPicker = null)} />
{/if}

{#if showThemeModal}
	<ThemePickerModal
		{settings}
		onClose={() => (showThemeModal = false)}
		onSelect={applyTheme} />
{/if}

<style lang="scss">
	.welcome-headline-gradient {
		background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #a78bfa 100%);
		background-size: 200% auto;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: gradient-shift 4s ease-in-out infinite;
	}
	@keyframes gradient-shift {
		0%,
		100% {
			background-position: 0% center;
		}
		50% {
			background-position: 100% center;
		}
	}
	.design-rows {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-top: 1.5rem;
	}

	.design-row-item {
		h4 {
			margin: 0 0 1rem;
			font-size: 1rem;
			font-weight: 600;
			color: var(--text);
		}

		.colors-row {
			display: flex;
			gap: 1.5rem;
			align-items: center;
			justify-content: space-between;

			@media (max-width: 768px) {
				flex-wrap: wrap;
				gap: 1rem;
			}
		}

		.color-picker-item {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			align-items: center;
			flex: 1;

			&.theme-col {
				align-items: flex-start;
				flex: 2;

				@media (max-width: 768px) {
					width: 100%;
					padding-bottom: 1rem;
				}

				select {
					width: 100%;
					padding: 0.5rem;
					border-radius: var(--radius-2);
					border: 1px solid var(--outline);
					background-color: var(--bg);
					color: var(--text);
					font-family: inherit;
					cursor: pointer;
				}

				.theme-picker-btn {
					width: 100%;
					padding: 0.5rem;
					border-radius: var(--radius-2);
					border: 1px solid var(--outline);
					background-color: var(--bg);
					color: var(--text);
					font-family: inherit;
					cursor: pointer;
					text-align: left;
					display: flex;
					align-items: center;
					gap: 0.5rem;

					&:hover {
						border-color: var(--action);
						background-color: var(--bg-high);
					}
				}
			}

			label {
				font-size: 0.75rem;
				font-weight: 600;
				color: var(--text-low);
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}

			input[type='color'] {
				-webkit-appearance: none;
				border: none;
				width: 100%;
				height: 2.5rem;
				border-radius: var(--radius-2);
				padding: 0;
				cursor: pointer;
				background: none;

				&::-webkit-color-swatch-wrapper {
					padding: 0;
				}

				&::-webkit-color-swatch {
					border: 2px solid var(--outline);
					border-radius: var(--radius-2);
					box-shadow: var(--shadow-1);
				}
			}
		}

		.typography-rows-container {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 1rem;
			align-items: center;
			justify-content: space-evenly;
			width: 100%;

			.font-selector-row {
				display: flex;
				align-items: center;
				padding: 0.5rem;
				border-radius: var(--radius-2);
				transition: background-color 0.2s ease;

				&:hover {
					background-color: var(--bg-high);
				}

				.font-name-link {
					background: none;
					border: none;
					color: var(--text);
					cursor: pointer;
					text-decoration: underline;
					text-decoration-color: transparent;
					transition: all 0.2s ease;
					padding: 0;
					line-height: 1.2;

					&:hover {
						color: var(--action);
						text-decoration-color: var(--action);
					}
				}
			}
		}
	}
</style>
