<script lang="ts">
	import { PlannerSettings, intersect, type Week } from '$lib';
	import { Page } from '$layouts';
	import { SideNav, TopNav } from '$organisms';

	let { week = {} as Week, settings = {} as PlannerSettings } = $props();
</script>

<article
	id={week.id}
	use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}
	class="planner-page week-page {settings.showCutLines ? 'border-[0.5px] border-dashed border-[var(--outline)]' : ''}">
	<SideNav tabs={settings.weekPage.sideNavDisplay} {settings} timeframe={week}></SideNav>
	<TopNav {settings} timeframe={week} />
	<Page
		{settings}
		display={settings.weekPage.template}
		columns={settings.weekPage.columns}
		timeframe={week} />
</article>

{#if settings.weekPage.notePagesAmount > 0}
	{#each new Array(settings.weekPage.notePagesAmount) as _, i}
		<article
			id="{week.id}-pg{i + 2}"
			use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}
			class="planner-page week-page {settings.showCutLines ? 'border-[0.5px] border-dashed border-[var(--outline)]' : ''}">
			<SideNav
				{settings}
				tabs={settings.weekPage.sideNavDisplay}
				timeframe={week}
				pageSuffix="-pg{i + 2}" />
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
		</article>
	{/each}
{/if}
