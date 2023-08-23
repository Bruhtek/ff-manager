import { parse } from 'node-html-parser';
import type { ChapterData, IImporter, ImportError, SerieData } from '$lib/importer/main';
import { checkUrlMatches } from '$lib/importer/utils';

const ignoredTags = [
	'Archive Warnings Apply',
	'Creator Chose Not To Use Archive Warnings',
	'No Archive Warnings Apply',
	'Explicit',
	'Mature',
	'Teen And Up Audiences',
	'General Audiences',
	'No Category',
	'No Media',
	'No Fandom',
	'No Relationship',
	'No Characters',
	'No Additional Tags',
	'No Warnings',
	'Gen',
	'Virtual Streamer Animated Characters',
	'Original Male Character(s)',
];

const FETCH_OPTIONS = {
	headers: {
		cookie: 'view_adult=true',
	},
};

const AO3_Importer = {
	name: 'AO3',
	fullname: 'Archive of Our Own',
	iconUrl: 'https://archiveofourown.org/favicon.ico',
	supportedURLs: [
		'https://archiveofourown.org/works/*',
		'https://archiveofourown.org/works/*/chapters/*',
	],

	getDataFromURL: async (url: string): Promise<SerieData | ImportError> => {
		if (!checkUrlMatches(url, AO3_Importer.supportedURLs)) {
			return { error: 'URL not supported' };
		}
		if (url.includes('/chapters/')) {
			url = url.split('/chapters/')[0];
		}
		url = url.endsWith('/') ? url : url + '/';

		const serieData = await AO3_Importer._getSerieData(url);
		const chapterData = await AO3_Importer._getChapterData(url);

		if ('error' in serieData) {
			return serieData;
		}
		if ('error' in chapterData) {
			return chapterData;
		}

		serieData.chapters = chapterData;

		return serieData;
	},

	_getSerieData: async (url: string): Promise<SerieData | ImportError> => {
		try {
			const res = await fetch(url, FETCH_OPTIONS);

			if (!res.ok) {
				return { error: `HTTP error: ${res.status}` };
			}

			const html = await res.text();

			const root = parse(html);
			const title = root.querySelector('.heading.title');
			const authors = root.querySelectorAll('.heading.byline a[rel="author"]');
			const tags = root.querySelectorAll('.tags a.tag');

			if (!title || !authors || !tags) {
				return { error: 'Something went wrong - incorrect page html' };
			}

			let tagList = tags.map((t) => t.text.trim());
			tagList = tagList.filter((t) => !ignoredTags.includes(t));
			// if a tag is CharacterX/CharacterY, we want to split it into two tags, EXCEPT when it's F/F or M/M
			tagList = tagList.flatMap((t) => {
				if (t.includes('/')) {
					const [first, second] = t.split('/');
					if (first === 'F' || first === 'M') {
						return [t];
					} else {
						return [first, second];
					}
				} else {
					return [t];
				}
			});

			// and then remove any duplicates and empty strings
			tagList = [...new Set(tagList)].filter((t) => t !== '');

			return {
				name: title.text,
				authors: authors.map((a) => a.text),
				tags: tagList,
				summary: root.querySelector('.preface .summary .userstuff')?.text.trim(),
				chapters: [],
			};
		} catch (error) {
			return { error: error?.toString() ?? 'Unknown error' };
		}
	},
	_getChapterData: async (url: string): Promise<ChapterData[] | ImportError> => {
		url += 'navigate';

		try {
			const res = await fetch(url, FETCH_OPTIONS);

			if (!res.ok) {
				return { error: `HTTP error: ${res.status}` };
			}

			const html = await res.text();

			const root = parse(html);
			const chapters = root.querySelectorAll('ol.chapter.index.group li');

			if (!chapters) {
				return { error: 'Something went wrong - incorrect page html' };
			}

			const chapterList: ChapterData[] = [];

			for (const c of chapters) {
				const title = c.querySelector('a')?.text.trim();
				const url = c.querySelector('a')?.getAttribute('href')?.trim();

				if (!title || !url) {
					return { error: 'Something went wrong - incorrect page html' };
				}

				const chapterRes = await fetch('https://archiveofourown.org' + url, FETCH_OPTIONS);
				if (!res.ok) {
					return { error: `HTTP error: ${res.status}` };
				}

				const html = await chapterRes.text();

				const content = await AO3_Importer._getChapterContent(html);
				const summary = await AO3_Importer._getChapterSummary(html);

				if (isError(content)) {
					return content;
				}

				chapterList.push({
					name: title,
					url: 'https://archiveofourown.org' + url,
					content,
					summary,
				});
			}

			return chapterList;
		} catch (error) {
			return { error: error?.toString() ?? 'Unknown error' };
		}
	},
	_getChapterContent: async (html: string): Promise<string | ImportError> => {
		const root = parse(html);

		const content = root.querySelector('#chapters .userstuff[role="article"]');

		if (!content) {
			return { error: 'Something went wrong - incorrect page html' };
		}
		return content.innerHTML;
	},
	_getChapterSummary: async (html: string): Promise<string | undefined> => {
		const root = parse(html);

		const content =
			root.querySelector('#chapters #summary .userstuff') ||
			root.querySelector('.preface .summary .userstuff');

		if (!content) {
			return undefined;
		}
		return content.text.trim();
	},

	textTransformers: [
		{
			name: 'Remove <br> tags',
			description: 'Removes <br> tags and replace them with real paragraphs',
			transformer: (text) => text.replace(/<br>/g, '</p><p>'),
		},
		{
			name: 'Remove empty paragraphs',
			description: 'Removes empty paragraphs',
			transformer: (text) => text.replace(/<p>\s*<\/p>/g, ''),
		},
		{
			name: "Remove 'Chapter Text' header",
			description: "Removes the 'Chapter Text' header",
			transformer: (text) =>
				text.replace('<h3 class="landmark heading" id="work">Chapter Text</h3>', ''),
		},
	],
} satisfies IImporter;

const isError = (obj: any): obj is ImportError => {
	return obj.error !== undefined;
};

export default AO3_Importer;
