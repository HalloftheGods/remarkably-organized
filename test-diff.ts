import { PlannerSettings } from './src/lib/state/planner-settings.svelte.ts';
import { objectDiff } from './src/lib/helpers/object-diff.helper.ts';

const settings = new PlannerSettings();
settings.yearPage.disable = true;
settings.date.startWeekOnSunday = false;
settings.quarterPage.template = 'something-else';

console.log('edits', JSON.stringify(settings.edits, null, 2));
