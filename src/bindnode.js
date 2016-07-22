// TODO Debounced!
import initMK from './_core/init';
import defineProp from './_core/defineprop';
import getNodes from './_bindings/getnodes';
import MatreshkaError from './_util/matreshkaerror';
import bindSingleNode from './_bindings/bindsinglenode';
import checkObjectType from './_util/checkobjecttype';
import unbindNode from './unbindnode'
import delegateListener from './_events/delegatelistener';

export default function bindNode(object, key, node, binder = {}, evt = {}) {
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

    const { props } = initMK(object);
    const { optional, deep } = evt;

    if(!key) {
        throw MatreshkaError('binding:falsy_key');
    }


    if (key instanceof Array) {
        if(typeof key[0] === 'string') {
            /*
             * this.bindNode(['a', 'b', 'c'], node)
             */
            nofn.forEach(key, itemKey => bindNode(object, itemKey, node, binder, evt));
        } else {
            /*
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
                    nofn.assign(mergedEvent, itemEvent);
                }

                if(commonEvent) {
                    nofn.assign(mergedEvent, commonEvent);
                }

                bindNode(object, itemKey, itemNode, itemBinder, mergedEvent);
            });
        }

        return object;
    }

    /*
     * this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
     */
    if (typeof key === 'object') {
        nofn.forOwn(key, (keyObjValue, keyObjKey) => bindNode(object, keyObjKey, keyObjValue, node, binder));
        return object;
    }

    const $nodes = getNodes(object, node);

    if (!$nodes.length) {
        if (optional) {
            return object;
        } else {
            throw MatreshkaError('binding:node_missing', { key, node });
        }
    }

    const propDef = defineProp(object, key);

    if (object.isMK) {
        object.$nodes[key] = object.$nodes[key].length
            ? object.$nodes[key].add($nodes)
            : $nodes;
        object.nodes[key] = object.$nodes[key][0];
    }

    const deepPath = key.split('.');
    if (deep !== false && deepPath.length > 1) {
        const changeHandler = (evt = {}) => {
            let target = evt.value;

            if (!target) {
                target = object;
                for (let i = 0; i < deepPath.length - 1; i++) {
                    target = target[deepPath[i]];
                }
            }

            bindNode(target, deepPath[deepPath.length - 1], $nodes, binder, evt);

            if (evt.previousValue) {
                unbindNode(evt.previousValue, path[deepPath.length - 1], $nodes);
            }
        };

        delegateListener(object, deepPath.slice(0, deepPath.length - 2).join('.'),
            'change:' + deepPath[deepPath.length - 2], changeHandler);

        changeHandler();

        return object;
        /*path = key.split('.');
			changeHandler = function(evt) {
				evt = evt && evt.originalEvent;

				var target = evt && evt.value,
					i;
				if (!target) {
					target = object;
					for (i = 0; i < path.length - 1; i++) {
						target = target[path[i]];
					}
				}

				bindNode(target, path[path.length - 1], $nodes, binder, evt, optional);


				if (evt && evt.previousValue) {
					core.unbindNode(evt.previousValue, path[path.length - 1], $nodes);
				}
			};

			core._delegateListener(object, path.slice(0, path.length - 2).join('.'),
				'change:' + path[path.length - 2], changeHandler);

			changeHandler();

			return object;*/
        // TODO
    }

    nofn.forEach($nodes, (node) => bindSingleNode(object, {
        $nodes,
        node,
        key,
        evt,
        binder,
        propDef
    }));


    /*

    for (i = 0; i < $nodes.length; i++) {
        initBinding(object, objectData, key, $nodes, i, binder, evt, special);
    }

    if (!evt.silent) {
        _evt = {
            key: key,
            $nodes: $nodes,
            node: $nodes[0] || null
        };

        for (i in evt) {
            _evt[i] = evt[i];
        }

        core._fastTrigger(object, 'bind:' + key, _evt);
        core._fastTrigger(object, 'bind', _evt);
    }*/



    return object;
}

/*define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/map',
	'matreshka_dir/core/initmk',
	'matreshka_dir/core/util/common'
], function(core, map, initMK, util) {

	var bindNode = core.bindNode = function(object, key, node, binder, evt, optional) {
		/* istanbul ignore if  *
		if (!object || typeof object != 'object') return object;

		if(key == 'sandbox') {
			return bindSandbox(object, node, evt, optional);
		}


		initMK(object);


		var objectData = map.get(object),
			win = typeof window != 'undefined' ? window : null,
			$nodes,
			keys,
			i,
			special,
			path,
			listenKey,
			changeHandler,
			_evt;

		/*
		 * this.bindNode([['key', $(), {on:'evt'}], [{key: $(), {on: 'evt'}}]], { silent: true });
		 *
		if (key instanceof Array) {
			for (i = 0; i < key.length; i++) {
				bindNode(object, key[i][0], key[i][1], key[i][2] || evt, node);
			}

			return object;
		}

		/*
		 * this.bindNode('key1 key2', node, binder, { silent: true });
		 *
		if (typeof key == 'string' && ~key.indexOf(' ')) {
			keys = key.split(/\s+/);
			if (keys.length > 1) {
				for (i = 0; i < keys.length; i++) {
					bindNode(object, keys[i], node, binder, evt, optional);
				}
				return object;
			}
		}

		/*
		 * this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
		 *
		if (typeof key == 'object') {
			for (i in key) {
				if (key.hasOwnProperty(i)) {
					bindNode(object, i, key[i], node, binder, evt);
				}
			}

			return object;
		}

		/*
		 * this.bindNode('key', [ node, binder ], { silent: true });
		 *
		// node !== win is the most uncommon bugfix ever. Don't ask what does it mean.
		// This is about iframes, CORS and deprecated DOM API.
		if (node && node.length == 2 && node !== win && !node[1].nodeName
				&& (node[1].setValue || node[1].getValue)) {
			return bindNode(object, key, node[0], node[1], binder, optional);
		}

		$nodes = core._getNodes(object, node);

		if (!$nodes.length) {
			if (optional) {
				return object;
			} else {
				throw Error('Binding error: node is missing for "' + key + '".' + (typeof node == 'string' ? ' The selector is "' + node + '"' : ''));
			}
		}

		if ((!evt || evt.deep !== false) && ~key.indexOf('.')) {
			path = key.split('.');
			changeHandler = function(evt) {
				evt = evt && evt.originalEvent;

				var target = evt && evt.value,
					i;
				if (!target) {
					target = object;
					for (i = 0; i < path.length - 1; i++) {
						target = target[path[i]];
					}
				}

				bindNode(target, path[path.length - 1], $nodes, binder, evt, optional);


				if (evt && evt.previousValue) {
					core.unbindNode(evt.previousValue, path[path.length - 1], $nodes);
				}
			};

			core._delegateListener(object, path.slice(0, path.length - 2).join('.'),
				'change:' + path[path.length - 2], changeHandler);

			changeHandler();

			return object;
		}

		evt = evt || {};

		special = core._defineSpecial(object, key);

		special.$nodes = special.$nodes.length ? special.$nodes.add($nodes) : $nodes;

		if (object.isMK) {
			object.$nodes[key] = special.$nodes;
			object.nodes[key] = special.$nodes[0];
		}

		for (i = 0; i < $nodes.length; i++) {
			initBinding(object, objectData, key, $nodes, i, binder, evt, special);
		}

		if (!evt.silent) {
			_evt = {
				key: key,
				$nodes: $nodes,
				node: $nodes[0] || null
			};

			for (i in evt) {
				_evt[i] = evt[i];
			}

			core._fastTrigger(object, 'bind:' + key, _evt);
			core._fastTrigger(object, 'bind', _evt);
		}



		return object;
	};

	function initBinding(object, objectData, key, $nodes, index, binder, evt, special) {
		var options = {
				self: object,
				key: key,
				$nodes: $nodes,
				node: node
			},
			node = $nodes[index],
			isUndefined = typeof special.value == 'undefined',
			_binder,
			_evt,
			foundBinder,
			_options,
			i,
			domEvt,
			mkHandler,
			val;




		if (binder === null) {
			_binder = {};
		} else {
			foundBinder = lookForBinder(node);

			if (foundBinder) {
				if (binder) {
					for (i in binder) {
						foundBinder[i] = binder[i];
					}
				}

				_binder = foundBinder;
			} else {
				_binder = binder || {};
			}
		}

		if (_binder.initialize) {
			_options = {
				value: special.value
			};
			for (i in options) {
				_options[i] = options[i];
			}
			_binder.initialize.call(node, _options);
		}

		if (_binder.getValue && (isUndefined && evt.assignDefaultValue !== false || evt.assignDefaultValue === true)) {

			_evt = {
				fromNode: true
			};

			for (i in evt) {
				_evt[i] = evt[i];
			}

			val = _binder.getValue.call(node, options);
			isUndefined = typeof val == 'undefined';

			core.set(object, key, val, _evt);
		}


		if (_binder.setValue) {
			mkHandler = function (evt) {
				var v = objectData.special[key].value,
					// dirty hack for this one https://github.com/matreshkajs/matreshka/issues/19
					_v = evt && typeof evt.onChangeValue == 'string' && typeof v == 'number' ? v + '' : v,
					i;

				if (evt && evt.changedNode == node && evt.onChangeValue == _v) return;

				_options = {
					value: v
				};

				for (i in options) {
					_options[i] = options[i];
				}

				_binder.setValue.call(node, v, _options);
			};

			if(evt.debounce) {
				mkHandler = util.debounce(mkHandler);
			}

			core._fastAddListener(object, '_runbindings:' + key, mkHandler, null, {node: node});

			!isUndefined && mkHandler();
		}




		if (_binder.getValue && _binder.on) {
			domEvt = {
				node: node,
				on: _binder.on,
				instance: object,
				key: key,
				mkHandler: mkHandler,
				handler: function(evt) {
					if (domEvt.removed) return;
					var oldvalue = object[key],
						value,
						j,
						_options = {
							value: oldvalue,
							domEvent: evt,
							originalEvent: evt.originalEvent || evt,
							preventDefault: function() {
								evt.preventDefault();
							},
							stopPropagation: function() {
								evt.stopPropagation();
							},
							which: evt.which,
							target: evt.target
						};


					// hasOwnProperty is not required there
					for (j in options) {
						_options[j] = options[j];
					}

					value = _binder.getValue.call(node, _options);

					if (value !== oldvalue) {
						core.set(object, key, value, {
							fromNode: true,
							changedNode: node,
							onChangeValue: value
						});
					}
				}
			};

			core.domEvents.add(domEvt);
		}
	}
});
*/
