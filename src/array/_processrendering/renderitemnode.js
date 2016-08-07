import parseBindings from '../../parsebindings';
import bindNode from '../../bindnode';
import triggerOne from '../../trigger/_triggerone';
import initMK from '../../_core/init';
import matreshkaError from '../../_helpers/matreshkaerror';
import getNodes from '../../bindnode/_getnodes';

const htmlTestReg = /</;

export default function renderItemNode({
    selfDef,
    self,
    item,
    eventOptions
}) {
    const { renderer, bindRenderedAsSandbox=true } = item;
    const { itemRenderer } = self;
    let usedRenderer = renderer || itemRenderer;
    const isOwnRenderer = usedRenderer === renderer;
	const rendererContext = isOwnRenderer ? item : self;
    const { id: selfId } = selfDef;
    const { moveSandbox, forceRerender, silent } = eventOptions;

    if(!usedRenderer) {
        return { node: null };
    }

    if (moveSandbox) {
        const { sandboxPropDef } = itemDef.props.sandbox;
        if(sandboxPropDef) {
            const { bindings } = sandboxPropDef
            const node = bindings ? bindings[0].node : null;

            if (node) {
                for(let i = 0, keys = Object.keys(renderedInArrays); i < keys.length; i++) {
                    const key = keys[i];
                    if(node === renderedInArrays[key]) {
                        delete renderedInArrays[key];
                        break;
                    }
                }
                renderedInArrays[id] = node;
            }
        }

        return { node };
    }


    const itemDef = initMK(item);
    const { renderedInArrays={} } = itemDef;
    itemDef.renderedInArrays = renderedInArrays;

    if(typeof usedRenderer === 'function') {
        usedRenderer = usedRenderer.call(rendererContext, item);
    }

    if(typeof usedRenderer === 'string' && !htmlTestReg.test(usedRenderer)) {
        const selector = usedRenderer;
        // selector
        usedRenderer = getNodes(self, selector);

        if(usedRenderer.length) {
            usedRenderer = usedRenderer[0].innerHTML;
        } else {
            throw matreshkaError('array:renderer_node_missing', { selector });
        }
    }

    const parsed = parseBindings(item, usedRenderer, eventOptions);

    if(parsed.length !== 1) {
        throw matreshkaError('array:rendered_number_nodes', { length: parsed.length });
    }

    const node = renderedInArrays[selfId] = parsed[0];

    if (bindRenderedAsSandbox) {
        // TODO: We may want to pass event options to bindNode. Can we pass eventOptions?
		bindNode(item, 'sandbox', node);
	}

    if(!silent) {
		const itemEventOptions = {
			node,
			self: item,
			parentArray: self
		};
        const { onRender } = item;
        const { onItemRender } = self;

		if(onRender){
            onRender.call(item, itemEventOptions);
        }

        if(onItemRender) {
            onItemRender.call(self, item, itemEventOptions);
        }

		triggerOne(item, 'render', itemEventOptions);

        return { node, itemEventOptions };
	}

    return { node };
}
