import { describe, it, expect } from 'vitest';
import { PlannerSettings } from './planner-settings.svelte';

describe('PlannerSettings', () => {
	it('initializes with default settings', () => {
		const settings = new PlannerSettings();

		expect(settings.design).toBeDefined();
		expect(settings.design.font).toBe('Rancho');
		expect(settings.design.colorBg).toBe('#ffffff');

		expect(settings.sideNav.disable).toBe(false);
		expect(settings.coverPage.name).toBe('');
		expect(settings.dashboardPage.title).toBe('👋 Welcome');
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
