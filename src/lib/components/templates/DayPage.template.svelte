<script lang="ts">
	import { type Day, PlannerSettings, intersect } from '$lib';
	import { Page } from '$layouts';
	import { SideNav, TopNav } from '$organisms';

	let { day = {} as Day, settings = {} as PlannerSettings } = $props();
</script>

<article
	id={day.id}
	use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}
	class="planner-page day-page {settings.showCutLines
		? 'border-[0.5px] border-dashed border-[var(--outline)]'
		: ''}">
	<SideNav tabs={settings.dayPage.sideNavDisplay} {settings} timeframe={day}></SideNav>
	<TopNav {settings} timeframe={day} />
	<Page
		{settings}
		display={settings.dayPage.template}
		columns={settings.dayPage.columns}
		timeframe={day} />
</article>

{#if settings.dayPage.notePagesAmount > 0}
	{#each new Array(settings.dayPage.notePagesAmount) as _, i}
		<article
			id="{day.id}-pg{i + 2}"
			use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}
			class="planner-page day-page {settings.showCutLines
				? 'border-[0.5px] border-dashed border-[var(--outline)]'
				: ''}">
			<SideNav
				{settings}
				tabs={settings.dayPage.sideNavDisplay}
				timeframe={day}
				pageSuffix="-pg{i + 2}" />
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
		</article>
	{/each}
{/if}
