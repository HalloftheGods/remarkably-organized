<script lang="ts">
	import { intersect, type PlannerSettings, type Quarter } from '$lib';
	import Page from '$lib/components/Page.svelte';
	import SideNav from './SideNav.svelte';
	import TopNav from './TopNav.svelte';

	let { quarter = {} as Quarter, settings = {} as PlannerSettings } = $props();
</script>

<article id={quarter.id} use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}>
	<SideNav {settings} tabs="quarters" timeframe={quarter}></SideNav>
	<TopNav {settings} timeframe={quarter} />
	<Page {settings} display={settings.quarterPage.template} timeframe={quarter} />
</article>

{#if settings.quarterPage.notePagesAmount > 0}
	{#each new Array(settings.quarterPage.notePagesAmount) as _, i}
		<article
			id="{quarter.id}-pg{i + 2}"
			use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}>
			<SideNav {settings} tabs="months" timeframe={quarter} pageSuffix="-pg{i + 2}" />
			<TopNav
				{settings}
				timeframe={quarter}
				breadcrumbs={[{ href: `#${quarter.id}-pg${i + 2}`, name: `Page ${i + 2}` }]} />
			<Page
				display={settings.quarterPage.notePagesTemplate}
				columns={settings.quarterPage.notePagesColumns}
				{settings}
				timeframe={quarter} />
		</article>
	{/each}
{/if}

<style lang="scss">
	article {
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-left: calc(var(--sidenav-width) + var(--margin-left));
		padding-right: var(--margin-right);
		padding-top: calc(var(--topnav-height) + var(--margin-top));
		padding-bottom: var(--margin-bottom);
	}
	:global(main.side-nav-right) article {
		padding-right: calc(var(--sidenav-width) + var(--margin-right));
		padding-left: var(--margin-left);
	}
</style>
