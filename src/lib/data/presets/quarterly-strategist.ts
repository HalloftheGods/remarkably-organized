import type { Preset } from './types';
import { classicTheme } from './themes';

export const quarterlyStrategist: Preset = {
	id: 'quarterly-strategist',
	name: 'The Executive',
	description:
		'Focuses on 90-day execution. Perfect for founders, freelancers, and goal-oriented planners.',
	icon: '🎯',
	category: 'work',
	config: {
		...classicTheme,
		dashboardPage: { title: 'The Executive' },
		quarterPage: {
			template: 'overview-quarter',
			notePagesTemplate: 'goals-quarter',
			notePagesAmount: 3,
		},
		monthPage: { template: 'calendar-month-with-notes' },
		weekPage: {
			notePagesTemplate: 'meeting-minutes',
			notePagesAmount: 1,
		},
		dayPage: {
			template: 'agenda-day-executive',
			notePagesTemplate: 'todo-large',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'okrs',
				name: '🎯 OKRs',
				type: 'okr-tracker',
				total: 12,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'strategic-projects',
				name: '📋 Projects',
				type: 'project-planner',
				total: 20,
				numPagesPerItem: 2,
				numIndexPages: 1,
			},
			{
				id: 'sprints',
				name: '🏃 Sprints',
				type: 'sprint-planner',
				total: 26,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'meetings',
				name: '🤝 Meetings',
				type: 'meeting-minutes',
				total: 30,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '🎯',
			q2: '🚀',
			q3: '⚡',
			q4: '🏁',
			january: '1️⃣',
			february: '2️⃣',
			march: '3️⃣',
			april: '4️⃣',
			may: '5️⃣',
			june: '6️⃣',
			july: '7️⃣',
			august: '8️⃣',
			september: '9️⃣',
			october: '🔟',
			november: '🦃',
			december: '❄️',
		},
	},
};
