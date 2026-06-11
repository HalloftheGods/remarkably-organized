<script lang="ts">
	import { Button } from '$atoms';
	import type { PlannerSettings } from '$lib';
	import { fade } from 'svelte/transition';
	import PencilIcon from '~icons/fa/pencil';
	import FontPickerModal from '$organisms/wizard/FontPickerModal.organism.svelte';
	import { THEMES } from '$lib/data/themes';

	interface Props {
		settings: PlannerSettings;
	}

	let { settings }: Props = $props();

	let isOpen = $state(false);
	let pickerArea = $state<{ id: string, title: string, get: () => string, set: (v: string) => void, getColor: () => string, setColor: (c: string) => void, getBgColor: () => string } | null>(null);
	let initialStep = $state(0);

	const toggleOpen = () => {
		isOpen = !isOpen;
		if (!isOpen) {
			pickerArea = null;
			colorPickerArea = null;
		}
	};

	const areas = [
		{ 
			id: 'coverPage', title: 'Cover Page', 
			get: () => settings.coverPage.font, set: (v: string) => settings.coverPage.font = v,
			getColor: () => settings.design.colorCoverText || settings.design.colorText || '#000000', 
			setColor: (c: string) => settings.design.colorCoverText = c,
			getBgColor: () => settings.design.colorBg || '#ffffff'
		},
		{ 
			id: 'topNav', title: 'Top Nav', 
			get: () => settings.topNav.font, set: (v: string) => settings.topNav.font = v,
			getColor: () => settings.design.colorTopNavText || settings.design.colorText || '#000000', 
			setColor: (c: string) => settings.design.colorTopNavText = c,
			getBgColor: () => settings.design.colorNavBg || settings.design.colorBg || '#ffffff'
		},
		{ 
			id: 'sideNav', title: 'Side Nav', 
			get: () => settings.sideNav.font, set: (v: string) => settings.sideNav.font = v,
			getColor: () => settings.design.colorSideNavText || settings.design.colorText || '#000000', 
			setColor: (c: string) => settings.design.colorSideNavText = c,
			getBgColor: () => settings.design.colorNavBg || settings.design.colorBg || '#ffffff'
		},
		{ 
			id: 'fontDisplay', title: 'Title Display', 
			get: () => settings.design.fontDisplay, set: (v: string) => settings.design.fontDisplay = v,
			getColor: () => settings.design.colorTextDisplay || settings.design.colorText || '#000000', 
			setColor: (c: string) => settings.design.colorTextDisplay = c,
			getBgColor: () => settings.design.colorBg || '#ffffff'
		},
		{ 
			id: 'font', title: 'Body Text', 
			get: () => settings.design.font, set: (v: string) => settings.design.font = v,
			getColor: () => settings.design.colorText || '#000000', 
			setColor: (c: string) => settings.design.colorText = c,
			getBgColor: () => settings.design.colorBg || '#ffffff'
		},
	];

	const themeColors = $derived.by(() => {
		const theme = THEMES.find(t => t.id === settings.design.themeId) || THEMES[0];
		const colors = new Set<string>();
		
		const addColor = (c: string | undefined) => {
			if (c && typeof c === 'string' && c.trim().startsWith('#')) {
				colors.add(c.toLowerCase().trim());
			}
		};

		addColor(theme.config.design.colorText);
		addColor(theme.config.design.colorTextDisplay);
		addColor(theme.config.design.colorSideNavText);
		addColor(theme.config.design.colorTopNavText);
		addColor(theme.config.design.colorCoverText);
		addColor(theme.config.design.colorBg);
		addColor(theme.config.design.colorNavBg);
		addColor(theme.config.design.colorLines);
		addColor(theme.config.design.colorDots);
		theme.config.coverPage.backgroundPalette?.forEach(addColor);

		const palette = Array.from(colors);
		const fallbacks = [
			'#000000', '#ffffff', '#ef4444', '#f97316', '#f59e0b', 
			'#84cc16', '#10b981', '#06b6d4', '#3b82f6', '#6366f1', 
			'#8b5cf6', '#ec4899'
		];
		while (palette.length < 12) {
			const fallback = fallbacks.shift();
			if (fallback && !palette.includes(fallback)) {
				palette.push(fallback);
			}
		}
		return palette.slice(0, 12);
	});

	let colorPickerArea = $state<typeof areas[0] | null>(null);

	const openPickerAtCategory = (area: typeof areas[0], step: number) => {
		initialStep = step;
		pickerArea = area;
	};
