<script lang="ts">
	import { type PlannerSettings, stripEmojis } from '$lib';
	import { getFontInfo, getGoogleFontURL, getDateHash, formatToString } from '$lib';
	import { CoverBackground } from '$backgrounds';

	let {
		isPreparingPrint = false,
		forceVisible = false,
		settings = {},
	}: {
		isPreparingPrint?: any;
		forceVisible?: any;
		settings?: PlannerSettings;
	} = $props();

	const plannerLink = $derived(
		!settings.dashboardPage?.disable
			? `#dashboard`
			: !settings.yearPage?.disable
				? `#${settings.years[0].id}`
				: !settings.quarterPage?.disable
					? `#${settings.quarters[0].id}`
					: !settings.monthPage?.disable
						? `#${settings.months[0].id}`
						: !settings.weekPage?.disable
							? `#${settings.weeks[0].id}`
							: !settings.dayPage?.disable
								? `#${settings.days[0].id}`
								: '',
	);

	const currentDayInfo = $derived(
		(() => {
			if (!settings.date?.today || !settings.coverPage?.showCurrentDay) return null;
			const today = settings.date.today;
			const quarter = Math.floor(today.getUTCMonth() / 3) + 1;
			const monthName = today.toLocaleString('default', {
				month: 'long',
				timeZone: 'UTC',
			});
			const dayName = today.toLocaleString('default', {
				weekday: 'long',
				timeZone: 'UTC',
			});
			const currentWeek = Math.ceil(today.getUTCDate() / 7);

			const getOrdinal = (d: number) => {
				if (d > 3 && d < 21) return 'th';
				switch (d % 10) {
					case 1:
						return 'st';
					case 2:
						return 'nd';
					case 3:
						return 'rd';
					default:
						return 'th';
				}
			};
			const dateOrdinal = getOrdinal(today.getUTCDate());

			return { today, quarter, monthName, dayName, currentWeek, dateOrdinal };
		})(),
	);
</script>

