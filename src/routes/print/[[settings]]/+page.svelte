<script lang="ts">
	import { onMount } from 'svelte';
	import PlannerView from '$views/PlannerView.view.svelte';
	let { data } = $props();

	onMount(() => {
		if (data.preset) {
			fetch('/api/stats', {
				method: 'POST',
				body: JSON.stringify({ type: 'preset_loaded', presetId: data.preset.id }),
			}).catch(console.error);
		}
	});

	const pageTitle = $derived(
		data.preset
			? `Print ${data.preset.name} Custom E-Ink Planner — My Remarkably Organized`
			: 'Print Custom E-Ink Planner — My Remarkably Organized',
	);

	const pageDescription = $derived(
		data.preset
			? `Print-ready custom ${data.preset.name} planner for reMarkable and other e-ink tablets.`
			: 'Print-ready custom planners, calendars, habit trackers, and organizers for the reMarkable and other e-ink tablets.',
	);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<div class="print-preview-container">
	<PlannerView settings={data.settings} preset={data.preset} isPrintPreview={true} />
</div>

<style>
	@media screen {
		:global(body) {
			background-color: #e0e0e0;
		}
		.print-preview-container {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			justify-content: center;
			padding: 2rem;
		}

		.print-preview-container :global(main > article) {
			zoom: 0.15;
			margin: 0 !important;
			box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15) !important;
			border-radius: 8px;
			flex-shrink: 0;
		}
	}

	@media print {
		.print-preview-container {
			display: block;
			padding: 0;
		}
		.print-preview-container :global(main > article) {
			zoom: 1;
			page-break-after: always;
			box-shadow: none !important;
			border-radius: 0;
		}
	}
</style>
