define([
	'matreshka_dir/core/var/sym',
	'matreshka_dir/core/initmk',
	'matreshka_dir/matreshka.class'
], function(sym, initMK, MK) {
	"use strict";
	var getNode = function(_this, item, evt) {
		var thisProps = _this[sym],
			itemProps = item[sym],
			id = thisProps.id,
			$ = MK.$,
			arraysNodes = itemProps.arraysNodes = itemProps.arraysNodes || {},
			node = arraysNodes[id],
			itemRenderer = _this.itemRenderer,
			renderer = item.renderer,
			usedRenderer = renderer || itemRenderer,
			isOwnRenderer = usedRenderer === renderer,
			rendererContext = isOwnRenderer ? item : _this,
			knownRendererNode = itemProps.rendererNode,
			rendererHasBindings = itemProps.rendererHasBindings,
			knownItemRendererNode = thisProps.itemRendererNode,
			itemRendererHasBindings = thisProps.itemRendererHasBindings,
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

				usedRenderer = $.parseHTML(usedRenderer);

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
					itemProps.rendererNode = usedRenderer;
					itemProps.rendererHasBindings = hasBindings;
				} else {
					thisProps.itemRendererNode = usedRenderer;
					thisProps.itemRendererHasBindings = hasBindings;
				}
			} else {
				if(isOwnRenderer) {
					itemProps.rendererNode = null;
					itemProps.rendererHasBindings = false;
				} else {
					thisProps.itemRendererNode = null;
					thisProps.itemRendererHasBindings = false;
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
		var itemEvt, node;
		if (!item || typeof item != 'object' || !_this.renderIfPossible || evt.dontRender) return;

		if (!item[sym]) {
			initMK(item);
		}

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
			item[sym].events.afterrender && setTimeout(function() {
				MK._fastTrigger(item, 'afterrender', itemEvt);
			}, 0);
		}

		return node;
	};

	/*var __renderOne = function(_this, item, evt) {
		if (!item || typeof item != 'object' || !_this.renderIfPossible || evt.dontRender) return;

		if (!item[sym]) {
			initMK(item);
		}

		var id = _this[sym].id,
			renderer = item.renderer || _this.itemRenderer,
			rendererContext = renderer === item.renderer ? item : _this,
			arraysNodes = item[sym].arraysNodes = item[sym].arraysNodes || {},
			node = arraysNodes[id],
			$node,
			template,
			itemEvt,
			sandboxes,
			i,
			wrapper;

		if (!renderer) return;

		if (!!evt.moveSandbox) {
			if (node = MK.bound(item, ['sandbox'])) {
				arraysNodes[id] = node;
			}
		}

		if (node && evt.forceRerender) {
			sandboxes = MK.boundAll(item, ['sandbox']);

			for (i = 0; i < sandboxes.length; i++) {
				if (node == sandboxes[i]) {
					MK.unbindNode(item, 'sandbox', node);
					break;
				}
			}

			node = arraysNodes[id] = null;
		}

		if (!node) {
			if (typeof renderer == 'function') {
				renderer = renderer.call(rendererContext, item);
			}

			if (typeof renderer == 'string' && !/<|{{/.test(renderer)) {
				template = MK._getNodes(rendererContext, renderer);
				if (template = template && template[0]) {
					template = template.innerHTML;
				} else {
					throw Error('renderer node is missing: ' + renderer);
				}
			} else {
				template = renderer;
			}

			if (typeof template == 'string') {
				$node = MK.$.parseHTML(MK.trim(template));
				if($node.length > 1) {
					wrapper = document.createElement('span');
					for(i = 0; i < $node.length; i++) {
						wrapper.appendChild($node[i]);
					}

					$node = $node = MK.$(wrapper);
				}

				if (_this.useBindingsParser !== false) {
					MK.parseBindings(item, $node);
				}
			} else {
				$node = MK.$(template);
			}

			if(!$node.length) {
				throw Error('renderer node is missing');
			}

			if (item.bindRenderedAsSandbox !== false) {
				MK.bindNode(item, 'sandbox', $node);
			}

			node = $node[0];

			arraysNodes[id] = node;

			if(!evt.silent) {
				itemEvt = {
					node: node,
					$nodes: $node,
					self: item,
					parentArray: _this
				};

				item.onRender && item.onRender(itemEvt);
				_this.onItemRender && _this.onItemRender(item, itemEvt);

				MK._fastTrigger(item, 'render', itemEvt);

				// TODO make this code smarter, don't use setTimeout
				item[sym].events.afterrender && setTimeout(function() {
					MK._fastTrigger(item, 'afterrender', itemEvt);
				}, 0);
			}
		}

		return node;
	};*/

	return function(_this, evt) {
		var props = _this[sym],
			id = props.id,
			l = _this.length,
			added = evt.added,
			removed = evt.removed,
			addedLength = added && added.length,
			removedLength = removed && removed.length,
			container = props.special.container || props.special.sandbox,
			node,
			next,
			i,
			item;

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
					node = item && item[sym] && item[sym].arraysNodes && item[sym].arraysNodes[id];
					if (node) {
						container.removeChild(node);
					}
				}

				break;
			case 'sort':
			case 'reverse':
				for (i = 0; i < l; i++) {
					item = _this[i];
					if (node = item && item[sym] && item[sym].arraysNodes[id]) {
						container.appendChild(node);
					}
				}

				break;
			case 'rerender':
				if (evt.forceRerender) {
					for (i = 0; i < l; i++) {
						item = _this[i];
						node = item && item[sym] && item[sym].arraysNodes && item[sym].arraysNodes[id];
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
					node = item && item[sym] && item[sym].arraysNodes && item[sym].arraysNodes[id];
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
				next = next && next[sym];
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
					node = item && item[sym] && item[sym].arraysNodes && item[sym].arraysNodes[id];
					if (node) {
						container.removeChild(node);
					}
				}

				break;
		}

		return _this;
	};
});
