<script lang="ts">
	import { fade } from 'svelte/transition';

	let { onClose = (() => {}) as () => void } = $props();

	const appVersion = __APP_VERSION__;
</script>

<div class="step-content welcome-step" in:fade={{ duration: 200 }}>
	<div class="welcome-scene">
		<div class="welcome-particles" aria-hidden="true">
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
		</div>

		<div class="welcome-orb" aria-hidden="true">
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
		</div>
		<div class="welcome-content">
			<h2 class="welcome-headline">
				<small>Welcome to the</small>
				<br />
				<span class="welcome-headline-gradient">Remarkably Organized</span>
				Wizard
			</h2>
			<div class="welcome-badge">v{appVersion}</div>
			<p class="welcome-tagline">
				Build beautiful, functional planners for the reMarkable and other e-ink tablets.
			</p>

			<div class="welcome-features">
				<div class="welcome-feature" style="--i: 0">
					<span class="welcome-feature-icon">🎨</span>
					<div class="welcome-feature-body">
						<strong>Themes & Typography</strong>
						<span>Curated palettes, 80+ Google Fonts</span>
					</div>
				</div>
				<div class="welcome-feature" style="--i: 1">
					<span class="welcome-feature-icon">📐</span>
					<div class="welcome-feature-body">
						<strong>Flexible Layouts</strong>
						<span>Weekly, monthly, and custom spreads</span>
					</div>
				</div>
				<div class="welcome-feature" style="--i: 2">
					<span class="welcome-feature-icon">📅</span>
					<div class="welcome-feature-body">
						<strong>Calendar Sync</strong>
						<span>Import ICS feeds directly into your planner</span>
					</div>
				</div>
			</div>

			<div class="welcome-actions">
				<button class="welcome-cta-ghost" onclick={onClose} aria-label="Close wizard">
					Skip Wizard
				</button>
			</div>

			<small class="welcome-hint">
				💡 Hold the peek button to preview changes in real time
			</small>
		</div>
	</div>
</div>

<style lang="scss">
	.welcome-step {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		overflow: hidden;
	}

	.welcome-scene {
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
			padding: 1rem 0;
		}
	}

	.welcome-particles {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 0;
		@media (max-width: 768px) {
			display: none;
		}
	}

	.particle {
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

	.welcome-orb {
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

	.welcome-content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.5rem;
		max-width: 650px;
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

	.welcome-badge {
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

	.welcome-headline {
		margin: 0;
		font-size: 2.25rem;
		font-weight: 800;
		letter-spacing: -0.03em;
		line-height: 1.1;
		color: var(--text);

		@media (max-width: 768px) {
			font-size: 1.75rem;
		}
	}

	.welcome-headline-gradient {
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

	.welcome-tagline {
		margin: 0.25rem 0;
		font-size: 1rem;
		line-height: 1.4;
		color: var(--text-low);

		@media (max-width: 768px) {
			font-size: 0.85rem;
		}
	}

	.welcome-features {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
		width: 100%;
		max-width: 600px;
		margin-top: 0.75rem;

		@media (max-width: 768px) {
			grid-template-columns: 1fr;
			gap: 0.5rem;
			max-width: 340px;
		}
	}

	.welcome-feature {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.5rem;
		padding: 0.75rem;
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.06);
		backdrop-filter: blur(12px);
		transition:
			transform 0.2s ease,
			background 0.2s ease,
			border-color 0.2s ease;
		animation: feature-stagger 0.5s ease-out calc(0.3s + var(--i) * 0.1s) both;

		@media (max-width: 768px) {
			flex-direction: row;
			align-items: center;
			padding: 0.6rem 0.85rem;
		}
	}

	.welcome-feature:hover {
		transform: translateY(-2px);
		background: rgba(124, 58, 237, 0.06);
		border-color: rgba(124, 58, 237, 0.15);

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

	.welcome-feature-icon {
		font-size: 1.5rem;
		line-height: 1;
		flex-shrink: 0;

		@media (max-width: 768px) {
			font-size: 1.25rem;
		}
	}

	.welcome-feature-body {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		text-align: left;

		strong {
			font-size: 0.85rem;
			font-weight: 600;
			color: var(--text);
		}

		span {
			font-size: 0.75rem;
			color: var(--text-low);
			line-height: 1.2;
		}
	}

	.welcome-actions {
		display: flex;
		gap: 0.75rem;
		margin-top: 0.5rem;
		align-items: center;
	}

	.welcome-cta-ghost {
		padding: 0.6rem 1rem;
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: transparent;
		color: var(--text-low);
		font-weight: 600;
		font-size: 0.82rem;
		cursor: pointer;
		transition:
			color 0.2s ease,
			border-color 0.2s ease,
			background 0.2s ease;
	}

	.welcome-cta-ghost:hover {
		color: var(--text);
		border-color: rgba(255, 255, 255, 0.15);
		background: rgba(255, 255, 255, 0.03);
	}

	.welcome-hint {
		color: var(--text-low);
		font-size: 0.75rem;
		opacity: 0.7;
		margin-top: 0.25rem;

		@media (max-width: 768px) {
			font-size: 0.7rem;
		}
	}
</style>
