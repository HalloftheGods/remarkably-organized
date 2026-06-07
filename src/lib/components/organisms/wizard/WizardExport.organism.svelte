<script lang="ts">
	import { Box, Text, Input, Button } from '$atoms';
	import { fade } from 'svelte/transition';
	import { toast, type PlannerSettings } from '$state';
	import SaveIcon from '~icons/fa/save';
	import LinkIcon from '~icons/fa/link';
	import DownloadIcon from '~icons/fa/download';
	import PrintIcon from '~icons/fa/print';
	import MagicIcon from '~icons/fa/magic';
	import BookIcon from '~icons/fa/book';
	import RefreshIcon from '~icons/fa/refresh';
	import { trackEvent } from '$lib/analytics';

	let {
		settings,
		onSaveCustomPreset = (preset: any) => {},
		onClose = () => {},
		onPrint = () => {},
	} = $props<{
		settings: PlannerSettings;
		onSaveCustomPreset: Function;
		onClose: () => void;
		onPrint: () => void;
	}>();

	let showSaveConfirm = $state(false);
	let newPresetName = $state('');
	let newPresetIcon = $state('✨');

	function saveCustomPreset() {
		const isNameEmpty = !newPresetName.trim();
		if (isNameEmpty) return;
		const newPreset = {
			id: `custom-${Date.now()}`,
			name: newPresetName.trim(),
			icon: newPresetIcon,
			description: 'Custom preset created by you.',
			config: settings.serialize(),
		};
		onSaveCustomPreset(newPreset);
		showSaveConfirm = false;
		newPresetName = '';
		toast.success('Custom preset saved!');
	}

	function downloadJson() {
		trackEvent('wizard_export_action', { action: 'download_json' });
		const dataStr =
			'data:text/json;charset=utf-8,' +
			encodeURIComponent(JSON.stringify(settings.serialize(), null, 2));
		const downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute('href', dataStr);
		downloadAnchorNode.setAttribute('download', 'planner-preset.json');
		document.body.appendChild(downloadAnchorNode);
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
		toast.success('Settings downloaded!');
	}

	function copyShareableLink() {
		trackEvent('wizard_export_action', { action: 'copy_link' });
		const url = new URL(document.location.href);
		url.searchParams.set('settings', JSON.stringify(settings.serialize()));
		navigator.clipboard.writeText(url.toString()).then(() => {
			toast.success('Shareable link copied!');
		});
	}

	function handlePrint() {
		trackEvent('wizard_export_action', { action: 'print' });
		onPrint();
	}

	function handleReset() {
		const isConfirmed = confirm(
			'Are you sure you want to reset all settings? This cannot be undone.',
		);
		if (isConfirmed) {
			trackEvent('wizard_export_action', { action: 'reset' });
			const defaultSettings = (settings.constructor as any).prototype.serialize?.() || {};
			settings.deserialize(defaultSettings);
			toast.info('Settings reset to default');
		}
	}

	const exportActions = [
		{
			id: 'print',
			title: 'Print Now',
			description: 'Generate and print your PDF.',
			icon: PrintIcon,
			handler: handlePrint,
		},
		{
			id: 'save',
			title: 'Save Preset',
			description: 'Save as a local custom preset.',
			icon: SaveIcon,
			handler: () => (showSaveConfirm = true),
		},
		{
			id: 'link',
			title: 'Copy Link',
			description: 'Copy a shareable URL of this setup.',
			icon: LinkIcon,
			handler: copyShareableLink,
		},
		{
			id: 'download',
			title: 'Download JSON',
			description: 'Export settings to a local file.',
			icon: DownloadIcon,
			handler: downloadJson,
		},
		{
			id: 'reset',
			title: 'Reset All',
			description: 'Clear everything and start over.',
			icon: RefreshIcon,
			handler: handleReset,
		},
		{
			id: 'docs',
			title: 'User Guide',
			description: 'Learn how to use your new planner.',
			icon: BookIcon,
			handler: () =>
				window.open(
					'https://github.com/HalloftheGods/remarkably-organized/wiki',
					'_blank',
				),
		},
		{
			id: 'finish',
			title: 'See the Magic',
			description: 'See what your magic created!',
			icon: MagicIcon,
			handler: () => {
				trackEvent('wizard_finish');
				onClose();
			},
			primary: true,
		},
	];
</script>

