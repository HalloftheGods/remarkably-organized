<script lang="ts">
	import { Page } from '$layouts';
	import { toast, type PlannerSettings, type PageTemplate } from '$state';
	import { browser } from '$app/environment';
	import * as htmlToImage from 'html-to-image';
	import { CloudDownloadIcon as DownloadIcon } from '$atoms';
	import LoadingIcon from '~icons/eos-icons/bubble-loading';
	import { getGoogleFontURL } from '$lib';

	let {
		templateValue = '',
		templateName = '',
		settings = {} as PlannerSettings,
		timeframe = {},
		disabled = false,
		isActive = false,
		isInteractive = true,
		scaleOnHover = false,
		hoverScale = 1.65,
		onclick = undefined as ((e: MouseEvent | KeyboardEvent) => void) | undefined,
		children,
		pageContent,
	} = $props<{
		templateValue: string;
		templateName: string;
		settings: PlannerSettings;
		timeframe: any;
		disabled?: boolean;
		isActive?: boolean;
		isInteractive?: boolean;
		scaleOnHover?: boolean;
		hoverScale?: number;
		onclick?: (e: MouseEvent | KeyboardEvent) => void;
		children?: import('svelte').Snippet;
		pageContent?: import('svelte').Snippet;
	}>();

	let pageContainer = $state<HTMLElement | null>(null);
	let isExporting = $state(false);

	const fontsUrl = $derived(
		getGoogleFontURL([
			settings.design.font,
			settings.design.fontDisplay,
			settings.coverPage.font,
			settings.topNav.font,
			settings.sideNav.font,
		]),
	);

	const shouldBeInteractive = $derived(isInteractive && !disabled);
	const shouldScaleOnHover = $derived(scaleOnHover && !disabled);
	const thumbnailRole = $derived(isInteractive ? 'button' : 'figure');
	const thumbnailTabIndex = $derived(shouldBeInteractive ? 0 : undefined);

	const handleThumbnailClick = (e: MouseEvent | KeyboardEvent) => {
		const isClickable = shouldBeInteractive && !!onclick;
		if (isClickable) {
			onclick!(e);
		}
	};

	const handleThumbnailKeyDown = (e: KeyboardEvent) => {
		const isActivationKey = e.key === 'Enter' || e.key === ' ';
		const isTriggerable = shouldBeInteractive && !!onclick && isActivationKey;
		if (isTriggerable) {
			e.preventDefault();
			e.stopPropagation();
			onclick!(e);
		}
	};

	async function downloadImage(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();

		const isReady = browser && !isExporting && pageContainer;
		if (!isReady) return;
		isExporting = true;

		try {
			const renderWidth = 702;
			const renderHeight = Math.round(
				702 * (1 / (settings?.design?.aspectRatio || 0.75)),
			);

			const offscreen = document.createElement('div');
			offscreen.style.cssText =
				'position:absolute;top:-9999px;left:-9999px;pointer-events:none;z-index:-9999;';

			const clone = pageContainer!.cloneNode(true) as HTMLElement;
			clone.style.setProperty('width', `${renderWidth}px`, 'important');
			clone.style.setProperty('height', `${renderHeight}px`, 'important');
			clone.style.setProperty('transform', 'none', 'important');
			clone.style.setProperty('overflow', 'hidden', 'important');

			const existingButton = clone.querySelector('.download-fab');
			if (existingButton) {
				existingButton.remove();
			}

			offscreen.appendChild(clone);
			// Append to parentNode so it inherits all CSS variables (fonts, theme) from .planner-container
			pageContainer!.parentNode?.appendChild(offscreen);

			// Give the browser a moment to apply inherited styles to the clone
			await new Promise((r) => setTimeout(r, 200));

			const dataUrl = await htmlToImage.toPng(clone, {
				quality: 1.0,
				pixelRatio: 2,
				backgroundColor: settings?.design?.colorBg || '#ffffff',
				width: renderWidth,
				height: renderHeight,
			});

			offscreen.remove();

			const link = document.createElement('a');
			link.download = `remarkably-organized-template-${templateValue || 'template'}.png`;
			link.href = dataUrl;
			link.click();
			toast.success(`Template "${templateName || templateValue}" exported!`);
		} catch (error) {
			console.error(error);
			toast.error('Failed to export template image.');
		} finally {
			isExporting = false;
		}
	}
</script>

