<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { PRESETS, type Preset } from '$lib/data/presets';
	import { browser } from '$app/environment';
	import { PlannerSettings } from '$lib/state/planner-settings.svelte';
	import LoadingIcon from '~icons/eos-icons/bubble-loading';

	let {
		onClose = (() => {}) as () => void,
		onExport = (() => {}) as () => void,
		settings = {} as PlannerSettings,
	}: {
		onClose?: () => void;
		onExport?: () => void;
		settings?: PlannerSettings;
	} = $props();

	let isLoadingPreset = $state(false);
	let selectedPresetId = $state('');

	$effect(() => {
		const isBrowserContext = browser;
		if (isBrowserContext) {
			selectedPresetId = localStorage.getItem('ro_selected_preset_id') || 'standard';
		}
	});

	function handleKeyup(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
		}
	}

	function loadPreset(preset: Preset) {
		if (!browser) return;
		isLoadingPreset = true;

		setTimeout(() => {
			const url = new URL(document.location.href);

			const isStandardPreset = preset.id === 'standard';
			// If standard, just clear settings so defaults are loaded
			if (isStandardPreset) {
				url.searchParams.delete('settings');
			} else {
				url.searchParams.set('settings', JSON.stringify(preset.config));
			}

			// Remove presets parameter to prevent looping when reloading
			url.searchParams.delete('presets');

			// We replace the state cleanly without full reload
			window.history.replaceState({}, '', url);

			const defaultSettings = new PlannerSettings().serialize();
			settings.deserialize(defaultSettings);
			settings.deserialize(preset.config);

			localStorage.setItem('ro_selected_preset_id', preset.id);

			setTimeout(() => {
				isLoadingPreset = false;
				onClose();
			}, 400);
		}, 50);
	}
</script>

<svelte:window on:keyup={handleKeyup} />

