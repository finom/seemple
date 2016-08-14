import parseBindings from '../../parsebindings';
import bindNode from '../../bindnode';
import unbindNode from '../../unbindnode';
import triggerOne from '../../trigger/_triggerone';
import initMK from '../../_core/init';
import matreshkaError from '../../_helpers/matreshkaerror';
import getNodes from '../../bindnode/_getnodes';

const htmlTestReg = /</;

// the function makes the main rendering job
// it renders given array item
export default function renderItemNode({
    selfDef, // selfDef is passed as little optimization
    self,
    item,
    eventOptions
}) {
    const { renderer, bindRenderedAsSandbox=true } = item;
    const { itemRenderer } = self;
    let usedRenderer = renderer || itemRenderer;
    const rendererContext = usedRenderer === renderer ? item : self;
    const { id: selfId } = selfDef;
    const {
        moveSandbox,
        forceRerender,
        silent
    } = eventOptions;

    // if renderer is not found return null as a node
    if (!usedRenderer) {
        return { node: null };
    }

    // if moveSandbox option is truthy then return a sandbox of an item
    if (moveSandbox) {
        const { sandboxPropDef } = itemDef.props.sandbox;
        if (sandboxPropDef) {
            const { bindings } = sandboxPropDef
            const node = bindings ? bindings[0].node : null;

            if (node) {
                for (let i = 0, keys = Object.keys(renderedInArrays); i < keys.length; i++) {
                    const key = keys[i];

                    if (node === renderedInArrays[key]) {
                        // delete an information about previous array
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

    // if usedRenderer is function then call it
    if (typeof usedRenderer === 'function') {
        usedRenderer = usedRenderer.call(rendererContext, item);
    }


    // is usedRenderer is string but not HTML then this is definitely a selector
    if (typeof usedRenderer === 'string' && !htmlTestReg.test(usedRenderer)) {
        const selector = usedRenderer;

        usedRenderer = getNodes(self, selector);

        if (usedRenderer.length) {
            // if a node is found by given selector then use its HTML
            usedRenderer = usedRenderer[0].innerHTML;
        } else {
            // if not throw an error
            throw matreshkaError('array:renderer_node_missing', { selector });
        }
    }

    // pass a node or HTML
    const parsed = parseBindings(item, usedRenderer.trim(), eventOptions);

    // if parseBindings returned more/less than one node then throw an error
    if (parsed.length !== 1) {
        throw matreshkaError('array:rendered_number_nodes', { length: parsed.length });
    }

    const node = renderedInArrays[selfId] = parsed[0];

    if (bindRenderedAsSandbox) {
        if (forceRerender) {
            unbindNode(item, 'sandbox', null, null, eventOptions);
        }

        bindNode(item, 'sandbox', node, null, eventOptions);
    }

    // if silent is not truthy then fire 'render' event and virtual methods
    if (!silent) {
        const itemEventOptions = {
            node,
            self: item,
            parentArray: self
        };
        const { onRender } = item;
        const { onItemRender } = self;

        if (onRender){
            onRender.call(item, itemEventOptions);
        }

        if (onItemRender) {
            onItemRender.call(self, item, itemEventOptions);
        }

        triggerOne(item, 'render', itemEventOptions);

        return { node, itemEventOptions };
    }

    return { node };
}
