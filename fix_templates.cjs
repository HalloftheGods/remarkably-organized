const fs = require('fs');
const path = require('path');

const dir = 'src/lib/components/templates/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.svelte'));

let fixedCount = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Regex to find a top-level class inside <style lang="scss"> 
    // that has display: flex, flex-direction: column, width: 100%, height: 100%, box-sizing: border-box.
    // It's possible there are other properties like padding or gap. We should remove the specific redundant properties.
    
    // Actually, maybe we can just look for those 5 properties and delete them.
    const propertiesToRemove = [
        /^\s*display:\s*flex;\n/gm,
        /^\s*flex-direction:\s*column;\n/gm,
        /^\s*width:\s*100%;\n/gm,
        /^\s*height:\s*100%;\n/gm,
        /^\s*box-sizing:\s*border-box;\n/gm,
    ];

    let newContent = content;
    
    // We only want to remove these properties if they are at the top level of the template class block.
    // But honestly, it's probably safe to remove them if they are exactly those strings. Wait, no. width: 100% is used elsewhere.
    
    // Let's find the top-level class block. It usually matches the filename, e.g., sprint-planner
    const className = file.replace('.template.svelte', '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    
    const styleRegex = new RegExp(`(\\.${className}\\s*\\{[\\s\\S]*?\\})`);
    const match = newContent.match(styleRegex);
    if (match) {
        let blockContent = match[0];
        // We only want to remove from the root of this class, not inside nested classes.
        // It's a bit tricky to parse SCSS with regex. Let's just remove those lines if they don't have too much indentation (e.g. exactly two tabs or 8 spaces, depending on file).
        // Actually, we can split by lines and keep track of depth.
        let lines = blockContent.split('\n');
        let depth = 0;
        let newLines = [];
        let modified = false;
        for (let line of lines) {
            if (line.includes('{')) depth++;
            if (line.includes('}')) depth--;
            
            if (depth === 1 || (depth === 0 && line.includes('{'))) {
                // We are at the root level of the class
                if (/^\s*(display:\s*flex|flex-direction:\s*column|width:\s*100%|height:\s*100%|box-sizing:\s*border-box);\s*$/.test(line)) {
                    modified = true;
                    continue; // Skip this line
                }
            }
            newLines.push(line);
        }
        
        if (modified) {
            newContent = newContent.replace(blockContent, newLines.join('\n'));
            // Remove empty class if it's empty
            newContent = newContent.replace(new RegExp(`\\.${className}\\s*\\{\\s*\\}`), '');
            
            fs.writeFileSync(filePath, newContent, 'utf8');
            fixedCount++;
            console.log(`Fixed ${file}`);
        }
    }
}
console.log(`Total fixed: ${fixedCount}`);
