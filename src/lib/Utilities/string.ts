export const toProperCase = (str: string) => {
	// this regex replaces camelCase with Camel Case
	return str.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\w\S*/g, (txt) => {
		return txt.charAt(0).toUpperCase() + txt.substring(1, txt.length).toLowerCase();
	});
};
