import { getContext, setContext } from 'svelte';
import type { PlannerSettings } from '$lib/state/planner-settings.svelte';
import type { Timeframe } from '$lib';
import { getDateMechanic } from './Date.mechanic.svelte';
import { getEventMechanic } from './Event.mechanic.svelte';
import { getFormatterMechanic } from './Formatter.mechanic.svelte';

const GRID_MECHANIC_KEY = Symbol('GRID_MECHANIC');

export function setGridMechanic(settings: PlannerSettings) {
	const mechanic = new GridMechanic(settings);
	setContext(GRID_MECHANIC_KEY, mechanic);
	return mechanic;
}

export function getGridMechanic() {
	return getContext<GridMechanic>(GRID_MECHANIC_KEY);
}

export class GridMechanic {
	settings: PlannerSettings;

	constructor(settings: PlannerSettings) {
		this.settings = settings;
	}

	calculateYearGrid(year: number) {
		const dateMechanic = getDateMechanic();
		const yearStart = new Date(Date.UTC(year || 2024, 0, 1));
		const isLeapYear =
			(yearStart.getUTCFullYear() % 4 === 0 && yearStart.getUTCFullYear() % 100 !== 0) ||
			yearStart.getUTCFullYear() % 400 === 0;
		const numDays = isLeapYear ? 366 : 365;

		const weekLayoutStart = new Date(
			dateMechanic.getFirstDayOfWeek(Date.UTC(year || 2024, 0, 1)),
		);
		const weekLayoutEnd = new Date(Date.UTC(year || 2024, 11, 31));
		const numDaysWeekView =
			Math.floor((weekLayoutEnd.getTime() - weekLayoutStart.getTime()) / 86400000) + 1;

		const totalDaysWeekView = Math.ceil(numDaysWeekView / 14) * 14;
		const numWeekRows = totalDaysWeekView / 14;

		return {
			yearStart,
			isLeapYear,
			numDays,
			weekLayoutStart,
			weekLayoutEnd,
			numDaysWeekView,
			totalDaysWeekView,
			numWeekRows,
		};
	}

	calculateMonthGrid(timeframe: Timeframe) {
		const dateMechanic = getDateMechanic();
		if (!timeframe || !timeframe.start || !timeframe.end) return [];

		const grid = [];

		const monthStart = dateMechanic.getUTCDate(
			timeframe.start.getUTCFullYear(),
			timeframe.start.getUTCMonth(),
		);
		const monthEnd = dateMechanic.getUTCDate(
			timeframe.start.getUTCFullYear(),
			timeframe.start.getUTCMonth() + 1,
			0,
		);

		const startWeekOnSunday = dateMechanic.startWeekOnSunday;

		// Previous month days
		const numDaysBeforeStart =
			(monthStart.getUTCDay() + 7 - (startWeekOnSunday ? 0 : 1)) % 7;
		for (let i = 0; i < numDaysBeforeStart; i++) {
			const dateMs = monthStart.getTime() + (i - numDaysBeforeStart) * 86400000;
			grid.push({
				dateMs,
				isCurrentMonth: false,
				dayIndex: i,
			});
		}

		// Current month days
		const numDaysInMonth = monthEnd.getUTCDate();
		for (let i = 0; i < numDaysInMonth; i++) {
			const dateMs = monthStart.getTime() + i * 86400000;
			grid.push({
				dateMs,
				isCurrentMonth: true,
				dayIndex: numDaysBeforeStart + i,
			});
		}

		// Next month days
		const numDaysAfterEnd =
			(6 - monthEnd.getUTCDay() + 7 + (startWeekOnSunday ? 0 : 1)) % 7;
		for (let i = 0; i < numDaysAfterEnd; i++) {
			const dateMs = monthEnd.getTime() + (i + 1) * 86400000;
			grid.push({
				dateMs,
				isCurrentMonth: false,
				dayIndex: numDaysBeforeStart + numDaysInMonth + i,
			});
		}

		return grid;
	}

