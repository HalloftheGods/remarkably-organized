const fs = require('fs');
const path = require('path');
const dir = 'src/lib/components/organisms/wizard';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.svelte'));

for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    const styleMatch = content.match(/<style lang="scss">([\s\S]*?)<\/style>/);
    if (styleMatch) {
        const styleContent = styleMatch[1];
        const rootSelectors = styleContent.match(/^[ \t]*([.#][a-zA-Z0-9_-]+|[a-zA-Z0-9_-]+)\s*\{/gm);
        console.log(file, rootSelectors);
    }
}
