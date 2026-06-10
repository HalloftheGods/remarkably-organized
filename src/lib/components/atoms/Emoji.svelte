<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import type { Snippet } from 'svelte';

	interface Props {
		settings?: PlannerSettings;
		size?: string;
		children?: Snippet;
	}

	// size is not required - no default
	let { settings = {} as PlannerSettings, size, children }: Props = $props();
	const enableEmoji = $derived(!settings?.emojis?.disable);
</script>

{#if enableEmoji}
	<i class="emoji {size}">
		{@render children?.()}
	</i>
{/if}

<style>
	.emoji {
		&.s {
			font-size: var(--font-size-s);
		}
		&.m {
			font-size: var(--font-size-m);
		}
		&.l {
			font-size: var(--font-size-l);
		}
		&.xl {
			font-size: var(--font-size-xl);
		}
		&.xxl {
			font-size: var(--font-size-xxl);
		}
	}
</style>
