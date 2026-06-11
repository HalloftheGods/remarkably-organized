<script lang="ts">
	import { Button } from '$atoms';
	import type { PlannerSettings } from '$lib';
	import { THEMES } from '$lib/data/themes';
	import { fade } from 'svelte/transition';
	import { tick } from 'svelte';
	import MagicIcon from '~icons/fa/magic';
	import { ThemeSwatch } from '$molecules';
	import { getGoogleFontURL } from '$lib';

	interface Props {
		settings: PlannerSettings;
	}

	let { settings }: Props = $props();

	let isOpen = $state(false);
	let originalTheme = $state<(typeof THEMES)[number] | null>(null);

	const activeTheme = $derived(
		THEMES.find((t) => t.id === settings.design.themeId) || THEMES[0],
	);

	const allThemeFonts = $derived(
		isOpen
			? THEMES.flatMap((t) => [
					t.config.design.font,
					t.config.design.fontDisplay,
					t.config.coverPage.font,
					t.config.sideNav.font,
					t.config.topNav.font,
				])
			: [],
	);

	const allFontsURL = $derived(getGoogleFontURL(allThemeFonts));

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

			const containerCenter =
				target.getBoundingClientRect().left + target.clientWidth / 2;
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

	let sliderRef: HTMLDivElement | undefined = $state();

	const horizontalScroll = (node: HTMLElement) => {
		const handleWheel = (e: WheelEvent) => {
			if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
				e.preventDefault();
				node.scrollLeft += e.deltaY * 1.5;
			}
		};

		node.addEventListener('wheel', handleWheel, { passive: false });

		return {
			destroy() {
				node.removeEventListener('wheel', handleWheel);
			}
		};
	};

	const toggleOpen = async () => {
		if (!isOpen) {
			originalTheme = activeTheme;
			settings.isPreviewingTheme = true;
			isOpen = true;

			await tick();

			if (sliderRef) {
				const activeChild = sliderRef.querySelector(
					`[data-theme-id="${activeTheme.id}"]`,
				) as HTMLElement;
				if (activeChild) {
					sliderRef.scrollLeft =
						activeChild.offsetLeft -
						sliderRef.clientWidth / 2 +
						activeChild.clientWidth / 2;
				}
			}
		} else {
			settings.isPreviewingTheme = false;
			if (originalTheme) {
				applyThemeConfig(originalTheme);
			}
			isOpen = false;
		}
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
</script>

<svelte:head>
	{#if isOpen && allFontsURL}
		<link rel="stylesheet" href={allFontsURL} />
	{/if}
</svelte:head>

<button
	class="theme-trigger no-print"
	data-tooltip="'POOF!' New theme!"
	onclick={toggleOpen}>
	<MagicIcon />
</button>

{#if isOpen}
	<div
		class="fixed inset-0 w-full h-full z-[200] flex items-end pb-8 pointer-events-none"
		in:fade={{ duration: 200 }}
		out:fade={{ duration: 150 }}>
		<Button
			class="fixed top-8 right-8 w-12 h-12 rounded-full flex items-center justify-center shadow-md bg-white text-black hover:scale-110 transition-transform z-20 pointer-events-auto"
			onclick={toggleOpen}
			title="Close Themes">
			✕
		</Button>

		<!-- Center: Themes Slider -->
		<div
			bind:this={sliderRef}
			use:horizontalScroll
			class="pointer-events-auto w-full max-w-[100vw] overflow-x-auto flex flex-row items-center gap-8 py-12 z-10 snap-x snap-mandatory"
			style="scrollbar-width: none; -ms-overflow-style: none; padding-left: calc(50vw - 140px); padding-right: calc(50vw - 140px); mask-image: linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%); -webkit-mask-image: linear-gradient(to right, transparent 0%, black 35%, black 65%, transparent 100%);"
			onmouseleave={clearPreview}
			onscroll={handleScroll}>
			{#each THEMES as theme (theme.id)}
				<ThemeSwatch
					{theme}
					class="snap-center shrink-0 w-[320px]"
					data-theme-id={theme.id}
					isNavLeft={settings.sideNav.leftSide}
					onmouseenter={() => previewTheme(theme)}
					onfocus={() => previewTheme(theme)}
					onclick={() => selectTheme(theme)} />
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

	.theme-trigger {
		position: fixed;
		bottom: 1rem;
		left: 50%;
		transform: translateX(calc(-50% - 2.25rem));
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
			transform: translateX(calc(-50% - 2.25rem)) scale(1.05) translateY(-2px);
			box-shadow: var(--shadow-5);
			color: white;
		}
		&::before {
			bottom: 100% !important;
			top: auto !important;
			left: 50% !important;
			right: auto !important;
			margin-bottom: 0.75rem !important;
			margin-top: 0 !important;
			margin-left: 0 !important;
			margin-right: 0 !important;
			transform: translateX(-50%) translateY(0.25rem) scale(0.9) !important;
			transform-origin: bottom center !important;
		}
		&:hover::before {
			transform: translateX(-50%) translateY(0) scale(1) !important;
		}
	}
</style>
