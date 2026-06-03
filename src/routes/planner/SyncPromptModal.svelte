<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import PuzzleIcon from '~icons/fa/puzzle-piece';
	import PrintIcon from '~icons/fa/print';

	let {
		onSyncAndPrint = (() => {}) as () => void,
		onPrintAnyway = (() => {}) as () => void,
		onClose = (() => {}) as () => void,
		isSyncing = false,
	} = $props();

	function handleKeyup(event: KeyboardEvent) {
		if (event.key === 'Escape' && !isSyncing) {
			onClose();
		}
	}
</script>

<svelte:window on:keyup={handleKeyup} />

<div class="sync-prompt-modal">
	<div class="prompt" transition:scale={{ duration: 150 }}>
		<header>
			<h2>
				<PuzzleIcon style="vertical-align: -0.1em; opacity: 0.5; margin-right: 0.5rem;" />
				Unsynced Calendars
			</h2>
			<button class="close-btn" aria-label="Close" onclick={onClose} disabled={isSyncing}>
				✕
			</button>
		</header>

		<div class="content">
			<p>Hold on! You have calendar URLs configured that haven't been synced yet.</p>
			<p>Would you like to fetch your events before printing?</p>
		</div>

		<div class="actions">
			<button class="btn-secondary" onclick={onPrintAnyway} disabled={isSyncing}>
				Print Anyway
			</button>
			<button class="btn-primary" onclick={onSyncAndPrint} disabled={isSyncing}>
				{#if isSyncing}
					Syncing...
				{:else}
					<PrintIcon style="margin-right: 0.25rem;" /> Sync Now & Print
				{/if}
			</button>
		</div>
	</div>
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="modal-bg"
		role="presentation"
		transition:fade={{ duration: 150 }}
		onclick={() => {
			if (!isSyncing) onClose();
		}}>
	</div>
</div>

<style lang="scss">
	.sync-prompt-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 200;
		.prompt {
			background-color: var(--bg);
			color: var(--text);
			padding: 2.5rem;
			border-radius: var(--radius-5);
			box-shadow: var(--shadow-6);
			max-width: 450px;
			width: 90vw;
			position: relative;
			z-index: 201;
			border: 1px solid var(--outline);

			header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 1.5rem;
				h2 {
					margin: 0;
					font-size: 1.5rem;
					font-weight: 700;
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
					&:hover:not(:disabled) {
						background-color: var(--action);
						color: var(--action-text);
						border-color: var(--action);
					}
					&:disabled {
						opacity: 0.5;
						cursor: not-allowed;
					}
				}
			}

			.content {
				p {
					font-size: 1.05rem;
					line-height: 1.5;
					margin: 0 0 1rem;
					opacity: 0.9;
				}
			}

			.actions {
				display: flex;
				justify-content: flex-end;
				gap: 1rem;
				margin-top: 2rem;

				button {
					padding: 0.75rem 1.5rem;
					border-radius: var(--radius-3);
					font-weight: 600;
					cursor: pointer;
					transition: all 0.2s ease;
					font-size: 0.95rem;

					&:disabled {
						opacity: 0.6;
						cursor: not-allowed;
					}
				}

				.btn-secondary {
					background: transparent;
					border: 1px solid var(--outline);
					color: var(--text);
					&:hover:not(:disabled) {
						background: var(--bg-high);
					}
				}

				.btn-primary {
					background: var(--action);
					border: 1px solid var(--action);
					color: var(--action-text);
					&:hover:not(:disabled) {
						filter: brightness(1.1);
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
			z-index: 200;
			background-color: rgba(0, 0, 0, 0.5);
			backdrop-filter: blur(8px);
		}
		@media print {
			display: none !important;
		}
	}
</style>
