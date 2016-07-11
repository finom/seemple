export default function is(s) {
	const node = this[0];
	return node
		? (node.matches
			|| node.webkitMatchesSelector
			|| node.mozMatchesSelector
			|| node.msMatchesSelector
			|| node.oMatchesSelector).call(node, s) : false;
};
