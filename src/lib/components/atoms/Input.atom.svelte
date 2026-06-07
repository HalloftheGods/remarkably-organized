<script lang="ts">
	interface Props {
		type?: string;
		class?: string;
		style?: string;
		value?: any;
		checked?: boolean;
		[key: string]: any;
	}

	let {
		type = 'text',
		class: className = '',
		style = '',
		value = $bindable(),
		checked = $bindable(),
		...rest
	}: Props = $props();
</script>

{#if type === 'checkbox'}
	<input type="checkbox" class={className} {style} bind:checked {...rest} />
{:else if type === 'radio'}
	<input type="radio" class={className} {style} bind:group={checked} {value} {...rest} />
{:else if type === 'number'}
	<input type="number" class={className} {style} bind:value {...rest} />
{:else if type === 'date'}
	<input type="date" class={className} {style} bind:value {...rest} />
{:else if type === 'color'}
	<input type="color" class={className} {style} bind:value {...rest} />
{:else}
	<input {type} class={className} {style} bind:value {...rest} />
{/if}
