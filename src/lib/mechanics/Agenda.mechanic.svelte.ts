import { getContext, setContext } from 'svelte';
import type { PlannerSettings } from '$lib/state/planner-settings.svelte';
import type { CalendarEvent, Timeframe } from '$lib';

const AGENDA_MECHANIC_KEY = Symbol('AGENDA_MECHANIC');

export function setAgendaMechanic(settings: PlannerSettings) {
	const mechanic = new AgendaMechanic(settings);
	setContext(AGENDA_MECHANIC_KEY, mechanic);
	return mechanic;
}

export function getAgendaMechanic() {
	return getContext<AgendaMechanic>(AGENDA_MECHANIC_KEY);
}

export class AgendaMechanic {
	settings: PlannerSettings;

	constructor(settings: PlannerSettings) {
		this.settings = settings;
	}

	filterAgendaEvents(
		events: CalendarEvent[],
		timeframe: Timeframe,
		agendaStartHours: number,
		agendaEndHours: number,
	) {
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
	}

	calculateAgendaMetrics(
		startTime: number | string,
		endTime: number | string,
		intervalMinutes: number,
	) {
		const safeStartTime = Math.max(0, Math.min(23, Number(startTime) || 0));
		const safeEndTime = Math.max(safeStartTime + 1, Math.min(24, Number(endTime) || 24));
		const numHours = safeEndTime - safeStartTime;
		const rowsPerHour = 60 / intervalMinutes;
		const totalRows = numHours * rowsPerHour;

		return { safeStartTime, safeEndTime, numHours, rowsPerHour, totalRows };
	}

	calculateSplitAgendaMetrics(
		startTime: number | string,
		endTime: number | string,
		intervalMinutes: number,
	) {
		const { safeStartTime, safeEndTime, rowsPerHour } = this.calculateAgendaMetrics(
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
	}

	calculateEventStyle(
		eventStartMs: number,
		eventDurationMs: number,
		agendaStartMs: number,
		agendaEndMs: number,
	) {
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
	}

	getAgendaWeekTimeboxHours(startTime: number, endTime: number) {
		return Array.from(
			{ length: Math.max(0, endTime - startTime) },
			(_, i) => startTime + i,
		);
	}

	formatAgendaHour(hour: number, use24HourClock: boolean) {
		if (use24HourClock) {
			return `${hour.toString().padStart(2, '0')}:00`;
		}
		const normalizedHour = hour % 24;
		if (normalizedHour === 12) return '12 PM';
		if (normalizedHour === 0) return '12 AM';
		if (normalizedHour > 12) return `${normalizedHour - 12} PM`;
		return `${normalizedHour} AM`;
	}

	getAgendaWeekTimeboxDays(weekStart: Date) {
		return Array.from({ length: 7 }, (_, i) => {
			const date = new Date(weekStart.getTime() + i * 86400000);
			const allDayEvents = (this.settings?.eventsByDay?.[date.getTime()] ||
				[]) as CalendarEvent[];
			return { date, allDayEvents };
		});
	}

	getAgendaWeekTimeboxGrid(
		hours: number[],
		weekDays: { date: Date; allDayEvents: CalendarEvent[] }[],
		use24HourClock: boolean,
	) {
		return hours.map((hour) => ({
			hour,
			formattedHour: this.formatAgendaHour(hour, use24HourClock),
			days: weekDays.map(({ date, allDayEvents }) => {
				const dayEvents = allDayEvents.filter((e) => {
					if (e.duration && e.duration < 86400) {
						const eventDate = new Date(e.start * 1000);
						return eventDate.getUTCHours() === hour;
					}
					return false;
				});
				return { date, events: dayEvents };
			}),
		}));
	}
}
