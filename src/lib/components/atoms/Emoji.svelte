<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { getContext, type Snippet } from 'svelte';

	interface Props {
		settings?: PlannerSettings;
		size?: string;
		children?: Snippet;
	}

	let { settings = (getContext('settings') || {}) as PlannerSettings, size = '', children }: Props = $props();

	const isEmojiEnabled = $derived(!settings?.emojis?.disable);

	const emojiSizeMap: Record<string, string> = {
		s: 'text-sm',
		m: 'text-base',
		l: 'text-lg',
		xl: 'text-xl',
		xxl: 'text-2xl',
	};

	const tailwindSizeClass = $derived(emojiSizeMap[size] || size);
</script>

{#if isEmojiEnabled}
	<i class="emoji not-italic {tailwindSizeClass}">
		{@render children?.()}
	</i>
{/if}
