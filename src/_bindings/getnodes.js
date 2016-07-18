import selectNodes from './selectnodes';
import dom from '../_dom'

export default function getNodes(object, selector) {
	let nodes;
	if(typeof selector == 'string' && !/</.test(selector) && /:sandbox|:bound\(([^(]*)\)/.test(selector)) {
		nodes = selectNodes(object, selector)
	} else{
		nodes = dom.$(selector);
	}
	return nodes;
};