<Box class="step-content export-step" transition="fade" inDuration={150}>
	<Box class="export-header">
		<h2 class="welcome-headline">
			<span class="welcome-headline-gradient">Ready to Plan?</span>
		</h2>
		<Text tag="p" class="export-tagline">
			Save your setup, generate your planner, or share your configuration with others.
		</Text>
	</Box>

	<Box class="export-actions">
		{#if !showSaveConfirm}
			<Box
				class="welcome-features"
				transition="fade"
				inDuration={200}
				style="--display-font: {settings.design.fontDisplay}; --body-font: {settings
					.design.font}">
				{#each exportActions as action, i}
					{@const Icon = action.icon}
					<Button
						class="welcome-feature {action.primary ? 'is-primary' : ''}"
						style="--i: {i}"
						onclick={action.handler}>
						<span class="welcome-feature-icon"><Icon /></span>
						<Box class="welcome-feature-body">
							<strong>{action.title}</strong>
							<span>{action.description}</span>
						</Box>
					</Button>
				{/each}
			</Box>
		{:else}
			<Box class="save-confirm-box" transition="fade" inDuration={150}>
				<Text tag="h4">Save Custom Preset</Text>
				<Box class="input-group-row">
					<Box class="input-group icon-input">
						<Text tag="label" for="guide-preset-icon">Icon</Text>
						<Input
							id="guide-preset-icon"
							type="text"
							maxlength="2"
							bind:value={newPresetIcon} />
					</Box>
					<Box class="input-group name-input">
						<Text tag="label" for="guide-preset-name">Preset Name</Text>
						<Input
							id="guide-preset-name"
							type="text"
							placeholder="My Awesome Planner"
							bind:value={newPresetName}
							onkeydown={(e: any) => e.key === 'Enter' && saveCustomPreset()} />
					</Box>
				</Box>
				<Box class="save-actions">
					<Button class="cancel-btn" onclick={() => (showSaveConfirm = false)}>
						Cancel
					</Button>
					<Button
						class="save-btn"
						onclick={saveCustomPreset}
						disabled={!newPresetName.trim()}>
						Save Preset
					</Button>
				</Box>
			</Box>
		{/if}
	</Box>
</Box>

<style lang="scss">
	:global(.export-step) {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		width: 100%;
	}

	:global(.export-header) {
		margin-bottom: 1rem;
	}

	:global(.welcome-headline) {
		margin: 0;
		font-size: 2rem;
		font-weight: 800;
		letter-spacing: -0.03em;
		line-height: 1.1;
		color: var(--text);
	}

	:global(.welcome-headline-gradient) {
		background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #a78bfa 100%);
		background-size: 200% auto;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: gradient-shift 4s ease-in-out infinite;
	}

	@keyframes gradient-shift {
		0%,
		100% {
			background-position: 0% center;
		}
		50% {
			background-position: 100% center;
		}
	}

	:global(.export-tagline) {
		margin: 0.5rem 0;
		font-size: 0.95rem;
		line-height: 1.4;
		color: var(--text-low);
	}

	:global(.welcome-features) {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.75rem;
		width: 100%;
		margin-top: 1rem;

		@media (max-width: 1024px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media (max-width: 768px) {
			grid-template-columns: repeat(2, 1fr);
			gap: 0.5rem;
		}
	}

	:global(.welcome-feature) {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem;
		border-radius: 12px;
		background: transparent;
		border: 1px solid transparent;
		transition:
			transform 0.2s ease,
			background 0.2s ease,
			border-color 0.2s ease;
		animation: feature-stagger 0.5s ease-out calc(0.3s + var(--i) * 0.1s) both;
		cursor: pointer;
		font-family: inherit;
		color: inherit;
		text-align: center;

		@media (max-width: 768px) {
			padding: 0.6rem;
		}

		&:global(.is-primary) {
			background: rgba(124, 58, 237, 0.08);
			border-color: rgba(124, 58, 237, 0.2);
			:global(.welcome-feature-icon) {
				color: #7c3aed;
			}
			&:hover {
				background: rgba(124, 58, 237, 0.12);
				border-color: rgba(124, 58, 237, 0.3);
			}
		}
	}

	:global(.welcome-feature):hover {
		transform: translateY(-2px);
		background: rgba(124, 58, 237, 0.04);
		border-color: rgba(124, 58, 237, 0.1);

		@media (max-width: 768px) {
			transform: translateX(4px);
		}
	}

	@keyframes feature-stagger {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	:global(.welcome-feature-icon) {
		font-size: 2rem;
		line-height: 1;
		flex-shrink: 0;
		color: #a78bfa;
		margin-bottom: 0.25rem;

		@media (max-width: 768px) {
			font-size: 1.5rem;
			margin-bottom: 0;
		}
	}

	:global(.welcome-feature-body) {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;

		strong {
			font-family: var(--display-font, var(--font-display)) !important;
			font-size: 0.9rem;
			font-weight: 700;
			text-transform: uppercase;
			letter-spacing: 2px !important;
			color: var(--text);
		}

		span {
			font-family: var(--body-font, var(--font-body)) !important;
			font-size: 0.84rem;
			color: var(--text-low);
			line-height: 1.3;
		}

		@media (max-width: 768px) {
			span {
				font-size: 0.75rem;
			}
		}
	}

	:global(.save-confirm-box) {
		background-color: var(--bg-high);
		border: 1px solid var(--outline);
		border-radius: var(--radius-3);
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		max-width: 500px;
		margin: 2rem auto;

		h4 {
			margin: 0;
			font-size: 1.1rem;
			color: var(--text);
		}

		:global(.input-group-row) {
			display: flex;
			gap: 1rem;
			:global(.input-group) {
				display: flex;
				flex-direction: column;
				gap: 0.35rem;
				label {
					font-size: 0.8rem;
					font-weight: 600;
					color: var(--text-low);
				}
				input {
					padding: 0.6rem;
					border-radius: var(--radius-2);
					border: 1px solid var(--outline);
					background-color: var(--bg);
					color: var(--text);
					font-family: inherit;
				}
				&:global(.icon-input) {
					flex: 0 0 60px;
					input {
						text-align: center;
						font-size: 1.2rem;
					}
				}
				&:global(.name-input) {
					flex: 1;
				}
			}
		}

		:global(.save-actions) {
			display: flex;
			justify-content: flex-end;
			gap: 0.5rem;
			margin-top: 0.5rem;

			button {
				padding: 0.6rem 1rem;
				border-radius: var(--radius-2);
				font-weight: 600;
				cursor: pointer;
				transition: all 0.2s ease;

				&:global(.cancel-btn) {
					background: none;
					border: 1px solid var(--outline);
					color: var(--text);
					&:hover {
						background-color: var(--bg);
					}
				}

				&:global(.save-btn) {
					background-color: var(--action);
					border: 1px solid var(--action);
					color: var(--action-text);
					&:hover:not(:disabled) {
						opacity: 0.9;
					}
					&:disabled {
						opacity: 0.5;
						cursor: not-allowed;
					}
				}
			}
		}
	}
</style>
