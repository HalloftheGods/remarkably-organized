<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { THEMES, type Theme } from '$lib/data/themes';
	import { getGoogleFontURL } from '$lib';
	import { ThemeSwatch } from '$molecules';

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
				<div class="theme-swatch-wrapper">
					<ThemeSwatch
						{theme}
						isNavLeft={settings.sideNav.leftSide}
						class="w-full"
						onclick={() => selectTheme(theme)}
					/>
				</div>
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
		width: 95vw;
		height: 95vh;
		max-width: 1600px; /* Optional cap, but large enough for 95% to work on most screens */
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

	.theme-swatch-wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
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
