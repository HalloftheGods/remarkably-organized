<script lang="ts">
	import { Button } from '$atoms';
	import type { PlannerSettings } from '$lib';
	import { THEMES } from '$lib/data/themes';
	import { fade } from 'svelte/transition';
	import MagicIcon from '~icons/fa/magic';

	interface Props {
		settings: PlannerSettings;
	}

	let { settings }: Props = $props();

	let isOpen = $state(false);
	let originalTheme = $state<(typeof THEMES)[number] | null>(null);

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

	let scrollTimer: ReturnType<typeof setTimeout>;
	const handleScroll = (e: Event) => {
		clearTimeout(scrollTimer);
		scrollTimer = setTimeout(() => {
			const target = e.target as HTMLElement;
			if (!target) return;
			
			const containerCenter = target.getBoundingClientRect().left + target.clientWidth / 2;
			let closestTheme = null;
			let minDistance = Infinity;

			const children = Array.from(target.children) as HTMLElement[];
			for (const child of children) {
				if (!child.dataset.themeId) continue;
				const childCenter = child.getBoundingClientRect().left + child.clientWidth / 2;
				const distance = Math.abs(containerCenter - childCenter);
				if (distance < minDistance) {
					minDistance = distance;
					closestTheme = child.dataset.themeId;
				}
			}

			if (closestTheme) {
				const theme = THEMES.find((t) => t.id === closestTheme);
				if (theme && activeTheme.id !== theme.id) {
					previewTheme(theme);
				}
			}
		}, 50);
	};

	const toggleOpen = () => {
		if (!isOpen) {
			originalTheme = activeTheme;
			settings.isPreviewingTheme = true;
		} else {
			settings.isPreviewingTheme = false;
			if (originalTheme) {
				applyThemeConfig(originalTheme);
			}
		}
		isOpen = !isOpen;
	};

	const previewTheme = (theme: (typeof THEMES)[number]) => {
		applyThemeConfig(theme);
	};

	const clearPreview = () => {
		if (originalTheme) {
			applyThemeConfig(originalTheme);
		}
	};

	const selectTheme = (theme: (typeof THEMES)[number]) => {
		settings.isPreviewingTheme = false;
		applyThemeConfig(theme);
		originalTheme = theme;
		isOpen = false;
	};

	const getCleanThemeName = (name: string) => {
		return name
			.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
			.trim();
	};
</script>

<button
	class="theme-trigger no-print tooltip-bottom"
	data-tooltip="'POOF!' New theme!"
	onclick={toggleOpen}>
	<MagicIcon />
</button>

{#if isOpen}
	<div
		class="fixed inset-0 w-full h-full z-[200] flex items-center pointer-events-auto"
		in:fade={{ duration: 200 }}
		out:fade={{ duration: 150 }}>
		<div class="modal-bg backdrop-blur-sm bg-black/20" role="presentation" onclick={toggleOpen}></div>

		<Button
			class="fixed top-8 right-8 w-12 h-12 rounded-full flex items-center justify-center shadow-md bg-white text-black hover:scale-110 transition-transform z-20"
			onclick={toggleOpen}
			title="Close Themes">
			✕
		</Button>

		<!-- Center: Themes Slider -->
		<div
			class="w-full max-w-[100vw] overflow-x-auto flex flex-row items-center gap-8 py-12 z-10 snap-x snap-mandatory"
			style="scrollbar-width: none; -ms-overflow-style: none; padding-left: calc(50vw - 140px); padding-right: calc(50vw - 140px); scroll-behavior: smooth;"
			onmouseleave={clearPreview}
			onscroll={handleScroll}>

			{#each THEMES as theme (theme.id)}
				<button
					type="button"
					class="theme-swatch-card snap-center shrink-0 w-[280px]"
					data-theme-id={theme.id}
					class:nav-left={settings.sideNav.leftSide}
					onmouseenter={() => previewTheme(theme)}
					onfocus={() => previewTheme(theme)}
					onclick={() => selectTheme(theme)}
					aria-label={`Select ${theme.name}`}>
					<div class="swatch-layout">
						<div
							class="nav-sidebar-swatch"
							style="background-color: {theme.config.design.colorNavBg};">
							<span
								class="vertical-label"
								style="color: {theme.config.design.colorText}; font-family: '{theme.config
									.sideNav.font}' !important;">
								{getCleanThemeName(theme.name)}
							</span>
						</div>

						<div class="swatch-main-area">
							<div class="swatch-colors">
								<div
									class="color-strip main-bg"
									style="background-color: {theme.config.design.colorBg};">
									<span
										class="color-label"
										style="color: {theme.config.design.colorText};">
										BG
									</span>
									<div class="theme-specimen-lines">
										<span
											class="theme-specimen-line"
											style="color: {theme.config.design.colorText}; font-family: '{theme
												.config.coverPage.font}' !important;">
											Cover
										</span>
										<span
											class="theme-specimen-line"
											style="color: {theme.config.design.colorText}; font-family: '{theme
												.config.design.fontDisplay}' !important;">
											Titles
										</span>
										<span
											class="theme-specimen-line"
											style="color: {theme.config.design.colorText}; font-family: '{theme
												.config.design.font}' !important;">
											Body
										</span>
									</div>
								</div>
								<div
									class="color-strip"
									style="background-color: {theme.config.design.colorText};">
									<span class="color-label" style="color: {theme.config.design.colorBg};">
										TXT
									</span>
								</div>
								<div
									class="color-strip"
									style="background-color: {theme.config.design.colorLines};">
									<span
										class="color-label"
										style="color: {theme.config.design.colorText};">
										LINE
									</span>
								</div>
								<div
									class="color-strip"
									style="background-color: {theme.config.design.colorDots};">
									<span
										class="color-label"
										style="color: {theme.config.design.colorText};">
										DOTS
									</span>
								</div>
							</div>
						</div>
					</div>
				</button>
			{/each}
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

	.modal-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
	}

	.theme-swatch-card {
		display: flex;
		flex-direction: column;
		background: transparent;
		border: none;
		border-radius: 4px;
		padding: 0;
		cursor: pointer;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
		position: relative;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
		text-align: left;
		color: inherit;
		flex-shrink: 0;
		overflow: hidden;

		&:hover {
			transform: translateY(-5px);
			box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
		}
	}

	.swatch-layout {
		display: flex;
		flex-direction: row-reverse;
		height: 100%;
		width: 100%;
	}

	.theme-swatch-card.nav-left .swatch-layout {
		flex-direction: row;
	}

	.nav-sidebar-swatch {
		width: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.vertical-label {
		writing-mode: vertical-rl;
		text-orientation: mixed;
		transform: rotate(180deg);
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		opacity: 0.7;
		pointer-events: none;
		white-space: nowrap;
	}

	.swatch-main-area {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.swatch-colors {
		display: flex;
		flex-direction: column;
		height: 240px;
	}

	.color-strip {
		flex: 1;
		display: flex;
		align-items: center;
		padding-left: 1rem;
		position: relative;
		overflow: hidden;

		&.main-bg {
			flex: 3;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			gap: 0.25rem;
		}

		.color-label {
			font-size: 0.6rem;
			font-weight: 800;
			letter-spacing: 0.05em;
			opacity: 0.6;
			text-transform: uppercase;
		}
	}

	.theme-specimen-lines {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin-top: 0.25rem;
	}

	.theme-specimen-line {
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.02em;
		white-space: nowrap;
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
