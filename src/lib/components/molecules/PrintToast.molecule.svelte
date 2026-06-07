<script lang="ts">
	import Box from '$atoms/Box.atom.svelte';
	import Text from '$atoms/Text.atom.svelte';

	interface Props {
		city: string;
		country: string;
		position?: 'bottom' | 'center-right';
	}

	let { city, country, position = 'bottom' }: Props = $props();
</script>

<Box class="print-toast print-toast--{position}" transition="toast">
	<Box class="toast-icon">
		<Text>📍</Text>
	</Box>
	<Box class="toast-content">
		<Text tag="strong">Someone in {city}, {country}</Text>
		<Text tag="span">just printed a planner!</Text>
	</Box>
</Box>

<style lang="scss">
	:global(.print-toast) {
		position: fixed;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 12px;
		padding: 1rem 1.25rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		color: white;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
		z-index: 100;
		max-width: calc(100vw - 2rem);
		width: max-content;

		&.print-toast--bottom {
			bottom: 6rem;
			left: 50%;
			transform: translateX(-50%);

			@include tablet {
				left: auto;
				right: 3rem;
				bottom: 3rem;
				transform: none;
			}
		}

		&.print-toast--center-right {
			top: 50%;
			right: 1.5rem;
			bottom: auto;
			left: auto;
			transform: translateY(-50%);

			@include tablet {
				right: 3rem;
			}
		}

		:global(.toast-icon) {
			font-size: 1.5rem;
			animation: pulse-sparkle 2s infinite ease-in-out;
		}

		:global(.toast-content) {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;

			:global(strong) {
				font-size: 0.9rem;
				font-weight: 700;
				line-height: 1.2;
			}

			:global(span) {
				font-size: 0.8rem;
				opacity: 0.8;
			}
		}

		@include tablet {
			padding: 1.25rem 1.5rem;
			max-width: 350px;

			:global(.toast-content strong) {
				font-size: 1rem;
			}
			:global(.toast-content span) {
				font-size: 0.9rem;
			}
		}
	}

	@keyframes pulse-sparkle {
		0%,
		100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.1);
			opacity: 0.8;
		}
	}
</style>
