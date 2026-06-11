<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { getAvailablePageTemplates } from '$lib/data/templates';
	import LayoutIcon from '~icons/fa/th-large';

	interface Props {
		settings: PlannerSettings;
		currentHash: string;
		openTemplatePicker: (
			allowedTemplates: { name: string; value: string }[],
			onSelect: (value: string) => void,
			currentTemplate?: string,
		) => void;
	}

	let { settings, currentHash, openTemplatePicker }: Props = $props();

	type PlannerSection = 'year' | 'quarter' | 'month' | 'week' | 'day' | 'collection' | null;

	const isNotePage = $derived(/-pg\d+$/.test(currentHash));

	const matchedCollection = $derived.by(() => {
		if (!currentHash) return null;
		const hash = currentHash.toLowerCase();
		const isCollectionsEnabled = !settings.customCollections.disable;
		if (!isCollectionsEnabled) return null;
		return settings.collections.find((c) => hash.startsWith(c.id.toLowerCase())) ?? null;
	});

	const activeSection = $derived.by((): PlannerSection => {
		if (!currentHash) return null;
		const hash = currentHash.toLowerCase();

		if (matchedCollection) return 'collection';

		const matchesTimeframe = (id: string) => {
			const lowerId = id.toLowerCase();
			return hash === lowerId || hash.startsWith(lowerId + '-pg');
		};

		const isYearSection =
			!settings.yearPage.disable &&
			settings.years.some((y) => matchesTimeframe(y.id));
		if (isYearSection) return 'year';

		const isQuarterSection =
			!settings.quarterPage.disable &&
			settings.quarters.some((q) => matchesTimeframe(q.id));
		if (isQuarterSection) return 'quarter';

		const isWeekSection =
			!settings.weekPage.disable &&
			settings.weeks.some((w) => {
				const matchesId = matchesTimeframe(w.id);
				const matchesAltId = `${w.year}-w${w.weekSinceYear}`.toLowerCase() === hash;
				return matchesId || matchesAltId;
			});
		if (isWeekSection) return 'week';

		const isDaySection =
			!settings.dayPage.disable &&
			settings.days.some((d) => matchesTimeframe(d.id));
		if (isDaySection) return 'day';

		const isMonthSection =
			!settings.monthPage.disable &&
			settings.months.some((m) => matchesTimeframe(m.id));
		if (isMonthSection) return 'month';

		return null;
	});

	const sectionLabel = $derived.by(() => {
		if (activeSection === 'collection' && matchedCollection) return matchedCollection.name;
		const suffix = isNotePage ? ' Note Pages' : ' Views';
		if (activeSection === 'year') return 'Yearly' + suffix;
		if (activeSection === 'quarter') return 'Quarterly' + suffix;
		if (activeSection === 'month') return 'Monthly' + suffix;
		if (activeSection === 'week') return 'Weekly' + suffix;
		if (activeSection === 'day') return 'Daily' + suffix;
		return '';
	});

	const currentTemplate = $derived.by(() => {
		if (activeSection === 'collection' && matchedCollection) return matchedCollection.type;
		if (isNotePage) {
			if (activeSection === 'year') return settings.yearPage.notePagesTemplate;
			if (activeSection === 'quarter') return settings.quarterPage.notePagesTemplate;
			if (activeSection === 'month') return settings.monthPage.notePagesTemplate;
			if (activeSection === 'week') return settings.weekPage.notePagesTemplate;
			if (activeSection === 'day') return settings.dayPage.notePagesTemplate;
		}
		if (activeSection === 'year') return settings.yearPage.template;
		if (activeSection === 'quarter') return settings.quarterPage.template;
		if (activeSection === 'month') return settings.monthPage.template;
		if (activeSection === 'week') return settings.weekPage.template;
		if (activeSection === 'day') return settings.dayPage.template;
		return '';
	});

	const handleClick = () => {
		if (!activeSection) return;
		const location = activeSection === 'collection' ? 'collection' : activeSection;
		const availableTemplates = getAvailablePageTemplates(location);

		const applyTemplate = (value: string) => {
			if (activeSection === 'collection' && matchedCollection) {
				const idx = settings.collections.findIndex((c) => c.id === matchedCollection.id);
				const isValidIndex = idx !== -1;
				if (isValidIndex) settings.collections[idx].type = value;
				return;
			}
			if (isNotePage) {
				if (activeSection === 'year') settings.yearPage.notePagesTemplate = value;
				if (activeSection === 'quarter') settings.quarterPage.notePagesTemplate = value;
				if (activeSection === 'month') settings.monthPage.notePagesTemplate = value;
				if (activeSection === 'week') settings.weekPage.notePagesTemplate = value;
				if (activeSection === 'day') settings.dayPage.notePagesTemplate = value;
				return;
			}
			if (activeSection === 'year') settings.yearPage.template = value;
			if (activeSection === 'quarter') settings.quarterPage.template = value;
			if (activeSection === 'month') settings.monthPage.template = value;
			if (activeSection === 'week') settings.weekPage.template = value;
			if (activeSection === 'day') settings.dayPage.template = value;
		};

		openTemplatePicker(availableTemplates, applyTemplate, currentTemplate);
	};
</script>

{#if activeSection}
	<button
		class="template-picker-trigger no-print"
		data-tooltip="{sectionLabel} Templates"
		onclick={handleClick}>
		<LayoutIcon />
	</button>
{/if}

<style lang="scss">
	@keyframes template-gradient-shift {
		0% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
		100% { background-position: 0% 50%; }
	}

	.template-picker-trigger {
		position: fixed;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 50;
		background: linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%);
		background-size: 200% 200%;
		animation: template-gradient-shift 4s ease-in-out infinite;
		color: white;
		border: none;
		border-radius: 100%;
		width: 3.5rem;
		height: 3.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.35em;
		box-shadow: var(--shadow-4);
		cursor: pointer;
		transition: transform 0.2s ease, box-shadow 0.2s ease;

		&:hover {
			transform: translateX(-50%) scale(1.05) translateY(-2px);
			box-shadow: var(--shadow-5);
			color: white;
		}

		&::before {
			bottom: 100% !important;
			top: auto !important;
			left: 50% !important;
			right: auto !important;
			margin-bottom: 0.75rem !important;
			margin-top: 0 !important;
			margin-left: 0 !important;
			margin-right: 0 !important;
			transform: translateX(-50%) translateY(0.25rem) scale(0.9) !important;
			transform-origin: bottom center !important;
		}

		&:hover::before {
			transform: translateX(-50%) translateY(0) scale(1) !important;
		}
	}
</style>
