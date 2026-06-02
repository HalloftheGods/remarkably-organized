<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { PRESETS, type Preset } from '$lib/data/presets';
	import { browser } from '$app/environment';

	let { onClose = (() => {}) as () => void, onExport = (() => {}) as () => void } = $props();

	function handleKeyup(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
		}
	}

	function loadPreset(preset: Preset) {
		if (!browser) return;
		const url = new URL(document.location.href);
		
		// If standard, just clear settings so defaults are loaded
		if (preset.id === 'standard') {
			url.searchParams.delete('settings');
		} else {
			url.searchParams.set('settings', JSON.stringify(preset.config));
		}
		
		// We replace the state and reload the page to cleanly initialize everything
		window.history.replaceState({}, '', url);
		window.location.reload();
	}
</script>

<svelte:window on:keyup={handleKeyup} />

<div class="presets-modal">
	<div class="modal-content" transition:scale={{ duration: 150 }}>
		<header>
			<h2>Presets Library</h2>
			<button class="close-btn" aria-label="Close presets" onclick={onClose}>✕</button>
		</header>
		
		<p class="subtitle">Select a preset template to instantly configure your planner layout. <strong>Warning: Loading a preset will overwrite your current settings!</strong> <button class="link-btn" onclick={onExport}>Click here to download your current settings.</button></p>

		<div class="presets-grid">
			{#each PRESETS as preset}
				<button class="preset-card" onclick={() => loadPreset(preset)}>
					<div class="icon">{preset.icon}</div>
					<div class="details">
						<h3>{preset.name}</h3>
						<p>{preset.description}</p>
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
			padding: 2.5rem;
			border-radius: var(--radius-5);
			box-shadow: var(--shadow-6);
			max-width: min(calc(100vw - 2rem), 700px);
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
				top: -2.5rem;
				background-color: var(--bg);
				padding: 0 0 0.5rem;
				z-index: 1;
				h2 {
					margin: 0;
					font-size: 1.85rem;
					font-weight: 700;
				}
			}

			.subtitle {
				margin-top: 0;
				margin-bottom: 2rem;
				font-size: 0.95rem;
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
				width: 2.25rem;
				height: 2.25rem;
				padding: 0;
				border-radius: var(--radius-round);
				border: 1px solid var(--outline);
				background-color: var(--bg-high);
				color: var(--text);
				font-size: 1rem;
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
				grid-template-columns: 1fr;
				gap: 1rem;

				@include tablet {
					grid-template-columns: 1fr 1fr;
				}
			}

			.preset-card {
				background-color: var(--bg-high);
				border: 1px solid var(--outline);
				border-radius: var(--radius-3);
				padding: 1.5rem;
				display: flex;
				flex-direction: column;
				gap: 1rem;
				text-align: left;
				cursor: pointer;
				transition: all 0.2s ease;

				&:hover {
					transform: translateY(-2px);
					border-color: var(--action);
					box-shadow: var(--shadow-3);
				}

				.icon {
					font-size: 2.5rem;
					line-height: 1;
				}

				.details {
					h3 {
						margin: 0 0 0.5rem 0;
						font-size: 1.15rem;
						font-weight: 600;
					}
					p {
						margin: 0;
						font-size: 0.85rem;
						opacity: 0.8;
						line-height: 1.4;
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
