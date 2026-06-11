<script lang="ts">
	import { type Collection, type PlannerSettings, stripEmojis } from '$lib';
	import { Page } from '$layouts';
	import { CollectionIndex } from '$templates';
	import { SideNav, TopNav } from '$organisms';
	import { LazyPage } from '$atoms';

	let {
		collection = {} as Collection,
		settings = undefined as any /* PlannerSettings */,
		isPreparingPrint = false,
		activeHash = '',
		forceVisible = false,
	} = $props();
	const year = $derived(settings.years[0]);
	const emojiMatch = $derived(
		collection.name.match(/^[\p{Emoji}\p{Extended_Pictographic}]/u),
	);
	const emoji = $derived(settings.emojis.disable ? '' : emojiMatch ? emojiMatch[0] : '');
	const displayName = $derived(
		settings.emojis.disable ? stripEmojis(collection.name) : collection.name,
	);
	const isSplit = $derived(settings.sideNav.isSplit);
</script>

{#if collection}
	{@const total = collection.total}
	{@const showIndexPage = total > 0 && +(collection.numIndexPages || '') >= 1}
	{#if showIndexPage}
		{#each new Array(collection.numIndexPages) as _, indexPage (indexPage)}
			{@const id = `${indexPage === 0 ? collection.id : collection.id + `-pg${indexPage + 1}`}`}
			<LazyPage
				{id}
				{isPreparingPrint}
				forceVisible={activeHash.toLowerCase() === id.toLowerCase()}
				class="collection-page"
				showSidebar={!settings.sideNav.disable}>
				{#snippet sidebar()}
					<SideNav
						tabs={!settings.monthPage.disable ? 'months' : 'none'}
						hideCollections={isSplit}
						{settings}
						timeframe={year}
						{emoji}
						activeCollectionId={collection.id}></SideNav>
					{#if isSplit}
						<SideNav
							{settings}
							hideTabs={true}
							leftSide={!settings.sideNav.leftSide}
							timeframe={year}
							activeCollectionId={collection.id} />
					{/if}
				{/snippet}
				<TopNav
					{settings}
					timeframe={{ ...year, collection }}
					breadcrumbs={[
						{ name: displayName, href: `#${collection.id}` },
						...(indexPage > 0 ? [{ name: `Page ${indexPage + 1}`, href: `#${id}` }] : []),
					]} />
				<CollectionIndex {collection} {settings} {indexPage} isInteractive={true} />
			</LazyPage>
		{/each}
	{/if}
	{#if total}
		{#each new Array(total * Math.max(1, collection.numIndexPages || 1)) as _, item (item)}
			{#each new Array(Math.max(1, collection.numPagesPerItem || 1)) as _, itemPage (itemPage)}
				{@const id1 = collection.id}
				{@const id2 = !showIndexPage && item === 0 ? '' : `${item + 1}`}
				{@const id3 = itemPage === 0 ? '' : `pg${itemPage + 1}`}
				{@const id = [id1, id2, id3].filter(Boolean).join('-')}
				<LazyPage
					{id}
					{isPreparingPrint}
					forceVisible={activeHash.toLowerCase() === id.toLowerCase()}
					class="collection-page"
					showSidebar={!settings.sideNav.disable}>
					{#snippet sidebar()}
						<SideNav
							tabs={!settings.monthPage.disable ? 'months' : 'none'}
							hideCollections={isSplit}
							{settings}
							timeframe={year}
							{emoji}
							activeCollectionId={collection.id} />
						{#if isSplit}
							<SideNav
								{settings}
								hideTabs={true}
								leftSide={!settings.sideNav.leftSide}
								timeframe={year}
								activeCollectionId={collection.id} />
						{/if}
					{/snippet}
					<TopNav
						{settings}
						timeframe={{ ...year, collection }}
						breadcrumbs={[
							{ name: displayName, href: `#${collection.id}` },
							{
								name: `${item + 1}${itemPage === 0 ? '' : `-${itemPage + 1}`}`,
								displayName: '______________________',
								href: `#${id}`,
							},
						]} />
					<Page
						display={collection.type}
						{settings}
						timeframe={year}
						columns={collection.columns}
						lines={collection.lines} />
				</LazyPage>
			{/each}
		{/each}
	{/if}
{/if}

<style lang="scss">
	:global(.collection-page) {
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-left: calc(var(--sidenav-width) + var(--margin-left));
		padding-right: var(--margin-right);
		padding-top: calc(var(--topnav-height) + var(--margin-top));
		padding-bottom: var(--margin-bottom);

		:global(main.side-nav-right) & {
			padding-right: calc(var(--sidenav-width) + var(--margin-right));
			padding-left: var(--margin-left);
		}

		:global(main.side-nav-split) & {
			padding-left: calc(var(--sidenav-width) + var(--margin-left)) !important;
			padding-right: calc(var(--sidenav-width) + var(--margin-right)) !important;
		}
	}
</style>
