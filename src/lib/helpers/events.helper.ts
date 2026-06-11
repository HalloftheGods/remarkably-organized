import type { CalendarEvent } from '$lib';
import { isMoonEvent, getMoonEmoji } from './date.helper';
import type { Timeframe } from '$lib';

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

export function getCalendarMonthCurrentGrid(monthGrid: any[], settings: any, events: CalendarEvent[]) {
	const firstCurrentMonthIndex = monthGrid.findIndex((c: any) => c.isCurrentMonth);
	return monthGrid.map((cell: any) => {
		const date = new Date(cell.dateMs);
		const dailyData = getDailyEvents(cell.dateMs, settings, events);
		const borderTop =
			cell.isCurrentMonth && cell.dayIndex - firstCurrentMonthIndex >= 7;
		const isFirstCol = cell.dayIndex % 7 === 0;
		const altRow = Math.floor(cell.dayIndex / 7) % 2 === 1;

		return {
			...cell,
			date,
			dailyData,
			borderTop,
			isFirstCol,
			altRow,
		};
	});
}

export function getAgendaWeekDays(
	weekStart: Date,
	settings: any,
	timeframe: Timeframe,
	startTime: number,
	endTime: number
) {
	return Array.from({ length: 7 }, (_, i) => {
		const date = new Date(weekStart.getTime() + i * 86400000);
		const dayEvents = (settings?.eventsByDay?.[date.getTime()] ||
			[]) as CalendarEvent[];
		const allDayEvents = dayEvents.filter(
			(e) => !isMoonEvent(e) && (!e.duration || e.duration >= 86400),
		);
		const timedEvents = dayEvents.filter((e) => {
			if (!e.duration || e.duration >= 86400 || isMoonEvent(e)) return false;
			const timeFromMidnight = e.start * 1000 - date.getTime();
			const eventEndFromMidnight = timeFromMidnight + e.duration * 1000;
			const agendaStartMs = startTime * 3600000;
			const agendaEndMs = endTime * 3600000;
			return eventEndFromMidnight > agendaStartMs && timeFromMidnight < agendaEndMs;
		});
		const moonEvent = dayEvents.find((e) => isMoonEvent(e) && !e.duration);
		const isDisabled = isDateDisabled(date.getTime(), settings);
		const isActive =
			timeframe.month === date.getUTCMonth() + 1 &&
			timeframe.daySinceMonth === date.getUTCDate();

		return {
			date,
			dayEvents,
			allDayEvents,
			timedEvents,
			moonEvent,
			isDisabled,
			isActive,
		};
	});
}
