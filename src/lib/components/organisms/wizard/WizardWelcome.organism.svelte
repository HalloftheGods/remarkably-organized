<script lang="ts">
	import { Box, Text, Input, Button } from '$atoms';
	import { fade } from 'svelte/transition';
	import type { PlannerSettings } from '$state';

	let {
		onClose = (() => {}) as () => void,
		steps = [] as { id: string; title: string; icon: any }[],
		settings = {} as PlannerSettings,
		onStepClick = ((_index: number) => {}) as (index: number) => void,
	} = $props();

	const appVersion = __APP_VERSION__;

	const stepDescriptions: Record<string, string> = {
		presets: 'Start with a curated theme or layout.',
		design: 'Customize fonts, colors, and styling.',
		cover: 'Personalize your planner front page.',
		spreads: 'Choose your weekly and monthly views.',
		calendars: 'Configure your dated calendar pages.',
		'cal-notes': 'Add extra note pages to your layouts.',
		collections: 'Include specialized trackers and logs.',
		indexes: 'Organize everything with index pages.',
		events: 'Sync your digital calendar and events.',
		export: 'Generate and download your PDF.',
	};

	const highlightSteps = $derived(steps.filter((s) => s.id !== 'welcome'));
</script>

<Box class="step-content welcome-step" transition="fade" inDuration={200}>
	<Box class="welcome-scene">
		<Box class="welcome-particles" aria-hidden="true">
			{#each Array(12) as _, i}
				<span
					class="particle"
					style="--delay: {i * 0.4}s; --x: {Math.sin(i * 1.2) * 40 + 50}%; --y: {Math.cos(
						i * 0.9,
					) *
						40 +
						50}%; --size: {3 + (i % 4) * 2}px; --dur: {6 + (i % 3) * 3}s;">
				</span>
			{/each}
		</Box>

		<Box class="welcome-orb" aria-hidden="true">
			<svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<radialGradient id="wg-radial" cx="40%" cy="40%" r="60%">
						<stop offset="0%" stop-color="#a78bfa" stop-opacity="0.9" />
						<stop offset="40%" stop-color="#7c3aed" stop-opacity="0.7" />
						<stop offset="100%" stop-color="#06b6d4" stop-opacity="0.4" />
					</radialGradient>
					<filter id="wg-glow">
						<feGaussianBlur stdDeviation="20" result="blur" />
						<feComposite in="SourceGraphic" in2="blur" operator="over" />
					</filter>
				</defs>
				<g transform="translate(300,300)" filter="url(#wg-glow)">
					<path
						d="M120,-160C170,-120,200,-60,190,-10C180,40,130,90,80,130C30,170,-30,200,-80,180C-130,160,-170,90,-170,30C-170,-30,-130,-100,-80,-140C-30,-180,30,-200,80,-180C110,-170,80,-200,120,-160Z"
						fill="url(#wg-radial)">
						<animateTransform
							attributeName="transform"
							type="rotate"
							values="0;360"
							dur="30s"
							repeatCount="indefinite" />
						<animate
							attributeName="d"
							dur="10s"
							repeatCount="indefinite"
							values="M120,-160C170,-120,200,-60,190,-10C180,40,130,90,80,130C30,170,-30,200,-80,180C-130,160,-170,90,-170,30C-170,-30,-130,-100,-80,-140C-30,-180,30,-200,80,-180C110,-170,80,-200,120,-160Z;M150,-130C180,-90,170,-30,150,20C130,70,100,120,50,150C0,180,-60,170,-110,140C-160,110,-180,50,-170,-10C-160,-70,-120,-130,-70,-160C-20,-190,40,-200,90,-180C120,-170,120,-170,150,-130Z;M120,-160C170,-120,200,-60,190,-10C180,40,130,90,80,130C30,170,-30,200,-80,180C-130,160,-170,90,-170,30C-170,-30,-130,-100,-80,-140C-30,-180,30,-200,80,-180C110,-170,80,-200,120,-160Z" />
					</path>
					<path
						d="M90,-130C130,-100,160,-40,150,10C140,60,100,100,50,120C0,140,-50,150,-90,120C-130,90,-140,30,-130,-20C-120,-70,-90,-120,-40,-150C10,-180,50,-160,90,-130Z"
						fill="#06b6d4"
						opacity="0.3">
						<animateTransform
							attributeName="transform"
							type="rotate"
							values="360;0"
							dur="25s"
							repeatCount="indefinite" />
					</path>
				</g>
			</svg>
		</Box>
		<Box class="welcome-content">
			<h2 class="welcome-headline">
				<small>Welcome to the FREE to use</small>
				<br />
				<span class="welcome-headline-gradient">My Remarkably Organized</span>
				Wizard
			</h2>
			<Box class="welcome-badge">v{appVersion}</Box>
			<Text tag="p" class="welcome-tagline">
				Build beautiful, functional PDF planners for your e-ink tablet.
			</Text>

			<Box
				class="welcome-features"
				style="--display-font: {settings.design.fontDisplay}; --body-font: {settings
					.design.font}">
				{#each highlightSteps as step, i}
					{@const Icon = step.icon}
					<Button
						class="welcome-feature"
						style="--i: {i}"
						onclick={() => onStepClick(i + 1)}>
						<span class="welcome-feature-icon"><Icon /></span>
						<Box class="welcome-feature-body">
							<strong>{step.title}</strong>
							<span>{stepDescriptions[step.id]}</span>
						</Box>
					</Button>
				{/each}
			</Box>

			<small class="welcome-hint">
				💡 Hold the peek button to preview changes in real time
			</small>
		</Box>
	</Box>
</Box>

<style lang="scss">
	:global(.welcome-step) {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;

		@media (max-width: 768px) {
			align-items: flex-start;
		}
	}

	:global(.welcome-scene) {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		min-height: 380px;
		overflow: hidden;

		@media (max-width: 768px) {
			min-height: auto;
			height: auto;
			padding: 1rem 0;
			align-items: flex-start;
			overflow: visible;
		}
	}

	:global(.welcome-particles) {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 0;
		@media (max-width: 768px) {
			display: none;
		}
	}

	:global(.particle) {
		position: absolute;
		left: var(--x);
		top: var(--y);
		width: var(--size);
		height: var(--size);
		border-radius: 50%;
		background: radial-gradient(circle, rgba(124, 58, 237, 0.6), rgba(6, 182, 212, 0.4));
		box-shadow: 0 0 8px rgba(124, 58, 237, 0.3);
		animation: particle-float var(--dur) ease-in-out var(--delay) infinite;
		opacity: 0;
	}

	@keyframes particle-float {
		0% {
			opacity: 0;
			transform: translateY(0) scale(0.5);
		}
		20% {
			opacity: 0.8;
		}
		50% {
			transform: translateY(-30px) scale(1);
		}
		80% {
			opacity: 0.6;
		}
		100% {
			opacity: 0;
			transform: translateY(10px) scale(0.3);
		}
	}

	:global(.welcome-orb) {
		position: absolute;
		width: 320px;
		height: 320px;
		opacity: 0.25;
		filter: blur(30px);
		pointer-events: none;
		z-index: 0;
		animation: orb-pulse 8s ease-in-out infinite;

		@media (max-width: 768px) {
			width: 200px;
			height: 200px;
			opacity: 0.15;
		}
	}

	@keyframes orb-pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.25;
		}
		50% {
			transform: scale(1.1);
			opacity: 0.35;
		}
	}

	:global(.welcome-content) {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.5rem;
		max-width: 100%;
		padding: 1rem 1.5rem;
		animation: content-rise 0.6s ease-out both;

		@media (max-width: 768px) {
			padding: 0.5rem;
			gap: 0.4rem;
		}
	}

	@keyframes content-rise {
		from {
			opacity: 0;
			transform: translateY(24px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	:global(.welcome-badge) {
		display: inline-flex;
		padding: 0.2rem 0.7rem;
		border-radius: 100px;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #a78bfa;
		background: rgba(124, 58, 237, 0.12);
		border: 1px solid rgba(124, 58, 237, 0.2);
		backdrop-filter: blur(8px);
	}

	:global(.welcome-headline) {
		margin: 0;
		font-size: 2rem;
		font-weight: 800;
		letter-spacing: -0.03em;
		line-height: 1.1;
		color: var(--text);

		@media (max-width: 768px) {
			font-size: 1.75rem;
		}
	}

	:global(.welcome-headline-gradient) {
		background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #a78bfa 100%);
		background-size: 200% auto;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: gradient-shift 4s ease-in-out infinite;
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

	:global(.welcome-tagline) {
		margin: 0.15rem 0;
		font-size: 0.95rem;
		line-height: 1.4;
		color: var(--text-low);

		@media (max-width: 768px) {
			font-size: 0.85rem;
		}
	}

	:global(.welcome-features) {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 0.75rem;
		width: 100%;
		margin-top: 1.5rem;

		@media (max-width: 1024px) {
			grid-template-columns: repeat(3, 1fr);
		}

		@media (max-width: 768px) {
			grid-template-columns: repeat(2, 1fr);
			gap: 0.5rem;
		}
	}

	:global(.welcome-feature) {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem;
		border-radius: 12px;
		background: transparent;
		border: 1px solid transparent;
		transition:
			transform 0.2s ease,
			background 0.2s ease,
			border-color 0.2s ease;
		animation: feature-stagger 0.5s ease-out calc(0.3s + var(--i) * 0.1s) both;
		cursor: pointer;
		font-family: inherit;
		color: inherit;
		text-align: center;

		@media (max-width: 768px) {
			padding: 0.6rem;
		}
	}

	:global(.welcome-feature):hover {
		transform: translateY(-2px);
		background: rgba(124, 58, 237, 0.04);
		border-color: rgba(124, 58, 237, 0.1);

		@media (max-width: 768px) {
			transform: translateX(4px);
		}
	}

	@keyframes feature-stagger {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	:global(.welcome-feature-icon) {
		font-size: 2rem;
		line-height: 1;
		flex-shrink: 0;
		color: #a78bfa;
		margin-bottom: 0.25rem;

		@media (max-width: 768px) {
			font-size: 1.5rem;
			margin-bottom: 0;
		}
	}

	:global(.welcome-feature-body) {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;

		strong {
			font-family: var(--display-font, var(--font-display)) !important;
			font-size: 0.9rem;
			font-weight: 700;
			text-transform: uppercase;
			letter-spacing: 2px !important;
			color: var(--text);
		}

		span {
			font-family: var(--body-font, var(--font-body)) !important;
			font-size: 0.84rem;
			color: var(--text-low);
			line-height: 1.3;
		}

		@media (max-width: 768px) {
			span {
				font-size: 0.75rem;
			}
		}
	}

	:global(.welcome-hint) {
		color: var(--text-low);
		font-size: 0.75rem;
		opacity: 0.7;
		margin-top: 0.25rem;

		@media (max-width: 768px) {
			font-size: 0.7rem;
		}
	}
</style>
