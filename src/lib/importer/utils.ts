export const checkUrlMatches = (url: string, supportedURLs: string[]) => {
	return supportedURLs.some((supportedURL) => {
		const regex = new RegExp(supportedURL.replace(/\*/g, '.*'));
		return regex.test(url);
	});
};
