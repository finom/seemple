import initMK from '../_core/init';
import bindNode from '../bindnode';
import matreshkaError from '../_helpers/matreshkaerror';

function renderItemNode({
    selfDef,
    itemDef,
    self,
    item,
    eventOptions
}) {
    const { renderer } = item;
    const { itemRenderer } = self;
    const { renderedInArrays={} } = itemDef;
    const { id: selfId } = selfDef;
    const { moveSandbox } = eventOptions;

    if(selfId in renderedInArrays) {
        // TODO: throw matreshkaError('array:add_render_twice');
    }

    if (moveSandbox) {
        // HOW TO HANDLE FEW SANDBOXES?
        const node = itemDef.props.sandbox.bindings[0];
		if (node = MK.bound(item, ['sandbox'])) {
			arraysNodes[id] = node;
		}

		return node;
	}
}

function renderOneItem({
    self,
    item,
    eventOptions
}) {
    const {
        dontRender,
        silent
    } = eventOptions;
    const {
        renderIfPossible,
        bindRenderedAsSandbox=true
    } = this;

    if (!item || typeof item !== 'object' || !renderIfPossible || dontRender) {
        return { node: null };
    }

    const itemDef = initMK(item);
    const node = renderItemNode({
        itemDef,
        selfDef,
        self,
        item,
        eventOptions
    });

    if (!node) {
        return { node: null };
    }

    if (bindRenderedAsSandbox) {
        // TODO: We may want to pass event options to bindNode. Can we pass eventOptions?
		bindNode(item, 'sandbox', node);
	}

    if(!evt.silent) {
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

export default function processRendering(self, eventOptions) {
    const {
        added,
        removed,
        method,
        silent
    } = eventOptions;
    const container = this.nodes.container || this.nodes.sandbox;
    const selfDef = defs.get(self);

    if(!container) {
        return this;
    }

    switch(method) {
        case 'push':
        nofn.forEach(added, item => {
            const { node, itemEventOptions } = renderOneItem({
                selfDef,
                self: this,
                item,
                eventOptions
            });
            if(node) {
                container.appendChild(node);
                if(!silent) {
                    triggerOne(item, 'afterrender', itemEventOptions);
                }
            }
        });
    }
}
