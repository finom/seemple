import checkObjectType from './_util/checkobjecttype';
import initMK from './_core/init';
import getNodes from './_bindings/getnodes';
import removeListener from './_events/removelistener';
import bindNode from './bindnode';

export default function unbindNode(object, key, node, evt) {
	if(typeof this === 'object' && this.isMK) {
        // when context is Matreshka instance, use this as an object and shift other args
        evt = node;
        node = key;
		key = object;
        object = this;
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'unbindNode');
    }

	if (key instanceof Array) {
        if(typeof key[0] === 'string') {
            /*
             * this.unbindNode(['a', 'b', 'c'], node)
             */

            nofn.forEach(key, itemKey => unbindNode(object, itemKey, node, evt));
        } else {
            /*
             * this.unbindNode([{key, node, binder, event}], { silent: true });
             */
            nofn.forEach(key, ({
                key: itemKey,
                node: itemNode
            }) => {
                unbindNode(object, itemKey, itemNode, node);
            });
        }

        return object;
    }

    /*
     * this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
     */
    if (key && typeof key === 'object') {
        nofn.forOwn(key, (keyObjValue, keyObjKey) => unbindNode(object, keyObjKey, keyObjValue, node));
        return object;
    }

	const { props } = initMK(object);
	const propDef = props[key];

	if(!propDef) {
		return object;
	}

	const { bindings } = propDef;

	if(!bindings) {
		return object;
	}

	// TODO make sure to update $nodes for Matreshka instances

	if(key === null) {
		// TODO remove all bindings

		return object;
	}

	const deepPath = key.split('.');
    //if (evt.deep !== false && deepPath.length > 1) {
		// TODO
	//}

	if(!node) {
		// TODO remove all bindings for given key
	}

	const $nodes = getNodes(object, node);
	const retainBindings = [];

	nofn.forEach($nodes, nodesItem => {
		// TODO move to the top ?
		nofn.forEach(bindings, binding => {
			const {
				on,
				node,
				binder,
				nodeHandler,
				objectHandler,
				options
			} = binding;

			if(node === nodesItem) {
				const { destroy } = binder;

				if(typeof on === 'function') {
					nodeHandler.disabled = true;
				} else {
		            dom.$(node).off(on, nodeHandler);
		        }
				removeListener(object, `_change:bindings:${key}`, objectHandler);

				if(destroy) {
					destroy.call(node, options);
				}

			} else {
				retainBindings.push(binding);
			}
		});
	});

	propDef.bindings = retainBindings;

}
