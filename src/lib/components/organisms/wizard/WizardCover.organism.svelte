<script lang="ts">
	import { Box, Text, Input, Button, Checkbox } from '$atoms';
	import { fade } from 'svelte/transition';
	import type { PlannerSettings } from '$state';
	import { getFontInfo } from '$lib';
	import { FontPickerModal } from '$wizard';
	import { TemplateThumbnail } from '$molecules';
	import RefreshIcon from '~icons/fa/refresh';
	import Toggle from '$atoms/Toggle.atom.svelte';

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

<Box class="step-content cover-step" transition="fade" inDuration={150}>
	<Box class="cover-wizard-layout">
		<Box class="cover-controls">
			<Text tag="h3" class="welcome-headline-gradient">Cover Page</Text>
			<Text tag="p">Personalize your planner with your name, title, and background.</Text>

			<Box class="control-group toggles-card">
				<Text tag="label" class="toggle-label">
					<Toggle
						checked={!settings.coverPage.disable}
						onchange={() => (settings.coverPage.disable = !settings.coverPage.disable)} />
					<span>Enable</span>
				</Text>
				<Text tag="label" class="toggle-label">
					<Toggle
						checked={settings.coverPage.darkBackground}
						onchange={() =>
							(settings.coverPage.darkBackground = !settings.coverPage.darkBackground)} />
					<span>Dark Mode</span>
				</Text>
				<Text tag="label" class="toggle-label">
					<Toggle
						checked={settings.coverPage.showCollectionLinks}
						onchange={() =>
							(settings.coverPage.showCollectionLinks =
								!settings.coverPage.showCollectionLinks)} />
					<span>Collection Links</span>
				</Text>
			</Box>

			{#if !settings.coverPage.disable}
				<Box class="design-rows" transition="fade">
					<Box class="design-row-item">
						<Box class="input-grid">
							<Box class="input-field">
								<Text tag="label" for="cover-title">Title</Text>
								<Input
									id="cover-title"
									type="text"
									bind:value={settings.coverPage.title}
									placeholder={settings.years[0].year.toString()} />
							</Box>
							<Box class="font-field">
								<span class="label">Font</span>
								<Button
									type="button"
									class="font-name-link"
									style="font-family: '{settings.coverPage
										.font}' !important; font-size: calc(1.25rem * {getFontInfo(
										settings.coverPage.font,
									)?.size || 1}) !important;"
									onclick={() => (activeFontPicker = true)}>
									{settings.coverPage.font}
								</Button>
							</Box>
						</Box>
					</Box>

					<Box class="design-row-item">
						<Box class="input-grid">
							<Box class="input-field">
								<Text tag="label" for="cover-name">Owner Name</Text>
								<Input
									id="cover-name"
									type="text"
									bind:value={settings.coverPage.name}
									placeholder="Your Name" />
							</Box>
							<Box class="input-field">
								<Text tag="label" for="cover-email">Contact / Email</Text>
								<Input
									id="cover-email"
									type="text"
									bind:value={settings.coverPage.email}
									placeholder="hello@example.com" />
							</Box>
						</Box>
					</Box>

					<Box class="design-row-item">
						<Box class="input-grid">
							<Box class="select-field">
								<Text tag="label" for="cover-bg-style">Background Style</Text>
								<select
									id="cover-bg-style"
									bind:value={settings.coverPage.backgroundStyle}>
									{#each BACKGROUND_STYLES as style}
										<option value={style.id}>{style.label}</option>
									{/each}
								</select>
							</Box>

							<Box class="input-field">
								<Text tag="label" for="cover-bg-seed">Seed</Text>
								<Box class="input-with-action">
									<Input
										id="cover-bg-seed"
										type="number"
										bind:value={settings.coverPage.backgroundSeed} />
									<Button
										type="button"
										class="action-btn"
										onclick={() =>
											(settings.coverPage.backgroundSeed = Math.floor(
												Math.random() * 100000,
											))}
										aria-label="Shuffle seed">
										<RefreshIcon />
									</Button>
								</Box>
							</Box>
						</Box>
					</Box>

					{#if settings.coverPage.backgroundStyle !== 'none'}
						<Box class="design-row-item" transition="fade">
							<Box class="input-field complexity-row">
								<Text tag="label" for="cover-complexity">Complexity</Text>
								<Box class="slider-with-value">
									<Input
										id="cover-complexity"
										type="range"
										min="1"
										max="10"
										step="1"
										bind:value={settings.coverPage.backgroundComplexity} />
									<span class="value-badge">
										{settings.coverPage.backgroundComplexity}
									</span>
								</Box>
							</Box>
						</Box>
					{/if}
				</Box>
			{/if}
		</Box>

		<Box class="cover-preview-column">
			<TemplateThumbnail
				templateValue="cover"
				templateName="Cover Page"
				{settings}
				timeframe={{}}
				disabled={settings.coverPage.disable}
				scaleOnHover={true}
				hoverScale={1.5} />
		</Box>
	</Box>
</Box>

{#if activeFontPicker}
	<FontPickerModal
		title="Cover Page Font"
		selectedFont={settings.coverPage.font}
		baseSize="1.5rem"
		onSelect={handleFontSelect}
		onClose={() => (activeFontPicker = false)} />
{/if}

<style lang="scss">
	:global(.cover-step) {
		height: 100%;
		display: flex;
		flex-direction: column;

		@media (max-width: 768px) {
			height: auto;
		}
	}

	:global(.cover-wizard-layout) {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		height: 100%;
		min-height: 0;

		@media (max-width: 1024px) {
			grid-template-columns: 1fr;
			gap: 1.5rem;
			height: auto;
			overflow: visible;
		}
	}

	:global(.cover-controls) {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		overflow-y: auto;
		padding-right: 0.5rem;

		:global(h3),
		:global(p) {
			margin: 0;
		}

		@media (max-width: 1024px) {
			overflow: visible;
			padding-right: 0;
		}
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

	:global(.toggles-card) {
		background: var(--bg-high);
		padding: 1rem 1.5rem;
		border-radius: var(--radius-3);
		border: 1px solid var(--outline);
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		margin-bottom: 0.5rem;

		@media (max-width: 600px) {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.75rem;
		}
	}

	:global(.complexity-row) {
		display: grid !important;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: 1.5rem !important;

		label {
			margin-bottom: 0 !important;
		}
	}

	:global(.slider-with-value) {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex: 1;

		:global(.value-badge) {
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

	:global(.toggle-label) {
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

	:global(.design-rows) {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	:global(.design-row-item) {
		min-width: 0;
	}

	:global(.input-grid) {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;

		@media (max-width: 600px) {
			grid-template-columns: 1fr;
		}
	}

	:global(.input-field),
	:global(.select-field),
	:global(.font-field) {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	:global(.input-field) label,
	:global(.select-field) label,
	:global(.font-field) :global(.label) {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--text-low);
	}

	:global(.input-field) input,
	:global(.select-field) select,
	:global(.font-field) :global(.font-name-link) {
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

	:global(.font-field) {
		:global(.font-name-link) {
			cursor: pointer;
			line-height: 1.2;

			&:hover {
				border-color: var(--action);
				color: var(--action);
			}
		}
	}

	:global(.input-with-action) {
		position: relative;
		display: flex;
		align-items: center;

		input {
			padding-right: 2.5rem !important;
		}

		:global(.action-btn) {
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

	:global(.cover-preview-column) {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		min-width: 0;

		@media (max-width: 768px) {
			padding: 0;
		}

		:global(.template-thumbnail) {
			max-width: 325px;
			width: 100%;
			box-shadow: var(--shadow-5);
		}
	}
</style>
