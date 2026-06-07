import { describe, it, expect } from 'vitest';
import { PlannerSettings } from './planner-settings.svelte';

describe('PlannerSettings', () => {
	it('initializes with default settings', () => {
		const settings = new PlannerSettings();

		expect(settings.design).toBeDefined();
		expect(settings.design.colorBg).toBe('#ffffff');

		expect(settings.sideNav.disable).toBe(false);
		expect(settings.coverPage.disable).toBe(true);
		expect(settings.dashboardPage.disable).toBe(true);
		expect(settings.quarterPage.disable).toBe(true);
		expect(settings.collections.length).toBe(1);
		expect(settings.collections[0].name).toBe('Notes');
		expect(settings.collections[0].total).toBe(8);
		expect(settings.collections[0].numIndexPages).toBe(1);
		expect(settings.collections[0].type).toBe('lined-large');
		expect(settings.coverPage.name).toBe('');
		expect(settings.dashboardPage.title).toBe('👋 Welcome');

		expect(settings.calendars.length).toBe(2);
		expect(settings.calendars[0].name).toBe('🎉 Public Holidays');
		expect(settings.calendars[1].name).toBe('🌕 Moon Phases');
	});

	it('serializes and deserializes correctly', () => {
		const settings = new PlannerSettings();

		// Modify some state
		settings.design.font = 'Inter';
		settings.coverPage.name = 'Test User';

		const serialized = settings.serialize();

		expect(serialized.design.font).toBe('Inter');
		expect(serialized.coverPage.name).toBe('Test User');

		const newSettings = new PlannerSettings(serialized);
		expect(newSettings.design.font).toBe('Inter');
		expect(newSettings.coverPage.name).toBe('Test User');
	});

	it('serializes and deserializes new font colors correctly', () => {
		const settings = new PlannerSettings();

		settings.design.colorTextDisplay = '#ff0000';
		settings.design.colorSideNavText = '#00ff00';
		settings.design.colorTopNavText = '#0000ff';
		settings.design.colorCoverText = '#ffff00';

		const serialized = settings.serialize();

		expect(serialized.design.colorTextDisplay).toBe('#ff0000');
		expect(serialized.design.colorSideNavText).toBe('#00ff00');
		expect(serialized.design.colorTopNavText).toBe('#0000ff');
		expect(serialized.design.colorCoverText).toBe('#ffff00');

		const newSettings = new PlannerSettings(serialized);
		expect(newSettings.design.colorTextDisplay).toBe('#ff0000');
		expect(newSettings.design.colorSideNavText).toBe('#00ff00');
		expect(newSettings.design.colorTopNavText).toBe('#0000ff');
		expect(newSettings.design.colorCoverText).toBe('#ffff00');
	});

	it('computes years correctly', () => {
		const settings = new PlannerSettings();

		// Let's set a specific start and end date to test derivation
		settings.date.start = new Date('2024-01-01T00:00:00Z');
		settings.date.end = new Date('2025-12-31T00:00:00Z');

		expect(settings.years.length).toBe(2);
		expect(settings.years[0].year).toBe(2024);
		expect(settings.years[1].year).toBe(2025);
	});
});
