import initMK from './_core/init';
import defineProp from './_core/defineprop';
import getNodes from './_bindings/getnodes';
import switchBinding from './_bindings/switchbinding';
import bindSingleNode from './_bindings/bindsinglenode';
import checkObjectType from './_util/checkobjecttype';
import MatreshkaError from './_util/matreshkaerror';
import delegateListener from './_events/delegatelistener';
import addListener from './_events/addlistener';
import removeListener from './_events/removelistener';
import triggerOne from './_events/triggerone';
import unbindNode from './unbindnode';


// The main method of the framework: binds a property of an object to HTML node
export default function bindNode(object, key, node, binder, evt) {
    if(typeof this === 'object' && this.isMK) {
        // when context is Matreshka instance, use this as an object and shift other args
        evt = binder;
        binder = node;
        node = key;
        key = object;
        object = this;
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'bindNode');
    }

    evt = evt || {};
    binder = binder || {};
    const { props } = initMK(object);
    const { optional, deep, silent } = evt;

    // throw error when key is not given
    if(!key) {
        throw MatreshkaError('binding:falsy_key');
    }

    if (key instanceof Array) {
        if(typeof key[0] === 'string') {
            /*
             * accept array of keys
             * this.bindNode(['a', 'b', 'c'], node)
             */
            nofn.forEach(key, itemKey => bindNode(object, itemKey, node, binder, evt));
        } else {
            /*
             * accept array of objects
             * this.bindNode([{key, node, binder, event}], { silent: true });
             */
            nofn.forEach(key, ({
                key: itemKey,
                node: itemNode,
                binder: itemBinder,
                event: itemEvent
            }) => {
                const commonEvent = node;
                const mergedEvent = {};


                if(itemEvent) {
                    // extend event object by "local" event ("event" key of an object)
                    nofn.assign(mergedEvent, itemEvent);
                }

                if(commonEvent) {
                    // extend event object by "global" event
                    nofn.assign(mergedEvent, commonEvent);
                }

                bindNode(object, itemKey, itemNode, itemBinder, mergedEvent);
            });
        }

        return object;
    }

    /*
     * accept key-node object
     * this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
     */
    if (typeof key === 'object') {
        nofn.forOwn(key, (keyObjValue, keyObjKey) => bindNode(object, keyObjKey, keyObjValue, node, binder));
        return object;
    }

    const $nodes = getNodes(object, node);

    // check node existence
    if (!$nodes.length) {
        if (optional) {
            return object;
        } else {
            throw MatreshkaError('binding:node_missing', { key, node });
        }
    }

    if (deep !== false) {
        const deepPath = key.split('.');
        const deepPathLength = deepPath.length;

        if (deepPathLength > 1) {
            // handle binding when key arg includes dots (eg "a.b.c.d")
            const changeHandler = (changeEvt = {}) => switchBinding({
                    changeEvt,
                    object,
                    deepPath,
                    $nodes,
                    binder,
                    evt,
                    bindNode
                });

            delegateListener(object, deepPath.slice(0, deepPathLength - 2),
                `_change:tree:${deepPath[deepPathLength - 2]}`, changeHandler);

            changeHandler();

            return object;
        }
    }

    const propDef = defineProp(object, key);

    if (object.isMK) {
        // if object is Matreshka instance then extend "$nodes" and "nodes" objects
        const { $nodes: $allNodes, nodes: allNodes } = object;

        if(!$allNodes || !allNodes) {
            throw MatreshkaError('binding:instance_nodes_missing', {
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
    nofn.forEach($nodes, (node) => bindSingleNode(object, {
        $nodes,
        node,
        key,
        evt,
        binder,
        propDef
    }));

    return object;
}