<div class="presets-modal">
	<div class="modal-content" transition:scale={{ duration: 150 }}>
		{#if isLoadingPreset}
			<div class="loader-overlay" transition:fade={{ duration: 150 }}>
				<div class="loader-modal" transition:scale={{ duration: 150 }}>
					<LoadingIcon font-size="3rem" style="opacity: 0.5; margin: 0 auto 1rem;" />
					<h3>Loading Preset</h3>
					<p>Applying settings and generating planner spreads...</p>
				</div>
			</div>
		{/if}

		<header>
			<h2>Presets Library</h2>
			<button class="close-btn" aria-label="Close presets" onclick={onClose}>✕</button>
		</header>

		<p class="subtitle">
			Pick a starter planner to set up your layout instantly. <strong>
				Note: Loading a starter will replace your current design!
			</strong>
			<button class="link-btn" onclick={onExport}>
				Click here to save a backup of your work first.
			</button>
		</p>

		<div class="presets-grid">
			{#each PRESETS as preset}
				{@const isSelected = selectedPresetId === preset.id}
				<button
					class="preset-card tooltip-target"
					class:selected={isSelected}
					onclick={() => loadPreset(preset)}
					data-tooltip={preset.description}>
					<div class="preset-icon">{preset.icon}</div>
					<div class="preset-info">
						<h3>{preset.name}</h3>
					</div>
				</button>
			{/each}
		</div>
	</div>
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="modal-bg"
		role="presentation"
		transition:fade={{ duration: 150 }}
		onclick={onClose}>
	</div>
</div>

<style lang="scss">
	.presets-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;

		.modal-content {
			background-color: var(--bg);
			color: var(--text);
			padding: 2rem;
			border-radius: var(--radius-5);
			box-shadow: var(--shadow-6);
			max-width: min(calc(100vw - 2rem), 1000px);
			max-height: 85vh;
			width: 100%;
			position: relative;
			z-index: 100;
			overflow-y: scroll;
			overflow-x: hidden;
			border: 1px solid var(--outline);
			@include scrollbar;

			header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 0.5rem;
				position: sticky;
				top: -2rem;
				background-color: var(--bg);
				padding: 0 0 0.5rem;
				z-index: 1;
				h2 {
					margin: 0;
					font-size: 1.65rem;
					font-weight: 700;
				}
			}

			.subtitle {
				margin-top: 0;
				margin-bottom: 1.25rem;
				font-size: 0.9rem;
				opacity: 0.8;
				strong {
					color: var(--action);
				}
				.link-btn {
					background: none;
					border: none;
					color: var(--action);
					text-decoration: underline;
					cursor: pointer;
					padding: 0;
					font-size: inherit;
					font-family: inherit;
					opacity: 0.9;
					&:hover {
						opacity: 1;
					}
				}
			}

			.close-btn {
				width: 2rem;
				height: 2rem;
				padding: 0;
				border-radius: var(--radius-round);
				border: 1px solid var(--outline);
				background-color: var(--bg-high);
				color: var(--text);
				font-size: 0.9rem;
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 0.2s ease;
				flex-shrink: 0;
				&:hover {
					background-color: var(--action);
					color: var(--action-text);
					border-color: var(--action);
				}
			}

			.presets-grid {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: 1rem;
				margin-top: 1.5rem;

				@include desktop {
					grid-template-columns: repeat(6, 1fr);
				}
			}

			.preset-card {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				gap: 0.5rem;
				background: none;
				border: 1px solid transparent;
				padding: 1.25rem 0.5rem;
				border-radius: var(--radius-3);
				cursor: pointer;
				transition: all 0.2s ease;
				text-align: center;
				position: relative;

				.preset-icon {
					font-size: 2rem;
				}

				.preset-info {
					display: flex;
					flex-direction: column;

					h3 {
						margin: 0;
						font-size: 0.9rem;
						font-weight: 600;
						color: var(--text);
					}
				}

				&:hover {
					border-color: var(--outline);
					background: linear-gradient(135deg, transparent, var(--bg-high));
					transform: translateY(-2px);
					box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
				}

				&.selected {
					border-color: var(--action);
					background-color: var(--bg-high);
					box-shadow: 0 0 0 1px var(--action);
				}

				&.tooltip-target:nth-last-child(-n + 4) {
					&::after {
						top: auto;
						bottom: calc(100% + 8px);
						transform: translate(-50%, 4px) scale(0.95);
					}

					&:hover::after {
						transform: translate(-50%, 0) scale(1);
					}
				}
			}

			.tooltip-target {
				position: relative;

				&::after {
					content: attr(data-tooltip);
					position: absolute;
					top: calc(100% + 8px);
					left: 50%;
					transform: translate(-50%, -4px) scale(0.95);
					background: rgba(0, 0, 0, 0.85);
					backdrop-filter: blur(4px);
					color: #ffffff;
					padding: 0.5rem 0.75rem;
					border-radius: var(--radius-2);
					font-size: 0.75rem;
					font-weight: 500;
					line-height: 1.3;
					white-space: normal;
					width: max-content;
					max-width: 220px;
					pointer-events: none;
					opacity: 0;
					visibility: hidden;
					transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
					box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
					z-index: 999;
					text-align: center;
				}

				&:hover {
					z-index: 10;

					&::after {
						opacity: 1;
						visibility: visible;
						transform: translate(-50%, 0) scale(1);
					}
				}
			}

			.loader-overlay {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.4);
				backdrop-filter: blur(6px);
				display: flex;
				align-items: center;
				justify-content: center;
				z-index: 200;
				border-radius: var(--radius-5);

				.loader-modal {
					background-color: var(--bg);
					border: 1px solid var(--outline);
					border-radius: var(--radius-4);
					padding: 2rem;
					text-align: center;
					box-shadow: var(--shadow-6);
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 0.5rem;

					h3 {
						margin: 0;
						font-size: 1.25rem;
						font-weight: 600;
						color: var(--text);
					}

					p {
						margin: 0;
						font-size: 0.9rem;
						opacity: 0.8;
						color: var(--text-low);
					}
				}
			}
		}

		.modal-bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 0;
			background-color: rgba(0, 0, 0, 0.4);
			backdrop-filter: blur(8px);
		}
	}
</style>
