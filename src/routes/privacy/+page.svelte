<script lang="ts">
	import Footer from '$organisms/Footer.organism.svelte';
	import pkg from '../../../package.json';
	import { trackEvent } from '$lib/analytics';

	const fullVersion = pkg.version;
	const handleSupportTicketClick = () => {
		trackEvent('outbound_link_click', { link_id: 'support_ticket' });
	};
	const handleHallOfTheGodsClick = () => {
		trackEvent('outbound_link_click', { link_id: 'hall_of_the_gods' });
	};
	const handleMyCompassClick = () => {
		trackEvent('outbound_link_click', { link_id: 'my_compass_consulting' });
	};
</script>

<svelte:head>
	<title>Privacy Policy — My Remarkably Organized</title>
</svelte:head>

<main class="legal-page">
	<div class="glass-container">
		<h1>Privacy Policy</h1>
		<p>Last updated: June 2026</p>

		<h2>1. Introduction</h2>
		<p>
			Welcome to My Remarkably Organized. This Privacy Policy explains how we collect,
			use, and handle your information when you use our free planner generation tool.
		</p>

		<h2>2. Client-Side Processing</h2>
		<p>
			The core functionality of My Remarkably Organized runs entirely in your web browser.
			When you create a planner, configure dates, or customize layouts, all of this
			processing happens locally on your device. We do not transmit, save, or store your
			personal planner configurations or calendar events on our servers.
		</p>

		<h2>3. Google Analytics</h2>
		<p>
			We use Google Analytics to understand how visitors interact with our website. Google
			Analytics may use cookies to track your interactions. This helps us improve the user
			experience and understand which features are most popular. The information collected
			by Google Analytics is aggregated and anonymized.
		</p>

		<h2>4. Live Activity Tracking</h2>
		<p>
			To power our "Recent Activity" features, we use Cloudflare's Edge network to detect
			the approximate geographic region (City and Country) of users who print planners. We
			do not log, store, or process full IP addresses or any Personally Identifiable
			Information (PII) for this feature. The geographic data is strictly used to display
			anonymous live activity notifications (e.g., "Someone in London, GB just printed a
			planner").
		</p>

		<h2>5. Device Integration & API Access</h2>
		<p>
			To address common questions regarding third-party integrations: <strong>
				We do not connect to the reMarkable cloud, API, or any device synchronization
				services.
			</strong>
		</p>
		<p>
			Specifically, we DO NOT ask for or use One-Time Passwords (OTP) to register as a
			personal device. We DO NOT have read, write, or delete access to your tablet, files,
			or reMarkable account. We DO NOT collect any authentication data for your reMarkable
			account, nor do we require it.
		</p>
		<p>
			Our service strictly generates a PDF file locally in your web browser. You maintain
			complete control over this file and are solely responsible for transferring it to
			your e-ink tablet using official, manufacturer-provided tools.
		</p>

		<h2>6. Changes to This Policy</h2>
		<p>
			We may update our Privacy Policy from time to time. We will notify you of any
			changes by posting the new Privacy Policy on this page.
		</p>

		<a href="/" class="back-link">← Back to Home</a>
	</div>
	<Footer
		{fullVersion}
		{handleSupportTicketClick}
		{handleHallOfTheGodsClick}
		{handleMyCompassClick} />
</main>

<style lang="scss">
	.legal-page {
		min-height: 100vh;
		background-color: #00326e;
		background-image: linear-gradient(135deg, #012b67 0%, #01559d 50%, #0184ba 100%);
		display: flex;
		justify-content: center;
		padding: 4rem 1rem 6rem;
		position: relative;
		font-family: var(--font-body, system-ui, sans-serif);
	}

	.glass-container {
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 20px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
		padding: 3rem;
		max-width: 800px;
		width: 100%;
		color: white;

		h1 {
			margin-top: 0;
			font-size: 2.5rem;
			font-weight: 900;
			text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		}

		h2 {
			font-size: 1.5rem;
			margin-top: 2rem;
			margin-bottom: 0.5rem;
			color: #fcd34d;
		}

		p {
			line-height: 1.6;
			opacity: 0.9;
			margin-bottom: 1rem;
		}

		.back-link {
			display: inline-block;
			margin-top: 2rem;
			color: #fcd34d;
			text-decoration: none;
			font-weight: 600;
			transition: opacity 0.2s;

			&:hover {
				opacity: 0.8;
				text-decoration: underline;
			}
		}
	}
</style>
