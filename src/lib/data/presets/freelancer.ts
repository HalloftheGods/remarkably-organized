import type { Preset } from './types';
import { godTheme } from './themes';

export const freelancer: Preset = {
	id: 'freelancer',
	name: 'The Solopreneur',
	description: 'Manage client projects, deadlines, and finances all in one place.',
	icon: '🚀',
	category: 'work',
	config: {
		...godTheme,
		dashboardPage: { title: '🚀 Command Center' },
		quarterPage: { template: 'overview-quarter', notePagesAmount: 1 },
		monthPage: { template: 'calendar-month-with-notes' },
		weekPage: {
			template: 'agenda-week-notes-rows',
			notePagesTemplate: 'todo-large',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'projects',
				name: '📁 Projects',
				type: 'project-planner',
				total: 30,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'finances',
				name: '💰 Finances',
				type: 'finance-tracker',
				total: 12,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: { disable: false },
	},
};
