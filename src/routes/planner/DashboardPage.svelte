<script lang="ts">
	import { intersect, type PlannerSettings, getYearEmoji } from '$lib';

	let { settings = {} as PlannerSettings } = $props();
</script>

<article
	id="dashboard"
	use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}
	style:--dashboard-font-scale={settings.dashboardPage.fontSize}>
	<header>
		<h1
			style:font-family="'{settings.coverPage.font}'"
			style:font-size="5rem"
			style:font-weight="bold">
			{settings.dashboardPage.title || 'Dashboard'}
		</h1>
		{#if !settings.customCollections.disable && settings.collections.length > 0}
			<div class="links collections-grid">
				{#each settings.collections as collection, i}
					<a href="#{collection.id}">{collection.name}</a>
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
						<a href="#{year.id}">{settings.emojis.disable ? '' : getYearEmoji(year.year)} {year.nameLong}</a>
					{/each}
				</div>
			{/if}
			<div class="timeline-quarters-grid">
				{#each settings.quarters as quarter}
					<div class="quarter-row">
						{#if !settings.quarterPage.disable}
							<div class="links quarters">
								<a href="#{quarter.id}">
									{settings.emojis.quarters[quarter.quarter - 1] || ''}
									{quarter.nameShort}
								</a>
							</div>
						{/if}
						{#if !settings.monthPage.disable}
							<div class="links months">
								{#each settings.months.filter((m) => m.quarter === quarter.quarter && m.year === quarter.year) as month}
									<a href="#{month.id}">
										{settings.emojis.months[month.month - 1] || ''}
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
</article>

<style lang="scss">
	article {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding: 4rem 2rem;
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
		h2 {
			font-size: 1.5rem;
			margin: 0;
			text-transform: uppercase;
			letter-spacing: 0.2em;
			opacity: 0.6;
			color: var(--text);
			font-weight: normal;
		}
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
				justify-content: flex-start;
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
			text-align: left;
			min-width: 80px;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			gap: 0.5rem;
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
