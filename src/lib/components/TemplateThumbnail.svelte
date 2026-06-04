<script lang="ts">
	import Page from './Page.svelte';
	import type { PlannerSettings } from '$lib/state/planner-settings.svelte';
	import type { PageTemplate } from '$lib/state/collection';

	let {
		templateValue = '',
		templateName = '',
		settings = {} as PlannerSettings,
		timeframe = {},
		disabled = false,
		isActive = false,
		isInteractive = true,
		onclick = undefined as ((e: MouseEvent | KeyboardEvent) => void) | undefined,
		children,
	} = $props<{
		templateValue: string;
		templateName: string;
		settings: PlannerSettings;
		timeframe: any;
		disabled?: boolean;
		isActive?: boolean;
		isInteractive?: boolean;
		onclick?: (e: MouseEvent | KeyboardEvent) => void;
		children?: import('svelte').Snippet;
	}>();
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_interactive_supports_focus -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	class="template-thumbnail"
	class:is-active={isActive}
	class:is-disabled={disabled}
	class:is-interactive={isInteractive && !disabled}
	role={isInteractive ? 'button' : 'figure'}
	tabindex={isInteractive && !disabled ? 0 : undefined}
	onclick={(e) => {
		if (isInteractive && !disabled && onclick) {
			onclick(e);
		}
	}}
	onkeydown={(e) => {
		if (isInteractive && !disabled && onclick && (e.key === 'Enter' || e.key === ' ')) {
			e.preventDefault();
			e.stopPropagation();
			onclick(e);
		}
	}}>
	<div
		class="page-render-wrapper"
		style:--bg-pdf={settings.design.colorBg || '#ffffff'}
		style:--nav-bg-pdf={settings.design.colorNavBg || '#f2f2f2'}
		style:--text={settings.design.colorText}
		style:--outline={settings.design.colorLines}
		style:--dots-color={settings.design.colorDots}
		style:font-size="1rem">
		<Page
			display={templateValue as PageTemplate}
			{settings}
			{timeframe}
			aspectRatio={1 / (settings.design.aspectRatio || 0.75)} />
	</div>
	<div class="thumbnail-footer">
		<span class="template-name">{templateName || 'Select Template'}</span>
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>

<style lang="scss">
	.template-thumbnail {
		border: 1px solid var(--outline);
		border-radius: var(--radius-3);
		overflow: hidden;
		isolation: isolate;
		transform: translateZ(0);
		transition: all 0.2s ease;
		background-color: var(--bg-high);
		width: 100%;
		display: flex;
		flex-direction: column;

		&.is-interactive {
			cursor: pointer;

			&:hover {
				border-color: var(--action);
				box-shadow: var(--shadow-3);
				transform: translateY(-2px) translateZ(0);
			}
		}

		&.is-active {
			border-color: var(--action);
			box-shadow:
				0 0 0 2px var(--action),
				var(--shadow-2);
			position: relative;
		}

		&.is-disabled {
			opacity: 0.5;
			cursor: not-allowed;
			
			&:hover {
				border-color: var(--outline);
				box-shadow: none;
				transform: none;
			}
		}

		.page-render-wrapper {
			width: 100%;
			aspect-ratio: 3 / 4;
			overflow: hidden;
			isolation: isolate;
			position: relative;
			background-color: var(--bg-pdf, #fff);
			-webkit-print-color-adjust: exact;
			print-color-adjust: exact;
			container-type: inline-size;

			:global(.page) {
				transform-origin: top left;
				width: 702px;
				height: 936px;
				transform: scale(calc(100cqw / 702px));
				pointer-events: none;
				position: absolute;
				top: 0;
				left: 0;
			}
		}

		.thumbnail-footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0.6rem 0.75rem;
			border-top: 1px solid var(--outline);
			background-color: var(--bg);
			min-height: 2.5rem;

			.template-name {
				font-size: 0.78rem;
				font-weight: 600;
				line-height: 1.2;
				color: var(--text);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
</style>
