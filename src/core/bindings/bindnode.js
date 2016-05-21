define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/map',
	'matreshka_dir/core/initmk',
	'matreshka_dir/core/util/common'
], function(core, map, initMK, util) {
	"use strict";
	var defaultBinders, lookForBinder;

	defaultBinders = core.defaultBinders = [function(node) {
		var tagName = node.tagName,
			binders = core.binders,
			b;

		if (tagName == 'INPUT') {
			b = binders.input(node.type);
		} else if (tagName == 'TEXTAREA') {
			b = binders.textarea();
		} else if (tagName == 'SELECT') {
			b = binders.select(node.multiple);
		} else if (tagName == 'PROGRESS') {
			b = binders.progress();
		} else if (tagName == 'OUTPUT') {
			b = binders.output();
		}

		return b;
	}];

	lookForBinder = core.lookForBinder = function(node) {
		var result,
			ep = defaultBinders,
			i;

		for (i = 0; i < ep.length; i++) {
			if (result = ep[i].call(node, node)) {
				return result;
			}
		}
	};


	core.bindOptionalNode = function(object, key, node, binder, evt) {
		if (typeof key == 'object') {
			/*
			 * this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
			 */
			bindNode(object, key, node, binder, true);
		} else {
			bindNode(object, key, node, binder, evt, true);
		}

		return object;
	};

	var bindSandbox = core.bindSandbox = function(object, node, evt) {
		var $nodes = core.$(node),
			_evt,
			special,
			i;

		initMK(object);

		if (!$nodes.length) {
			throw Error('Binding error: node is missing for "sandbox".' + (typeof node == 'string' ? ' The selector is "' + node + '"' : ''));
		}

		special = core._defineSpecial(object, 'sandbox');

		special.$nodes = special.$nodes.length ? special.$nodes.add($nodes) : $nodes;

		if (object.isMK) {
			object.$sandbox = $nodes;
			object.sandbox = $nodes[0];
			object.$nodes.sandbox = special.$nodes;
			object.nodes.sandbox = special.$nodes[0];
		}

		if (!evt || !evt.silent) {
			_evt = {
				key: 'sandbox',
				$nodes: $nodes,
				node: $nodes[0] || null
			};

			if(evt) {
				for (i in evt) {
					_evt[i] = evt[i];
				}
			}

			core._fastTrigger(object, 'bind:sandbox', _evt);
			core._fastTrigger(object, 'bind', _evt);
		}

		return object;
	};

	var bindNode = core.bindNode = function(object, key, node, binder, evt, optional) {
		/* istanbul ignore if  */
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
		 */
		if (key instanceof Array) {
			for (i = 0; i < key.length; i++) {
				bindNode(object, key[i][0], key[i][1], key[i][2] || evt, node);
			}

			return object;
		}

		/*
		 * this.bindNode('key1 key2', node, binder, { silent: true });
		 */
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
		 */
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
		 */
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
				node: $nodes[0]
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

				if (evt && evt.changedNode == node && evt.onChangeValue == _v && evt.binder == _binder) return;

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
							onChangeValue: value,
							binder: _binder
						});
					}
				}
			};

			core.domEvents.add(domEvt);
		}
	}
});
