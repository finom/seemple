define([
	'matreshka_dir/core/dom-lib/balalaika',
	'matreshka_dir/polyfills/classlist'
], function($b) {
	"use strict";
	if(typeof window == 'undefined') {
		return;
	}
	var s_classList = 'classList',
		_on, _off;
	if (!$b) {
		throw new Error('Balalaika is missing');
	}

	_on = $b.fn.on;
	_off = $b.fn.off;

	var nsReg = /\.(.+)/,
		allEvents = {},
		nodeIndex = 0;
/*if (selector) {
	randomID = 'x' + String(Math.random()).split('.')[1];
	node.setAttribute(randomID, randomID);
	is = '[' + randomID + '="' + randomID + '"] ' + selector;

	if ($(domEvt.target).is(is + ',' + is + ' *')) {
		callback.apply(context, mkArgs ? mkArgs : [evt]);
	}

	node.removeAttribute(randomID);
} else {
	callback.apply(context, mkArgs ? mkArgs : [evt]);
}*/
	$b.extend($b.fn, {
		on: function(names, selector, handler) {
			var delegate;
			if(typeof selector == 'function') {
				handler = selector;
				selector = null;
			}

			if(selector) {
				delegate = function(evt) {
					var randomID = 'x' + String(Math.random()).split('.')[1],
						node = this,
						is;

					node.setAttribute(randomID, randomID);

					is = '[' + randomID + '="' + randomID + '"] ' + selector;

					if ($b(evt.target).is(is + ',' + is + ' *')) {
						handler.call(node, evt);
					}

					node.removeAttribute(randomID);
				};

				//delegate._callback = handler;
				//handler = delegate;
			}

			names.split(/\s/).forEach(function(name) {
				var namespace;
				name = name.split(nsReg);
				namespace = name[1];
				name = name[0];

				this.forEach(function(node) {
					var nodeID = node.b$ = node.b$ || ++nodeIndex,
						events = allEvents[name + nodeID] = allEvents[name + nodeID] || [],
						exist = false,
						event;

					/*for(var i = 0; i < events.length; i++) {
						event = events[i];
						if((!handler || handler == event.handler || handler == event.delegate)
								&& (!namespace || namespace == event.namespace)
								&& (!selector || selector == event.selector)) {
							exist = true;
						}
					}

					if(!exist) {*/

						events.push({
							delegate: delegate,
							handler: handler,
							namespace: namespace,
							selector: selector
						});


						node.addEventListener(name, delegate || handler, false);
					//}
				});


			}, this);

			return this;
		},
		off: function(names, selector, handler) {
			if(typeof selector == 'function') {
				handler = selector;
				selector = null;
			}

			names.split(/\s/).forEach(function(name) {
				var namespace;
				name = name.split(nsReg);
				namespace = name[1];
				name = name[0];
				this.forEach(function(node) {
					var events = allEvents[name + node.b$],
						i;
					if (events) {
						for(i = 0; i < events.length; i++) {
							var event = events[i];
							if((!handler || handler == event.handler || handler == event.delegate)
									&& (!namespace || namespace == event.namespace)
									&& (!selector || selector == event.selector)) {
								node.removeEventListener(name, event.delegate || event.handler);
								events.splice(i--, 1);
							}
						}
					} else {
						if(!namespace && !selector) {
							node.removeEventListener(name, handler);
						}
					}
				});
			}, this);
			return this;
		},
		hasClass: function(className) {
			return !!this[0] && this[0][s_classList].contains(className);
		},
		addClass: function(className) {
			this.forEach(function(item) {
				var classList = item[s_classList];
				classList.add.apply(classList, className.split(/\s/));
			});
			return this;
		},
		removeClass: function(className) {
			this.forEach(function(item) {
				var classList = item[s_classList];
				classList.remove.apply(classList, className.split(/\s/));
			});
			return this;
		},
		toggleClass: function(className, b) {
			this.forEach(function(item) {
				var classList = item[s_classList];
				if (typeof b !== 'boolean') {
					b = !classList.contains(className);
				}
				classList[b ? 'add' : 'remove'].apply(classList, className.split(/\s/));
			});
			return this;
		},
		add: function(s) {
			var result = $b(this),
				ieIndexOf = function(a, e) {
					for (j = 0; j < a.length; j++)
						if (a[j] === e) return j;
				},
				i, j;
			s = $b(s).slice();
			[].push.apply(result, s);
			for (i = result.length - s.length; i < result.length; i++) {
				if (([].indexOf ? result.indexOf(result[i]) : ieIndexOf(result, result[i])) !== i) { // @IE8
					result.splice(i--, 1);
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

		el = document.createElement(tagName)

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

	// @IE8 Balalaika fix. This browser doesn't support HTMLCollection and NodeList as second argument for .apply
	// This part of code will be removed in Matreshka 1.0
	(function(document, $, i, j, k, fn) {
		var bugs,
			children = document.createElement('div').children;
		try {
			[].push.apply([], children);
		} catch (e) {
			bugs = true;
		}
		bugs = bugs || typeof children === 'function' || document.documentMode < 9;

		if (bugs) {
			fn = $.i[j = 'prototype'];

			$.i = function(s, context) {
				k = !s ? fn : s && s.nodeType || s == window ? [s] : typeof s == 'string' ? /</.test(s) ? ((i = document.createElement('div')).innerHTML = s, i.children) : (context && $(context)[0] || document).querySelectorAll(s) : /f/.test(typeof s) && (!s[0] && !s[0].nodeType) ? /c/.test(document.readyState) ? s() : ! function r(f) {
					/in/ (document.readyState) ? setTimeout(r, 9, f): f()
				}(s) : s;

				j = [];
				for (i = k ? k.length : 0; i--; j[i] = k[i]) {}

				fn.push.apply(this, j);
			};

			$.i[j] = fn;

			fn.is = function(selector) {
				var elem = this[0],
					elems = elem.parentNode.querySelectorAll(selector),
					i;

				for (i = 0; i < elems.length; i++) {
					if (elems[i] === elem) return true;
				}
				return false;
			};
		}
		return $;
	})(document, $b);

	return $b;
});
