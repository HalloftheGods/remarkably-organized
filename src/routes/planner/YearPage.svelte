<script lang="ts">
	import { intersect, type PlannerSettings, type Year, getYearEmoji } from '$lib';
	import Page from '$lib/components/Page.svelte';
	import SideNav from './SideNav.svelte';
	import TopNav from './TopNav.svelte';

	let { year = {} as Year, settings = {} as PlannerSettings } = $props();
</script>

<article id={`${year.year}`} use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}>
	<SideNav
		{settings}
		emoji={settings.emojis.disable ? '' : getYearEmoji(year.year)}
		tabs="months"
		timeframe={year} />
	<h1>{settings.emojis.disable ? '' : getYearEmoji(year.year)} {year.year}</h1>
	<Page {settings} display="calendar-year" timeframe={year} padding="0 2rem" />
</article>

{#if settings.yearPage.notePagesAmount > 0}
	{#each new Array(settings.yearPage.notePagesAmount) as _, i}
		<article
			id="{year.year}-pg{i + 2}"
			use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}>
			<SideNav
				{settings}
				emoji={settings.emojis.disable ? '' : getYearEmoji(year.year)}
				tabs="months"
				timeframe={year} />
			<TopNav
				{settings}
				timeframe={year}
				breadcrumbs={[{ href: `#${year.year}-pg${i + 2}`, name: `Page ${i + 2}` }]} />
			<Page
				display={settings.yearPage.notePagesTemplate}
				columns={settings.yearPage.notePagesColumns}
				{settings}
				timeframe={year} />
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

	h1 {
		padding: 1.5rem 0 1rem;
		font-size: 3.5em;
	}
</style>
