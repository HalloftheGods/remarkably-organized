import type { Preset } from './types';
import { classicTheme } from './themes';

export const prayerDevotion: Preset = {
	id: 'prayer-devotion',
	name: 'The Devoted',
	description:
		'Daily scripture readings, prayer lists, sermon notes, and spiritual growth tracking.',
	icon: '🕊️',
	category: 'wellness',
	config: {
		...classicTheme,
		dashboardPage: { title: 'The Devoted' },
		yearPage: { notePagesTemplate: 'habit-year-by-month', notePagesAmount: 1 },
		monthPage: { template: 'calendar-month' },
		weekPage: {
			template: 'agenda-week-notes',
			notePagesTemplate: 'devotional-page',
			notePagesAmount: 1,
		},
		dayPage: {
			template: 'agenda-day-mindful',
			notePagesTemplate: 'devotional-page',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'prayers',
				name: '🙏 Prayers',
				type: 'devotional-page',
				total: 122,
				numPagesPerItem: 1,
				numIndexPages: 3,
			},
			{
				id: 'sermons',
				name: '📖 Sermons',
				type: 'lined-large',
				total: 52,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '✝️',
			q2: '🕊️',
			q3: '📖',
			q4: '⭐',
			january: '🙏',
			february: '❤️',
			march: '🌿',
			april: '🐑',
			may: '🌹',
			june: '☀️',
			july: '⛪',
			august: '🌊',
			september: '🍇',
			october: '🍂',
			november: '🕯️',
			december: '⭐',
		},
	},
};
