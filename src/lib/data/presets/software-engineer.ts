import type { Preset } from './types';
import { hackerTheme } from './themes';

export const softwareEngineer: Preset = {
	id: 'software-engineer',
	name: 'The Engineer',
	description: 'Sprint planning, numbered lists, and meeting notes for daily scrums.',
	icon: '💻',
	category: 'work',
	config: {
		...hackerTheme,
		dashboardPage: { title: '💻 Terminal' },
		weekPage: {
			template: 'agenda-week-notes-rows',
			notePagesTemplate: 'numbered-large',
			notePagesAmount: 2,
		},
		dayPage: {
			template: 'notes-day',
			notePagesTemplate: 'todo-large',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'sprints',
				name: '🏃 Sprints',
				type: 'sprint-planner',
				total: 26,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'meetings',
				name: '👥 Standups',
				type: 'meeting-minutes',
				total: 100,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '💻',
			q2: '🚀',
			q3: '🐛',
			q4: '🚢',
			january: '⌨️',
			february: '🖱️',
			march: '🖥️',
			april: '💾',
			may: '🔋',
			june: '🌐',
			july: '📱',
			august: '🔌',
			september: '🛠️',
			october: '🕸️',
			november: '☕',
			december: '🎮',
		},
	},
};
