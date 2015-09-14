define([
	'matreshka_dir/core/var/magic',
	'matreshka_dir/core/var/sym',
	'matreshka_dir/core/initmk',
	'matreshka_dir/core/util/common'
], function(magic, sym, initMK, util) {

	var defaultBinders, lookForBinder;

	defaultBinders = magic.defaultBinders = [function(node) {
		var tagName = node.tagName,
			binders = magic.binders,
			b;

		if (tagName == 'INPUT') {
			b = binders.input(node.type);
		} else if (tagName == 'TEXTAREA') {
			b = binders.textarea();
		} else if (tagName == 'SELECT') {
			b = binders.select(node.multiple);
		} else if (tagName == 'PROGRESS') {
			b = binders.progress();
		}

		return b;
	}];

	lookForBinder = magic.lookForBinder = function(node) {
		var result,
			ep = defaultBinders,
			i;

		for (i = 0; i < ep.length; i++) {
			if (result = ep[i].call(node, node)) {
				return result;
			}
		}
	};


	magic.bindOptionalNode = function(object, key, node, binder, evt) {
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

	var bindNode = magic.bindNode = function(object, key, node, binder, evt, optional) {
		if (!object || typeof object != 'object') return object;

		initMK(object);

		var isUndefined,
			$nodes,
			keys,
			i,
			j,
			special,
			indexOfDot,
			path,
			listenKey,
			changeHandler,
			domEvt,
			_binder,
			options,
			_options,
			mkHandler,
			foundBinder,
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
		if (typeof key == 'string') {
			keys = util.trim(key).split(/\s+/);
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
		if (node && node.length == 2 && !node[1].nodeName && (node[1].setValue || node[1].getValue || node[1].on)) {
			return bindNode(object, key, node[0], node[1], binder, evt);
		}

		indexOfDot = key.indexOf('.');

		if (~indexOfDot) {
			path = key.split('.');
			changeHandler = function(evt) {
				var target = evt && evt.value;
				if (!target) {
					target = object;
					for (var i = 0; i < path.length - 1; i++) {
						target = target[path[i]];
					}
				}
				bindNode(target, path[path.length - 1], node, binder, evt, optional);

				if (evt && evt.previousValue) {
					magic.unbindNode(evt.previousValue, path[path.length - 1], node);
				}
			};

			magic._delegateListener(object, path.slice(0, path.length - 2).join('.'),
				'change:' + path[path.length - 2], changeHandler);

			changeHandler();

			return object;
		}

		$nodes = magic._getNodes(object, node);

		if (!$nodes.length) {
			if (optional) {
				return object;
			} else {
				throw Error('Binding error: node is missing for key "' + key + '".' + (typeof node == 'string' ? ' The selector is "' + node + '"' : ''));
			}
		}

		evt = evt || {};

		special = magic._defineSpecial(object, key, key == 'sandbox');

		isUndefined = typeof special.value == 'undefined';

		special.$nodes = special.$nodes.length ? special.$nodes.add($nodes) : $nodes;

		if (object.isMK) {
			if (key == 'sandbox') {
				object.$sandbox = $nodes;
				object.sandbox = $nodes[0];
			}
			object.$nodes[key] = special.$nodes;
			object.nodes[key] = special.$nodes[0];
		}

		if (key != 'sandbox') {
			for (i = 0; i < $nodes.length; i++)(function(node) {
				var _binder,
					options = {
						self: object,
						key: key,
						$nodes: $nodes,
						node: node
					};

				if (binder === null) {
					_binder = {};
				} else {
					foundBinder = key == 'sandbox' ? null : lookForBinder(node);

					if (foundBinder) {
						if (binder) {
							for (j in binder) {
								foundBinder[j] = binder[j];
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
					for (j in options) {
						_options[j] = options[j];
					}
					_binder.initialize.call(node, _options);
				}

				if (_binder.setValue) {
					mkHandler = function(evt) {
						var v = object[sym].special[key].value;
						if (evt && evt.changedNode == node && evt.onChangeValue == v) return;

						_options = {
							value: v
						};

						for (j in options) {
							_options[j] = options[j];
						}

						_binder.setValue.call(node, v, _options);
					};
					magic._fastAddListener(object, '_runbindings:' + key, mkHandler);
					!isUndefined && mkHandler();
				}

				if (_binder.getValue && (isUndefined && evt.assignDefaultValue !== false || evt.assignDefaultValue === true)) {
					_evt = {
						fromNode: true
					};

					for (j in evt) {
						_evt[j] = evt[j];
					}

					magic.set(object, key, _binder.getValue.call(node, options), _evt);
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
								magic.set(object, key, value, {
									fromNode: true,
									changedNode: node,
									onChangeValue: value
								});
							}
						}
					};

					magic.domEvents.add(domEvt);
				}

			})($nodes[i]);
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

			magic._fastTrigger(object, 'bind:' + key, _evt);
			magic._fastTrigger(object, 'bind', _evt);
		}

		return object;
	};
});