const fs = require('fs');
const { execSync } = require('child_process');

const files = execSync("find src/lib/components -type f -name \"*.svelte\"").toString().trim().split('\n');

let updated = 0;

for (const file of files) {
    if (!file) continue;
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // Replace checkIsLandscape(settings) with settings?.isLandscape
    if (content.includes('checkIsLandscape(settings)')) {
        content = content.replace(/checkIsLandscape\(settings\)/g, 'settings?.isLandscape');
        modified = true;
    }

    // Remove the import of checkIsLandscape
    if (content.includes('checkIsLandscape')) {
        content = content.replace(/,\s*checkIsLandscape/g, '');
        content = content.replace(/checkIsLandscape\s*,/g, '');
        content = content.replace(/import\s*{\s*checkIsLandscape\s*}\s*from\s*'\$lib';\n?/g, '');
        // Clean up empty imports like `import {  } from '$lib';` just in case, though usually there are other imports
        content = content.replace(/import\s*{\s*}\s*from\s*'\$lib';\n?/g, '');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, content);
        updated++;
    }
}
console.log('Fixed landscape usages to use getter in ' + updated + ' files');
