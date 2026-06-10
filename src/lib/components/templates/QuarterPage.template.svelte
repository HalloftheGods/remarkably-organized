<script lang="ts">
	import { type PlannerSettings, type Quarter } from '$lib';
	import { Page } from '$layouts';
	import { SideNav, TopNav } from '$organisms';
	import { LazyPage } from '$atoms';

	let {
		quarter = {} as Quarter,
		settings = {} as any /* PlannerSettings */,
		isPreparingPrint = false,
		forceVisible = false,
		currentHash = '',
	} = $props();

	const isSplit = $derived(settings.sideNav?.isSplit);
	const showSidebar = $derived(!settings.sideNav?.disable);
	const hideLeftSide = $derived(!settings.sideNav?.leftSide);
	const cutLinesClass = $derived(
		settings.showCutLines ? 'border-[0.5px] border-dashed border-[var(--outline)]' : '',
	);

	const notePagesAmount = $derived(settings.quarterPage?.notePagesAmount || 0);
	const notePages = $derived(notePagesAmount > 0 ? new Array(notePagesAmount) : []);
</script>

<LazyPage
	id={quarter.id}
	{isPreparingPrint}
	{forceVisible}
	{showSidebar}
	class="planner-page quarter-page {cutLinesClass}">
	{#snippet sidebar()}
		<SideNav {settings} hideCollections={isSplit} tabs="quarters" timeframe={quarter}
		></SideNav>
		{#if isSplit}
			<SideNav {settings} hideTabs={true} leftSide={hideLeftSide} timeframe={quarter} />
		{/if}
	{/snippet}
	<TopNav {settings} timeframe={quarter} />
	<Page {settings} display={settings.quarterPage?.template} timeframe={quarter} />
</LazyPage>

{#if notePages.length > 0}
	{#each notePages as _, i}
		{@const id = `${quarter.id}-pg${i + 2}`}
		{@const isActive = currentHash.toLowerCase() === id.toLowerCase()}
		<LazyPage
			{id}
			{isPreparingPrint}
			forceVisible={isActive}
			{showSidebar}
			class="planner-page quarter-page {cutLinesClass}">
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
						leftSide={hideLeftSide}
						timeframe={quarter} />
				{/if}
			{/snippet}
			<TopNav
				{settings}
				timeframe={quarter}
				breadcrumbs={[{ href: `#${id}`, name: `Page ${i + 2}` }]} />
			<Page
				display={settings.quarterPage?.notePagesTemplate}
				columns={settings.quarterPage?.notePagesColumns}
				{settings}
				timeframe={quarter} />
		</LazyPage>
	{/each}
{/if}
