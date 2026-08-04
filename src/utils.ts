/** Prefix an absolute site path with the configured base path (GitHub Pages project site). */
export function withBase(path: string): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** URL-safe slug for a tag: « Stratégie » → "strategie". */
export function tagSlug(tag: string): string {
	return tag
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}
