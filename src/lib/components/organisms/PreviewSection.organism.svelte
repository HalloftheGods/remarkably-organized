<script lang="ts">
	import { onMount } from 'svelte';
	import Box from '$lib/components/atoms/Box.atom.svelte';
	import Link from '$lib/components/atoms/Link.atom.svelte';
	import Image from '$lib/components/atoms/Image.atom.svelte';
	import Badge from '$lib/components/molecules/Badge.molecule.svelte';

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
	let isTransitioning = $state(false);
	let remainingIndices = $state<number[]>([]);

	const activeImage = $derived(ROTATION_IMAGES[activeIndex]);
	const nextImage = $derived(nextIndex !== null ? ROTATION_IMAGES[nextIndex] : null);
	const hasNextImage = $derived(nextIndex !== null);

	let rotationTimer: ReturnType<typeof setTimeout>;

	function startRotation() {
		rotationTimer = setTimeout(preloadNextImage, 5000);
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
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				isTransitioning = true;
				setTimeout(completeRotation, 500);
			});
		});
	}

	function completeRotation() {
		activeIndex = nextIndex!;
		nextIndex = null;
		isTransitioning = false;
		startRotation();
	}

	onMount(() => {
		startRotation();
		return () => {
			clearTimeout(rotationTimer);
		};
	});
</script>

<Box tag="section" class="preview-section">
	<Link href="/planner{shareUrl}" class="image-wrapper" onclick={handlePreviewClick}>
		<Badge class="free-badge" icon={TrophyIcon} text="100% FREE" />
		<Badge
			class="templates-badge"
			icon={MagicIcon}
			text="Now with {presetsLength} Presets, {templatesLength} Templates, and {themesLength} Themes!" />
		<div class="hero-image-container">
			<Image
				src={activeImage}
				alt="Remarkably Organized Planner - Preview View"
				class="hero-image {isTransitioning ? 'fade-out' : ''}" />
			{#if hasNextImage}
				<Image
					src={nextImage || ''}
					alt="Remarkably Organized Planner - Preview View"
					class="hero-image next-image {isTransitioning ? 'fade-in' : ''}"
					onload={handleNextImageLoaded} />
			{/if}
		</div>
	</Link>
</Box>

<style lang="scss">
	:global(.preview-section) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		max-width: 600px;

		@include desktop {
			flex: 1;
			max-width: 800px;
		}

		:global(.image-wrapper) {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			transition: transform 0.3s ease-in-out;

			&:hover {
				transform: scale(1.02) translateY(-5px);

				:global(.free-badge) {
					transform: rotate(-12deg) scale(1.1);
					box-shadow:
						0 15px 35px rgba(245, 158, 11, 0.6),
						inset 0 2px 4px rgba(255, 255, 255, 0.8);
				}

				:global(.templates-badge) {
					transform: translateX(-50%) rotate(5deg) scale(1.1);
					box-shadow:
						0 15px 35px rgba(56, 189, 248, 0.6),
						inset 0 2px 4px rgba(255, 255, 255, 0.8);
				}
			}
		}

		:global(.hero-image-container) {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
		}

		:global(.hero-image) {
			max-width: 100%;
			max-height: 80vh;
			border-radius: 20px;
			object-fit: contain;
			box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.4);
			transition:
				box-shadow 0.3s ease,
				opacity 0.5s ease-in-out;
			opacity: 1;

			&.fade-out {
				opacity: 0;
			}

			:global(.image-wrapper:hover) & {
				box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.5);
			}
		}

		:global(.next-image) {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
			pointer-events: none;

			&.fade-in {
				opacity: 1;
			}
		}
	}
</style>
