<script lang="ts">
	import { type PlannerSettings, type Year, getYearEmoji } from '$lib';
	import { Page } from '$layouts';
	import { SideNav, TopNav } from '$organisms';
	import { LazyPage } from '$atoms';

	let {
		year = {} as Year,
		settings = undefined as any /* PlannerSettings */,
		isPreparingPrint = false,
		forceVisible = false,
		currentHash = '',
	} = $props();
	const isSplit = $derived(settings.sideNav.isSplit);
</script>

<article
	id={`${year.year}`}
	class="planner-page year-page visible {forceVisible
		? 'force-visible'
		: ''} {settings.showCutLines
		? 'border-[0.5px] border-solid border-[var(--outline)]'
		: ''}">
	{#if !settings.sideNav.disable}
		<SideNav
			{settings}
			hideCollections={isSplit}
			emoji={settings.emojis.disable ? '' : getYearEmoji(year.year)}
			tabs="months"
			timeframe={year} />
		{#if isSplit}
			<SideNav
				{settings}
				hideTabs={true}
				leftSide={!settings.sideNav.leftSide}
				timeframe={year} />
		{/if}
	{/if}
	<TopNav {settings} timeframe={year} hideCollections={true} />
	<!-- <header class="flex w-full justify-center items-center py-4 shrink-0">
		<h1
			class="text-[min(12vw,6vh,5em)] font-bold flex items-center gap-4 text-center leading-none">
			{settings.emojis.disable ? '' : getYearEmoji(year.year)}
			{year.year}
		</h1>
	</header> -->
	<Page {settings} display={settings.yearPage.template} timeframe={year} padding="0" />
</article>

{#if settings.yearPage.notePagesAmount > 0}
	{#each new Array(settings.yearPage.notePagesAmount) as _, i}
		{@const id = `${year.year}-pg${i + 2}`}
		<LazyPage
			{id}
			{isPreparingPrint}
			forceVisible={currentHash.toLowerCase() === id.toLowerCase()}
			showSidebar={!settings.sideNav.disable}
			class="planner-page {settings.showCutLines
				? 'border-[0.5px] border-solid border-[var(--outline)]'
				: ''}">
			{#snippet sidebar()}
				<SideNav
					{settings}
					hideCollections={isSplit}
					emoji={settings.emojis.disable ? '' : getYearEmoji(year.year)}
					tabs="months"
					timeframe={year}
					pageSuffix="-pg{i + 2}" />
				{#if isSplit}
					<SideNav
						{settings}
						hideTabs={true}
						leftSide={!settings.sideNav.leftSide}
						timeframe={year} />
				{/if}
			{/snippet}
			<TopNav
				{settings}
				timeframe={year}
				breadcrumbs={[{ href: `#${year.year}-pg{i + 2}`, name: `Page ${i + 2}` }]} />
			<Page
				display={settings.yearPage.notePagesTemplate}
				columns={settings.yearPage.notePagesColumns}
				{settings}
				timeframe={year} />
		</LazyPage>
	{/each}
{/if}
