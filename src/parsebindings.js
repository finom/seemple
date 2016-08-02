//import parserBrackets from './_bindings/parserbrackets';

//
export default function parseBindings(object, givenNodes) {
    if(typeof this === 'object' && this.isMK) {
        // when context is Matreshka instance, use this as an object and shift other args
        nodes = object;
        object = this;
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'parseBindings');
    }

    if(typeof givenNodes === 'string') {
        if(~givenNodes.indexOf('<')) {
            // this is HTML
            nodes = parseHTML(nodes);
        } else {
            // this is selector
            nodes = getNodes(object, givenNodes)
        }
    } else if(typeof givenNodes === 'object') {
        // TODO:
        nodes = $(givenNodes);
    }

    for(let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const { outerHTML } = node;

        if(typeof outerHTML === 'string') {
            // check eisting of encodeURI for old firefox
            if(!~outerHTML.indexOf(leftBracket) && !~outerHTML.indexOf(encodeURI(leftBracket))) {
				continue;
			}
        }

        const descendants = node.querySelectorAll('*');
        // all[xxx]
    }

    function getKey(matched) {
        const keys = matched.map(function(item) {
			return item.replace(bindingsReg, '$1');
		});
    }

    nofn.forEach(all, node => {
        const { attributes } = node;
    });

    // HTML doesn't include things needed to parse
    /*if(!~givenNodes.indexOf(leftBracket)) {
        return nodes;
    }*/
}
