import selectNodes from './_selectnodes';
import dom from '../_dom';

const htmlReg = /</;
const customSelectorReg = /:sandbox|:bound\(([^(]*)\)/;

// the function works just like DOM library accepting any kind of arg
// (HTML string, Node, NodeList etc) bu allows to pass custom selector
// eg :bound(KEY) and :sandbox
export default function getNodes(object, selector) {
    let nodes;

    if (
        typeof selector === 'string'
        && !htmlReg.test(selector)
        && customSelectorReg.test(selector)
    ) {
        nodes = selectNodes(object, selector);
    } else {
        nodes = dom.$(selector);
    }

    return nodes;
}
