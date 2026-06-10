<script lang="ts">
	import { type Day, PlannerSettings } from '$lib';
	import { Page } from '$layouts';
	import { SideNav, TopNav } from '$organisms';
	import { LazyPage } from '$atoms';

	let {
		day = {} as Day,
		settings = {} as any /* PlannerSettings */,
		isPreparingPrint = false,
		forceVisible = false,
		currentHash = '',
	} = $props();

	const isSplit = $derived(settings.sideNav.isSplit);
</script>

<LazyPage
	id={day.id}
	{isPreparingPrint}
	{forceVisible}
	showSidebar={!settings.sideNav.disable}
	class="planner-page day-page {settings.showCutLines
		? 'border-[0.5px] border-solid border-[var(--outline)]'
		: ''}">
	{#snippet sidebar()}
		<SideNav
			{settings}
			hideCollections={isSplit}
			tabs={settings.dayPage.sideNavDisplay}
			timeframe={day}></SideNav>
		{#if isSplit}
			<SideNav
				{settings}
				hideTabs={true}
				leftSide={!settings.sideNav.leftSide}
				timeframe={day} />
		{/if}
	{/snippet}
	<TopNav {settings} timeframe={day} />
	<Page
		{settings}
		display={settings.dayPage.template}
		columns={settings.dayPage.columns}
		timeframe={day} />
</LazyPage>

{#if settings.dayPage.notePagesAmount > 0}
	{#each new Array(settings.dayPage.notePagesAmount) as _, i}
		{@const id = `${day.id}-pg${i + 2}`}
		<LazyPage
			{id}
			{isPreparingPrint}
			forceVisible={currentHash.toLowerCase() === id.toLowerCase()}
			showSidebar={!settings.sideNav.disable}
			class="planner-page day-page {settings.showCutLines
				? 'border-[0.5px] border-solid border-[var(--outline)]'
				: ''}">
			{#snippet sidebar()}
				<SideNav
					{settings}
					hideCollections={isSplit}
					tabs={settings.dayPage.sideNavDisplay}
					timeframe={day}
					pageSuffix="-pg{i + 2}" />
				{#if isSplit}
					<SideNav
						{settings}
						hideTabs={true}
						leftSide={!settings.sideNav.leftSide}
						timeframe={day} />
				{/if}
			{/snippet}
			<TopNav
				{settings}
				timeframe={day}
				breadcrumbs={[{ href: `#${day.id}-pg${i + 2}`, name: `Page ${i + 2}` }]} />
			<Page
				display={settings.dayPage.notePagesTemplate}
				columns={settings.dayPage.notePagesColumns}
				{settings}
				agendaStartTime={settings.dayPage.notePagesAgendaStartTime}
				agendaEndTime={settings.dayPage.notePagesAgendaEndTime}
				agendaInterval={settings.dayPage.notePagesAgendaInterval}
				use24HourClock={settings.dayPage.notePagesUse24HourClock}
				timeframe={day} />
		</LazyPage>
	{/each}
{/if}
