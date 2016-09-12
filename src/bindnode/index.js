import initMK from '../_core/init';
import defineProp from '../_core/defineprop';
import getNodes from './_getnodes';
import createBindingSwitcher from './_createbindingswitcher';
import bindSingleNode from './_bindsinglenode';
import checkObjectType from '../_helpers/checkobjecttype';
import matreshkaError from '../_helpers/matreshkaerror';
import addTreeListener from '../on/_addtreelistener';

// initializes binsing between a property of an object to HTML node
export default function bindNode(object, key, node, binder, eventOptions) {
    if (typeof this === 'object' && this.isMatreshka) {
        // when context is Matreshka instance, use this as an object and shift other args
        /* eslint-disable no-param-reassign */
        eventOptions = binder;
        binder = node;
        node = key;
        key = object;
        object = this;
        /* eslint-enable no-param-reassign */
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'bindNode');
    }

    eventOptions = eventOptions || {}; // eslint-disable-line no-param-reassign
    binder = binder || {}; // eslint-disable-line no-param-reassign

    initMK(object);

    const { temporaryOptionalFlag } = bindNode;

    delete bindNode.temporaryOptionalFlag;

    // throw an error when key is falsy
    if (!key) {
        throw matreshkaError('binding:falsy_key');
    }

    if (key instanceof Array) {
        if (typeof key[0] === 'string') {
            /*
             * accept array of keys
             * this.bindNode(['a', 'b', 'c'], node)
             */
            if (temporaryOptionalFlag) {
                // eslint-disable-next-line no-param-reassign
                eventOptions = { ...eventOptions, optional: true };
            }

            nofn.forEach(key, itemKey => bindNode(object, itemKey, node, binder, eventOptions));
        } else {
            /*
             * accept array of objects
             * this.bindNode([{key, node, binder, event}], { silent: true });
             */
            nofn.forEach(key, ({
                key: itemKey,
                node: itemNode,
                binder: itemBinder,
                event: itemEventOptions
            }) => {
                const commonEventOptions = node;
                const mergedEventOptions = {};

                if (temporaryOptionalFlag) {
                    mergedEventOptions.optional = true;
                }

                if (commonEventOptions) {
                    // extend event object by "global" event
                    nofn.assign(mergedEventOptions, commonEventOptions);
                }

                if (itemEventOptions) {
                    // extend event object by "local" event ("event" key of an object)
                    nofn.assign(mergedEventOptions, itemEventOptions);
                }

                bindNode(object, itemKey, itemNode, itemBinder, mergedEventOptions);
            });
        }

        return object;
    }


    if (typeof key === 'object') {
        nofn.forOwn(key, (keyObjValue, keyObjKey) => {
            // binder means eventOptions
            if (temporaryOptionalFlag) {
                // eslint-disable-next-line no-param-reassign
                eventOptions = binder ? { ...binder, optional: true } : { optional: true };
            } else {
                eventOptions = binder; // eslint-disable-line no-param-reassign
            }

            if (
                keyObjValue
                && keyObjValue.constructor === Object
                && 'node' in keyObjValue
            ) {
                // this.bindNode({ key: { node: $(), binder } ) }, { on: 'evt' }, { silent: true });
                bindNode(object, keyObjKey, keyObjValue.node,
                    keyObjValue.binder || node, eventOptions);
            } else if (
                keyObjValue
                && keyObjValue.constructor === Array
                && keyObjValue.length
                && keyObjValue[0].constructor === Object
                && 'node' in keyObjValue[0]
            ) {
                // this.bindNode({ key: [{
                //   node: $(),
                //   binder
                // }] ) }, { on: 'evt' }, { silent: true });
                nofn.forEach(keyObjValue, keyObjValueItem => {
                    bindNode(object, keyObjKey, keyObjValueItem.node,
                            keyObjValueItem.binder || node, eventOptions);
                });
            } else {
                // this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
                bindNode(object, keyObjKey, keyObjValue, node, eventOptions);
            }
        });

        return object;
    }

    const {
        optional = temporaryOptionalFlag || false, // check out bindOptionalNode
        exactKey = false
    } = eventOptions;
    const $nodes = getNodes(object, node);

    // check node existence
    if (!$nodes.length) {
        if (optional) {
            return object;
        }

        throw matreshkaError('binding:node_missing', { key, node });
    }

    if (!exactKey) {
        const deepPath = key.split('.');
        const deepPathLength = deepPath.length;

        if (deepPathLength > 1) {
            // handle binding when key arg includes dots (eg "a.b.c.d")
            const bindingSwitcher = createBindingSwitcher({
                object,
                deepPath,
                $nodes,
                binder,
                eventOptions,
                bindNode
            });

            addTreeListener(object, deepPath.slice(0, deepPathLength - 1), bindingSwitcher);

            bindingSwitcher();

            return object;
        }
    }

    const propDef = defineProp(object, key);

    if (object.isMatreshka) {
        // if an object is Matreshka instance then extend "$nodes" and "nodes" objects
        const { $nodes: $allNodes, nodes: allNodes } = object;

        if (!$allNodes || !allNodes) {
            throw matreshkaError('binding:instance_nodes_missing', {
                $nodes: $allNodes,
                nodes: allNodes
            });
        }

        $allNodes[key] = $allNodes[key] && $allNodes[key].length
            ? $allNodes[key].add($nodes)
            : $nodes;

        allNodes[key] = $allNodes[key][0];
    }

    // handle binding for every node separately
    nofn.forEach($nodes, (oneNode) => bindSingleNode(object, {
        $nodes,
        node: oneNode,
        key,
        eventOptions,
        binder,
        propDef
    }));

    return object;
}
