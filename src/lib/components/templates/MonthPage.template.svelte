<script lang="ts">
	import { intersect, type Month, type PlannerSettings } from '$lib';
	import { Page } from '$layouts';
	import { SideNav, TopNav } from '$organisms';

	let { month = {} as Month, settings = {} as PlannerSettings } = $props();
</script>

<article
	id={month.id}
	use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}
	class="planner-page month-page {settings.showCutLines ? 'border-[0.5px] border-dashed border-[var(--outline)]' : ''}">
	<SideNav tabs="months" {settings} timeframe={month}></SideNav>
	<TopNav {settings} timeframe={month} />
	<Page
		{settings}
		display={settings.monthPage.template}
		columns={settings.monthPage.columns}
		timeframe={month} />
</article>

{#if settings.monthPage.notePagesAmount > 0}
	{#each new Array(settings.monthPage.notePagesAmount) as _, i}
		<article
			id="{month.id}-pg{i + 2}"
			use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}
			class="planner-page month-page {settings.showCutLines ? 'border-[0.5px] border-dashed border-[var(--outline)]' : ''}">
			<SideNav {settings} tabs="months" timeframe={month} pageSuffix="-pg{i + 2}" />
			<TopNav
				{settings}
				timeframe={month}
				breadcrumbs={[{ href: `#${month.id}-pg${i + 2}`, name: `Page ${i + 2}` }]} />
			<Page
				display={settings.monthPage.notePagesTemplate}
				columns={settings.monthPage.notePagesColumns}
				{settings}
				timeframe={month} />
		</article>
	{/each}
{/if}
