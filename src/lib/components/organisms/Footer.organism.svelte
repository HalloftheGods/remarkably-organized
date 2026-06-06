<script lang="ts">
	import Box from '$lib/components/atoms/Box.atom.svelte';
	import Text from '$lib/components/atoms/Text.atom.svelte';
	import Link from '$lib/components/atoms/Link.atom.svelte';
	import Divider from '$lib/components/atoms/Divider.atom.svelte';

	interface Props {
		fullVersion: string;
		handleSupportTicketClick: () => void;
		handleHallOfTheGodsClick: () => void;
		handleMyCompassClick: () => void;
	}

	let {
		fullVersion,
		handleSupportTicketClick,
		handleHallOfTheGodsClick,
		handleMyCompassClick,
	}: Props = $props();

	const currentYear = new Date().getFullYear();
</script>

<Box tag="footer" class="app-footer">
	<Box class="footer-content">
		<Link
			href="https://www.youmeos.com/spark/midnight-nerd/900/700"
			target="_blank"
			rel="noopener noreferrer"
			onclick={handleSupportTicketClick}>
			Open support Ticket
		</Link>
		<Divider tag="span" class="divider">|</Divider>
		<Link href="/privacy">Privacy Policy</Link>
		<Divider tag="span" class="divider">|</Divider>
		<Link href="/terms">Terms of Service</Link>
		<Divider tag="span" class="divider">|</Divider>
		<Text tag="span" class="copyright">
			v{fullVersion} &copy; {currentYear}
			<Link
				href="https://www.hallofthegods.com"
				target="_blank"
				rel="noopener noreferrer"
				style="color: inherit; text-decoration: underline; text-decoration-color: rgba(255,255,255,0.3); text-underline-offset: 2px;"
				onclick={handleHallOfTheGodsClick}>
				Hall of the Gods Inc.
			</Link>
			Maintained by XP @
			<Link
				href="https://mycompassconsulting.com"
				target="_blank"
				rel="noopener noreferrer"
				style="color: inherit; text-decoration: underline; text-decoration-color: rgba(255,255,255,0.3); text-underline-offset: 2px;"
				onclick={handleMyCompassClick}>
				My Compass Consulting
			</Link>
			.
			<Text tag="span" class="original-core">
				<Link
					href="https://github.com/brianschwabauer/remarkably-organized"
					target="_blank"
					rel="noopener noreferrer"
					style="color: inherit; text-decoration: underline; text-decoration-color: rgba(255,255,255,0.3); text-underline-offset: 2px;">
					Original core.
				</Link>
			</Text>
		</Text>
	</Box>
</Box>

<style lang="scss">
	:global(.app-footer) {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 1.25rem 1rem;
		background: transparent;
		color: rgba(255, 255, 255, 0.6);
		font-family:
			'Inter',
			system-ui,
			-apple-system,
			sans-serif;

		:global(.footer-content) {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 0.5rem;
			font-size: 0.8rem;
			text-align: center;

			@include tablet {
				flex-direction: row;
				flex-wrap: wrap;
				gap: 0.75rem;
				font-size: 0.85rem;
			}

			:global(a) {
				color: rgba(255, 255, 255, 0.8);
				text-decoration: none;
				font-weight: 500;
				transition: color 0.2s;
				white-space: nowrap;

				&:hover {
					color: #fcd34d;
				}
			}

			:global(.divider) {
				opacity: 0.3;
				display: none;

				@include tablet {
					display: inline;
				}
			}

			:global(.copyright) {
				white-space: normal;
				text-align: center;
				line-height: 1.5;
				max-width: 90vw;

				@include tablet {
					white-space: nowrap;
					width: auto;
				}
			}
		}
	}
</style>
