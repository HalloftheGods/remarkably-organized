<script lang="ts">
	import { fade } from 'svelte/transition';
	import { PAGE_TEMPLATES } from '$lib/data/templates';
	import TemplateThumbnail from '$lib/components/TemplateThumbnail.svelte';
	import type { PlannerSettings } from '$lib/state/planner-settings.svelte';

	let {
		settings,
		openTemplatePicker = ((
			_allowed: any[],
			_onSelect: Function,
			_curr: string,
		) => {}) as Function,
		getAvailablePageTemplates = ((_loc: string) => PAGE_TEMPLATES) as Function,
	} = $props<{
		settings: PlannerSettings;
		openTemplatePicker: Function;
		getAvailablePageTemplates: Function;
	}>();
</script>

<div class="step-content templates-step" in:fade={{ duration: 150 }}>
	<div class="templates-config">
		<div class="template-previews">
			<div class="preview-col">
				<TemplateThumbnail
					templateValue={settings.monthPage.template}
					templateName={PAGE_TEMPLATES.find(
						(t) => t.value === settings.monthPage.template,
					)?.name || 'Select Template'}
					{settings}
					timeframe={settings.months[0] || {}}
					disabled={settings.monthPage.disable}
					onclick={() =>
						openTemplatePicker(
							getAvailablePageTemplates('month'),
							(val: any) => (settings.monthPage.template = val),
							settings.monthPage.template,
						)} />
			</div>

			<div class="preview-col">
				<TemplateThumbnail
					templateValue={settings.weekPage.template}
					templateName={PAGE_TEMPLATES.find((t) => t.value === settings.weekPage.template)
						?.name || 'Select Template'}
					{settings}
					timeframe={settings.weeks[0] || {}}
					disabled={settings.weekPage.disable}
					onclick={() =>
						openTemplatePicker(
							getAvailablePageTemplates('week'),
							(val: any) => (settings.weekPage.template = val),
							settings.weekPage.template,
						)} />
			</div>

			<div class="preview-col">
				<TemplateThumbnail
					templateValue={settings.dayPage.template}
					templateName={PAGE_TEMPLATES.find((t) => t.value === settings.dayPage.template)
						?.name || 'Select Template'}
					{settings}
					timeframe={settings.days[0] || {}}
					disabled={settings.dayPage.disable}
					onclick={() =>
						openTemplatePicker(
							getAvailablePageTemplates('day'),
							(val: any) => (settings.dayPage.template = val),
							settings.dayPage.template,
						)} />
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.templates-config {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;

		.template-previews {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			gap: 4px;
			width: 100%;

			.preview-col {
				width: calc(33.333% - 4px);
				max-width: calc(33.333% - 4px);
				flex-shrink: 0;
				display: flex;
				flex-direction: column;
				gap: 0.5rem;

				label {
					font-size: 0.8rem;
					font-weight: 600;
					color: var(--text);
					text-align: center;
				}
			}
		}
	}
</style>
