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
		id: 'productivity',
		title: 'Productivity',
		icon: '✅',
		description: 'To-do lists, task management, and focus tools.',
		prefixes: ['todo', 'tasklist', 'eisenhower', 'pomodoro-tracker', 'sprint'],
	},
	{
		id: 'goals',
		title: 'Goals',
		icon: '🎯',
		description: 'Habit trackers, OKRs, and personal goal planning.',
		prefixes: ['habit', 'goals', 'okr-tracker', 'side-quest'],
	},
	{
		id: 'health',
		title: 'Wellness',
		icon: '❤️', // human heart emoji
		description: 'Fitness tracking, meal planning, and mental wellness journals.',
		prefixes: ['workout', 'meal', 'recipe-card', 'wellness', 'energy', 'meditation-log'],
	},
	{
		id: 'personal',
		title: 'Personal',
		icon: '✨',
		description: 'Reflection, gratitude, astrology, and personal logs.',
		prefixes: ['stoic-reflection', 'devotional-page', 'gratitude-page', 'tarot', 'natal'],
	},
	{
		id: 'home',
		title: 'HomeLife',
		icon: '🏡',
		description: 'Finance, gardening, pet care, and event planning.',
		prefixes: [
			'finance',
			'garden',
			'chore-chart',
			'pet-care',
			'event-planner',
			'travel-planner',
		],
	},
	{
		id: 'education',
		title: 'Education',
		icon: '📚',
		description: 'Study trackers, lesson plans, and reading logs.',
		prefixes: [
			'learning',
			'language-learning',
			'assignment',
			'lesson-plan',
			'grade-tracker',
			'reading-log',
			'media-tracker',
		],
	},
	{
		id: 'professional',
		title: 'Professional',
		icon: '💼',
		description: 'Project planners, client trackers, and specialized career tools.',
		prefixes: [
			'meeting',
			'project',
			'content',
			'client',
			'session-log',
			'property-listing',
			'word-count-tracker',
			'character-sheet',
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
		prefixes: ['blank', 'dotted', 'grid'],
	},
];

const matchesCategory = (templateValue: string, prefixes: string[]) =>
	prefixes.some((prefix) => templateValue.startsWith(prefix));

export const TEMPLATE_CATEGORIES = CATEGORY_DEFINITIONS.map((category) => ({
	...category,
	templates: PAGE_TEMPLATES.filter((t) => matchesCategory(t.value, category.prefixes)),
}));
