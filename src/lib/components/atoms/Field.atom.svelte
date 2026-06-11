<script lang="ts">
	import RowInput from '$atoms/RowInput.svelte';
	import Label from './Label.svelte';
	import type { Snippet } from 'svelte';
	let {
		i,
		label,
		children,
		content,
		class: cls,
	} = $props<{ i?: string; label?: string; children?: Snippet; content?: Snippet; class?: string }>();
</script>

<div class="planner field">
	<Label {i}>
		{@render children?.()}
	</Label>
	<div class="line">
		{#if content}
			{@render content()}
		{:else}
			<RowInput />
		{/if}
	</div>
</div>
