const fs = require('fs');
const files = [
  './src/lib/components/organisms/PageSizePanel.organism.svelte',
  './src/lib/components/organisms/wizard/WizardDesign.organism.svelte'
];
for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<option value="([^"]+)" alt="([^"]+)">/g, '<option value="$1" data-alt="$2">');
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed alt in', file);
  }
}
