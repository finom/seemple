// check the first element from given set against a selector
export default function is(s) {
	const node = this[0];
	return node
		? (node.matches
			|| node.webkitMatchesSelector
			|| node.mozMatchesSelector
			|| node.msMatchesSelector
			|| node.oMatchesSelector).call(node, s) : false;
}
