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

<div class="planner checkbox {className}" class:checked {style} {...rest}></div>

<style lang="scss">
	.checkbox {
		// width: 1rem;
		// height: 1rem;
		// border: 1.5px solid var(--outline-high);
		// border-radius: 2px;
		// display: inline-block;
		// vertical-align: middle;
		// flex-shrink: 0;

		&.checked {
			background-color: var(--outline-high);
			position: relative;
			&::after {
				content: '✓';
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				color: white;
				font-size: 0.7rem;
			}
		}
	}
</style>
