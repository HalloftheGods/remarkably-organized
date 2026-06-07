<script lang="ts">
	import { intersect, type PlannerSettings, type Year, getYearEmoji } from '$lib';
	import { Page } from '$layouts';
	import { SideNav, TopNav } from '$organisms';
	import { Text } from '$atoms';

	let { year = {} as Year, settings = {} as PlannerSettings } = $props();
</script>

<article
	id={`${year.year}`}
	use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}
	class="planner-page year-page {settings.showCutLines
		? 'border-[0.5px] border-dashed border-[var(--outline)]'
		: ''}">
	<SideNav
		{settings}
		emoji={settings.emojis.disable ? '' : getYearEmoji(year.year)}
		tabs="months"
		timeframe={year} />
	<Text
		tag="h1"
		class="pt-6 pb-4 text-[3.5em] font-bold flex w-full justify-center items-center gap-4 text-center">
		{settings.emojis.disable ? '' : getYearEmoji(year.year)}
		{year.year}
	</Text>
	<Page
		{settings}
		display={settings.yearPage.template}
		timeframe={year}
		padding="0 2rem" />
</article>

{#if settings.yearPage.notePagesAmount > 0}
	{#each new Array(settings.yearPage.notePagesAmount) as _, i}
		<article
			id="{year.year}-pg{i + 2}"
			use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}
			class="planner-page {settings.showCutLines
				? 'border-[0.5px] border-dashed border-[var(--outline)]'
				: ''}">
			<SideNav
				{settings}
				emoji={settings.emojis.disable ? '' : getYearEmoji(year.year)}
				tabs="months"
				timeframe={year}
				pageSuffix="-pg{i + 2}" />
			<TopNav
				{settings}
				timeframe={year}
				breadcrumbs={[{ href: `#${year.year}-pg${i + 2}`, name: `Page ${i + 2}` }]} />
			<Page
				display={settings.yearPage.notePagesTemplate}
				columns={settings.yearPage.notePagesColumns}
				{settings}
				timeframe={year} />
		</article>
	{/each}
{/if}
