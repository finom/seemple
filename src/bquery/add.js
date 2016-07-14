import Init from './_init';
import data from './_data';

// adds unique nodes to bQuery collection
export default function add(selector) {
	const idMap = {};

	let result,
		nodeID,
		node,
		i;

	selector = new Init(selector);

	if (this.length) {
		result = new Init(this);
		for (i = 0; i < result.length; i++) {
			node = result[i];
			nodeID = node.b$ = node.b$ || ++data.nodeIndex;
			idMap[nodeID] = 1;
		}

		for (i = 0; i < selector.length; i++) {
			node = selector[i];
			nodeID = node.b$ = node.b$ || ++data.nodeIndex;
			if (!idMap[nodeID]) {
				idMap[nodeID] = 1;
				result.push(node);
			}
		}
	} else {
		result = selector;
	}

	return result;
}
