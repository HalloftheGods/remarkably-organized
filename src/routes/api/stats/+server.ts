import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ platform }) => {
	// Fallback to 0 if KV isn't bound
	let visits = 0;
	let created = 0;
	let printed = 0;
	let timeCreating = 0;
	let shared = 100;
	let latestPrint: { city: string; country: string; timestamp: number } | null = null;

	try {
		// @ts-ignore - platform typing depends on app.d.ts configuration
		const kv = platform?.env?.KV;
		if (kv) {
			const v = await kv.get('visits');
			const c = await kv.get('created');
			const p = await kv.get('printed');
			const tc = await kv.get('time_creating');
			const s = await kv.get('shared');

			if (v !== null) visits = parseInt(v, 10);
			if (c !== null) created = parseInt(c, 10);
			if (p !== null) printed = parseInt(p, 10);
			if (tc !== null) timeCreating = parseInt(tc, 10);
			if (s !== null) shared = parseInt(s, 10) + 100;

			const lp = await kv.get('latest_print');
			if (lp) {
				try {
					latestPrint = JSON.parse(lp);
				} catch (e) {}
			}
		}
	} catch (e) {
		console.error('KV Error GET', e);
	}

	return json({ visits, created, printed, timeCreating, shared, latestPrint });
};

export const POST: RequestHandler = async ({ request, platform }) => {
	try {
		// @ts-ignore
		const kv = platform?.env?.KV;
		if (!kv) {
			// Silently succeed for local development without KV errors
			return json({ success: true, warning: 'KV not bound' });
		}

		const body = await request.json();
		const { type, amount } = body; // 'visits', 'created', 'printed', 'time_creating', 'shared'

		if (['visits', 'created', 'printed', 'time_creating', 'shared'].includes(type)) {
			let currentStr = await kv.get(type);
			let current = currentStr !== null ? parseInt(currentStr, 10) : 0;

			if (type === 'time_creating' && typeof amount === 'number') {
				current += amount;
			} else {
				current++;
			}
			await kv.put(type, current.toString());

			if (type === 'printed') {
				const city = request.headers.get('cf-ipcity');
				const country = request.headers.get('cf-ipcountry');
				// Only save if Cloudflare provides the geographic headers
				if (city && country) {
					await kv.put(
						'latest_print',
						JSON.stringify({ city, country, timestamp: Date.now() }),
					);
				}
			}

			return json({ success: true, count: current + (type === 'shared' ? 100 : 0) });
		}

		return json({ success: false, error: 'Invalid type' }, { status: 400 });
	} catch (e) {
		console.error('KV Error POST', e);
		return json({ success: false, error: 'Internal Server Error' }, { status: 500 });
	}
};
