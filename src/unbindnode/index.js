import checkObjectType from '../_helpers/checkobjecttype';
import defs from '../_core/defs';
import getNodes from '../bindnode/_getnodes';
import removeTreeListener from '../off/_removetreelistener';
import removeBinding from './_removebinding';
import dom from '../_dom';

// unbinds a node
export default function unbindNode(object, key, node, eventOptions) {
    if (typeof this === 'object' && this.isMatreshka) {
        // when context is Matreshka instance, use this as an object and shift other args
        /* eslint-disable no-param-reassign */
        eventOptions = node;
        node = key;
        key = object;
        object = this;
        /* eslint-enable no-param-reassign */
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'unbindNode');
    }

    if (key instanceof Array) {
        if (typeof key[0] === 'string') {
            /*
             * accept array of keys
             * this.unbindNode(['a', 'b', 'c'], node)
             */

            nofn.forEach(key, itemKey => unbindNode(object, itemKey, node, eventOptions));
        } else {
            /*
             * acept array of objects
             * this.unbindNode([{ key, node, binder, event }], { silent: true });
             */
            nofn.forEach(key, ({
                key: itemKey,
                node: itemNode,
                event: itemEventOptions
            }) => {
                const commonEventOptions = node;
                const mergedEventOptions = {};

                if (commonEventOptions) {
                    // extend event object by "global" event
                    nofn.assign(mergedEventOptions, commonEventOptions);
                }

                if (itemEventOptions) {
                    // extend event object by "local" event ("event" key of an object)
                    nofn.assign(mergedEventOptions, itemEventOptions);
                }

                unbindNode(object, itemKey, itemNode, mergedEventOptions);
            });
        }

        return object;
    }


    if (key && typeof key === 'object') {
        nofn.forOwn(key, (keyObjValue, keyObjKey) => {
            if('node' in keyObjValue && keyObjValue.constructor === Object) {
                // this.unbindNode({ key: { node: $(), binder } ) }, { silent: true });
                unbindNode(object, keyObjKey, keyObjValue.node, node);
            } else if(
                keyObjValue.constructor === Array
                && keyObjValue.length
                && keyObjValue[0].constructor === Object
                && 'node' in keyObjValue[0]
            ) {
                // this.unbindNode({ key: [{ node: $(), binder }] ) }, { silent: true });
                nofn.forEach(keyObjValue, keyObjValueItem => {
                    unbindNode(object, keyObjKey, keyObjValueItem.node, node);
                });
            } else {
                // this.unbindNode({ key: $() }, { silent: true });
                unbindNode(object, keyObjKey, keyObjValue, node);
            }
        });
        return object;
    }

    eventOptions = eventOptions || {}; // eslint-disable-line no-param-reassign
    const { deep } = eventOptions;
    const def = defs.get(object);

    if (!def) {
        return object;
    }

    const { props } = def;

    // allow to pass null or undefined as key
    // if passed then remove bindings of all keys for given object
    if (key === null || typeof key === 'undefined') {
        nofn.forOwn(props, (propsItem, propsKey) => {
            unbindNode(object, propsKey, null, eventOptions);
        });

        return object;
    }

    // remove delegated binding
    if (deep !== false) {
        const deepPath = key.split('.');
        const deepPathLength = deepPath.length;

        if (deepPathLength > 1) {
            let target = object;

            for (let i = 0; i < deepPathLength - 1; i++) {
                // TODO: Do we need to throw an error when a target is falsy?
                target = target[deepPath[i]];
            }

            // TODO: Potential bug! This may undelegate listener for all bindings with the same path
            // ...(cannot reproduce)
            removeTreeListener(object, deepPath.slice(0, deepPathLength - 2));

            unbindNode(target, deepPath[deepPathLength - 1], node, eventOptions);

            return object;
        }
    }


    const propDef = props[key];

    // when no propdef do nothing
    if (!propDef) {
        return object;
    }

    const { bindings } = propDef;

    // if the property doesn't have any bindings do nothing
    if (!bindings) {
        return object;
    }

    // if no node is pased remove all bindings for given key
    if (!node) {
        nofn.forEach(bindings, binding => {
            removeBinding({ object, key, eventOptions, binding });
        });

        propDef.bindings = null;

        // update nodes and $nodes for Matreshka instance
        if (object.isMatreshka) {
            delete object.nodes[key];
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
            if (binding.node === nodesItem) {
                removeBinding({ object, key, eventOptions, binding });
            } else {
                retainBindings.push(binding);
                retainNodes.push(nodesItem);
            }
        });
    });

    // update nodes and $nodes for Matreshka instance
    if (object.isMatreshka) {
        if (retainNodes.length) {
            object.nodes[key] = retainNodes[0];
            object.$nodes[key] = dom.$(retainNodes);
        } else {
            delete object.nodes[key];
            delete object.$nodes[key];
        }
    }

    // update bindings object
    if (retainBindings.length) {
        propDef.bindings = retainBindings;
    } else {
        propDef.bindings = null;
    }


    return object;
}
