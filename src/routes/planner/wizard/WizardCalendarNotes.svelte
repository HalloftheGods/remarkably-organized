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

<div class="step-content calendars-step" in:fade={{ duration: 150 }}>
	<div class="step-title-row">
		<h3 class="welcome-headline-gradient">Calendar Notes</h3>
		<p style="margin: 0;">Add optional note pages after each of your calendar views.</p>
	</div>

	<div class="calendars-config">
		<div class="template-previews">
			<div class="preview-col">
				<label>Year Notes</label>
				<TemplateThumbnail
					templateValue={settings.yearPage.notePagesTemplate}
					templateName={PAGE_TEMPLATES.find(
						(t) => t.value === settings.yearPage.notePagesTemplate,
					)?.name || 'Select Template'}
					{settings}
					timeframe={settings.years[0] || {}}
					disabled={settings.yearPage.disable || settings.yearPage.notePagesAmount === 0}
					scaleOnHover={true}
					hoverScale={2.1}
					onclick={() =>
						openTemplatePicker(
							getAvailablePageTemplates('year'),
							(val: any) => (settings.yearPage.notePagesTemplate = val),
							settings.yearPage.notePagesTemplate,
						)} />
				<div class="thumb-caption">
					<label
						style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-size: 0.85rem; margin-top: 0.5rem;">
						Pages:
						<input
							type="number"
							min="0"
							step="1"
							bind:value={settings.yearPage.notePagesAmount}
							style="width: 3.5rem; padding: 0.25rem;" />
					</label>
				</div>
			</div>

			<div class="preview-col">
				<label>Quarter Notes</label>
				<TemplateThumbnail
					templateValue={settings.quarterPage.notePagesTemplate}
					templateName={PAGE_TEMPLATES.find(
						(t) => t.value === settings.quarterPage.notePagesTemplate,
					)?.name || 'Select Template'}
					{settings}
					timeframe={settings.quarters[0] || {}}
					disabled={settings.quarterPage.disable ||
						settings.quarterPage.notePagesAmount === 0}
					scaleOnHover={true}
					hoverScale={2.1}
					onclick={() =>
						openTemplatePicker(
							getAvailablePageTemplates('quarter'),
							(val: any) => (settings.quarterPage.notePagesTemplate = val),
							settings.quarterPage.notePagesTemplate,
						)} />
				<div class="thumb-caption">
					<label
						style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-size: 0.85rem; margin-top: 0.5rem;">
						Pages:
						<input
							type="number"
							min="0"
							step="1"
							bind:value={settings.quarterPage.notePagesAmount}
							style="width: 3.5rem; padding: 0.25rem;" />
					</label>
				</div>
			</div>

			<div class="preview-col">
				<label>Month Notes</label>
				<TemplateThumbnail
					templateValue={settings.monthPage.notePagesTemplate}
					templateName={PAGE_TEMPLATES.find(
						(t) => t.value === settings.monthPage.notePagesTemplate,
					)?.name || 'Select Template'}
					{settings}
					timeframe={settings.months[0] || {}}
					disabled={settings.monthPage.disable ||
						settings.monthPage.notePagesAmount === 0}
					scaleOnHover={true}
					hoverScale={2.1}
					onclick={() =>
						openTemplatePicker(
							getAvailablePageTemplates('month'),
							(val: any) => (settings.monthPage.notePagesTemplate = val),
							settings.monthPage.notePagesTemplate,
						)} />
				<div class="thumb-caption">
					<label
						style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-size: 0.85rem; margin-top: 0.5rem;">
						Pages:
						<input
							type="number"
							min="0"
							step="1"
							bind:value={settings.monthPage.notePagesAmount}
							style="width: 3.5rem; padding: 0.25rem;" />
					</label>
				</div>
			</div>

			<div class="preview-col">
				<label>Week Notes</label>
				<TemplateThumbnail
					templateValue={settings.weekPage.notePagesTemplate}
					templateName={PAGE_TEMPLATES.find(
						(t) => t.value === settings.weekPage.notePagesTemplate,
					)?.name || 'Select Template'}
					{settings}
					timeframe={settings.weeks[0] || {}}
					disabled={settings.weekPage.disable || settings.weekPage.notePagesAmount === 0}
					scaleOnHover={true}
					hoverScale={2.1}
					onclick={() =>
						openTemplatePicker(
							getAvailablePageTemplates('week'),
							(val: any) => (settings.weekPage.notePagesTemplate = val),
							settings.weekPage.notePagesTemplate,
						)} />
				<div class="thumb-caption">
					<label
						style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-size: 0.85rem; margin-top: 0.5rem;">
						Pages:
						<input
							type="number"
							min="0"
							step="1"
							bind:value={settings.weekPage.notePagesAmount}
							style="width: 3.5rem; padding: 0.25rem;" />
					</label>
				</div>
			</div>

			<div class="preview-col">
				<label>Day Notes</label>
				<TemplateThumbnail
					templateValue={settings.dayPage.notePagesTemplate}
					templateName={PAGE_TEMPLATES.find(
						(t) => t.value === settings.dayPage.notePagesTemplate,
					)?.name || 'Select Template'}
					{settings}
					timeframe={settings.days[0] || {}}
					disabled={settings.dayPage.disable || settings.dayPage.notePagesAmount === 0}
					scaleOnHover={true}
					hoverScale={2.1}
					onclick={() =>
						openTemplatePicker(
							getAvailablePageTemplates('day'),
							(val: any) => (settings.dayPage.notePagesTemplate = val),
							settings.dayPage.notePagesTemplate,
						)} />
				<div class="thumb-caption">
					<label
						style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-size: 0.85rem; margin-top: 0.5rem;">
						Pages:
						<input
							type="number"
							min="0"
							step="1"
							bind:value={settings.dayPage.notePagesAmount}
							style="width: 3.5rem; padding: 0.25rem;" />
					</label>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.welcome-headline-gradient {
		background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #a78bfa 100%);
		background-size: 200% auto;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: gradient-shift 4s ease-in-out infinite;
	}
	@keyframes gradient-shift {
		0%,
		100% {
			background-position: 0% center;
		}
		50% {
			background-position: 100% center;
		}
	}
	.step-title-row {
		margin-bottom: 1.5rem;
		h3 {
			margin: 0 0 0.5rem 0;
		}
	}
	.calendars-config {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;

		.template-previews {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			gap: 8px;
			width: 100%;

			.preview-col {
				width: calc(20% - 6px);
				max-width: calc(20% - 6px);
				flex-shrink: 0;
				display: flex;
				flex-direction: column;
				gap: 0.5rem;

				> label {
					font-size: 0.8rem;
					font-weight: 600;
					color: var(--text);
					text-align: center;
				}
			}
		}
	}
</style>
