import { PlannerSettings } from './src/lib/state/planner-settings.svelte.js';
import { PRESETS } from './src/lib/data/presets.js';
import LZString from 'lz-string';

const preset = PRESETS.find((p) => p.id === 'teacher-educator');
const settings = new PlannerSettings(preset.config);
const edits = settings.getEdits();
const hash = LZString.compressToEncodedURIComponent(JSON.stringify(edits));

const decompressed = LZString.decompressFromEncodedURIComponent(hash);
const parsed = JSON.parse(decompressed);
const settings1 = new PlannerSettings(parsed);
const edits1 = settings1.getEdits();
const hash1 = LZString.compressToEncodedURIComponent(JSON.stringify(edits1));

console.log(hash === hash1);
