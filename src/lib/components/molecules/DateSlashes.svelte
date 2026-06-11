<script>
	import Label from '$atoms/Label.svelte';
	import RowInput from '$atoms/RowInput.svelte';

	let { i = '📅', label = 'DATE' } = $props();
</script>

<Label {i}>{label}</Label>
<div
	class="content date-slashes flex items-end justify-evenly pb-[2px] text-[var(--outline-high,#ccc)] text-[1em] font-light">
	<RowInput />
	<span>/</span>
	<RowInput />
	<span>/</span>
	<RowInput />
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
