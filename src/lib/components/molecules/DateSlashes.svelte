<script>
	import Label from '$atoms/Label.svelte';

	let { i = '📅', label = 'DATE' } = $props();
</script>

<Label {i}>{label}</Label>
<div class="content date-slashes">
	<span>/</span>
	<span>/</span>
</div>

<style lang="scss">
	@use '$lib/styles/app.css';

	.content {
		display: flex;
		&.date-slashes {
			justify-content: space-evenly;
			@apply flex items-end pb-[2px] text-[var(--outline-high,#ccc)] text-[1em] font-light;

			span {
				line-height: 1;
			}
		}
	}
</style>
