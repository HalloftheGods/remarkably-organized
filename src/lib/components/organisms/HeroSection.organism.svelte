<script lang="ts">
	import Box from '$atoms/Box.atom.svelte';
	import Text from '$atoms/Text.atom.svelte';
	import Link from '$atoms/Link.atom.svelte';
	import Icon from '$atoms/Icon.atom.svelte';
	import Divider from '$atoms/Divider.atom.svelte';
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
		hatWizardIcon: HatWizardIcon,
	}: Props = $props();
</script>

<Box tag="section" class="hero-section">
	<Text tag="h1">
		<Text tag="small"><Text tag="i">Remarkably Organized</Text></Text>
		<Text class="title">PLANNER</Text>
		<VersionBanner version={majorMinorPatchVersion} />
	</Text>
	<Text tag="p">
		Build beautiful, functional planners for the reMarkable and other e-ink tablets.
	</Text>
	<Link href="/planner{shareUrl}" class="primary-cta" onclick={handlePrimaryCtaClick}>
		<Icon><HatWizardIcon style="margin-right: .5rem;" /></Icon>
		Begin the Wizard!
	</Link>

	<Box class="stats-container">
		<StatItem number={formatNumber(visits)} label="Visitors" />
		<Divider class="stat-divider" />
		<StatItem number={formatNumber(created)} label="Planners" />
		<Divider class="stat-divider" />
		<StatItem number={formatNumber(printed)} label="Prints" />
		<Divider class="stat-divider" />
		<StatItem number={formatNumber(shared)} label="Shares" />
		<Divider class="stat-divider" />
		<StatItem number={formatTime(timeCreatingSeconds)} label="Total Time Creating" />
	</Box>
</Box>

<style lang="scss">
	:global(.hero-section) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		max-width: 600px;

		@include desktop {
			flex: 1;
		}

		:global(h1) {
			color: white;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			line-height: 1.1;
			margin: 0;
			width: 100%;

			:global(small) {
				font-size: 1.75rem;
				color: #ffffff;
				font-weight: 300;
				margin-bottom: -0.25rem;
				letter-spacing: 0.02em;

				:global(i) {
					font-style: italic;
				}

				@include tablet {
					font-size: 3rem;
					margin-bottom: -1rem;
				}
			}

			:global(.title) {
				font-size: 18vw;
				font-weight: 900;
				text-transform: uppercase;
				letter-spacing: -2px;
				text-shadow: 0px 6px 12px rgba(0, 0, 0, 0.4);
				z-index: 2;

				@include tablet {
					font-size: 8rem;
					text-shadow: 0px 8px 16px rgba(0, 0, 0, 0.4);
				}

				@include desktop {
					font-size: 9rem;
				}
			}
		}

		:global(p) {
			max-width: 500px;
			color: rgba(255, 255, 255, 0.9);
			text-align: center;
			font-size: 1.1rem;
			line-height: 1.5;
			margin: 1.5rem auto 0;
			font-weight: 400;

			@include tablet {
				font-size: 1.3rem;
				margin: 2rem auto 0;
				max-width: 600px;
			}
		}

		:global(.primary-cta) {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;
			background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
			background-size: 200% 200%;
			color: #ffffff;
			text-decoration: none;
			border-radius: 999px;
			padding: 1.25rem 3rem;
			font-size: 1.25rem;
			font-weight: 600;
			box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
			transition:
				transform 0.2s ease-in-out,
				box-shadow 0.2s ease;
			animation: gradient-shift 5s ease infinite;
			margin: 2.5rem 0 0;

			&:hover {
				transform: scale(1.05);
				box-shadow: 0 6px 20px rgba(236, 72, 153, 0.4);
			}

			&:active {
				transform: scale(0.98);
				box-shadow: 0 2px 10px rgba(236, 72, 153, 0.3);
			}

			@include tablet {
				margin: 3.5rem 0 0;
				font-size: 1.5rem;
			}
		}

		:global(.stats-container) {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1rem;
			margin-top: 2rem;
			padding: 0;
			width: 100%;
			max-width: 320px;

			@include tablet {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 1.5rem;
				margin-top: 3rem;
				max-width: none;
			}
		}

		:global(.stat-divider) {
			display: none;

			@include tablet {
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
