import type { Preset } from './types';
import { forestTheme } from './themes';

export const meditationZen: Preset = {
	id: 'meditation-zen',
	name: 'The Zen Master',
	description:
		'Meditation timers, breathwork logs, mindfulness streaks, and gratitude practice.',
	icon: '🧘',
	category: 'wellness',
	config: {
		...forestTheme,
		dashboardPage: { title: 'The Zen Master' },
		yearPage: { notePagesTemplate: 'habit-year-by-month', notePagesAmount: 1 },
		monthPage: { template: 'calendar-month' },
		weekPage: {
			template: 'agenda-week-notes',
			notePagesTemplate: 'meditation-log',
			notePagesAmount: 1,
		},
		dayPage: {
			template: 'agenda-day-mindful',
			notePagesTemplate: 'meditation-log',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'sits',
				name: '🪷 Meditation',
				type: 'meditation-log',
				total: 122,
				numPagesPerItem: 1,
				numIndexPages: 3,
			},
			{
				id: 'gratitude',
				name: '🙏 Gratitude',
				type: 'lined',
				total: 52,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '🌿',
			q2: '🪷',
			q3: '🍃',
			q4: '🕊️',
			january: '🧘',
			february: '💜',
			march: '🌱',
			april: '🌸',
			may: '☁️',
			june: '🌅',
			july: '🌊',
			august: '🪨',
			september: '🍂',
			october: '🌙',
			november: '🕯️',
			december: '✨',
		},
	},
};
