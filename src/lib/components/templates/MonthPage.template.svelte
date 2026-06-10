<script lang="ts">
	import { type Month, type PlannerSettings } from '$lib';
	import { Page } from '$layouts';
	import { SideNav, TopNav } from '$organisms';
	import { LazyPage } from '$atoms';

	let {
		month = {} as Month,
		settings = {} as any /* PlannerSettings */,
		isPreparingPrint = false,
		forceVisible = false,
		currentHash = '',
	} = $props();

	const isSplit = $derived(settings.sideNav.isSplit);
</script>

<LazyPage
	id={month.id}
	{isPreparingPrint}
	{forceVisible}
	showSidebar={!settings.sideNav.disable}
	class="planner-page month-page {settings.showCutLines
		? 'border-[0.5px] border-dashed border-[var(--outline)]'
		: ''}">
	{#snippet sidebar()}
		<SideNav {settings} hideCollections={isSplit} tabs="months" timeframe={month}
		></SideNav>
		{#if isSplit}
			<SideNav
				{settings}
				hideTabs={true}
				leftSide={!settings.sideNav.leftSide}
				timeframe={month} />
		{/if}
	{/snippet}
	<TopNav {settings} timeframe={month} />
	<Page
		{settings}
		display={settings.monthPage.template}
		columns={settings.monthPage.columns}
		timeframe={month} />
</LazyPage>

{#if settings.monthPage.notePagesAmount > 0}
	{#each new Array(settings.monthPage.notePagesAmount) as _, i}
		{@const id = `${month.id}-pg${i + 2}`}
		<LazyPage
			{id}
			{isPreparingPrint}
			forceVisible={currentHash.toLowerCase() === id.toLowerCase()}
			showSidebar={!settings.sideNav.disable}
			class="planner-page month-page {settings.showCutLines
				? 'border-[0.5px] border-dashed border-[var(--outline)]'
				: ''}">
			{#snippet sidebar()}
				<SideNav
					{settings}
					hideCollections={isSplit}
					tabs="months"
					timeframe={month}
					pageSuffix="-pg{i + 2}" />
				{#if isSplit}
					<SideNav
						{settings}
						hideTabs={true}
						leftSide={!settings.sideNav.leftSide}
						timeframe={month} />
				{/if}
			{/snippet}
			<TopNav
				{settings}
				timeframe={month}
				breadcrumbs={[{ href: `#${month.id}-pg${i + 2}`, name: `Page ${i + 2}` }]} />
			<Page
				display={settings.monthPage.notePagesTemplate}
				columns={settings.monthPage.notePagesColumns}
				{settings}
				timeframe={month} />
		</LazyPage>
	{/each}
{/if}
