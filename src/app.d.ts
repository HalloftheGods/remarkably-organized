/// <reference types="vite-plugin-pwa/info" />
import 'unplugin-icons/types/svelte';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	const __APP_VERSION__: string;
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
				YOUR_KV_NAMESPACE: any;
			};
			context: {
				waitUntil(promise: Promise<any>): void;
			};
			caches: CacheStorage & { default: Cache };
		}
	}
}

export {};