<svelte:head>
	{#if fontsUrl}
		<link rel="stylesheet" href={fontsUrl} />
	{/if}
</svelte:head>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_interactive_supports_focus -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	class="template-thumbnail"
	class:is-active={isActive}
	class:is-disabled={disabled}
	class:is-interactive={shouldBeInteractive}
	class:scale-on-hover={shouldScaleOnHover}
	style:--hover-scale={hoverScale}
	style:--thumbnail-aspect-ratio={settings.design.aspectRatio || 0.75}
	role={thumbnailRole}
	tabindex={thumbnailTabIndex}
	onclick={handleThumbnailClick}
	onkeydown={handleThumbnailKeyDown}>
	<div
		bind:this={pageContainer}
		class="page-render-wrapper"
		style:--bg-pdf={settings.design.colorBg || '#ffffff'}
		style:--nav-bg-pdf={settings.design.colorNavBg || '#f2f2f2'}
		style:--text={settings.design.colorText}
		style:--outline={settings.design.colorLines}
		style:--dots-color={settings.design.colorDots}
		style:--font="'{settings.design.font}', sans-serif"
		style:--font-body="'{settings.design.font}', sans-serif"
		style:--font-display="'{settings.design.fontDisplay}', sans-serif"
		style:--font-cover="'{settings.coverPage.font}', sans-serif"
		style:--font-topnav="'{settings.topNav.font}', sans-serif"
		style:--font-sidenav="'{settings.sideNav.font}', sans-serif"
		style:font-family="var(--font-body)"
		style:font-size="1rem">
		{#if pageContent}
			{@render pageContent()}
		{:else}
			<Page
				display={templateValue as PageTemplate}
				{settings}
				{timeframe}
				aspectRatio={1 / (settings.design.aspectRatio || 0.75)} />
		{/if}
		{#if browser && templateValue}
			<button
				class="download-fab no-print"
				class:is-exporting={isExporting}
				aria-label="Download template image"
				onclick={downloadImage}
				disabled={isExporting}>
				{#if isExporting}
					<LoadingIcon />
				{:else}
					<DownloadIcon />
				{/if}
			</button>
		{/if}
	</div>
	<div class="thumbnail-footer">
		<span class="template-name">{templateName || 'Select Template'}</span>
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>

<style lang="scss">
	.template-thumbnail {
		border: 1px solid var(--outline);
		border-radius: var(--radius-3);
		overflow: hidden;
		isolation: isolate;
		transform: translateZ(0);
		transition: all 0.2s ease;
		background-color: var(--bg-high);
		width: 100%;
		display: flex;
		flex-direction: column;
		z-index: 1;

		&.is-interactive {
			cursor: pointer;

			&:hover {
				border-color: var(--action);
				box-shadow: var(--shadow-3);
				transform: translateY(-2px) translateZ(0);
				z-index: 2;
			}
		}

		&.scale-on-hover {
			&:hover {
				transform: scale(var(--hover-scale)) translateZ(0);
				box-shadow: var(--shadow-5);
				z-index: 100;
				transition:
					transform 0.5s var(--ease-out-back),
					z-index 0s;
			}
		}

		&.is-active {
			border-color: var(--action);
			box-shadow:
				0 0 0 2px var(--action),
				var(--shadow-2);
			position: relative;
		}

		&.is-disabled {
			opacity: 0.5;
			cursor: not-allowed;

			&:hover {
				border-color: var(--outline);
				box-shadow: none;
				transform: none;
			}
		}

		.page-render-wrapper {
			width: 100%;
			aspect-ratio: var(--thumbnail-aspect-ratio, 3 / 4);
			overflow: hidden;
			isolation: isolate;
			position: relative;
			background-color: var(--bg-pdf, #fff);
			-webkit-print-color-adjust: exact;
			print-color-adjust: exact;
			container-type: inline-size;

			> :global(.page) {
				transform-origin: top left;
				width: 702px;
				height: calc(702px / var(--thumbnail-aspect-ratio, 0.75));
				transform: scale(calc(100cqw / 702px));
				pointer-events: none;
				position: absolute;
				top: 0;
				left: 0;
			}

			:global(article.planner-page:not(:has(nav))) {
				--topnav-height: 0px !important;
			}

			:global(article) {
				margin: 0;
			}

			.download-fab {
				position: absolute;
				bottom: 0.75rem;
				right: 0.75rem;
				width: 1.8rem;
				height: 1.8rem;
				background: transparent;
				border: none;
				color: var(--text-muted);
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
				opacity: 0;
				transform: scale(0.8);
				z-index: 10;
				pointer-events: auto;
				padding: 0;

				:global(svg) {
					width: 100%;
					height: 100%;
					filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
					transition: inherit;
				}

				&:hover {
					color: var(--action);
					transform: scale(1.1);
				}

				&:disabled {
					opacity: 0.8;
					cursor: wait;
				}
			}
		}

		&:hover {
			.download-fab {
				opacity: 1;
				transform: scale(1);
			}
		}

		.thumbnail-footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0.6rem 0.75rem;
			border-top: 1px solid var(--outline);
			background-color: var(--bg);
			min-height: 2.5rem;

			.template-name {
				font-size: 0.78rem;
				font-weight: 600;
				line-height: 1.2;
				color: var(--text);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
</style>
