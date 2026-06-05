import type { Preset } from './types';
import { pastelTheme } from './themes';

export const mindfulReflection: Preset = {
	id: 'mindful-reflection',
	name: 'Mindful Reflection',
	description:
		'Balance productivity with wellness. Track gratitude, intentions, and daily reflections.',
	icon: '🌿',
	category: 'wellness',
	config: {
		...pastelTheme,
		dashboardPage: { title: '🌿 Sanctuary' },
		yearPage: { notePagesTemplate: 'habit-year-by-month', notePagesAmount: 1 },
		weekPage: {
			template: 'agenda-week-notes',
			notePagesTemplate: 'dotted',
			notePagesAmount: 1,
		},
		dayPage: {
			template: 'agenda-day-mindful',
			notePagesTemplate: 'lined',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'journal',
				name: 'Journal',
				icon: '📔',
				type: 'lined',
				total: 100,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '🌱',
			q2: '🌺',
			q3: '🍁',
			q4: '❄️',
			january: '🧘',
			february: '💖',
			march: '🕊️',
			april: '🌧️',
			may: '🌸',
			june: '☀️',
			july: '🌊',
			august: '🌻',
			september: '🍂',
			october: '🌙',
			november: '🕯️',
			december: '✨',
		},
	},
};
