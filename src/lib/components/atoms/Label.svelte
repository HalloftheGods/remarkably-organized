<script>
	import Emoji from './Emoji.svelte';

	const { i, children } = $props();
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
