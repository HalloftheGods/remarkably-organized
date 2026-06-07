<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		style?: string;
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		class: className = '',
		style = '',
		type = 'button',
		disabled = false,
		children,
		...rest
	}: Props = $props();
</script>

<button {type} class={className} {style} {disabled} {...rest}>
	{#if children}
		{@render children()}
	{/if}
</button>
