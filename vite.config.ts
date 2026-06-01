import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

export default defineConfig({
	define: {
		__APP_VERSION__: JSON.stringify(pkg.version),
	},
	plugins: [sveltekit(), Icons({ compiler: 'svelte' })],
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
				additionalData: `@use 'variables' as *;`,
				loadPaths: ['./src/lib/styles'],
			},
		},
	},
	server: {
		fs: {
			allow: ['./src', './static'],
		},
	},
});
