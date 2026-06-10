<script lang="ts">
	import Label from './Label.svelte';
	let {
		i,
		label,
		children,
		class: cls,
	} = $props<{ i?: string; label?: string; children?: () => void; class?: string }>();
</script>

<div class="planner field {cls}">
	<Label {i}>{label}</Label>
	{@render children?.()}
</div>

<style>
	@use '$lib/styles/tokens.css';
	.field {
		.title {
			@apply flex-2;
		}

		.date {
			@apply flex-1;
		}
	}
</style>
