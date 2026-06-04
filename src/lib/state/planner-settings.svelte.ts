import {
	getFirstDayOfWeek,
	getUTCDate,
	objectDiff,
	type Collection,
	type CalendarEvent,
	getWeek,
} from '$lib';
import { toast } from '$lib/components/toast.state.svelte';
import type { PageTemplate } from './collection';

const EVENT_EMOJIS: Record<string, string> = {
	'new year': '🎊',
	valentine: '💝',
	"patrick's day": '🍀',
	easter: '🐰',
	"mother's day": '💐',
	"father's day": '👔',
	'earth day': '🌍',
	juneteenth: '✊🏿',
	'independence day': '🧨',
	'july 4': '🧨',
	halloween: '🎃',
	thanksgiving: '🦃',
	christmas: '🎄',
	hanukkah: '🕎',
	kwanzaa: '🕯️',
	'veterans day': '🎖️',
	'memorial day': '🇺🇸',
	'labor day': '🛠️',
	"presidents' day": '🏛️',
	'new moon': '🌑',
	'first quarter': '🌓',
	'full moon': '🌕',
	'last quarter': '🌗',
	'third quarter': '🌗',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DeepPartial<T> = T extends { [key: string]: any }
	? { [P in keyof T]?: DeepPartial<T[P]> }
	: T;

export interface Timeframe {
	/** A unique identifier for this timeframe used for linking to its page */
	id: string;

	/** The first day of the timeframe */
	start: Date;

	/** The last day of the timeframe */
	end: Date;

	/** The start of the timeframe rounded down to the nearest start of week */
	weekStart: Date;

	/** The user-displayable short name of the timeframe */
	nameShort: string;

	/** The user-displayable long name of the timeframe */
	nameLong: string;

	/** The year this timeframe references */
	year?: number;

	/** The 1-indexed quarter */
	quarter?: number;

	/** The 1-indexed month (January is '1') */
	month?: number;

	/** The 1-indexed week from the start of the year */
	weekSinceYear?: number;

	/** The 1-indexed week from the start of the month */
	weekSinceMonth?: number;

	/** The 1-indexed day from the start of the year (1-365) */
	daySinceYear?: number;

	/** The 1-indexed week from the start of the month (1-31) */
	daySinceMonth?: number;

	/** The 1-indexed week from the start of the week (1-7) */
	daySinceWeek?: number;

	/** The year that this day's week should be considered a part of */
	weekYear?: number;

	/** The month that this day's week should be considered a part of */
	weekMonth?: number;

	/** The month that this day's week should be considered a part of */
	weekQuarter?: number;
}

export interface Year extends Omit<
	Timeframe,
	| 'quarter'
	| 'month'
	| 'weekSinceYear'
	| 'weekSinceMonth'
	| 'daySinceYear'
	| 'daySinceMonth'
	| 'daySinceWeek'
> {
	/** The year this timeframe references */
	year: number;
}

export interface Quarter extends Year {
	/** The 1-indexed quarter */
	quarter: number;
}

export interface Month extends Quarter {
	/** The 1-indexed month (January is '1') */
	month: number;
}

export interface Week extends Month {
	/** The 1-indexed week from the start of the year */
	weekSinceYear: number;

	/** The 1-indexed week from the start of the month */
	weekSinceMonth: number;
}

export interface Day extends Week {
	/** The 1-indexed day from the start of the year (1-365) */
	daySinceYear: number;

	/** The 1-indexed week from the start of the month (1-31) */
	daySinceMonth: number;

	/** The 1-indexed week from the start of the week (1-7) */
	daySinceWeek: number;

	/** The year that this day's week should be considered a part of */
	weekYear: number;

	/** The month that this day's week should be considered a part of */
	weekMonth: number;

	/** The month that this day's week should be considered a part of */
	weekQuarter: number;
}

export class PlannerSettings {
	private initialSettings: ReturnType<PlannerSettings['serialize']> | undefined =
		undefined;

	/** Settings for changing the overall design of the planner */
	design = $state({
		aspectRatio: 0.75,
		width: 702,
		font: 'Rancho',
		fontDisplay: 'Bebas Neue',
		colorBg: '#ffffff',
		colorNavBg: '#f2f2f2',
		colorText: '#000000',
		colorLines: '#c8c8c8',
		colorDots: '#646464',
		margin: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		},
	});

	/** Settings for changing the dates of the planner (like start & end dates) */
	date = $state(
		(() => {
			const defaultStart = new Date(
				Date.UTC(new Date().getUTCFullYear() + (new Date().getUTCMonth() > 6 ? 1 : 0), 0),
			);
			const defaultEnd = new Date(Date.UTC(defaultStart.getUTCFullYear() + 1, 0, 0));
			return {
				timezoneOffset: new Date().getTimezoneOffset() / 60,
				start: defaultStart,
				end: defaultEnd,
				today: new Date(new Date().setUTCHours(0, 0, 0, 0)),
				startWeekOnSunday: true,
			};
		})(),
	);

	/** Settings for changing the side navigation bar display */
	sideNav = $state({
		disable: false,
		showCollectionLinks: true,
		width: 52,
		leftSide: false,
		font: 'Acme',
	});

	/** Settings for changing the top navigation bar display */
	topNav = $state({
		disable: false,
		showCollectionLinks: false,
		height: 45,
		font: 'Acme',
	});

	/** Settings for changing the cover page display */
	coverPage = $state({
		disable: false,
		name: '',
		email: '𑁍',
		title: '',
		showCollectionLinks: true,
		showCurrentDay: false,
		darkBackground: true,
		font: 'Roboto Slab',
	});

	/** Settings for changing the dashboard page display */
	dashboardPage = $state({
		disable: false,
		title: '👋 Welcome',
		fontSize: 1.0,
	});

	/** Settings for changing how the year pages should work */
	yearPage = $state({
		disable: false,
		notePagesTemplate: 'habit-year-by-month' as PageTemplate,
		notePagesAmount: 1,
		notePagesColumns: 1,
	});

	/** Settings for changing how the quarterly pages should work */
	quarterPage = $state({
		disable: false,
		template: 'calendar-quarter' as PageTemplate,
		goalsColumns: 1,
		notePagesTemplate: 'finance-tracker' as PageTemplate,
		notePagesAmount: 3,
		notePagesColumns: 1,
	});

	/** Settings for changing how the monthly pages should work */
	monthPage = $state({
		disable: false,
		template: 'calendar-month' as PageTemplate,
		columns: 1,
		notePagesTemplate: 'tasklist-progress' as PageTemplate,
		notePagesAmount: 1,
		notePagesColumns: 1,
	});

	/** Settings for changing how the weekly pages should work */
	weekPage = $state({
		disable: false,
		template: 'notes-week-rows' as PageTemplate,
		columns: 1,
		notePagesTemplate: 'dotted-small' as PageTemplate,
		notePagesAmount: 1,
		notePagesColumns: 1,
		useWeekSinceYear: false,
		useWeekNumbersInSideNav: true,
		use24HourClock: false,
		alignDayText: 'right' as 'left' | 'center' | 'right',
		sideNavDisplay: 'weeks-this-month' as
			| 'days-this-week'
			| 'days-this-month'
			| 'days-this-year'
			| 'weeks-this-year'
			| 'weeks-this-month'
			| 'months',
		agendaStartTime: 0,
		agendaEndTime: 24,
		agendaInterval: 60,
		notePagesUse24HourClock: false,
		notePagesAgendaStartTime: 0,
		notePagesAgendaEndTime: 24,
		notePagesAgendaInterval: 60,
	});

	/** Settings for changing how the daily pages should work */
	dayPage = $state({
		disable: false,
		template: 'agenda-day' as PageTemplate,
		columns: 1,
		notePagesTemplate: 'dotted-large' as PageTemplate,
		notePagesAmount: 1,
		notePagesColumns: 1,
		use24HourClock: false,
		sideNavDisplay: 'days-this-week' as
			| 'days-this-week'
			| 'days-this-month'
			| 'days-this-year'
			| 'weeks-this-year'
			| 'weeks-this-month'
			| 'months',
		agendaStartTime: 0,
		agendaEndTime: 24,
		agendaInterval: 60,
		notePagesUse24HourClock: false,
		notePagesAgendaStartTime: 0,
		notePagesAgendaEndTime: 24,
		notePagesAgendaInterval: 60,
	});

	/** Settings for extra collections */
	customCollections = $state({
		disable: false,
	});

	/** Settings for month emojis */
	emojis = $state({
		disable: false,
		q1: '❄️',
		q2: '🌷',
		q3: '☀️',
		q4: '🍂',

		january: '🎉',
		february: '💝',
		march: '🍀',
		april: '🥚',
		may: '🌸',
		june: '☀️',
		july: '🧨',
		august: '⛺',
		september: '🍎',
		october: '🎃',
		november: '🦃',
		december: '⛄',

		get months() {
			if (this.disable) {
				return ['', '', '', '', '', '', '', '', '', '', '', ''];
			}
			return [
				this.january,
				this.february,
				this.march,
				this.april,
				this.may,
				this.june,
				this.july,
				this.august,
				this.september,
				this.october,
				this.november,
				this.december,
			];
		},

		get quarters() {
			if (this.disable) {
				return ['', '', '', ''];
			}
			return [this.q1, this.q2, this.q3, this.q4];
		},
	});

	/** The list of extra note/goals collections in addition to the planner pages */
	collections = $state([
		{
			id: '1780292531894',
			name: '🤝 Meet',
			total: 84,
			type: 'meeting-minutes',
			numIndexPages: 1,
			columns: 1,
			numPagesPerItem: 1,
		},
		{
			id: '1780288353819',
			name: '✅ To-Do',
			total: 84,
			type: 'todo-large',
			numIndexPages: 1,
			columns: 2,
			numPagesPerItem: 1,
		},
		{
			id: 'goals',
			name: '📓 Jot',
			total: 84,
			type: 'lined-large',
			numIndexPages: 1,
			columns: 1,
			numPagesPerItem: 1,
		},
		{
			id: '1780288265006',
			name: '🎨 Sketch',
			total: 84,
			type: 'dotted',
			numIndexPages: 1,
			columns: 1,
			numPagesPerItem: 1,
		},
		{
			id: 'notes',
			name: '👟 Walk',
			total: 1,
			type: 'habit-year-by-week',
			numIndexPages: 0,
			columns: 1,
			numPagesPerItem: 1,
		},
	] as Collection[]);

	/** The list of extra note/goals collections in addition to the planner pages */
	calendars = $state([
		{
			url: `https://calendar.google.com/calendar/ical/en.usa%23holiday%40group.v.calendar.google.com/public/basic.ics`,
			events: [] as CalendarEvent[],
			updating: false,
			lastUpdated: 0,
			name: 'Public Holidays',
		},
		{
			url: `https://calendar.google.com/calendar/ical/ht3jlfaac5lfd6263ulfh4tql8%40group.calendar.google.com/public/basic.ics`,
			events: [] as CalendarEvent[],
			updating: false,
			lastUpdated: 0,
			name: 'Moon Phases',
		},
	]);

	/** The computed list of years within the start/end timeframe in this.date */
	readonly years = $derived(
		// eslint-disable-next-line @typescript-eslint/no-array-constructor
		Array.from(
			{ length: this.date.end.getUTCFullYear() - this.date.start.getUTCFullYear() + 1 },
			(_, i) => {
				const numYears =
					this.date.end.getUTCFullYear() - this.date.start.getUTCFullYear() + 1;
				const year = this.date.start.getUTCFullYear() + i;
				const firstDayOfYear = new Date(`${year}-01-01`);
				const lastDayOfYear = new Date(`${year}-12-31`);
				const start = i === 0 ? new Date(this.date.start.getTime()) : firstDayOfYear;
				const end =
					i === numYears - 1 ? new Date(this.date.end.getTime()) : lastDayOfYear;
				const weekStart = new Date(
					getFirstDayOfWeek(
						Date.UTC(start.getUTCFullYear()),
						this.date.startWeekOnSunday,
					),
				);
				return {
					id: `${year}`,
					year,
					start,
					end,
					weekStart,
					nameShort: year.toString().slice(-2),
					nameLong: year.toString(),
				} as Year;
			},
		),
	);

	/** The computed list of quarters within the start/end timeframe in this.date */
	readonly quarters = $derived(
		this.years.reduce((acc, year) => {
			const startQuarter = Math.floor(year.start.getUTCMonth() / 3) + 1;
			const endQuarter = Math.floor(year.end.getUTCMonth() / 3) + 1;
			for (let quarter = startQuarter; quarter <= endQuarter; quarter++) {
				const start = getUTCDate(year.start.getUTCFullYear(), (quarter - 1) * 3);
				const end = getUTCDate(year.start.getUTCFullYear(), (quarter - 1) * 3 + 3, 0);
				acc.push({
					id: `${year.year}-q${quarter}`,
					year: year.year,
					quarter,
					start,
					end,
					weekStart: new Date(getFirstDayOfWeek(start, this.date.startWeekOnSunday)),
					nameShort: `Q${quarter}`,
					nameLong: `Quarter ${quarter}`,
				});
			}
			return acc;
		}, [] as Quarter[]),
	);

	/** The computed list of months within the start/end timeframe in this.date */
	readonly months = $derived(
		this.years.reduce((acc, year) => {
			const startMonth = year.start.getUTCMonth() + 1;
			const endMonth = year.end.getUTCMonth() + 1;
			for (let month = startMonth; month <= endMonth; month++) {
				const start = getUTCDate(year.start.getUTCFullYear(), month - 1);
				const end = getUTCDate(year.start.getUTCFullYear(), month, 0);
				const quarter = Math.floor((month - 1) / 3) + 1;
				acc.push({
					id: `${year.year}-${month}`,
					year: year.year,
					quarter,
					month,
					start,
					end,
					weekStart: new Date(getFirstDayOfWeek(start, this.date.startWeekOnSunday)),
					nameShort: start.toLocaleDateString('default', {
						timeZone: 'UTC',
						month: 'short',
					}),
					nameLong: start.toLocaleDateString('default', {
						timeZone: 'UTC',
						month: 'long',
					}),
				});
			}
			return acc;
		}, [] as Month[]),
	);

	/** The computed list of weeks within the start/end timeframe in this.date */
	readonly weeks = $derived(
		this.years.reduce((acc, year) => {
			const firstWeekDayOfTimeframe = getFirstDayOfWeek(
				year.start,
				this.date.startWeekOnSunday,
			);
			const numWeeks =
				Math.floor((year.end.getTime() - firstWeekDayOfTimeframe) / 604800000) + 1;
			for (let i = 0; i < numWeeks; i++) {
				const week = getWeek(
					firstWeekDayOfTimeframe + i * 604800000,
					this.date.startWeekOnSunday,
				);
				const prevWeek = acc[acc.length - 1];
				if (
					!prevWeek ||
					prevWeek.year !== week.year ||
					prevWeek.weekSinceYear !== week.weekSinceYear
				) {
					acc.push(week);
				}
			}
			return acc;
		}, [] as Week[]),
	);

	/** The computed list of days within the start/end timeframe in this.date */
	readonly days = $derived(
		this.years.reduce((acc, year) => {
			const firstDay = year.start.getTime();
			const numDays = Math.floor((year.end.getTime() - firstDay) / 86400000) + 1;
			for (let day = 1; day <= numDays; day++) {
				const start = new Date(firstDay + (day - 1) * 86400000);
				const month = start.getUTCMonth() + 1;
				const quarter = Math.floor((month - 1) / 3) + 1;
				const week = getWeek(start, this.date.startWeekOnSunday);
				acc.push({
					id: `${year.year}-${month}-${start.getUTCDate()}`,
					year: year.year,
					quarter,
					month,
					weekSinceYear: week.weekSinceYear,
					weekSinceMonth: week.weekSinceMonth,
					daySinceYear: (start.getTime() - year.start.getTime()) / 86400000 + 1,
					daySinceMonth: start.getUTCDate(),
					daySinceWeek:
						((start.getUTCDay() - (this.date.startWeekOnSunday ? 0 : 1) + 7) % 7) + 1,
					start,
					end: start,
					weekStart: start,
					weekYear: week.year,
					weekMonth: week.month,
					weekQuarter: week.quarter,
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
				});
			}
			return acc;
		}, [] as Day[]),
	);

	/** The list of events imported from the calendars ics urls */
	events = $derived(
		this.calendars
			.map((calendar) => [...calendar.events])
			.flat()
			.map((event) => {
				let name = event.name;
				const lowerName = name.toLowerCase();
				for (const [key, emoji] of Object.entries(EVENT_EMOJIS)) {
					if (lowerName.includes(key) && !name.includes(emoji)) {
						name = `${emoji} ${name}`;
						break;
					}
				}
				return { ...event, name };
			})
			.sort((a, b) => a.start - b.start),
	);

	/** A computed diff object of the settings that have been changed by the user */
	readonly edits = $derived(
		!this.initialSettings
			? {}
			: objectDiff({
					prev: this.initialSettings,
					next: this.serialize(),
					enableDeepDiff: true,
				}).diff,
	);

	constructor(
		initialState:
			| DeepPartial<ReturnType<PlannerSettings['serialize']>>
			| undefined = undefined,
	) {
		this.initialSettings = this.serialize();
		this.deserialize(initialState);
	}

	/** Starts importing the events for the calendar at the given index */
	async importEvents(calendarIndex: number) {
		if (!this.calendars[calendarIndex]) return;
		const calendar = this.calendars[calendarIndex];
		if (calendar.updating) return;
		if (!calendar.url) {
			toast.error(`Calendar URL not provided`);
			return;
		}
		calendar.updating = true;
		const searchParams = new URLSearchParams({
			start: `${this.date.start.getTime()}`,
			end: `${this.date.end.getTime()}`,
			url: calendar.url,
		});
		try {
			const response = await fetch(`/api/calendar?${searchParams.toString()}`);
			if (!response.ok) {
				const errorData = await response.json().catch(() => null);
				const rawError = errorData?.message || `HTTP ${response.status}`;
				let errorMessage = rawError;
				try {
					const domain = new URL(calendar.url).hostname.replace(/^www\./, '');
					if (rawError.includes('429')) {
						errorMessage = `${domain} request limit reached. Please try again in an hour.`;
					} else if (rawError.includes('404')) {
						errorMessage = 'Calendar not found. Make sure the URL is correct and public.';
					} else if (rawError.includes('403')) {
						errorMessage = `Access denied by ${domain}. The calendar might not be fully public.`;
					}
				} catch (e) {
					// Fallback if URL parsing fails
					if (rawError.includes('429'))
						errorMessage =
							'Calendar API request limit reached. Please try again in an hour.';
				}
				toast.error(`Couldn't sync: ${errorMessage}`);
				calendar.updating = false;
				return;
			}
			const { events } = await response.json();
			if (!events?.length) {
				toast(`Fetched ${calendar.name || 'calendar'}, but couldn't find any events`);
			} else {
				toast(`Successfully imported ${events.length} ${calendar.name || 'events'}`);
				calendar.events = events.map((e: CalendarEvent & { isUTC?: boolean }) => {
					if (e.isUTC && e.duration !== undefined) {
						const d = new Date(e.start * 1000);
						const localStart = Date.UTC(
							d.getFullYear(),
							d.getMonth(),
							d.getDate(),
							d.getHours(),
							d.getMinutes(),
							d.getSeconds(),
						);
						return { ...e, start: Math.floor(localStart / 1000) };
					}
					return e;
				});
			}
			calendar.lastUpdated = Date.now();
		} catch (error) {
			toast.error(`Couldn't fetch calendar events. Network error.`);
		}
		calendar.updating = false;
	}

	/** Serializes the data into a valid JSON format */
	serialize() {
		return {
			design: {
				aspectRatio: this.design.aspectRatio,
				width: this.design.width,
				font: this.design.font,
				fontDisplay: this.design.fontDisplay,
				colorBg: this.design.colorBg,
				colorNavBg: this.design.colorNavBg,
				colorText: this.design.colorText,
				colorLines: this.design.colorLines,
				colorDots: this.design.colorDots,
				margin: {
					top: this.design.margin.top,
					right: this.design.margin.right,
					bottom: this.design.margin.bottom,
					left: this.design.margin.left,
				},
			},
			date: {
				timezoneOffset: this.date.timezoneOffset,
				start: this.date.start.getTime(),
				end: this.date.end.getTime(),
				today: this.date.today.getTime(),
				startWeekOnSunday: this.date.startWeekOnSunday,
			},
			sideNav: {
				disable: this.sideNav.disable,
				showCollectionLinks: this.sideNav.showCollectionLinks,
				width: this.sideNav.width,
				leftSide: this.sideNav.leftSide,
				font: this.sideNav.font,
			},
			topNav: {
				disable: this.topNav.disable,
				showCollectionLinks: this.topNav.showCollectionLinks,
				height: this.topNav.height,
				font: this.topNav.font,
			},
			coverPage: {
				disable: this.coverPage.disable,
				name: this.coverPage.name,
				email: this.coverPage.email,
				title: this.coverPage.title,
				showCollectionLinks: this.coverPage.showCollectionLinks,
				darkBackground: this.coverPage.darkBackground,
				showCurrentDay: this.coverPage.showCurrentDay,
				font: this.coverPage.font,
			},
			dashboardPage: {
				disable: this.dashboardPage.disable,
				title: this.dashboardPage.title,
				fontSize: this.dashboardPage.fontSize,
			},
			yearPage: {
				disable: this.yearPage.disable,
				notePagesTemplate: this.yearPage.notePagesTemplate,
				notePagesAmount: this.yearPage.notePagesAmount,
				notePagesColumns: this.yearPage.notePagesColumns,
			},
			quarterPage: {
				disable: this.quarterPage.disable,
				template: this.quarterPage.template,
				goalsColumns: this.quarterPage.goalsColumns,
				notePagesTemplate: this.quarterPage.notePagesTemplate,
				notePagesAmount: this.quarterPage.notePagesAmount,
				notePagesColumns: this.quarterPage.notePagesColumns,
			},
			monthPage: {
				disable: this.monthPage.disable,
				template: this.monthPage.template,
				columns: this.monthPage.columns,
				notePagesTemplate: this.monthPage.notePagesTemplate,
				notePagesAmount: this.monthPage.notePagesAmount,
				notePagesColumns: this.monthPage.notePagesColumns,
			},
			weekPage: {
				disable: this.weekPage.disable,
				template: this.weekPage.template,
				columns: this.weekPage.columns,
				notePagesTemplate: this.weekPage.notePagesTemplate,
				notePagesAmount: this.weekPage.notePagesAmount,
				notePagesColumns: this.weekPage.notePagesColumns,
				useWeekSinceYear: this.weekPage.useWeekSinceYear,
				useWeekNumbersInSideNav: this.weekPage.useWeekNumbersInSideNav,
				use24HourClock: this.weekPage.use24HourClock,
				alignDayText: this.weekPage.alignDayText,
				sideNavDisplay: this.weekPage.sideNavDisplay,
				agendaStartTime: this.weekPage.agendaStartTime,
				agendaEndTime: this.weekPage.agendaEndTime,
				agendaInterval: this.weekPage.agendaInterval,
				notePagesUse24HourClock: this.weekPage.notePagesUse24HourClock,
				notePagesAgendaStartTime: this.weekPage.notePagesAgendaStartTime,
				notePagesAgendaEndTime: this.weekPage.notePagesAgendaEndTime,
				notePagesAgendaInterval: this.weekPage.notePagesAgendaInterval,
			},
			dayPage: {
				disable: this.dayPage.disable,
				template: this.dayPage.template,
				columns: this.dayPage.columns,
				notePagesTemplate: this.dayPage.notePagesTemplate,
				notePagesAmount: this.dayPage.notePagesAmount,
				notePagesColumns: this.dayPage.notePagesColumns,
				use24HourClock: this.dayPage.use24HourClock,
				sideNavDisplay: this.dayPage.sideNavDisplay,
				agendaStartTime: this.dayPage.agendaStartTime,
				agendaEndTime: this.dayPage.agendaEndTime,
				agendaInterval: this.dayPage.agendaInterval,
				notePagesUse24HourClock: this.dayPage.notePagesUse24HourClock,
				notePagesAgendaStartTime: this.dayPage.notePagesAgendaStartTime,
				notePagesAgendaEndTime: this.dayPage.notePagesAgendaEndTime,
				notePagesAgendaInterval: this.dayPage.notePagesAgendaInterval,
			},
			customCollections: {
				disable: this.customCollections.disable,
			},
			collections: this.collections.map((collection) => ({
				...collection,
			})),
			calendars: this.calendars.map((calendar) => {
				return {
					url: calendar.url,
					name: calendar.name,
				};
			}),
			emojis: {
				disable: this.emojis.disable,
				q1: this.emojis.q1,
				q2: this.emojis.q2,
				q3: this.emojis.q3,
				q4: this.emojis.q4,
				january: this.emojis.january,
				february: this.emojis.february,
				march: this.emojis.march,
				april: this.emojis.april,
				may: this.emojis.may,
				june: this.emojis.june,
				july: this.emojis.july,
				august: this.emojis.august,
				september: this.emojis.september,
				october: this.emojis.october,
				november: this.emojis.november,
				december: this.emojis.december,
			},
		};
	}

	/** Initializes the settings state from a serialized JSON state */
	deserialize(
		state: DeepPartial<ReturnType<PlannerSettings['serialize']>> | undefined = undefined,
	) {
		// Design Settings
		if (state?.design?.aspectRatio !== undefined)
			this.design.aspectRatio = state.design.aspectRatio;
		if (state?.design?.width !== undefined) this.design.width = state.design.width;
		if (state?.design?.font !== undefined) this.design.font = state.design.font;
		if (state?.design?.fontDisplay !== undefined)
			this.design.fontDisplay = state.design.fontDisplay;
		if (state?.design?.colorText !== undefined)
			this.design.colorText = state.design.colorText;
		if (state?.design?.colorLines !== undefined)
			this.design.colorLines = state.design.colorLines;
		if (state?.design?.colorDots !== undefined)
			this.design.colorDots = state.design.colorDots;
		if (state?.design?.margin?.top !== undefined)
			this.design.margin.top = state.design.margin.top;
		if (state?.design?.margin?.right !== undefined)
			this.design.margin.right = state.design.margin.right;
		if (state?.design?.margin?.bottom !== undefined)
			this.design.margin.bottom = state.design.margin.bottom;
		if (state?.design?.margin?.left !== undefined)
			this.design.margin.left = state.design.margin.left;

		// Date Settings
		if (state?.date?.timezoneOffset !== undefined)
			this.date.timezoneOffset = state.date.timezoneOffset;
		if (state?.date?.start !== undefined) this.date.start = new Date(state.date.start);
		if (state?.date?.end !== undefined) this.date.end = new Date(state.date.end);
		if (state?.date?.today !== undefined) this.date.today = new Date(state.date.today);
		if (state?.date?.startWeekOnSunday !== undefined)
			this.date.startWeekOnSunday = state.date.startWeekOnSunday;

		// Side Nav Settings
		if (state?.sideNav?.disable !== undefined)
			this.sideNav.disable = state.sideNav.disable;
		if (state?.sideNav?.showCollectionLinks !== undefined)
			this.sideNav.showCollectionLinks = state.sideNav.showCollectionLinks;
		if (state?.sideNav?.width !== undefined) this.sideNav.width = state.sideNav.width;
		if (state?.sideNav?.leftSide !== undefined)
			this.sideNav.leftSide = state.sideNav.leftSide;
		if (state?.sideNav?.font !== undefined) this.sideNav.font = state.sideNav.font;
		if (!state?.sideNav?.font && state?.design?.fontDisplay)
			this.sideNav.font = state.design.fontDisplay;

		// Top Nav Settings
		if (state?.topNav?.disable !== undefined) this.topNav.disable = state.topNav.disable;
		if (state?.topNav?.showCollectionLinks !== undefined)
			this.topNav.showCollectionLinks = state.topNav.showCollectionLinks;
		if (state?.topNav?.height !== undefined) this.topNav.height = state.topNav.height;
		if (state?.topNav?.font !== undefined) this.topNav.font = state.topNav.font;
		if (!state?.topNav?.font && state?.design?.fontDisplay)
			this.topNav.font = state.design.fontDisplay;

		// Cover Page Settings
		if (state?.coverPage?.disable !== undefined)
			this.coverPage.disable = state.coverPage.disable;
		if (state?.coverPage?.name !== undefined) this.coverPage.name = state.coverPage.name;
		if (state?.coverPage?.email !== undefined)
			this.coverPage.email = state.coverPage.email;
		if (state?.coverPage?.title !== undefined)
			this.coverPage.title = state.coverPage.title;
		if (state?.coverPage?.showCollectionLinks !== undefined)
			this.coverPage.showCollectionLinks = state.coverPage.showCollectionLinks;
		if (state?.coverPage?.darkBackground !== undefined)
			this.coverPage.darkBackground = state.coverPage.darkBackground;
		if (state?.coverPage?.showCurrentDay !== undefined)
			this.coverPage.showCurrentDay = state.coverPage.showCurrentDay;
		if (state?.coverPage?.font !== undefined) this.coverPage.font = state.coverPage.font;
		if (!state?.coverPage?.font && state?.design?.fontDisplay)
			this.coverPage.font = state.design.fontDisplay;

		// Dashboard Page Settings
		if (state?.dashboardPage?.disable !== undefined)
			this.dashboardPage.disable = state.dashboardPage.disable;
		if (state?.dashboardPage?.title !== undefined)
			this.dashboardPage.title = state.dashboardPage.title;
		if (state?.dashboardPage?.fontSize !== undefined)
			this.dashboardPage.fontSize = state.dashboardPage.fontSize;

		// Year Page Settings
		if (state?.yearPage?.disable !== undefined)
			this.yearPage.disable = state.yearPage.disable;
		if (state?.yearPage?.notePagesTemplate !== undefined)
			this.yearPage.notePagesTemplate = state.yearPage.notePagesTemplate;
		if (state?.yearPage?.notePagesAmount !== undefined)
			this.yearPage.notePagesAmount = state.yearPage.notePagesAmount;
		if (state?.yearPage?.notePagesColumns !== undefined)
			this.yearPage.notePagesColumns = state.yearPage.notePagesColumns;

		// Quarter Page Settings
		if (state?.quarterPage?.disable !== undefined)
			this.quarterPage.disable = state.quarterPage.disable;
		if (state?.quarterPage?.template !== undefined)
			this.quarterPage.template = state.quarterPage.template;
		if (state?.quarterPage?.goalsColumns !== undefined)
			this.quarterPage.goalsColumns = state.quarterPage.goalsColumns;
		if (state?.quarterPage?.notePagesTemplate !== undefined)
			this.quarterPage.notePagesTemplate = state.quarterPage.notePagesTemplate;
		if (state?.quarterPage?.notePagesAmount !== undefined)
			this.quarterPage.notePagesAmount = state.quarterPage.notePagesAmount;
		if (state?.quarterPage?.notePagesColumns !== undefined)
			this.quarterPage.notePagesColumns = state.quarterPage.notePagesColumns;

		// Month Page Settings
		if (state?.monthPage?.disable !== undefined)
			this.monthPage.disable = state.monthPage.disable;
		if (state?.monthPage?.notePagesTemplate !== undefined)
			this.monthPage.notePagesTemplate = state.monthPage.notePagesTemplate;
		if (state?.monthPage?.notePagesAmount !== undefined)
			this.monthPage.notePagesAmount = state.monthPage.notePagesAmount;
		if (state?.monthPage?.notePagesColumns !== undefined)
			this.monthPage.notePagesColumns = state.monthPage.notePagesColumns;
		if (state?.monthPage?.template !== undefined)
			this.monthPage.template = state.monthPage.template;
		if (state?.monthPage?.columns !== undefined)
			this.monthPage.columns = state.monthPage.columns;

		// Week Page Settings
		if (state?.weekPage?.disable !== undefined)
			this.weekPage.disable = state.weekPage.disable;
		if (state?.weekPage?.notePagesTemplate !== undefined)
			this.weekPage.notePagesTemplate = state.weekPage.notePagesTemplate;
		if (state?.weekPage?.notePagesAmount !== undefined)
			this.weekPage.notePagesAmount = state.weekPage.notePagesAmount;
		if (state?.weekPage?.notePagesColumns !== undefined)
			this.weekPage.notePagesColumns = state.weekPage.notePagesColumns;
		if (state?.weekPage?.useWeekSinceYear !== undefined)
			this.weekPage.useWeekSinceYear = state.weekPage.useWeekSinceYear;
		if (state?.weekPage?.useWeekNumbersInSideNav !== undefined)
			this.weekPage.useWeekNumbersInSideNav = state.weekPage.useWeekNumbersInSideNav;
		if (state?.weekPage?.use24HourClock !== undefined)
			this.weekPage.use24HourClock = state.weekPage.use24HourClock;
		if (state?.weekPage?.template !== undefined)
			this.weekPage.template = state.weekPage.template;
		if (state?.weekPage?.columns !== undefined)
			this.weekPage.columns = state.weekPage.columns;
		if (state?.weekPage?.sideNavDisplay !== undefined)
			this.weekPage.sideNavDisplay = state.weekPage.sideNavDisplay;
		if (state?.weekPage?.agendaStartTime !== undefined)
			this.weekPage.agendaStartTime = state.weekPage.agendaStartTime;
		if (state?.weekPage?.agendaEndTime !== undefined)
			this.weekPage.agendaEndTime = state.weekPage.agendaEndTime;
		if (state?.weekPage?.agendaInterval !== undefined)
			this.weekPage.agendaInterval = state.weekPage.agendaInterval;
		if (state?.weekPage?.notePagesUse24HourClock !== undefined)
			this.weekPage.notePagesUse24HourClock = state.weekPage.notePagesUse24HourClock;
		if (state?.weekPage?.notePagesAgendaStartTime !== undefined)
			this.weekPage.notePagesAgendaStartTime = state.weekPage.notePagesAgendaStartTime;
		if (state?.weekPage?.notePagesAgendaEndTime !== undefined)
			this.weekPage.notePagesAgendaEndTime = state.weekPage.notePagesAgendaEndTime;
		if (state?.weekPage?.notePagesAgendaInterval !== undefined)
			this.weekPage.notePagesAgendaInterval = state.weekPage.notePagesAgendaInterval;
		if ((state?.weekPage as any)?.alignDayTextRight !== undefined)
			this.weekPage.alignDayText = (state?.weekPage as any).alignDayTextRight
				? 'right'
				: 'left';
		if (state?.weekPage?.alignDayText !== undefined)
			this.weekPage.alignDayText = state.weekPage.alignDayText;

		// Day Page Settings
		if (state?.dayPage?.disable !== undefined)
			this.dayPage.disable = state.dayPage.disable;
		if (state?.dayPage?.notePagesTemplate !== undefined)
			this.dayPage.notePagesTemplate = state.dayPage.notePagesTemplate;
		if (state?.dayPage?.notePagesAmount !== undefined)
			this.dayPage.notePagesAmount = state.dayPage.notePagesAmount;
		if (state?.dayPage?.notePagesColumns !== undefined)
			this.dayPage.notePagesColumns = state.dayPage.notePagesColumns;
		if (state?.dayPage?.use24HourClock !== undefined)
			this.dayPage.use24HourClock = state.dayPage.use24HourClock;
		if (state?.dayPage?.sideNavDisplay !== undefined)
			this.dayPage.sideNavDisplay = state.dayPage.sideNavDisplay;
		if (state?.dayPage?.template !== undefined)
			this.dayPage.template = state.dayPage.template;
		if (state?.dayPage?.columns !== undefined)
			this.dayPage.columns = state.dayPage.columns;
		if (state?.dayPage?.agendaStartTime !== undefined)
			this.dayPage.agendaStartTime = state.dayPage.agendaStartTime;
		if (state?.dayPage?.agendaEndTime !== undefined)
			this.dayPage.agendaEndTime = state.dayPage.agendaEndTime;
		if (state?.dayPage?.agendaInterval !== undefined)
			this.dayPage.agendaInterval = state.dayPage.agendaInterval;
		if (state?.dayPage?.notePagesUse24HourClock !== undefined)
			this.dayPage.notePagesUse24HourClock = state.dayPage.notePagesUse24HourClock;
		if (state?.dayPage?.notePagesAgendaStartTime !== undefined)
			this.dayPage.notePagesAgendaStartTime = state.dayPage.notePagesAgendaStartTime;
		if (state?.dayPage?.notePagesAgendaEndTime !== undefined)
			this.dayPage.notePagesAgendaEndTime = state.dayPage.notePagesAgendaEndTime;
		if (state?.dayPage?.notePagesAgendaInterval !== undefined)
			this.dayPage.notePagesAgendaInterval = state.dayPage.notePagesAgendaInterval;

		// Custom Collections Settings
		if (state?.customCollections?.disable !== undefined)
			this.customCollections.disable = state.customCollections.disable;

		// Emojis Settings
		if (state?.emojis?.disable !== undefined) this.emojis.disable = state.emojis.disable;
		if (state?.emojis?.q1 !== undefined) this.emojis.q1 = state.emojis.q1;
		if (state?.emojis?.q2 !== undefined) this.emojis.q2 = state.emojis.q2;
		if (state?.emojis?.q3 !== undefined) this.emojis.q3 = state.emojis.q3;
		if (state?.emojis?.q4 !== undefined) this.emojis.q4 = state.emojis.q4;
		if (state?.emojis?.january !== undefined) this.emojis.january = state.emojis.january;
		if (state?.emojis?.february !== undefined)
			this.emojis.february = state.emojis.february;
		if (state?.emojis?.march !== undefined) this.emojis.march = state.emojis.march;
		if (state?.emojis?.april !== undefined) this.emojis.april = state.emojis.april;
		if (state?.emojis?.may !== undefined) this.emojis.may = state.emojis.may;
		if (state?.emojis?.june !== undefined) this.emojis.june = state.emojis.june;
		if (state?.emojis?.july !== undefined) this.emojis.july = state.emojis.july;
		if (state?.emojis?.august !== undefined) this.emojis.august = state.emojis.august;
		if (state?.emojis?.september !== undefined)
			this.emojis.september = state.emojis.september;
		if (state?.emojis?.october !== undefined) this.emojis.october = state.emojis.october;
		if (state?.emojis?.november !== undefined)
			this.emojis.november = state.emojis.november;
		if (state?.emojis?.december !== undefined)
			this.emojis.december = state.emojis.december;

		// Calendars
		if (state?.calendars !== undefined) {
			this.calendars = state.calendars.filter(Boolean).map((calendar: any) => ({
				name: calendar?.name || ``,
				url: calendar?.url || '',
				events: (calendar?.events || []).filter(Boolean).map((event: any) => ({
					name: event?.name || 'Event',
					start: event?.start || 0,
					duration: event?.duration,
				})),
				lastUpdated: calendar?.lastUpdated || 0,
				updating: false,
			}));
		}

		// Collections
		if (state?.collections !== undefined) {
			this.collections = state.collections.filter(Boolean).map((collection, i) => ({
				id: collection?.id || `${i}`,
				name: collection?.name || `Collection ${i}`,
				type: collection?.type || 'blank',
				total: collection?.total ?? 20,
				columns: collection?.columns || 1,
				lines: collection?.lines,
				numIndexPages: collection?.numIndexPages ?? 1,
				numPagesPerItem: collection?.numPagesPerItem ?? 1,
			}));
		}
	}
}
