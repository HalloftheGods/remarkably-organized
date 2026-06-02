<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import ShareIcon from '~icons/fa-solid/share-alt';
	import FacebookIcon from '~icons/fa-brands/facebook-f';
	import LinkedinIcon from '~icons/fa-brands/linkedin-in';
	import XTwitterIcon from '~icons/fa-brands/twitter';
	import LinkIcon from '~icons/fa-solid/link';
	import { trackEvent } from '$lib/analytics';

	let isShareMenuOpen = $state(false);
	const shareUrl = "https://planner.mycompassconsulting.com";
	const shareText = "Check out this free tool to build beautiful custom planners for your e-ink tablet!";

	const openPopup = (e: MouseEvent) => {
		e.preventDefault();
		const href = (e.currentTarget as HTMLAnchorElement).href;
		const width = 800;
		const height = 600;
		
		// Calculate center position relative to the current browser window (supports multi-monitor)
		const left = Math.max(0, window.screenX + (window.outerWidth - width) / 2);
		const top = Math.max(0, window.screenY + (window.outerHeight - height) / 2);
		
		window.open(href, 'share-popup', `width=${width},height=${height},top=${top},left=${left},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`);
	};
</script>

<div class="fab-container no-print">
	{#if isShareMenuOpen}
		<div class="fab-menu" in:fly={{ y: 20, duration: 200 }} out:fade={{ duration: 150 }}>
			<!-- Facebook -->
			<a class="child-fab tooltip-target" aria-label="Share on Facebook" data-tooltip="Share on Facebook" href="https://www.facebook.com/sharer/sharer.php?u={encodeURIComponent(shareUrl)}" onclick={(e) => { trackEvent('share_action', { platform: 'facebook' }); openPopup(e); }}>
				<FacebookIcon />
			</a>
			<!-- LinkedIn -->
			<a class="child-fab tooltip-target" aria-label="Share on LinkedIn" data-tooltip="Share on LinkedIn" href="https://www.linkedin.com/shareArticle?mini=true&url={encodeURIComponent(shareUrl)}&title={encodeURIComponent('Remarkably Organized')}&summary={encodeURIComponent(shareText)}" onclick={(e) => { trackEvent('share_action', { platform: 'linkedin' }); openPopup(e); }}>
				<LinkedinIcon />
			</a>
			<!-- X / Twitter -->
			<a class="child-fab tooltip-target" aria-label="Share on X" data-tooltip="Share on X" href="https://twitter.com/intent/tweet?url={encodeURIComponent(shareUrl)}&text={encodeURIComponent(shareText)}" onclick={(e) => { trackEvent('share_action', { platform: 'twitter' }); openPopup(e); }}>
				<XTwitterIcon />
			</a>
			<!-- Copy Link -->
			<button class="child-fab tooltip-target" aria-label="Copy Link" data-tooltip="Copy Link" onclick={() => { navigator.clipboard.writeText(window.location.href); trackEvent('share_action', { platform: 'copy_link' }); alert('Copied!'); }}>
				<LinkIcon style="transform: scale(1.3);" />
			</button>
		</div>
	{/if}
	
	<button class="main-fab" aria-label="Share" onclick={() => {
		isShareMenuOpen = !isShareMenuOpen;
		if (isShareMenuOpen) trackEvent('share_fab_open');
	}}>
		<ShareIcon />
	</button>
</div>

<style lang="scss">


	@media print {
		.no-print {
			display: none !important;
		}
	}

	.fab-container {
		position: fixed;
		bottom: 1rem; /* Align with typical buymeacoffee widget */
		left: 5rem; /* Offset to sit next to the widget */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		gap: 0.75rem;
		z-index: 99;

		@include tablet {
			left: 6rem;
			bottom: 1rem;
		}
	}

	.fab-menu {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: center;
		padding-bottom: 0.25rem;
	}

	.main-fab {
		width: 3.5rem; /* Matches standard app FAB size */
		height: 3.5rem;
		border-radius: 100%;
		background: #ffffff;
		border: none;
		color: #01559d;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
		transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;

		&:hover {
			transform: scale(1.05) translateY(-2px);
			background: #f8fafc;
			color: #0184ba;
		}

		svg {
			width: 1.35em;
			height: 1.35em;
		}
	}

	.child-fab {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 100%;
		background: white;
		color: #012b67;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
		border: none;
		transition: transform 0.2s ease, background 0.2s ease;
		text-decoration: none;

		&:hover {
			transform: scale(1.1);
			background: #f8fafc;
			color: #01559d;
		}

		svg {
			width: 1.1em;
			height: 1.1em;
		}
	}

	/* CSS Tooltips */
	.tooltip-target {
		position: relative;
		
		&::after {
			content: attr(data-tooltip);
			position: absolute;
			left: calc(100% + 12px);
			top: 50%;
			transform: translateY(-50%) scale(0.9);
			background: rgba(0, 0, 0, 0.8);
			color: white;
			padding: 6px 12px;
			border-radius: 6px;
			font-size: 0.8rem;
			font-family: 'Inter', system-ui, sans-serif;
			font-weight: 500;
			white-space: nowrap;
			pointer-events: none;
			opacity: 0;
			visibility: hidden;
			transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		}

		&:hover::after {
			opacity: 1;
			visibility: visible;
			transform: translateY(-50%) scale(1);
		}
	}
</style>
