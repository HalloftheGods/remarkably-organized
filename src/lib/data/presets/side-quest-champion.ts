import type { Preset } from './types';
import { hackerTheme } from './themes';

export const sideQuestChampion: Preset = {
	id: 'side-quest-champion',
	name: 'The Over Achiever',
	description:
		'Gamified personal development. Track side projects, hobbies, creative pursuits, and personal quests with levels and achievements.',
	icon: '🎮',
	category: 'hobbies',
	config: {
		...hackerTheme,
		dashboardPage: { title: '🎮 Quest Log' },
		monthPage: { template: 'calendar-month' },
		weekPage: {
			template: 'agenda-week-notes-columns',
			notePagesTemplate: 'side-quest-tracker',
			notePagesAmount: 1,
		},
		dayPage: {
			template: 'agenda-day-split',
			notePagesTemplate: 'todo-large',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'quests',
				name: 'Active Quests',
				icon: '⚔️',
				type: 'side-quest-tracker',
				total: 50,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'achievements',
				name: 'Achievements & Wins',
				icon: '🏅',
				type: 'lined',
				total: 20,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'ideas',
				name: 'Quest Ideas - Backlog',
				icon: '🎲',
				type: 'numbered',
				total: 30,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '🎮',
			q2: '🕹️',
			q3: '⚡',
			q4: '🏆',
			january: '❄️',
			february: '💝',
			march: '🌱',
			april: '🌸',
			may: '🔥',
			june: '☀️',
			july: '🌊',
			august: '🎪',
			september: '🎃',
			october: '👻',
			november: '🦃',
			december: '🎄',
		},
	},
};
