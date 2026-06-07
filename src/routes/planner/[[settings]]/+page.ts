import { PlannerSettings } from '$lib';
import { PRESETS } from '$lib/data/presets';
import LZString from 'lz-string';

export function load({ url, params }) {
	let serializedSettings = undefined;
	try {
		if (params.settings) {
			const decompressed = LZString.decompressFromEncodedURIComponent(params.settings);
			if (decompressed) {
				serializedSettings = JSON.parse(decompressed);
			}
		} else if (url.searchParams.has('settings')) {
			serializedSettings = JSON.parse(url.searchParams.get('settings') || '');
		}
	} catch (e) {
		// ignore
	}
	const presetId = url.searchParams.get('preset');
	const loadedPreset = PRESETS.find((p) => p.id === presetId);

	if (!serializedSettings && loadedPreset) {
		serializedSettings = loadedPreset.config;
	}

	const settings = new PlannerSettings(serializedSettings);

	return {
		settings,
		preset: loadedPreset,
	};
}
