<script lang="ts">
	import VersionBanner from '$molecules/VersionBanner.molecule.svelte';
	import StatItem from '$molecules/StatItem.molecule.svelte';

	interface Props {
		majorMinorPatchVersion: string;
		visits: number;
		created: number;
		printed: number;
		shared: number;
		timeCreatingSeconds: number;
		formatNumber: (n: number) => string;
		formatTime: (s: number) => string;
		shareUrl: string;
		handlePrimaryCtaClick: () => void;
		handlePresetsClick: () => void;
		hatWizardIcon: any;
	}

	let {
		majorMinorPatchVersion,
		visits,
		created,
		printed,
		shared,
		timeCreatingSeconds,
		formatNumber,
		formatTime,
		shareUrl,
		handlePrimaryCtaClick,
		handlePresetsClick,
		hatWizardIcon: HatWizardIcon,
	}: Props = $props();
</script>

<section class="hero-section">
	<h1 class="">
		<small>
			<i class="not-italic">Remarkably Organized</i>
		</small>
		<span class="hero-text">PLANNER</span>
	</h1>
	<p class="text-center w-full text-white">
		Build beautiful, functional PDF planners for your e-ink tablet.
	</p>
	<div class="flex flex-row gap-1">
		<VersionBanner version={majorMinorPatchVersion} />
	</div>

	<a
		href="/planner{shareUrl}"
		class="primary-cta"
		onclick={handlePrimaryCtaClick}>
		<HatWizardIcon style="margin-right: .5rem;" />
		Begin the Wizard!
	</a>
	<a
		href="/presets"
		class="secondary-link"
		onclick={handlePresetsClick}>
		Browse Our Free Preset Planner Library
	</a>

	<div class="stats-container">
		<StatItem number={formatNumber(visits)} label="Visitors" />
		<div class="stat-divider" />
		<StatItem number={formatNumber(created)} label="Planners" />
		<div class="stat-divider" />
		<StatItem number={formatNumber(printed)} label="Prints" />
		<div class="stat-divider" />
		<StatItem number={formatNumber(shared)} label="Shares" />
		<div class="stat-divider" />
		<StatItem
			number={formatTime(timeCreatingSeconds)}
			label="Total Time Creating"
			class="stat-item" />
	</div>
</section>

<style>
	.hero-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		max-width: 600px;
		margin: 0 auto;

		@media (min-width: 1024px) {
			flex: 1;
		}

		:global {
			h1 {
				color: white;
				@apply flex flex-col items-center justify-center;
				line-height: 1.1;
				margin: 0;
				width: 100%;
				
				small i {
					color: white;
					font-size: 2.25rem;
					font-weight: 100;
					font-style: italic;
				}
			}

			.hero-text {
				font-size: 10vw;
				font-weight: 800;
				text-transform: uppercase;
				letter-spacing: -2px;
				text-shadow: 0px 6px 12px rgba(0, 0, 0, 0.4);
				z-index: 2;

				@media (min-width: 768px) {
					font-size: 8rem;
					text-shadow: 0px 8px 16px rgba(0, 0, 0, 0.4);
				}

				@media (min-width: 1024px) {
					font-size: 7rem;
				}
			}

			p {
				max-width: 500px;
				color: rgba(255, 255, 255, 0.9);
				text-align: center;
				font-size: 1.1rem;
				line-height: 1.5;
				margin: 0.5rem auto 0;

				@media (min-width: 768px) {
					font-size: 1.3rem;
					max-width: 600px;
				}
			}

			.primary-cta {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 0.5rem;
				margin-top: 1.5rem;
				padding: 1.25rem 3rem;
				border-radius: 999px;
				border: none;
				background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
				background-size: 200% 200%;
				color: #ffffff;
				text-decoration: none;
				font-size: 1.25rem;
				font-weight: 600;
				box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
				transition:
					transform 0.2s ease-in-out,
					box-shadow 0.2s ease;
				animation: gradient-shift 5s ease infinite;

				&:hover {
					transform: scale(1.05);
					box-shadow: 0 6px 20px rgba(236, 72, 153, 0.4);
					background-position: 100% center;
				}

				&:active {
					transform: scale(0.98);
					box-shadow: 0 2px 10px rgba(236, 72, 153, 0.3);
				}

				@media (min-width: 768px) {
					font-size: 1.5rem;
				}
			}

			.secondary-link {
				color: rgba(255, 255, 255, 0.8);
				text-decoration: underline;
				text-decoration-color: rgba(255, 255, 255, 0.5);
				margin-top: 1rem;
				font-size: 1rem;
				transition: color 0.2s ease;

				&:hover {
					color: #ffffff;
					text-decoration-color: #ffffff;
				}
			}

			.stats-container {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: 1rem;
				margin: 1.25rem auto 0;
				padding: 0;
				width: 100%;
				max-width: 320px;
				justify-content: center;

				& > :global(.stat-item:last-of-type) {
					grid-column: 1 / span 2 !important;
					display: flex;
					flex-direction: column;
					align-items: center;
					text-align: center;
					width: 100%;
				}

				@media (min-width: 768px) {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					gap: 1.5rem;
					margin-top: 3rem;
					max-width: none;

					& > :global(.stat-item:last-of-type) {
						grid-column: auto !important;
						width: auto;
					}
				}
			}

			.stat-divider {
				display: none;

				@media (min-width: 768px) {
					display: block;
					width: 1px;
					height: 50px;
					background: linear-gradient(
						to bottom,
						rgba(255, 255, 255, 0),
						rgba(255, 255, 255, 0.4),
						rgba(255, 255, 255, 0)
					);
				}
			}
		}
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
</style>
