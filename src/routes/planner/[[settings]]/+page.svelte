<script lang="ts">
	import PlannerView from '$views/PlannerView.view.svelte';
	let { data } = $props();
</script>

<PlannerView settings={data.settings} />
