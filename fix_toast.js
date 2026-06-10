const fs = require('fs');
const file = 'src/lib/components/views/PlannerView.view.svelte';
let content = fs.readFileSync(file, 'utf8');

const target = `			// Add a debug toast for the user so they can tell us what happened
			if (window.location.search.includes('debug=1')) {
				if (shouldUpdateToCompressedUrl) {
					toast.info(\`Updating URL to compressed string. Edits: \${Object.keys(edits).join(',')}\`);
				} else if (shouldRestorePresetUrl) {
					toast.info('Restoring preset URL');
				} else if (shouldResetToBaseUrl) {
					toast.info('Resetting to base URL (no edits)');
				} else {
					toast.info('URL did not change');
				}
			}`;

const replacement = `			if (shouldUpdateToCompressedUrl) {
				// Provide subtle visual feedback that settings synced to URL
				toast.success('Settings synced to URL', { duration: 1500 });
			}`;

content = content.replace(target, replacement);
fs.writeFileSync(file, content);
