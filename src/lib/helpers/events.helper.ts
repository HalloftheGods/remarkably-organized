import type { CalendarEvent } from '$lib';
import { isMoonEvent, getMoonEmoji } from './date.helper';

/**
 * Checks if a date is outside the configured planner bounds.
 */
export const isDateDisabled = (dateMs: number, settings?: any): boolean => {
	if (!settings) return false;
	if (settings.dayPage?.disable) return true;

	const start = settings.date?.start?.getTime() || 0;
	const end = settings.date?.end?.getTime() || Infinity;

	return dateMs < start || dateMs > end;
};

/**
 * Retrieves and pre-filters events for a specific date, returning structured event data.
 */
export const getDailyEvents = (
	dateMs: number,
	settings?: any,
	globalEvents: CalendarEvent[] = [],
) => {
	const dayEvents: CalendarEvent[] = settings?.eventsByDay?.[dateMs] || [];
	const filteredEvents = dayEvents.filter((e) => !isMoonEvent(e));

	const moonEvent = globalEvents.find(
		(e) => !e.duration && e.start * 1000 === dateMs && isMoonEvent(e),
	);

	return {
		allDay: filteredEvents.filter((e) => !e.duration || e.duration >= 86400),
		timed: filteredEvents.filter((e) => e.duration && e.duration < 86400),
		moonEmoji: moonEvent ? getMoonEmoji(moonEvent.name) : null,
		isDisabled: isDateDisabled(dateMs, settings),
		rawEvents: filteredEvents,
	};
};