</script>

<button
	class="font-trigger no-print"
	data-tooltip="Change Fonts"
	style="--fab-bg-1: {settings.design.colorBg || '#ffffff'}; --fab-bg-2: {settings.design.colorNavBg || '#f2f2f2'}; --fab-text: {settings.design.colorText || '#000000'};"
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
		style="--bg: {settings.design.colorBg || '#ffffff'}; --bg-high: {settings.design.colorNavBg || '#f2f2f2'}; --bg-higher: color-mix(in srgb, {settings.design.colorText || '#000000'} 10%, transparent); --text: {settings.design.colorText || '#000000'}; --text-high: {settings.design.colorTextDisplay || settings.design.colorText || '#000000'}; --outline: {settings.design.colorLines || '#e5e7eb'};">
		<div class="font-panel">
			{#if colorPickerArea}
				<div class="color-picker-view flex flex-col p-2 gap-3" in:fade={{ duration: 150 }}>
					<div class="flex items-center justify-between">
						<span class="text-sm font-bold opacity-70 uppercase tracking-wider">{colorPickerArea.title} Color</span>
						<button 
							class="text-xs font-semibold px-2 py-1 rounded bg-[var(--bg-high)] hover:bg-[var(--bg-higher)] transition-colors"
							onclick={(e) => { e.stopPropagation(); colorPickerArea = null; }}>
							Back
						</button>
					</div>
					<div class="grid grid-cols-4 gap-3">
						{#each themeColors as color}
							<button 
								class="w-10 h-10 rounded-full border-2 transition-transform shadow-sm flex items-center justify-center hover:scale-110" 
								class:active={colorPickerArea.getColor() === color}
								style="background-color: {color}; border-color: {colorPickerArea.getColor() === color ? 'var(--text)' : 'var(--outline)'};"
								onclick={(e) => { e.stopPropagation(); colorPickerArea!.setColor(color); colorPickerArea = null; }}>
							</button>
						{/each}
					</div>
				</div>
			{:else}
				{#each areas as area}
					<div class="font-row-container flex items-stretch p-1 rounded-[var(--radius-3)] hover:bg-[var(--bg-high)] transition-colors gap-2">
						<button 
							class="color-btn flex items-center justify-center rounded-[var(--radius-2)] hover:opacity-80 transition-opacity"
							style="background-color: {area.getColor()}; min-width: 25%; box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--text) 20%, transparent);"
							data-tooltip="Change {area.title} Color"
							onclick={(e) => { e.stopPropagation(); colorPickerArea = area; }}>
						</button>
						<button class="font-row flex-1" onclick={(e) => { e.stopPropagation(); openPickerAtCategory(area, 0); }}>
							<span class="font-preview" style="font-family: '{area.get()}', sans-serif; color: {area.getColor()};">
								{area.title}
							</span>
						</button>
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
		onSelect={(fontName) => { pickerArea!.set(fontName); }}
		onClose={() => pickerArea = null}
	/>
{/if}

<style lang="scss">
	@keyframes pencil-gradient-shift {
		0% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
		100% { background-position: 0% 50%; }
	}

	.font-trigger {
		position: fixed;
		bottom: 1rem;
		left: 50%;
		transform: translateX(calc(-50% - 4.5rem));
		z-index: 50;
		background: linear-gradient(135deg, var(--fab-bg-1) 0%, var(--fab-bg-1) 50%, var(--fab-bg-2) 50%, var(--fab-bg-2) 100%);
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
		transition: transform 0.2s ease, box-shadow 0.2s ease;
		
		&:hover {
			transform: translateX(calc(-50% - 4.5rem)) scale(1.05) translateY(-2px);
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
		width: 280px;
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
