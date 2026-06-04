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
		id: 'sketch',
		title: 'Sketch',
		icon: '✏️',
		description: 'Dot grids, square grids, and blank canvases for freeform creativity.',
		prefixes: ['blank', 'dotted', 'grid'],
	},
	{
		id: 'notes',
		title: 'Notes',
		icon: '📝',
		description: 'Lined, numbered, and structured note-taking layouts.',
		prefixes: ['lined', 'numbered', 'notes'],
	},
	{
		id: 'agenda',
		title: 'Agenda',
		icon: '🗓️',
		description: 'Daily and weekly agenda layouts for scheduling and time management.',
		prefixes: ['agenda'],
	},
	{
		id: 'calendar',
		title: 'Calendar',
		icon: '📅',
		description: 'Monthly, quarterly, and yearly calendar views.',
		prefixes: ['calendar', 'overview'],
	},
	{
		id: 'trackers',
		title: 'Trackers',
		icon: '📊',
		description: 'Checklists, habit grids, goal planners, and progress trackers.',
		prefixes: ['todo', 'tasklist', 'habit', 'goals'],
	},
	{
		id: 'specialized',
		title: 'Specialized',
		icon: '⚡',
		description: 'Meeting minutes, finance trackers, workout logs, meal planners, and sprint boards.',
		prefixes: ['meeting', 'finance', 'workout', 'meal', 'sprint'],
	},
];

const matchesCategory = (templateValue: string, prefixes: string[]) =>
	prefixes.some((prefix) => templateValue.startsWith(prefix));

export const TEMPLATE_CATEGORIES = CATEGORY_DEFINITIONS.map((category) => ({
	...category,
	templates: PAGE_TEMPLATES.filter((t) => matchesCategory(t.value, category.prefixes)),
}));
