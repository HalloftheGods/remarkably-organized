<script lang="ts">
	import { formatToString, PlannerSettings, type Timeframe, getYearEmoji } from '$lib';
	import { getFontInfo } from '../fonts/fonts';

	let {
		timeframe = {} as Timeframe,
		settings = {} as PlannerSettings,
		breadcrumbs = [] as { name: string; href: string }[],
	} = $props();

	const showYearBreadcrumb = $derived(timeframe.year);
	const showQuarterBreadcrumb = $derived(timeframe.year && timeframe.quarter);
	const showMonthBreadcrumb = $derived(timeframe.year && timeframe.month);
	const showWeekBreadcrumb = $derived(
		timeframe.year &&
			timeframe.month &&
			timeframe.weekSinceYear,
	);
	const showDayBreadcrumb = $derived(
		timeframe.year &&
			timeframe.month &&
			timeframe.daySinceMonth,
	);

	const isYearDimmed = $derived(
		settings.yearPage.disable || !settings.years.some((y) => y.year === year)
	);
	const isQuarterDimmed = $derived(
		settings.quarterPage.disable || !settings.quarters.some((q) => q.year === year && q.quarter === quarter)
	);
	const isMonthDimmed = $derived(
		settings.monthPage.disable || !settings.months.some((m) => m.year === year && m.month === month)
	);
	const isWeekDimmed = $derived(
		settings.weekPage.disable || !settings.weeks.some((w) => w.year === (timeframe.weekYear || year) && w.weekSinceYear === timeframe.weekSinceYear)
	);
	const isDayDimmed = $derived(
		settings.dayPage.disable || !settings.days.some((d) => d.year === year && d.month === month && d.daySinceMonth === timeframe.daySinceMonth)
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
		class:centered={settings.customCollections.disable ||
			!settings.topNav.showCollectionLinks ||
			!settings.collections?.length}
		style:font-family="'{font}'"
		style:font-size="{getFontInfo(font)?.size || 1}rem"
		style:height={navHeightAdjustments.get(font)
			? `calc(var(--topnav-height) + ${navHeightAdjustments.get(font)})`
			: ''}>
		<ol class="breadcrumbs">
			<li>
				<a href="#home" class="home" style="font-size: 1.1em; line-height: 1;">🏠</a>
			</li>
			{#if showYearBreadcrumb}
				<li>
					<a href="#{year}" class:dim={isYearDimmed}>{settings.emojis.disable ? '' : getYearEmoji(year)} {year}</a>
				</li>
			{/if}
			{#if showQuarterBreadcrumb}
				<li>
					<a href="#{year}-q{quarter}" class:dim={isQuarterDimmed}>
						{settings.emojis.quarters[quarter - 1] || ''}
						{!showWeekBreadcrumb && !showMonthBreadcrumb && !showDayBreadcrumb
							? 'Quarter '
							: 'Q'}{quarter}
					</a>
				</li>
			{/if}
			{#if showMonthBreadcrumb}
				<li>
					<a href="#{year}-{month}" class:dim={isMonthDimmed}>
						{settings.emojis.months[month - 1] || ''}
						{new Date(year, month - 1).toLocaleString('default', {
							month: !showWeekBreadcrumb && !showDayBreadcrumb ? 'long' : 'short',
						})}
					</a>
				</li>
			{/if}
			{#if showWeekBreadcrumb}
				<li>
					<a href="#{timeframe.weekYear}-wk{timeframe.weekSinceYear}" class:dim={isWeekDimmed}>
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
						{#if !showDayBreadcrumb}Week{:else}WK{/if}
						{settings.weekPage.useWeekSinceYear
							? timeframe.weekSinceYear
							: timeframe.weekSinceMonth}
					</a>
				</li>
			{/if}
			{#if showDayBreadcrumb}
				<li>
					<a href="#{timeframe.year}-{timeframe.month}-{timeframe.daySinceMonth}" class:dim={isDayDimmed}>
						{timeframe.start.toLocaleString('default', {
							weekday: 'short',
							timeZone: 'UTC',
						})},
						{timeframe.start.toLocaleString('default', {
							month: !breadcrumbs.length ? 'long' : 'short',
							timeZone: 'UTC',
						})}
						{@html formatToString(timeframe.daySinceMonth, {
							type: 'ordinal',
							html: true,
						})}
					</a>
				</li>
			{/if}
			{#if breadcrumbs?.length}
				{#each breadcrumbs as breadcrumb (breadcrumb.href)}
					<li><a href={breadcrumb.href}>{breadcrumb.name}</a></li>
				{/each}
			{/if}
		</ol>
		{#if !settings.customCollections.disable && settings.topNav.showCollectionLinks && settings.collections?.length}
			<div style="flex: 1"></div>
			<ol class="links">
				{#each settings.collections as collection, i (collection.id)}
					<li><a href="#{collection.id}">{collection.name}</a></li>
				{/each}
			</ol>
		{/if}
	</nav>
{/if}

<style lang="scss">
	:global(main.side-nav-right) nav {
		padding: 0 calc(var(--sidenav-width) + var(--margin-right)) 0 var(--margin-left);
		left: 0;
		right: 0;
	}
	nav {
		display: flex;
		align-items: center;
		position: absolute;
		top: var(--margin-top);
		left: var(--margin-left);
		right: var(--margin-right);
		height: var(--topnav-height);
		padding: 0 0 0 var(--sidenav-width);
		&.centered {
			justify-content: center;
			ol.breadcrumbs li:first-child a {
				padding-left: 0.35rem;
			}
		}
		ol.links {
			list-style: none;
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
				color: var(--text-low);
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

		ol.breadcrumbs {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			height: 100%;
			font-size: 1.2em;
			li {
				display: flex;
				align-items: center;
				height: 100%;
				&:not(:last-child)::after {
					content: '/';
					color: var(--text-low);
					font-size: 0.8em;
					opacity: 0.3;
				}
				&:first-child {
					a {
						padding-left: 2rem;
					}
				}
				&:last-child {
					a {
						color: var(--text-high);
						// font-size: 1.1em;
					}
				}
			}
			a {
				font-size: 1em;
				color: var(--text);
				padding: 0 0.35rem;
				line-height: 1;
				&.home {
					display: flex;
					height: 100%;
					align-items: center;
					color: var(--text-low);
				}
				:global(svg) {
					font-size: 1em;
				}
				:global(.ordinal) {
					color: currentColor;
					font-size: 0.75em;
					vertical-align: top;
				}
				&.dim {
					opacity: 0.35;
					pointer-events: none;
				}
			}
		}
	}
</style>
