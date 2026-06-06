<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		class?: string;
		style?: string;
		[key: string]: any;
	}

	let { src, alt, class: className = '', style = '', ...rest }: Props = $props();
</script>

<img {src} {alt} class={className} {style} {...rest} />
