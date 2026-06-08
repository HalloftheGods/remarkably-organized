import type { Preset } from './types';
import { nerdTheme } from './themes';

export const timeBlocker: Preset = {
	id: 'time-blocker',
	name: 'The Time-Blocker',
	description:
		'For deep work and Maker schedules. Built around rigid time-blocking to protect your focus.',
	icon: '⏳',
	category: 'essentials',
	config: {
		...nerdTheme,
		dashboardPage: { title: '⏳ Focus Console' },
		monthPage: { template: 'calendar-month' },
		weekPage: { template: 'agenda-week' },
		dayPage: {
			template: 'agenda-day-timebox',
			notePagesTemplate: 'dotted-large',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'tasks',
				name: '✅ Tasks',
				type: 'tasklist-progress',
				total: 50,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'notes',
				name: '📝 Meetings',
				type: 'meeting-minutes',
				total: 50,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '⏱️',
			q2: '⏳',
			q3: '🕰️',
			q4: '⏰',
			january: '🚀',
			february: '🎯',
			march: '💪',
			april: '📈',
			may: '🔥',
			june: '⚡',
			july: '🛠️',
			august: '⚙️',
			september: '🧠',
			october: '📊',
			november: '✅',
			december: '🏁',
		},
	},
};
