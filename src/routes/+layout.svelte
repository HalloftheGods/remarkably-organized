<script lang="ts">
	import '$lib/styles/global.scss';
</script>

<svelte:head>
	<title>Remarkably Organized</title>
	<meta
		name="description"
		content="Create custom planners and organizers for e-ink tablets like the reMarkable. Design calendar spreads, habit trackers, and more — then export to PDF." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://planner.mycompassconsulting.com/" />
	<meta property="og:title" content="Remarkably Organized Planner" />
	<meta
		property="og:description"
		content="Create custom planners and organizers for e-ink tablets like the reMarkable. Design calendar spreads, habit trackers, and more — then export to PDF." />
	<meta
		property="og:image"
		content="https://planner.mycompassconsulting.com/remarkably-organized-cover-photo.jpg" />
	<meta property="og:site_name" content="Remarkably Organized" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Remarkably Organized Planner" />
	<meta
		name="twitter:description"
		content="Create custom planners and organizers for e-ink tablets like the reMarkable." />
	<meta
		name="twitter:image"
		content="https://planner.mycompassconsulting.com/remarkably-organized-cover-photo.jpg" />

</svelte:head>
<slot />

<style lang="scss">
	:global(body > *:not(#root)) {
		@media print {
			display: none !important;
		}
	}
</style>
