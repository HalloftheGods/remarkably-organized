<script lang="ts">
	import { Text, Input } from '$atoms';

	let {
		label = '',
		value = $bindable(0),
		min = 0,
		max = undefined,
		step = 1,
		placeholder = '',
	} = $props<{
		label: string;
		value: number;
		min?: number;
		max?: number;
		step?: number;
		placeholder?: string;
	}>();
</script>

<Text
	tag="label"
	style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; font-size: 0.85rem;">
	{label}
	<Input
		type="number"
		{placeholder}
		{min}
		{max}
		{step}
		bind:value
		style="width: 3rem; padding: 0.25rem;" />
</Text>
