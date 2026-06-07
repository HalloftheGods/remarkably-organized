import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import Icons from 'unplugin-icons/vite';
import tailwindcss from '@tailwindcss/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import pkg from './package.json';

export default defineConfig({
	define: {
		__APP_VERSION__: JSON.stringify(pkg.version),
	},
	plugins: [
		tailwindcss(),
		sveltekit(),
		Icons({ compiler: 'svelte' }),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			workbox: {
				globPatterns: ['**/*.{js,css,html,png,jpg,svg,webmanifest}'],
				globIgnores: ['**/prerendered/**'],
			},
			manifest: {
				name: 'Remarkably Organized Planner Wizard',
				short_name: 'Wizard',
				description: 'Personal organization and planner generator for e-ink tablets.',
				theme_color: '#000000',
				background_color: '#000000',
				display: 'standalone',
				icons: [
					{
						src: '/web-app-manifest-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'maskable',
					},
					{
						src: '/web-app-manifest-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable',
					},
				],
			},
		}),
	],
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
