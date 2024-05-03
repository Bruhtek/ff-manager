const walkTheDOM = (el: Element, callback: (el: Element) => void, depth: number = 0) => {
	callback(el);
	el = el.firstElementChild!;
	while (el) {
		walkTheDOM(el, callback, depth + 1);
		el = el.nextElementSibling!;
	}
};

export const removeAttributes = (html: string, document: Document) => {
	if (!document || !document.createElement) return html;

	const wrapper = document.createElement('div');
	wrapper.innerHTML = html;
	walkTheDOM(wrapper, (el) => {
		if (el.removeAttribute) {
			el.removeAttribute('class');
			el.removeAttribute('style');
			el.removeAttribute('id');
		}
	});
	return wrapper.innerHTML;
};
