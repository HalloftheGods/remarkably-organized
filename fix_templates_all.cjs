const fs = require('fs');
const path = require('path');

const dir = 'src/lib/components/templates/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.svelte'));

let fixedCount = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    const className = file.replace('.template.svelte', '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    
    // Some templates use `.planner.page.template-name` instead of just `.template-name`
    // Let's find any root level style block that starts with an opening brace and is not nested.
    
    let lines = content.split('\n');
    let insideStyle = false;
    let depth = 0;
    let modified = false;
    let newLines = [];
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        if (line.includes('<style')) {
            insideStyle = true;
        }
        
        if (insideStyle) {
            if (line.includes('{')) depth++;
            if (line.includes('}')) depth--;
            
            // If depth is 1 or just became 1 (meaning it's a top level block under style)
            // But wait, the top level might be just .template-class
            if (depth === 1 || (depth === 0 && line.includes('{'))) {
                // Check if this line is one of the redundant properties
                if (/^\s*(display:\s*flex|flex-direction:\s*column|width:\s*100%|height:\s*100%|box-sizing:\s*border-box);\s*$/.test(line)) {
                    modified = true;
                    continue; // Skip this line
                }
            }
        }
        
        if (line.includes('</style>')) {
            insideStyle = false;
        }
        
        newLines.push(line);
    }
    
    if (modified) {
        let newContent = newLines.join('\n');
        // Clean up any empty classes: .className { } -> remove it
        // Or if it just has whitespace.
        newContent = newContent.replace(/\.[a-zA-Z0-9-.]+\s*\{\s*\n*\s*\}/g, '');
        fs.writeFileSync(filePath, newContent, 'utf8');
        fixedCount++;
        console.log(`Fixed ${file}`);
    }
}
console.log(`Total fixed: ${fixedCount}`);
