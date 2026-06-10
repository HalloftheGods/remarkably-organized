<script lang="ts">
	import { Box, Text, Input, Button, ColorPicker } from '$atoms';
	import { fade } from 'svelte/transition';
	import { THEMES, type Theme } from '$lib/data/themes';
	import { getFontInfo, getGoogleFontURL } from '$lib';
	import { FontPickerModal } from '$wizard';
	import { ThemePickerModal } from '$organisms';
	import type { PlannerSettings } from '$state';
	import { trackEvent } from '$lib/analytics';
	import Toggle from '$atoms/Toggle.atom.svelte';

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
		return isDisplay ? '2.5rem' : '2rem';
	});

	function applyTheme(theme: Theme) {
		settings.design.themeId = theme.id;
		settings.design.font = theme.config.design.font;
		settings.design.fontDisplay = theme.config.design.fontDisplay;
		settings.design.colorBg = theme.config.design.colorBg;
		settings.design.colorNavBg = theme.config.design.colorNavBg;
		settings.design.colorText = theme.config.design.colorText;
		settings.design.colorTextDisplay =
			theme.config.design.colorTextDisplay || theme.config.design.colorText;
		settings.design.colorSideNavText =
			theme.config.design.colorSideNavText || theme.config.design.colorText;
		settings.design.colorTopNavText =
			theme.config.design.colorTopNavText || theme.config.design.colorText;
		settings.design.colorCoverText =
			theme.config.design.colorCoverText || theme.config.design.colorText;
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
	transition="fade"
	inDuration={150}>
	<Box class="color-picker-item float-right">
		<!-- <Text tag="label" for="guide-theme-btn">Load Theme</Text> -->
		<Button
			id="guide-theme-btn"
			type="button"
			class="theme-picker-btn"
			onclick={() => (showThemeModal = true)}>
			{THEMES.find((t) => t.id === settings.design.themeId)?.icon || '🎨'}
			{THEMES.find((t) => t.id === settings.design.themeId)?.name || 'Choose a Theme'}
		</Button>
	</Box>
	<Text tag="h3" class="welcome-headline-gradient">Design & Typography</Text>
	<Text tag="p">
		Configure the aesthetics, fonts, and colors of your planner. Click the font text to
		change font families.
	</Text>

	<Box class="design-config design-rows">
		<!-- Page Size & Orientation -->
		<Box class="design-row-item">
			<Text tag="h4">Page Setup</Text>
			<Box style="display: flex; gap: 1rem; margin-top: 0.5rem;">
				<Box style="flex: 1;">
					<Text
						tag="label"
						style="font-size: 0.8rem; color: var(--text-low); display: block; margin-bottom: 0.25rem;">
						Page Size
					</Text>
					<select
						bind:value={settings.design.pageSize}
						style="width: 100%; padding: 0.5rem; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);">
						<option value="letter">US Letter (8.5:11 Ratio)</option>
						<option value="a4" alt="(210 x 297mm, 1:√2)">Standard A4 (1:√2 Ratio)</option>
						<option value="boox" alt="(1860 x 2480, 3:4)">
							Boox Note / Tab Ultra (3:4)
						</option>
						<option value="goodnotes" alt="(3:4)">GoodNotes Standard (3:4)</option>
						<option value="ipad-11" alt="(1668 x 2388, ~7:10)">
							iPad Pro 11" / Air (7:10)
						</option>
						<option value="ipad-13" alt="(2048 x 2732, 3:4)">
							iPad Pro 13" / 12.9" (3:4)
						</option>
						<option value="kindle" alt="(1860 x 2480, 3:4)">Kindle Scribe (3:4)</option>
						<option value="supernote" alt="(1404 x 1872, 3:4)">
							Supernote A5X / A6X2 (3:4)
						</option>
						<option value="remarkable" alt="(1404 x 1872, 3:4)">
							reMarkable 2 (3:4)
						</option>
						<option value="remarkable-pro" alt="(1620 x 2160, 3:4)">
							reMarkable Paper Pro (1620 x 2160, 3:4)
						</option>
						<option value="remarkable-move" alt="(1480 x 1984, 9:16)">
							reMarkable Paper Pro Move (9:16)
						</option>
					</select>
				</Box>
				<Box style="flex: 1;">
					<Text
						tag="label"
						style="font-size: 0.8rem; color: var(--text-low); display: block; margin-bottom: 0.25rem;">
						Orientation (*Experimental)
					</Text>
					<select
						bind:value={settings.design.orientation}
						style="width: 100%; padding: 0.5rem; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);">
						<option value="portrait">Portrait</option>
						<option value="landscape">Landscape</option>
					</select>
				</Box>
			</Box>
		</Box>
		<Box class="design-row-item">
			<!-- <Text tag="h4">Theme Colors</Text> -->
			<Box class="colors-row">
				<Box class="color-picker-item">
					<Text tag="label" for="guide-color-bg" style="color: var(--body-text);">
						Page Color
					</Text>
					<ColorPicker
						id="guide-color-bg"
						bind:value={settings.design.colorBg}
						title={settings.design.colorBg} />
				</Box>
				<Box class="color-picker-item">
					<Text tag="label" for="guide-color-nav">Sidebar Color</Text>
					<ColorPicker
						id="guide-color-nav"
						bind:value={settings.design.colorNavBg}
						title={settings.design.colorNavBg} />
				</Box>
				<Box class="color-picker-item">
					<Text tag="label" for="guide-color-text">Body Text Color</Text>
					<ColorPicker
						id="guide-color-text"
						bind:value={settings.design.colorText}
						title={settings.design.colorText} />
				</Box>
				<Box class="color-picker-item">
					<Text tag="label" for="guide-color-lines">Line Color</Text>
					<ColorPicker
						id="guide-color-lines"
						bind:value={settings.design.colorLines}
						title={settings.design.colorLines} />
				</Box>
				<Box class="color-picker-item">
					<Text tag="label" for="guide-color-dots">Dots Color</Text>
					<ColorPicker
						id="guide-color-dots"
						bind:value={settings.design.colorDots}
						title={settings.design.colorDots} />
				</Box>
			</Box>
		</Box>

		<Box class="design-row-item">
			<Box class="typography-rows-container">
				<Box class="font-selector-row">
					<ColorPicker bind:value={settings.design.colorTopNavText} />
					<Button
						type="button"
						class="font-name-link"
						style="font-family: '{settings.topNav
							.font}' !important; font-size: calc(1.25rem * {getFontInfo(
							settings.topNav.font,
						)?.size || 1}) !important;"
						onclick={() => (activeFontPicker = 'topNavFont')}
						aria-label="Select top nav font">
						Top Nav Font
					</Button>
				</Box>
				<Box class="font-selector-row">
					<ColorPicker bind:value={settings.design.colorSideNavText} />
					<Button
						type="button"
						class="font-name-link"
						style="font-family: '{settings.sideNav
							.font}' !important; font-size: calc(1.25rem * {getFontInfo(
							settings.sideNav.font,
						)?.size || 1}) !important;"
						onclick={() => (activeFontPicker = 'sideNavFont')}
						aria-label="Select side nav font">
						Side Nav Font
					</Button>
				</Box>

				<Box class="font-selector-row">
					<!-- <ColorPicker bind:value={settings.design.colorText} /> -->
					<Button
						type="button"
						class="font-name-link"
						style="font-family: '{settings.design
							.font}' !important; font-size: calc(1.25rem * {getFontInfo(
							settings.design.font,
						)?.size || 1}) !important;"
						onclick={() => (activeFontPicker = 'font')}
						aria-label="Select body font">
						Body Text Font
					</Button>
				</Box>
				<Box class="font-selector-row color">
					<ColorPicker bind:value={settings.design.colorTextDisplay} />
					<Button
						type="button"
						class="font-name-link"
						style="font-family: '{settings.design
							.fontDisplay}' !important; font-size: calc(1.65rem * {getFontInfo(
							settings.design.fontDisplay,
						)?.size || 1}) !important;"
						onclick={() => (activeFontPicker = 'fontDisplay')}
						aria-label="Select display font">
						Title Font
					</Button>
				</Box>
				<Box class="font-selector-row">
					<ColorPicker bind:value={settings.design.colorCoverText} />
					<Button
						type="button"
						class="font-name-link"
						style="font-family: '{settings.coverPage
							.font}' !important; font-size: calc(1.65rem * {getFontInfo(
							settings.coverPage.font,
						)?.size || 1}) !important;"
						onclick={() => (activeFontPicker = 'coverFont')}
						aria-label="Select cover font">
						Cover Font
					</Button>
				</Box>
			</Box>
		</Box>

		<!-- Emojis -->
		<Box class="design-row-item">
			<Text tag="h4" style="display: flex; align-items: center; gap: 0.75rem;">
				Emojis
				<Text tag="label" style="display: inline-flex; cursor: pointer; margin: 0;">
					<Toggle
						checked={!settings.emojis.disable}
						onchange={() => {
							settings.emojis.disable = !settings.emojis.disable;
						}} />
				</Text>
			</Text>
			<Box
				class="colors-row"
				style="justify-content: flex-start; align-items: center; min-height: 4rem; flex-wrap: wrap; gap: 1rem; width: 100%;">
				{#if !settings.emojis.disable}
					<Box
						style="display: flex; flex-direction: row; justify-content: space-around; flex-grow: 1; gap: 0.25rem; align-items: center; flex-wrap: wrap; margin-top: 0.5rem;">
						<!-- Q1 group -->
						<Box
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Q1
							</span>
							<Input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.q1}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</Box>
						<Box
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Jan
							</span>
							<Input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.january}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</Box>
						<Box
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Feb
							</span>
							<Input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.february}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</Box>
						<Box
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Mar
							</span>
							<Input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.march}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</Box>

						<span
							style="color: var(--text-low); font-size: 0.75rem; margin: 0.8rem 0.1rem 0;">
							|
						</span>

						<!-- Q2 group -->
						<Box
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Q2
							</span>
							<Input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.q2}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</Box>
						<Box
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Apr
							</span>
							<Input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.april}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</Box>
						<Box
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								May
							</span>
							<Input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.may}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</Box>
						<Box
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Jun
							</span>
							<Input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.june}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</Box>

						<span
							style="color: var(--text-low); font-size: 0.75rem; margin: 0.8rem 0.1rem 0;">
							|
						</span>

						<!-- Q3 group -->
						<Box
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Q3
							</span>
							<Input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.q3}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</Box>
						<Box
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Jul
							</span>
							<Input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.july}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</Box>
						<Box
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Aug
							</span>
							<Input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.august}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</Box>
						<Box
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Sep
							</span>
							<Input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.september}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</Box>

						<span
							style="color: var(--text-low); font-size: 0.75rem; margin: 0.8rem 0.1rem 0;">
							|
						</span>

						<!-- Q4 group -->
						<Box
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Q4
							</span>
							<Input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.q4}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</Box>
						<Box
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Oct
							</span>
							<Input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.october}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</Box>
						<Box
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Nov
							</span>
							<Input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.november}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</Box>
						<Box
							style="display: flex; flex-direction: column; align-items: center; gap: 0.2rem;">
							<span style="font-size: 0.7rem; font-weight: bold; color: var(--text-low);">
								Dec
							</span>
							<Input
								type="text"
								maxlength="2"
								bind:value={settings.emojis.december}
								style="width: 1.85rem; height: 1.85rem; text-align: center; font-size: 1rem; padding: 0; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);" />
						</Box>
					</Box>
				{/if}
			</Box>
		</Box>
	</Box>
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
	:global(.welcome-headline-gradient) {
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
	:global(.design-rows) {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-top: 1.5rem;
	}

	:global(.design-row-item) {
		h4 {
			margin: 0 0 1rem;
			font-size: 1rem;
			font-weight: 600;
			color: var(--text);
		}

		:global(.colors-row) {
			display: flex;
			gap: 1.5rem;
			align-items: center;
			justify-content: space-between;

			@media (max-width: 768px) {
				flex-wrap: wrap;
				gap: 1rem;
			}
		}

		:global(.color-picker-item) {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			align-items: center;
			flex: 1;

			&:global(.theme-col) {
				align-items: flex-start;
				flex: 1 0 auto;

				@media (max-width: 768px) {
					width: 100%;
					padding-bottom: 1rem;
				}
			}

			label {
				font-size: 0.75rem;
				font-weight: 600;
				color: var(--text-low);
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}
		}

		:global(.typography-rows-container) {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 1rem;
			align-items: center;
			justify-content: space-between;
			width: 100%;

			:global(.font-selector-row) {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 0.5rem;
				border-radius: var(--radius-2);
				transition: background-color 0.2s ease;
				flex: 1;
				min-width: 120px;

				// &:hover {
				// 	background-color: var(--bg-high);
				// }

				:global(.font-name-link) {
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
	:global(.theme-picker-btn) {
		width: 100%;
		padding: 0.7rem 1.5rem !important;
		border-radius: 12px !important;
		border: none !important;
		background: var(--brand-gradient) !important;
		background-size: 200% auto !important;
		animation: gradient-shift 4s ease infinite !important;
		color: white !important;
		font-weight: 700 !important;
		font-family: inherit !important;
		cursor: pointer !important;
		text-align: center !important;
		display: flex !important;
		align-items: center !important;
		justify-content: center !important;
		gap: 0.5rem !important;
		white-space: nowrap !important;
		box-shadow:
			0 4px 20px rgba(124, 58, 237, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease !important;

		&:hover {
			transform: translateY(-2px) !important;
			box-shadow:
				0 8px 30px rgba(124, 58, 237, 0.4),
				inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
		}

		&:active {
			transform: translateY(0) !important;
		}
	}
</style>
