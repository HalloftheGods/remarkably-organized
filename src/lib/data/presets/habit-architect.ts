import type { Preset } from './types';
import { nerdTheme } from './themes';

export const habitArchitect: Preset = {
	id: 'habit-architect',
	name: 'The Habit Maker',
	description:
		'Atomic Habits-inspired. Stack habits, track streaks, and design your daily systems.',
	icon: '🌱',
	category: 'wellness',
	config: {
		...nerdTheme,
		dashboardPage: { title: '⚙️ System Design' },
		yearPage: { notePagesTemplate: 'habit-year-by-month', notePagesAmount: 2 },
		quarterPage: {
			template: 'overview-quarter',
			notePagesTemplate: 'habit-year-by-week',
			notePagesAmount: 1,
		},
		monthPage: {
			template: 'calendar-month',
			notePagesTemplate: 'habit-year-by-month',
			notePagesAmount: 1,
		},
		weekPage: {
			template: 'agenda-week',
			notePagesTemplate: 'habit-year-by-week',
			notePagesAmount: 1,
		},
		dayPage: {
			template: 'agenda-day-timebox',
			notePagesTemplate: 'pomodoro-tracker',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'habit-stacks',
				name: 'Habit Stacks',
				icon: '📊',
				type: 'habit-year-by-week',
				total: 12,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'systems',
				name: 'System Design Notes',
				icon: '🛠️',
				type: 'numbered-large',
				total: 30,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '⚙️',
			q2: '🔧',
			q3: '🏗️',
			q4: '🏆',
			january: '🎯',
			february: '🔗',
			march: '📈',
			april: '🔄',
			may: '⚡',
			june: '🌟',
			july: '🔥',
			august: '💪',
			september: '🧠',
			october: '🛡️',
			november: '🏅',
			december: '🎄',
		},
	},
};
