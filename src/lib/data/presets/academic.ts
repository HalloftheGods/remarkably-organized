import type { Preset } from './types';
import { classicTheme } from './themes';

export const academic: Preset = {
	id: 'academic',
	name: 'The Academic',
	description:
		'Starts in August. Uses a 24-hour clock and includes a lined notebook collection.',
	icon: '🎓',
	category: 'hobbies',
	config: {
		...classicTheme,
		dashboardPage: { title: '📚 Study Hub' },
		quarterPage: { notePagesTemplate: 'calendar-quarter', notePagesAmount: 1 },
		weekPage: { use24HourClock: true },
		dayPage: { use24HourClock: true },
		collections: [
			{
				id: 'class-notes',
				name: 'Class Notes',
				icon: '📚',
				type: 'lined',
				total: 6,
				numPagesPerItem: 10,
				numIndexPages: 1,
			},
			{
				id: 'assignments',
				name: 'Assignments',
				icon: '📝',
				type: 'assignment-tracker',
				total: 10,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '🎒',
			q2: '📝',
			q3: '📚',
			q4: '🎓',
			january: '📖',
			february: '💡',
			march: '🏫',
			april: '✏️',
			may: '🍎',
			june: '🎉',
			july: '🏖️',
			august: '🚌',
			september: '📐',
			october: '🔬',
			november: '💻',
			december: '☕',
		},
	},
};
