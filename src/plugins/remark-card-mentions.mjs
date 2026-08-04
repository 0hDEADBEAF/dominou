import { readFileSync } from 'node:fs';

/**
 * Remark plugin turning `[[Nom de carte]]` and `[[Nom de carte|texte affiché]]`
 * into links to the card's gallery page, tagged for the hover-preview script.
 * An unknown card name fails the build so typos are caught early.
 */

const cards = JSON.parse(
	readFileSync(new URL('../data/cards.json', import.meta.url), 'utf8'),
);

const MENTION = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

// Accents and case are ignored when matching, so [[jardins]] finds « Jardins ».
function normalize(name) {
	return name
		.trim()
		.toLowerCase()
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '');
}

const bySlug = new Map();
for (const card of cards) {
	bySlug.set(normalize(card.slug), card);
	bySlug.set(normalize(card.nameFr), card);
	bySlug.set(normalize(card.nameEn), card);
}

export default function remarkCardMentions({ base = '' } = {}) {
	const prefix = base.replace(/\/$/, '');

	return function transform(tree, file) {
		walk(tree, file);
	};

	function walk(node, file) {
		if (!node.children) return;
		// Never rewrite text inside existing links or code.
		if (node.type === 'link' || node.type === 'linkReference') return;

		const next = [];
		for (const child of node.children) {
			if (child.type === 'text' && MENTION.test(child.value)) {
				MENTION.lastIndex = 0;
				next.push(...replaceMentions(child.value, file));
			} else {
				walk(child, file);
				next.push(child);
			}
		}
		node.children = next;
	}

	function replaceMentions(value, file) {
		const nodes = [];
		let last = 0;
		for (const match of value.matchAll(MENTION)) {
			const [full, name, label] = match;
			const card = bySlug.get(normalize(name));
			if (!card) {
				throw new Error(
					`Carte inconnue « ${name} » dans ${file?.path ?? 'un article'}. ` +
						`Vérifiez l'orthographe ou ajoutez la carte à src/data/cards.json.`,
				);
			}
			if (match.index > last) {
				nodes.push({ type: 'text', value: value.slice(last, match.index) });
			}
			nodes.push({
				type: 'link',
				url: `${prefix}/cartes/${card.slug}/`,
				title: card.nameFr,
				children: [{ type: 'text', value: (label ?? name).trim() }],
				data: {
					hProperties: {
						className: ['card-mention'],
						'data-card': card.slug,
					},
				},
			});
			last = match.index + full.length;
		}
		if (last < value.length) {
			nodes.push({ type: 'text', value: value.slice(last) });
		}
		return nodes;
	}
}
