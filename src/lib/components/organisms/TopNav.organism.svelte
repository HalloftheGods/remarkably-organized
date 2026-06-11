<script lang="ts">
	import {
		formatToString,
		PlannerSettings,
		type Timeframe,
		getYearEmoji,
		stripEmojis,
	} from '$lib';
	import { getFontInfo } from '$lib';
	import EjectIcon from '~icons/fa-solid/eject';
	import FastBackwardIcon from '~icons/fa-solid/fast-backward';
	import BackwardIcon from '~icons/fa-solid/backward';
	import ForwardIcon from '~icons/fa-solid/forward';
	import FastForwardIcon from '~icons/fa-solid/fast-forward';

	let {
		timeframe = {} as Timeframe,
		settings = {} as PlannerSettings,
		breadcrumbs = [] as { name: string; href: string; displayName?: string }[],
	} = $props();

	const showYearBreadcrumb = $derived(timeframe.year);
	const showQuarterBreadcrumb = $derived(timeframe.year && timeframe.quarter);
	const showMonthBreadcrumb = $derived(timeframe.year && timeframe.month);
	const showWeekBreadcrumb = $derived(
		timeframe.year && timeframe.month && timeframe.weekSinceYear,
	);
	const showDayBreadcrumb = $derived(
		timeframe.year && timeframe.month && timeframe.daySinceMonth,
	);

	const collection = $derived(timeframe.collection);

	const totalPages = $derived.by(() => {
		if (collection) {
			const indexPages = collection.numIndexPages || 0;
			const totalItems = (collection.total || 0) * Math.max(1, indexPages);
			const itemPages = totalItems * (collection.numPagesPerItem || 1);
			return itemPages;
		}
		if (showDayBreadcrumb) return settings.dayPage.notePagesAmount + 1;
		if (showWeekBreadcrumb) return settings.weekPage.notePagesAmount + 1;
		if (showMonthBreadcrumb) return settings.monthPage.notePagesAmount + 1;
		if (showQuarterBreadcrumb) return settings.quarterPage.notePagesAmount + 1;
		if (showYearBreadcrumb) return settings.yearPage.notePagesAmount + 1;
		return 1;
	});

	const currentPage = $derived.by(() => {
		if (!breadcrumbs?.length)
			return collection ? ((collection.numIndexPages || 0) > 0 ? 0 : 1) : 1;
		// Look for the last breadcrumb that contains a number
		for (let i = breadcrumbs.length - 1; i >= 0; i--) {
			const name = breadcrumbs[i].name;
			const match = name.match(/(\d+)/);
			if (match) {
				const num = parseInt(match[1]);
				if (collection) {
					// For collections, if it's an item number, we add index pages
					// Item breadcrumbs are typically the second or later breadcrumb and are just numbers or item-page
					const isItem = !name.includes('Page') && i > 0;
					if (isItem) {
						// Handle sub-pages (e.g. "5-2")
						const subMatch = name.match(/(\d+)-(\d+)/);
						if (subMatch) {
							const item = parseInt(subMatch[1]);
							const page = parseInt(subMatch[2]);
							return (item - 1) * (collection.numPagesPerItem || 1) + page;
						}
						return (num - 1) * (collection.numPagesPerItem || 1) + 1;
					}
					// If it's an index page (e.g. "Page 2")
					if (name.includes('Page')) return 0;
				}
				return num;
			}
		}
		return collection ? ((collection.numIndexPages || 0) > 0 ? 0 : 1) : 1;
	});

	const paginationBreadcrumb = $derived.by(() => {
		if (totalPages <= 1 && !collection) return null;

		if (collection) {
			const getHref = (page: number) => {
				const indexPages = collection.numIndexPages || 0;
				if (page < (indexPages > 0 ? 0 : 1) || page > totalPages) return null;
				if (page === 0) {
					return `#${collection.id}`;
				} else {
					const itemOffset = page;
					const pagesPerItem = collection.numPagesPerItem || 1;
					const itemNum = Math.ceil(itemOffset / pagesPerItem);
					const itemPageOffset = itemOffset % pagesPerItem || pagesPerItem;

					// If there's no index page, the first item is the base ID
					if (indexPages === 0 && itemNum === 1 && itemPageOffset === 1) {
						return `#${collection.id}`;
					}

					return `#${collection.id}-${itemNum}${itemPageOffset > 1 ? `-pg${itemPageOffset}` : ''}`;
				}
			};

			return {
				current: currentPage,
				total: totalPages,
				prevHref: getHref(currentPage - 1),
				nextHref: getHref(currentPage + 1),
			};
		}

		return {
			current: currentPage,
			total: totalPages,
			prevHref:
				currentPage > 1
					? currentPage === 2
						? `#${timeframe.id}`
						: `#${timeframe.id}-pg${currentPage - 1}`
					: null,
			nextHref: currentPage < totalPages ? `#${timeframe.id}-pg${currentPage + 1}` : null,
		};
	});

	const timeframeNavigation = $derived.by(() => {
		if (collection) {
			let currentItem = 0;
			for (let i = breadcrumbs.length - 1; i >= 0; i--) {
				const name = breadcrumbs[i].name;
				const isItem = !name.includes('Page') && i > 0;
				if (isItem) {
					const subMatch = name.match(/(\d+)-(\d+)/);
					if (subMatch) {
						currentItem = parseInt(subMatch[1]);
					} else {
						const match = name.match(/(\d+)/);
						if (match) currentItem = parseInt(match[1]);
					}
					break;
				}
			}

			const totalItems = collection.total || 0;

			return {
				prevHref: currentItem > 1 ? `#${collection.id}-${currentItem - 1}` : null,
				nextHref:
					currentItem > 0 && currentItem < totalItems
						? `#${collection.id}-${currentItem + 1}`
						: currentItem === 0 && totalItems > 0
							? `#${collection.id}-1`
							: null,
			};
		}

		let list: any[] = [];
		if (showDayBreadcrumb) list = settings.days;
		else if (showWeekBreadcrumb) list = settings.weeks;
		else if (showMonthBreadcrumb) list = settings.months;
		else if (showQuarterBreadcrumb) list = settings.quarters;
		else if (showYearBreadcrumb) list = settings.years;

		if (!list || !list.length) return { prevHref: null, nextHref: null };

		const currentIndex = list.findIndex((item) => item.id === timeframe.id);
		if (currentIndex === -1) return { prevHref: null, nextHref: null };

		return {
			prevHref: currentIndex > 0 ? `#${list[currentIndex - 1].id}` : null,
			nextHref: currentIndex < list.length - 1 ? `#${list[currentIndex + 1].id}` : null,
		};
	});

	const isYearDimmed = $derived(
		settings.yearPage.disable || !settings.years.some((y) => y.year === year),
	);
	const isQuarterDimmed = $derived(
		settings.quarterPage.disable ||
			!settings.quarters.some((q) => q.year === year && q.quarter === quarter),
	);
	const isMonthDimmed = $derived(
		settings.monthPage.disable ||
			!settings.months.some((m) => m.year === year && m.month === month),
	);
	const isWeekDimmed = $derived(
		settings.weekPage.disable ||
			!settings.weeks.some(
				(w) =>
					w.year === (timeframe.weekYear || year) &&
					w.weekSinceYear === timeframe.weekSinceYear,
			),
	);
	const isDayDimmed = $derived(
		settings.dayPage.disable ||
			!settings.days.some(
				(d) =>
					d.year === year &&
					d.month === month &&
					d.daySinceMonth === timeframe.daySinceMonth,
			),
	);
	const isFinalMonth = $derived(
		settings.months.findIndex(
			(m) =>
				m.year === timeframe.start.getUTCFullYear() &&
				m.month === timeframe.start.getUTCMonth() + 1,
		) ===
			settings.months.length - 1,
	);
	const isFinalWeek = $derived(
		settings.weeks.findIndex((m) => m.start.getTime() === timeframe.start.getTime()) ===
			settings.months.length - 1,
	);
	const year = $derived(
		isFinalMonth || isFinalWeek || !timeframe.year
			? timeframe.start.getUTCFullYear()
			: timeframe.year,
	);
	const month = $derived(
		isFinalMonth || isFinalWeek || !timeframe.month
			? timeframe.start.getUTCMonth() + 1
			: timeframe.month,
	);
	const quarter = $derived(Math.floor((month - 1) / 3) + 1);

	const dashboardEmojiMatch = $derived(
		settings.dashboardPage.title.match(/\p{Extended_Pictographic}/u),
	);

	const font = $derived(settings.topNav.font);
	const homeIconAdjustments = new Map([
		['Abril Fatface', '-.25rem'],
		['Bebas Neue', '-.4rem'],
		['Acme', '-.15em'],
		['Anton', '-.13em'],
		['Indie Flower', '-.3em'],
		['Just Another Hand', '-.2em'],
		['Lilita One', '-.07em'],
		['Lobster', '-.07em'],
		['Montserrat', '-.09em'],
		['Permanent Marker', '-.09em'],
		['Playfair Display', '.03em'],
		['Poppins', '-.16em'],
		['Rancho', '-.12em'],
		['Roboto', '-.16em'],
		['Roboto Condensed', '-.14rem'],
		['Roboto Slab', '-.1em'],
		['Satisfy', '-.27em'],
		['Shadows Into Light Two', '-.15em'],
	]);
	const navHeightAdjustments = new Map([
		['Abril Fatface', '-.35rem'],
		['Acme', '-.25rem'],
		['Anton', '-.15rem'],
		['Caveat', '-.25rem'],
		['Caveat Brush', '-.25rem'],
		['Dancing Script', '-.25rem'],
		['DM Serif Display', '-.25rem'],
		['Lobster', '-.15rem'],
		['Pacifico', '-.2rem'],
		['Permanent Marker', '-.4rem'],
		['Playfair Display', '-.25rem'],
		['PT Serif', '-.2rem'],
		['Roboto', '-.15rem'],
		['Roboto Condensed', '-.25rem'],
		['Roboto Slab', '-.15rem'],
	]);
