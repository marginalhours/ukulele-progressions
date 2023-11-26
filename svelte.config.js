import staticAdapter from '@sveltejs/adapter-static';
import autoAdapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: process.env.NODE_ENV === 'production' ? staticAdapter() : autoAdapter(),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/ukulele-progressions' : ''
		}
	}
};

export default config;
