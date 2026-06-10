import type { Preset } from './types';
import { webworkTheme } from './themes';

export const financialPlanner: Preset = {
	id: 'financial-planner',
	name: 'The CFO',
	description:
		'Budget tracking, investment logs, savings goals, and monthly expense reviews.',
	icon: '💰',
	category: 'work',
	config: {
		...webworkTheme,
		dashboardPage: { title: 'The CFO' },
		quarterPage: {
			template: 'overview-quarter',
			notePagesTemplate: 'finance-tracker',
			notePagesAmount: 1,
		},
		monthPage: {
			template: 'calendar-month',
			notePagesTemplate: 'finance-tracker',
			notePagesAmount: 1,
		},
		weekPage: {
			template: 'agenda-week',
			notePagesTemplate: 'finance-tracker',
			notePagesAmount: 1,
		},
		dayPage: {
			template: 'agenda-day-executive',
			notePagesTemplate: 'numbered',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'budget',
				name: '📊 Budget',
				type: 'finance-tracker',
				total: 12,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'investments',
				name: '📈 Investments',
				type: 'numbered-large',
				total: 50,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'savings-goals',
				name: '🎯 Savings',
				type: 'tasklist-progress',
				total: 20,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '💵',
			q2: '📈',
			q3: '🏦',
			q4: '💎',
			january: '📊',
			february: '💳',
			march: '🏛️',
			april: '💰',
			may: '📉',
			june: '🪙',
			july: '💸',
			august: '📈',
			september: '🏧',
			october: '💹',
			november: '🤑',
			december: '🎁',
		},
	},
};
