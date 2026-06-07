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
	<Text tag="h3" class="welcome-headline-gradient">Calendar Views</Text>
	<Text tag="p">Select templates for each of your primary calendar spreads.</Text>

	<Box class="calendars-config">
		<Box class="template-previews">
			<Box class="preview-col">
				<TemplateThumbnail
					templateValue={settings.yearPage.template}
					templateName={PAGE_TEMPLATES.find((t) => t.value === settings.yearPage.template)
						?.name || 'Select Template'}
					{settings}
					timeframe={settings.years[0] || {}}
					disabled={settings.yearPage.disable}
					scaleOnHover={true}
					hoverScale={2.1}
					onclick={() =>
						openTemplatePicker(
							getAvailablePageTemplates('year'),
							(val: any) => (settings.yearPage.template = val),
							settings.yearPage.template,
						)} />
			</Box>

			<Box class="preview-col">
				<TemplateThumbnail
					templateValue={settings.quarterPage.template}
					templateName={PAGE_TEMPLATES.find(
						(t) => t.value === settings.quarterPage.template,
					)?.name || 'Select Template'}
					{settings}
					timeframe={settings.quarters[0] || {}}
					disabled={settings.quarterPage.disable}
					scaleOnHover={true}
					hoverScale={2.1}
					onclick={() =>
						openTemplatePicker(
							getAvailablePageTemplates('quarter'),
							(val: any) => (settings.quarterPage.template = val),
							settings.quarterPage.template,
						)} />
			</Box>

			<Box class="preview-col">
				<TemplateThumbnail
					templateValue={settings.monthPage.template}
					templateName={PAGE_TEMPLATES.find(
						(t) => t.value === settings.monthPage.template,
					)?.name || 'Select Template'}
					{settings}
					timeframe={settings.months[0] || {}}
					disabled={settings.monthPage.disable}
					scaleOnHover={true}
					hoverScale={2.1}
					onclick={() =>
						openTemplatePicker(
							getAvailablePageTemplates('month'),
							(val: any) => (settings.monthPage.template = val),
							settings.monthPage.template,
						)} />
			</Box>

			<Box class="preview-col">
				<TemplateThumbnail
					templateValue={settings.weekPage.template}
					templateName={PAGE_TEMPLATES.find((t) => t.value === settings.weekPage.template)
						?.name || 'Select Template'}
					{settings}
					timeframe={settings.weeks[0] || {}}
					disabled={settings.weekPage.disable}
					scaleOnHover={true}
					hoverScale={2.1}
					onclick={() =>
						openTemplatePicker(
							getAvailablePageTemplates('week'),
							(val: any) => (settings.weekPage.template = val),
							settings.weekPage.template,
						)} />
			</Box>

			<Box class="preview-col">
				<TemplateThumbnail
					templateValue={settings.dayPage.template}
					templateName={PAGE_TEMPLATES.find((t) => t.value === settings.dayPage.template)
						?.name || 'Select Template'}
					{settings}
					timeframe={settings.days[0] || {}}
					disabled={settings.dayPage.disable}
					scaleOnHover={true}
					hoverScale={2.1}
					onclick={() =>
						openTemplatePicker(
							getAvailablePageTemplates('day'),
							(val: any) => (settings.dayPage.template = val),
							settings.dayPage.template,
						)} />
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
			}
		}
	}
</style>
