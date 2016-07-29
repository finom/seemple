import initMK from '../_core/init';
import defineProp from '../_core/defineprop';
import getNodes from './_getnodes';
import createBindingSwitcher from './_createbindingswitcher';
import bindSingleNode from './_bindsinglenode';
import checkObjectType from '../_util/checkobjecttype';
import MatreshkaError from '../_util/matreshkaerror';
import delegateListener from '../on/_delegatelistener';
import addListener from '../on/_addlistener';
import removeListener from '../off/_removelistener';
import triggerOne from '../trigger/_triggerone';
import unbindNode from '../unbindnode';
import addTreeListener from '../on/_addtreelistener';

// the main method of the framework: binds a property of an object to HTML node
export default function bindNode(object, key, node, binder, eventOptions) {
    if(typeof this === 'object' && this.isMK) {
        // when context is Matreshka instance, use this as an object and shift other args
        eventOptions = binder;
        binder = node;
        node = key;
        key = object;
        object = this;
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'bindNode');
    }

    eventOptions = eventOptions || {};
    binder = binder || {};
    const { props } = initMK(object);
    const {
        optional=bindNode.temporaryOptionalFlag,
        deep=true,
        silent=false
    } = eventOptions;

    delete bindNode.temporaryOptionalFlag;

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

                if(commonEventOptions) {
                    // extend event object by "global" event
                    nofn.assign(mergedEventOptions, commonEventOptions);
                }

                if(itemEventOptions) {
                    // extend event object by "local" event ("event" key of an object)
                    nofn.assign(mergedEventOptions, itemEventOptions);
                }

                bindNode(object, itemKey, itemNode, itemBinder, mergedEventOptions);
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
            const bindingSwitcher = createBindingSwitcher({
                object,
                deepPath,
                $nodes,
                binder,
                eventOptions,
                bindNode
            });

            //console.log('azazalo', deepPath.slice(0, deepPathLength - 1));
            addTreeListener(object, deepPath.slice(0, deepPathLength - 1), bindingSwitcher);

            bindingSwitcher();

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
        eventOptions,
        binder,
        propDef
    }));

    return object;
}
