import type { Preset } from './types';
import { mujiTheme } from './themes';

export const adhdPro: Preset = {
	id: 'adhd-pro',
	name: 'The Hyper Focused',
	description:
		'Productivity optimized for ADHD. Uses the Eisenhower Matrix to prioritize tasks with a clutter-free interface.',
	icon: '🧠',
	category: 'essentials',
	config: {
		...mujiTheme,
		dashboardPage: { title: 'The Hyper Focused' },
		monthPage: { template: 'calendar-month' },
		weekPage: {
			template: 'agenda-week',
			notePagesTemplate: 'eisenhower-matrix',
			notePagesAmount: 1,
		},
		dayPage: {
			template: 'agenda-day-timebox',
			notePagesTemplate: 'eisenhower-matrix',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'priority-matrix',
				name: '🎯 Priorities',
				type: 'eisenhower-matrix',
				total: 50,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'brain-dump',
				name: '🗑️ Ideas',
				type: 'dotted',
				total: 100,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: { disable: false },
	},
};
