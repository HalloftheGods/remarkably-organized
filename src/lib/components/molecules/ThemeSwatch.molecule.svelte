<script lang="ts">
	import type { Theme } from '$lib/data/themes';

	let {
		theme,
		isNavLeft = false,
		class: className = '',
		...props
	}: {
		theme: Theme;
		isNavLeft?: boolean;
		class?: string;
		[key: string]: any;
	} = $props();

	const getCleanThemeName = (name: string) => {
		return name
			.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
			.trim();
	};
</script>

<button
	type="button"
	class="theme-swatch-card {className}"
	class:nav-left={isNavLeft}
	aria-label={`Select ${theme.name}`}
	{...props}>
	<div class="swatch-layout">
		<div class="nav-sidebar-swatch" style="background-color: {theme.config.design.colorNavBg};">
			<span
				class="vertical-label"
				style="color: {theme.config.design.colorSideNavText || theme.config.design.colorText}; font-family: '{theme.config
					.sideNav.font}', sans-serif !important;">
				{getCleanThemeName(theme.name)}
			</span>
		</div>

		<div class="swatch-main-area">
			<div class="swatch-colors">
				<div class="color-strip main-bg" style="background-color: {theme.config.design.colorBg};">
					<span class="color-label" style="color: {theme.config.design.colorText};">
						BG
					</span>
					<div class="theme-specimen-lines">
						<span
							class="theme-specimen-line specimen-cover"
							style="color: {theme.config.design.colorCoverText || theme.config.design.colorText}; font-family: '{theme
								.config.coverPage.font}', sans-serif !important;">
							Cover
						</span>
						<span
							class="theme-specimen-line specimen-title"
							style="color: {theme.config.design.colorTextDisplay || theme.config.design.colorText}; font-family: '{theme
								.config.design.fontDisplay}', sans-serif !important;">
							Titles
						</span>
						<span
							class="theme-specimen-line specimen-body"
							style="color: {theme.config.design.colorText}; font-family: '{theme
								.config.design.font}', sans-serif !important;">
							Body
						</span>
					</div>
				</div>
				<div class="color-strip" style="background-color: {theme.config.design.colorText};">
					<span class="color-label" style="color: {theme.config.design.colorBg};">
						TXT
					</span>
				</div>
				<div class="color-strip" style="background-color: {theme.config.design.colorLines};">
					<span class="color-label" style="color: {theme.config.design.colorText};">
						LINE
					</span>
				</div>
				<div class="color-strip" style="background-color: {theme.config.design.colorDots};">
					<span class="color-label" style="color: {theme.config.design.colorText};">
						DOTS
					</span>
				</div>
			</div>
		</div>
	</div>
</button>

<style lang="scss">
	.theme-swatch-card {
		display: flex;
		flex-direction: column;
		background: transparent;
		border: none;
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
		overflow: hidden;
		aspect-ratio: 8.5 / 11;

		&:hover {
			transform: translateY(-5px);
			box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
		}
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
		font-size: 1.125rem;
		font-weight: normal;
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
		height: 100%;
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
			font-size: 0.8rem;
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
		font-weight: 500;
		letter-spacing: 0.02em;
		white-space: nowrap;
		line-height: 1.1;
	}

	.specimen-cover {
		font-size: 3rem;
	}

	.specimen-title {
		font-size: 2rem;
	}

	.specimen-body {
		font-size: 1.125rem;
	}
</style>
