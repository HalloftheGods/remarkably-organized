<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		hero: Snippet;
		preview: Snippet;
		toast?: Snippet;
		footer: Snippet;
	}

	let { hero, preview, toast, footer }: Props = $props();
</script>

<main class="main-landing">
	<div class="hero">
		{@render hero()}
	</div>
	<div class="preview">
		{@render preview()}
	</div>
	{#if toast}
		{@render toast()}
	{/if}
	{@render footer()}
</main>

<style>
	.main-landing {
		position: relative;
		min-height: 100vh;
		background-color: #00326e;
		background: radial-gradient(circle at center, #0056b3 0%, #00326e 100%);
		background-attachment: fixed;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		padding: 2rem;
		gap: 2rem;

		@media (min-width: 1024px) {
			padding: 4rem;
			gap: 4rem;
			flex-direction: row;
		}
	}

	.preview {
		@media (min-width: 1024px) {
			align-self: flex-end;
		}
	}
</style>
