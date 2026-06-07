<script lang="ts">
	import { type PlannerSettings, type Quarter } from '$lib';
	import { Page } from '$layouts';
	import { SideNav, TopNav } from '$organisms';
	import { LazyPage } from '$atoms';

	let {
		quarter = {} as Quarter,
		settings = {} as PlannerSettings,
		isPreparingPrint = false,
	} = $props();
</script>

<LazyPage
	id={quarter.id}
	{isPreparingPrint}
	showSidebar={!settings.sideNav.disable}
	class="planner-page quarter-page {settings.showCutLines
		? 'border-[0.5px] border-dashed border-[var(--outline)]'
		: ''}">
	{#snippet sidebar()}
		<SideNav {settings} tabs="quarters" timeframe={quarter}></SideNav>
	{/snippet}
	<TopNav {settings} timeframe={quarter} />
	<Page {settings} display={settings.quarterPage.template} timeframe={quarter} />
</LazyPage>

{#if settings.quarterPage.notePagesAmount > 0}
	{#each new Array(settings.quarterPage.notePagesAmount) as _, i}
		<LazyPage
			id="{quarter.id}-pg{i + 2}"
			{isPreparingPrint}
			showSidebar={!settings.sideNav.disable}
			class="planner-page quarter-page {settings.showCutLines
				? 'border-[0.5px] border-dashed border-[var(--outline)]'
				: ''}">
			{#snippet sidebar()}
				<SideNav {settings} tabs="months" timeframe={quarter} pageSuffix="-pg{i + 2}" />
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
