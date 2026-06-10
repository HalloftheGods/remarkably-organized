const fs = require('fs');
const path = require('path');
const glob = require('glob'); // Not available by default?
const { execSync } = require('child_process');

const files = execSync("grep -rl \"orientation === 'landscape'\" src/lib").toString().trim().split('\n');

for (const file of files) {
    if (!file || file.endsWith('settings.helper.ts')) continue;
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if we need to add import
    if (!content.includes('isLandscape')) {
        // Find import { ... } from '$lib'; or similar
        const libImportMatch = content.match(/import\s+\{([^}]+)\}\s+from\s+'\$lib';/);
        if (libImportMatch) {
            const imports = libImportMatch[1];
            if (!imports.includes('isLandscape')) {
                content = content.replace(libImportMatch[0], `import {${imports}, isLandscape} from '$lib';`);
            }
        } else {
            // Just add it after the first script tag
            content = content.replace(/<script[^>]*>/, "$&\n\timport { isLandscape } from '$lib';");
        }
    } else if (!content.includes("isLandscape} from '$lib'") && !content.includes("isLandscape } from '$lib'")) {
        content = content.replace(/import\s+\{([^}]+)\}\s+from\s+'\$lib';/, (match, p1) => {
             return `import { ${p1.trim()}, isLandscape } from '$lib';`
        });
        if (!content.includes("isLandscape} from '$lib'") && !content.includes("isLandscape } from '$lib'")) {
             content = content.replace(/<script[^>]*>/, "$&\n\timport { isLandscape } from '$lib';");
        }
    }

    // Replace the condition
    content = content.replace(/settings\?\.design\?\.orientation === 'landscape'/g, 'isLandscape(settings)');
    content = content.replace(/settings\.design\.orientation === 'landscape'/g, 'isLandscape(settings)');
    
    // Fix buggy non-derived variable in TravelPlanner and any other files
    // E.g. const nRows = isLandscape ? 14 : 21; -> const nRows = $derived(isLandscape ? 14 : 21);
    // But we replaced it with `isLandscape(settings)`.
    // Wait, let's fix `const nRows = isLandscape` where isLandscape was the boolean
    // Now isLandscape is a function. So the variable named `isLandscape` in the file is a conflict!
    // The file had: `const isLandscape = $derived(settings?.design?.orientation === 'landscape');`
    // We replaced the right side.
    content = content.replace(/const isLandscape = \$derived\(isLandscape\(settings\)\);/g, 'const landscape = $derived(isLandscape(settings));');
    content = content.replace(/const isLandscape = isLandscape\(settings\);/g, 'const landscape = $derived(isLandscape(settings));');
    // also replace `{@const isLandscape = isLandscape(settings)}` with `{@const landscape = isLandscape(settings)}`
    content = content.replace(/{@const isLandscape = isLandscape\(settings\)}/g, '{@const landscape = isLandscape(settings)}');
    
    // Now we need to replace usages of `isLandscape` as a variable in the template with `landscape`
    // Wait, replacing variable names in Svelte templates using regex is risky.
    // Instead of importing `isLandscape`, what if we name the imported helper `checkIsLandscape`?
    // That way `const isLandscape = $derived(checkIsLandscape(settings));` works perfectly without renaming variables everywhere!
    
    fs.writeFileSync(file, content);
}
