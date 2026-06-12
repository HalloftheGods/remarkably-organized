import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// In-memory fallback for local Vite dev server when Wrangler/Platform is not available
const localFallbackStore = new Map<string, number>();

export const GET: RequestHandler = async ({ url, platform }) => {
	const id = url.searchParams.get('id');
	if (!id) {
		return json({ error: 'Missing id parameter' }, { status: 400 });
	}

	let count = 0;

	if (platform?.env?.KV) {
		const storedCount = await platform.env.KV.get(`upvotes:${id}`);
		count = storedCount ? parseInt(storedCount, 10) : 0;
	} else {
		// Fallback for local development
		count = localFallbackStore.get(id) || 0;
	}

	return json({ count });
};

export const POST: RequestHandler = async ({ url, platform }) => {
	const id = url.searchParams.get('id');
	if (!id) {
		return json({ error: 'Missing id parameter' }, { status: 400 });
	}

	let newCount = 0;

	if (platform?.env?.KV) {
		const storedCount = await platform.env.KV.get(`upvotes:${id}`);
		newCount = storedCount ? parseInt(storedCount, 10) + 1 : 1;
		await platform.env.KV.put(`upvotes:${id}`, newCount.toString());
	} else {
		// Fallback for local development
		newCount = (localFallbackStore.get(id) || 0) + 1;
		localFallbackStore.set(id, newCount);
	}

	return json({ count: newCount });
};
