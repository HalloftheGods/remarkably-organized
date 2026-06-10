import fs from 'fs';
import path from 'path';

const dir = '/home/xopher/www/x/remarkably-organized/src/lib/components/templates/';
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.svelte'));

for (const file of files) {
	const filePath = path.join(dir, file);
	let content = fs.readFileSync(filePath, 'utf8');
	let changed = false;

	// Fix the mangled $props
	if (content.includes(',,')) {
		content = content.replace(/,,/g, ',');
		changed = true;
	}
	if (content.includes('? |  any')) {
		content = content.replace(/\?\s*\|\s*any/g, '?: any');
		changed = true;
	}

	// Some lines might look like `let { months = [] as Month[],\n\t\tstartWeekOnSunday = false, settings = {} }: { months?: any ,\n\t\tstartWeekOnSunday?: any , settings?: PlannerSettings } = $props();`
	// The previous regex might have left `let { months = [] as Month[],\n\t\tstartWeekOnSunday = false, settings = {} } |  { months?: any ,\n\t\tstartWeekOnSunday?: any , settings?: PlannerSettings } = $props();`
	// Let's just fix `} |  {`
	if (content.includes('} |  {')) {
		content = content.replace(/\}\s*\|\s*\{/g, '}: {');
		changed = true;
	}

	// Fix mangled flex classes
	if (content.includes("-row' : '-col'")) {
		content = content.replace(/-row' : '-col'/g, "flex-row' : ''");
		changed = true;
	}
	if (content.includes('-col p-2')) {
		content = content.replace(/-col p-2/g, 'p-2');
		changed = true;
	}
	if (content.includes("'-row' : '-row-reverse'")) {
		content = content.replace(
			/'-row' : '-row-reverse'/g,
			"'flex-row' : 'flex-row-reverse'",
		);
		changed = true;
	}

	if (changed) {
		fs.writeFileSync(filePath, content);
		console.log('Repaired', file);
	}
}
