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

<main class="landing-main">
	{@render hero()}
	{@render preview()}
	{#if toast}
		{@render toast()}
	{/if}
	{@render footer()}
</main>

<style lang="scss">
	.landing-main {
		position: relative;
		min-height: 100vh;
		background-color: #00326e;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 2rem 1rem 10rem 1rem;
		gap: 2rem;
		background-image: linear-gradient(135deg, #012b67 0%, #01559d 50%, #0184ba 100%);

		@include desktop {
			flex-direction: row;
			gap: 4rem;
			padding: 0 2rem 6rem;
		}
	}
</style>