</script>

{#if !settings.topNav.disable}
	<nav
		style:font-family="var(--font-topnav)"
		style:font-size="{(settings.topNav.fontSize || 1) *
			(getFontInfo(font)?.size || 1)}rem"
		style:height={navHeightAdjustments.get(font)
			? `calc(var(--topnav-height) + ${navHeightAdjustments.get(font)})`
			: ''}>
		<ol
			class="breadcrumbs ml-1"
			style:--breadcrumb-separator="'{settings.topNav.breadcrumbSeparator}'">
			<a
				href={settings.dashboardPage.homeNavigatesToDashboard &&
				!settings.dashboardPage.disable
					? '#dashboard'
					: !settings.coverPage.disable
						? '#cover'
						: !settings.dashboardPage.disable
							? '#dashboard'
							: '#home'}
				class="icon-btn"
				title="Home"
				style="font-size: {settings.emojis.disable ? '0.9em' : '1.1em'};">
				{#if settings.emojis.disable}
					<EjectIcon />
				{:else if dashboardEmojiMatch}
					{dashboardEmojiMatch[0]}
				{:else}
					<EjectIcon />
				{/if}
			</a>
			{#if settings.topNav.showBreadcrumbs}
				{#if showYearBreadcrumb && !isYearDimmed}
					<li>
						<a href="#{year}">
							{settings.emojis.disable ? '' : getYearEmoji(year)}
							{year}
						</a>
					</li>
				{/if}
				{#if showQuarterBreadcrumb && !isQuarterDimmed}
					<li>
						<a href="#{year}-q{quarter}">
							{settings.emojis.quarters[quarter - 1] || ''}
							{!showWeekBreadcrumb && !showMonthBreadcrumb && !showDayBreadcrumb
								? 'Quarter '
								: 'Q'}{quarter}
						</a>
					</li>
				{/if}
				{#if showMonthBreadcrumb && !isMonthDimmed}
					<li>
						<a href="#{year}-{month}">
							{settings.emojis.months[month - 1] || ''}
							{new Date(year, month - 1).toLocaleString('default', {
								month: !showDayBreadcrumb ? 'long' : 'short',
							})}
						</a>
					</li>
				{/if}
				{#if showWeekBreadcrumb && !isWeekDimmed}
					<li>
						<a
							href="#{timeframe.weekYear ||
								timeframe.year ||
								year}-wk{timeframe.weekSinceYear}">
							{#if settings.weekPage.useWeekSinceYear}
								{#if (!showYearBreadcrumb && !showMonthBreadcrumb) || (timeframe.weekYear && timeframe.weekYear !== year) || timeframe.year !== year}
									{timeframe.weekYear || timeframe.year || year}
								{/if}
							{:else if !showMonthBreadcrumb || (timeframe.weekMonth && timeframe.weekYear && timeframe.weekMonth !== timeframe.month) || timeframe.month !== month}
								{new Date(
									timeframe.weekYear || timeframe.year!,
									(timeframe.weekMonth || timeframe.month!) - 1,
								).toLocaleString('default', {
									month:
										!showDayBreadcrumb &&
										(!timeframe.weekMonth || timeframe.weekMonth === timeframe.month) &&
										(!showMonthBreadcrumb || timeframe.month === month)
											? 'long'
											: 'short',
								})}
							{/if}
							{#if !showDayBreadcrumb}Week{:else}W{/if}{settings.weekPage.useWeekSinceYear
								? timeframe.weekSinceYear
								: timeframe.weekSinceMonth}
						</a>
					</li>
				{/if}
				{#if showDayBreadcrumb && !isDayDimmed}
					<li>
						<a href="#{timeframe.year}-{timeframe.month}-{timeframe.daySinceMonth}">
							{timeframe.start.toLocaleString('default', {
								weekday: 'long',
								timeZone: 'UTC',
							})}
							the
							{@html formatToString(timeframe.daySinceMonth, {
								type: 'ordinal',
								html: true,
							})}
						</a>
					</li>
				{/if}
				{#if breadcrumbs?.length}
					{#each breadcrumbs as breadcrumb, i (`${breadcrumb.href || breadcrumb.name}-${i}`)}
						{#if !breadcrumb.name.includes('Page')}
							<li>
								{#if breadcrumb.href}
									<a href={breadcrumb.href}>
										{settings.emojis.disable
											? stripEmojis(breadcrumb.displayName || breadcrumb.name)
											: breadcrumb.displayName || breadcrumb.name}
									</a>
								{:else}
									<span>
										{settings.emojis.disable
											? stripEmojis(breadcrumb.displayName || breadcrumb.name)
											: breadcrumb.displayName || breadcrumb.name}
									</span>
								{/if}
							</li>
						{/if}
					{/each}
				{/if}
			{/if}
			{#if paginationBreadcrumb}
				<li class="pagination">
					<span>{paginationBreadcrumb.current} of {paginationBreadcrumb.total}</span>
				</li>
			{/if}
		</ol>

		<div class="center-controls">
			<a
				href={timeframeNavigation.prevHref}
				class="icon-btn"
				class:disabled={!timeframeNavigation.prevHref}
				title="Previous {timeframe?.type || 'item'}">
				<FastBackwardIcon />
			</a>

			<a
				href={paginationBreadcrumb?.prevHref}
				class="icon-btn"
				class:disabled={!paginationBreadcrumb?.prevHref}
				title="Previous page">
				<BackwardIcon />
			</a>

			<a
				href={paginationBreadcrumb?.nextHref}
				class="icon-btn"
				class:disabled={!paginationBreadcrumb?.nextHref}
				title="Next page">
				<ForwardIcon />
			</a>

			<a
				href={timeframeNavigation.nextHref}
				class="icon-btn"
				class:disabled={!timeframeNavigation.nextHref}
				title="Next {timeframe?.type || 'item'}">
				<FastForwardIcon />
			</a>
		</div>

		{#if !settings.customCollections.disable && settings.topNav.showCollectionLinks && settings.collections?.length}
			<ol class="links">
				{#each settings.collections as collection, i (collection.id)}
					<li>
						<a href="#{collection.id}">
							{settings.emojis.disable ? stripEmojis(collection.name) : collection.name}
						</a>
					</li>
				{/each}
			</ol>
		{/if}
	</nav>
{/if}

<style lang="scss">
	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: absolute;
		top: var(--margin-top);
		left: var(--margin-left);
		width: calc(100% - var(--margin-left) - var(--margin-right));
		height: var(--topnav-height);
		padding: 0 0 0 var(--sidenav-width);

		:global(main.side-nav-right) & {
			padding: 0 var(--sidenav-width) 0 0;
		}

		:global(main.side-nav-split) & {
			padding: 0 var(--sidenav-width) !important;
		}

		ol.links {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			height: 100%;
			li {
				display: flex;
				align-items: center;
				height: 100%;
				&:not(:last-child)::after {
					content: '|';
					color: var(--text-low);
					font-size: 0.85em;
					opacity: 0.3;
				}
				&:last-child {
					padding-right: 0.75rem;
				}
			}
			a {
				font-size: 1em;
				color: var(--text-topbar, var(--text-low));
				padding: 0 0.25rem;
				line-height: 1;
				:global(svg) {
					font-size: 0.85em;
				}
				:global(.ordinal) {
					color: currentColor;
					font-size: 0.75em;
					vertical-align: top;
				}
			}
		}

		.center-controls {
			height: 100%;
			display: flex;
			align-items: center;
			gap: 0.25rem;
			color: var(--text-topbar, var(--text-low));
			padding: 0 0.5rem;
			z-index: 10;

			.icon-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				color: inherit;
				text-decoration: none;
				padding: 0 0.25rem;
				opacity: 0.8;
				line-height: 1;
				transition: opacity 0.2s;

				&:hover {
					opacity: 1;
				}

				&.disabled {
					opacity: 0.2;
					pointer-events: none;
				}

				:global(svg) {
					font-size: 1em;
				}
			}
		}

		ol.breadcrumbs {
			list-style: none;
			padding: 0;
			margin: 0 0 0 0.5rem;
			display: flex;
			height: 100%;
			font-size: 1.2em;

			> a.icon-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 0.75rem 0 0.25rem;
				opacity: 0.8;
				transition: opacity 0.2s;

				&:hover {
					opacity: 1;
				}
			}

			li {
				display: flex;
				align-items: center;
				height: 100%;
				&:not(:last-child):not(:has(+ .pagination))::after {
					content: var(--breadcrumb-separator, '/');
					color: var(--text-topbar, var(--text-low));
					font-size: 0.8em;
					opacity: 0.3;
				}
				&:last-child, &:has(+ .pagination) {
					a {
						color: var(--text-topbar, var(--text-high));
					}
				}
				&.pagination {
					span {
						opacity: 0.6;
					}
				}
			}
			a {
				font-size: 1em;
				color: var(--text-topbar, var(--text));
				padding: 0 0.35rem;
				line-height: 1;
				:global(svg) {
					font-size: 1em;
				}
				:global(.ordinal) {
					color: currentColor;
					font-size: 0.75em;
					vertical-align: top;
				}
			}
		}
	}
</style>
