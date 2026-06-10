import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess({ script: true }),
	vitePlugin: {
		inspector: {
			showToggleButton: 'active',
			toggleButtonPos: 'top-right',
		},
	},
	kit: {
		// adapter-cloudflare is configured for Cloudflare Pages/Workers deployment.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$atoms: 'src/lib/components/atoms',
			$molecules: 'src/lib/components/molecules',
			$organisms: 'src/lib/components/organisms',
			$layouts: 'src/lib/components/page-layouts',
			$templates: 'src/lib/components/templates',
			$views: 'src/lib/components/views',
			$backgrounds: 'src/lib/components/backgrounds',
			$wizard: 'src/lib/components/organisms/wizard',
			$components: 'src/lib/components',
			$state: 'src/lib/state',
			$themes: 'src/lib/data/themes',
		},
	},
};

export default config;
