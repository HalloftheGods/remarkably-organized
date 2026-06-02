<script lang="ts">
	import '$lib/styles/global.scss';
	import pkg from '../../package.json';

	const appVersion = pkg.version.split('.').slice(0, 2).join('.');
</script>

<svelte:head>
	<title>Remarkably Organized v{appVersion}</title>
	<meta
		name="description"
		content="Build beautiful, functional planners for the reMarkable and other e-ink tablets. " />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://planner.mycompassconsulting.com/" />
	<meta property="og:title" content="Remarkably Organized Planner v{appVersion}" />
	<meta
		property="og:description"
		content="Build beautiful, functional planners for the reMarkable and other e-ink tablets. " />
	<meta
		property="og:image"
		content="https://planner.mycompassconsulting.com/remarkably-organized-cover-photo.jpg" />
	<meta property="og:site_name" content="Remarkably Organized v{appVersion}" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Remarkably Organized Planner v{appVersion}" />
	<meta
		name="twitter:description"
		content="Build beautiful, functional planners for the reMarkable and other e-ink tablets. " />
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
