<script lang="ts">
	import Emoji from './Emoji.svelte';
	import type { Snippet } from 'svelte';

	const { i, children }: { i: string, children?: Snippet } = $props();
</script>

<label>
	<Emoji size="m">{i}</Emoji>
	{@render children?.()}
</label>

<style lang="scss">
	label {
		font-style: normal;
	}
</style>