	getCalendarMonthCurrentGrid(timeframe: Timeframe) {
		const eventMechanic = getEventMechanic();
		const monthGrid = this.calculateMonthGrid(timeframe);
		const firstCurrentMonthIndex = monthGrid.findIndex((c: any) => c.isCurrentMonth);

		return monthGrid.map((cell: any) => {
			const date = new Date(cell.dateMs);
			const dailyData = eventMechanic.getDailyEvents(cell.dateMs);
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

	getHabitsYearWeekHeaders(weekLayoutStart: Date) {
		return Array.from({ length: 14 }, (_, i) => {
			const headerDate = new Date(weekLayoutStart.getTime() + i * 86400000);
			return {
				name: headerDate.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' }),
				isSecondWeek: i === 7,
				isLastCol: i === 13,
				col: i + 1,
			};
		});
	}

	getHabitsYearWeekDays(weekLayoutStart: Date, totalDaysWeekView: number, year: number) {
		const formatter = getFormatterMechanic();
		return Array.from({ length: totalDaysWeekView }, (_, day) => {
			const date = new Date(weekLayoutStart.getTime() + day * 86400000);
			const col = (day % 14) + 1;
			const row = Math.floor(day / 14) + 2;
			return {
				date,
				isFirstOfMonth: date.getUTCDate() === 1,
				isEvenMonth: date.getUTCMonth() % 2 !== 0,
				col,
				row,
				isSecondWeek: col === 8,
				isFirstRow: row === 2,
				isLastCol: col === 14,
				isOutOfRange: date.getUTCFullYear() !== year,
				monthNameLong: date
					.toLocaleString('default', { month: 'long', timeZone: 'UTC' })
					.toLowerCase(),
				monthNameShort: date.toLocaleString('default', {
					month: 'short',
					timeZone: 'UTC',
				}),
				dayOrdinal: formatter
					? formatter.formatToString(date.getUTCDate(), { type: 'ordinal', html: true })
					: '',
			};
		});
	}

	getHabitsYearMonthHeaders() {
		return Array.from({ length: 12 }, (_, month) => {
			const date = new Date(Date.UTC(2000, month));
			return {
				month,
				isEvenMonth: month % 2 !== 0,
				isLastCol: month === 11,
				col: month + 1,
				monthNameLong: date
					.toLocaleString('default', { month: 'long', timeZone: 'UTC' })
					.toLowerCase(),
				monthNameShort: date.toLocaleString('default', {
					month: 'short',
					timeZone: 'UTC',
				}),
			};
		});
	}

	getHabitsYearMonthDays(yearStart: Date, numDays: number) {
		const formatter = getFormatterMechanic();
		return Array.from({ length: numDays }, (_, day) => {
			const date = new Date(yearStart.getTime() + day * 86400000);
			return {
				date,
				isFirstRow: date.getUTCDate() === 1,
				isEvenMonth: date.getUTCMonth() % 2 !== 0,
				isLastCol: date.getUTCMonth() === 11,
				col: date.getUTCMonth() + 1,
				row: date.getUTCDate() + 1,
				weekdayShort: date.toLocaleString('default', {
					weekday: 'short',
					timeZone: 'UTC',
				}),
				dayOrdinal: formatter
					? formatter.formatToString(date.getUTCDate(), { type: 'ordinal', html: true })
					: '',
			};
		});
	}

	getCalendarMonthWeekdays() {
		const dateMechanic = getDateMechanic();
		return new Array(7).fill(0).map((_, i) => {
			const date = new Date(
				Date.UTC(1970, 0, 4 + i + (dateMechanic.startWeekOnSunday ? 0 : 1)),
			);
			return date.toLocaleString('default', { weekday: 'long', timeZone: 'UTC' });
		});
	}

	getCalendarMonthWeekLinks(
		timeframe: Timeframe,
		showWeekLinks: boolean,
		useWeekSinceYear: boolean,
	) {
		const dateMechanic = getDateMechanic();
		if (!showWeekLinks || !timeframe?.start) return [];

		const monthStart = dateMechanic.getUTCDate(
			timeframe.start.getUTCFullYear(),
			timeframe.start.getUTCMonth(),
		);
		const monthEnd = dateMechanic.getUTCDate(
			timeframe.start.getUTCFullYear(),
			timeframe.start.getUTCMonth() + 1,
			0,
		);
		const monthWeekStart = new Date(dateMechanic.getFirstDayOfWeek(monthStart));

		const numWeeks =
			Math.floor((monthEnd.getTime() - monthWeekStart.getTime()) / 604800000) + 1;
		return new Array(numWeeks).fill(0).map((_, i) => {
			const date = new Date(monthWeekStart.getTime() + i * 604800000);
			const week = dateMechanic.getWeek(date);
			const monthShort =
				!useWeekSinceYear && week.year && week.month && week.month !== timeframe.month
					? new Date(Date.UTC(week.year, week.month)).toLocaleString('default', {
							month: 'short',
						})
					: '';
			return {
				...week,
				monthShort,
			};
		});
	}
}
