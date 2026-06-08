<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Badge from '$molecules/Badge.molecule.svelte';
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

	const TEMPLATE_PREFIX = '/remarkably-organized-template-';
	const YEAR_VIEW_IMAGE = '/remarkably-organized-year-view.jpg';
	const SUFFIXES = [
		'agenda-day-executive.png',
		'agenda-day-mindful.png',
		'agenda-day-split.png',
		'agenda-day-timebox.png',
		'agenda-day.png',
		'agenda-week-focus.png',
		'agenda-week-timebox.png',
		'agenda-week.png',
		'calendar-quarter.png',
		'calendar-year.png',
		'character-sheet.png',
		'event-planner.png',
		'finance-tracker.png',
		'goals-quarter (1).png',
		'habit-year-by-month.png',
		'habit-year-by-week.png',
		'meal-planner.png',
		'meeting-minutes.png',
		'pet-care.png',
		'pomodoro-tracker.png',
		'sprint-planner.png',
		'stoic-reflection.png',
		'tasklist-progress.png',
		'travel-planner.png',
		'workout-log.png',
	];

	const ROTATION_IMAGES = [
		YEAR_VIEW_IMAGE,
		...SUFFIXES.map((suffix) => `${TEMPLATE_PREFIX}${suffix}`),
	];

	let activeIndex = $state(0);
	let nextIndex = $state<number | null>(null);
	let remainingIndices = $state<number[]>([]);

	const activeImage = $derived(ROTATION_IMAGES[activeIndex]);
	const nextImage = $derived(nextIndex !== null ? ROTATION_IMAGES[nextIndex] : null);

	let rotationTimer: ReturnType<typeof setTimeout>;

	function startRotation() {
		rotationTimer = setTimeout(preloadNextImage, 3333);
	}

	function getNextRandomIndex(): number {
		if (remainingIndices.length === 0) {
			const indices = Array.from({ length: ROTATION_IMAGES.length }, (_, i) => i);
			const currentIndex = activeIndex;

			for (let i = indices.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[indices[i], indices[j]] = [indices[j], indices[i]];
			}

			const isLastElementCurrent = indices[indices.length - 1] === currentIndex;
			const hasMultipleElements = indices.length > 1;

			if (isLastElementCurrent && hasMultipleElements) {
				[indices[indices.length - 1], indices[0]] = [
					indices[0],
					indices[indices.length - 1],
				];
			}

			remainingIndices = indices;
		}

		return remainingIndices.pop()!;
	}

	function preloadNextImage() {
		nextIndex = getNextRandomIndex();
	}

	function handleNextImageLoaded() {
		completeRotation();
	}

	function completeRotation() {
		if (nextIndex === null) return;
		activeIndex = nextIndex;
		nextIndex = null;
		startRotation();
	}

	onMount(() => {
		startRotation();
		return () => {
			clearTimeout(rotationTimer);
		};
	});
</script>

<section
	class="flex flex-col items-center justify-center w-full max-w-[600px] desktop:flex-1 desktop:max-w-[800px]">
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
		<div class="relative grid place-items-center w-full">
			{#key activeImage}
				<div
					in:fade={{ duration: 800 }}
					out:fade={{ duration: 800 }}
					class="col-start-1 row-start-1 w-full flex justify-center items-center">
					<img
						src={activeImage}
						alt="My Remarkably Organized Planner - Preview View"
						class="max-w-full max-h-[80vh] rounded-[20px] object-contain shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-shadow duration-300 group-hover/wrapper:shadow-[0_15px_40px_rgba(0,0,0,0.5)]" />
				</div>
			{/key}
		</div>
		{#if nextImage}
			<div class="preloader" style="display: none;">
				<img src={nextImage} alt="" onload={handleNextImageLoaded} />
			</div>
		{/if}
	</a>
</section>

<style>
</style>
