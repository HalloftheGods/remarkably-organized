<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PlannerSettings } from '$lib/state/planner-settings.svelte';
	import { toast } from '$lib/components/toast.state.svelte';
	import SaveIcon from '~icons/fa/save';
	import LinkIcon from '~icons/fa/link';
	import DownloadIcon from '~icons/fa/download';
	import PrintIcon from '~icons/fa/print';
	import MagicIcon from '~icons/fa/magic';
	import BookIcon from '~icons/fa/book';
	import RefreshIcon from '~icons/fa/refresh';

	let {
		settings,
		onSaveCustomPreset = (preset: any) => {},
		onClose = () => {},
	} = $props<{
		settings: PlannerSettings;
		onSaveCustomPreset: Function;
		onClose: () => void;
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
		const dataStr =
			'data:text/json;charset=utf-8,' +
			encodeURIComponent(JSON.stringify(settings.serialize(), null, 2));
		const downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute('href', dataStr);
		downloadAnchorNode.setAttribute('download', 'planner-preset.json');
		document.body.appendChild(downloadAnchorNode); // required for firefox
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
		toast.success('Settings downloaded!');
	}

	function copyShareableLink() {
		const url = new URL(document.location.href);
		url.searchParams.set('settings', JSON.stringify(settings.serialize()));
		navigator.clipboard.writeText(url.toString()).then(() => {
			toast.success('Shareable link copied!');
		});
	}

	function handlePrint() {
		window.print();
	}

	function handleReset() {
		if (confirm('Are you sure you want to reset all settings? This cannot be undone.')) {
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
			handler: () => onClose(),
			primary: true,
		},
	];
</script>

<div class="step-content export-step" in:fade={{ duration: 150 }}>
	<div class="export-header">
		<h2 class="welcome-headline">
			<span class="welcome-headline-gradient">Ready to Plan?</span>
		</h2>
		<p class="export-tagline">
			Save your setup, generate your planner, or share your configuration with others.
		</p>
	</div>

	<div class="export-actions">
		{#if !showSaveConfirm}
			<div
				class="welcome-features"
				in:fade={{ duration: 200 }}
				style="--display-font: {settings.design.fontDisplay}; --body-font: {settings
					.design.font}">
				{#each exportActions as action, i}
					{@const Icon = action.icon}
					<button
						class="welcome-feature"
						class:is-primary={action.primary}
						style="--i: {i}"
						onclick={action.handler}>
						<span class="welcome-feature-icon"><Icon /></span>
						<div class="welcome-feature-body">
							<strong>{action.title}</strong>
							<span>{action.description}</span>
						</div>
					</button>
				{/each}
			</div>
		{:else}
			<div class="save-confirm-box" in:fade={{ duration: 150 }}>
				<h4>Save Custom Preset</h4>
				<div class="input-group-row">
					<div class="input-group icon-input">
						<label for="guide-preset-icon">Icon</label>
						<input
							id="guide-preset-icon"
							type="text"
							maxlength="2"
							bind:value={newPresetIcon} />
					</div>
					<div class="input-group name-input">
						<label for="guide-preset-name">Preset Name</label>
						<input
							id="guide-preset-name"
							type="text"
							placeholder="My Awesome Planner"
							bind:value={newPresetName}
							onkeydown={(e) => e.key === 'Enter' && saveCustomPreset()} />
					</div>
				</div>
				<div class="save-actions">
					<button class="cancel-btn" onclick={() => (showSaveConfirm = false)}>
						Cancel
					</button>
					<button
						class="save-btn"
						onclick={saveCustomPreset}
						disabled={!newPresetName.trim()}>
						Save Preset
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.export-step {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		width: 100%;
	}

	.export-header {
		margin-bottom: 1rem;
	}

	.welcome-headline {
		margin: 0;
		font-size: 2rem;
		font-weight: 800;
		letter-spacing: -0.03em;
		line-height: 1.1;
		color: var(--text);
	}

	.welcome-headline-gradient {
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

	.export-tagline {
		margin: 0.5rem 0;
		font-size: 0.95rem;
		line-height: 1.4;
		color: var(--text-low);
	}

	.welcome-features {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.75rem;
		width: 100%;
		margin-top: 1rem;

		@media (max-width: 1024px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media (max-width: 768px) {
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}
	}

	.welcome-feature {
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
			flex-direction: row;
			align-items: center;
			padding: 0.6rem 0.85rem;
			text-align: left;
		}

		&.is-primary {
			background: rgba(124, 58, 237, 0.08);
			border-color: rgba(124, 58, 237, 0.2);
			.welcome-feature-icon {
				color: #7c3aed;
			}
			&:hover {
				background: rgba(124, 58, 237, 0.12);
				border-color: rgba(124, 58, 237, 0.3);
			}
		}
	}

	.welcome-feature:hover {
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

	.welcome-feature-icon {
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

	.welcome-feature-body {
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
			text-align: left;
		}
	}

	.save-confirm-box {
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

		.input-group-row {
			display: flex;
			gap: 1rem;
			.input-group {
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
				&.icon-input {
					flex: 0 0 60px;
					input {
						text-align: center;
						font-size: 1.2rem;
					}
				}
				&.name-input {
					flex: 1;
				}
			}
		}

		.save-actions {
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

				&.cancel-btn {
					background: none;
					border: 1px solid var(--outline);
					color: var(--text);
					&:hover {
						background-color: var(--bg);
					}
				}

				&.save-btn {
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
