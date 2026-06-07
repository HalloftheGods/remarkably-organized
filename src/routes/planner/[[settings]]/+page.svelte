<script lang="ts">
	import PlannerView from '$views/PlannerView.view.svelte';
	let { data } = $props();

	const pageTitle = $derived(
		data.preset
			? `${data.preset.name} Custom E-Ink Planner — Remarkably Organized`
			: 'Custom E-Ink Planner Builder — Remarkably Organized',
	);

	const pageDescription = $derived(
		data.preset
			? `Download a print-ready custom ${data.preset.name} planner for reMarkable and other e-ink tablets. ${data.preset.description}`
			: 'Design and export custom planners, calendars, habit trackers, and organizers for the reMarkable and other e-ink tablets.',
	);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<PlannerView settings={data.settings} />
