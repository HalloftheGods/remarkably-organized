<script lang="ts">
	import FileIcon from '~icons/fa/file';
	import type { PlannerSettings } from '$lib';

	let { settings }: { settings: PlannerSettings } = $props();

	// We'll use a standard data URI for the FontAwesome file icon to use as a mask
	// This ensures the gradient works perfectly with the mask-image property
	const fileIconMask = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'><path fill='black' d='M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z'/></svg>")`;
</script>

<div class="panel-content">
	<h2>
		Page Setup
		<FileIcon style="opacity: 0.5;" />
	</h2>

	<form>
		<div style="margin-bottom: 1rem;">
			<fieldset>
				<label for="pagesize-pageSize">Page Size</label>
				<select
					bind:value={settings.design.pageSize}
					style="width: 100%; padding: 0.5rem; border-radius: 4px; border: 1px solid var(--outline); background: var(--bg); color: var(--text);">
					<option value="letter">US Letter (8.5:11 Ratio)</option>
					<option value="a4" alt="(210 x 297mm, 1:√2)">Standard A4 (1:√2 Ratio)</option>
					<option value="boox" alt="(1860 x 2480, 3:4)">
						Boox Note / Tab Ultra (3:4)
					</option>
					<option value="goodnotes" alt="(3:4)">GoodNotes Standard (3:4)</option>
					<option value="ipad-11" alt="(1668 x 2388, ~7:10)">
						iPad Pro 11" / Air (7:10)
					</option>
					<option value="ipad-13" alt="(2048 x 2732, 3:4)">
						iPad Pro 13" / 12.9" (3:4)
					</option>
					<option value="kindle" alt="(1860 x 2480, 3:4)">Kindle Scribe (3:4)</option>
					<option value="supernote" alt="(1404 x 1872, 3:4)">
						Supernote A5X / A6X2 (3:4)
					</option>
					<option value="remarkable" alt="(1404 x 1872, 3:4)">reMarkable 2 (3:4)</option>
					<option value="remarkable-pro" alt="(1620 x 2160, 3:4)">
						reMarkable Paper Pro (3:4)
					</option>
					<option value="remarkable-move" alt="(1480 x 1984, 9:16)">
						reMarkable Paper Pro Move (9:16)
					</option>
				</select>
			</fieldset>
		</div>

		<h3>Safe Margins</h3>
		<p style="font-size: 0.85em; color: var(--text-low); margin: 0 0 1rem;">
			Adjust margins (in inches) to make room for your device's toolbar.
		</p>
		<fieldset>
			<div class="margin-grid">
				<div class="margin-input margin-top">
					<label for="marginTop">Top</label>
					<input
						type="number"
						id="marginTop"
						step="0.05"
						min="0"
						max="1"
						bind:value={settings.design.margin.top} />
				</div>

				<div class="margin-input margin-left">
					<label for="marginLeft">Left</label>
					<input
						type="number"
						id="marginLeft"
						step="0.05"
						min="0"
						max="1"
						bind:value={settings.design.margin.left} />
				</div>

				<button
					type="button"
					id="pagesize-orientation"
					onclick={() =>
						(settings.design.orientation =
							settings.design.orientation === 'portrait' ? 'landscape' : 'portrait')}
					class="orientation-toggle {settings.design.orientation}"
					title="Toggle Orientation">
					<div class="icon-gradient-mask" style="--mask-image: {fileIconMask}"></div>
				</button>

				<div class="margin-input margin-right">
					<label for="marginRight">Right</label>
					<input
						type="number"
						id="marginRight"
						step="0.05"
						min="0"
						max="1"
						bind:value={settings.design.margin.right} />
				</div>

				<div class="margin-input margin-bottom">
					<label for="marginBottom">Bottom</label>
					<input
						type="number"
						id="marginBottom"
						step="0.05"
						min="0"
						max="1"
						bind:value={settings.design.margin.bottom} />
				</div>
			</div>
		</fieldset>
	</form>
</div>

<style lang="scss">
	.panel-content {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.panel-content h2 {
		position: sticky;
		top: 0;
		background-color: var(--bg);
		padding: 2rem 0 1rem;
		color: var(--text);
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 3;
	}

	h3 {
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
	}

	fieldset {
		border: none;
		padding: 0;
		margin: 0;

		label {
			display: block;
			font-size: 0.9em;
			margin-bottom: 0.5rem;
			color: var(--text-low);
		}

		select,
		input {
			width: 100%;
			padding: 0.5rem;
			border: 1px solid var(--outline);
			border-radius: var(--radius-2);
			background: var(--bg);
			color: var(--text);
		}
	}

	.grid-2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.margin-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-areas:
			'. top .'
			'left center right'
			'. bottom .';
		gap: 0.75rem;
		align-items: center;
	}

	.margin-input {
		display: flex;
		flex-direction: column;
		align-items: center;

		label {
			font-size: 0.7em;
			color: var(--text-low);
			margin-bottom: 0.25rem;
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}
	}

	.margin-top {
		grid-area: top;
	}
	.margin-left {
		grid-area: left;
	}
	.margin-right {
		grid-area: right;
	}
	.margin-bottom {
		grid-area: bottom;
	}

	@keyframes wizard-gradient-shift {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	.orientation-toggle {
		grid-area: center;
		background: none;
		border: none;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: transform 0.2s ease;
		width: 100%;
		aspect-ratio: 1;

		&:hover {
			transform: scale(1.1);
		}

		.icon-gradient-mask {
			width: 4rem;
			height: 4rem;
			background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #ff0080 100%);
			background-size: 200% 200%;
			animation: wizard-gradient-shift 4s ease-in-out infinite;
			-webkit-mask-image: var(--mask-image);
			mask-image: var(--mask-image);
			-webkit-mask-repeat: no-repeat;
			mask-repeat: no-repeat;
			-webkit-mask-position: center;
			mask-position: center;
			-webkit-mask-size: contain;
			mask-size: contain;
			transition: transform 0.3s ease;
		}

		&.landscape .icon-gradient-mask {
			transform: rotate(-90deg);
		}
	}
</style>
