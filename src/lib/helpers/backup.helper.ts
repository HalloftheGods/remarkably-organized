import { browser } from '$app/environment';
import { replaceState } from '$app/navigation';
import { toast } from '$state';
import { trackEvent } from '$lib/analytics';
import { PlannerSettings } from '$state/planner-settings.svelte';

function safeReplaceState(url: URL) {
	try {
		replaceState(url, {});
	} catch (e) {
		// Ignore error when a navigation is in progress
	}
}

export function saveConfig(settings: PlannerSettings) {
	if (!browser) return;
	try {
		localStorage.setItem('planner-config', JSON.stringify(settings.getEdits()));
		trackEvent('preset_action', { action: 'save_local' });
		toast.success('Configuration saved successfully!');
	} catch (e) {
		toast.error('Failed to save configuration. Your browser storage might be full.');
	}
}

export function loadConfig(settings: PlannerSettings) {
	if (!browser) return;
	try {
		const config = localStorage.getItem('planner-config');
		if (config) {
			const defaultSettings = new PlannerSettings().serialize();
			settings.deserialize(defaultSettings);
			settings.deserialize(JSON.parse(config));
			trackEvent('preset_action', { action: 'load' });
			toast.success('Configuration loaded successfully!');
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

export function importConfig(settings: PlannerSettings) {
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
				const defaultSettings = new PlannerSettings().serialize();
				settings.deserialize(defaultSettings);
				settings.deserialize(parsed);
				trackEvent('preset_action', { action: 'import' });
				toast.success('Configuration imported successfully!');
			} else {
				toast.error('Invalid settings file format.');
			}
		} catch (err) {
			toast.error('Failed to parse settings file.');
		}
	};
	input.click();
}

export function resetConfig(settings: PlannerSettings) {
	if (!browser) return;
	localStorage.removeItem('planner-config');

	const defaultSettings = new PlannerSettings().serialize();
	settings.deserialize(defaultSettings);

	trackEvent('preset_action', { action: 'reset' });
	toast.success('Configuration reset to defaults.');
}
