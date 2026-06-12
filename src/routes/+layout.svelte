<script lang="ts">
	import '$lib/styles/app.css';
	import '$lib/styles/global.scss';
	import '$lib/styles/typeography.scss';
	import pkg from '../../package.json';
	import { afterNavigate } from '$app/navigation';
	import { trackPageView } from '$lib/analytics';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import PrintToast from '$molecules/PrintToast.molecule.svelte';
	import { pwaInfo } from 'virtual:pwa-info';

	interface Props {
		children?: any;
	}

	let { children }: Props = $props();
	const appVersion = pkg.version.split('.').slice(0, 2).join('.');
	let webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');

	let latestPrint: { city: string; country: string; timestamp: number } | null =
		$state(null);
	let showPrintToast = $state(false);
	let lastKnownPrintTimestamp = 0;

	const isPlannerPage = $derived(page.url.pathname.startsWith('/planner'));
	const toastPosition = $derived(isPlannerPage ? 'center-right' : 'bottom');

	afterNavigate(({ to }) => {
		if (to) trackPageView(to.url.pathname + to.url.search);
	});

	onMount(() => {
		const fetchLatestPrint = async () => {
			try {
				const res = await fetch('/api/stats');
				if (res.ok) {
					const data = await res.json();
					if (data.latestPrint) {
						const isRecent = Date.now() - data.latestPrint.timestamp < 15 * 60 * 1000;

						if (lastKnownPrintTimestamp === 0 && isRecent) {
							latestPrint = data.latestPrint;
							lastKnownPrintTimestamp = data.latestPrint.timestamp;
							showPrintToast = true;
							setTimeout(() => (showPrintToast = false), 8000);
						} else if (
							lastKnownPrintTimestamp !== 0 &&
							data.latestPrint.timestamp > lastKnownPrintTimestamp
						) {
							latestPrint = data.latestPrint;
							lastKnownPrintTimestamp = data.latestPrint.timestamp;
							showPrintToast = true;
							setTimeout(() => (showPrintToast = false), 8000);
						} else {
							lastKnownPrintTimestamp = data.latestPrint.timestamp;
						}
					}
				}
			} catch (e) {
				console.error('Failed to fetch print stats', e);
			}
		};

		fetchLatestPrint();
		const interval = setInterval(fetchLatestPrint, 60000);
		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	{@html webManifestLink}
	<title>My Remarkably Organized Wizard v{appVersion}</title>
	<meta
		name="description"
		content="Build beautiful, functional PDF planners for your e-ink tablet. " />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://planner.mycompassconsulting.com/" />
	<meta property="og:title" content="My Remarkably Organized Planner v{appVersion}" />
	<meta
		property="og:description"
		content="Build beautiful, functional PDF planners for your e-ink tablet. " />
	<meta
		property="og:image"
		content="https://planner.mycompassconsulting.com/remarkably-organized-cover-photo.jpg" />
	<meta property="og:site_name" content="My Remarkably Organized v{appVersion}" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="My Remarkably Organized Planner v{appVersion}" />
	<meta
		name="twitter:description"
		content="Build beautiful, functional PDF planners for your e-ink tablet. " />
	<meta
		name="twitter:image"
		content="https://planner.mycompassconsulting.com/remarkably-organized-cover-photo.jpg" />
</svelte:head>
{@render children?.()}

{#if showPrintToast && latestPrint}
	<PrintToast
		city={latestPrint.city}
		country={latestPrint.country}
		position={toastPosition} />
{/if}

<style lang="scss">
	:global(body > *:not(#root)) {
		@media print {
			display: none !important;
		}
	}
</style>
