<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { fly, fade } from 'svelte/transition';
	import pkg from '../../package.json';

	const appVersion = pkg.version.split('.').slice(0, 2).join('.');

	// Fallbacks while fetching
	let currentStats = {
		visits: 0,
		created: 0,
		printed: 0
	};

	let latestPrint: { city: string; country: string; timestamp: number } | null = $state(null);
	let showPrintToast = $state(false);
	let lastKnownPrintTimestamp = 0;
	let isShareMenuOpen = $state(false);

	const shareUrl = "https://planner.mycompassconsulting.com";
	const shareText = "Check out this free tool to build beautiful custom planners for your e-ink tablet!";

	const visits = tweened(0, { duration: 2000, easing: cubicOut });
	const created = tweened(0, { duration: 2200, easing: cubicOut });
	const printed = tweened(0, { duration: 2500, easing: cubicOut });

	onMount(() => {
		// 1. Increment visits in the background
		fetch('/api/stats', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ type: 'visits' })
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

					if (data.latestPrint) {
						const isRecent = Date.now() - data.latestPrint.timestamp < 15 * 60 * 1000; // Within 15 minutes
						
						if (lastKnownPrintTimestamp === 0 && isRecent) {
							// Show on initial load if recent
							latestPrint = data.latestPrint;
							lastKnownPrintTimestamp = data.latestPrint.timestamp;
							showPrintToast = true;
							setTimeout(() => showPrintToast = false, 8000);
						} else if (lastKnownPrintTimestamp !== 0 && data.latestPrint.timestamp > lastKnownPrintTimestamp) {
							// Show live update during polling
							latestPrint = data.latestPrint;
							lastKnownPrintTimestamp = data.latestPrint.timestamp;
							showPrintToast = true;
							setTimeout(() => showPrintToast = false, 8000);
						} else {
							// Just record it
							lastKnownPrintTimestamp = data.latestPrint.timestamp;
						}
					}
				}
			} catch (e) {
				console.error("Failed to fetch stats", e);
			}
		};

		// Initial fetch
		fetchStats();

		// Poll every 30 seconds to keep numbers live while respecting free tier limits
		const interval = setInterval(fetchStats, 30000);

		return () => clearInterval(interval);
	});
	
	// Helper to format numbers with commas
	const formatNumber = (num: number) => Math.floor(num).toLocaleString();
</script>

