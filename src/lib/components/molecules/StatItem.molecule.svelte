<script lang="ts">
	import { Box, Text } from '$atoms';

	interface Props {
		number: string | number;
		label: string;
	}

	let { number, label }: Props = $props();
</script>

<Box class="stat-item">
	<Text class="stat-number">{number}</Text>
	<Text class="stat-label">{label}</Text>
</Box>

<style lang="scss">
	:global(.stat-item) {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: white;

		:global(.stat-number) {
			font-family:
				'Inter',
				system-ui,
				-apple-system,
				sans-serif;
			font-size: 1.5rem;
			font-weight: 900;
			text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
			background: linear-gradient(135deg, #ffffff, #cbd5e1);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
			white-space: nowrap;

			@include tablet {
				font-size: 2.25rem;
			}
		}

		:global(.stat-label) {
			font-size: 0.7rem;
			text-transform: uppercase;
			letter-spacing: 1px;
			opacity: 0.8;
			margin-top: 0.25rem;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;

			@include tablet {
				font-size: 0.85rem;
			}
		}
	}
</style>
