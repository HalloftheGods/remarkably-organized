import type { Preset } from './types';
import { forestTheme } from './themes';

export const bookClub: Preset = {
	id: 'book-club',
	name: 'The Book Club',
	description:
		'Track reading goals, log book reviews, and organize reading lists by genre.',
	icon: '📖',
	category: 'hobbies',
	config: {
		...forestTheme,
		dashboardPage: { title: '📖 Reading Room' },
		yearPage: { notePagesTemplate: 'habit-year-by-month', notePagesAmount: 1 },
		monthPage: { template: 'calendar-month' },
		weekPage: {
			template: 'agenda-week-notes',
			notePagesTemplate: 'reading-log',
			notePagesAmount: 1,
		},
		dayPage: {
			template: 'notes-day',
			notePagesTemplate: 'reading-log',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'reading-list',
				name: '📚 Reading',
				type: 'reading-log',
				total: 100,
				numPagesPerItem: 1,
				numIndexPages: 2,
			},
			{
				id: 'notes',
				name: '📝 Notes',
				type: 'lined-large',
				total: 100,
				numPagesPerItem: 1,
				numIndexPages: 2,
			},
		],
		emojis: {
			disable: false,
			q1: '📕',
			q2: '📗',
			q3: '📘',
			q4: '📙',
			january: '📖',
			february: '💌',
			march: '🌱',
			april: '🌧️',
			may: '🌸',
			june: '☀️',
			july: '🏖️',
			august: '📚',
			september: '🍂',
			october: '🎃',
			november: '☕',
			december: '🎅',
		},
	},
};
