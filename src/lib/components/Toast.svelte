<script lang="ts">
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { backOut, backIn } from 'svelte/easing';
	import { toastState, dismissToast } from './toast.state.svelte';

	function handleUndo(toast: (typeof toastState.list)[0]) {
		toast.onUndo?.();
		dismissToast(toast.id);
	}
</script>

{#if toastState.list.length}
	<section class="toast-group">
		{#each toastState.list as toast (toast.id)}
			<output
				class="toast"
				class:success={toast.level === 'success'}
				class:error={toast.level === 'error'}
				class:has-undo={!!toast.onUndo}
				aria-live="polite"
				id="toast-{toast.id}"
				animate:flip={{ easing: backOut, duration: 300 }}
				in:scale|global={{ easing: backOut, duration: 300, start: 0.5 }}
				out:scale|global={{ easing: backIn, duration: 150, start: 0 }}>
				<span>{toast.message}</span>
				{#if toast.onUndo}
					<button class="undo-btn" onclick={() => handleUndo(toast)}>Undo</button>
				{/if}
			</output>
		{/each}
	</section>
{/if}

<style lang="scss">
	.toast-group {
		--layer: 10;
		--bg: var(--action);
		--text: var(--action-text);
		--shadow: var(--shadow-2);
		position: fixed;
		z-index: var(--layer);
		inset-block-end: 0;
		inset-inline: 0;
		padding-block-end: max(5vh, calc(var(--page-bottom-padding, 0px) + 1vh));
		display: grid;
		justify-items: center;
		justify-content: center;
		gap: 1vh;
		pointer-events: none;
	}

	.toast {
		background-color: var(--bg);
		color: var(--text);
		box-shadow: var(--shadow);
		border-radius: var(--radius-round);
		font-size: 1rem;
		max-width: min(60ch, calc(90vw - 6ch));
		padding: 0.75rem 3ch;
		line-height: 1.25;
		box-sizing: content-box;
		word-break: break-word;
		display: flex;
		align-items: center;
		gap: 1rem;

		&.has-undo {
			pointer-events: auto;
		}

		&.error {
			background-color: var(--error);
			color: var(--error-text);
		}
		&.success {
			background-color: var(--success);
			color: var(--success-text);
		}
	}

	.undo-btn {
		background: rgba(255, 255, 255, 0.2);
		color: inherit;
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: var(--radius-round);
		padding: 0.25rem 0.75rem;
		font-size: 0.85rem;
		font-weight: 600;
		cursor: pointer;
		white-space: nowrap;
		flex-shrink: 0;
		transition: all 0.15s ease;

		&:hover {
			background: rgba(255, 255, 255, 0.35);
		}
	}
</style>
