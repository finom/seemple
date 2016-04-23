define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/map',
	'matreshka_dir/core/initmk',
	'matreshka_dir/core/util/common',
], function(core, map, initMK, util) {
	"use strict";

	core.parserBrackets = {
		left: '{{',
		right: '}}'
	};

	var parseBindings = core.parseBindings = function(object, nodes) {
		var objectData,
			$ = core.$,
			brackets = core.parserBrackets,
			leftBracket = brackets.left,
			rightBracket = brackets.right,
			escLeftBracket = leftBracket.replace(/(\[|\(|\?)/g, '\\$1'),
			escRightBracket = rightBracket.replace(/(\]|\)|\?)/g, '\\$1'),
			bindingsReg = new RegExp(escLeftBracket + '(.+?)' + escRightBracket, 'g'),
			strictBindingsReg = new RegExp('^' + escLeftBracket + '(.+?)' + escRightBracket + '$', 'g');

		/* istanbul ignore if  */
		if (!object || typeof object != 'object') return $();

		initMK(object);

		objectData = map.get(object);

		if (typeof nodes == 'string') {
			if(!~nodes.indexOf('<')) {
				nodes = core._getNodes(object, nodes);
			} else {
				if(!~nodes.indexOf(leftBracket)) {
					return $.parseHTML(nodes.replace(/^\s+|\s+$/g, ''));
				} else {
					nodes = $.parseHTML(nodes.replace(/^\s+|\s+$/g, ''));
				}
			}



		} else if (!nodes) {
			nodes = objectData && objectData.special && objectData.special.sandbox
				&& objectData.special.sandbox.$nodes;

			if(!nodes || !nodes.length) {
				return object;
			}
		} else {
			nodes = $(nodes);
		}



		var all = [],
			k = 0,
			childNodes,
			i,
			j,
			node,
			bindHTMLKey,
			atts,
			attr,
			attrValue,
			attrName,
			keys,
			key,
			binder,
			previous,
			textContent,
			childNode,
			body,
			matched;



		function initLink(key, keys, attrValue) {
			var regs = {},
				i;

			for(i = 0; i < keys.length; i++) {
				regs[keys[i]] = new RegExp(escLeftBracket + keys[i] + escRightBracket, 'g');
			}

			core.linkProps(object, key, keys, function() {
				var v = attrValue,
					i;

				for(i = 0; i < keys.length; i++) {
					v = v.replace(regs[keys[i]], arguments[i]);
				}

				return v;
			}, {
				hideProperty: true,
				setOnInit: true
			});
		}

		for(i = 0; i < nodes.length; i++) {
			node = nodes[i];

			// we need 2 if's for old firefoxes
			if(node.outerHTML) {
				// this is for firefox too
				if(!~node.outerHTML.indexOf(leftBracket) && !~node.outerHTML.indexOf(encodeURI(leftBracket))) {
					continue;
				}
			}

			childNodes = node.getElementsByTagName('*');

			for(j = 0; j < childNodes.length; j++) {
				all[k++] = childNodes[j];
			}

			all[k++] = node;
		}

		if(!all.length) {
			return $();
		}

		for (j = 0; j < all.length; j++) {
			node = all[j];
			if (node.tagName != 'TEXTAREA') {
				for (i = 0; i < node.childNodes.length; i++) {
					childNode = node.childNodes[i];

					if (childNode.nodeType == 3 && ~childNode.nodeValue.indexOf(leftBracket)) {
						textContent = childNode.nodeValue.replace(bindingsReg,
							'<span mk-html="$1"></span>');

						insertHTML(node, childNode, textContent);

						node.removeChild(childNode);
					}
				}
			}
		}

		for(i = 0; i < nodes.length; i++) {
			childNodes = nodes[i].querySelectorAll('[mk-html]');
			for(j = 0; j < childNodes.length; j++) {
				all[k++] = childNodes[j];
			}
		}


		for (i = 0; i < all.length; i++) {
			node = all[i];

			bindHTMLKey = node.getAttribute('mk-html');

			if (bindHTMLKey) {
				node.removeAttribute('mk-html');
				core.bindNode(object, bindHTMLKey, node, {
					setValue: function(v) {
						this.innerHTML = v;
					}
				});
			}

			atts = node.attributes;

			for (j = 0; j < atts.length; j++) {
				attr = atts[j];
				attrValue = attr.value;
				attrName = attr.name;
				matched = attrValue.match(bindingsReg);

				if (matched) {
					keys = matched.map(function(key) {
						return key.replace(bindingsReg, '$1');
					});

					if (keys.length == 1 && strictBindingsReg.test(attrValue)) {
						key = keys[0];
					} else {
						key = core.randomString();
						initLink(key, keys, attrValue);
					}



					if ((attrName == 'value' && node.type != 'checkbox' && node.type != 'radio'
							|| attrName == 'checked' && (node.type == 'checkbox' || node.type == 'radio'))
							&& core.lookForBinder(node)) {

						node.setAttribute(attrName, '');
						core.bindNode(object, key, node);
					} else {
						core.bindNode(object, key, node, core.binders.attr(attrName));
					}
				}
			}
		}


		return nodes;
	};

	function insertHTML(node, childNode, html) {
		var previous = childNode.previousSibling,
			body;
		try {
			if (previous) {
				previous.insertAdjacentHTML('afterend', html);
			} else {
				node.insertAdjacentHTML('afterbegin', html);
			}
		} catch (e) {
			// in case user uses very old webkit-based browser
			/* istanbul ignore next */
			body = document.body;
			/* istanbul ignore next */
			if (previous) {
				body.appendChild(previous);
				previous.insertAdjacentHTML('afterend', html);
				body.removeChild(previous);
			} else {
				body.appendChild(node);
				node.insertAdjacentHTML('afterbegin', html);
				body.removeChild(node);
			}
		}
	}
});
