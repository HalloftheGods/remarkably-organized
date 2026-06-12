import type { Timeframe, Week } from '$lib';
import { formatToString } from './string.helper';

export const MOON_PHASES: Record<string, string> = {
	'new moon': '🌑',
	'waxing crescent': '🌒',
	'first quarter': '🌓',
	'waxing gibbous': '🌔',
	'full moon': '🌕',
	'waning gibbous': '🌖',
	'last quarter': '🌗',
	'third quarter': '🌗',
	'waning crescent': '🌘',
};

export const MOON_NAME_REGEX =
	/new moon|waxing crescent|first quarter|waxing gibbous|full moon|waning gibbous|last quarter|third quarter|waning crescent/i;

export const TEXT_MOON_PHASES: Record<string, string> = {
	'new moon': '🌕', // Swapped with Full Moon to fix dark-mode text inversion
	'first quarter': '🌗', // Swapped with Last Quarter to fix text inversion
	'full moon': '🌑', // Swapped with New Moon
	'last quarter': '🌓', // Swapped with First Quarter
	'third quarter': '🌓',
};

export const getMoonEmoji = (name: string, settings?: any): string | null => {
	const match = name.toLowerCase().match(MOON_NAME_REGEX);
	if (!match) return null;
	
	if (settings?.emojis?.disable && TEXT_MOON_PHASES[match[0]]) {
		return `${TEXT_MOON_PHASES[match[0]]}\uFE0E`;
	}

	const emoji = MOON_PHASES[match[0]];
	return settings?.emojis?.disable ? `${emoji}\uFE0E` : emoji;
};

export const isMoonEvent = (e: { name: string }): boolean => MOON_NAME_REGEX.test(e.name);

export function getYearEmoji(year: number) {
	const animals = [
		'🐵',
		'🐓',
		'🐶',
		'🐷',
		'🐀',
		'🐂',
		'🐅',
		'🐇',
		'🐉',
		'🐍',
		'🐎',
		'🐏',
	];
	return animals[year % 12];
}

export const monthEmojis = [
	'🎉',
	'💝',
	'🍀',
	'🥚',
	'🌸',
	'☀️',
	'🧨',
	'⛺',
	'🍎',
	'🎃',
	'🦃',
	'⛄',
];
export const quarterEmojis = ['❄️', '🌷', '☀️', '🍂'];

export const getDaysOfWeek = (startWeekOnSunday = false) =>
	startWeekOnSunday
		? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
		: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** Returns a date object representing the first day of the week for the given date (will be a Monday unless startWeekOnSunday is true) */
export function getFirstDayOfWeek(
	date: Date | number | string,
	startWeekOnSunday = false,
) {
	const parsed = new Date(new Date(date).setUTCHours(0, 0, 0, 0));
	return new Date(parsed).setUTCDate(
		parsed.getUTCDate() - ((parsed.getUTCDay() - (startWeekOnSunday ? 0 : 1) + 7) % 7),
	);
}

/** Returns a date object in UTC time for the given date (or year/month/day) */
export function getUTCDate(year: number, month?: number, day?: number): Date;
export function getUTCDate(date: Date | string): Date;
export function getUTCDate(
	date: Date | number | string,
	maybeMonth?: number,
	maybeDay?: number,
) {
	if (typeof date === 'number') {
		return new Date(Date.UTC(date, maybeMonth || 0, maybeDay ?? 1));
	}
	return new Date(new Date(date).setUTCHours(0, 0, 0, 0));
}

