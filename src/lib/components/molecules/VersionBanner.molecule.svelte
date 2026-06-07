<script lang="ts">
	import { Box, Text, Icon } from '$atoms';

	interface Props {
		version: string;
	}

	let { version }: Props = $props();
</script>

<Box class="version-banner">
	<Icon
		tag="svg"
		class="ribbon-wave"
		viewBox="0 0 60 30"
		preserveAspectRatio="none"
		xmlns="http://www.w3.org/2000/svg">
		<defs>
			<linearGradient id="gold-grad-left" x1="0%" y1="0%" x2="100%" y2="0%">
				<stop offset="0%" stop-color="#FCD34D" stop-opacity="0" />
				<stop offset="50%" stop-color="#F59E0B" stop-opacity="0.9" />
				<stop offset="100%" stop-color="#FBBF24" stop-opacity="1" />
			</linearGradient>
		</defs>
		<path
			d="M 0 15 Q 15 -5 30 15 T 60 15"
			fill="none"
			stroke="url(#gold-grad-left)"
			stroke-width="2.5" />
		<path
			d="M 0 20 Q 15 0 30 20 T 60 20"
			fill="none"
			stroke="url(#gold-grad-left)"
			stroke-width="1.5"
			opacity="0.8" />
	</Icon>

	<Text class="v26-text">v{version}</Text>

	<Icon
		tag="svg"
		class="ribbon-wave"
		viewBox="0 0 60 30"
		preserveAspectRatio="none"
		xmlns="http://www.w3.org/2000/svg">
		<defs>
			<linearGradient id="gold-grad-right" x1="0%" y1="0%" x2="100%" y2="0%">
				<stop offset="0%" stop-color="#FBBF24" stop-opacity="1" />
				<stop offset="50%" stop-color="#D97706" stop-opacity="0.9" />
				<stop offset="100%" stop-color="#FDE68A" stop-opacity="0" />
			</linearGradient>
		</defs>
		<path
			d="M 0 15 Q 15 35 30 15 T 60 15"
			fill="none"
			stroke="url(#gold-grad-right)"
			stroke-width="2.5" />
		<path
			d="M 0 10 Q 15 30 30 10 T 60 10"
			fill="none"
			stroke="url(#gold-grad-right)"
			stroke-width="1.5"
			opacity="0.8" />
	</Icon>
</Box>

<style lang="scss">
	:global(.version-banner) {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: 100%;
		margin-top: 1rem;

		:global(.ribbon-wave) {
			width: 60px;
			height: 30px;
			@include tablet {
				width: 80px;
				height: 40px;
			}
		}

		:global(.v26-text) {
			font-family: Georgia, 'Times New Roman', Times, serif;
			font-size: 2.25rem;
			font-weight: bold;
			color: white;
			text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
			@include tablet {
				font-size: 2.75rem;
				padding: 0 0.5rem;
			}
		}
	}
</style>