<article
	id="cover"
	class="planner-page cover-page visible {forceVisible ? 'force-visible' : ''} {settings
		.coverPage?.darkBackground
		? 'dark'
		: ''} {settings.coverPage?.backgroundStyle &&
	settings.coverPage.backgroundStyle !== 'none'
		? 'has-background'
		: ''}"
	style="--font: var(--font-cover); --font-display: var(--font-cover); font-family: var(--font-cover);">
	{#if settings.coverPage?.backgroundStyle && settings.coverPage.backgroundStyle !== 'none'}
		<CoverBackground {settings} />
	{/if}
	<div class="planner page padded cover-content">
		<header>
			{#if settings.coverPage?.title}
				<h1
					class="title"
					style:font-size="{(getFontInfo(settings.coverPage.font)?.size || 1) *
						(settings.years?.length > 1 ? 7 : 12)}rem"
					style:font-weight={getFontInfo(settings.coverPage.font)?.boldWeight || 400}>
					{settings.coverPage.title}
				</h1>
			{:else if settings.years?.length > 1}
				<h1
					class="multi-year"
					style:font-size="{(getFontInfo(settings.coverPage?.font)?.size || 1) * 7}rem"
					style:font-weight={getFontInfo(settings.coverPage?.font)?.boldWeight || 400}>
					<div class="start">
						<small>
							{settings.years[0].start.toLocaleString('default', {
								month: 'long',
								timeZone: 'UTC',
							})}
						</small>
						{settings.years[0].year}
					</div>
					<div class="separator">-</div>
					<div class="end">
						<small>
							{settings.years[settings.years.length - 1].end.toLocaleString('default', {
								month: 'long',
								timeZone: 'UTC',
							})}
						</small>
						{settings.years[settings.years.length - 1].year}
					</div>
				</h1>
			{:else if settings.years?.length > 0}
				<h1
					style:font-size="{(getFontInfo(settings.coverPage?.font)?.size || 1) * 12}rem"
					style:font-weight={getFontInfo(settings.coverPage?.font)?.boldWeight || 400}>
					{settings.years[0].year}
				</h1>
			{/if}
			{#if currentDayInfo}
				<div class="actions">
					<a href="#{currentDayInfo.today.getUTCFullYear()}">
						{currentDayInfo.today.getUTCFullYear()}
					</a>
					<a href="#{currentDayInfo.today.getUTCFullYear()}-q{currentDayInfo.quarter}">
						Q{currentDayInfo.quarter}
					</a>
					<a
						href="#{currentDayInfo.today.getUTCFullYear()}-{currentDayInfo.today.getUTCMonth() +
							1}">
						{currentDayInfo.monthName}
					</a>
					<a
						href="#{currentDayInfo.today.getUTCFullYear()}-{currentDayInfo.today.getUTCMonth() +
							1}-w{currentDayInfo.currentWeek}">
						{currentDayInfo.dayName}
					</a>
					<a href={getDateHash(currentDayInfo.today)}>
						{currentDayInfo.today.getUTCDate()}
						<small>{currentDayInfo.dateOrdinal}</small>
					</a>
				</div>
			{/if}
			{#if settings.coverPage?.showCollectionLinks}
				<div class="links-container">
					{#if plannerLink}
						<div class="links">
							<a href={plannerLink}>
								{!settings.dashboardPage?.disable
									? settings.emojis?.disable
										? stripEmojis(settings.dashboardPage?.title || 'Dashboard')
										: settings.dashboardPage?.title || 'Dashboard'
									: 'Planner'}
							</a>
						</div>
					{/if}
					{#if !settings.customCollections?.disable && settings.collections?.length > 0}
						<div class="links collections-grid">
							{#each settings.collections as collection, i}
								<a href="#{collection.id}">
									{settings.emojis?.disable
										? stripEmojis(collection.name)
										: collection.name}
								</a>
								{#if i !== settings.collections.length - 1}
									<span class="separator">|</span>
								{/if}
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</header>
		{#if settings.coverPage?.name || settings.coverPage?.email}
			<footer>
				{settings.coverPage.name}
				<small>{settings.coverPage.email}</small>
			</footer>
		{/if}
	</div>
</article>

<style lang="scss">
	.cover-content {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		flex: 1;
		width: 100%;
		height: 100%;
	}
	header {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		padding: 2rem 0;
	}
	:global(.cover-page) {
		position: relative;
		z-index: 0;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: var(--margin-top) var(--margin-right) var(--margin-bottom) var(--margin-left) !important;
		box-sizing: border-box;
		background-color: var(--bg-pdf, white);
		color: var(--text-cover, var(--text));

		:global(.page.cover) & {
			width: 100%;
			height: 100%;
			min-height: 100%;
			margin: 0;
			flex: 1;
		}

		&.dark {
			background-color: #3d3d3d;
			color: var(--text-cover, #ccc);
			h1 {
				color: var(--text-cover, white);
			}
			.actions a {
				background-color: #222;
				color: var(--text-cover, #ccc);
			}
			.links a {
				color: var(--text-cover, #ccc);
			}
		}
	}
	.actions {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
		a {
			display: flex;
			padding: 0.5rem 0.75rem;
			border-radius: 10px;
			background-color: #eee;
			color: #333;
			text-decoration: none;
			gap: 0.05rem;
			small {
				color: currentColor;
			}
		}
	}
	.links-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 2rem auto 0;
		gap: 0.5rem;
		width: 100%;
	}
	.links {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		max-width: 80%;
		a {
			display: flex;
			border-radius: 10px;
			text-decoration: none;
			gap: 0 0.05rem;
			padding: 1rem 0.75rem;
			font-weight: var(--font-weight-bold);
			margin: -0.5rem 0;
			font-size: 1.5em;
		}
		&.collections-grid {
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			gap: 0.5rem;
			a {
				margin: 0;
				padding: 0;
				font-size: 1.15rem;
			}
			.separator {
				margin: 0;
				font-size: 1.15rem;
				color: var(--outline-high);
			}
		}
	}
	h1,
	a,
	small {
		font-family: var(--font-cover) !important;
		color: var(--text-cover, inherit);
	}

	h1 {
		line-height: 100%;
		text-align: center;
		margin: 0;
		padding: 0 2rem;
		text-wrap: balance;
		&.multi-year {
			display: flex;
			align-items: end;
			margin-bottom: 0.5rem;
			justify-content: center;
			.separator {
				font-size: 5rem;
				margin: 0 0.5rem;
			}
			.start,
			.end {
				display: flex;
				flex-direction: column;
			}
			small {
				line-height: 100%;
				font-size: 0.25em;
				color: currentColor;
			}
		}
	}
	footer {
		position: relative;
		z-index: 1;
		height: 15%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 1.4em;
		small {
			color: var(--text-low);
		}
	}
</style>
