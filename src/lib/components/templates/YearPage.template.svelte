<script lang="ts">
	import { type PlannerSettings, type Year, getYearEmoji } from '$lib';
	import { Page } from '$layouts';
	import { SideNav, TopNav } from '$organisms';
	import { LazyPage } from '$atoms';

	let {
		year = {} as Year,
		settings = {} as PlannerSettings,
		isPreparingPrint = false,
	} = $props();
</script>

<LazyPage
	id={`${year.year}`}
	{isPreparingPrint}
	showSidebar={!settings.sideNav.disable}
	class="planner-page year-page {settings.showCutLines
		? 'border-[0.5px] border-dashed border-[var(--outline)]'
		: ''}">
	{#snippet sidebar()}
		<SideNav
			{settings}
			emoji={settings.emojis.disable ? '' : getYearEmoji(year.year)}
			tabs="months"
			timeframe={year} />
	{/snippet}
	<h1 class="pt-2 pb-2 text-[5em] font-bold flex w-full justify-center items-center gap-4 text-center">
		{settings.emojis.disable ? '' : getYearEmoji(year.year)}
		{year.year}
	</h1>
	<Page
		{settings}
		display={settings.yearPage.template}
		timeframe={year}
		padding="0 2rem" />
</LazyPage>

{#if settings.yearPage.notePagesAmount > 0}
	{#each new Array(settings.yearPage.notePagesAmount) as _, i}
		<LazyPage
			id="{year.year}-pg{i + 2}"
			{isPreparingPrint}
			showSidebar={!settings.sideNav.disable}
			class="planner-page {settings.showCutLines
				? 'border-[0.5px] border-dashed border-[var(--outline)]'
				: ''}">
			{#snippet sidebar()}
				<SideNav
					{settings}
					emoji={settings.emojis.disable ? '' : getYearEmoji(year.year)}
					tabs="months"
					timeframe={year}
					pageSuffix="-pg{i + 2}" />
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

