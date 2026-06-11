<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { getContext, type Snippet } from 'svelte';

	interface Props {
		settings?: PlannerSettings;
		size?: string;
		children?: Snippet;
	}

	let { settings: settingsProp, size = '', children }: Props = $props();

	const contextSettings = getContext('settings') as PlannerSettings;
	const isEnabled = $derived(
		(settingsProp || contextSettings)?.emojis?.disable === false,
	);

	const emojiSizeMap: Record<string, string> = {
		s: 'text-sm',
		m: 'text-base',
		l: 'text-lg',
		xl: 'text-xl',
		xxl: 'text-2xl',
	};

	const tailwindSizeClass = $derived(emojiSizeMap[size] || size);
</script>

{#if isEnabled}
	<i class="emoji not-italic {tailwindSizeClass}">
		{@render children?.()}
	</i>
{/if}
