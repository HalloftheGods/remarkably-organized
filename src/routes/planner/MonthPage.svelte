<script lang="ts">
	import { intersect, type Month, type PlannerSettings } from '$lib';
	import Page from '$lib/components/page-layouts/Page.layout.svelte';
	import SideNav from './SideNav.svelte';
	import TopNav from './TopNav.svelte';

	let { month = {} as Month, settings = {} as PlannerSettings } = $props();
</script>

<article id={month.id} use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}>
	<SideNav tabs="months" {settings} timeframe={month}></SideNav>
	<TopNav {settings} timeframe={month} />
	<Page
		{settings}
		display={settings.monthPage.template}
		columns={settings.monthPage.columns}
		timeframe={month} />
</article>

{#if settings.monthPage.notePagesAmount > 0}
	{#each new Array(settings.monthPage.notePagesAmount) as _, i}
		<article
			id="{month.id}-pg{i + 2}"
			use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}>
			<SideNav {settings} tabs="months" timeframe={month} pageSuffix="-pg{i + 2}" />
			<TopNav
				{settings}
				timeframe={month}
				breadcrumbs={[{ href: `#${month.id}-pg${i + 2}`, name: `Page ${i + 2}` }]} />
			<Page
				display={settings.monthPage.notePagesTemplate}
				columns={settings.monthPage.notePagesColumns}
				{settings}
				timeframe={month} />
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
	article {
		:global(main.side-nav-right) & {
			padding-right: calc(var(--sidenav-width) + var(--margin-right));
			padding-left: var(--margin-left);
		}
	}
</style>
