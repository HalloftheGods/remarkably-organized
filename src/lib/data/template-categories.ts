import { PAGE_TEMPLATES } from './templates';

export interface TemplateCategory {
	id: string;
	title: string;
	icon: string;
	description: string;
	prefixes: string[];
}

const CATEGORY_DEFINITIONS: TemplateCategory[] = [
	{
		id: 'calendar',
		title: 'Calendars',
		icon: '📅',
		description: 'Monthly, quarterly, and yearly calendar views.',
		prefixes: ['calendar', 'overview', 'future-log'],
	},
	{
		id: 'agenda',
		title: 'Agendas',
		icon: '🗓️',
		description: 'Daily and weekly agenda layouts for scheduling and time management.',
		prefixes: ['agenda'],
	},
	{
		id: 'trackers',
		title: 'Trackers',
		icon: '✅',
		description: 'Checklists, habit grids, goal planners, and progress trackers.',
		prefixes: [
			'todo',
			'tasklist',
			'habit',
			'goals',
			'eisenhower',
			'assignment',
			'energy',
			'side-quest',
			'learning',
			'client',
			'okr-tracker',
			'pomodoro-tracker',
			'media-tracker',
			'chore-chart',
			'grade-tracker',
			'word-count-tracker',
		],
	},
	{
		id: 'notes',
		title: 'Notes',
		icon: '📝',
		description: 'Lined, numbered, and structured note-taking layouts.',
		prefixes: ['lined', 'numbered', 'notes'],
	},
	{
		id: 'sketch',
		title: 'Sketchpads',
		icon: '✏️',
		description: 'Dot grids, square grids, and blank canvases for freeform creativity.',
		prefixes: ['blank', 'dotted', 'grid', 'brain-dump'],
	},
	{
		id: 'specialized',
		title: 'Specialized',
		icon: '⚡',
		description:
			'Meeting minutes, finance trackers, workout logs, meal planners, sprint boards, and life tracking tools.',
		prefixes: [
			'meeting',
			'finance',
			'workout',
			'meal',
			'sprint',
			'tarot',
			'natal',
			'garden',
			'content',
			'project',
			'wellness',
			'event-planner',
			'travel-planner',
			'recipe-card',
			'reading-log',
			'pet-care',
			'language-learning',
			'stoic-reflection',
			'session-log',
			'lesson-plan',
			'property-listing',
			'character-sheet',
			'meditation-log',
			'devotional-page',
			'gratitude-page',
		],
	},
];

const matchesCategory = (templateValue: string, prefixes: string[]) =>
	prefixes.some((prefix) => templateValue.startsWith(prefix));

export const TEMPLATE_CATEGORIES = CATEGORY_DEFINITIONS.map((category) => ({
	...category,
	templates: PAGE_TEMPLATES.filter((t) => matchesCategory(t.value, category.prefixes)),
}));
