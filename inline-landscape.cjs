const fs = require('fs');
const { execSync } = require('child_process');

const files = execSync("find src/lib/components -type f -name \"*.svelte\"").toString().trim().split('\n');
let count = 0;

for (const file of files) {
    if (!file) continue;
    let content = fs.readFileSync(file, 'utf8');
    
    if (content.includes('const isLandscape = $derived(settings?.isLandscape);') || content.includes('const landscape = $derived(settings?.isLandscape);')) {
        // Remove the definition
        content = content.replace(/[ \t]*const (?:isL|l)andscape = \$derived\(settings\?\.isLandscape\);\n?/g, '');
        
        // Replace usages of `isLandscape` or `landscape`
        // We only replace exact word boundaries so we don't mess up things like `checkIsLandscape`
        content = content.replace(/\b(isLandscape|landscape)\b/g, 'settings?.isLandscape');
        
        fs.writeFileSync(file, content);
        count++;
    }
}
console.log('Inlined landscape in ' + count + ' files');
