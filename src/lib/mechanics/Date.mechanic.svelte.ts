import { getContext, setContext } from 'svelte';
import type { Timeframe, Week } from '$lib/state/planner-settings.svelte';
import type { PlannerSettings } from '$lib/state/planner-settings.svelte';

const DATE_MECHANIC_KEY = Symbol('DATE_MECHANIC');

export function setDateMechanic(settings: PlannerSettings) {
	const mechanic = new DateMechanic(settings);
	setContext(DATE_MECHANIC_KEY, mechanic);
	return mechanic;
}

export function getDateMechanic() {
	return getContext<DateMechanic>(DATE_MECHANIC_KEY);
}

export class DateMechanic {
	settings: PlannerSettings;

	constructor(settings: PlannerSettings) {
		this.settings = settings;
	}

	get startWeekOnSunday() {
		return this.settings.date.startWeekOnSunday;
	}

	get daysOfWeek() {
		return this.startWeekOnSunday
			? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
			: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	}

	/** Returns a date object representing the first day of the week for the given date */
	getFirstDayOfWeek(date: Date | number | string) {
		const parsed = new Date(new Date(date).setUTCHours(0, 0, 0, 0));
		return new Date(parsed).setUTCDate(
			parsed.getUTCDate() -
				((parsed.getUTCDay() - (this.startWeekOnSunday ? 0 : 1) + 7) % 7),
		);
	}

	/** Returns a date object in UTC time for the given date (or year/month/day) */
	getUTCDate(year: number, month?: number, day?: number): Date;
	getUTCDate(date: Date | string): Date;
	getUTCDate(date: Date | number | string, maybeMonth?: number, maybeDay?: number) {
		if (typeof date === 'number') {
			return new Date(Date.UTC(date, maybeMonth || 0, maybeDay ?? 1));
		}
		return new Date(new Date(date).setUTCHours(0, 0, 0, 0));
	}

	/** Returns the parsed timeframe of the given year, month, date */
	getTimeframe(year: number, month = 1, day = 1): Timeframe {
		const start = new Date(Date.UTC(year, month - 1, day));
		const quarter = Math.floor((month - 1) / 3) + 1;
		const firstWeekDayOfMonth = this.getFirstDayOfWeek(this.getUTCDate(year, month - 1));
		const firstWeekDayOfYear = this.getFirstDayOfWeek(this.getUTCDate(year));
		return {
			id: `${year}-${month}-${day}`,
			year: year,
			quarter,
			month,
			weekSinceYear:
				Math.floor((start.getTime() - firstWeekDayOfYear.getTime()) / 604800000) + 1,
			weekSinceMonth:
				Math.floor((start.getTime() - firstWeekDayOfMonth.getTime()) / 604800000) + 1,
			daySinceYear: (start.getTime() - firstWeekDayOfYear.getTime()) / 86400000 + 1,
			daySinceMonth: start.getUTCDate(),
			daySinceWeek: ((start.getUTCDay() - (this.startWeekOnSunday ? 0 : 1) + 7) % 7) + 1,
			start,
			end: start,
			weekStart: start,
			nameShort: start.toLocaleDateString('default', {
				timeZone: 'UTC',
				month: 'short',
				day: 'numeric',
			}),
			nameLong: start.toLocaleDateString('default', {
				timeZone: 'UTC',
				month: 'long',
				weekday: 'short',
				day: 'numeric',
			}),
		};
	}

	/** Constructs a URL anchor string from a date */
	getDateHash(date: Date) {
		return `#${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
	}

	/** Returns the week timeframe info for the given date */
	getWeek(fromDate: Date | number | string): Week {
		const date = new Date(new Date(fromDate).setUTCHours(0, 0, 0, 0));
		const start = new Date(this.getFirstDayOfWeek(date));
		const end = new Date(start.getTime() + 86400000 * 6);
		const year1st = Date.UTC(start.getUTCFullYear());
		const year1stIsPreviousYear =
			(new Date(year1st).getUTCDay() + 7 - (this.startWeekOnSunday ? 0 : 1)) % 7 >= 4;
		const month1st = Date.UTC(start.getUTCFullYear(), start.getUTCMonth());
		const month1stIsPreviousYear =
			(new Date(month1st).getUTCDay() + 7 - (this.startWeekOnSunday ? 0 : 1)) % 7 >= 4;
		const firstCountableWeekdayOfYear =
			this.getFirstDayOfWeek(year1st).getTime() + (year1stIsPreviousYear ? 604800000 : 0);
		const firstCountableWeekdayOfMonth =
			this.getFirstDayOfWeek(month1st).getTime() +
			(month1stIsPreviousYear ? 604800000 : 0);
		let year = start.getUTCFullYear();
		let month = start.getUTCMonth() + 1;
		let weekSinceYear =
			Math.floor((start.getTime() - firstCountableWeekdayOfYear) / 604800000) + 1;
		let weekSinceMonth =
			Math.floor((start.getTime() - firstCountableWeekdayOfMonth) / 604800000) + 1;

		const nextMonth1st = new Date(Date.UTC(year, start.getUTCMonth() + 1, 1));
		const nextMonth1stInWeek = (nextMonth1st.getTime() - start.getTime()) / 604800000 < 1;
		if (nextMonth1stInWeek) {
			const belongsToNextMonth =
				(nextMonth1st.getUTCDay() + 7 - (this.startWeekOnSunday ? 0 : 1)) % 7 < 4;
			if (belongsToNextMonth) {
				year = nextMonth1st.getUTCFullYear();
				month = nextMonth1st.getUTCMonth() + 1;
				weekSinceMonth = 1;
				if (month === 1 && year !== start.getUTCFullYear()) weekSinceYear = 1;
			}
		}

		return {
			id: `${year}-wk${weekSinceYear}`,
			year,
			quarter: Math.floor((month - 1) / 3) + 1,
			month,
			weekSinceYear,
			weekSinceMonth,
			start,
			end,
			weekStart: start,
			nameShort: `W.${weekSinceYear}`,
			nameLong: `Week ${weekSinceYear}`,
		} as Week;
	}
}
