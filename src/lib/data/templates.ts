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

	// Year
	{ name: 'Year Calendar', value: 'calendar-year' },
	{ name: 'Yearly Notes', value: 'notes-year' },

	// Quarter
	{ name: 'Quarterly Notes', value: 'notes-quarter' },
	{ name: 'Quarter Calendar', value: 'calendar-quarter' },
	{ name: 'Quarter Goals', value: 'goals-quarter' },
	{ name: 'Quarter Overview', value: 'overview-quarter' },

	// Month
	{ name: 'Monthly Calendar', value: 'calendar-month' },
	{ name: 'Monthly Calendar - With Notes', value: 'calendar-month-with-notes' },

	// Week
	{ name: 'Weekly Agenda', value: 'agenda-week' },
	{ name: 'Weekly Calendar - Grid', value: 'agenda-week-notes' },
	{ name: 'Weekly Calendar - Notes', value: 'agenda-week-notes-columns' },
	{ name: 'Weekly Calendar - Rows', value: 'agenda-week-notes-rows' },
	{ name: 'Weekly Meal Planner', value: 'meal-planner' },

	// Day
	{ name: 'Daily Agenda', value: 'agenda-day' },
	{ name: 'Daily Agenda - Executive', value: 'agenda-day-executive' },
	{ name: 'Daily Agenda - Time-Boxer', value: 'agenda-day-timebox' },
	{ name: 'Daily Agenda - Mindful', value: 'agenda-day-mindful' },
	{ name: 'Daily Agenda - AM/PM Split', value: 'agenda-day-split' },
	{ name: 'Daily Notes', value: 'notes-day' },

	// Notes
	{ name: 'Notes - Lined - Small', value: 'lined-small' },
	{ name: 'Notes - Lined - Medium', value: 'lined' },
	{ name: 'Notes - Lined - Large', value: 'lined-large' },
	{ name: 'Notes - Numbered - Small', value: 'numbered-small' },
	{ name: 'Notes - Numbered - Medium', value: 'numbered' },
	{ name: 'Notes - Numbered - Large', value: 'numbered-large' },

	// Dotted Grid
	{ name: 'Sketch - Dotted Grid - Small', value: 'dotted-small' },
	{ name: 'Sketch - Dotted Grid - Medium', value: 'dotted' },
	{ name: 'Sketch - Dotted Grid - Large', value: 'dotted-large' },

	// Grid
	{ name: 'Sketch - Grid - Small', value: 'grid-small' },
	{ name: 'Sketch - Grid - Medium', value: 'grid' },
	{ name: 'Sketch - Grid - Large', value: 'grid-large' },

	// To-do & Task Lists
	{ name: 'To-do List - Small', value: 'todo-small' },
	{ name: 'To-do List - Medium', value: 'todo' },
	{ name: 'To-do List - Large', value: 'todo-large' },
	{ name: 'Task List - Priority & Progress', value: 'tasklist-progress' },
	{ name: 'Task List - Sprint Planner (1 Week)', value: 'sprint-planner' },
	{ name: 'Task List - Sprint Planner (2 Week)', value: 'sprint-planner-2-week' },
	{ name: 'Task List - Sprint Planner (3 Week)', value: 'sprint-planner-3-week' },
	{ name: 'Task List - Sprint Planner (4 Week)', value: 'sprint-planner-4-week' },

	// Misc.
	{ name: 'Habit Checkboxes - Grouped by Week', value: 'habit-year-by-week' },
	{ name: 'Habit Checkboxes - Grouped by Month', value: 'habit-year-by-month' },
	{ name: 'Meeting Minutes', value: 'meeting-minutes' },
	{ name: 'Budget / Finance Tracker', value: 'finance-tracker' },
	{ name: 'Workout Log', value: 'workout-log' },
	{ name: 'Tarot Draw (3-Card Spread)', value: 'tarot-draw' },
	{ name: 'Natal Chart & Transits', value: 'natal-chart' },

	// New Templates
	{ name: 'Eisenhower Matrix', value: 'eisenhower-matrix' },
	{ name: 'Garden Planner', value: 'garden-planner' },
	{ name: 'Project Planner', value: 'project-planner' },
	{ name: 'Content Creator Planner', value: 'content-planner' },
	{ name: 'Assignment Tracker', value: 'assignment-tracker' },

	// Advanced Life Tracking Templates
	{ name: 'Wellness Journal - Daily Reflections', value: 'wellness-journal' },
	{ name: 'Learning Log - Skills & Growth', value: 'learning-tracker' },
	{ name: 'Energy & Mood Matrix', value: 'energy-matrix' },
	{ name: 'Client Relationship Tracker', value: 'client-tracker' },
	{ name: 'Side Quest Tracker - Personal Goals', value: 'side-quest-tracker' },

	// Newly Added Templates
	{ name: 'Goal Breakdown (OKRs)', value: 'okr-tracker' },
	{ name: 'Pomodoro Tracker', value: 'pomodoro-tracker' },
	{ name: 'Event / Party Planner', value: 'event-planner' },
	{ name: 'Travel Itinerary & Packing List', value: 'travel-planner' },
	{ name: 'Recipe Card & Meal Prep', value: 'recipe-card' },
	{ name: 'Reading Log & Book Review', value: 'reading-log' },
	{ name: 'Media & Entertainment Tracker', value: 'media-tracker' },
	{ name: 'Pet Care Log', value: 'pet-care' },
	{ name: 'Language Learning Tracker', value: 'language-learning' },
	{ name: 'Chore & Maintenance Chart', value: 'chore-chart' },

	// Premium Templates
	{ name: 'Stoic Reflection - AM/PM Journal', value: 'stoic-reflection' },
	{ name: 'Studio Session Log', value: 'session-log' },
	{ name: 'Lesson Plan', value: 'lesson-plan' },
	{ name: 'Grade & Roster Tracker', value: 'grade-tracker' },
	{ name: 'Property Listing Sheet', value: 'property-listing' },
	{ name: 'Character Sheet (RPG/Writing)', value: 'character-sheet' },
	{ name: 'Word Count Tracker', value: 'word-count-tracker' },
	{ name: 'Meditation & Breathwork Log', value: 'meditation-log' },
	{ name: 'Devotional & Scripture Page', value: 'devotional-page' },
	{ name: 'Gratitude & Affirmation Page', value: 'gratitude-page' },
	{ name: 'Yearly Future Log', value: 'future-log-year' },
	{ name: 'Weekly Left Calendar / Right Notes', value: 'agenda-week-split' },
	{ name: 'Bi-Weekly Planner / Sprint Log', value: 'agenda-biweek' },
	{ name: 'Weekly Time-Blocked Agenda', value: 'agenda-week-timebox' },
	{ name: 'Daily High-Performance Agenda', value: 'agenda-day-high-performance' },
	{ name: 'Weekly Focus & Review Agenda', value: 'agenda-week-focus' },
].sort(sortTemplates);

export function getAvailablePageTemplates(
	location: 'collection' | 'year' | 'month' | 'quarter' | 'week' | 'day',
) {
	const timeframes = ['year', 'quarter', 'month', 'week', 'day'];
	return PAGE_TEMPLATES.filter((t) => {
		const isCollection = location === 'collection';
		if (isCollection) {
			const isExcluded = [
				'notes-quarter',
				'calendar-month',
				'calendar-month-with-notes',
			].includes(t.value);
			return !isExcluded;
		}

		const parts = t.value.split('-');
		let timeframe = parts.find((part) => timeframes.includes(part));

		if (!timeframe && parts.includes('biweek')) {
			timeframe = 'week';
		}

		const isTimeframeTemplate = timeframe !== undefined;
		if (isTimeframeTemplate) {
			const isMatchingLocation = location === timeframe;
			return isMatchingLocation;
		}

		return true;
	});
}
