import fs from 'fs';
import path from 'path';

const dir = '/home/xopher/www/x/remarkably-organized/src/lib/components/templates/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.svelte'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Fix 1: PlannerSettings type declaration
    if (content.includes('let { settings = {} as PlannerSettings } = $props();')) {
        content = content.replace(
            'let { settings = {} as PlannerSettings } = $props();',
            'let { settings = {} }: { settings?: PlannerSettings } = $props();'
        );
        changed = true;
    }
    
    // Also handle cases with other props on the same line, e.g. let { startWeekOnSunday = false, settings = {} as PlannerSettings } = $props();
    // This regex matches `settings = {} as PlannerSettings` inside the destructuring and replaces it.
    // Wait, replacing `settings = {} as PlannerSettings` inside a larger destructured object is tricky to type properly inline.
    // It's easier to just find `settings = {} as PlannerSettings` and replace it with `settings = {}`. 
    // And if it's the only one, replace it with `let { settings = {} }: { settings?: PlannerSettings }`.
    // Let's do a more robust regex for the PlannerSettings issue.
    const plannerSettingsRegex = /let\s+\{\s*([^}]*?)\s*(?:,\s*)?settings\s*=\s*\{\}\s*as\s*PlannerSettings\s*(?:,\s*)?([^}]*?)\s*\}\s*=\s*\$props\(\);/g;
    
    content = content.replace(plannerSettingsRegex, (match, p1, p2) => {
        const otherProps = [p1, p2].filter(p => p.trim() !== '').join(', ');
        if (otherProps) {
            return `let { ${otherProps}, settings = {} }: { ${otherProps.replace(/=[^,]+/g, '').replace(/(\w+)/g, '$1?: any')}, settings?: PlannerSettings } = $props();`;
            // Actually it's easier to just strip `as PlannerSettings` and rely on TS inference for others, but let's just do:
            // let { ..., settings = {} as any } = $props(); -> No, the error is caused by `as PlannerSettings`.
            // The simplest fix for Tailwind is to just change `as PlannerSettings` to `as any` or cast it later, OR just do `settings = {}`. 
            // Wait, Tailwind just parses the string. If we add a newline or change `{ settings = {} as PlannerSettings }` to something else.
        }
        return `let { settings = {} }: { settings?: PlannerSettings } = $props();`;
    });

    // Let's just blindly replace `as PlannerSettings` with `as any` or remove it.
    // Actually, Svelte 5 `$props()` allows defining the type.
    // If I just replace `as PlannerSettings` with `as any`, wait, does `as any` break types?
    // Let's replace `settings = {} as PlannerSettings` with `settings = Object.assign({}, {} as PlannerSettings)`? No.
    // Let's replace:
    // `settings = {} as PlannerSettings` -> `settings = {}` 
    // Wait, if it loses type inference for `settings` inside the template, that's bad.
    
    // Let's refine the replacement:
    if (content.includes('as PlannerSettings')) {
        // Find the line containing `$props()` and `as PlannerSettings`.
        // If it's `let { settings = {} as PlannerSettings } = $props();`, replace exactly.
        content = content.replace(/let\s*\{\s*settings\s*=\s*\{\}\s*as\s*PlannerSettings\s*\}\s*=\s*\$props\(\);/, 'let { settings = {} }: { settings?: PlannerSettings } = $props();');
        
        // If there are other props, we can do `let props = $props(); let settings = props.settings || {};` but that loses reactivity.
        // In Svelte 5, `let { settings = {}, startWeekOnSunday = false }: { settings?: PlannerSettings, startWeekOnSunday?: boolean } = $props();`
        // Let's just use `let { ..., settings = {} as any } = $props();` Wait, does Tailwind crash on `as any`? No, it crashed on `PlannerSettings` because it's a known import maybe? Or it crashed on the exact sequence.
        // The safest fix for the Tailwind crash is to use `settings = {} as any /* PlannerSettings */` ? 
        // No, `Invalid declaration: PlannerSettings` means it saw `{... PlannerSettings}`.
        // Let's just replace `as PlannerSettings` with `as import('$lib').PlannerSettings`.
        content = content.replace(/as PlannerSettings/g, 'as any /* PlannerSettings */');
        changed = true;
    }

    // Fix 2: Redundant classes on planner page
    // We want to remove `flex-col-1`, `p-6`, `box-border`, `gap-6`, `gap-4`, `gap-5`, `w-full`, `h-full`, `py-4`, `px-6`, `p-0` from `<div class="planner page ...">`
    const classRegex = /<div\s+class="planner page([^"]*)"/g;
    content = content.replace(classRegex, (match, classes) => {
        let newClasses = classes
            .replace(/\bflex-col-1\b/g, '')
            .replace(/\bp-6\b/g, '')
            .replace(/\bp-4\b/g, '')
            .replace(/\bp-0\b/g, '')
            .replace(/\bpy-4\b/g, '')
            .replace(/\bpx-6\b/g, '')
            .replace(/\bpy-6\b/g, '')
            .replace(/\bpx-0\b/g, '')
            .replace(/\bbox-border\b/g, '')
            .replace(/\bgap-\d\b/g, '')
            .replace(/\bw-full\b/g, '')
            .replace(/\bh-full\b/g, '')
            .replace(/\bflex\b/g, '')
            .replace(/\bflex-col\b/g, '')
            .replace(/\s+/g, ' ')
            .trim();
        
        if (newClasses) {
            return `<div class="planner page ${newClasses}"`;
        }
        return `<div class="planner page"`;
    });

    if (content !== fs.readFileSync(filePath, 'utf8')) {
        fs.writeFileSync(filePath, content);
        console.log('Fixed', file);
    }
}
