define([], function() {
	"use strict";

	/* istanbul ignore if  */
	if (typeof window == 'undefined') {
		return;
	}

	var s_classList = 'classList',
		nsReg = /\.(.+)/,
		allEvents = {},
		nodeIndex = 0,
		fn = [];

	function $b(s, context) {
		return new $b.i(s, context);
	}

	$b.i = function(s, context) {
		var result,
			l, i;

		if (s) {
			if (s.nodeType || s == window) {
				result = [s];
			} else if (typeof s == 'string') {
				if (/</.test(s)) {
					result = $b.parseHTML(s);
				} else {
					if (context) {
						if (context = $b(context)[0]) {
							result = context.querySelectorAll(s);
						}
					} else {
						result = document.querySelectorAll(s);
					}
				}
			} else if (s instanceof Function) { // typeof nodeList returns "function" in old WebKit
				if (document.readyState == 'loading') {
					document.addEventListener('DOMContentLoaded', s);
				} else {
					s();
				}
			} else {
				result = s;
			}
		}

		l = result && result.length;

		if (l) {
			for (i = 0; i < l; i++) {
				this.push(result[i]);
			}
		}
	};

	$b.fn = $b.i.fn = $b.i.prototype = fn;

	$b.extend = function(obj) {
		var k = arguments,
			i, j, l;
		for (i = 1; i < k.length; i++) {
			if (l = k[i]) {
				for (j in l) {
					obj[j] = l[j];
				}
			}
		}

		return obj;
	};

	$b.extend(fn, {
		is: function(s) {
			var node = this[0];
			return node ? (node.matches || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector || node.oMatchesSelector).call(node, s) : false;
		},
		on: function(names, selector, handler) {
			var _this = this,
				delegate,
				name,
				namespace,
				node,
				nodeID,
				events,
				event,
				exist,
				i, j, k;

			if (typeof selector == 'function') {
				handler = selector;
				selector = null;
			}

			if (selector) {
				delegate = function(evt) {
					var randomID = 'x' + String(Math.random()).split('.')[1],
						node = this,
						scopeSelector,
						is;

					node.setAttribute(randomID, randomID);

					scopeSelector = '[' + randomID + '="' + randomID + '"] ';

					is = selector.split(',').map(function(sel) {
						return scopeSelector + sel + ',' + scopeSelector + sel + ' *';
					}).join(',');

					if ($b(evt.target).is(is)) {
						handler.call(node, evt);
					}

					node.removeAttribute(randomID);
				};
			}

			names = names.split(/\s/);

			for (i = 0; i < names.length; i++) {
				name = names[i].split(nsReg);
				namespace = name[1];
				name = name[0];

				for (j = 0; j < _this.length; j++) {
					node = _this[j];

					nodeID = node.b$ = node.b$ || ++nodeIndex,
						events = allEvents[name + nodeID] = allEvents[name + nodeID] || [],
						exist = false;


					for (k = 0; k < events.length; k++) {
						event = events[k];

						if (handler == event.handler && (!selector || selector == event.selector)) {
							exist = true;
							break;
						}
					}

					if (!exist) {
						events.push({
							delegate: delegate,
							handler: handler,
							namespace: namespace,
							selector: selector
						});

						node.addEventListener(name, delegate || handler, false);
					}
				}
			}

			return _this;
		},
		off: function(names, selector, handler) {
			var _this = this,
				name,
				namespace,
				node,
				events,
				event,
				i, j, k;

			if (typeof selector == 'function') {
				handler = selector;
				selector = null;
			}

			names = names.split(/\s/);

			for (i = 0; i < names.length; i++) {
				name = names[i].split(nsReg);
				namespace = name[1];
				name = name[0];

				for (j = 0; j < _this.length; j++) {
					node = _this[j];

					events = allEvents[name + node.b$];

					if (events) {
						for (k = 0; k < events.length; k++) {
							event = events[k];
							if ((!handler || handler == event.handler || handler == event.delegate) && (!namespace || namespace == event.namespace) && (!selector || selector == event.selector)) {
								node.removeEventListener(name, event.delegate || event.handler);
								events.splice(k--, 1);
							}
						}
					} else {
						if (!namespace && !selector) {
							node.removeEventListener(name, handler);
						}
					}
				}
			}

			return _this;
		},
		add: function(s) {
			var result = $b(this),
				map = {},
				nodeID,
				node,
				i;

			s = $b(s);

			for (i = 0; i < result.length; i++) {
				node = result[i];
				nodeID = node.b$ = node.b$ || ++nodeIndex;
				map[nodeID] = 1;
			}

			for (i = 0; i < s.length; i++) {
				node = s[i];
				nodeID = node.b$ = node.b$ || ++nodeIndex;
				if (!map[nodeID]) {
					map[nodeID] = 1;
					result.push(node);
				}
			}

			return result;
		},
		not: function(s) {
			var result = $b(this),
				index,
				i;

			s = $b(s);

			for (i = 0; i < s.length; i++) {
				if (~(index = result.indexOf(s[i]))) {
					result.splice(index, 1);
				}
			}

			return result;
		},
		find: function(s) {
			var result = $b();
			this.forEach(function(item) {
				result = result.add($b(s, item));
			});
			return result;
		}
	});

	// simple html parser
	$b.parseHTML = function(html) {
		var node = document.createElement('div'),
			// wrapMap is taken from jQuery
			wrapMap = {
				option: [1, "<select multiple='multiple'>", "</select>"],
				legend: [1, "<fieldset>", "</fieldset>"],
				thead: [1, "<table>", "</table>"],
				tr: [2, "<table><tbody>", "</tbody></table>"],
				td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
				col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
				area: [1, "<map>", "</map>"],
				_: [0, "", ""]
			},
			wrapper,
			i,
			ex;

		html = html.replace(/^\s+|\s+$/g, '');

		wrapMap.optgroup = wrapMap.option;
		wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
		wrapMap.th = wrapMap.td;

		ex = /<([\w:]+)/.exec(html);

		wrapper = ex && wrapMap[ex[1]] || wrapMap._;

		node.innerHTML = wrapper[1] + html + wrapper[2];

		i = wrapper[0];

		while (i--) {
			node = node.children[0];
		}

		return $b(node.childNodes);
	};

	$b.create = function create(tagName, props) {
		var el, i, j, prop;

		if (typeof tagName == 'object') {
			props = tagName;
			tagName = props.tagName;
		}

		el = document.createElement(tagName);

		if (props)
			for (i in props) {
				prop = props[i];
				if (i == 'attributes' && typeof prop == 'object') {
					for (j in prop)
						if (prop.hasOwnProperty(j)) {
							el.setAttribute(j, prop[j]);
						}
				} else if (i == 'tagName') {
					continue;
				} else if (i == 'children' && prop) {
					for (j = 0; j < prop.length; j++) {
						el.appendChild(create(prop[j]));
					}
				} else if (typeof el[i] == 'object' && el[i] !== null && typeof props == 'object') {
					for (j in prop)
						if (prop.hasOwnProperty(j)) {
							el[i][j] = prop[j];
						}
				} else {
					el[i] = prop;
				}
			}
		return el;
	};

	$b.one = function(s, context) {
		return $b(s, context)[0] || null;
	};


	return $b;
});
