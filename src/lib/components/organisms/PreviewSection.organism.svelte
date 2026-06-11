<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Badge from '$molecules/Badge.molecule.svelte';
	import InteractivePlannerPreview from '$molecules/InteractivePlannerPreview.molecule.svelte';
	import { THEMES } from '$lib/data/themes';
	import { PAGE_TEMPLATES } from '$lib/data/templates';
	import { PlannerSettings } from '$state';

	interface Props {
		shareUrl: string;
		presetsLength: number;
		templatesLength: number;
		themesLength: number;
		handlePreviewClick: () => void;
		trophyIcon: any;
		magicIcon: any;
	}

	let {
		shareUrl,
		presetsLength,
		templatesLength,
		themesLength,
		handlePreviewClick,
		trophyIcon: TrophyIcon,
		magicIcon: MagicIcon,
	}: Props = $props();

	// Exclude collections, dashboards, or utility pages that might not render beautifully on their own without more context.
	// You can tune this array if there are specific ones to ignore.
	const TEMPLATES = PAGE_TEMPLATES.filter(
		(t) =>
			t.value !== 'cover' && t.value !== 'dashboard' && t.value !== 'collection-index',
	);

	let remainingTemplates = [...TEMPLATES];
	let remainingThemes = [...THEMES];

	function getNextTemplate() {
		if (remainingTemplates.length === 0) {
			remainingTemplates = [...TEMPLATES];
		}
		const index = Math.floor(Math.random() * remainingTemplates.length);
		return remainingTemplates.splice(index, 1)[0];
	}

	function getNextTheme() {
		if (remainingThemes.length === 0) {
			remainingThemes = [...THEMES];
		}
		const index = Math.floor(Math.random() * remainingThemes.length);
		return remainingThemes.splice(index, 1)[0];
	}

	let activeTemplate = $state(getNextTemplate());
	let activeTheme = $state(getNextTheme());

	const activeSettings = $derived(
		new PlannerSettings({
			design: activeTheme.config.design,
			coverPage: activeTheme.config.coverPage,
			topNav: activeTheme.config.topNav,
			sideNav: activeTheme.config.sideNav,
		}),
	);

	let rotationTimer: ReturnType<typeof setTimeout>;

	function performRotation() {
		activeTemplate = getNextTemplate();
		activeTheme = getNextTheme();

		startRotation();
	}

	function startRotation() {
		clearTimeout(rotationTimer);
		rotationTimer = setTimeout(performRotation, 4200);
	}

	onMount(() => {
		startRotation();
		return () => {
			clearTimeout(rotationTimer);
		};
	});
</script>

<section class="flex flex-col items-center justify-center w-full desktop:flex-1">
	<a
		href="/planner{shareUrl}"
		class="group/wrapper relative flex justify-center items-center transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-[5px]"
		onclick={handlePreviewClick}>
		<Badge
			class="free-badge absolute top-[-10px] left-[-10px] z-10 flex items-center gap-[0.5rem] rounded-full border-2 border-white bg-linear-135 from-[#fcd34d] to-[#f59e0b] px-[1.25rem] py-[0.5rem] text-[1rem] font-black tracking-[0.5px] text-[#5d2b00] shadow-[0_10px_25px_rgba(245,158,11,0.4),inset_0_2px_4px_rgba(255,255,255,0.6)] transition-all duration-400 group-hover/wrapper:rotate-[-12deg] group-hover/wrapper:scale-[1.1] group-hover/wrapper:shadow-[0_15px_35px_rgba(245,158,11,0.6),inset_0_2px_4px_rgba(255,255,255,0.8)] tablet:top-[-15px] tablet:left-[-20px] tablet:text-[1.25rem] tablet:px-[2rem] tablet:py-[0.75rem]"
			icon={TrophyIcon}
			text="100% FREE" />
		<Badge
			class="templates-badge absolute bottom-[-12px] left-[50%] z-10 flex items-center gap-[0.5rem] rounded-full border-2 border-white bg-linear-135 from-[#7dd3fc] to-[#0284c7] px-[1rem] py-[0.4rem] text-[0.75rem] font-black tracking-[0.5px] text-white whitespace-nowrap shadow-[0_10px_25px_rgba(56,189,248,0.4),inset_0_2px_4px_rgba(255,255,255,0.4)] transition-all duration-400 group-hover/wrapper:rotate-[5deg] group-hover/wrapper:scale-[1.1] group-hover/wrapper:shadow-[0_15px_35px_rgba(56,189,248,0.6),inset_0_2px_4px_rgba(255,255,255,0.8)] tablet:bottom-[-18px] tablet:text-[1rem] tablet:px-[1.75rem] tablet:py-[0.6rem] translate-x-[-50%]"
			icon={MagicIcon}
			text="Now with {presetsLength} Presets, {templatesLength} Templates, and {themesLength} Themes!" />
		<div class="splash-preview-wrapper relative grid place-items-center w-full">
			{#key activeTemplate.value + activeTheme.id}
				<div
					in:fade={{ duration: 800 }}
					out:fade={{ duration: 800 }}
					class="col-start-1 row-start-1 w-full flex justify-center items-center">
					<div
						class="rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-shadow duration-300 group-hover/wrapper:shadow-[0_15px_40px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-none"
						style="width: calc(80vh * {activeSettings.design.aspectRatio ||
							0.75}); max-width: 95vw;">
						<InteractivePlannerPreview
							settings={activeSettings}
							hashOverride={activeTemplate.value}
							titleOverride={`${activeTemplate.name} • ${activeTheme.name}`}
							scaleOnHover={false} />
					</div>
				</div>
			{/key}
		</div>
	</a>
</section>

<style lang="scss">
	.splash-preview-wrapper {
		:global(.template-thumbnail) {
			border: none !important;
			background-color: transparent !important;
		}

		:global(.thumbnail-footer) {
			display: none !important;
		}
	}

	.mini-planner-root {
		transform-origin: top left;
		width: 702px;
		height: calc(702px / var(--thumbnail-aspect-ratio, 0.75));
		transform: scale(calc(100cqw / 702px));
		position: absolute;
		top: 0;
		left: 0;

		:global(a) {
			pointer-events: auto !important;
		}
		:global(article) {
			display: none !important;
			width: var(--doc-width) !important;
			height: var(--doc-height) !important;
			background-color: var(--bg-pdf);
		}
		:global(article.force-visible) {
			display: block !important;
		}
	}
</style>
