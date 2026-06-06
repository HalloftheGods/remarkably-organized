import { browser } from '$app/environment';
import { replaceState } from '$app/navigation';
import { toast } from '$state';
import { trackEvent } from '$lib/analytics';
import type { PlannerSettings } from '$lib';

function safeReplaceState(url: URL) {
	try {
		replaceState(url, {});
	} catch (e) {
		if (browser) {
			window.history.replaceState({}, '', url);
		}
	}
}

export function saveConfig(settings: PlannerSettings) {
	if (!browser) return;
	try {
		localStorage.setItem('planner-config', JSON.stringify(settings.edits));
		trackEvent('preset_action', { action: 'save_local' });
		toast.success('Configuration saved successfully!');
	} catch (e) {
		toast.error('Failed to save configuration. Your browser storage might be full.');
	}
}

export function loadConfig() {
	if (!browser) return;
	try {
		const config = localStorage.getItem('planner-config');
		if (config) {
			const url = new URL(document.location.href);
			url.searchParams.set('settings', config);
			safeReplaceState(url);
			trackEvent('preset_action', { action: 'load' });
			window.location.reload();
		} else {
			toast.error('No saved configuration found.');
		}
	} catch (e) {
		toast.error('Failed to load configuration.');
	}
}

export function exportConfig(settings: PlannerSettings) {
	if (!browser) return;
	try {
		const configStr = JSON.stringify(settings.serialize(), null, 2);
		const blob = new Blob([configStr], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'remarkably-organized-settings.json';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
		trackEvent('preset_action', { action: 'export' });
		toast.success('Configuration exported successfully!');
	} catch (e) {
		toast.error('Failed to export configuration.');
	}
}

export function importConfig() {
	if (!browser) return;
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = '.json';
	input.onchange = async (e) => {
		const file = (e.target as HTMLInputElement).files?.[0];
		if (!file) return;
		try {
			const text = await file.text();
			const parsed = JSON.parse(text);
			if (parsed && typeof parsed === 'object') {
				const url = new URL(document.location.href);
				url.searchParams.set('settings', JSON.stringify(parsed));
				safeReplaceState(url);
				trackEvent('preset_action', { action: 'import' });
				window.location.reload();
			} else {
				toast.error('Invalid settings file format.');
			}
		} catch (err) {
			toast.error('Failed to parse settings file.');
		}
	};
	input.click();
}

export function resetConfig() {
	if (!browser) return;
	const url = new URL(document.location.href);
	url.searchParams.delete('settings');
	localStorage.removeItem('planner-config');
	safeReplaceState(url);
	trackEvent('preset_action', { action: 'reset' });
	window.location.reload();
}
