<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import ShareIcon from '~icons/fa-solid/share-alt';
	import FacebookIcon from '~icons/fa-brands/facebook-f';
	import LinkedinIcon from '~icons/fa-brands/linkedin-in';
	import TwitterIcon from '~icons/fa-brands/twitter';
	import LinkIcon from '~icons/fa-solid/link';
	import { trackEvent } from '$lib/analytics';
	import { toast } from '$state';

	let isShareMenuOpen = $state(false);
	const getShareUrl = () =>
		typeof window !== 'undefined'
			? window.location.href
			: 'https://planner.mycompassconsulting.com';
	const shareText =
		'Check out this free tool to build beautiful custom planners for your e-ink tablet!';

	const openPopup = (e: MouseEvent, href: string) => {
		const width = 800;
		const height = 600;

		// Calculate center position relative to the current browser window (supports multi-monitor)
		const left = Math.max(0, window.screenX + (window.outerWidth - width) / 2);
		const top = Math.max(0, window.screenY + (window.outerHeight - height) / 2);

		fetch('/api/stats', {
			method: 'POST',
			body: JSON.stringify({ type: 'shared' }),
			headers: { 'Content-Type': 'application/json' },
		}).catch(() => {});

		window.open(
			href,
			'share-popup',
			`width=${width},height=${height},top=${top},left=${left},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`,
		);
	};
</script>

<div class="fab-container no-print">
	{#if isShareMenuOpen}
		<div class="fab-menu" in:fly={{ y: 20, duration: 200 }} out:fade={{ duration: 150 }}>
			<!-- Facebook -->
			<a
				class="child-fab tooltip-right"
				aria-label="Share on Facebook"
				data-tooltip="Share on Facebook"
				href="https://www.facebook.com/sharer/sharer.php"
				onclick={(e) => {
					e.preventDefault();
					const dynamicHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`;
					trackEvent('share_action', { platform: 'facebook' });
					openPopup(e, dynamicHref);
				}}>
				<FacebookIcon />
			</a>
			<!-- LinkedIn -->
			<a
				class="child-fab tooltip-right"
				aria-label="Share on LinkedIn"
				data-tooltip="Share on LinkedIn"
				href="https://www.linkedin.com/shareArticle?mini=true"
				onclick={(e) => {
					e.preventDefault();
					const dynamicHref = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(getShareUrl())}&title=${encodeURIComponent('My Remarkably Organized')}&summary=${encodeURIComponent(shareText)}`;
					trackEvent('share_action', { platform: 'linkedin' });
					openPopup(e, dynamicHref);
				}}>
				<LinkedinIcon />
			</a>
			<a
				class="child-fab tooltip-right"
				aria-label="Share on X"
				data-tooltip="Share on X"
				href="https://twitter.com/intent/tweet"
				onclick={(e) => {
					e.preventDefault();
					const dynamicHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(getShareUrl())}&text=${encodeURIComponent(shareText)}`;
					trackEvent('share_action', { platform: 'twitter' });
					openPopup(e, dynamicHref);
				}}>
				<TwitterIcon />
			</a>
			<!-- Copy Link -->
			<button
				class="child-fab tooltip-right"
				aria-label="Copy Link"
				data-tooltip="Copy Link"
				onclick={() => {
					navigator.clipboard.writeText(window.location.href);
					trackEvent('share_action', { platform: 'copy_link' });
					fetch('/api/stats', {
						method: 'POST',
						body: JSON.stringify({ type: 'shared' }),
						headers: { 'Content-Type': 'application/json' },
					}).catch(() => {});
					toast.success('Link copied to clipboard!');
				}}>
				<LinkIcon style="transform: scale(1.3);" />
			</button>
		</div>
	{/if}

	<button
		class="main-fab"
		aria-label="Share"
		onclick={() => {
			isShareMenuOpen = !isShareMenuOpen;
			if (isShareMenuOpen) trackEvent('share_fab_open');
		}}>
		<ShareIcon />
	</button>
</div>

<style lang="scss">
	.fab-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		gap: 0.75rem;
		z-index: 99;
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
		transition:
			transform 0.2s ease,
			background 0.2s ease,
			color 0.2s ease;

		&:hover {
			transform: scale(1.05) translateY(-2px);
			background: #f8fafc;
			color: #0184ba;
		}

		:global(svg) {
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
		transition:
			transform 0.2s ease,
			background 0.2s ease;
		text-decoration: none;

		&:hover {
			transform: scale(1.1);
			background: #f8fafc;
			color: #01559d;
		}

		:global(svg) {
			width: 1.1em;
			height: 1.1em;
		}
	}
</style>
