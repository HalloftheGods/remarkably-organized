<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Box, Text, Link } from '$atoms';

	interface Props {
		href?: string;
		class?: string;
		style?: string;
		date?: number | string;
		moonEmoji?: string;
		moonAsWatermark?: boolean;
		borderTop?: boolean;
		altRow?: boolean;
		dim?: boolean;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		href,
		class: className = '',
		style = '',
		date,
		moonEmoji = '',
		moonAsWatermark = false,
		borderTop = false,
		altRow = false,
		dim = false,
		children,
		...rest
	}: Props = $props();

	const Wrapper = $derived(href ? Link : Box);
	const classes = $derived(
		[
			'relative flex flex-col justify-start text-[1.05em] font-light border-l border-[var(--outline)] leading-none min-h-0 overflow-hidden no-underline text-inherit',
			className,
			borderTop ? 'border-t border-[var(--outline)]' : '',
			altRow ? 'bg-black/[0.015]' : '',
			dim ? 'opacity-20 pointer-events-none' : '',
		]
			.filter(Boolean)
			.join(' '),
	);
</script>

<Wrapper {href} class={classes} {style} {...rest}>
	{#if moonEmoji && moonAsWatermark}
		<Text
			tag="span"
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[2.5em] opacity-10 pointer-events-none z-0">
			{moonEmoji}
		</Text>
	{/if}
	<Box class="flex justify-end items-start mt-2 mr-2 mb-[-0.25rem] ml-2 relative z-10">
		{#if moonEmoji && !moonAsWatermark}
			<Text tag="span" class="mr-auto text-[1.25em] leading-none">{moonEmoji}</Text>
		{/if}
		{#if date !== undefined}
			<Text tag="span">{date}</Text>
		{/if}
	</Box>
	<Box class="flex flex-col gap-[0.35rem] justify-evenly flex-1 relative z-10">
		{#if children}
			{@render children()}
		{/if}
	</Box>
</Wrapper>
