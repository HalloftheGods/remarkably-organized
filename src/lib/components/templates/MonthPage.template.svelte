<script lang="ts">
	import { type Month, type PlannerSettings } from '$lib';
	import { Page } from '$layouts';
	import { SideNav, TopNav } from '$organisms';
	import { LazyPage } from '$atoms';

	let {
		month = {} as Month,
		settings = {} as PlannerSettings,
		isPreparingPrint = false,
	} = $props();
</script>

<LazyPage
	id={month.id}
	{isPreparingPrint}
	showSidebar={!settings.sideNav.disable}
	class="planner-page month-page {settings.showCutLines
		? 'border-[0.5px] border-dashed border-[var(--outline)]'
		: ''}">
	{#snippet sidebar()}
		<SideNav tabs="months" {settings} timeframe={month}></SideNav>
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
		<LazyPage
			id="{month.id}-pg{i + 2}"
			{isPreparingPrint}
			showSidebar={!settings.sideNav.disable}
			class="planner-page month-page {settings.showCutLines
				? 'border-[0.5px] border-dashed border-[var(--outline)]'
				: ''}">
			{#snippet sidebar()}
				<SideNav {settings} tabs="months" timeframe={month} pageSuffix="-pg{i + 2}" />
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
