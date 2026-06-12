<script lang="ts">
	import SaveIcon from '~icons/fa/save';
	import LoadIcon from '~icons/fa/history';
	import ExportIcon from '~icons/fa/download';
	import ImportIcon from '~icons/fa/upload';
	import MagicIcon from '~icons/fa/magic';

	let {
		onSave,
		onLoad,
		onExport,
		onImport,
		onReset,
		onSaveDevTheme,
	}: {
		onSave: () => void;
		onLoad: () => void;
		onExport: () => void;
		onImport: () => void;
		onReset: () => void;
		onSaveDevTheme?: () => void;
	} = $props();
</script>

<div class="panel-content">
	<h2>
		<span style="display: flex; align-items: baseline; gap: 0.5rem;">
			Backup & Restore
		</span>
		<SaveIcon style="opacity: 0.5;" />
	</h2>
	<div class="config-buttons">
		{#if import.meta.env.DEV && onSaveDevTheme}
			<button type="button" class="btn-dev-theme" onclick={onSaveDevTheme} style="background: rgba(255,165,0,0.1); color: #ffa500; border: 1px solid #ffa500;">
				<MagicIcon /> Update Theme to File (Dev)
			</button>
		{/if}
		<button type="button" onclick={onSave}>
			<SaveIcon /> Save Settings to Browser
		</button>
		<button type="button" onclick={onLoad}>
			<LoadIcon /> Load Settings from Browser
		</button>
		<button type="button" onclick={onExport}>
			<ExportIcon /> Export Settings to File
		</button>
		<button type="button" onclick={onImport}>
			<ImportIcon /> Import Settings from File
		</button>
	</div>

	<div class="presets-sticky">
		<button type="button" class="btn-reset" onclick={onReset}>Reset to Defaults</button>
	</div>
</div>

<style lang="scss">
	@use '../../styles/_panels.scss' as *;

	.panel-content {
		:global {
			@include panel-styles;
		}
	}

	.presets-sticky {
		margin-top: 1.5rem;
		padding-top: 1rem;
		border-top: 1px solid var(--outline);
	}
</style>
