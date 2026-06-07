import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import Icons from 'unplugin-icons/vite';
import tailwindcss from '@tailwindcss/vite';
import pkg from './package.json';

export default defineConfig({
	define: {
		__APP_VERSION__: JSON.stringify(pkg.version),
	},
	plugins: [tailwindcss(), sveltekit(), Icons({ compiler: 'svelte' })],
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
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
});
