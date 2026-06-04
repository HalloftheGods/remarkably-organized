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
	}: {
		onSave: () => void;
		onLoad: () => void;
		onExport: () => void;
		onImport: () => void;
		onReset: () => void;
	} = $props();
</script>

<h2>
	<span style="display: flex; align-items: baseline; gap: 0.5rem;">Backup & Restore</span>
	<SaveIcon style="opacity: 0.5;" />
</h2>
<div class="config-buttons">
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
	<button type="button" class="btn-reset" onclick={onReset}>Reset to Defaults</button>
</div>

<style lang="scss">
	@import './_panels.scss';
</style>