<svelte:head>
	<title>
		Remarkably Organized v{appVersion} — Custom Planner Builder for reMarkable & E-Ink Tablets
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

				<span class="v26-text">v{appVersion}</span>

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
		<a href="/planner{page.url.search}" class="primary-cta" onclick={() => {
			fetch('/api/stats', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ type: 'created' })
			}).catch(console.error);
		}}>Create Your FREE Planner</a>
		
		<div class="stats-container">
			<div class="stat-item">
				<span class="stat-number">{formatNumber($visits)}</span>
				<span class="stat-label">Visits</span>
			</div>
			<div class="stat-divider"></div>
			<div class="stat-item">
				<span class="stat-number">{formatNumber($created)}</span>
				<span class="stat-label">Planners Created</span>
			</div>
			<div class="stat-divider"></div>
			<div class="stat-item">
				<span class="stat-number">{formatNumber($printed)}</span>
				<span class="stat-label">Planners Printed</span>
			</div>
		</div>
	</section>
	<section class="preview-section">
		<a href="/planner{page.url.search}" class="image-wrapper">
			<div class="free-badge">
				<svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
					<path
						d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
				</svg>
				100% FREE
			</div>
			<img
				src="/remarkably-organized-year-view.jpg?url"
				alt="Remarkably Organized Planner - Year View" />
		</a>
	</section>
	
	{#if showPrintToast && latestPrint}
		<div class="print-toast" in:fly={{ y: 20, duration: 400 }} out:fade={{ duration: 300 }}>
			<div class="toast-icon">✨</div>
			<div class="toast-content">
				<strong>Someone in {latestPrint.city}, {latestPrint.country}</strong>
				<span>just printed a planner!</span>
			</div>
		</div>
	{/if}

	<footer class="app-footer">
		<div class="footer-content">
			<a href="/privacy">Privacy Policy</a>
			<span class="divider">|</span>
			<a href="/terms">Terms of Service</a>
			<span class="divider">|</span>
			<span class="copyright">
				&copy; {new Date().getFullYear()} Remarkably Organized. Built by Xopher "XP" Pollard & <a href="https://mycompassconsulting.com" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline; text-decoration-color: rgba(255,255,255,0.3); text-underline-offset: 2px;">My Compass Consulting</a>. <span class="original-core">Original core by Brian Schwabauer.</span>
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
		padding: 2rem 1rem 8rem 1rem; // Extra bottom padding for footer
		gap: 2rem;
		background-image: linear-gradient(135deg, #012b67 0%, #01559d 50%, #0184ba 100%);

		@include desktop {
			flex-direction: row;
			gap: 4rem;
			padding: 0 2rem;
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
		}
	}

	.free-badge {
		position: absolute;
		top: -10px;
		left: -10px;
		background: linear-gradient(135deg, #fcd34d, #f59e0b);
		color: #5d2b00;
		font-weight: 900;
		font-size: 1rem;
		padding: 0.5rem 1.25rem;
		border-radius: 999px;
		box-shadow:
			0 10px 25px rgba(245, 158, 11, 0.4),
			inset 0 2px 4px rgba(255, 255, 255, 0.6);
		transform: rotate(-8deg);
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
			top: -15px;
			left: -20px;
			font-size: 1.25rem;
			padding: 0.75rem 2rem;
		}

		.star-icon {
			width: 18px;
			height: 18px;
			@include tablet {
				width: 22px;
				height: 22px;
			}
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
		}
	}

	.stats-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		margin-top: 2rem;
		padding: 1.25rem 2rem;
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 20px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
		transition: transform 0.3s ease, background 0.3s ease;
		
		&:hover {
			transform: translateY(-2px);
			background: rgba(255, 255, 255, 0.12);
		}
		
		@include tablet {
			gap: 2.5rem;
			padding: 1.5rem 3rem;
			margin-top: 3rem;
		}
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: white;
		
		.stat-number {
			font-family: 'Inter', system-ui, -apple-system, sans-serif;
			font-size: 1.5rem;
			font-weight: 900;
			text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
			background: linear-gradient(135deg, #ffffff, #cbd5e1);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
			
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
		width: 1px;
		height: 40px;
		background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.4), rgba(255,255,255,0));
		
		@include tablet {
			height: 50px;
		}
	}

	.print-toast {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
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
		max-width: 300px;
		
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
			bottom: 3rem;
			right: 3rem;
			padding: 1.25rem 1.5rem;
			max-width: 350px;
			
			.toast-content strong { font-size: 1rem; }
			.toast-content span { font-size: 0.9rem; }
		}
	}

	@keyframes pulse-sparkle {
		0%, 100% { transform: scale(1); opacity: 1; }
		50% { transform: scale(1.1); opacity: 0.8; }
	}

	.app-footer {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 1.5rem 1rem;
		background: transparent;
		color: rgba(255, 255, 255, 0.6);
		font-family: 'Inter', system-ui, -apple-system, sans-serif;
		
		.footer-content {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			gap: 0.75rem;
			font-size: 0.85rem;
			
			a {
				color: rgba(255, 255, 255, 0.8);
				text-decoration: none;
				font-weight: 500;
				transition: color 0.2s;
				white-space: nowrap;
				
				&:hover {
					color: #FCD34D;
				}
			}
			
			.divider {
				opacity: 0.3;
			}
			
			.copyright {
				white-space: nowrap;
				
				@media (max-width: 768px) {
					white-space: normal;
					text-align: center;
					width: 100%;
					margin-top: 0.5rem;
				}
				
				.original-core {
					opacity: 0.6;
					font-size: 0.75rem;
				}
			}
		}
	}

</style>
