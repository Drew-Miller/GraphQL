import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	resolve: {
		alias: {
				$: resolve('src/'),
				$apollo: resolve('src/apollo/'),
				$lib: resolve('src/lib/'),
				$stores: resolve('src/stores/'),
		},
}
});
