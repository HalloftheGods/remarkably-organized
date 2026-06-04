<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { fly, fade } from 'svelte/transition';
	import pkg from '../../package.json';
	import { trackEvent } from '$lib/analytics';
	import { PAGE_TEMPLATES } from '$lib/data/templates';
	import { PRESETS } from '$lib/data/presets';
	import { THEMES } from '$lib/data/themes';
	import TrophyIcon from '~icons/fa/trophy';
	import MagicIcon from '~icons/fa/magic';

	const fullVersion = pkg.version;
	const majorMinorPatchVersion = pkg.version.split('.').slice(0, 3).join('.');

	// Fallbacks while fetching
	let currentStats = {
		visits: 0,
		created: 0,
		printed: 0,
	};

	let latestPrint: { city: string; country: string; timestamp: number } | null =
		$state(null);
	let showPrintToast = $state(false);
	let lastKnownPrintTimestamp = 0;
	let isShareMenuOpen = $state(false);

	const shareUrl = 'https://planner.mycompassconsulting.com';
	const shareText =
		'Check out this free tool to build beautiful custom planners for your e-ink tablet!';

	const presetsUrl = $derived.by(() => {
		const params = new URLSearchParams(page.url.searchParams);
		params.set('presets', 'true');
		return `/planner?${params.toString()}`;
	});

	function handlePrimaryCtaClick() {
		fetch('/api/stats', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ type: 'created' }),
		}).catch(console.error);
		trackEvent('splash_cta_click');
	}

	function handlePresetsClick() {
		trackEvent('splash_presets_click');
	}

	function handlePreviewClick() {
		trackEvent('splash_preview_click');
	}

	const visits = tweened(0, { duration: 2000, easing: cubicOut });
	const created = tweened(0, { duration: 2200, easing: cubicOut });
	const printed = tweened(0, { duration: 2500, easing: cubicOut });
	const shared = tweened(0, { duration: 2800, easing: cubicOut });
	const timeCreatingSeconds = tweened(0, { duration: 3000, easing: cubicOut });

	const formatTime = (totalSeconds: number) => {
		if (!totalSeconds) return '0m';
		const days = Math.floor(totalSeconds / 86400);
		const hours = Math.floor((totalSeconds % 86400) / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);

		let parts = [];
		if (days > 0) parts.push(`${days}d`);
		if (hours > 0) parts.push(`${hours}h`);
		if (minutes > 0 || parts.length === 0) parts.push(`${minutes}m`);

		return parts.join(' ');
	};

	onMount(() => {
		// 1. Increment visits in the background
		fetch('/api/stats', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ type: 'visits' }),
		}).catch(console.error);

		// 2. Function to fetch the latest stats and update the tweened stores
		const fetchStats = async () => {
			try {
				const res = await fetch('/api/stats');
				if (res.ok) {
					const data = await res.json();
					visits.set(data.visits);
					created.set(data.created);
					printed.set(data.printed);
					shared.set(data.shared || 0);
					timeCreatingSeconds.set(data.timeCreating || 0);

					if (data.latestPrint) {
						const isRecent = Date.now() - data.latestPrint.timestamp < 15 * 60 * 1000; // Within 15 minutes

						if (lastKnownPrintTimestamp === 0 && isRecent) {
							// Show on initial load if recent
							latestPrint = data.latestPrint;
							lastKnownPrintTimestamp = data.latestPrint.timestamp;
							showPrintToast = true;
							setTimeout(() => (showPrintToast = false), 8000);
						} else if (
							lastKnownPrintTimestamp !== 0 &&
							data.latestPrint.timestamp > lastKnownPrintTimestamp
						) {
							// Show live update during polling
							latestPrint = data.latestPrint;
							lastKnownPrintTimestamp = data.latestPrint.timestamp;
							showPrintToast = true;
							setTimeout(() => (showPrintToast = false), 8000);
						} else {
							// Just record it
							lastKnownPrintTimestamp = data.latestPrint.timestamp;
						}
					}
				}
			} catch (e) {
				console.error('Failed to fetch stats', e);
			}
		};

		// Initial fetch
		fetchStats();

		// Poll every 60 seconds (giving the 30s edge cache time to expire so we always get fresh data)
		const interval = setInterval(fetchStats, 60000);

		return () => clearInterval(interval);
	});

	// Helper to format numbers with commas
	const formatNumber = (num: number) => Math.floor(num).toLocaleString();
</script>

