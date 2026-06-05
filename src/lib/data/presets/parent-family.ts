import type { Preset } from './types';
import { paperProTheme } from './themes';

export const parentFamily: Preset = {
	id: 'parent-family',
	name: 'The Family Hub',
	description:
		'Coordinate family schedules, school events, chores, and meal prep in one shared planner.',
	icon: '👨‍👩‍👧‍👦',
	category: 'lifestyle',
	config: {
		...paperProTheme,
		dashboardPage: { title: '👨‍👩‍👧‍👦 Family Central' },
		yearPage: { notePagesTemplate: 'chore-chart', notePagesAmount: 1 },
		monthPage: {
			template: 'calendar-month-with-notes',
			notePagesTemplate: 'meal-planner',
			notePagesAmount: 1,
		},
		weekPage: {
			template: 'agenda-week-notes-rows',
			notePagesTemplate: 'chore-chart',
			notePagesAmount: 1,
		},
		dayPage: {
			template: 'agenda-day-split',
			notePagesTemplate: 'todo-large',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'school-events',
				name: 'School Events',
				icon: '🏫',
				type: 'event-planner',
				total: 30,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'family-meals',
				name: 'Meal Plans',
				icon: '🍽️',
				type: 'meal-planner',
				total: 52,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'family-recipes',
				name: 'Family Recipes',
				icon: '👩‍🍳',
				type: 'recipe-card',
				total: 50,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '🌷',
			q2: '☀️',
			q3: '🍁',
			q4: '⛄',
			january: '📚',
			february: '💕',
			march: '🌸',
			april: '🐣',
			may: '👩',
			june: '👨',
			july: '🏕️',
			august: '🎒',
			september: '🏫',
			october: '🎃',
			november: '🦃',
			december: '🎁',
		},
	},
};
