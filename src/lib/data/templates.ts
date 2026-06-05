const compareTemplates = (
	a: { name: string; value: string },
	b: { name: string; value: string },
) => {
	const isABlank = a.value === 'blank';
	const isBBlank = b.value === 'blank';
	const shouldMoveAAfter = isABlank && !isBBlank;
	if (shouldMoveAAfter) {
		return 1;
	}
	const shouldMoveBAfter = !isABlank && isBBlank;
	if (shouldMoveBAfter) {
		return -1;
	}
	return a.name.localeCompare(b.name);
};

const sortTemplates = (
	a: { name: string; value: string },
	b: { name: string; value: string },
) => compareTemplates(a, b);

export const PAGE_TEMPLATES = [
	{ name: 'Blank Page', value: 'blank' },
	{ name: 'Sketch - Dotted Grid - Small', value: 'dotted-small' },
	{ name: 'Sketch - Dotted Grid - Medium', value: 'dotted' },
	{ name: 'Sketch - Dotted Grid - Large', value: 'dotted-large' },
	{ name: 'Sketch - Grid - Small', value: 'grid-small' },
	{ name: 'Sketch - Grid - Medium', value: 'grid' },
	{ name: 'Sketch - Grid - Large', value: 'grid-large' },
	{ name: 'Notes - Lined - Small', value: 'lined-small' },
	{ name: 'Notes - Lined - Medium', value: 'lined' },
	{ name: 'Notes - Lined - Large', value: 'lined-large' },
	{ name: 'Notes - Numbered - Small', value: 'numbered-small' },
	{ name: 'Notes - Numbered - Medium', value: 'numbered' },
	{ name: 'Notes - Numbered - Large', value: 'numbered-large' },
	{ name: 'To-do List - Small', value: 'todo-small' },
	{ name: 'To-do List - Medium', value: 'todo' },
	{ name: 'To-do List - Large', value: 'todo-large' },
	{ name: 'Task List - Priority & Progress', value: 'tasklist-progress' },
	{ name: 'Task List - Sprint Planner', value: 'sprint-planner' },
	{ name: 'Year Calendar', value: 'calendar-year' },
	{ name: 'Quarter Calendar', value: 'calendar-quarter' },
	{ name: 'Quarter Goals', value: 'goals-quarter' },
	{ name: 'Quarter Overview', value: 'overview-quarter' },
	{ name: 'Monthly Calendar', value: 'calendar-month' },
	{ name: 'Monthly Calendar - With Notes', value: 'calendar-month-with-notes' },
	{ name: 'Daily Agenda', value: 'agenda-day' },
	{ name: 'Daily Agenda - Executive', value: 'agenda-day-executive' },
	{ name: 'Daily Agenda - Time-Boxer', value: 'agenda-day-timebox' },
	{ name: 'Daily Agenda - Mindful', value: 'agenda-day-mindful' },
	{ name: 'Daily Agenda - AM/PM Split', value: 'agenda-day-split' },
	{ name: 'Weekly Agenda', value: 'agenda-week' },
	{ name: 'Yearly Notes', value: 'notes-year' },
	{ name: 'Quarterly Notes', value: 'notes-quarter' },
	{ name: 'Weekly Meal Planner', value: 'meal-planner' },
	{ name: 'Weekly Calendar Grid with Notes', value: 'agenda-week-notes' },
	{ name: 'Weekly Calendar Columns with Notes', value: 'agenda-week-notes-columns' },
	{ name: 'Weekly Calendar Rows with Notes', value: 'agenda-week-notes-rows' },
	{ name: 'Daily Notes', value: 'notes-day' },
	{ name: 'Habit Checkboxes - Grouped by Week', value: 'habit-year-by-week' },
	{ name: 'Habit Checkboxes - Grouped by Month', value: 'habit-year-by-month' },
	{ name: 'Meeting Minutes', value: 'meeting-minutes' },
	{ name: 'Budget / Finance Tracker', value: 'finance-tracker' },
	{ name: 'Workout Log', value: 'workout-log' },
].sort(sortTemplates);
