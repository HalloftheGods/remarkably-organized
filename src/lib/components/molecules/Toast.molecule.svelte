<script lang="ts">
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { backOut, backIn } from 'svelte/easing';
	import { toastState, dismissToast } from '$state';

	function handleUndo(toast: (typeof toastState.list)[0]) {
		toast.onUndo?.();
		dismissToast(toast.id);
	}
</script>

{#if toastState.list.length}
	<section class="toast-group">
		{#each toastState.list as toast (toast.id)}
			<output
				class="relative max-w-[min(60ch,calc(90vw-6ch))] leading-tight box-content break-words flex items-center gap-3 px-5 py-3 rounded-2xl backdrop-blur-xl shadow-xl transition-all duration-300 border
					{toast.level === 'success' ? 'bg-emerald-500/60 border-emerald-400/50 text-white' : 
					toast.level === 'error' ? 'bg-rose-500/60 border-rose-400/50 text-white' : 
					'bg-white/60 dark:bg-neutral-800/60 border-white/40 dark:border-neutral-700/50 text-neutral-900 dark:text-white'}
					{toast.onUndo ? 'pointer-events-auto' : ''}"
				aria-live="polite"
				id="toast-{toast.id}"
				animate:flip={{ easing: backOut, duration: 300 }}
				in:scale|global={{ easing: backOut, duration: 300, start: 0.5 }}
				out:scale|global={{ easing: backIn, duration: 150, start: 0 }}>
				<span class="whitespace-pre-line text-center flex-1">{toast.message}</span>
				{#if toast.onUndo}
					<button 
						class="bg-white/20 border border-white/30 rounded-full px-3 py-1 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors hover:bg-white/35"
						onclick={() => handleUndo(toast)}>
						Undo
					</button>
				{/if}
			</output>
		{/each}
	</section>
{/if}

<style lang="scss">
	.toast-group {
		/* Structural Layout */
		position: fixed;
		z-index: 9999999;
		inset-block-end: 0;
		inset-inline: 0;
		padding-block-end: max(5vh, calc(var(--page-bottom-padding, 0px) + 1vh));
		display: grid;
		justify-items: center;
		justify-content: center;
		gap: 1vh;
		pointer-events: none;

		@media print {
			display: none !important;
		}
	}
</style>
