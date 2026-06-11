<script lang="ts">
	import { Button } from '$atoms';
	import type { PlannerSettings } from '$lib';
	import { fade } from 'svelte/transition';
	import PencilIcon from '~icons/fa/pencil';
	import FontPickerModal from '$organisms/wizard/FontPickerModal.organism.svelte';

	interface Props {
		settings: PlannerSettings;
	}

	let { settings }: Props = $props();

	let isOpen = $state(false);
	let pickerArea = $state<{ id: string, title: string, get: () => string, set: (v: string) => void } | null>(null);
	let initialStep = $state(0);

	const toggleOpen = () => {
		isOpen = !isOpen;
		if (!isOpen) pickerArea = null;
	};

	const categoryColors = ['#e879a0', '#3b82f6', '#8b5cf6', '#f59e0b', '#10b981'];

	const areas = [
		{ id: 'coverPage', title: 'Cover Page', get: () => settings.coverPage.font, set: (v: string) => settings.coverPage.font = v },
		{ id: 'topNav', title: 'Top Nav', get: () => settings.topNav.font, set: (v: string) => settings.topNav.font = v },
		{ id: 'sideNav', title: 'Side Nav', get: () => settings.sideNav.font, set: (v: string) => settings.sideNav.font = v },
		{ id: 'fontDisplay', title: 'Title Display', get: () => settings.design.fontDisplay, set: (v: string) => settings.design.fontDisplay = v },
		{ id: 'font', title: 'Body Text', get: () => settings.design.font, set: (v: string) => settings.design.font = v },
	];

	const openPickerAtCategory = (area: typeof areas[0], step: number) => {
		initialStep = step;
		pickerArea = area;
	};
</script>

<button
	class="font-trigger no-print"
	data-tooltip="Change Fonts"
	style="--fab-bg-1: {settings.design.colorBg || '#ffffff'}; --fab-bg-2: {settings.design.colorNavBg || '#f2f2f2'}; --fab-text: {settings.design.colorText || '#000000'};"
	onclick={toggleOpen}>
	<PencilIcon />
</button>

{#if isOpen && !pickerArea}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_interactive_supports_focus -->
	<div class="fixed inset-0 z-[100]" onclick={toggleOpen}></div>
	<div
		class="font-panel-container z-[101]"
		in:fade={{ duration: 150 }}
		out:fade={{ duration: 100 }}>
		<div class="font-panel">
			{#each areas as area}
				<div class="font-row">
					<div class="category-dots">
						{#each categoryColors as color, catIdx}
							<button
								class="cat-dot"
								style="background-color: {color};"
								onclick={() => openPickerAtCategory(area, catIdx)}
							></button>
						{/each}
					</div>
					<span class="font-preview" style="font-family: '{area.get()}', sans-serif;">
						{area.title}
					</span>
				</div>
			{/each}
		</div>
	</div>
{/if}

{#if pickerArea}
	<FontPickerModal 
		title={pickerArea.title} 
		selectedFont={pickerArea.get()} 
		{initialStep}
		onSelect={(fontName) => { pickerArea!.set(fontName); }}
		onClose={() => pickerArea = null}
	/>
{/if}

<style lang="scss">
	@keyframes pencil-gradient-shift {
		0% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
		100% { background-position: 0% 50%; }
	}

	.font-trigger {
		position: fixed;
		bottom: 1rem;
		left: 50%;
		transform: translateX(calc(-50% - 4.5rem));
		z-index: 50;
		background: linear-gradient(135deg, var(--fab-bg-1) 0%, var(--fab-bg-1) 50%, var(--fab-bg-2) 50%, var(--fab-bg-2) 100%);
		color: var(--fab-text);
		border: 1px solid color-mix(in srgb, var(--fab-text) 10%, transparent);
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
			transform: translateX(calc(-50% - 4.5rem)) scale(1.05) translateY(-2px);
			box-shadow: var(--shadow-5);
		}
		
		&::before {
			bottom: 100% !important;
			top: auto !important;
			left: 50% !important;
			right: auto !important;
			margin-bottom: 0.75rem !important;
			transform: translateX(-50%) translateY(0.25rem) scale(0.9) !important;
			transform-origin: bottom center !important;
		}
		
		&:hover::before {
			transform: translateX(-50%) translateY(0) scale(1) !important;
		}
	}

	.font-panel-container {
		position: fixed;
		bottom: 5.5rem;
		left: 50%;
		transform: translateX(calc(-50% - 4.5rem));
	}

	.font-panel {
		background-color: var(--bg);
		border: 1px solid var(--outline);
		border-radius: var(--radius-4);
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		box-shadow: var(--shadow-5);
		width: 280px;
	}

	.font-row {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		padding: 0.6rem 0.5rem;
		border-radius: var(--radius-3);
		transition: background-color 0.2s ease;

		&:hover {
			background-color: var(--bg-high);
		}

		.font-preview {
			font-size: 1.4rem;
			color: var(--text-high);
			line-height: 1;
			text-align: center;
			flex: 1;
		}
	}

	.category-dots {
		display: flex;
		flex-direction: column;
		gap: 3px;
		padding: 0 0.25rem;
	}

	.cat-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		border: none;
		padding: 0;
		cursor: pointer;
		opacity: 0.5;
		transition: all 0.2s ease;

		&:hover {
			opacity: 1;
			transform: scale(1.8);
		}
	}
</style>
