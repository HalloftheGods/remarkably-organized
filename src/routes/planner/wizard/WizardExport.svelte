<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PlannerSettings } from '$lib/state/planner-settings.svelte';

	let { settings, onSaveCustomPreset = (preset: any) => {} } = $props<{
		settings: PlannerSettings;
		onSaveCustomPreset: Function;
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
	}

	function copyShareableLink() {
		const url = new URL(document.location.href);
		url.searchParams.set('settings', JSON.stringify(settings.serialize()));
		navigator.clipboard.writeText(url.toString()).then(() => {
			// Silently succeed
		});
	}
</script>

<div class="step-content export-step" in:fade={{ duration: 150 }}>
	<h3 class="welcome-headline-gradient">Backup & Export</h3>
	<p>
		Save your setup, generate a shareable link, or compile your master digital planner.
	</p>

	<div class="export-actions">
		{#if !showSaveConfirm}
			<button class="export-btn primary" onclick={() => (showSaveConfirm = true)}>
				<span class="icon">💾</span>
				Save as Custom Preset
			</button>
			<button class="export-btn" onclick={copyShareableLink}>
				<span class="icon">🔗</span>
				Copy Shareable Link
			</button>
			<button class="export-btn" onclick={downloadJson}>
				<span class="icon">⬇️</span>
				Download Settings (.json)
			</button>
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

	.export-actions {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: 1.5rem;

		.export-btn {
			display: flex;
			align-items: center;
			gap: 0.75rem;
			padding: 0.85rem 1.25rem;
			border-radius: var(--radius-3);
			background-color: var(--bg-high);
			border: 1px solid var(--outline);
			color: var(--text);
			font-weight: 600;
			font-size: 1rem;
			cursor: pointer;
			transition: all 0.2s ease;

			.icon {
				font-size: 1.25rem;
			}

			&:hover {
				background-color: var(--action);
				color: var(--action-text);
				border-color: var(--action);
				transform: translateY(-2px);
			}

			&.primary {
				background-color: var(--action);
				color: var(--action-text);
				border-color: var(--action);
				&:hover {
					opacity: 0.9;
				}
			}
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
