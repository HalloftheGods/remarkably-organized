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
	<script
		data-name="BMC-Widget"
		data-cfasync="false"
		src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
		data-id="youmeos"
		data-description="Support me on Buy me a coffee!"
		data-message="Hi! If you like my work, consider buying me a coffee! I'd appreciate it!"
		data-color="#5F7FFF"
		data-position="left"
		data-x_margin="12"
		data-y_margin="12"></script>
</svelte:head>
<slot />

<style lang="scss">
	:global(body > *:not(#root)) {
		@media print {
			display: none !important;
		}
	}
</style>
