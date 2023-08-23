import AO3_Importer from '$lib/importer/ao3';

export interface IImporter {
	name: string;
	fullname: string;
	supportedURLs: string[];
	iconUrl: string;
	getDataFromURL(url: string): Promise<SerieData | { error: string }>;
	textTransformers: TextTransformer[];
	[key: string]: any;
}
export type IImporterClient = Omit<IImporter, 'getHTMLByURL' | 'getSerieDataFromHTML'>;

export type TextTransformer = {
	name: string;
	description: string;
	transformer: (text: string) => string;
};
export type HTMLContentResult = { html: string } | { error: string };
export type SerieData = {
	name: string;
	authors: string[];
	summary?: string;
	tags: string[];
	chapters: ChapterData[];
};
export type ChapterData = {
	name: string;
	content: string;
	summary?: string;
	url?: string;
};
export type ImportError = { error: string };

export const importers: IImporter[] = [AO3_Importer];
// we don't want to send the getContentByURL function to the client, since it's server-side only
export const pageImporterData: IImporterClient[] = importers.map((i) => ({
	name: i.name,
	fullname: i.fullname,
	iconUrl: i.iconUrl,
	supportedURLs: i.supportedURLs,
	textTransformers: i.textTransformers,
}));
