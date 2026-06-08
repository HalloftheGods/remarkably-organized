import type { Preset } from './types';
import { mujiTheme } from './themes';

export const creativeWriter: Preset = {
	id: 'creative-writer',
	name: 'The Novelist',
	description:
		'Track word counts, plot outlines, character sheets, and writing sprints for your manuscript.',
	icon: '✒️',
	category: 'work',
	config: {
		...mujiTheme,
		dashboardPage: { title: "✒️ Writer's Studio" },
		yearPage: { notePagesTemplate: 'habit-year-by-month', notePagesAmount: 1 },
		monthPage: { template: 'calendar-month' },
		weekPage: {
			template: 'agenda-week-notes',
			notePagesTemplate: 'word-count-tracker',
			notePagesAmount: 1,
		},
		dayPage: {
			template: 'notes-day',
			notePagesTemplate: 'lined-large',
			notePagesAmount: 2,
		},
		collections: [
			{
				id: 'manuscripts',
				name: '📜 Manuscripts',
				type: 'lined-large',
				total: 10,
				numPagesPerItem: 10,
				numIndexPages: 1,
			},
			{
				id: 'characters',
				name: '🎭 Characters',
				type: 'character-sheet',
				total: 30,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'prompts',
				name: '💡 Prompts',
				type: 'numbered-large',
				total: 50,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '📝',
			q2: '✍️',
			q3: '📖',
			q4: '🏆',
			january: '🖋️',
			february: '💌',
			march: '🌱',
			april: '🌧️',
			may: '🌺',
			june: '☀️',
			july: '📜',
			august: '📕',
			september: '🍂',
			october: '🎃',
			november: '✒️',
			december: '📚',
		},
	},
};
