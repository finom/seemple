import Init from './_init';
import data from './_data';

export default function add(s) {
    var result = new Init(this),
        map = {},
        nodeID,
        node,
        i;

    s = new Init(s);

    for (i = 0; i < result.length; i++) {
        node = result[i];
        nodeID = node.b$ = node.b$ || ++data.nodeIndex;
        map[nodeID] = 1;
    }

    for (i = 0; i < s.length; i++) {
        node = s[i];
        nodeID = node.b$ = node.b$ || ++data.nodeIndex;
        if (!map[nodeID]) {
            map[nodeID] = 1;
            result.push(node);
        }
    }

    return result;
};
