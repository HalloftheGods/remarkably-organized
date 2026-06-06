<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import pkg from '../../package.json';
	import { trackEvent } from '$lib/analytics';
	import { PAGE_TEMPLATES } from '$lib/data/templates';
	import { PRESETS } from '$lib/data/presets';
	import { THEMES } from '$lib/data/themes';
	import TrophyIcon from '~icons/fa/trophy';
	import MagicIcon from '~icons/fa/magic';
	import HatWizardIcon from '~icons/fa-solid/hat-wizard';

	import LandingLayout from '$lib/components/templates/LandingLayout.template.svelte';
	import HeroSection from '$lib/components/organisms/HeroSection.organism.svelte';
	import PreviewSection from '$lib/components/organisms/PreviewSection.organism.svelte';
	import Footer from '$lib/components/organisms/Footer.organism.svelte';
	import PrintToast from '$lib/components/molecules/PrintToast.molecule.svelte';

	const fullVersion = pkg.version;
	const majorMinorPatchVersion = pkg.version.split('.').slice(0, 3).join('.');

	let latestPrint: { city: string; country: string; timestamp: number } | null =
		$state(null);
	let showPrintToast = $state(false);
	let lastKnownPrintTimestamp = 0;

	const visits = tweened(0, { duration: 2000, easing: cubicOut });
	const created = tweened(0, { duration: 2200, easing: cubicOut });
	const printed = tweened(0, { duration: 2500, easing: cubicOut });
	const shared = tweened(0, { duration: 2800, easing: cubicOut });
	const timeCreatingSeconds = tweened(0, { duration: 3000, easing: cubicOut });

	function handlePrimaryCtaClick() {
		trackEvent('splash_cta_click');
	}

	function handlePreviewClick() {
		trackEvent('splash_preview_click');
	}

	function handleSupportTicketClick() {
		trackEvent('outbound_link_click', { link_id: 'support_ticket' });
	}

	function handleMyCompassClick() {
		trackEvent('outbound_link_click', { link_id: 'my_compass_consulting' });
	}

	function handleHallOfTheGodsClick() {
		trackEvent('outbound_link_click', { link_id: 'hall_of_the_gods' });
	}

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

	const formatNumber = (num: number) => Math.floor(num).toLocaleString();

	onMount(() => {
		const hasVisited = sessionStorage.getItem('ro_visited');
		const isNewSession = !hasVisited;
		if (isNewSession) {
			sessionStorage.setItem('ro_visited', 'true');
			fetch('/api/stats', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ type: 'visits' }),
			}).catch(console.error);
		}

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
				console.error('Failed to fetch stats', e);
			}
		};

		fetchStats();

		const interval = setInterval(fetchStats, 60000);

		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>
		Remarkably Organized v{fullVersion} — Custom Planner Builder for reMarkable & E-Ink Tablets
	</title>
	<meta
		name="description"
		content="Design and export beautiful custom planners, calendars, habit trackers, and organizers for the reMarkable series and other e-ink tablets. Print-ready PDF output." />
</svelte:head>

{#snippet heroSnippet()}
	<HeroSection
		{majorMinorPatchVersion}
		visits={$visits}
		created={$created}
		printed={$printed}
		shared={$shared || 0}
		timeCreatingSeconds={$timeCreatingSeconds}
		{formatNumber}
		{formatTime}
		shareUrl={page.url.search}
		{handlePrimaryCtaClick}
		hatWizardIcon={HatWizardIcon} />
{/snippet}

{#snippet previewSnippet()}
	<PreviewSection
		shareUrl={page.url.search}
		presetsLength={PRESETS.length}
		templatesLength={PAGE_TEMPLATES.length}
		themesLength={THEMES.length}
		{handlePreviewClick}
		trophyIcon={TrophyIcon}
		magicIcon={MagicIcon} />
{/snippet}

{#snippet toastSnippet()}
	{#if showPrintToast && latestPrint}
		<PrintToast city={latestPrint.city} country={latestPrint.country} />
	{/if}
{/snippet}

{#snippet footerSnippet()}
	<Footer
		{fullVersion}
		{handleSupportTicketClick}
		{handleHallOfTheGodsClick}
		{handleMyCompassClick} />
{/snippet}

<LandingLayout
	hero={heroSnippet}
	preview={previewSnippet}
	toast={toastSnippet}
	footer={footerSnippet} />
