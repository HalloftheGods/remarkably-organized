import type { Preset } from './types';
import { pastelTheme } from './themes';

export const wellnessMaster: Preset = {
	id: 'wellness-master',
	name: 'The Holistic Being',
	description:
		'Holistic health tracking. Balance physical wellness, mental health, sleep cycles, and nutrition in one integrated system.',
	icon: '🪷',
	category: 'wellness',
	config: {
		...pastelTheme,
		dashboardPage: { title: '🪷 Wellness Hub' },
		quarterPage: { template: 'overview-quarter', notePagesAmount: 1 },
		monthPage: { template: 'calendar-month-with-notes' },
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
				id: 'wellness',
				name: '💪 Wellness',
				type: 'wellness-journal',
				total: 122,
				numPagesPerItem: 1,
				numIndexPages: 3,
			},
			{
				id: 'energy',
				name: '⚡ Energy',
				type: 'energy-matrix',
				total: 52,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'nutrition',
				name: '🥗 Nutrition',
				type: 'meal-planner',
				total: 52,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '💚',
			q2: '🌟',
			q3: '🍂',
			q4: '❤️',
			january: '🏃',
			february: '💝',
			march: '🌱',
			april: '🌸',
			may: '🌊',
			june: '☀️',
			july: '🏖️',
			august: '🌻',
			september: '📚',
			october: '🎃',
			november: '🙏',
			december: '✨',
		},
	},
};
