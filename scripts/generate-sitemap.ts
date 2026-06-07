import fs from 'fs';
import path from 'path';
import LZString from 'lz-string';
import { PRESETS } from '../src/lib/data/presets/index';

const BASE_URL = 'https://planner.mycompassconsulting.com';

const STATIC_ROUTES = [
	'/',
	'/planner',
	'/presets',
	'/presets/essentials',
	'/presets/work',
	'/presets/academic',
	'/presets/lifestyle',
	'/presets/wellness',
	'/presets/hobbies',
	'/privacy',
	'/terms',
];

function generateSitemap() {
	let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
	xmlContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

	// Static routes
	for (const route of STATIC_ROUTES) {
		const isHome = route === '/';
		const isMajor = route === '/planner' || route === '/presets';
		const priority = isHome ? '1.0' : isMajor ? '0.9' : '0.5';
		const changefreq = route === '/planner' ? 'weekly' : 'monthly';

		xmlContent += '  <url>\n';
		xmlContent += `    <loc>${BASE_URL}${route}</loc>\n`;
		xmlContent += `    <changefreq>${changefreq}</changefreq>\n`;
		xmlContent += `    <priority>${priority}</priority>\n`;
		xmlContent += '  </url>\n';
	}

	// Preset dynamic URLs
	for (const preset of PRESETS) {
		const fullPresetUrl = `${BASE_URL}/planner?preset=${preset.id}&print=1`;

		xmlContent += '  <url>\n';
		xmlContent += `    <loc>${fullPresetUrl}</loc>\n`;
		xmlContent += '    <changefreq>monthly</changefreq>\n';
		xmlContent += '    <priority>0.8</priority>\n';
		xmlContent += '  </url>\n';
	}

	xmlContent += '</urlset>\n';

	const outputFilePath = path.resolve('static/sitemap.xml');
	fs.writeFileSync(outputFilePath, xmlContent, 'utf8');
	console.log(
		`Successfully generated sitemap with ${STATIC_ROUTES.length + PRESETS.length} URLs.`,
	);
}

generateSitemap();
