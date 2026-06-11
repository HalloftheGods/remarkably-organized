import { getContext, setContext } from 'svelte';
import type { PlannerSettings } from '$lib/state/planner-settings.svelte';
import type { CalendarEvent, Timeframe } from '$lib';
import { getFormatterMechanic } from './Formatter.mechanic.svelte';

const EVENT_MECHANIC_KEY = Symbol('EVENT_MECHANIC');

export function setEventMechanic(settings: PlannerSettings) {
	const mechanic = new EventMechanic(settings);
	setContext(EVENT_MECHANIC_KEY, mechanic);
	return mechanic;
}

export function getEventMechanic() {
	return getContext<EventMechanic>(EVENT_MECHANIC_KEY);
}

export class EventMechanic {
	settings: PlannerSettings;

	constructor(settings: PlannerSettings) {
		this.settings = settings;
	}

	isMoonEvent(e: { name: string }): boolean {
		const MOON_NAME_REGEX = /new moon|first quarter|full moon|last quarter|third quarter/i;
		return MOON_NAME_REGEX.test(e.name);
	}

	isDateDisabled(dateMs: number): boolean {
		if (this.settings.dayPage?.disable) return true;
		const start = this.settings.date?.start?.getTime() || 0;
		const end = this.settings.date?.end?.getTime() || Infinity;
		return dateMs < start || dateMs > end;
	}

	getDailyEvents(dateMs: number) {
		const dayEvents: CalendarEvent[] = this.settings.eventsByDay?.[dateMs] || [];
		const filteredEvents = dayEvents.filter((e) => !this.isMoonEvent(e));

		const moonEvent = this.settings.events.find(
			(e) => !e.duration && e.start * 1000 === dateMs && this.isMoonEvent(e),
		);

		let moonEmoji = null;
		try {
			const formatter = getFormatterMechanic();
			if (moonEvent && formatter) {
				moonEmoji = formatter.getMoonEmoji(moonEvent.name);
			}
		} catch (e) {
			// In case getFormatterMechanic throws if it's not set
		}

		return {
			allDay: filteredEvents.filter((e) => !e.duration || e.duration >= 86400),
			timed: filteredEvents.filter((e) => e.duration && e.duration < 86400),
			moonEmoji,
			isDisabled: this.isDateDisabled(dateMs),
			rawEvents: filteredEvents,
		};
	}

	getAgendaWeekDays(weekStart: Date, timeframe: Timeframe, startTime: number, endTime: number) {
		return Array.from({ length: 7 }, (_, i) => {
			const date = new Date(weekStart.getTime() + i * 86400000);
			const dayEvents = (this.settings.eventsByDay?.[date.getTime()] || []) as CalendarEvent[];
			const allDayEvents = dayEvents.filter(
				(e) => !this.isMoonEvent(e) && (!e.duration || e.duration >= 86400),
			);
			const timedEvents = dayEvents.filter((e) => {
				if (!e.duration || e.duration >= 86400 || this.isMoonEvent(e)) return false;
				const timeFromMidnight = e.start * 1000 - date.getTime();
				const eventEndFromMidnight = timeFromMidnight + e.duration * 1000;
				const agendaStartMs = startTime * 3600000;
				const agendaEndMs = endTime * 3600000;
				return eventEndFromMidnight > agendaStartMs && timeFromMidnight < agendaEndMs;
			});
			const moonEvent = dayEvents.find((e) => this.isMoonEvent(e) && !e.duration);
			const isDisabled = this.isDateDisabled(date.getTime());
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

	getNotesWeekDays(weekStart: Date) {
		return Array.from({ length: 7 }, (_, i) => {
			const date = new Date(weekStart.getTime() + i * 86400000);
			const data = this.getDailyEvents(date.getTime());
			return { date, data };
		});
	}

	getNotesWeekGridStyle(display: string) {
		return display === 'columns'
			? 'grid-template-columns: repeat(7, minmax(0, 1fr)); grid-template-rows: 1fr;'
			: display === 'rows'
				? 'grid-template-columns: 1fr; grid-template-rows: repeat(7, 1fr);'
				: 'grid-template-columns: 1fr 1fr; grid-template-rows: repeat(4, 1fr);';
	}
}
