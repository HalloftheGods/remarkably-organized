import type { Preset } from './types';
import { pastelTheme } from './themes';

export const weddingPlanner: Preset = {
	id: 'wedding-planner',
	name: 'The Wedding Planner',
	description:
		'Vendor contacts, guest lists, timeline milestones, and budget tracking for the big day.',
	icon: '💒',
	category: 'lifestyle',
	config: {
		...pastelTheme,
		dashboardPage: { title: 'The Wedding Planner' },
		quarterPage: {
			template: 'overview-quarter',
			notePagesTemplate: 'tasklist-progress',
			notePagesAmount: 1,
		},
		monthPage: {
			template: 'calendar-month-with-notes',
			notePagesTemplate: 'finance-tracker',
			notePagesAmount: 1,
		},
		weekPage: {
			template: 'agenda-week-notes-rows',
			notePagesTemplate: 'event-planner',
			notePagesAmount: 1,
		},
		dayPage: {
			template: 'agenda-day-executive',
			notePagesTemplate: 'todo-large',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'vendors',
				name: '📇 Vendors',
				type: 'client-tracker',
				total: 30,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'guest-list',
				name: '📋 Guests',
				type: 'numbered-large',
				total: 10,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'budget',
				name: '💰 Budget',
				type: 'finance-tracker',
				total: 12,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '💍',
			q2: '🌹',
			q3: '🥂',
			q4: '💒',
			january: '💎',
			february: '💕',
			march: '🌸',
			april: '🌷',
			may: '🕊️',
			june: '💐',
			july: '🎶',
			august: '🍰',
			september: '🥂',
			october: '📷',
			november: '🤵',
			december: '👰',
		},
	},
};
