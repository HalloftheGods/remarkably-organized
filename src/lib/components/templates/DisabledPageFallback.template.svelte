<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let {
		settings,
		pageType,
		isPreparingPrint = false,
		forceVisible = false,
	}: {
		settings: PlannerSettings;
		pageType:
			| 'dashboardPage'
			| 'coverPage'
			| 'yearPage'
			| 'quarterPage'
			| 'monthPage'
			| 'weekPage'
			| 'dayPage'
			| 'customCollections';
		isPreparingPrint?: boolean;
		forceVisible?: boolean;
	} = $props();

	const pageNames = {
		dashboardPage: 'Dashboard',
		coverPage: 'Cover Page',
		yearPage: 'Yearly Pages',
		quarterPage: 'Quarterly Pages',
		monthPage: 'Monthly Pages',
		weekPage: 'Weekly Pages',
		dayPage: 'Daily Pages',
		customCollections: 'Custom Collections',
	};

	function enablePage() {
		if (pageType === 'customCollections') {
			settings.customCollections.disable = false;
		} else {
			settings[pageType].disable = false;
		}
	}
</script>

<article
	class="planner page padded fallback-page visible {forceVisible ? 'force-visible' : ''}">
	<div class="fallback-content">
		<h2>{pageNames[pageType]} Disabled</h2>
		<p>This page is currently disabled in your planner settings.</p>
		<button class="enable-btn" onclick={enablePage}>
			Enable {pageNames[pageType]}
		</button>
	</div>
</article>

<style lang="scss">
	.planner.page.fallback-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
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

	.fallback-content {
		max-width: 400px;
		padding: 3rem 2rem;
		border: 1px solid var(--outline, #e2e8f0);
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.4);
		backdrop-filter: blur(4px);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}

	h2 {
		margin: 0;
		font-size: 2rem;
		font-family: var(--font-display);
		color: var(--text);
	}

	p {
		margin: 0;
		font-size: 1.1rem;
		font-family: var(--font-body);
		color: var(--text);
		opacity: 0.8;
	}

	.enable-btn {
		padding: 0.75rem 1.5rem;
		background: var(--text);
		color: var(--bg);
		border: none;
		border-radius: 8px;
		font-family: var(--font-display);
		font-size: 1.2rem;
		font-weight: 600;
		cursor: pointer;
		transition: transform 0.2s, opacity 0.2s;

		&:hover {
			opacity: 0.9;
			transform: scale(1.05);
		}
		&:active {
			transform: scale(0.95);
		}
	}
</style>
