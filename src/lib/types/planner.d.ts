import type { Collection } from './template';

export interface CalendarEvent {
	start: number;
	duration?: number;
	name: string;
}

export interface Timeframe {
	id: string;
	start: Date;
	end: Date;
	weekStart: Date;
	nameShort: string;
	nameLong: string;
	year?: number;
	quarter?: number;
	month?: number;
	weekSinceYear?: number;
	weekSinceMonth?: number;
	daySinceYear?: number;
	daySinceMonth?: number;
	daySinceWeek?: number;
	weekYear?: number;
	weekMonth?: number;
	weekQuarter?: number;
	collection?: Collection;
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
	year: number;
}

export interface Quarter extends Year {
	quarter: number;
}

export interface Month extends Quarter {
	month: number;
}

export interface Week extends Month {
	weekSinceYear: number;
	weekSinceMonth: number;
}

export interface Day extends Week {
	daySinceYear: number;
	daySinceMonth: number;
	daySinceWeek: number;
	weekYear: number;
	weekMonth: number;
	weekQuarter: number;
}
