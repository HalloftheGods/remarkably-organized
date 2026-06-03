import iCal from 'ical.js';
const { parse, Component, Event } = iCal;

async function test() {
	const calendarURL =
		'https://calendar.google.com/calendar/ical/en.usa%23holiday%40group.v.calendar.google.com/public/basic.ics';
	const response = await fetch(calendarURL);
	const text = await response.text();

	const after = 1767225600000;
	const before = 1798675200000;
	const ics = parse(text);
	const comp = new Component(ics);
	const events = [];

	comp.getAllSubcomponents('vevent').forEach((vevent) => {
		try {
			const event = new Event(vevent);
			if (!event.startDate) return;
			const name = event.summary;

			if (event.isRecurring()) {
				const iterator = event.iterator();
				const duration =
					event.startDate.icaltype === 'date'
						? 86400000
						: event.endDate.toJSDate().getTime() - event.startDate.toJSDate().getTime();
				let count = 0;
				while (!iterator.complete) {
					if (count++ > 1000) {
						console.log('INFINITE LOOP DETECTED on event:', name);
						break;
					}
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
					});
				}
			} else {
				if (!event.endDate) return;
				const start = Date.UTC(
					event.startDate.year,
					event.startDate.month - 1,
					event.startDate.day,
					event.startDate.hour,
					event.startDate.minute,
					event.startDate.second,
				);
				const end = Date.UTC(
					event.endDate.year,
					event.endDate.month - 1,
					event.endDate.day,
					event.endDate.hour,
					event.endDate.minute,
					event.endDate.second,
				);
				if (end > after && start < before) {
					const duration = end - start;
					events.push({
						name,
						start: Math.floor(start / 1000),
						duration: duration === 86400000 ? undefined : Math.floor(duration / 1000),
					});
				}
			}
		} catch (err) {
			console.warn('Failed to parse a calendar event', err);
		}
	});
	console.log('Total events parsed:', events.length);
}
test().catch(console.error);
