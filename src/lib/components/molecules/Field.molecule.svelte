<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Box, Text } from '$atoms';

	interface Props {
		label: string;
		class?: string;
		style?: string;
		children?: Snippet;
		lineClass?: string;
		showEmoji?: boolean;
		emoji?: string;
		[key: string]: any;
	}

	let {
		label,
		class: className = '',
		style = '',
		children,
		lineClass = '',
		showEmoji = true,
		emoji = '',
		...rest
	}: Props = $props();
</script>

<Box class="field {className}" {style} {...rest}>
	<Box class="label">
		{#if showEmoji && emoji}
			<Text tag="span" class="emoji">{emoji}</Text>
		{/if}
		<Text tag="strong">{label}</Text>
	</Box>
	<Box class="content {lineClass}">
		{#if children}
			{@render children()}
		{/if}
	</Box>
</Box>

