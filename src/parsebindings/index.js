import checkObjectType from '../_helpers/checkobjecttype';
import dom from '../_dom';
import calc from '../calc';
import parserData from './_parserdata';
import processTextNode from './_processtextnode';
import processAttribute from './_processattribute';

// makes parsig of given node (node, $(nodes), selector, HTML) and initializes binding for things like {{foo}}
export default function parseBindings(object, givenNodes, eventOptions) {
    if(typeof this === 'object' && this.isMK) {
        // when context is Matreshka instance, use this as an object and shift other args
        eventOptions = nodes;
        nodes = object;
        object = this;
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'parseBindings');
    }

    const extendedEventOptions = {
        // useExactBinder is little optimization
        // without this option used binder is extended by default binder
        useExactBinder: true,
        fromParser: true
    };

    if(typeof eventOptions === 'object') {
        nofn.assign(extendedEventOptions, eventOptions)
    }

    let nodes;
    const allNodes = [];

    // extract all needed data from parserData
    // check out what is parserData in its file
    const {
        leftBracket,
        rightBracket,
        escLeftBracket,
        escRightBracket,
        bindingReg,
        strictBindingReg
    } = parserData;

    // TODO: Test all variations of parseBindings
    if(typeof givenNodes === 'string') {
        if(~givenNodes.indexOf('<')) {
            // this is HTML
            nodes = parseHTML(nodes);
        } else {
            // this is selector
            nodes = getNodes(object, givenNodes)
        }
    } else if(typeof givenNodes === 'object') {
        nodes = dom.$(givenNodes);
    }

    // to make possible to not use recursion we're collecting all nodes to allNodes array
    nofn.forEach(nodes, node => allNodes.push(node));

    // on every cycle of array we're adding new descendants to allNodes
    for(let i = 0; i < allNodes.length; i++) {
        const node = allNodes[i];
        const { outerHTML, innerHTML, childNodes, attributes } = node;

        // if outerHTML does't contain left bracket, then this node doesn't need to be parsed
        // we may need to check outerHTML existence for older browsers
        // we may need to add !~outerHTML.indexOf(encodeURI(leftBracket) to support old FF
        if(!~outerHTML.indexOf(leftBracket)) {
			continue;
		}


        // initialize bindings for attributes if they appear
        if(attributes.length) {
            nofn.forEach(attributes, attribute => {
                if(bindingReg.test(attribute.value)) {
                    processAttribute({
                        node,
                        attribute,
                        object,
                        eventOptions: extendedEventOptions
                    });
                }
            });
        }

        // if innerHTML does't contain left bracket, then children of this node don't need to be parsed
        // we may need to add !~innerHTML.indexOf(encodeURI(leftBracket) to support old FF
        if(!~innerHTML.indexOf(leftBracket)) {
            continue;
        }

        for(let j = 0; j < childNodes.length; j++) {
            const childNode = childNodes[j];
            const { nodeType, textContent } = childNode;
            const ELEMENT_NODE = 1;
            const TEXT_NODE = 3;

            if(nodeType === ELEMENT_NODE) {
                // if childNode is HTML element then add it to the end of allNodes array
                // to check everything on next outer cycle iterations
                allNodes.push(childNode);
            } else if(nodeType === TEXT_NODE) {
                // if childNode is text node which contains things like {{this}}
                // then initialize bindings for this node
                if(bindingReg.test(textContent)) {
                    processTextNode({
                        object,
                        node: childNode,
                        eventOptions: extendedEventOptions
                    });
                }
            }
        }
    }
}
