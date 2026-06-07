const fs = require('fs');
const path = require('path');
const dir = 'src/lib/components/organisms/wizard';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.svelte'));

for (const file of files) {
    const p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf-8');

    if (content.includes('<style lang="scss">\n\t:global {')) {
        content = content.replace(/<style lang="scss">\n\t:global {/, '<style lang="scss">');
        content = content.replace(/\t}\n<\/style>/, '</style>');
        fs.writeFileSync(p, content, 'utf-8');
    }
}
console.log('Unwrapped');
