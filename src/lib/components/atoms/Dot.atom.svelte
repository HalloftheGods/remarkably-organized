<script lang="ts">
	interface Props {
		class?: string;
		style?: string;
		title?: string;
		[key: string]: any;
	}

	let { class: className = '', style = '', title = '', ...rest }: Props = $props();
</script>

<div class="dot {className}" {title} {style} {...rest}></div>

<style lang="scss">
	.dot {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background-color: var(--text);
		opacity: 0.6;
		display: inline-block;
	}
</style>
