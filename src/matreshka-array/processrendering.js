define([
	'matreshka_dir/core/var/map',
	'matreshka_dir/core/initmk',
	'matreshka_dir/matreshka.class'
], function(map, initMK, MK) {
	"use strict";
	var getNode = function(_this, item, evt) {
		var thisData = map.get(_this),
			itemData = map.get(item),
			id = thisData.id,
			$ = MK.$,
			arraysNodes = itemData.arraysNodes = itemData.arraysNodes || {},
			node = arraysNodes[id],
			itemRenderer = _this.itemRenderer,
			renderer = item.renderer,
			usedRenderer = renderer || itemRenderer,
			isOwnRenderer = usedRenderer === renderer,
			rendererContext = isOwnRenderer ? item : _this,
			knownRendererNode = itemData.rendererNode,
			rendererHasBindings = itemData.rendererHasBindings,
			knownItemRendererNode = thisData.itemRendererNode,
			itemRendererHasBindings = thisData.itemRendererHasBindings,
			useBindingsParser = _this.useBindingsParser !== false,
			useCache = true,
			hasBindings = false,
			wrapper,
			sandboxes,
			i;

		if(!usedRenderer) return;

		if (evt.moveSandbox) {
			if (node = MK.bound(item, ['sandbox'])) {
				arraysNodes[id] = node;
			}

			return node;
		}

		if(node) {
			if (evt.forceRerender) {
				sandboxes = MK.boundAll(item, ['sandbox']);

				for (i = 0; i < sandboxes.length; i++) {
					if (node == sandboxes[i]) {
						MK.unbindNode(item, 'sandbox', node);
						break;
					}
				}

				node = arraysNodes[id] = null;
			} else {
				return node;
			}
		}

		if(!evt.forceRerender && typeof usedRenderer != 'function') {
			if(knownRendererNode) {
				if(rendererHasBindings && useBindingsParser) {
					node = MK.parseBindings(item, knownRendererNode.cloneNode(true))[0];
				} else {
					node = knownRendererNode.cloneNode(true);
				}

			}

			if(knownItemRendererNode) {
				if(itemRendererHasBindings && useBindingsParser) {
					node = MK.parseBindings(item, knownItemRendererNode.cloneNode(true))[0];
				} else {
					node = knownItemRendererNode.cloneNode(true);
				}
			}
		}

		if(!node) {
			if (typeof usedRenderer == 'function') {
				useCache = false;
				usedRenderer = usedRenderer.call(rendererContext, item);
			}

			if(typeof usedRenderer == 'string') {
				if(!/</.test(usedRenderer)) {
					usedRenderer = MK._getNodes(rendererContext, usedRenderer)[0];
					if (usedRenderer) {
						usedRenderer = usedRenderer.innerHTML;
					} else {
						throw Error('renderer node is missing');
					}
				}

				if(/{{/.test(usedRenderer)) {
					hasBindings = true;
				}

				usedRenderer = $.parseHTML(MK.trim(usedRenderer));

				if(usedRenderer.length > 1) {
					wrapper = document.createElement('span');
					for(i = 0; i < usedRenderer.length; i++) {
						wrapper.appendChild(usedRenderer[i]);
					}

					usedRenderer = wrapper;
				} else {
					usedRenderer = usedRenderer[0];
				}
			}

			if(useCache) {
				if(isOwnRenderer) {
					itemData.rendererNode = usedRenderer;
					itemData.rendererHasBindings = hasBindings;
				} else {
					thisData.itemRendererNode = usedRenderer;
					thisData.itemRendererHasBindings = hasBindings;
				}
			} else {
				if(isOwnRenderer) {
					itemData.rendererNode = null;
					itemData.rendererHasBindings = false;
				} else {
					thisData.itemRendererNode = null;
					thisData.itemRendererHasBindings = false;
				}
			}

			if(hasBindings && useBindingsParser) {
				node = MK.parseBindings(item, usedRenderer.cloneNode(true))[0];
			} else {
				node = usedRenderer.cloneNode(true);
			}
		}

		return arraysNodes[id] = node;
	};

	var renderOne = function(_this, item, evt) {
		var itemEvt,
			node,
			objectData;

		if (!item || typeof item != 'object' || !_this.renderIfPossible || evt.dontRender) return;

		initMK(item);

		objectData = map.get(item);

		node = getNode(_this, item, evt);

		if(!node) return;

		if (item.bindRenderedAsSandbox !== false) {
			MK.bindSandbox(item, node);
		}

		if(!evt.silent) {
			itemEvt = {
				node: node,
				$nodes: MK.$(node),
				self: item,
				parentArray: _this
			};

			item.onRender && item.onRender(itemEvt);
			_this.onItemRender && _this.onItemRender(item, itemEvt);

			MK._fastTrigger(item, 'render', itemEvt);

			// TODO make this code smarter, don't use setTimeout
			objectData.events.afterrender && setTimeout(function() {
				MK._fastTrigger(item, 'afterrender', itemEvt);
			}, 0);
		}

		return node;
	};


	return function(_this, evt) {
		var objectData = map.get(_this),
			id = objectData.id,
			l = _this.length,
			added = evt.added,
			removed = evt.removed,
			addedLength = added && added.length,
			removedLength = removed && removed.length,
			container = objectData.special.container || objectData.special.sandbox,
			node,
			next,
			i,
			item,
			itemData;

		container = container && container.$nodes;
		container = container && container[0];

		if (!container) return _this;

		switch (evt.method) {
			case 'push':
				for (i = l - addedLength; i < l; i++) {
					if (node = renderOne(_this, _this[i], evt)) {
						container.appendChild(node);
					}
				}

				break;
			case 'unshift':
				for (i = addedLength - 1; i + 1; i--) {
					if (node = renderOne(_this, _this[i], evt)) {
						if (container.firstChild) {
							container.insertBefore(node, container.firstChild);
						} else {
							container.appendChild(node);
						}
					}
				}

				break;
			case 'pull':
			case 'pop':
			case 'shift':
				for (i = 0; i < removedLength; i++) {
					item = removed[i];
					itemData = map.get(item);
					node = itemData.arraysNodes && itemData.arraysNodes[id];
					if (node) {
						container.removeChild(node);
					}
				}

				break;
			case 'sort':
			case 'reverse':
				for (i = 0; i < l; i++) {
					item = _this[i];
					itemData = map.get(item);
					if (node = itemData && itemData.arraysNodes[id]) {
						container.appendChild(node);
					}
				}

				break;
			case 'rerender':
				if (evt.forceRerender) {
					for (i = 0; i < l; i++) {
						item = _this[i];
						itemData = map.get(item);
						node = itemData && itemData.arraysNodes && itemData.arraysNodes[id];
						if (node) {
							container.removeChild(node);
						}
					}
				}

				for (i = 0; i < l; i++) {
					if (node = renderOne(_this, _this[i], evt)) {
						container.appendChild(node);
					}
				}

				break;
			case 'recreate':
				for (i = 0; i < removedLength; i++) {
					item = removed[i];
					itemData = map.get(item);
					node = itemData && itemData.arraysNodes && itemData.arraysNodes[id];
					if (node) {
						container.removeChild(node);
					}
				}

				for (i = 0; i < l; i++) {
					if (node = renderOne(_this, _this[i], evt)) {
						container.appendChild(node);
					}
				}

				break;

			case 'splice':
				next = _this[evt.args[0] < 0 ? l + evt.args[0] - addedLength + removedLength - 1 : evt.args[0] - 1];
				next = map.get(next);
				next = next && next.arraysNodes;
				next = next && next[id];
				next = next && next.nextSibling;
				next = next || container.firstChild;

				for (i = 0; i < addedLength; i++) {
					if (node = renderOne(_this, added[i], evt)) {
						container.insertBefore(node, next);
					}
				}

				for (i = 0; i < removedLength; i++) {
					item = removed[i];
					itemData = map.get(item);
					node = itemData && itemData.arraysNodes && itemData.arraysNodes[id];
					if (node) {
						container.removeChild(node);
					}
				}

				break;
		}

		return _this;
	};
});
