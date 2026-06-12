<script lang="ts">
	import { Button } from '$atoms';
	import type { PlannerSettings } from '$lib';
	import { fade } from 'svelte/transition';
	import PencilIcon from '~icons/fa/pencil';
	import CaretUpIcon from '~icons/fa/caret-up';
	import CaretDownIcon from '~icons/fa/caret-down';
	import FontPickerModal from '$organisms/wizard/FontPickerModal.organism.svelte';
	import { THEMES } from '$lib/data/themes';

	interface Props {
		settings: PlannerSettings;
	}

	let { settings }: Props = $props();

	let isOpen = $state(false);
	let pickerArea = $state<{
		id: string;
		title: string;
		get: () => string;
		set: (v: string) => void;
		getColor: () => string;
		setColor: (c: string) => void;
		getBgColor: () => string;
	} | null>(null);
	let initialStep = $state(0);

	const toggleOpen = () => {
		isOpen = !isOpen;
		if (!isOpen) {
			if (colorPickerArea && originalColor) colorPickerArea.setColor(originalColor);
			pickerArea = null;
			colorPickerArea = null;
			hoveredColor = null;
			originalColor = null;
		}
	};

	const areas = [
		{
			id: 'coverPage',
			title: 'Cover',
			get: () => settings.coverPage.font,
			set: (v: string) => (settings.coverPage.font = v),
			getColor: () =>
				settings.design.colorCoverText || settings.design.colorText || '#000000',
			setColor: (c: string) => (settings.design.colorCoverText = c),
			getBgColor: () => settings.design.colorBg || '#ffffff',
			getScale: () => settings.coverPage.fontScale || 1,
			setScale: (v: number) => (settings.coverPage.fontScale = v),
		},
		{
			id: 'topNav',
			title: 'Top Nav',
			get: () => settings.topNav.font,
			set: (v: string) => (settings.topNav.font = v),
			getColor: () =>
				settings.design.colorTopNavText || settings.design.colorText || '#000000',
			setColor: (c: string) => (settings.design.colorTopNavText = c),
			getBgColor: () =>
				settings.design.colorNavBg || settings.design.colorBg || '#ffffff',
			getScale: () => settings.topNav.fontSize || 1,
			setScale: (v: number) => (settings.topNav.fontSize = v),
		},
		{
			id: 'sideNav',
			title: 'Side Nav',
			get: () => settings.sideNav.font,
			set: (v: string) => (settings.sideNav.font = v),
			getColor: () =>
				settings.design.colorSideNavText || settings.design.colorText || '#000000',
			setColor: (c: string) => (settings.design.colorSideNavText = c),
			getBgColor: () =>
				settings.design.colorNavBg || settings.design.colorBg || '#ffffff',
			getScale: () => settings.sideNav.fontSize || 1,
			setScale: (v: number) => (settings.sideNav.fontSize = v),
		},
		{
			id: 'fontDisplay',
			title: 'Title Display',
			get: () => settings.design.fontDisplay,
			set: (v: string) => (settings.design.fontDisplay = v),
			getColor: () =>
				settings.design.colorTextDisplay || settings.design.colorText || '#000000',
			setColor: (c: string) => (settings.design.colorTextDisplay = c),
			getBgColor: () => settings.design.colorBg || '#ffffff',
			getScale: () => settings.design.fontDisplayScale || 1,
			setScale: (v: number) => (settings.design.fontDisplayScale = v),
		},
		{
			id: 'font',
			title: 'Body Text',
			get: () => settings.design.font,
			set: (v: string) => (settings.design.font = v),
			getColor: () => settings.design.colorText || '#000000',
			setColor: (c: string) => (settings.design.colorText = c),
			getBgColor: () => settings.design.colorBg || '#ffffff',
			getScale: () => settings.design.fontScale || 1,
			setScale: (v: number) => (settings.design.fontScale = v),
		},
	];

	const themeColors = $derived.by(() => {
		const theme = THEMES.find((t) => t.id === settings.design.themeId) || THEMES[0];

		// 1. 5 Page / Nav Colors
		const navColors = [
			theme.config.design.colorBg,
			theme.config.design.colorNavBg,
			theme.config.design.colorLines,
			theme.config.design.colorDots,
			theme.config.coverPage.backgroundPalette?.[0] || theme.config.design.colorBg,
		].map((c) => c || '#ffffff').slice(0, 5);

		// 2. 5 Font Colors
		const fontColors = [
			theme.config.design.colorTextDisplay,
			theme.config.design.colorText,
			theme.config.design.colorSideNavText,
			theme.config.design.colorTopNavText,
			theme.config.design.colorCoverText,
		].map((c) => c || '#000000').slice(0, 5);

		// Algorithm: HSL utilities to generate successful colors
		const hexToHsl = (hex: string) => {
			const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			if (!result) return { h: 0, s: 0, l: 0 };
			const r = parseInt(result[1], 16) / 255;
			const g = parseInt(result[2], 16) / 255;
			const b = parseInt(result[3], 16) / 255;
			const max = Math.max(r, g, b),
				min = Math.min(r, g, b);
			let h = 0,
				s = 0;
			const l = (max + min) / 2;
			if (max !== min) {
				const d = max - min;
				s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
				switch (max) {
					case r:
						h = (g - b) / d + (g < b ? 6 : 0);
						break;
					case g:
						h = (b - r) / d + 2;
						break;
					case b:
						h = (r - g) / d + 4;
						break;
				}
				h /= 6;
			}
			return { h: h * 360, s, l };
		};

		const hslToHex = (h: number, s: number, l: number) => {
			h /= 360;
			let r, g, b;
			if (s === 0) {
				r = g = b = l;
			} else {
				const hue2rgb = (p: number, q: number, t: number) => {
					if (t < 0) t += 1;
					if (t > 1) t -= 1;
					if (t < 1 / 6) return p + (q - p) * 6 * t;
					if (t < 1 / 2) return q;
					if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
					return p;
				};
				const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
				const p = 2 * l - q;
				r = hue2rgb(p, q, h + 1 / 3);
				g = hue2rgb(p, q, h);
				b = hue2rgb(p, q, h - 1 / 3);
			}
			const toHex = (x: number) => {
				const hex = Math.round(x * 255).toString(16);
				return hex.length === 1 ? '0' + hex : hex;
			};
			return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
		};

		const allBaseColors = [...navColors, ...fontColors];

		// 3. 13 Generated Colors
		// To match the hue/saturation family, we base them heavily on the theme's existing dominant hues
		const coloredHues = allBaseColors
			.map((c) => hexToHsl(c))
			// Only consider colors that aren't purely grayscale
			.filter((hsl) => hsl.s > 0.05)
			.sort((a, b) => b.s - a.s);

		// If the theme is completely grayscale, give it a tiny bit of warmth as fallback
		const primary = coloredHues.length > 0 ? coloredHues[0] : { h: 30, s: 0.1, l: 0.5 };
		const secondary = coloredHues.length > 1 ? coloredHues[1] : { h: (primary.h + 180) % 360, s: primary.s, l: primary.l };

		// Helper to clamp lightness so we don't accidentally generate pure black or white in the middle
		const clampL = (l: number) => Math.max(0.15, Math.min(0.85, l));
		
		// Match the saturation of the theme exactly (capped slightly to avoid neon burnouts)
		const targetS = Math.min(primary.s, 0.7);
		const secS = Math.min(secondary.s, 0.7);

		const generatedColors = [
			// Primary hue variations (Analogous range: -30 to +30)
			hslToHex((primary.h + 330) % 360, targetS, clampL(primary.l + 0.2)),
			hslToHex((primary.h + 345) % 360, targetS, clampL(primary.l - 0.2)),
			hslToHex(primary.h, targetS, clampL(primary.l + 0.35)), // Very light primary
			hslToHex(primary.h, targetS, clampL(primary.l - 0.35)), // Very dark primary
			hslToHex((primary.h + 15) % 360, targetS, clampL(primary.l + 0.1)),
			hslToHex((primary.h + 30) % 360, targetS, clampL(primary.l - 0.1)),
			// Primary complementary (muted)
			hslToHex((primary.h + 180) % 360, targetS * 0.5, clampL(primary.l)),

			// Secondary hue variations (Analogous range: -15 to +15)
			hslToHex((secondary.h + 345) % 360, secS, clampL(secondary.l + 0.2)),
			hslToHex((secondary.h + 15) % 360, secS, clampL(secondary.l - 0.2)),
			hslToHex(secondary.h, secS, clampL(secondary.l + 0.3)), // Light secondary
			hslToHex(secondary.h, secS, clampL(secondary.l - 0.3)), // Dark secondary
			
			// Secondary complementary (muted)
			hslToHex((secondary.h + 180) % 360, secS * 0.5, clampL(secondary.l + 0.15)),
			hslToHex((secondary.h + 180) % 360, secS * 0.5, clampL(secondary.l - 0.15)),
		];

		// 4. White and Black
		const endColors = ['#ffffff', '#000000'];

		return [...navColors, ...fontColors, ...generatedColors, ...endColors];
	});

	let colorPickerArea = $state<(typeof areas)[0] | null>(null);
	let hoveredColor = $state<string | null>(null);
	let originalColor = $state<string | null>(null);

	const openPickerAtCategory = (area: (typeof areas)[0], step: number) => {
		initialStep = step;
		pickerArea = area;
	};
