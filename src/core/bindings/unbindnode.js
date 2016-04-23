define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/map',
	'matreshka_dir/core/initmk'
], function(core, map, initMK) {
	"use strict";

	var unbindNode = core.unbindNode = function(object, key, node, evt) {
		/* istanbul ignore if  */
		if (!object || typeof object != 'object') return object;

		initMK(object);

		var type = typeof key,
			objectData = map.get(object),
			special = objectData.special[key],
			$nodes,
			keys,
			i,
			indexOfDot,
			path,
			listenKey,
			_evt;

		if (key instanceof Array) {
			for (i = 0; i < key.length; i++) {
				evt = node;
				unbindNode(object, key[i][0], key[i][1] || evt, evt);
			}

			return object;
		}

		if (type == 'string') {
			keys = key.split(/\s/);
			if (keys.length > 1) {
				for (i = 0; i < keys.length; i++) {
					unbindNode(object, keys[i], node, evt);
				}
				return object;
			}

			indexOfDot = key.indexOf('.');

			if (~indexOfDot) {
				path = key.split('.');
				var target = object;

				for (i = 0; i < path.length - 1; i++) {
					target = target[path[i]];
				}

				core._undelegateListener(object, path.slice(0, path.length - 2), 'change:' + path[path.length - 2]);

				unbindNode(target, path[path.length - 1], node, evt);

				return object;
			}
		}



		if (key === null) {
			for (key in objectData.special) {
				if (objectData.special.hasOwnProperty(key)) {
					unbindNode(object, key, node, evt);
				}
			}

			return object;
		} else if (type == 'object') {
			for (i in key)
				if (key.hasOwnProperty(i)) {
					unbindNode(object, i, key[i], node);
				}
			return object;
		} else if (!node) {
			if (special && special.$nodes) {
				return unbindNode(object, key, special.$nodes, evt);
			} else {
				return object;
			}
		} else if (node.length == 2 && !node[1].nodeName && (node[1].setValue || node[1].getValue || node[1].on)) {
			// It actually ignores binder. With such a syntax you can assign definite binders to some variable and then easily delete all at once using
			return unbindNode(object, key, node[0], evt);
		} else if (!special) {
			return object;
		}

		$nodes = core._getNodes(object, node);

		for (i = 0; i < $nodes.length; i++) {
			core.domEvents.remove({
				key: key,
				node: $nodes[i],
				instance: object
			});

			special.$nodes = special.$nodes.not($nodes[i]);

			(function(node) {
				core._removeListener(object, '_runbindings:' + key, null, null, {
					node: node,
					howToRemove: function(onData, offData) {
						return onData.node == offData.node;
					}
				});
			})($nodes[i]);
		}


		if (object.isMK) {
			object.$nodes[key] = special.$nodes;
			object.nodes[key] = special.$nodes[0] || null;

			if (key == 'sandbox') {
				object.sandbox = special.$nodes[0] || null;
				object.$sandbox = special.$nodes;
			}
		}

		if (!evt || !evt.silent) {
			_evt = {
				key: key,
				$nodes: $nodes,
				node: $nodes[0] || null
			};

			for (i in evt) {
				_evt[i] = evt[i];
			}

			core._fastTrigger(object, 'unbind:' + key, _evt);
			core._fastTrigger(object, 'unbind', _evt);
		}

		return object;
	};
});
