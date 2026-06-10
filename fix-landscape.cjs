const fs = require('fs');
const { execSync } = require('child_process');

const files = execSync("grep -rl \"orientation === 'landscape'\" src/lib").toString().trim().split('\n');

for (const file of files) {
    if (!file || file.endsWith('settings.helper.ts')) continue;
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if we need to add import
    if (!content.includes('checkIsLandscape')) {
        const libImportMatch = content.match(/import\s+\{([^}]+)\}\s+from\s+'\$lib';/);
        if (libImportMatch) {
            const imports = libImportMatch[1];
            if (!imports.includes('checkIsLandscape')) {
                content = content.replace(libImportMatch[0], `import {${imports}, checkIsLandscape} from '$lib';`);
            }
        } else {
            content = content.replace(/<script[^>]*>/, "$&\n\timport { checkIsLandscape } from '$lib';");
        }
    }

    // Replace the condition
    content = content.replace(/settings\?\.design\?\.orientation === 'landscape'/g, 'checkIsLandscape(settings)');
    content = content.replace(/settings\.design\.orientation === 'landscape'/g, 'checkIsLandscape(settings)');
    
    // Fix missing $derived for dependent variables (like TravelPlanner.template.svelte)
    content = content.replace(/const ([a-zA-Z0-9_]+) = isLandscape \? ([^:]+) : ([^;]+);/g, 'const $1 = \\$derived(isLandscape ? $2 : $3);');

    fs.writeFileSync(file, content);
}
console.log('Fixed landscape usages in ' + files.length + ' files');