</script>

<button
	class="font-trigger no-print"
	data-tooltip="Change Fonts"
	style="--fab-bg-1: {settings.design.colorBg || '#ffffff'}; --fab-bg-2: {settings.design
		.colorNavBg || '#f2f2f2'}; --fab-text: {settings.design.colorText || '#000000'};"
	onclick={toggleOpen}>
	<PencilIcon />
</button>

{#if isOpen && !pickerArea}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_interactive_supports_focus -->
	<div class="fixed inset-0 z-[100]" onclick={toggleOpen}></div>
	<div
		class="font-panel-container z-[101]"
		in:fade={{ duration: 150 }}
		out:fade={{ duration: 100 }}
		style="--bg: {settings.design.colorBg || '#ffffff'}; --bg-high: {settings.design
			.colorNavBg || '#f2f2f2'}; --bg-higher: color-mix(in srgb, {settings.design
			.colorText || '#000000'} 10%, transparent); --text: {settings.design.colorText ||
			'#000000'}; --text-high: {settings.design.colorTextDisplay ||
			settings.design.colorText ||
			'#000000'}; --outline: {settings.design.colorLines || '#e5e7eb'};">
		<div class="font-panel">
			{#if colorPickerArea}
				<div
					class="color-picker-view flex flex-col p-2 gap-3"
					in:fade={{ duration: 150 }}>
					<div class="flex items-center justify-between">
						<span
							class="text-xl transition-colors duration-200"
							style="color: {hoveredColor || colorPickerArea.getColor()}; font-family: '{colorPickerArea.get()}', sans-serif;">
							{colorPickerArea.title} Color
						</span>
						<button
							class="text-xs font-semibold px-2 py-1 rounded bg-[var(--bg-high)] hover:bg-[var(--bg-higher)] transition-colors"
							onclick={(e) => {
								e.stopPropagation();
								if (originalColor && colorPickerArea) {
									colorPickerArea.setColor(originalColor);
								}
								colorPickerArea = null;
								hoveredColor = null;
								originalColor = null;
							}}>
							Back
						</button>
					</div>
					<div 
						class="grid grid-cols-5 gap-2"
						onmouseleave={() => {
							hoveredColor = null;
							if (colorPickerArea && originalColor) {
								colorPickerArea.setColor(originalColor);
							}
						}}>
						{#each themeColors as color}
							<button
								class="w-10 h-10 rounded-full border-2 transition-transform shadow-sm flex items-center justify-center hover:scale-110"
								class:active={originalColor === color || hoveredColor === color}
								style="background-color: {color}; border-color: {colorPickerArea.getColor() ===
								color
									? 'var(--text)'
									: 'var(--outline)'};"
								onclick={(e) => {
									e.stopPropagation();
									colorPickerArea!.setColor(color);
									colorPickerArea = null;
									hoveredColor = null;
									originalColor = null;
								}}
								onmouseenter={() => {
									hoveredColor = color;
									colorPickerArea!.setColor(color);
								}}>
							</button>
						{/each}
					</div>
				</div>
			{:else}
				{#each areas as area}
					<div
						class="font-row-container flex items-stretch p-1 rounded-[var(--radius-3)] hover:bg-[var(--bg-high)] transition-colors gap-2">
						<button
							class="color-btn flex items-center justify-center rounded-[var(--radius-2)] hover:opacity-80 transition-opacity"
							style="background-color: {area.getColor()}; min-width: 25%; box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--text) 20%, transparent);"
							data-tooltip="Change {area.title} Color"
							onclick={(e) => {
								e.stopPropagation();
								colorPickerArea = area;
								originalColor = area.getColor();
							}}>
						</button>
						<button
							class="font-row flex-1"
							onclick={(e) => {
								e.stopPropagation();
								openPickerAtCategory(area, 0);
							}}>
							<span
								class="font-preview"
								style="font-family: '{area.get()}', sans-serif; color: {area.getColor()};">
								{area.title}
							</span>
						</button>
						<div class="flex flex-col items-center justify-evenly shrink-0 px-2 py-1">
							<button
								class="text-[12px] hover:text-[var(--action)] text-[var(--text-low)] transition-colors p-1 rounded hover:bg-[var(--bg-higher)]"
								onclick={(e) => {
									e.stopPropagation();
									area.setScale(Number(Math.min(area.getScale() + 0.1, 3).toFixed(1)));
								}}>
								<CaretUpIcon />
							</button>
							<button
								class="text-[12px] hover:text-[var(--action)] text-[var(--text-low)] transition-colors p-1 rounded hover:bg-[var(--bg-higher)]"
								onclick={(e) => {
									e.stopPropagation();
									area.setScale(Number(Math.max(area.getScale() - 0.1, 0.5).toFixed(1)));
								}}>
								<CaretDownIcon />
							</button>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
{/if}

{#if pickerArea}
	<FontPickerModal
		title={pickerArea.title}
		selectedFont={pickerArea.get()}
		themeBg={pickerArea.getBgColor()}
		themeColor={pickerArea.getColor()}
		{initialStep}
		onSelect={(fontName) => {
			pickerArea!.set(fontName);
		}}
		onClose={() => (pickerArea = null)} />
{/if}

<style lang="scss">
	@keyframes pencil-gradient-shift {
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

	.font-trigger {
		z-index: 50;
		background: linear-gradient(
			135deg,
			var(--fab-bg-1) 0%,
			var(--fab-bg-1) 50%,
			var(--fab-bg-2) 50%,
			var(--fab-bg-2) 100%
		);
		color: var(--fab-text);
		border: 1px solid color-mix(in srgb, var(--fab-text) 10%, transparent);
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
			transform 0.2s ease,
			box-shadow 0.2s ease;

		&:hover {
			transform: scale(1.05) translateY(-2px);
			box-shadow: var(--shadow-5);
		}

		&::before {
			bottom: 100% !important;
			top: auto !important;
			left: 50% !important;
			right: auto !important;
			margin-bottom: 0.75rem !important;
			transform: translateX(-50%) translateY(0.25rem) scale(0.9) !important;
			transform-origin: bottom center !important;
		}

		&:hover::before {
			transform: translateX(-50%) translateY(0) scale(1) !important;
		}
	}

	.font-panel-container {
		position: fixed;
		bottom: 5.5rem;
		left: 50%;
		transform: translateX(calc(-50% - 4.5rem));
	}

	.font-panel {
		background-color: var(--bg);
		border: 1px solid var(--outline);
		border-radius: var(--radius-4);
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		box-shadow: var(--shadow-5);
		width: 330px;
	}

	.font-row {
		display: flex;
		align-items: center;
		padding: 0.5rem 0.5rem;
		border-radius: var(--radius-3);
		transition: background-color 0.2s ease;
		background: transparent;
		border: none;
		cursor: pointer;

		.font-preview {
			font-size: 1.4rem;
			color: var(--text-high);
			line-height: 1;
			text-align: center;
			flex: 1;
			white-space: nowrap;
		}
	}

	.cat-dot {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		border: 1px solid color-mix(in srgb, var(--text) 20%, transparent);
		padding: 0;
		transition: all 0.2s ease;
		box-shadow: var(--shadow-1);
	}

	.color-btn {
		background: transparent;
		border: none;
		cursor: pointer;
		&:hover .cat-dot {
			transform: scale(1.2);
			box-shadow: var(--shadow-2);
		}
	}
</style>
