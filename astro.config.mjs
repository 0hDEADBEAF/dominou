// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import remarkCardMentions from './src/plugins/remark-card-mentions.mjs';

const base = '/dominou';

// https://astro.build/config
export default defineConfig({
	site: 'https://0hdeadbeaf.github.io',
	base,
	integrations: [mdx(), sitemap()],
	markdown: {
		remarkPlugins: [[remarkCardMentions, { base }]],
	},
	fonts: [
		{
			// Police d'écriture pour les titres
			provider: fontProviders.local(),
			name: 'Chomsky',
			cssVariable: '--font-titles',
			fallbacks: ['serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/Chomsky.woff2'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
		{
			// Police d'écriture par défaut
			provider: fontProviders.local(),
			name: 'Enchanted Land',
			cssVariable: '--font-text',
			fallbacks: ['serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/EnchantedLand.otf'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
