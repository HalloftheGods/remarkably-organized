<script lang="ts">
	import { type PlannerSettings, type Quarter } from '$lib';
	import { Page } from '$layouts';
	import { SideNav, TopNav } from '$organisms';
	import { LazyPage } from '$atoms';

	let {
		quarter = {} as Quarter,
		settings = {} as PlannerSettings,
		isPreparingPrint = false,
		forceVisible = false,
		currentHash = '',
	} = $props();

	const isSplit = $derived(settings.sideNav.isSplit);
</script>

<LazyPage
	id={quarter.id}
	{isPreparingPrint}
	{forceVisible}
	showSidebar={!settings.sideNav.disable}
	class="planner-page quarter-page {settings.showCutLines
		? 'border-[0.5px] border-dashed border-[var(--outline)]'
		: ''}">
	{#snippet sidebar()}
		<SideNav {settings} hideCollections={isSplit} tabs="quarters" timeframe={quarter}
		></SideNav>
		{#if isSplit}
			<SideNav
				{settings}
				hideTabs={true}
				leftSide={!settings.sideNav.leftSide}
				timeframe={quarter} />
		{/if}
	{/snippet}
	<TopNav {settings} timeframe={quarter} />
	<Page {settings} display={settings.quarterPage.template} timeframe={quarter} />
</LazyPage>

{#if settings.quarterPage.notePagesAmount > 0}
	{#each new Array(settings.quarterPage.notePagesAmount) as _, i}
		{@const id = `${quarter.id}-pg${i + 2}`}
		<LazyPage
			{id}
			{isPreparingPrint}
			forceVisible={currentHash.toLowerCase() === id.toLowerCase()}
			showSidebar={!settings.sideNav.disable}
			class="planner-page quarter-page {settings.showCutLines
				? 'border-[0.5px] border-dashed border-[var(--outline)]'
				: ''}">
			{#snippet sidebar()}
				<SideNav
					{settings}
					hideCollections={isSplit}
					tabs="months"
					timeframe={quarter}
					pageSuffix="-pg{i + 2}" />
				{#if isSplit}
					<SideNav
						{settings}
						hideTabs={true}
						leftSide={!settings.sideNav.leftSide}
						timeframe={quarter} />
				{/if}
			{/snippet}
			<TopNav
				{settings}
				timeframe={quarter}
				breadcrumbs={[{ href: `#${quarter.id}-pg{i + 2}`, name: `Page ${i + 2}` }]} />
			<Page
				display={settings.quarterPage.notePagesTemplate}
				columns={settings.quarterPage.notePagesColumns}
				{settings}
				timeframe={quarter} />
		</LazyPage>
	{/each}
{/if}
