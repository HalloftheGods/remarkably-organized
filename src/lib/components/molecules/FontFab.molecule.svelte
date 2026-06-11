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

	const toggleOpen = () => {
		isOpen = !isOpen;
		if (!isOpen) pickerArea = null;
	};

	const areas = [
		{ id: 'coverPage', title: 'Cover Page', get: () => settings.coverPage.font, set: (v: string) => settings.coverPage.font = v },
		{ id: 'topNav', title: 'Top Nav', get: () => settings.topNav.font, set: (v: string) => settings.topNav.font = v },
		{ id: 'sideNav', title: 'Side Nav', get: () => settings.sideNav.font, set: (v: string) => settings.sideNav.font = v },
		{ id: 'fontDisplay', title: 'Title Display', get: () => settings.design.fontDisplay, set: (v: string) => settings.design.fontDisplay = v },
		{ id: 'font', title: 'Body Text', get: () => settings.design.font, set: (v: string) => settings.design.font = v },
	];
</script>

<button
	class="font-trigger no-print"
	data-tooltip="Change Fonts"
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
				<button 
					class="font-item"
					onclick={() => pickerArea = area}
				>
					<span class="area-title">{area.title}</span>
					<span class="font-preview" style="font-family: '{area.get()}', sans-serif;">
						Abc
					</span>
				</button>
			{/each}
		</div>
	</div>
{/if}

{#if pickerArea}
	<FontPickerModal 
		title={pickerArea.title} 
		selectedFont={pickerArea.get()} 
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
		transform: translateX(calc(-50% + 4.5rem));
		z-index: 50;
		background: linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #fb923c 100%);
		background-size: 200% 200%;
		animation: pencil-gradient-shift 4s ease-in-out infinite;
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
			transform: translateX(calc(-50% + 4.5rem)) scale(1.05) translateY(-2px);
			box-shadow: var(--shadow-5);
			color: white;
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
		transform: translateX(calc(-50% + 4.5rem));
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
		width: 220px;
	}

	.font-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1rem;
		background: transparent;
		border: none;
		border-radius: var(--radius-3);
		color: var(--text);
		cursor: pointer;
		transition: background-color 0.2s ease;

		&:hover, &:focus-visible {
			background-color: var(--bg-high);
			outline: none;
		}

		.area-title {
			font-size: 0.9rem;
			font-weight: 600;
			color: var(--text-low);
			text-align: left;
		}

		.font-preview {
			font-size: 1.5rem;
			color: var(--text-high);
			line-height: 1;
		}
	}
</style>
