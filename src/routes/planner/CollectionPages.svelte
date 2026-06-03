<script lang="ts">
	import { type Collection, type PlannerSettings, intersect } from '$lib';
	import Page from '$lib/components/Page.svelte';
	import SideNav from './SideNav.svelte';
	import TopNav from './TopNav.svelte';

	let { collection = {} as Collection, settings = {} as PlannerSettings } = $props();
	const year = $derived(settings.years[0]);
	const emojiMatch = $derived(
		collection.name.match(/^[\p{Emoji}\p{Extended_Pictographic}]/u),
	);
	const emoji = $derived(emojiMatch ? emojiMatch[0] : '');
</script>

{#if collection}
	{@const total = collection.total}
	{@const cols =
		total <= 20 ? 1 : total <= 60 ? 2 : total <= 108 ? 3 : total <= 144 ? 4 : 5}
	{@const rows = Math.ceil(total / cols)}
	{@const showIndexPage = total > 0 && +(collection.numIndexPages || '') >= 1}
	{#if showIndexPage}
		{#each new Array(collection.numIndexPages) as _, indexPage (indexPage)}
			<article
				id={`${indexPage === 0 ? collection.id : collection.id + `-pg${indexPage + 1}`}`}
				use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}>
				<SideNav
					tabs={!settings.monthPage.disable ? 'months' : 'none'}
					{settings}
					timeframe={year}
					{emoji}
					activeCollectionId={collection.id}
					disableActiveIndicator></SideNav>
				<TopNav
					{settings}
					breadcrumbs={[{ name: collection.name, href: `#${collection.id}` }]} />
					<div class="collection-index" style:--rows={rows + 1} style:--cols={cols}>
						<div
							style="grid-row: {rows + 1}; grid-column: 1 / span {Math.max(1, cols - 1)};">
						</div>
						{#each new Array(total) as _, i (i)}
							<a
								href="#{collection.id}-{i + 1 + indexPage * total}"
								class="collection-item">
								<span class="number">{i + 1 + indexPage * total}.</span>
							</a>
						{/each}
					</div>
			</article>
		{/each}
	{/if}
	{#if total}
		{#each new Array(total * Math.max(1, collection.numIndexPages || 1)) as _, item (item)}
			{#each new Array(Math.max(1, collection.numPagesPerItem || 1)) as _, itemPage (itemPage)}
				{@const id1 = collection.id}
				{@const id2 = !showIndexPage ? '' : `${item + 1}`}
				{@const id3 = itemPage === 0 ? '' : `pg${itemPage + 1}`}
				{@const id = [id1, id2, id3].filter(Boolean).join('-')}
				<article {id} use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}>
					<SideNav
						tabs={!settings.monthPage.disable ? 'months' : 'none'}
						{settings}
						timeframe={year}
						{emoji}
						activeCollectionId={collection.id}
						disableActiveIndicator />
					<TopNav
						{settings}
						breadcrumbs={[
							{ name: collection.name, href: `#${collection.id}` },
							...(showIndexPage
								? [
										{
											name: `${item + 1}${itemPage === 0 ? '' : `-${itemPage + 1}`}`,
											href: `#${collection.id}-${item + 1}`,
										},
									]
								: []),
						]} />
					<Page
						display={collection.type}
						{settings}
						timeframe={year}
						columns={collection.columns}
						lines={collection.lines} />
				</article>
			{/each}
		{/each}
	{/if}
{/if}

<style lang="scss">
	article {
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-left: calc(var(--sidenav-width) + var(--margin-left));
		padding-right: var(--margin-right);
		padding-top: calc(var(--topnav-height) + var(--margin-top));
		padding-bottom: var(--margin-bottom);
	}
	:global(main.side-nav-right) article {
		padding-right: calc(var(--sidenav-width) + var(--margin-right));
		padding-left: var(--margin-left);
	}
	.collection-index {
		display: grid;
		grid-auto-flow: column;
		grid-template-rows: repeat(var(--rows), minmax(1.5rem, 1fr));
		grid-template-columns: repeat(var(--cols), 1fr);
		grid-gap: 0 1rem;
		flex: 1;
		width: 100%;
		height: 100%;
		padding: 0rem 2rem 1rem;
		font-weight: var(--font-weight-light);
		.collection-item {
			color: var(--text);
			border-bottom: solid 1px var(--outline);
			display: flex;
			align-items: end;
			padding: 0 0.25rem 0.1rem;
			line-height: 1;
			.number {
				font-size: 0.8em;
			}
		}
	}
</style>
