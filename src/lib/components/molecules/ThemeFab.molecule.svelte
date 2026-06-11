<script lang="ts">
	import { Button } from '$atoms';
	import type { PlannerSettings } from '$lib';
	import { THEMES } from '$lib/data/themes';
	import { fade } from 'svelte/transition';
	import InteractivePlannerPreview from './InteractivePlannerPreview.molecule.svelte';
	import MagicIcon from '~icons/fa/magic';

	interface Props {
		settings: PlannerSettings;
	}

	let { settings }: Props = $props();

	let isOpen = $state(false);

	const activeTheme = $derived(
		THEMES.find((t) => t.id === settings.design.themeId) || THEMES[0],
	);

	const applyThemeConfig = (theme: (typeof THEMES)[number]) => {
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
		if (theme.config.coverPage.backgroundStyle)
			settings.coverPage.backgroundStyle = theme.config.coverPage.backgroundStyle;
		if (theme.config.coverPage.backgroundSeed !== undefined)
			settings.coverPage.backgroundSeed = theme.config.coverPage.backgroundSeed;
		if (theme.config.coverPage.backgroundComplexity !== undefined)
			settings.coverPage.backgroundComplexity =
				theme.config.coverPage.backgroundComplexity;
		if (theme.config.coverPage.backgroundPalette)
			settings.coverPage.backgroundPalette = [
				...theme.config.coverPage.backgroundPalette,
			];

		settings.topNav.font = theme.config.topNav.font;
		settings.sideNav.font = theme.config.sideNav.font;

		if (theme.config.dashboardPage?.fontSize !== undefined) {
			settings.dashboardPage.fontSize = theme.config.dashboardPage.fontSize;
		}
	};

	const toggleOpen = () => {
		isOpen = !isOpen;
	};

	const selectTheme = (theme: (typeof THEMES)[number]) => {
		applyThemeConfig(theme);
		isOpen = false;
	};
</script>

<button
	class="theme-trigger no-print tooltip-bottom"
	data-tooltip="Change Theme"
	onclick={toggleOpen}>
	<MagicIcon />
</button>

	{#if isOpen}
		<div
			class="fixed inset-0 w-full h-full z-[200] flex flex-row pointer-events-auto"
			in:fade={{ duration: 200 }}
			out:fade={{ duration: 150 }}>
			
			<!-- Left Side: Themes List -->
			<div
				class="w-[320px] h-full overflow-y-auto flex flex-col gap-4 py-4 pl-8 pr-2 z-10"
				style="scrollbar-width: none; -ms-overflow-style: none;">
				
				<Button
					class="sticky top-0 mb-2 w-12 h-12 rounded-full flex items-center justify-center shadow-md bg-white text-black hover:scale-110 transition-transform self-start z-20 flex-shrink-0"
					onclick={toggleOpen}
					title="Close Themes">
					✕
				</Button>

				{#each THEMES as theme (theme.id)}
					<Button
						class="w-full rounded-lg flex flex-col items-stretch overflow-hidden shadow-md transition-all hover:scale-[1.02] hover:shadow-lg flex-shrink-0 !p-0"
						style="border: 2px solid {theme.id === activeTheme.id ? theme.config.design.colorText : theme.config.design.colorLines}; transform: {theme.id === activeTheme.id ? 'scale(1.02)' : 'none'};"
						onclick={() => selectTheme(theme)}
						title={theme.name}>
						<div class="h-10 flex items-center px-3 font-bold whitespace-nowrap overflow-hidden text-ellipsis" style="background-color: {theme.config.design.colorNavBg}; color: {theme.config.design.colorText}; font-family: {theme.config.design.fontDisplay};">
							<span class="mr-2 text-xl flex-shrink-0">{theme.icon}</span> {theme.name}
						</div>
						<div class="flex h-12 w-full">
							<div class="flex-1 flex items-center px-2" style="background-color: {theme.config.design.colorBg}; color: {theme.config.design.colorText};">
								<span class="text-[0.6rem] opacity-60 font-bold uppercase">BG</span>
							</div>
							<div class="w-12 flex items-center justify-center" style="background-color: {theme.config.design.colorText}; color: {theme.config.design.colorBg};">
								<span class="text-[0.6rem] font-bold opacity-60">TXT</span>
							</div>
							<div class="w-12 flex items-center justify-center" style="background-color: {theme.config.design.colorLines}; color: {theme.config.design.colorBg};">
								<span class="text-[0.6rem] font-bold opacity-60">LINE</span>
							</div>
						</div>
					</Button>
				{/each}
			</div>

			<!-- Right Side: Preview Mode -->
			<div class="flex-1 h-full flex items-center justify-center pointer-events-none p-8">
				<div class="rounded-[20px] shadow-[0_15px_50px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-none"
					style="width: calc(80vh * {settings.design.aspectRatio || 0.75}); max-width: 95vw;">
					<InteractivePlannerPreview
						{settings}
						scaleOnHover={false} />
				</div>
			</div>
		</div>
	{/if}

<style lang="scss">
	@keyframes theme-gradient-shift {
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

	.theme-trigger {
		position: fixed;
		top: 1rem;
		left: 5.5rem;
		z-index: 50;
		background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #a78bfa 100%);
		background-size: 200% 200%;
		animation: theme-gradient-shift 4s ease-in-out infinite;
		color: white;
		border: none;
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
			color: white;
		}
		@include tablet {
			left: 6.5rem;
		}
		&::before {
			top: 100% !important;
			left: 50% !important;
			right: auto !important;
			bottom: auto !important;
			margin-top: 0.75rem !important;
			margin-left: 0 !important;
			margin-right: 0 !important;
			margin-bottom: 0 !important;
			transform: translateX(-50%) translateY(-0.25rem) scale(0.9) !important;
			transform-origin: top center !important;
		}
		&:hover::before {
			transform: translateX(-50%) translateY(0) scale(1) !important;
		}
	}
</style>
