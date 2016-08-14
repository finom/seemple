import Init from './_init';
import data from './_data';

// adds unique nodes to mq collection
export default function add(selector) {
    const idMap = {};

    let result;

    const nodes = new Init(selector);

    if (this.length) {
        result = new Init(this);
        for (let i = 0; i < result.length; i++) {
            const node = result[i];
            const nodeID = node.b$ = node.b$ || ++data.nodeIndex;
            idMap[nodeID] = 1;
        }

        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const nodeID = node.b$ = node.b$ || ++data.nodeIndex;
            if (!idMap[nodeID]) {
                idMap[nodeID] = 1;
                result.push(node);
            }
        }
    } else {
        result = nodes;
    }

    return result;
}
