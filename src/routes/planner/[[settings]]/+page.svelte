<script lang="ts">
	import { onMount } from 'svelte';
	import PlannerView from '$views/PlannerView.view.svelte';
	let { data } = $props();

	onMount(() => {
		if (data.preset) {
			fetch('/api/stats', {
				method: 'POST',
				body: JSON.stringify({ type: 'preset_loaded', presetId: data.preset.id })
			}).catch(console.error);
		}
	});

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

<PlannerView settings={data.settings} preset={data.preset} />