<svelte:head>
	<title>
		Remarkably Organized v{fullVersion} — Custom Planner Builder for reMarkable & E-Ink Tablets
	</title>
	<meta
		name="description"
		content="Design and export beautiful custom planners, calendars, habit trackers, and organizers for the reMarkable series and other e-ink tablets. Print-ready PDF output." />
</svelte:head>

<main>
	<section class="hero-section">
		<h1>
			<small><i>Remarkably Organized</i></small>
			<span class="title">PLANNER</span>
			<div class="version-banner">
				<svg
					class="ribbon-wave"
					viewBox="0 0 60 30"
					preserveAspectRatio="none"
					xmlns="http://www.w3.org/2000/svg">
					<defs>
						<linearGradient id="gold-grad-left" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stop-color="#FCD34D" stop-opacity="0" />
							<stop offset="50%" stop-color="#F59E0B" stop-opacity="0.9" />
							<stop offset="100%" stop-color="#FBBF24" stop-opacity="1" />
						</linearGradient>
					</defs>
					<path
						d="M 0 15 Q 15 -5 30 15 T 60 15"
						fill="none"
						stroke="url(#gold-grad-left)"
						stroke-width="2.5" />
					<path
						d="M 0 20 Q 15 0 30 20 T 60 20"
						fill="none"
						stroke="url(#gold-grad-left)"
						stroke-width="1.5"
						opacity="0.8" />
				</svg>

				<span class="v26-text">v{majorMinorPatchVersion}</span>

				<svg
					class="ribbon-wave"
					viewBox="0 0 60 30"
					preserveAspectRatio="none"
					xmlns="http://www.w3.org/2000/svg">
					<defs>
						<linearGradient id="gold-grad-right" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stop-color="#FBBF24" stop-opacity="1" />
							<stop offset="50%" stop-color="#D97706" stop-opacity="0.9" />
							<stop offset="100%" stop-color="#FDE68A" stop-opacity="0" />
						</linearGradient>
					</defs>
					<path
						d="M 0 15 Q 15 35 30 15 T 60 15"
						fill="none"
						stroke="url(#gold-grad-right)"
						stroke-width="2.5" />
					<path
						d="M 0 10 Q 15 30 30 10 T 60 10"
						fill="none"
						stroke="url(#gold-grad-right)"
						stroke-width="1.5"
						opacity="0.8" />
				</svg>
			</div>
		</h1>
		<p>
			Build beautiful, functional planners for the reMarkable and other e-ink tablets.
		</p>
		<a
			href="/planner{page.url.search}"
			class="primary-cta"
			onclick={handlePrimaryCtaClick}>
			Create Your FREE Planner
		</a>

		<a href={presetsUrl} class="presets-cta" onclick={handlePresetsClick}>
			<MagicIcon />
			... or Choose a Preset
		</a>

		<div class="stats-container">
			<div class="stat-item">
				<span class="stat-number">{formatNumber($visits)}</span>
				<span class="stat-label">Visitors</span>
			</div>
			<div class="stat-divider"></div>
			<div class="stat-item">
				<span class="stat-number">{formatNumber($created)}</span>
				<span class="stat-label">Planners</span>
			</div>

			<div class="stat-divider"></div>
			<div class="stat-item">
				<span class="stat-number">{formatNumber($printed)}</span>
				<span class="stat-label">Prints</span>
			</div>
			<div class="stat-divider"></div>
			<div class="stat-item">
				<span class="stat-number">{formatNumber($shared)}</span>
				<span class="stat-label">Shares</span>
			</div>
			<div class="stat-divider"></div>
			<div class="stat-item">
				<span class="stat-number">{formatTime($timeCreatingSeconds)}</span>
				<span class="stat-label">Total Time Creating</span>
			</div>
		</div>
	</section>
	<section class="preview-section">
		<a
			href="/planner{page.url.search}"
			class="image-wrapper"
			onclick={handlePreviewClick}>
			<div class="free-badge">
				<TrophyIcon />
				100% FREE
			</div>
			<div class="templates-badge">
				<MagicIcon />
				Now with {PRESETS.length} Presets, {PAGE_TEMPLATES.length} Templates, and {THEMES.length}
				Themes!
			</div>
			<img
				src="/remarkably-organized-year-view.jpg?url"
				alt="Remarkably Organized Planner - Year View" />
		</a>
	</section>

	{#if showPrintToast && latestPrint}
		<div
			class="print-toast"
			in:fly={{ y: 20, duration: 400 }}
			out:fade={{ duration: 300 }}>
			<div class="toast-icon">📍</div>
			<div class="toast-content">
				<strong>Someone in {latestPrint.city}, {latestPrint.country}</strong>
				<span>just printed a planner!</span>
			</div>
		</div>
	{/if}

	<footer class="app-footer">
		<div class="footer-content">
			<a
				href="https://www.youmeos.com/spark/midnight-nerd/900/700"
				target="_blank"
				rel="noopener noreferrer"
				onclick={() => trackEvent('outbound_link_click', { link_id: 'support_ticket' })}>
				Open support Ticket
			</a>
			<span class="divider">|</span>
			<a href="/privacy">Privacy Policy</a>
			<span class="divider">|</span>
			<a href="/terms">Terms of Service</a>
			<span class="divider">|</span>
			<span class="copyright">
				v{fullVersion} &copy; {new Date().getFullYear()} Remarkably Organized. Maintained by
				XP @
				<a
					href="https://mycompassconsulting.com"
					target="_blank"
					rel="noopener noreferrer"
					style="color: inherit; text-decoration: underline; text-decoration-color: rgba(255,255,255,0.3); text-underline-offset: 2px;"
					onclick={() =>
						trackEvent('outbound_link_click', { link_id: 'my_compass_consulting' })}>
					My Compass Consulting
				</a>
				.
				<span class="original-core">Original core by Brian Schwabauer.</span>
			</span>
		</div>
	</footer>
</main>

<style lang="scss">
	main {
		position: relative;
		min-height: 100vh;
		background-color: #00326e;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 2rem 1rem 10rem 1rem;
		gap: 2rem;
		background-image: linear-gradient(135deg, #012b67 0%, #01559d 50%, #0184ba 100%);

		@include desktop {
			flex-direction: row;
			gap: 4rem;
			padding: 0 2rem 6rem;
		}
	}

	.hero-section,
	.preview-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		max-width: 600px;

		@include desktop {
			flex: 1;
		}
	}

	.preview-section {
		@include desktop {
			max-width: 800px;
		}
	}

	.image-wrapper {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: transform 0.3s ease-in-out;

		/* Adding a subtle float animation on hover for dynamic feel */
		&:hover {
			transform: scale(1.02) translateY(-5px);

			.free-badge {
				transform: rotate(-12deg) scale(1.1);
				box-shadow:
					0 15px 35px rgba(245, 158, 11, 0.6),
					inset 0 2px 4px rgba(255, 255, 255, 0.8);
			}

			.templates-badge {
				transform: translateX(-50%) rotate(5deg) scale(1.1);
				box-shadow:
					0 15px 35px rgba(56, 189, 248, 0.6),
					inset 0 2px 4px rgba(255, 255, 255, 0.8);
			}
		}
	}

	.free-badge,
	.templates-badge {
		position: absolute;
		color: #5d2b00;
		font-weight: 900;
		font-size: 1rem;
		padding: 0.5rem 1.25rem;
		border-radius: 999px;
		z-index: 10;
		border: 2px solid #fff;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		letter-spacing: 0.5px;
		transition:
			transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
			box-shadow 0.4s ease;
		pointer-events: none;

		@include tablet {
			font-size: 1.25rem;
			padding: 0.75rem 2rem;
		}
	}

	.free-badge {
		top: -10px;
		left: -10px;
		background: linear-gradient(135deg, #fcd34d, #f59e0b);
		box-shadow:
			0 10px 25px rgba(245, 158, 11, 0.4),
			inset 0 2px 4px rgba(255, 255, 255, 0.6);
		transform: rotate(-8deg);

		@include tablet {
			top: -15px;
			left: -20px;
		}
	}

	.templates-badge {
		bottom: -12px;
		left: 50%;
		white-space: nowrap;
		background: linear-gradient(135deg, #7dd3fc, #0284c7);
		color: #fff;
		font-size: 0.75rem;
		padding: 0.4rem 1rem;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
		box-shadow:
			0 10px 25px rgba(56, 189, 248, 0.4),
			inset 0 2px 4px rgba(255, 255, 255, 0.4);
		transform: translateX(-50%);

		@include tablet {
			bottom: -18px;
			font-size: 1rem;
			padding: 0.6rem 1.75rem;
		}
	}

	img {
		max-width: 100%;
		max-height: 80vh;
		border-radius: 20px;
		object-fit: contain;
		box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.4);
		transition: box-shadow 0.3s ease;

		.image-wrapper:hover & {
			box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.5);
		}
	}

	h1 {
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		line-height: 1.1;
		margin: 0;
		width: 100%;

		small {
			font-size: 1.75rem;
			color: #ffffff;
			font-weight: 300;
			margin-bottom: -0.25rem;
			letter-spacing: 0.02em;
			i {
				font-style: italic;
			}
			@include tablet {
				font-size: 3rem;
				margin-bottom: -1rem;
			}
		}

		.title {
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

	.version-banner {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: 100%;
		margin-top: 1rem;

		.ribbon-wave {
			width: 60px;
			height: 30px;
			@include tablet {
				width: 80px;
				height: 40px;
			}
		}

		.v26-text {
			font-family: Georgia, 'Times New Roman', Times, serif;
			font-size: 2.25rem;
			font-weight: bold;
			color: white;
			text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
			@include tablet {
				font-size: 2.75rem;
				padding: 0 0.5rem;
			}
		}
	}

	.primary-cta {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ffffff;
		color: black;
		text-decoration: none;
		border-radius: 999px;
		padding: 1.25rem 3rem;
		font-size: 1.25rem;
		font-weight: 600;
		box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
		transition:
			transform 0.2s ease-in-out,
			background-color 0.2s ease;
		&:hover {
			background-color: #f1f5f9;
			transform: scale(1.05);
		}
		margin: 2.5rem 0 0;
		@include tablet {
			margin: 3.5rem 0 0;
			font-size: 1.5rem;
		}
	}

	.presets-cta {
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
		margin: 1rem 0 0;

		&:hover {
			transform: scale(1.05);
			box-shadow: 0 6px 20px rgba(236, 72, 153, 0.4);
		}

		&:active {
			transform: scale(0.98);
			box-shadow: 0 2px 10px rgba(236, 72, 153, 0.3);
		}

		@include tablet {
			margin: 1.5rem 0 0;
			font-size: 1.5rem;
		}
	}

	p {
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

	.stats-container {
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

	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: white;

		.stat-number {
			font-family:
				'Inter',
				system-ui,
				-apple-system,
				sans-serif;
			font-size: 1.5rem;
			font-weight: 900;
			text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
			background: linear-gradient(135deg, #ffffff, #cbd5e1);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
			white-space: nowrap;

			@include tablet {
				font-size: 2.25rem;
			}
		}

		.stat-label {
			font-size: 0.7rem;
			text-transform: uppercase;
			letter-spacing: 1px;
			opacity: 0.8;
			margin-top: 0.25rem;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;

			@include tablet {
				font-size: 0.85rem;
			}
		}
	}

	.stat-divider {
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

	.print-toast {
		position: fixed;
		bottom: 6rem;
		left: 50%;
		transform: translateX(-50%);
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 12px;
		padding: 1rem 1.25rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		color: white;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
		z-index: 100;
		max-width: calc(100vw - 2rem);
		width: max-content;

		.toast-icon {
			font-size: 1.5rem;
			animation: pulse-sparkle 2s infinite ease-in-out;
		}

		.toast-content {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;

			strong {
				font-size: 0.9rem;
				font-weight: 700;
				line-height: 1.2;
			}

			span {
				font-size: 0.8rem;
				opacity: 0.8;
			}
		}

		@include tablet {
			left: auto;
			right: 3rem;
			bottom: 3rem;
			transform: none;
			padding: 1.25rem 1.5rem;
			max-width: 350px;

			.toast-content strong {
				font-size: 1rem;
			}
			.toast-content span {
				font-size: 0.9rem;
			}
		}
	}

	@keyframes pulse-sparkle {
		0%,
		100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.1);
			opacity: 0.8;
		}
	}

	.app-footer {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 1.25rem 1rem;
		background: transparent;
		color: rgba(255, 255, 255, 0.6);
		font-family:
			'Inter',
			system-ui,
			-apple-system,
			sans-serif;

		.footer-content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 0.5rem;
			font-size: 0.8rem;
			text-align: center;

			@include tablet {
				flex-direction: row;
				flex-wrap: wrap;
				gap: 0.75rem;
				font-size: 0.85rem;
			}

			a {
				color: rgba(255, 255, 255, 0.8);
				text-decoration: none;
				font-weight: 500;
				transition: color 0.2s;
				white-space: nowrap;

				&:hover {
					color: #fcd34d;
				}
			}

			.divider {
				opacity: 0.3;
				display: none;
				@include tablet {
					display: inline;
				}
			}

			.copyright {
				white-space: normal;
				text-align: center;
				line-height: 1.5;
				max-width: 90vw;

				@include tablet {
					white-space: nowrap;
					width: auto;
				}

				.original-core {
					opacity: 0.6;
					font-size: 0.75rem;
				}
			}
		}
	}

	@keyframes gradient-shift {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
