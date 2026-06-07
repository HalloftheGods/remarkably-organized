import { PlannerSettings } from '$lib';
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
	const settings = new PlannerSettings(serializedSettings);
	return {
		settings,
	};
}
