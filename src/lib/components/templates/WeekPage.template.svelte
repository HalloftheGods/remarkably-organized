<script lang="ts">
	import { PlannerSettings, type Week } from '$lib';
	import { Page } from '$layouts';
	import { SideNav, TopNav } from '$organisms';
	import { LazyPage } from '$atoms';

	let {
		week = {} as Week,
		settings = {} as PlannerSettings,
		isPreparingPrint = false,
	} = $props();
</script>

<LazyPage
	id={week.id}
	{isPreparingPrint}
	showSidebar={!settings.sideNav.disable}
	class="planner-page week-page {settings.showCutLines
		? 'border-[0.5px] border-dashed border-[var(--outline)]'
		: ''}">
	{#snippet sidebar()}
		<SideNav tabs={settings.weekPage.sideNavDisplay} {settings} timeframe={week}></SideNav>
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
		<LazyPage
			id="{week.id}-pg{i + 2}"
			{isPreparingPrint}
			showSidebar={!settings.sideNav.disable}
			class="planner-page week-page {settings.showCutLines
				? 'border-[0.5px] border-dashed border-[var(--outline)]'
				: ''}">
			{#snippet sidebar()}
				<SideNav
					{settings}
					tabs={settings.weekPage.sideNavDisplay}
					timeframe={week}
					pageSuffix="-pg{i + 2}" />
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
