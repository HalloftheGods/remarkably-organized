import type { Preset } from './types';
import { nerdTheme } from './themes';

export const dreamweaver: Preset = {
	id: 'dreamweaver',
	name: 'The Dreamweaver',
	description:
		'Optimize your sleep hygiene, track sleep cycles, and document dreams & nocturnal insights.',
	icon: '🌙',
	category: 'wellness',
	config: {
		...nerdTheme,
		dashboardPage: { title: '🌙 Dream Sanctuary' },
		yearPage: { notePagesTemplate: 'habit-year-by-month', notePagesAmount: 1 },
		monthPage: { template: 'calendar-month' },
		weekPage: {
			template: 'agenda-week-notes',
			notePagesTemplate: 'wellness-journal',
			notePagesAmount: 1,
		},
		dayPage: {
			template: 'agenda-day-mindful',
			notePagesTemplate: 'wellness-journal',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'sleep-log',
				name: 'Sleep & Recovery',
				icon: '💤',
				type: 'wellness-journal',
				total: 365,
				numPagesPerItem: 1,
				numIndexPages: 4,
			},
			{
				id: 'dream-journal',
				name: 'Dream Journal',
				icon: '🌌',
				type: 'lined',
				total: 100,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '🌙',
			q2: '🌌',
			q3: '💤',
			q4: '✨',
			january: '🛌',
			february: '🔮',
			march: '☁️',
			april: '💧',
			may: '🌸',
			june: '☀️',
			july: '🌊',
			august: '🍃',
			september: '🍂',
			october: '🎃',
			november: '🙏',
			december: '❄️',
		},
	},
};
