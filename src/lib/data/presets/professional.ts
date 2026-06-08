import type { Preset } from './types';
import { godTheme } from './themes';

export const professional: Preset = {
	id: 'professional',
	name: 'The Professional',
	description: 'Includes meeting minutes, habit trackers, and a finance tracker.',
	icon: '💼',
	category: 'work',
	config: {
		...godTheme,
		dashboardPage: { title: '💼 Executive Suite' },
		quarterPage: { template: 'overview-quarter', notePagesAmount: 1 },
		weekPage: { notePagesTemplate: 'meeting-minutes', notePagesAmount: 1 },
		dayPage: {
			template: 'agenda-day-executive',
			notePagesTemplate: 'meeting-minutes',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'finance',
				name: '💰 Finances',
				type: 'finance-tracker',
				total: 12,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'meetings',
				name: '🤝 Meetings',
				type: 'meeting-minutes',
				total: 20,
				numPagesPerItem: 2,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '📊',
			q2: '📈',
			q3: '📉',
			q4: '💼',
			january: '👔',
			february: '🤝',
			march: '📅',
			april: '🏢',
			may: '📈',
			june: '✈️',
			july: '☀️',
			august: '🌴',
			september: '📚',
			october: '🏆',
			november: '🦃',
			december: '🥂',
		},
	},
};
