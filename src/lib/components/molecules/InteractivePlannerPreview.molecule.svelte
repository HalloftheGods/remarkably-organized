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

	let { settings = {} as PlannerSettings } = $props<{
		settings: PlannerSettings;
	}>();

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
			currentHash = link.hash.substring(1).replace(/-pg\d+$/, '');
		}
	}

	const activeTemplateValue = $derived.by(() => {
		if (!currentHash) return '';
		const isYear = settings.years.some(
			(y: any) => y.id === currentHash || y.year.toString() === currentHash,
		);
		if (isYear) return settings.yearPage.template;

		const isQuarter = settings.quarters.some(
			(q: any) => q.id.toLowerCase() === currentHash.toLowerCase(),
		);
		if (isQuarter) return settings.quarterPage.template;

		const isMonth = settings.months.some((m: any) => m.id === currentHash);
		if (isMonth) return settings.monthPage.template;

		const isWeek = settings.weeks.some(
			(w: any) =>
				w.id.toLowerCase() === currentHash.toLowerCase() ||
				`${w.year}-w${w.weekSinceYear}`.toLowerCase() === currentHash.toLowerCase(),
		);
		if (isWeek) return settings.weekPage.template;

		const isDay = settings.days.some((d: any) => d.id === currentHash);
		if (isDay) return settings.dayPage.template;

		return '';
	});

	const currentTemplateName = $derived.by(() => {
		const templateVal = activeTemplateValue;
		if (!templateVal) return '';
		const matched = PAGE_TEMPLATES.find((t) => t.value === templateVal);
		return matched ? matched.name : '';
	});

	const previewTitle = $derived(
		currentTemplateName ? `Planner Preview • ${currentTemplateName}` : 'Planner Preview',
	);
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
					: 'side-nav-right'}"
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
				style:--text-cover={settings.design.colorCoverText || settings.design.colorText}>
				{#if currentHash}
					{#if settings.years.some((y: any) => y.id === currentHash || y.year.toString() === currentHash)}
						{#if !settings.yearPage.disable}
							<YearPage
								{settings}
								year={settings.years.find(
									(y: any) => y.id === currentHash || y.year.toString() === currentHash,
								)} />
						{:else}
							<div class="empty-state">Year view disabled</div>
						{/if}
					{:else if settings.quarters.some((q: any) => q.id.toLowerCase() === currentHash.toLowerCase())}
						{#if !settings.quarterPage.disable}
							<QuarterPage
								{settings}
								quarter={settings.quarters.find(
									(q: any) => q.id.toLowerCase() === currentHash.toLowerCase(),
								)} />
						{:else}
							<div class="empty-state">Quarter view disabled</div>
						{/if}
					{:else if settings.months.some((m: any) => m.id === currentHash)}
						{#if !settings.monthPage.disable}
							<MonthPage
								{settings}
								month={settings.months.find((m: any) => m.id === currentHash)} />
						{:else}
							<div class="empty-state">Month view disabled</div>
						{/if}
					{:else if settings.weeks.some((w: any) => w.id.toLowerCase() === currentHash.toLowerCase() || `${w.year}-w${w.weekSinceYear}`.toLowerCase() === currentHash.toLowerCase())}
						{#if !settings.weekPage.disable}
							<WeekPage
								{settings}
								week={settings.weeks.find(
									(w: any) =>
										w.id.toLowerCase() === currentHash.toLowerCase() ||
										`${w.year}-w${w.weekSinceYear}`.toLowerCase() ===
											currentHash.toLowerCase(),
								)} />
						{:else}
							<div class="empty-state">Week view disabled</div>
						{/if}
					{:else if settings.days.some((d: any) => d.id === currentHash)}
						{#if !settings.dayPage.disable}
							<DayPage
								{settings}
								day={settings.days.find((d: any) => d.id === currentHash)} />
						{:else}
							<div class="empty-state">Day view disabled</div>
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
				width: var(--doc-width) !important;
				height: var(--doc-height) !important;
				background-color: var(--bg-pdf);
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
