<script lang="ts">
	import { type PlannerSettings, getYearEmoji, stripEmojis } from '$lib';
	import { LazyPage } from '$atoms';

	let { settings = {} as PlannerSettings, isPreparingPrint = false } = $props();
</script>

<LazyPage
	id="dashboard"
	{isPreparingPrint}
	class="dashboard-page"
	style="--font: var(--font-cover); --font-display: var(--font-cover); --dashboard-font-scale: {settings
		.dashboardPage.fontSize};">
	<header>
		<h1 style:font-size="5rem" style:font-weight="bold">
			{settings.emojis.disable
				? stripEmojis(settings.dashboardPage.title || 'Dashboard')
				: settings.dashboardPage.title || 'Dashboard'}
		</h1>
		{#if !settings.customCollections.disable && settings.collections.length > 0}
			<div class="links collections-grid">
				{#each settings.collections as collection, i}
					<a href="#{collection.id}">
						{settings.emojis.disable ? stripEmojis(collection.name) : collection.name}
					</a>
					{#if i !== settings.collections.length - 1}
						<span class="separator">|</span>
					{/if}
				{/each}
			</div>
		{/if}
	</header>

	<div class="dashboard-grid">
		<section>
			{#if !settings.yearPage.disable}
				<div class="links years">
					{#each settings.years as year}
						<a href="#{year.id}">
							{#if !settings.emojis.disable}
								{getYearEmoji(year.year)}
								<br />
							{/if}
							{year.nameLong}
						</a>
					{/each}
				</div>
			{/if}
			<div class="timeline-quarters-grid">
				{#each settings.quarters as quarter}
					<div class="quarter-row">
						{#if !settings.quarterPage.disable}
							<div class="links quarters">
								<a href="#{quarter.id}">
									{#if settings.emojis.quarters[quarter.quarter - 1]}
										{settings.emojis.quarters[quarter.quarter - 1]}
										<br />
									{/if}
									{quarter.nameShort}
								</a>
							</div>
						{/if}
						{#if !settings.monthPage.disable}
							<div class="links months">
								{#each settings.months.filter((m) => m.quarter === quarter.quarter && m.year === quarter.year) as month}
									<a href="#{month.id}">
										{#if settings.emojis.months[month.month - 1]}
											{settings.emojis.months[month.month - 1]}
											<br />
										{/if}
										{month.nameLong}
									</a>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	</div>
</LazyPage>

<style lang="scss">
	:global(.dashboard-page) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding: calc(4rem + var(--margin-top)) calc(2rem + var(--margin-right))
			calc(4rem + var(--margin-bottom)) calc(2rem + var(--margin-left));
		box-sizing: border-box;
	}
	header {
		margin-bottom: 4rem;
		text-align: center;
		h1 {
			margin: 0;
			color: var(--text);
		}
	}
	.dashboard-grid {
		display: flex;
		flex-direction: column;
		gap: 4rem;
		width: 100%;
		max-width: 90%;
	}
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}
	.timeline-quarters-grid {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
		max-width: 48rem;
		margin: 0 auto;
	}
	.quarter-row {
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: 0.25rem;
		align-items: stretch;

		.links.quarters {
			display: flex;
			height: 100%;
			a {
				flex: 1;
				justify-content: center;
				margin: 0;
			}
		}
		.links.months {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 0.25rem;
			width: 100%;
			a {
				margin: 0;
				font-size: calc(1.65rem * var(--dashboard-font-scale, 1));
				padding: 0.5rem 0.75rem;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
	.links {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
		width: 100%;
		a {
			text-decoration: none;
			padding: 0.5rem 1rem;
			border: none;
			border-radius: 12px;
			color: var(--text);
			font-size: calc(1.8rem * var(--dashboard-font-scale, 1));
			letter-spacing: 1px;
			font-weight: bold;
			text-align: center;
			min-width: 80px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 0.25rem;
		}

		&.collections-grid {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;
			a {
				border: none;
				min-width: unset;
				padding: 0;
				font-size: 1.15rem;
				margin: 0;
				flex-direction: row;
				gap: 0.5rem;
			}
			.separator {
				margin: 0;
				font-size: 1.15rem;
				color: var(--text-low);
				opacity: 0.3;
			}
		}
		&.years {
			gap: 0.25rem;
			a {
				font-size: calc(2rem * var(--dashboard-font-scale, 1));
				padding: 0.5rem 1rem;
			}
		}
	}
</style>
