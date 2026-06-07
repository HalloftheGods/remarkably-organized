const fs = require('fs');
const path = require('path');
const dir = 'src/lib/components/organisms/wizard';

// FontPickerModal
let f1 = path.join(dir, 'FontPickerModal.organism.svelte');
let c1 = fs.readFileSync(f1, 'utf-8');
c1 = c1.replace(/<\/Box>\n\t<\/Box>\n\t<\/div>/g, '</Box>\n\t</div>');
c1 = c1.replace(/class="font-csv-item"\n\t\t\t\t\tclass:selected=\{isSelected\}/g, 'class="font-csv-item {isSelected ? \'selected\' : \'\'}"');
fs.writeFileSync(f1, c1, 'utf-8');

// WizardCollections
let f2 = path.join(dir, 'WizardCollections.organism.svelte');
let c2 = fs.readFileSync(f2, 'utf-8');
c2 = c2.replace(/<\/div>\n\t\t\t\t\t\t\t<\/div>\n\t\t\t\t\t\t<\/div>\n\t\t\t\t\t\{\/if\}\n\t\{\/if\}/g, '</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t{/if}\n\t{/if}');
// Also fix closing tag error around line 90:
// it's probably around the delete button
c2 = c2.replace(/<\/Button>\n\t\t\t\t<\/div>\n\t\t\t<\/div>\n\t\t\{\/if\}/g, '</Button>\n\t\t\t</div>\n\t\t{/if}');
fs.writeFileSync(f2, c2, 'utf-8');

// WizardPresets
let f3 = path.join(dir, 'WizardPresets.organism.svelte');
let c3 = fs.readFileSync(f3, 'utf-8');
c3 = c3.replace(/class="preset-card tooltip-bottom"\n\t\t\t\t\tclass:selected=\{isSelected\}/g, 'class="preset-card tooltip-bottom {isSelected ? \'selected\' : \'\'}"');
fs.writeFileSync(f3, c3, 'utf-8');

console.log("Fixed more errors");
