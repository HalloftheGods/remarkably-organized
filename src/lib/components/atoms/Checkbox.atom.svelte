<script lang="ts">
	interface Props {
		class?: string;
		style?: string;
		checked?: boolean;
		[key: string]: any;
	}

	let {
		class: className = '',
		style = '',
		checked = $bindable(false),
		...rest
	}: Props = $props();
</script>

<input
	type="checkbox"
	class="planner checkbox {className}"
	bind:checked
	{style}
	{...rest} />
