import type { Preset } from './types';
import { godTheme } from './themes';

export const dailyStoic: Preset = {
	id: 'daily-stoic',
	name: 'The Daily Stoic',
	description:
		'Morning intentions, evening reflections, and gratitude — structured around Stoic philosophy.',
	icon: '🏛️',
	category: 'wellness',
	config: {
		...godTheme,
		dashboardPage: { title: '🏛️ The Stoa' },
		yearPage: { notePagesTemplate: 'habit-year-by-month', notePagesAmount: 1 },
		monthPage: { template: 'calendar-month' },
		weekPage: {
			template: 'agenda-week-notes',
			notePagesTemplate: 'lined',
			notePagesAmount: 1,
		},
		dayPage: {
			template: 'agenda-day-mindful',
			notePagesTemplate: 'stoic-reflection',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'reflections',
				name: 'Reflections',
				icon: '🪞',
				type: 'stoic-reflection',
				total: 122,
				numPagesPerItem: 1,
				numIndexPages: 3,
			},
			{
				id: 'meditations',
				name: 'Meditations',
				icon: '📜',
				type: 'lined-large',
				total: 52,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '🌿',
			q2: '🔥',
			q3: '🍇',
			q4: '🪨',
			january: '🏛️',
			february: '⚖️',
			march: '🌊',
			april: '🫒',
			may: '🦅',
			june: '☀️',
			july: '🏺',
			august: '🦉',
			september: '📖',
			october: '🍂',
			november: '🕯️',
			december: '❄️',
		},
	},
};
