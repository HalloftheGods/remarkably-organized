<script lang="ts">
	import HomeIcon from '~icons/fa/home';
	import { stripEmojis, type PlannerSettings } from '$lib';
	import { PAGE_TEMPLATES as pageTemplates } from '$lib/data/templates';

	interface Props {
		settings: PlannerSettings;
		pageStats: {
			cover: number;
			dashboard: number;
			year: number;
			quarter: number;
			month: number;
			week: number;
			day: number;
			collections: number;
			total: number;
		};
		visits: number;
		created: number;
		printed: number;
		shared: number;
		timeCreatingSeconds: number;
	}

	let {
		settings,
		pageStats,
		visits,
		created,
		printed,
		shared,
		timeCreatingSeconds,
	}: Props = $props();

	const formatTime = (totalSeconds: number) => {
		if (!totalSeconds) return '0m';
		const days = Math.floor(totalSeconds / 86400);
		const hours = Math.floor((totalSeconds % 86400) / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);

		let parts = [];
		if (days > 0) parts.push(`${days}d`);
		if (hours > 0) parts.push(`${hours}h`);
		if (minutes > 0 || parts.length === 0) parts.push(`${minutes}m`);

		return parts.join(' ');
	};
</script>

<div class="desktop-stats-panel no-print">
	<h3>
		<a
			href="/"
			title="Back to Splash Page"
			style="display: inline-flex; align-items: center; justify-content: center;">
			<HomeIcon style="font-size: 0.65em; margin-bottom: 2px;" />
		</a>
		<span style="opacity: 0.5;">›</span>
		My Planner
	</h3>
	<ul>
		{#if pageStats.cover > 0}
			<li>
				<a href="#cover">Cover</a>
				<span>{pageStats.cover.toLocaleString()}</span>
			</li>
		{/if}
		{#if pageStats.dashboard > 0}
			<li>
				<a href="#dashboard">Dashboard</a>
				<span>{pageStats.dashboard.toLocaleString()}</span>
			</li>
		{/if}
		{#if pageStats.year > 0}
			<li>
				<a href="#{settings.years[0]?.id}">Yearly Views</a>
				<span>{pageStats.year.toLocaleString()}</span>
			</li>
		{/if}
		{#if pageStats.quarter > 0}
			<li>
				<a href="#{settings.quarters[0]?.id}">Quarterly Views</a>
				<span>{pageStats.quarter.toLocaleString()}</span>
			</li>
		{/if}
		{#if pageStats.month > 0}
			<li>
				<a href="#{settings.months[0]?.id}">Monthly Views</a>
				<span>{pageStats.month.toLocaleString()}</span>
			</li>
		{/if}
		{#if pageStats.week > 0}
			<li>
				<a href="#{settings.weeks[0]?.id}">Weekly Views</a>
				<span>{pageStats.week.toLocaleString()}</span>
			</li>
		{/if}
		{#if pageStats.day > 0}
			<li>
				<a href="#{settings.days[0]?.id}">Daily Views</a>
				<span>{pageStats.day.toLocaleString()}</span>
			</li>
		{/if}
		{#if pageStats.collections > 0}
			<li>
				<a href="#{settings.collections[0]?.id}">Collections</a>
				<span>{pageStats.collections.toLocaleString()}</span>
			</li>
			{#if settings.collections?.length > 0}
				<ul class="sub-collections">
					{#each settings.collections as collection}
						<li>
							<a href="#{collection.id}">
								{settings.emojis.disable ? stripEmojis(collection.name) : collection.name}
							</a>
							<span>
								{(
									(collection.numIndexPages ?? 0) +
									collection.total *
										Math.max(1, collection.numIndexPages ?? 1) *
										(collection.numPagesPerItem ?? 1)
								).toLocaleString()}
							</span>
						</li>
					{/each}
				</ul>
			{/if}
		{/if}
	</ul>
	<hr />
	<strong style="color: white;">
		<span>Total Pages</span>
		<span>{pageStats.total.toLocaleString()}</span>
	</strong>
</div>

<div class="global-stats-panel no-print">
	<h3>COMMUNITY</h3>
	<ul>
		<li>
			<span>Visitors</span>
			<span>{Math.floor(visits).toLocaleString()}</span>
		</li>
		<li>
			<span>Templates</span>
			<span>{pageTemplates.length.toLocaleString()}</span>
		</li>
		<li>
			<span>Planners</span>
			<span>{Math.floor(created).toLocaleString()}</span>
		</li>
		<li>
			<span>Prints</span>
			<span>{Math.floor(printed).toLocaleString()}</span>
		</li>
		<li>
			<span>Shares</span>
			<span>{Math.floor(shared).toLocaleString()}</span>
		</li>
	</ul>
	<hr />
	<strong style="color: white;">
		<span>Total Time</span>
		<span>{formatTime(timeCreatingSeconds)}</span>
	</strong>
</div>

<style lang="scss">
	.desktop-stats-panel,
	.global-stats-panel {
		display: none;
		position: fixed;
		top: 50%;
		transform: translateY(-50%);
		color: white;
		z-index: 5;
		pointer-events: none;
		width: 200px;

		@include desktop {
			display: block;
		}
	}

	.desktop-stats-panel {
		left: 2rem;
	}

	.global-stats-panel {
		right: 2rem;
		direction: rtl;

		li span:first-child,
		strong span:first-child {
			flex: 1;
		}

		li::before {
			margin-right: 0;
			margin-left: -0.25rem;
		}
	}

	.desktop-stats-panel,
	.global-stats-panel {
		h3 {
			font-size: 1.15rem;
			margin: 0 0 1rem;
			opacity: 0.9;
			color: white;
			border: none;
			text-transform: uppercase;
			letter-spacing: 1px;
			display: flex;
			align-items: center;
			gap: 0.6rem;
		}
		ul {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
			opacity: 0.8;
		}
		li {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 1rem;
			opacity: 0.7;
			margin-bottom: 0.25rem;
			font-size: 0.95rem;
			&::before {
				content: '•';
				font-size: 1.25rem;
				line-height: 0.5;
				opacity: 0.5;
				margin-right: -0.25rem;
			}
		}
		hr {
			border: none;
			border-top: 1px solid rgba(255, 255, 255, 0.2);
			margin: 1.25rem 0;
		}
		strong {
			font-size: 1.1rem;
			display: flex;
			justify-content: space-between;
			gap: 1rem;
		}
	}

	.desktop-stats-panel {
		h3 a {
			color: white;
			text-decoration: none;
			opacity: 0.6;
			transition: opacity 0.2s;
			pointer-events: auto;
			&:hover {
				opacity: 1;
			}
		}
		ul.sub-collections {
			padding-left: 1.5rem;
			gap: 0.5rem;
			margin-top: -0.25rem;
			li {
				font-size: 0.85rem;
				opacity: 0.6;
				&::before {
					content: '↳';
					font-size: 1rem;
					margin-right: -0.25rem;
				}
			}
		}
		li a {
			flex: 1;
			color: inherit;
			text-decoration: none;
			transition: opacity 0.2s;
			pointer-events: auto;
			&:hover {
				text-decoration: underline;
				opacity: 1;
			}
		}
	}
</style>
