export default function parseHTML(html) {
	var node = document.createElement('div'),
		// wrapMap is taken from jQuery
		wrapMap = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			area: [1, "<map>", "</map>"],
			_: [0, "", ""]
		},
		wrapper,
		i,
		ex;

	html = html.replace(/^\s+|\s+$/g, '');

	wrapMap.optgroup = wrapMap.option;
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	ex = /<([\w:]+)/.exec(html);

	wrapper = ex && wrapMap[ex[1]] || wrapMap._;

	node.innerHTML = wrapper[1] + html + wrapper[2];

	i = wrapper[0];

	while (i--) {
		node = node.children[0];
	}

	return node.childNodes;
};
