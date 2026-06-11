const fs = require('fs');
const file = 'src/lib/components/views/PlannerView.view.svelte';
let content = fs.readFileSync(file, 'utf8');

const target = `	function safeReplaceState(url: URL | string, state: any = {}) {
		try {
			replaceState(url, state);
		} catch (e) {
			console.error("safeReplaceState error:", e);
		}
	}`;

const replacement = `	function safeReplaceState(url: URL | string, state: any = {}) {
		try {
			replaceState(url, state);
		} catch (e) {
			if (browser) {
				const urlStr = url instanceof URL ? url.href : url;
				window.history.replaceState(state, '', urlStr);
			}
		}
	}`;

content = content.replace(target, replacement);
fs.writeFileSync(file, content);
