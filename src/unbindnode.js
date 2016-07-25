import checkObjectType from './_util/checkobjecttype';
import initMK from './_core/init';
import getNodes from './_bindings/getnodes';
import bindNode from './bindnode';
import undelegateListener from './_events/undelegatelistener';
import removeBinding from './_bindings/removebinding';
import dom from './_dom';

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
			 * accept array of keys
             * this.unbindNode(['a', 'b', 'c'], node)
             */

            nofn.forEach(key, itemKey => unbindNode(object, itemKey, node, evt));
        } else {
            /*
			 * acept array of objects
             * this.unbindNode([{ key, node, binder, event }], { silent: true });
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
	 * accept key-node object
     * this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
     */
    if (key && typeof key === 'object') {
        nofn.forOwn(key, (keyObjValue, keyObjKey) => unbindNode(object, keyObjKey, keyObjValue, node));
        return object;
    }


	evt = evt || {};
	const { deep } = evt || {};
	const { props } = initMK(object);

	// allow to pass null or undefined as key
	// if passed then remove bindings of all keys for given object
	if(key === null || typeof key === 'undefined') {
		nofn.forOwn(props, (propsItem, key) => {
			unbindNode(object, key, null, evt);
		});

		return object;
	}

	// remove delegated binding
	if(deep !== false) {
		const deepPath = key.split('.');
		const deepPathLength = deepPath.length;

		if (deepPathLength > 1) {
			let target = object;

			for (let i = 0; i < deepPathLength - 1; i++) {
				// TODO do we need to throw error when target is falsy?
				target = target[deepPath[i]];
			}

			// TODO BUG this may undelegate listener for all bindings with the same path (cannot reproduce)
			undelegateListener(object, deepPath.slice(0, deepPathLength - 2),
				`_change:tree:${deepPath[deepPathLength - 2]}`);

			unbindNode(target, deepPath[deepPathLength - 1], node, evt);

			return object;
		}
	}

	const propDef = props[key];

	// when no propdef do nothing
	if(!propDef) {
		return object;
	}

	const { bindings } = propDef;

	// if the property doesn't have any bindings do nothing
	if(!bindings) {
		return object;
	}

	// if no node is pased remove all bindings for given key
	if(!node) {
		nofn.forEach(bindings, binding => {
			removeBinding({ object, key, evt }, binding);
		});

		// update nodes and $nodes for Matreshka instance
		if (object.isMK) {
	        delete object.nodes[key]
			delete object.$nodes[key];
	    }

		return object;
	}

	const $nodes = getNodes(object, node);
	const retainBindings = [];
	const retainNodes = [];

	// iterate over all bindngs and compare their node with given nodes
	nofn.forEach($nodes, nodesItem => {
		nofn.forEach(bindings, binding => {
			if(binding.node === nodesItem) {
				removeBinding({ object, key, evt }, binding);
			} else {
				retainBindings.push(binding);
				retainNodes.push(nodesItem);
			}
		});
	});

	// update nodes and $nodes for Matreshka instance
	if (object.isMK) {
		if(retainNodes.length) {
			object.nodes[key] = retainNodes[0];
			object.$nodes[key] = dom.$(retainNodes);
		} else {
			delete object.nodes[key]
			delete object.$nodes[key];
		}
	}

	// update bindings object
	if(retainBindings.length) {
		propDef.bindings = retainBindings;
	} else {
		propDef.bindings = null;
	}


	return object;
}
