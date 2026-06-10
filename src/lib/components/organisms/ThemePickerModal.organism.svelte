<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { THEMES, type Theme } from '$lib/data/themes';
	import { getGoogleFontURL } from '$lib';

	let {
		onClose,
		onSelect,
		settings,
		themePrints = {},
	}: {
		onClose: () => void;
		onSelect: (theme: Theme) => void;
		settings: any;
		themePrints?: Record<string, number>;
	} = $props();

	const selectTheme = (theme: Theme) => {
		onSelect(theme);
		onClose();
	};

	const allFonts = THEMES.flatMap((t) => [
		t.config.design.font,
		t.config.design.fontDisplay,
		t.config.coverPage.font,
		t.config.sideNav.font,
		t.config.topNav.font,
	]);
	const fontsUrl = getGoogleFontURL(allFonts);

	const getCleanThemeName = (name: string) => {
		return name
			.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
			.trim();
	};
</script>

<svelte:head>
	{#if fontsUrl}
		<link rel="stylesheet" href={fontsUrl} />
	{/if}
</svelte:head>

<div class="theme-modal" transition:fade={{ duration: 150 }}>
	<div class="theme-modal-content" transition:scale={{ duration: 150 }}>
		<header>
			<div>
				<h2 class="welcome-headline-gradient">Theme Gallery</h2>
				<p class="subtitle">
					Browse every theme in a paint-swatch gallery. Click any theme to apply it
					instantly.
				</p>
			</div>
			<button type="button" class="close-btn" aria-label="Close themes" onclick={onClose}>
				✕
			</button>
		</header>

		<div class="theme-gallery">
			{#each THEMES as theme}
				<button
					type="button"
					class="theme-swatch-card"
					class:nav-left={settings.sideNav.leftSide}
					onclick={() => selectTheme(theme)}
					aria-label={`Select ${theme.name}`}>
					<!-- <div class="swatch-hole"></div> -->

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
	<div class="modal-bg" role="presentation" onclick={onClose}></div>
</div>

<style lang="scss">
	.theme-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.theme-modal-content {
		position: relative;
		width: min(100%, 1100px);
		max-height: 90vh;
		background: #f8f8f8;
		border-radius: var(--radius-5);
		box-shadow: var(--shadow-6);
		padding: 2rem;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		z-index: 1001;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 2rem;

		h2 {
			margin: 0;
			font-size: 2rem;
			color: #333;
		}

		.subtitle {
			margin: 0.5rem 0 0;
			color: #666;
			font-size: 1rem;
		}
	}

	.theme-gallery {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
		overflow-y: auto;
		padding: 1rem;

		/* Custom scrollbar */
		&::-webkit-scrollbar {
			width: 8px;
		}
		&::-webkit-scrollbar-track {
			background: transparent;
		}
		&::-webkit-scrollbar-thumb {
			background: #ccc;
			border-radius: 4px;
			&:hover {
				background: #bbb;
			}
		}
	}

	.theme-swatch-card {
		display: flex;
		flex-direction: column;
		background: white;
		border: 1px solid #ddd;
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

		&:hover {
			transform: translateY(-5px);
			box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
			border-color: #aaa;
		}
	}

	.swatch-hole {
		position: absolute;
		top: 10px;
		left: 50%;
		transform: translateX(-50%);
		width: 12px;
		height: 12px;
		background: #f8f8f8;
		border-radius: 50%;
		box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
		z-index: 20;
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

	.close-btn {
		background: none;
		border: none;
		font-size: 1.5rem;
		color: #999;
		cursor: pointer;
		padding: 0.5rem;
		line-height: 1;
		transition: color 0.2s;

		&:hover {
			color: #333;
		}
	}

	.modal-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(2px);
		z-index: 1000;
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
</style>
