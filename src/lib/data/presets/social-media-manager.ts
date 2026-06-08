import type { Preset } from './types';
import { vaporwaveTheme } from './themes';

export const socialMediaManager: Preset = {
	id: 'social-media-manager',
	name: 'The Social Manager',
	description:
		'Content calendars, posting schedules, engagement tracking, and campaign planning.',
	icon: '📱',
	category: 'work',
	config: {
		...vaporwaveTheme,
		dashboardPage: { title: '📱 Feed HQ' },
		quarterPage: { template: 'overview-quarter', notePagesAmount: 1 },
		monthPage: {
			template: 'calendar-month-with-notes',
			notePagesTemplate: 'content-planner',
			notePagesAmount: 1,
		},
		weekPage: {
			template: 'agenda-week-notes-columns',
			notePagesTemplate: 'content-planner',
			notePagesAmount: 1,
		},
		dayPage: {
			template: 'agenda-day-timebox',
			notePagesTemplate: 'todo-large',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'content-calendar',
				name: '📅 Calendar',
				type: 'content-planner',
				total: 52,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'campaigns',
				name: '🎯 Campaigns',
				type: 'project-planner',
				total: 20,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'analytics',
				name: '📊 Analytics',
				type: 'numbered-large',
				total: 52,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '📸',
			q2: '🎥',
			q3: '📊',
			q4: '🎉',
			january: '🎯',
			february: '💖',
			march: '🌸',
			april: '📱',
			may: '🎬',
			june: '☀️',
			july: '🏖️',
			august: '📈',
			september: '🎨',
			october: '🎃',
			november: '🦃',
			december: '🎄',
		},
	},
};
