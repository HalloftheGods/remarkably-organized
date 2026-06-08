import type { Preset } from './types';
import { webworkTheme } from './themes';

export const salesPipeline: Preset = {
	id: 'sales-pipeline',
	name: 'The Closer',
	description:
		'Deal pipeline, prospecting logs, call trackers, and revenue goals for sales professionals.',
	icon: '📞',
	category: 'work',
	config: {
		...webworkTheme,
		dashboardPage: { title: '📞 Deal Room' },
		quarterPage: {
			template: 'overview-quarter',
			notePagesTemplate: 'okr-tracker',
			notePagesAmount: 1,
		},
		monthPage: {
			template: 'calendar-month-with-notes',
			notePagesTemplate: 'finance-tracker',
			notePagesAmount: 1,
		},
		weekPage: {
			template: 'agenda-week-notes-rows',
			notePagesTemplate: 'client-tracker',
			notePagesAmount: 1,
		},
		dayPage: {
			template: 'agenda-day-executive',
			notePagesTemplate: 'meeting-minutes',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'deals',
				name: '💼 Deals',
				type: 'client-tracker',
				total: 50,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'calls',
				name: '📱 Calls',
				type: 'meeting-minutes',
				total: 100,
				numPagesPerItem: 1,
				numIndexPages: 2,
			},
			{
				id: 'revenue',
				name: '💰 Revenue',
				type: 'finance-tracker',
				total: 12,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '🎯',
			q2: '📈',
			q3: '🏆',
			q4: '💎',
			january: '📞',
			february: '🤝',
			march: '💼',
			april: '📊',
			may: '💰',
			june: '🚀',
			july: '⚡',
			august: '🔥',
			september: '📈',
			october: '🎯',
			november: '🏅',
			december: '🥂',
		},
	},
};
