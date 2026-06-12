<script lang="ts">
	import { fade } from 'svelte/transition';
	import MagicIcon from '~icons/fa/magic';
	import SaveIcon from '~icons/fa/save';
	import PlusIcon from '~icons/fa/plus';
	import type { PlannerSettings } from '$lib';
	import { THEMES } from '$lib/data/themes';
	
	interface Props {
		settings: PlannerSettings;
		onClose: () => void;
		onSave: (themeId: string, themeName: string) => void;
	}
	
	let { settings, onClose, onSave }: Props = $props();
	
	const existingTheme = THEMES.find(t => t.id === settings.design.themeId);
	let themeName = $state(existingTheme?.name || '');
	
	function saveExisting() {
		if (!existingTheme || !themeName.trim()) return;
		onSave(existingTheme.id, themeName.trim());
	}
	
	function saveNew() {
		if (!themeName.trim()) return;
		const themeId = themeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
		onSave(themeId, themeName.trim());
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" transition:fade={{ duration: 150 }} onclick={onClose}>
	<div class="bg-[var(--bg)] border border-[var(--outline)] rounded-xl shadow-2xl p-6 w-full max-w-sm relative overflow-hidden" onclick={(e) => e.stopPropagation()}>
		<button class="absolute top-4 right-4 text-[var(--text-low)] hover:text-[var(--text)] transition-colors border-none bg-transparent cursor-pointer p-1" onclick={onClose}>✕</button>
		
		<h3 class="text-xl font-bold mt-0 mb-6 flex items-center gap-2 text-[var(--text)]">
			<MagicIcon style="color: #ec4899;" /> Save Dev Theme
		</h3>
		
		<div class="flex flex-col gap-6">
			<div class="flex flex-col gap-2">
				<p class="text-sm font-bold text-[var(--text-low)] m-0">Theme Name</p>
				<input type="text" bind:value={themeName} placeholder="Theme Name" class="w-full px-4 py-3 rounded-lg bg-[var(--bg-high)] border border-[var(--outline)] text-[var(--text)] focus:outline-none focus:border-[#ec489980] transition-colors" onkeydown={(e) => e.key === 'Enter' && saveExisting()} />
			</div>
			
			<div class="flex items-center gap-3 mt-2">
				<button class="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg bg-[var(--bg-high)] hover:bg-[#ec48991a] text-[var(--text)] border border-[var(--outline)] hover:border-[#ec489980] font-bold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled={!themeName.trim()} onclick={saveNew}>
					<PlusIcon /> Create New
				</button>
				<button class="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg bg-[#ec4899] hover:bg-[#db2777] text-white font-bold border-none transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled={!themeName.trim() || !existingTheme} onclick={saveExisting}>
					<SaveIcon /> Save
				</button>
			</div>
		</div>
	</div>
</div>
