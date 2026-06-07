<script lang="ts">
	interface Props {
		class?: string;
		style?: string;
		checked?: boolean;
		[key: string]: any;
	}

	let { class: className = '', style = '', checked = $bindable(false), ...rest }: Props = $props();
</script>

<div class="switch {className}" {style}>
	<input type="checkbox" bind:checked {...rest} />
	<span class="slider"></span>
</div>

<style lang="scss">
	.switch {
		position: relative;
		display: inline-block;
		width: 34px;
		height: 20px;
		flex-shrink: 0;

		input {
			opacity: 0;
			width: 0;
			height: 0;

			&:checked + .slider {
				background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #a78bfa 100%);
				background-size: 200% auto;
				animation: toggle-gradient-shift 4s ease-in-out infinite;
			}

			&:focus + .slider {
				box-shadow: 0 0 1px var(--action);
			}

			&:checked + .slider:before {
				transform: translateX(14px);
			}
		}

		.slider {
			position: absolute;
			cursor: pointer;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: var(--outline);
			transition: 0.4s;
			border-radius: 20px;

			&:before {
				position: absolute;
				content: '';
				height: 14px;
				width: 14px;
				left: 3px;
				bottom: 3px;
				background-color: white;
				transition: 0.4s;
				border-radius: 50%;
			}
		}
	}

	@keyframes toggle-gradient-shift {
		0%,
		100% {
			background-position: 0% center;
		}
		50% {
			background-position: 100% center;
		}
	}
</style>
