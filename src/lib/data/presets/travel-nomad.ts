import type { Preset } from './types';
import { vaporwaveTheme } from './themes';

export const travelNomad: Preset = {
	id: 'travel-nomad',
	name: 'The Digital Nomad',
	description:
		'Trip planning, packing lists, and itineraries for the perpetual traveler.',
	icon: '✈️',
	category: 'lifestyle',
	config: {
		...vaporwaveTheme,
		dashboardPage: { title: '✈️ Departure Board' },
		monthPage: { template: 'calendar-month-with-notes' },
		weekPage: {
			template: 'agenda-week-notes-columns',
			notePagesTemplate: 'travel-planner',
			notePagesAmount: 1,
		},
		dayPage: {
			template: 'agenda-day-executive',
			notePagesTemplate: 'travel-planner',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'trips',
				name: 'Plans',
				icon: '🗺️',
				type: 'travel-planner',
				total: 20,
				numPagesPerItem: 2,
				numIndexPages: 1,
			},
			{
				id: 'expenses',
				name: 'Budget',
				icon: '💸',
				type: 'finance-tracker',
				total: 20,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'travel-journal',
				name: 'Journal',
				icon: '📓',
				type: 'lined-large',
				total: 50,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '🗻',
			q2: '🏖️',
			q3: '🏔️',
			q4: '🎿',
			january: '🇯🇵',
			february: '🇮🇹',
			march: '🇫🇷',
			april: '🇹🇭',
			may: '🇬🇷',
			june: '🇪🇸',
			july: '🇧🇷',
			august: '🇦🇺',
			september: '🇲🇦',
			october: '🇩🇪',
			november: '🇮🇳',
			december: '🇨🇦',
		},
	},
};