/** Returns the parsed timeframe of the given year, month, date */
export function getTimeframe(
	year: number,
	month = 1,
	day = 1,
	startWeekOnSunday = false,
): Timeframe {
	const start = new Date(Date.UTC(year, month - 1, day));
	const quarter = Math.floor((month - 1) / 3) + 1;
	const firstWeekDayOfMonth = getFirstDayOfWeek(
		getUTCDate(year, month - 1),
		startWeekOnSunday,
	);
	const firstWeekDayOfYear = getFirstDayOfWeek(getUTCDate(year), startWeekOnSunday);
	return {
		id: `${year}-${month}-${day}`,
		year: year,
		quarter,
		month,
		weekSinceYear: Math.floor((start.getTime() - firstWeekDayOfYear) / 604800000) + 1,
		weekSinceMonth: Math.floor((start.getTime() - firstWeekDayOfMonth) / 604800000) + 1,
		daySinceYear: (start.getTime() - firstWeekDayOfYear) / 86400000 + 1,
		daySinceMonth: start.getUTCDate(),
		daySinceWeek: ((start.getUTCDay() - (startWeekOnSunday ? 0 : 1) + 7) % 7) + 1,
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
export const getDateHash = (date: Date) =>
	`#${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;

/** Returns the week timeframe info for the given date */
export function getWeek(fromDate: Date | number | string, startWeekOnSunday = false) {
	const date = new Date(new Date(fromDate).setUTCHours(0, 0, 0, 0));
	const start = new Date(getFirstDayOfWeek(date, startWeekOnSunday));
	const end = new Date(start.getTime() + 86400000 * 6);
	const year1st = Date.UTC(start.getUTCFullYear());
	const year1stIsPreviousYear =
		(new Date(year1st).getUTCDay() + 7 - (startWeekOnSunday ? 0 : 1)) % 7 >= 4;
	const month1st = Date.UTC(start.getUTCFullYear(), start.getUTCMonth());
	const month1stIsPreviousYear =
		(new Date(month1st).getUTCDay() + 7 - (startWeekOnSunday ? 0 : 1)) % 7 >= 4;
	const firstCountableWeekdayOfYear =
		getFirstDayOfWeek(year1st, startWeekOnSunday) +
		(year1stIsPreviousYear ? 604800000 : 0);
	const firstCountableWeekdayOfMonth =
		getFirstDayOfWeek(month1st, startWeekOnSunday) +
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
			(nextMonth1st.getUTCDay() + 7 - (startWeekOnSunday ? 0 : 1)) % 7 < 4;
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

/** Returns data necessary for generating a year-long calendar grid */
export function calculateYearGrid(year: number, startWeekOnSunday = false) {
	const yearStart = new Date(Date.UTC(year || 2024, 0, 1));
	const isLeapYear =
		(yearStart.getUTCFullYear() % 4 === 0 && yearStart.getUTCFullYear() % 100 !== 0) ||
		yearStart.getUTCFullYear() % 400 === 0;
	const numDays = isLeapYear ? 366 : 365;

	const weekLayoutStart = new Date(
		getFirstDayOfWeek(Date.UTC(year || 2024, 0, 1), startWeekOnSunday),
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

export function calculateMonthGrid(timeframe: Timeframe, startWeekOnSunday = false) {
	if (!timeframe || !timeframe.start || !timeframe.end) return [];

	const grid = [];

	// Regardless of the timeframe passed, compute the bounds for the full month
	const monthStart = getUTCDate(
		timeframe.start.getUTCFullYear(),
		timeframe.start.getUTCMonth(),
	);
	const monthEnd = getUTCDate(
		timeframe.start.getUTCFullYear(),
		timeframe.start.getUTCMonth() + 1,
		0,
	);

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

export function getHabitsYearWeekHeaders(weekLayoutStart: Date) {
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

export function getHabitsYearWeekDays(
	weekLayoutStart: Date,
	totalDaysWeekView: number,
	year: number,
) {
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
			dayOrdinal: formatToString(date.getUTCDate(), { type: 'ordinal', html: true }),
		};
	});
}

export function getHabitsYearMonthHeaders() {
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

export function getHabitsYearMonthDays(yearStart: Date, numDays: number) {
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
			dayOrdinal: formatToString(date.getUTCDate(), { type: 'ordinal', html: true }),
		};
	});
}

export function getCalendarMonthWeekdays(
	startWeekOnSunday: boolean,
	format: 'long' | 'short' | 'narrow' = 'long',
) {
	return new Array(7).fill(0).map((_, i) => {
		const date = new Date(Date.UTC(1970, 0, 4 + i + (startWeekOnSunday ? 0 : 1)));
		return date.toLocaleString('default', { weekday: format, timeZone: 'UTC' });
	});
}

export function getCalendarMonthWeekLinks(
	timeframe: Timeframe,
	startWeekOnSunday: boolean,
	showWeekLinks: boolean,
	useWeekSinceYear: boolean,
) {
	if (!showWeekLinks || !timeframe?.start) return [];

	const monthStart = getUTCDate(
		timeframe.start.getUTCFullYear(),
		timeframe.start.getUTCMonth(),
	);
	const monthEnd = getUTCDate(
		timeframe.start.getUTCFullYear(),
		timeframe.start.getUTCMonth() + 1,
		0,
	);
	const monthWeekStart = new Date(getFirstDayOfWeek(monthStart, startWeekOnSunday));

	const numWeeks =
		Math.floor((monthEnd.getTime() - monthWeekStart.getTime()) / 604800000) + 1;
	return new Array(numWeeks).fill(0).map((_, i) => {
		const date = new Date(monthWeekStart.getTime() + i * 604800000);
		const week = getWeek(date, startWeekOnSunday);
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

export function getCoverPageCurrentDayInfo(settings: any) {
	if (!settings.date?.today || !settings.coverPage?.showCurrentDay) return null;
	const today = settings.date.today;
	const quarter = Math.floor(today.getUTCMonth() / 3) + 1;
	const monthName = today.toLocaleString('default', {
		month: 'long',
		timeZone: 'UTC',
	});
	const dayName = today.toLocaleString('default', {
		weekday: 'long',
		timeZone: 'UTC',
	});
	const currentWeek = Math.ceil(today.getUTCDate() / 7);

	const getOrdinal = (d: number) => {
		if (d > 3 && d < 21) return 'th';
		switch (d % 10) {
			case 1:
				return 'st';
			case 2:
				return 'nd';
			case 3:
				return 'rd';
			default:
				return 'th';
		}
	};
	const dateOrdinal = getOrdinal(today.getUTCDate());

	return { today, quarter, monthName, dayName, currentWeek, dateOrdinal };
}

export function getCoverPagePlannerLink(settings: any) {
	return !settings.dashboardPage?.disable
		? `#dashboard`
		: !settings.yearPage?.disable
			? `#${settings.years[0].id}`
			: !settings.quarterPage?.disable
				? `#${settings.quarters[0].id}`
				: !settings.monthPage?.disable
					? `#${settings.months[0].id}`
					: !settings.weekPage?.disable
						? `#${settings.weeks[0].id}`
						: !settings.dayPage?.disable
							? `#${settings.days[0].id}`
							: '';
}
