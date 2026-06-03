import iCal from 'ical.js';
import { error, json } from '@sveltejs/kit';
import type { CalendarEvent } from '$lib';
const { parse, Component, Event } = iCal;

export async function GET({ url, platform }) {
	const cacheKey = new Request(url.toString(), { method: 'GET' });
	const cache = platform?.caches?.default;

	if (cache) {
		const cachedResponse = await cache.match(cacheKey);
		if (cachedResponse) {
			return new Response(cachedResponse.body, cachedResponse);
		}
	}

	const calendarURL = url.searchParams.get('url');
	if (!calendarURL) throw error(400, 'No calendar URL provided');

	let fetchError = '';
	const response = await fetch(calendarURL, {
		headers: {
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
			Accept: 'text/calendar, text/plain, */*',
		},
	}).catch((err) => {
		fetchError = err.message;
		return {} as Response;
	});
	if (!response.ok) {
		throw error(500, `Couldn't fetch calendar: ${response.status || fetchError}`);
	}
	const text = await response.text();

	const after = +(url.searchParams.get('start') || Date.UTC(new Date().getFullYear()));
	const before = +(
		url.searchParams.get('end') || Date.UTC(new Date().getFullYear() + 1, 12, 31)
	);

	const ics = parse(text);
	const comp = new Component(ics);
	const events: (CalendarEvent & { isUTC?: boolean })[] = [];

	comp.getAllSubcomponents('vevent').forEach((vevent) => {
		try {
			const event = new Event(vevent);
			if (!event.startDate) return;
			const name = event.summary;

			if (event.isRecurring()) {
				const iterator = event.iterator();
				const isAllDay = event.startDate.icaltype === 'date';
				const duration = isAllDay
						? 86400000
						: event.endDate.toJSDate().getTime() - event.startDate.toJSDate().getTime();
				while (!iterator.complete) {
					const time = iterator.next();
					if (!time) break;
					
					const start = Date.UTC(
						time.year,
						time.month - 1,
						time.day,
						time.hour,
						time.minute,
						time.second,
					);
					const end = start + duration;
					
					if (start > before) break;
					if (end < after) continue;
					events.push({
						name,
						start: Math.floor(start / 1000),
						duration: duration === 86400000 ? undefined : Math.floor(duration / 1000),
						isUTC: time.zone?.tzid === 'UTC',
					});
				}
			} else {
				if (!event.endDate) return;
				const isAllDay = event.startDate.icaltype === 'date';
				const duration = isAllDay
						? 86400000
						: event.endDate.toJSDate().getTime() - event.startDate.toJSDate().getTime();
						
				const start = Date.UTC(
					event.startDate.year,
					event.startDate.month - 1,
					event.startDate.day,
					event.startDate.hour,
					event.startDate.minute,
					event.startDate.second,
				);
				const end = start + duration;

				if (end > after && start < before) {
					events.push({
						name,
						start: Math.floor(start / 1000),
						duration: duration === 86400000 ? undefined : Math.floor(duration / 1000),
						isUTC: event.startDate.zone?.tzid === 'UTC',
					});
				}
			}
		} catch (err) {
			console.warn('Failed to parse a calendar event', err);
		}
	});
	events.sort((a, b) => a.start - b.start);

	const finalResponse = json(
		{ events },
		{
			headers: {
				'Cache-Control': 'public, max-age=3600, s-maxage=3600',
			},
		},
	);

	if (cache && platform?.context?.waitUntil) {
		platform.context.waitUntil(cache.put(cacheKey, finalResponse.clone()));
	}

	return finalResponse;
}
