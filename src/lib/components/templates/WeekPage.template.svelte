<script lang="ts">
	import { PlannerSettings, type Week } from '$lib';
	import { Page } from '$layouts';
	import { SideNav, TopNav } from '$organisms';
	import { LazyPage } from '$atoms';

	let {
		week = {} as Week,
		settings = undefined as any /* PlannerSettings */,
		isPreparingPrint = false,
		forceVisible = false,
		currentHash = '',
	} = $props();

	const isSplit = $derived(settings.sideNav.isSplit);
</script>

<LazyPage
	id={week.id}
	{isPreparingPrint}
	{forceVisible}
	showSidebar={!settings.sideNav.disable}
	class="planner-page week-page {settings.showCutLines
		? 'border-[0.5px] border-solid border-[var(--outline)]'
		: ''}">
	{#snippet sidebar()}
		<SideNav
			{settings}
			hideCollections={isSplit}
			tabs={settings.weekPage.sideNavDisplay}
			timeframe={week}></SideNav>
		{#if isSplit}
			<SideNav
				{settings}
				hideTabs={true}
				leftSide={!settings.sideNav.leftSide}
				timeframe={week} />
		{/if}
	{/snippet}
	<TopNav {settings} timeframe={week} />
	<Page
		{settings}
		display={settings.weekPage.template}
		columns={settings.weekPage.columns}
		timeframe={week} />
</LazyPage>

{#if settings.weekPage.notePagesAmount > 0}
	{#each new Array(settings.weekPage.notePagesAmount) as _, i}
		{@const id = `${week.id}-pg${i + 2}`}
		<LazyPage
			{id}
			{isPreparingPrint}
			forceVisible={currentHash.toLowerCase() === id.toLowerCase()}
			showSidebar={!settings.sideNav.disable}
			class="planner-page week-page {settings.showCutLines
				? 'border-[0.5px] border-solid border-[var(--outline)]'
				: ''}">
			{#snippet sidebar()}
				<SideNav
					{settings}
					hideCollections={isSplit}
					tabs={settings.weekPage.sideNavDisplay}
					timeframe={week}
					pageSuffix="-pg{i + 2}" />
				{#if isSplit}
					<SideNav
						{settings}
						hideTabs={true}
						leftSide={!settings.sideNav.leftSide}
						timeframe={week} />
				{/if}
			{/snippet}
			<TopNav
				{settings}
				timeframe={week}
				breadcrumbs={[{ href: `#${week.id}-pg${i + 2}`, name: `Page ${i + 2}` }]} />
			<Page
				display={settings.weekPage.notePagesTemplate}
				columns={settings.weekPage.notePagesColumns}
				{settings}
				agendaStartTime={settings.weekPage.notePagesAgendaStartTime}
				agendaEndTime={settings.weekPage.notePagesAgendaEndTime}
				agendaInterval={settings.weekPage.notePagesAgendaInterval}
				use24HourClock={settings.weekPage.notePagesUse24HourClock}
				timeframe={week} />
		</LazyPage>
	{/each}
{/if}
