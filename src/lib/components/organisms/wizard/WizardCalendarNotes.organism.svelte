<script lang="ts">
	import { Box, Text, Input, Button } from '$atoms';
	import { fade } from 'svelte/transition';
	import { PAGE_TEMPLATES } from '$lib/data/templates';
	import { TemplateThumbnail } from '$molecules';
	import type { PlannerSettings } from '$state';

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

<Box class="step-content calendars-step" transition="fade" inDuration={150}>
	<Box class="step-title-row">
		<Text tag="h3" class="welcome-headline-gradient">Calendar Notes</Text>
		<Text tag="p" style="margin: 0;">
			Add optional note pages after each of your calendar views.
		</Text>
	</Box>

	<Box class="calendars-config">
		<Box class="template-previews">
			<Box class="preview-col">
				<span class="col-label">Year Notes</span>
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
				<Box class="thumb-caption">
					<Text
						tag="label"
						style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-size: 0.85rem; margin-top: 0.5rem;">
						Pages:
						<Input
							type="number"
							min="0"
							step="1"
							bind:value={settings.yearPage.notePagesAmount}
							style="width: 3.5rem; padding: 0.25rem;" />
					</Text>
				</Box>
			</Box>

			<Box class="preview-col">
				<span class="col-label">Quarter Notes</span>
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
				<Box class="thumb-caption">
					<Text
						tag="label"
						style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-size: 0.85rem; margin-top: 0.5rem;">
						Pages:
						<Input
							type="number"
							min="0"
							step="1"
							bind:value={settings.quarterPage.notePagesAmount}
							style="width: 3.5rem; padding: 0.25rem;" />
					</Text>
				</Box>
			</Box>

			<Box class="preview-col">
				<span class="col-label">Month Notes</span>
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
				<Box class="thumb-caption">
					<Text
						tag="label"
						style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-size: 0.85rem; margin-top: 0.5rem;">
						Pages:
						<Input
							type="number"
							min="0"
							step="1"
							bind:value={settings.monthPage.notePagesAmount}
							style="width: 3.5rem; padding: 0.25rem;" />
					</Text>
				</Box>
			</Box>

			<Box class="preview-col">
				<span class="col-label">Week Notes</span>
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
				<Box class="thumb-caption">
					<Text
						tag="label"
						style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-size: 0.85rem; margin-top: 0.5rem;">
						Pages:
						<Input
							type="number"
							min="0"
							step="1"
							bind:value={settings.weekPage.notePagesAmount}
							style="width: 3.5rem; padding: 0.25rem;" />
					</Text>
				</Box>
			</Box>

			<Box class="preview-col">
				<span class="col-label">Day Notes</span>
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
				<Box class="thumb-caption">
					<Text
						tag="label"
						style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-size: 0.85rem; margin-top: 0.5rem;">
						Pages:
						<Input
							type="number"
							min="0"
							step="1"
							bind:value={settings.dayPage.notePagesAmount}
							style="width: 3.5rem; padding: 0.25rem;" />
					</Text>
				</Box>
			</Box>
		</Box>
	</Box>
</Box>

<style lang="scss">
	:global(.welcome-headline-gradient) {
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
	:global(.step-title-row) {
		margin-bottom: 1.5rem;
		h3 {
			margin: 0 0 0.5rem 0;
		}
	}
	:global(.calendars-config) {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;

		:global(.template-previews) {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			gap: 8px;
			width: 100%;

			@media (max-width: 768px) {
				flex-wrap: wrap;
				justify-content: center;
				gap: 0.6rem;
			}

			:global(.preview-col) {
				width: calc(20% - 6px);
				max-width: calc(20% - 6px);
				flex-shrink: 0;
				display: flex;
				flex-direction: column;
				gap: 0.5rem;

				@media (max-width: 768px) {
					width: calc(33.333% - 0.4rem);
					max-width: calc(33.333% - 0.4rem);
				}

				> :global(.col-label) {
					font-size: 0.8rem;
					font-weight: 600;
					color: var(--text);
					text-align: center;
					display: block;
				}
			}
		}
	}
</style>
