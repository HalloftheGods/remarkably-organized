<script lang="ts">
	import RowInput from '$atoms/RowInput.svelte';
	import Label from './Label.svelte';
	let {
		i,
		label,
		children,
		class: cls,
	} = $props<{ i?: string; label?: string; children?: () => void; class?: string }>();
</script>

<div class="planner field">
	<Label {i}>
		{@render children?.()}
	</Label>
	<div class="line">
									<RowInput />
								</div>
</div>
