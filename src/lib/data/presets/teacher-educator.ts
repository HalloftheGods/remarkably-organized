import type { Preset } from './types';
import { paperProTheme } from './themes';

export const teacherEducator: Preset = {
	id: 'teacher-educator',
	name: 'The Educator',
	description:
		'Lesson plans, class rosters, grade trackers, and curriculum calendars for teachers.',
	icon: '🍎',
	category: 'academic',
	config: {
		...paperProTheme,
		dashboardPage: { title: "🍎 Teacher's Desk" },
		quarterPage: {
			template: 'overview-quarter',
			notePagesTemplate: 'goals-quarter',
			notePagesAmount: 1,
		},
		monthPage: { template: 'calendar-month-with-notes' },
		weekPage: {
			template: 'agenda-week-notes-rows',
			notePagesTemplate: 'lesson-plan',
			notePagesAmount: 1,
		},
		dayPage: {
			template: 'agenda-day-timebox',
			notePagesTemplate: 'lesson-plan',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'lesson-plans',
				name: 'Lesson Plans',
				icon: '📋',
				type: 'lesson-plan',
				total: 100,
				numPagesPerItem: 1,
				numIndexPages: 2,
			},
			{
				id: 'grade-tracker',
				name: 'Grade Tracker',
				icon: '📊',
				type: 'grade-tracker',
				total: 30,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'parent-contacts',
				name: 'Parent Contacts',
				icon: '📞',
				type: 'client-tracker',
				total: 50,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '📚',
			q2: '🎨',
			q3: '🔬',
			q4: '🎄',
			january: '📖',
			february: '❤️',
			march: '🍀',
			april: '🧪',
			may: '🎓',
			june: '🏖️',
			july: '📕',
			august: '🏫',
			september: '✏️',
			october: '🎃',
			november: '🦃',
			december: '🎁',
		},
	},
};
