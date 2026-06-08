import type { Preset } from './types';
import { forestTheme } from './themes';

export const homemaker: Preset = {
	id: 'homemaker',
	name: 'The Homemaker',
	description:
		'The ultimate command center for running a household. Garden, meals, budgets, and pets.',
	icon: '🏡',
	category: 'lifestyle',
	config: {
		...forestTheme,
		dashboardPage: { title: '🏡 Home Command' },
		yearPage: { notePagesTemplate: 'chore-chart', notePagesAmount: 1 },
		monthPage: {
			template: 'calendar-month-with-notes',
			notePagesTemplate: 'finance-tracker',
			notePagesAmount: 1,
		},
		weekPage: {
			template: 'agenda-week-notes-rows',
			notePagesTemplate: 'meal-planner',
			notePagesAmount: 1,
		},
		dayPage: {
			template: 'agenda-day-mindful',
			notePagesTemplate: 'todo-large',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'garden',
				name: '🌻 Garden',
				type: 'garden-planner',
				total: 10,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'pets',
				name: '🐾 Pets',
				type: 'pet-care',
				total: 12,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'events',
				name: '🎉 Events',
				type: 'event-planner',
				total: 10,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'recipes',
				name: '🥘 Recipes',
				type: 'recipe-card',
				total: 50,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '🌱',
			q2: '☀️',
			q3: '🍂',
			q4: '❄️',
			january: '🧹',
			february: '❤️',
			march: '🍀',
			april: '🌧️',
			may: '🌸',
			june: '🍉',
			july: '🏖️',
			august: '🌻',
			september: '🍎',
			october: '🎃',
			november: '🦃',
			december: '🎄',
		},
	},
};
