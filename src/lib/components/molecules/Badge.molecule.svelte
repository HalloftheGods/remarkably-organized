<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		icon: any;
		text?: string;
		children?: Snippet;
	}

	let { class: className = '', icon: IconComp, text = '', children }: Props = $props();
</script>

<div class={className}>
	<IconComp />
	{#if children}
		{@render children()}
	{:else}
		<span>{text}</span>
	{/if}
</div>
