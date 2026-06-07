<script lang="ts">
	interface Props {
		size?: 'small' | 'medium' | 'large';
		class?: string;
	}

	let { size = 'medium', class: className = '' }: Props = $props();
</script>

<div
	class="dots {className}"
	style:--dot-distance={size === 'small'
		? '20px'
		: size === 'medium'
			? '24px'
			: '30px'}>
	<div class="dots-small"></div>
	<div class="dots-medium"></div>
	<div class="dots-large"></div>
</div>

<style lang="scss">
	.dots {
		display: grid;
		height: 100%;
		width: 100%;
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
		--dot-position: 8px;
		--dot-distance: 24px;
		--dot-large-size: 1px;
		--dot-medium-size: 1px;
		--dot-small-size: 1px;
		--dot-large-color: rgba(0, 0, 0, 0.35);
		--dot-medium-color: rgba(0, 0, 0, 0.35);
		--dot-small-color: var(--dots-color, rgba(0, 0, 0, 0.9));
		@supports (color: oklch(from var(--dots-color) calc(l - 0.15) c h)) {
			--dot-small-color: oklch(
				from var(--dots-color) min(0.9, max(0, calc(l + 0.25))) c h
			);
			--dot-medium-color: oklch(
				from var(--dots-color) min(0.8, max(0, calc(l - 0.03))) c h
			);
			--dot-large-color: oklch(
				from var(--dots-color) min(0.75, max(0, calc(l - 0.2))) c h
			);
		}
		.dots-small {
			grid-column: 1 / 1;
			grid-row: 1 / 1;
			background-image: radial-gradient(
				circle at 1px 1px,
				var(--dot-small-color) var(--dot-small-size),
				transparent var(--dot-small-size)
			);
			background-position: var(--dot-position) 0px;
			background-size: var(--dot-distance) var(--dot-distance);
			height: 100%;
			width: 100%;
		}
		.dots-medium {
			grid-column: 1 / 1;
			grid-row: 1 / 1;
			background-image: radial-gradient(
				circle at 1px 1px,
				var(--dot-medium-color) var(--dot-medium-size),
				transparent var(--dot-large-size)
			);
			background-position: var(--dot-position) 0px;
			background-size: calc(var(--dot-distance) * 5) calc(var(--dot-distance) * 5);
			height: 100%;
			width: 100%;
		}
		.dots-large {
			grid-column: 1 / 1;
			grid-row: 1 / 1;
			background-image: radial-gradient(
				circle at 1px 1px,
				var(--dot-large-color) var(--dot-large-size),
				transparent var(--dot-large-size)
			);
			background-position: var(--dot-position) 0px;
			background-size: calc(var(--dot-distance) * 10) calc(var(--dot-distance) * 10);
			height: 100%;
			width: 100%;
		}
	}
</style>
