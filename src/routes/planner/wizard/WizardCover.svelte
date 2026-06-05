<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PlannerSettings } from '$lib/state/planner-settings.svelte';
	import { getFontInfo } from '$lib';
	import FontPickerModal from './FontPickerModal.svelte';
	import TemplateThumbnail from '$lib/components/TemplateThumbnail.svelte';
	import RefreshIcon from '~icons/fa/refresh';

	let { settings } = $props<{ settings: PlannerSettings }>();

	let activeFontPicker = $state<boolean>(false);

	const BACKGROUND_STYLES = [
		{ id: 'none', label: 'None' },
		{ id: 'mesh', label: 'Mesh Gradient' },
		{ id: 'waves', label: 'Topographic Waves' },
		{ id: 'bauhaus', label: 'Bauhaus Art' },
		{ id: 'halftone', label: 'Halftone Pattern' },
		{ id: 'glassmorphism', label: 'Glassmorphism' },
		{ id: 'flower-of-life', label: 'Flower of Life' },
		{ id: 'emoji', label: 'Emoji Pattern' },
		{ id: 'fractals', label: 'Fractals' },
		{ id: 'platonic', label: 'Platonic Solids' },
		{ id: 'pokerface', label: 'Pokerface' },
		{ id: 'magician', label: 'Magician' },
	];

	function handleFontSelect(fontName: string) {
		settings.coverPage.font = fontName;
		activeFontPicker = false;
	}
</script>

