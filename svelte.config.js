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
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$atoms: 'src/lib/components/atoms',
			$molecules: 'src/lib/components/molecules',
			$organisms: 'src/lib/components/organisms',
			$layouts: 'src/lib/components/page-layouts',
			$templates: 'src/lib/components/templates',
			$backgrounds: 'src/lib/components/backgrounds',
			$components: 'src/lib/components'
		}
	},
};

export default config;
