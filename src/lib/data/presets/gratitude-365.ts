import type { Preset } from './types';
import { pastelTheme } from './themes';

export const gratitude365: Preset = {
	id: 'gratitude-365',
	name: 'The Grateful 365',
	description:
		'One page per day dedicated to gratitude, affirmations, and micro-journaling.',
	icon: '🙏',
	category: 'wellness',
	config: {
		...pastelTheme,
		dashboardPage: { title: 'The Grateful 365' },
		yearPage: { notePagesTemplate: 'habit-year-by-month', notePagesAmount: 1 },
		monthPage: { template: 'calendar-month' },
		weekPage: {
			template: 'agenda-week-notes',
			notePagesTemplate: 'gratitude-page',
			notePagesAmount: 1,
		},
		dayPage: {
			template: 'agenda-day-mindful',
			notePagesTemplate: 'gratitude-page',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'gratitude',
				name: '🌻 Gratitude',
				type: 'gratitude-page',
				total: 122,
				numPagesPerItem: 1,
				numIndexPages: 3,
			},
		],
		emojis: {
			disable: false,
			q1: '🌱',
			q2: '🌺',
			q3: '🍁',
			q4: '✨',
			january: '🙏',
			february: '💗',
			march: '🌷',
			april: '🌧️',
			may: '🌸',
			june: '🌅',
			july: '🌈',
			august: '🌻',
			september: '🍂',
			october: '🎃',
			november: '🦃',
			december: '⭐',
		},
	},
};