<div class="step-content cover-step" in:fade={{ duration: 150 }}>
	<div class="cover-wizard-layout">
		<div class="cover-controls">
			<h3 class="welcome-headline-gradient">Cover Page</h3>
			<p>Personalize your planner with your name, title, and background.</p>

			<div class="control-group toggles-card">
				<label class="toggle-label">
					<input
						type="checkbox"
						onchange={(e) => (settings.coverPage.disable = !e.currentTarget.checked)}
						checked={!settings.coverPage.disable} />
					<span>Enable</span>
				</label>
				<label class="toggle-label">
					<input type="checkbox" bind:checked={settings.coverPage.darkBackground} />
					<span>Dark Mode</span>
				</label>
				<label class="toggle-label">
					<input type="checkbox" bind:checked={settings.coverPage.showCollectionLinks} />
					<span>Collection Links</span>
				</label>
			</div>

			{#if !settings.coverPage.disable}
				<div class="design-rows" in:fade>
					<div class="design-row-item">
						<div class="input-grid">
							<div class="input-field">
								<label for="cover-title">Title</label>
								<input
									id="cover-title"
									type="text"
									bind:value={settings.coverPage.title}
									placeholder={settings.years[0].year.toString()} />
							</div>
							<div class="font-field">
								<span class="label">Font</span>
								<button
									type="button"
									class="font-name-link"
									style="font-family: '{settings.coverPage
										.font}' !important; font-size: calc(1.25rem * {getFontInfo(
										settings.coverPage.font,
									)?.size || 1}) !important;"
									onclick={() => (activeFontPicker = true)}>
									{settings.coverPage.font}
								</button>
							</div>
						</div>
					</div>

					<div class="design-row-item">
						<div class="input-grid">
							<div class="input-field">
								<label for="cover-name">Owner Name</label>
								<input
									id="cover-name"
									type="text"
									bind:value={settings.coverPage.name}
									placeholder="Your Name" />
							</div>
							<div class="input-field">
								<label for="cover-email">Contact / Email</label>
								<input
									id="cover-email"
									type="text"
									bind:value={settings.coverPage.email}
									placeholder="hello@example.com" />
							</div>
						</div>
					</div>

					<div class="design-row-item">
						<div class="input-grid">
							<div class="select-field">
								<label for="cover-bg-style">Background Style</label>
								<select
									id="cover-bg-style"
									bind:value={settings.coverPage.backgroundStyle}>
									{#each BACKGROUND_STYLES as style}
										<option value={style.id}>{style.label}</option>
									{/each}
								</select>
							</div>

							<div class="input-field">
								<label for="cover-bg-seed">Seed</label>
								<div class="input-with-action">
									<input
										id="cover-bg-seed"
										type="number"
										bind:value={settings.coverPage.backgroundSeed} />
									<button
										type="button"
										class="action-btn"
										onclick={() =>
											(settings.coverPage.backgroundSeed = Math.floor(
												Math.random() * 100000,
											))}
										aria-label="Shuffle seed">
										<RefreshIcon />
									</button>
								</div>
							</div>
						</div>
					</div>

					{#if settings.coverPage.backgroundStyle !== 'none'}
						<div class="design-row-item" in:fade>
							<div class="input-field complexity-row">
								<label for="cover-complexity">Complexity</label>
								<div class="slider-with-value">
									<input
										id="cover-complexity"
										type="range"
										min="1"
										max="10"
										step="1"
										bind:value={settings.coverPage.backgroundComplexity} />
									<span class="value-badge">
										{settings.coverPage.backgroundComplexity}
									</span>
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/if}
		</div>

		<div class="cover-preview-column">
			<TemplateThumbnail
				templateValue="cover"
				templateName="Cover Page"
				{settings}
				timeframe={{}}
				disabled={settings.coverPage.disable}
				scaleOnHover={true}
				hoverScale={1.5} />
		</div>
	</div>
</div>

{#if activeFontPicker}
	<FontPickerModal
		title="Cover Page Font"
		selectedFont={settings.coverPage.font}
		baseSize="1.5rem"
		onSelect={handleFontSelect}
		onClose={() => (activeFontPicker = false)} />
{/if}

<style lang="scss">
	.cover-step {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.cover-wizard-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		height: 100%;
		min-height: 0;

		@media (max-width: 1024px) {
			grid-template-columns: 1fr;
			gap: 1.5rem;
			overflow-y: auto;
		}
	}

	.cover-controls {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow-y: auto;
		padding-right: 0.5rem;
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

	.toggles-card {
		background: var(--bg-high);
		padding: 1rem 1.5rem;
		border-radius: var(--radius-3);
		border: 1px solid var(--outline);
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;

		@media (max-width: 600px) {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.75rem;
		}
	}

	.complexity-row {
		display: grid !important;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: 1.5rem !important;

		label {
			margin-bottom: 0 !important;
		}
	}

	.slider-with-value {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex: 1;

		.value-badge {
			background: var(--action);
			color: var(--action-text);
			font-size: 0.75rem;
			min-width: 1.5rem;
			height: 1.5rem;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 100px;
			font-weight: 700;
			flex-shrink: 0;
		}
	}

	.toggle-label {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		cursor: pointer;
		user-select: none;
		font-size: 0.85rem;
		color: var(--text);

		input[type='checkbox'] {
			width: 1.1rem;
			height: 1.1rem;
			cursor: pointer;
			accent-color: var(--action);
		}
	}

	.design-rows {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.design-row-item {
		min-width: 0;

		h4 {
			margin: 0 0 0.75rem;
			font-size: 0.9rem;
			font-weight: 600;
			color: var(--text-low);
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}
	}

	.input-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.input-field,
	.select-field,
	.font-field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;

		label,
		.label {
			font-size: 0.75rem;
			font-weight: 600;
			color: var(--text-low);
		}

		input,
		select,
		.font-name-link {
			padding: 0.6rem;
			border-radius: var(--radius-2);
			border: 1px solid var(--outline);
			background-color: var(--bg);
			color: var(--text);
			font-family: inherit;
			font-size: 0.9rem;
			width: 100%;
			text-align: left;
			transition: all 0.2s ease;

			&:focus {
				border-color: var(--action);
				outline: none;
			}
		}

		.font-name-link {
			cursor: pointer;
			line-height: 1.2;

			&:hover {
				border-color: var(--action);
				color: var(--action);
			}
		}
	}

	.input-with-action {
		position: relative;
		display: flex;
		align-items: center;

		input {
			padding-right: 2.5rem !important;
		}

		.action-btn {
			position: absolute;
			right: 0.3rem;
			top: 50%;
			transform: translateY(-50%);
			padding: 0.4rem;
			border-radius: var(--radius-2);
			display: flex;
			align-items: center;
			justify-content: center;
			color: var(--text-low);
			transition: all 0.2s ease;

			&:hover {
				background: var(--bg-high);
				color: var(--action);
			}
		}
	}

	.label-with-value {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.1rem;

		.value-badge {
			background: var(--action);
			color: var(--action-text);
			font-size: 0.7rem;
			padding: 0.1rem 0.4rem;
			border-radius: 100px;
			font-weight: 700;
		}
	}

	input[type='range'] {
		width: 100%;
		height: 6px;
		background: var(--outline);
		border-radius: 5px;
		appearance: none;
		outline: none;
		padding: 0;
		border: none;

		&::-webkit-slider-thumb {
			appearance: none;
			width: 18px;
			height: 18px;
			background: var(--action);
			cursor: pointer;
			border-radius: 50%;
			border: 2px solid var(--bg);
			box-shadow: var(--shadow-1);
		}
	}

	.cover-preview-column {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		min-width: 0;

		:global(.template-thumbnail) {
			max-width: 325px;
			width: 100%;
			box-shadow: var(--shadow-5);
		}
	}
</style>
