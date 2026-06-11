const fs = require('fs');
const path = require('path');
const dir = './src/lib/components/templates';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.svelte'));
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content.replace(/settings = {} as PlannerSettings/g, 'settings = undefined as any');
  newContent = newContent.replace(/settings = {} as any \/\* PlannerSettings \*\//g, 'settings = undefined as any /* PlannerSettings */');
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Fixed', file);
  }
}
