/**
 * The type of collection. This is used to determine how to display the collection.
 * 'blank' - A collection of freeform items (useful for notes, etc.)
 * 'grid' - Each page in the collection will have a grid printed on it
 * 'dotted' - Each page in the collection will have a grid of dots printed on it
 * 'lined' - Each page in the collection will be printed with lines
 * 'habit-year' - A collection of checkboxes for each day of the year
 */
export type PageTemplate =
	| 'blank'
	| 'grid'
	| 'grid-small'
	| 'grid-large'
	| 'dotted'
	| 'dotted-small'
	| 'dotted-large'
	| 'lined'
	| 'lined-small'
	| 'lined-large'
	| 'numbered'
	| 'numbered-small'
	| 'numbered-large'
	| 'todo'
	| 'todo-small'
	| 'todo-large'
	| 'tasklist-progress'
	| 'calendar-year'
	| 'calendar-quarter'
	| 'calendar-month'
	| 'calendar-month-with-notes'
	| 'goals-quarter'
	| 'overview-quarter'
	| 'agenda-day'
	| 'agenda-day-executive'
	| 'agenda-day-timebox'
	| 'agenda-day-mindful'
	| 'agenda-day-split'
	| 'agenda-week'
	| 'notes-year'
	| 'notes-quarter'
	| 'notes-month'
	| 'agenda-week-notes'
	| 'agenda-week-notes-columns'
	| 'agenda-week-notes-rows'
	| 'notes-day'
	| 'habit-year-by-week'
	| 'habit-year-by-month'
	| 'finance-tracker'
	| 'meeting-minutes'
	| 'workout-log'
	| 'meal-planner'
	| 'sprint-planner';

export interface Collection {
	/** The URL friendly slug used to link & id the collection */
	id: string;

	/** The user-displayed name of the collection (used in navbar) */
	name: string;

	/**
	 * The type of collection. This is used to determine how to display the collection.
	 * 'blank' - A collection of freeform items (useful for notes, etc.)
	 * 'grid' - Each page in the collection will have a grid printed on it
	 * 'dotted' - Each page in the collection will have a grid of dots printed on it
	 * 'lined' - Each page in the collection will be printed with lines
	 * 'habit-year' - A collection of checkboxes for each day of the year
	 */
	type: PageTemplate;

	/** The total amount of items allowed in the collection */
	total: number;

	/** The number of columns (used for grids/lined/numbered) */
	columns?: number;

	/** The number of columns on the index page (auto-calculated if undefined) */
	indexColumns?: number;

	/** The number of lines to show (used for lined/number) */
	lines?: number;

	/** The number of index pages for the collection (makes more collection pages too) */
	numIndexPages?: number;

	/** The number of pages each item in the collection has */
	numPagesPerItem?: number;
}
