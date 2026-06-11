import type { Preset } from './types';
import { mujiTheme } from './themes';

export const bulletJournal: Preset = {
	id: 'bullet-journal',
	name: 'The Sketch Artist',
	description: 'A dot-grid lover’s dream. Open canvas for ultimate creativity.',
	icon: '✍️',
	category: 'essentials',
	config: {
		...mujiTheme,
		dashboardPage: { title: 'The Sketch Artist' },
		yearPage: { notePagesTemplate: 'dotted-large', notePagesAmount: 2 },
		quarterPage: { notePagesTemplate: 'dotted', notePagesAmount: 2 },
		monthPage: {
			template: 'calendar-month-with-notes',
			notePagesTemplate: 'dotted-small',
			notePagesAmount: 2,
		},
		weekPage: {
			template: 'agenda-week-notes',
			notePagesTemplate: 'dotted',
			notePagesAmount: 2,
		},
		dayPage: { template: 'notes-day', notePagesTemplate: 'dotted', notePagesAmount: 1 },
		collections: [
			{
				id: 'bujo-collections',
				name: '⭐ Collections',
				type: 'dotted',
				total: 100,
				numPagesPerItem: 1,
				numIndexPages: 4,
			},
		],
		emojis: {
			disable: false,
			q1: '🖋️',
			q2: '🎨',
			q3: '📏',
			q4: '📓',
			january: '✨',
			february: '💕',
			march: '🍀',
			april: '🌧️',
			may: '🌺',
			june: '☀️',
			july: '🍉',
			august: '🌻',
			september: '🍎',
			october: '🎃',
			november: '☕',
			december: '❄️',
		},
	},
};
