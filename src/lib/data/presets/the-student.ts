import type { Preset } from './types';
import { classicTheme } from './themes';

export const theStudent: Preset = {
	id: 'the-student',
	name: 'The Student',
	description:
		'Semester-based tracking with class schedules, assignment deadlines, and grade rosters.',
	icon: '🎓',
	category: 'academic',
	config: {
		...classicTheme,
		dashboardPage: { title: 'The Student' },
		quarterPage: { notePagesTemplate: 'calendar-quarter', notePagesAmount: 1 },
		weekPage: {
			template: 'agenda-week-split',
			notePagesTemplate: 'assignment-tracker',
			notePagesAmount: 1,
			use24HourClock: true,
		},
		dayPage: {
			template: 'agenda-day-split',
			notePagesTemplate: 'assignment-tracker',
			notePagesAmount: 1,
			use24HourClock: true,
		},
		collections: [
			{
				id: 'class-notes',
				name: '📝 Lectures',
				type: 'lined',
				total: 10,
				numPagesPerItem: 10,
				numIndexPages: 2,
			},
			{
				id: 'assignments',
				name: '📝 Assignments',
				type: 'assignment-tracker',
				total: 12,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'grades',
				name: '📊 Grades',
				type: 'grade-tracker',
				total: 8,
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
