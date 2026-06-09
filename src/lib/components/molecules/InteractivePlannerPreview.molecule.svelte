<script lang="ts">
	import { type PlannerSettings } from '$state';
	import { browser } from '$app/environment';
	import YearPage from '$templates/YearPage.template.svelte';
	import QuarterPage from '$templates/QuarterPage.template.svelte';
	import MonthPage from '$templates/MonthPage.template.svelte';
	import WeekPage from '$templates/WeekPage.template.svelte';
	import DayPage from '$templates/DayPage.template.svelte';
	import TemplateThumbnail from './TemplateThumbnail.molecule.svelte';
	import { PAGE_TEMPLATES } from '$lib/data/templates';
	import { Page } from '$layouts';
	import { CollectionIndex } from '$templates';
	import { SideNav, TopNav } from '$organisms';
	import { LazyPage } from '$atoms';
	import { stripEmojis, ensureLightness } from '$lib';

	let { settings = {} as PlannerSettings } = $props<{
		settings: PlannerSettings;
	}>();

	const textCover = $derived(
		settings.coverPage.darkBackground
			? ensureLightness(settings.design.colorCoverText || settings.design.colorText, 0.6)
			: settings.design.colorCoverText || settings.design.colorText,
	);

	let currentHash = $state<string>('');

	// Parse hash to determine what page to show
	// Default to first year if no hash
	$effect(() => {
		if (!currentHash && settings.years.length > 0 && !settings.yearPage.disable) {
			currentHash = settings.years[0].id || `${settings.years[0].year}`;
		} else if (
			!currentHash &&
			settings.months.length > 0 &&
			!settings.monthPage.disable
		) {
			currentHash = settings.months[0].id;
		} else if (!currentHash && settings.weeks.length > 0 && !settings.weekPage.disable) {
			currentHash = settings.weeks[0].id;
		} else if (!currentHash && settings.days.length > 0 && !settings.dayPage.disable) {
			currentHash = settings.days[0].id;
		}
	});

	function handleLinkClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		const link = target.closest('a');
		if (link && link.hash) {
			e.preventDefault();
			currentHash = link.hash.substring(1);
		}
	}

	const matchedCollection = $derived.by(() => {
		if (!currentHash || !settings.collections) return null;
		return settings.collections.find(
			(c: any) =>
				currentHash.toLowerCase() === c.id.toLowerCase() ||
				currentHash.toLowerCase().startsWith(c.id.toLowerCase() + '-'),
		);
	});

	const baseHash = $derived(currentHash.replace(/-pg\d+$/, ''));

	const activeTemplateValue = $derived.by(() => {
		if (!currentHash) return '';
		const isYear = settings.years.some(
			(y: any) => y.id === baseHash || y.year.toString() === baseHash,
		);
		if (isYear) return currentHash.includes('-pg') ? settings.yearPage.notePagesTemplate : settings.yearPage.template;

		const isQuarter = settings.quarters.some(
			(q: any) => q.id.toLowerCase() === baseHash.toLowerCase(),
		);
		if (isQuarter) return currentHash.includes('-pg') ? settings.quarterPage.notePagesTemplate : settings.quarterPage.template;

		const isMonth = settings.months.some((m: any) => m.id === baseHash);
		if (isMonth) return currentHash.includes('-pg') ? settings.monthPage.notePagesTemplate : settings.monthPage.template;

		const isWeek = settings.weeks.some(
			(w: any) =>
				w.id.toLowerCase() === baseHash.toLowerCase() ||
				`${w.year}-w${w.weekSinceYear}`.toLowerCase() === baseHash.toLowerCase(),
		);
		if (isWeek) return currentHash.includes('-pg') ? settings.weekPage.notePagesTemplate : settings.weekPage.template;

		const isDay = settings.days.some((d: any) => d.id === baseHash);
		if (isDay) return currentHash.includes('-pg') ? settings.dayPage.notePagesTemplate : settings.dayPage.template;

		if (matchedCollection) {
			const isIndex = currentHash === matchedCollection.id || currentHash.startsWith(`${matchedCollection.id}-pg`);
			const showIndexPage =
				matchedCollection.total > 0 && +(matchedCollection.numIndexPages || 0) >= 1;
			if (isIndex && showIndexPage) {
				return 'collection-index';
			}
			return matchedCollection.type;
		}

		return '';
	});

	const currentTemplateName = $derived.by(() => {
		const templateVal = activeTemplateValue;
		if (!templateVal) return '';
		if (templateVal === 'collection-index') return 'Collection Index';
		const matched = PAGE_TEMPLATES.find((t) => t.value === templateVal);
		return matched ? matched.name : '';
	});

	const previewTitle = $derived(
		currentTemplateName ? `Planner Preview • ${currentTemplateName}` : 'Planner Preview',
	);

	const collectionPageInfo = $derived.by(() => {
		if (!matchedCollection || !currentHash) return null;
		const id = matchedCollection.id.toLowerCase();
		const hash = currentHash.toLowerCase();
		if (hash === id) return { type: 'index', page: 1 };
		if (hash.startsWith(`${id}-pg`)) {
			const page = parseInt(hash.replace(`${id}-pg`, ''));
			return { type: 'index', page };
		}
		if (hash.startsWith(`${id}-`)) {
			const part = hash.replace(`${id}-`, '');
			const match = part.match(/^(\d+)(?:-pg(\d+))?$/);
			if (match) {
				return {
					type: 'item',
					item: parseInt(match[1]),
					page: match[2] ? parseInt(match[2]) : 1,
				};
			}
		}
		return null;
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="interactive-preview-container" onclick={handleLinkClick}>
	<TemplateThumbnail
		templateName={previewTitle}
		templateValue=""
		{settings}
		timeframe={{}}
		isInteractive={false}
		scaleOnHover={true}
		hoverScale={1.5}
		disabled={false}>
		{#snippet pageContent()}
			<div
				class="mini-planner-root group {settings.sideNav.leftSide
					? ''
					: 'side-nav-right'} {settings.sideNav.isSplit ? 'side-nav-split' : ''}"
				style:--page-aspect-ratio={settings.design.aspectRatio}
				style:--doc-width="{702}px"
				style:--doc-height="{702 * (1 / (settings.design.aspectRatio || 1))}px"
				style:--sidenav-width="{settings.sideNav.disable ? 0 : settings.sideNav.width}px"
				style:--topnav-height="{settings.topNav.disable ? 0 : settings.topNav.height}px"
				style:--margin-top="{settings.design.margin?.top || 0}in"
				style:--margin-right="{settings.design.margin?.right || 0}in"
				style:--margin-bottom="{settings.design.margin?.bottom || 0}in"
				style:--margin-left="{settings.design.margin?.left || 0}in"
				style:--bg-pdf={settings.design.colorBg}
				style:--text={settings.design.colorText}
				style:--text-display={settings.design.colorTextDisplay ||
					settings.design.colorText}
				style:--text-sidebar={settings.design.colorSideNavText ||
					settings.design.colorText}
				style:--text-topbar={settings.design.colorTopNavText || settings.design.colorText}
				style:--text-cover={textCover}>
				{#if currentHash}
					{#if settings.years.some((y: any) => y.id === baseHash || y.year.toString() === baseHash)}
						{#if !settings.yearPage.disable}
							<YearPage
								{settings}
								{currentHash}
								forceVisible={currentHash.toLowerCase() === baseHash.toLowerCase() || currentHash === settings.years.find((y: any) => y.id === baseHash || y.year.toString() === baseHash)?.year.toString()}
								year={settings.years.find(
									(y: any) => y.id === baseHash || y.year.toString() === baseHash,
								)} />
						{:else}
							<div class="empty-state">Year view disabled</div>
						{/if}
					{:else if settings.quarters.some((q: any) => q.id.toLowerCase() === baseHash.toLowerCase())}
						{#if !settings.quarterPage.disable}
							<QuarterPage
								{settings}
								{currentHash}
								forceVisible={currentHash.toLowerCase() === baseHash.toLowerCase()}
								quarter={settings.quarters.find(
									(q: any) => q.id.toLowerCase() === baseHash.toLowerCase(),
								)} />
						{:else}
							<div class="empty-state">Quarter view disabled</div>
						{/if}
					{:else if settings.months.some((m: any) => m.id === baseHash)}
						{#if !settings.monthPage.disable}
							<MonthPage
								{settings}
								{currentHash}
								forceVisible={currentHash.toLowerCase() === baseHash.toLowerCase()}
								month={settings.months.find((m: any) => m.id === baseHash)} />
						{:else}
							<div class="empty-state">Month view disabled</div>
						{/if}
					{:else if settings.weeks.some((w: any) => w.id.toLowerCase() === baseHash.toLowerCase() || `${w.year}-w${w.weekSinceYear}`.toLowerCase() === baseHash.toLowerCase())}
						{@const week = settings.weeks.find((w: any) => w.id.toLowerCase() === baseHash.toLowerCase() || `${w.year}-w${w.weekSinceYear}`.toLowerCase() === baseHash.toLowerCase())}
						{#if !settings.weekPage.disable}
							<WeekPage
								{settings}
								{currentHash}
								forceVisible={currentHash.toLowerCase() === baseHash.toLowerCase() || currentHash.toLowerCase() === `${week.year}-w${week.weekSinceYear}`.toLowerCase()}
								{week} />
						{:else}
							<div class="empty-state">Week view disabled</div>
						{/if}
					{:else if settings.days.some((d: any) => d.id === baseHash)}
						{#if !settings.dayPage.disable}
							<DayPage
								{settings}
								{currentHash}
								forceVisible={currentHash.toLowerCase() === baseHash.toLowerCase()}
								day={settings.days.find((d: any) => d.id === baseHash)} />
						{:else}
							<div class="empty-state">Day view disabled</div>
						{/if}
					{:else if matchedCollection}
						{#if !settings.customCollections.disable}
							{@const isIndex = currentHash === matchedCollection.id || currentHash.startsWith(`${matchedCollection.id}-pg`)}
							{@const showIndexPage =
								matchedCollection.total > 0 &&
								+(matchedCollection.numIndexPages || 0) >= 1}
							{@const emojiMatch = matchedCollection.name.match(
								/^[\p{Emoji}\p{Extended_Pictographic}]/u,
							)}
							{@const emoji = settings.emojis.disable
								? ''
								: emojiMatch
									? emojiMatch[0]
									: ''}
							{@const displayName = settings.emojis.disable
								? stripEmojis(matchedCollection.name)
								: matchedCollection.name}
							{@const year = settings.years[0]}
							{@const isLandscape = settings.design.orientation === 'landscape'}
							{@const isSplit = settings.sideNav.isSplit}
							{#if isIndex && showIndexPage}
								<LazyPage
									id={currentHash}
									forceVisible={true}
									showSidebar={!settings.sideNav.disable}
									class="collection-page">
									{#snippet sidebar()}
										<SideNav
											tabs={!settings.monthPage.disable ? 'months' : 'none'}
											hideCollections={isSplit}
											{settings}
											timeframe={year}
											{emoji}
											activeCollectionId={matchedCollection.id} />
										{#if isSplit}
											<SideNav
												{settings}
												hideTabs={true}
												leftSide={!settings.sideNav.leftSide}
												timeframe={year} />
										{/if}
									{/snippet}
									<TopNav
										{settings}
										timeframe={{ ...year, collection: matchedCollection }}
										breadcrumbs={[
											{ name: displayName, href: `#${matchedCollection.id}` },
											...(collectionPageInfo?.type === 'index' &&
											collectionPageInfo.page > 1
												? [
														{
															name: `Page ${collectionPageInfo.page}`,
															href: `#${currentHash}`,
														},
													]
												: []),
										]} />
									<CollectionIndex
										collection={matchedCollection}
										{settings}
										indexPage={0}
										isInteractive={true} />
								</LazyPage>
							{:else}
								<LazyPage
									id={currentHash}
									forceVisible={true}
									showSidebar={!settings.sideNav.disable}
									class="collection-page">
									{#snippet sidebar()}
										<SideNav
											tabs={!settings.monthPage.disable ? 'months' : 'none'}
											hideCollections={isSplit}
											{settings}
											timeframe={year}
											{emoji}
											activeCollectionId={matchedCollection.id} />
										{#if isSplit}
											<SideNav
												{settings}
												hideTabs={true}
												leftSide={!settings.sideNav.leftSide}
												timeframe={year} />
										{/if}
									{/snippet}
									<TopNav
										{settings}
										timeframe={{ ...year, collection: matchedCollection }}
										breadcrumbs={[
											{ name: displayName, href: `#${matchedCollection.id}` },
											...(collectionPageInfo?.type === 'item'
												? [
														{
															name: `${collectionPageInfo.item}${collectionPageInfo.page > 1 ? `-${collectionPageInfo.page}` : ''}`,
															href: `#${currentHash}`,
														},
													]
												: []),
										]} />
									<Page
										display={matchedCollection.type}
										{settings}
										timeframe={year}
										columns={matchedCollection.columns}
										lines={matchedCollection.lines} />
								</LazyPage>
							{/if}
						{:else}
							<div class="empty-state">Collections disabled</div>
						{/if}
					{:else}
						<div class="empty-state">Unsupported preview page</div>
					{/if}
				{/if}
			</div>
		{/snippet}
	</TemplateThumbnail>
</div>

<style lang="scss">
	.interactive-preview-container {
		width: 100%;

		/* Override the pointer-events so links work */
		:global(.page-render-wrapper) {
			pointer-events: auto !important;
		}

		/* The mini planner root handles scaling */
		.mini-planner-root {
			transform-origin: top left;
			width: 702px;
			height: calc(702px / var(--thumbnail-aspect-ratio, 0.75));
			transform: scale(calc(100cqw / 702px));
			position: absolute;
			top: 0;
			left: 0;

			:global(a) {
				pointer-events: auto !important;
			}
			:global(article) {
				display: none !important;
				width: var(--doc-width) !important;
				height: var(--doc-height) !important;
				background-color: var(--bg-pdf);
			}
			:global(article.force-visible) {
				display: block !important;
			}
		}

		.empty-state {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 2rem;
			color: var(--text-low);
			background-color: var(--bg-pdf);
		}
	}
</style>
