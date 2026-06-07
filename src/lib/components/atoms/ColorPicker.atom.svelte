<script lang="ts">
	interface Props {
		value?: string;
		class?: string;
		style?: string;
		full?: boolean;
		[key: string]: any;
	}

	let {
		value = $bindable('#000000'),
		class: className = '',
		style = '',
		full = false,
		...rest
	}: Props = $props();
</script>

<div class="color-picker-wrapper {className}" class:full {style}>
	<input type="color" bind:value {...rest} />
</div>

<style lang="scss">
	.color-picker-wrapper {
		width: 100%;
		height: 2.5rem;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		input[type='color'] {
			-webkit-appearance: none;
			appearance: none;
			border: none;
			width: 100%;
			height: 100%;
			cursor: pointer;
			background: none;
			padding: 0;
			margin: 0;

			&::-webkit-color-swatch-wrapper {
				padding: 0.25rem 0.5rem;
			}

			&::-webkit-color-swatch {
				border: 1px solid var(--outline);
				border-radius: var(--radius-2);
				box-shadow: var(--shadow-1);
			}
		}

		&.full {
			height: 1.5rem;
			input[type='color'] {
				&::-webkit-color-swatch-wrapper {
					padding: 0;
				}
				&::-webkit-color-swatch {
					border: 1px solid var(--outline);
					border-radius: 4px;
					box-shadow: none;
				}
			}
		}
	}
</style>
