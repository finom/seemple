define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/sym',
	'matreshka_dir/core/initmk',
	'matreshka_dir/core/util/common',
], function(core, sym, initMK, util) {
	"use strict";

	var parseBindings = core.parseBindings = function(object, nodes) {
		var $ = core.$;

		if (!object || typeof object != 'object') return $();
		if (typeof nodes == 'string') {
			if (~nodes.indexOf('{{')) {
				nodes = $.parseHTML(nodes.replace(/^\s+|\s+$/g, ''));
			} else {
				return $.parseHTML(nodes.replace(/^\s+|\s+$/g, ''));
			}
		} else if (!nodes) {
			nodes = object[sym] && object[sym].special && object[sym].special.sandbox
				&& object[sym].special.sandbox.$nodes;

			if(!nodes || !nodes.length) {
				return object;
			}
		} else {
			nodes = $(nodes);
		}

		initMK(object);

		var recursiveSpider = function(node) {
				var i, previous, textContent, childNode, body;
				if (node.tagName != 'TEXTAREA') {
					for (i = 0; i < node.childNodes.length; i++) {
						childNode = node.childNodes[i];
						previous = childNode.previousSibling;

						if (childNode.nodeType == 3 && ~childNode.nodeValue.indexOf('{{')) {
							textContent = childNode.nodeValue.replace(/{{([^}]*)}}/g,
								'<span mk-html="$1"></span>');

							try {
								if (previous) {
									previous.insertAdjacentHTML('afterend', textContent);
								} else {
									node.insertAdjacentHTML('afterbegin', textContent);
								}
							} catch (e) {
								// in case user uses very old webkit-based browser
								body = document.body;
								if (previous) {
									body.appendChild(previous);
									previous.insertAdjacentHTML('afterend', textContent);
									body.removeChild(previous);
								} else {
									body.appendChild(node);
									node.insertAdjacentHTML('afterbegin', textContent);
									body.removeChild(node);
								}
							}

							node.removeChild(childNode);
						} else if (childNode.nodeType == 1) {
							recursiveSpider(childNode);
						}
					}
				}
			},
			all = [],
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
			body;

		/*for (i = 0; i < nodes.length; i++) {
			recursiveSpider(nodes[i]);
		}*/

		for(i = 0; i < nodes.length; i++) {
			node = nodes[i];
			if(node.outerHTML && !~node.outerHTML.indexOf('{{')) continue;
			childNodes = node.getElementsByTagName('*');
			for(j = 0; j < childNodes.length; j++) {
				all.push(childNodes[j]);
			}

			all.push(node);
		}

		if(!all.length) {
			return $();
		}

		for (j = 0; j < all.length; j++) {
			node = all[j];
			if (node.tagName != 'TEXTAREA') {
				for (i = 0; i < node.childNodes.length; i++) {
					childNode = node.childNodes[i];
					previous = childNode.previousSibling;

					if (childNode.nodeType == 3 && ~childNode.nodeValue.indexOf('{{')) {
						textContent = childNode.nodeValue.replace(/{{([^}]*)}}/g,
							'<span mk-html="$1"></span>');

						try {
							if (previous) {
								previous.insertAdjacentHTML('afterend', textContent);
							} else {
								node.insertAdjacentHTML('afterbegin', textContent);
							}
						} catch (e) {
							// in case user uses very old webkit-based browser
							body = document.body;
							if (previous) {
								body.appendChild(previous);
								previous.insertAdjacentHTML('afterend', textContent);
								body.removeChild(previous);
							} else {
								body.appendChild(node);
								node.insertAdjacentHTML('afterbegin', textContent);
								body.removeChild(node);
							}
						}

						node.removeChild(childNode);
					}
				}
			}
		}

		for(i = 0; i < nodes.length; i++) {
			childNodes = nodes[i].querySelectorAll('[mk-html]');
			for(j = 0; j < childNodes.length; j++) {
				all.push(childNodes[j]);
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

			atts = util.toArray(node.attributes);

			for (j = 0; j < atts.length; j++) {
				attr = atts[j];
				attrValue = attr.value;
				attrName = attr.name;

				if (~attrValue.indexOf('{{')) {
					keys = attrValue.match(/{{[^}]*}}/g).map(function(key) {
						return key.replace(/{{(.*)}}/, '$1');
					});

					if (keys.length == 1 && /^{{[^}]*}}$/g.test(attrValue)) {
						key = keys[0];
					} else {
						key = core.randomString();
						(function(keys) {
							core.linkProps(object, key, keys, function() {
								var v = attrValue;
								keys.forEach(function(_key) {
									v = v.replace(new RegExp('{{' + _key + '}}', 'g'), object[sym].special[_key].value);
								});

								return v;
							}, true, {
								hideProperty: true
							});
						})(keys);

					}

					if ((attrName == 'value' && node.type != 'checkbox' || attrName == 'checked' && node.type == 'checkbox')
							&& core.lookForBinder(node)) {

						core.bindNode(object, key, node);
						//node.removeAttribute(attrName);
					} else {
						core.bindNode(object, key, node, {
							setValue: function(v) {

								this.setAttribute(attrName, v);
							}
						});
					}
				}
			}
		}


		return nodes;
	};
});
