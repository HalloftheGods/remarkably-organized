<script>
	import Label from '$atoms/Label.svelte';

	let { i = '📅', label = 'DATE' } = $props();
</script>

<Label {i}>{label}</Label>
<div
	class="content date-slashes flex items-end justify-evenly pb-[2px] text-[var(--outline-high,#ccc)] text-[1em] font-light">
	<span>/</span>
	<span>/</span>
</div>

<style lang="scss">
	.content {
		&.date-slashes {
			span {
				line-height: 1;
			}
		}
	}
</style>
