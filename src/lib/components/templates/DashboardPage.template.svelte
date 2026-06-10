<script lang="ts">
	import { type PlannerSettings, getYearEmoji, stripEmojis } from '$lib';

	let {
		isPreparingPrint = false,
		forceVisible = false,
		settings = {},
	}: {
		isPreparingPrint?: any;
		forceVisible?: any;
		settings?: PlannerSettings;
	} = $props();

	const yearCols = $derived(settings.years.length <= 2 ? 1 : 2);
</script>

<article
	id="dashboard"
	class="planner page dashboard-page visible {forceVisible ? 'force-visible' : ''}"
	style="--dashboard-font-scale: {settings.dashboardPage
		.fontSize}; --year-count: {settings.years.length}; --grid-cols: {yearCols};">
	<header>
		<h1>
			{settings.emojis.disable
				? stripEmojis(settings.dashboardPage.title || 'Dashboard')
				: settings.dashboardPage.title || 'Dashboard'}
		</h1>
		<div class="links collections-grid">
			{#if !settings.customCollections.disable && settings.collections.length > 0}
				{#each settings.collections as collection, i}
					<a href="#{collection.id}">
						{settings.emojis.disable ? stripEmojis(collection.name) : collection.name}
					</a>
					{#if i < settings.collections.length - 1}
						<span class="separator">|</span>
					{/if}
				{/each}
			{/if}
		</div>
	</header>

	<div class="dashboard-grid">
		{#each settings.years as year}
			<section class="year-card">
				<div class="links years">
					<a href="#{year.id}">
						{settings.emojis.disable ? '' : getYearEmoji(year.year)}
						{year.year}
					</a>
				</div>
				<div
					class="quarters-timeline"
					style="--timeline-cols: {settings.quarterPage.disable
						? 'repeat(3, auto)'
						: 'repeat(4, auto)'};">
					{#each settings.quarters.filter((q) => q.year === year.year) as quarter}
						<div class="quarter-row">
							{#if !settings.quarterPage.disable}
								<div class="links quarters">
									<a href="#{quarter.id}">
										{#if !settings.emojis.disable}
											<span class="watermark">
												{settings.emojis.quarters[quarter.quarter - 1] || ''}
											</span>
										{/if}
										{quarter.nameShort}
									</a>
								</div>
							{/if}
							{#if !settings.monthPage.disable}
								<div class="links months">
									{#each settings.months.filter((m) => m.quarter === quarter.quarter && m.year === quarter.year) as month}
										<a href="#{month.id}" class="month-link">
											{#if !settings.emojis.disable}
												<span class="watermark">
													{settings.emojis.months[month.month - 1] || ''}
												</span>
											{/if}
											{month.nameShort}
										</a>
									{/each}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</article>

<style lang="scss">
	.planner.page.dashboard-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: calc(1rem + var(--margin-top)) var(--margin-right)
			calc(1rem + var(--margin-bottom)) var(--margin-left);
		box-sizing: border-box;

		// Ensure we respect the single-page view hidden state from PlannerView
		:global(.view-single) & {
			display: none;

			&.force-visible {
				display: flex !important;
			}
		}
	}
	header {
		margin-bottom: 1.5rem;
		text-align: center;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;

		h1 {
			margin: 0;
			color: var(--text);
			font-family: var(--font-cover);
			font-size: 2.5rem;
			font-weight: bold;
		}
	}
	.dashboard-grid {
		display: grid;
		grid-template-columns: repeat(var(--grid-cols, 2), 1fr);
		gap: 2rem;
		width: 100%;
		max-width: 900px;
		margin: 0 auto;
		justify-content: center;
		justify-items: center;
		align-items: start;
	}
	.year-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		width: 100%;
		max-width: 650px;
		min-width: 0;
	}
	.quarters-timeline {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
		align-items: center;
	}
	.quarter-row {
		display: grid;
		grid-template-columns: var(--timeline-cols, repeat(4, auto));
		gap: 0.5rem;
		align-items: stretch;
		justify-content: center;
		width: 100%;
	}
	.links {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		width: 100%;
		a {
			text-decoration: none;
			padding: 0.3rem 0.6rem;
			border: none;
			border-radius: 8px;
			color: var(--text);
			font-family: var(--font-display);
			font-size: calc(1.3rem * var(--dashboard-font-scale, 1));
			letter-spacing: 0.5px;
			font-weight: bold;
			text-align: center;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			gap: 0.4rem;
			position: relative;

			.watermark {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				opacity: 0.15;
				pointer-events: none;
				z-index: 0;
			}
		}

		&.collections-grid {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			gap: 0.4rem;
			a {
				border: none;
				min-width: unset;
				padding: 0.2rem 0.4rem;
				font-size: 1.1rem;
				margin: 0;
				gap: 0.3rem;
			}
			.separator {
				margin: 0;
				font-size: 1.1rem;
				color: var(--text-low);
				opacity: 0.3;
			}
		}
		&.years {
			a {
				font-size: calc(1.8rem * var(--dashboard-font-scale, 1));
				padding: 0.4rem 1.5rem;
				gap: 0.6rem;
				border: none;
				border-radius: 0;
			}
		}
		&.quarters,
		&.months {
			display: contents;
			a {
				font-family: var(--font-body);
				font-size: calc(1.2rem * var(--dashboard-font-scale, 1));
				padding: 0.3rem 0.4rem;
				width: 100%;
				height: 100%;
				justify-content: center;
				min-height: 3.5rem;
				min-width: 80px;

				.watermark {
					font-size: 2.5rem;
				}
			}
		}
	}
</style>
