import type { CalendarEvent, Timeframe } from '$lib';

/**
 * Separates agenda events into all-day and timed events based on duration and time bounds.
 */
export const filterAgendaEvents = (
	events: CalendarEvent[],
	timeframe: Timeframe,
	agendaStartHours: number,
	agendaEndHours: number,
) => {
	const allDayEvents = events.filter((e) => {
		const duration = e.duration ?? 0;
		return duration === 0 || duration >= 86400;
	});

	const timedEvents = events.filter((e) => {
		const duration = e.duration ?? 0;
		if (duration === 0 || duration >= 86400) return false;

		const timeFromMidnight = e.start * 1000 - timeframe.start.getTime();
		const eventEndFromMidnight = timeFromMidnight + duration * 1000;
		const agendaStartMs = agendaStartHours * 3600000;
		const agendaEndMs = agendaEndHours * 3600000;

		return eventEndFromMidnight > agendaStartMs && timeFromMidnight < agendaEndMs;
	});

	return { allDayEvents, timedEvents };
};

/**
 * Calculates common agenda layout metrics safely.
 */
export const calculateAgendaMetrics = (
	startTime: number | string,
	endTime: number | string,
	intervalMinutes: number,
) => {
	const safeStartTime = Math.max(0, Math.min(23, Number(startTime) || 0));
	const safeEndTime = Math.max(safeStartTime + 1, Math.min(24, Number(endTime) || 24));
	const numHours = safeEndTime - safeStartTime;
	const rowsPerHour = 60 / intervalMinutes;
	const totalRows = numHours * rowsPerHour;

	return { safeStartTime, safeEndTime, numHours, rowsPerHour, totalRows };
};

/**
 * Calculates layout metrics specifically for a split AM/PM agenda view.
 */
export const calculateSplitAgendaMetrics = (
	startTime: number | string,
	endTime: number | string,
	intervalMinutes: number,
) => {
	const { safeStartTime, safeEndTime, rowsPerHour } = calculateAgendaMetrics(
		startTime,
		endTime,
		intervalMinutes,
	);

	const amStart = Math.min(safeStartTime, 12);
	const amEnd = Math.max(amStart, Math.min(safeEndTime, 12));
	const numAmHours = amEnd - amStart;
	const amTotalRows = numAmHours * rowsPerHour;

	const pmStart = Math.max(safeStartTime, Math.min(12, safeEndTime));
	const pmEnd = Math.max(pmStart, safeEndTime);
	const numPmHours = pmEnd - pmStart;
	const pmTotalRows = numPmHours * rowsPerHour;

	const maxHours = Math.max(numAmHours, numPmHours);
	const maxTotalRows = maxHours * rowsPerHour;

	return {
		safeStartTime,
		safeEndTime,
		rowsPerHour,
		amStart,
		amEnd,
		numAmHours,
		amTotalRows,
		pmStart,
		pmEnd,
		numPmHours,
		pmTotalRows,
		maxHours,
		maxTotalRows,
	};
};

/**
 * Calculates the precise top and height percentages for rendering a timed event
 * relative to the start and end of its section (e.g. whole day, AM, PM).
 */
export const calculateEventStyle = (
	eventStartMs: number,
	eventDurationMs: number,
	agendaStartMs: number,
	agendaEndMs: number,
) => {
	const startOffset = Math.max(0, eventStartMs - agendaStartMs);
	const visibleDurationMs =
		eventStartMs < agendaStartMs
			? eventDurationMs - (agendaStartMs - eventStartMs)
			: eventDurationMs;

	const isVisible =
		visibleDurationMs > 0 &&
		eventStartMs < agendaEndMs &&
		eventStartMs + eventDurationMs > agendaStartMs;

	if (!isVisible) {
		return { isVisible: false, top: 0, height: 0 };
	}

	const agendaDurationMs = agendaEndMs - agendaStartMs;
	const top = (startOffset / agendaDurationMs) * 100;
	const height =
		(Math.min(visibleDurationMs, agendaEndMs - (agendaStartMs + startOffset)) /
			agendaDurationMs) *
		100;

	return { isVisible: true, top, height };
};
