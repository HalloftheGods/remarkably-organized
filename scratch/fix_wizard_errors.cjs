const fs = require('fs');
const path = require('path');

const dir = 'src/lib/components/organisms/wizard';

// 1. FontPickerModal
let file = path.join(dir, 'FontPickerModal.organism.svelte');
let content = fs.readFileSync(file, 'utf-8');
content = content.replace(
	/<Box class="font-picker-modal"/g,
	'<div class="font-picker-modal"',
);
content = content.replace(
	/<Box class="font-picker-content"/g,
	'<div class="font-picker-content"',
);
content = content.replace(/<\/Box>\s*<\/Box>\s*<\/Box>/g, '</Box>\n\t</div>\n</div>'); // close the divs
fs.writeFileSync(file, content, 'utf-8');

// 2. WizardCollections
file = path.join(dir, 'WizardCollections.organism.svelte');
content = fs.readFileSync(file, 'utf-8');
content = content.replace(
	/<Box class="custom-prompt-overlay"/g,
	'<div class="custom-prompt-overlay"',
);
content = content.replace(
	/<Box class="custom-prompt-card"/g,
	'<div class="custom-prompt-card"',
);
content = content.replace(
	/<Box class="delete-confirm-overlay"/g,
	'<div class="delete-confirm-overlay"',
);
content = content.replace(/<Box class="confirm-card"/g, '<div class="confirm-card"');
// We need to fix closing tags.
content = content.replace(
	/<\/Button>\s*<\/Box>\s*<\/Box>\s*<\/Box>/g,
	'</Button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t{/if}',
);
content = content.replace(
	/<\/Button>\s*<\/Box>\s*<\/Box>\s*<\/Box>\s*\{\/if\}/g,
	'</Button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t{/if}',
);
fs.writeFileSync(file, content, 'utf-8');

// 3. WizardEvents
file = path.join(dir, 'WizardEvents.organism.svelte');
content = fs.readFileSync(file, 'utf-8');
content = content.replace(
	/class="sync-btn"\s*class:updating=\{calendar\.updating\}/g,
	"class=\"sync-btn {calendar.updating ? 'updating' : ''}\"",
);
fs.writeFileSync(file, content, 'utf-8');

// 4. WizardExport
file = path.join(dir, 'WizardExport.organism.svelte');
content = fs.readFileSync(file, 'utf-8');
content = content.replace(
	/class="welcome-feature"\s*class:is-primary=\{action\.primary\}/g,
	"class=\"welcome-feature {action.primary ? 'is-primary' : ''}\"",
);
fs.writeFileSync(file, content, 'utf-8');

// 5. WizardPresets
file = path.join(dir, 'WizardPresets.organism.svelte');
content = fs.readFileSync(file, 'utf-8');
content = content.replace(
	/class="category-tab"\s*class:active=\{activeCategory === cat\.id\}\s*class:welcome-headline-gradient=\{activeCategory === cat\.id\}/g,
	"class=\"category-tab {activeCategory === cat.id ? 'active welcome-headline-gradient' : ''}\"",
);
fs.writeFileSync(file, content, 'utf-8');

console.log('Fixed errors manually');
