const fs = require('fs');
const files = [
  './src/lib/components/templates/FutureLogYear.template.svelte',
  './src/lib/components/templates/CoverPage.template.svelte',
  './src/lib/components/templates/NotesQuarter.template.svelte',
  './src/lib/components/templates/NotesYear.template.svelte',
  './src/lib/components/templates/CalendarYear.template.svelte',
  './src/lib/components/templates/GoalsQuarter.template.svelte',
  './src/lib/components/templates/DashboardPage.template.svelte',
  './src/lib/components/templates/OverviewQuarter.template.svelte'
];
for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content.replace(/settings = \{\},/g, 'settings = undefined as any,');
    if (content !== newContent) {
      fs.writeFileSync(file, newContent, 'utf8');
      console.log('Fixed settings={} in', file);
    }
  }
}
