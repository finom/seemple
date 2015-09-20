define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/initmk',
	'matreshka_dir/core/var/sym'
], function(core, initMK, sym) {
	"use strict";
	core._addDOMListener = function(object, key, domEvtName, selector, callback, context, evtData) {
		if (!object || typeof object != 'object') return object;

		initMK(object);

		selector = selector || null;
		evtData = evtData || {};
		var domEvtHandler = function(domEvt) {
				var node = this,
					$ = core.$,
					$nodes = $(node),
					evt = {
						self: object,
						node: node,
						$nodes: $nodes,
						key: key,
						domEvent: domEvt,
						originalEvent: domEvt.originalEvent || domEvt,
						preventDefault: function() {
							domEvt.preventDefault();
						},
						stopPropagation: function() {
							domEvt.stopPropagation();
						},
						which: domEvt.which,
						target: domEvt.target
					},
					randomID,
					is;

				// DOM event is delegated
				if (selector) {
					randomID = 'x' + String(Math.random()).split('.')[1];
					node.setAttribute(randomID, randomID);
					is = '[' + randomID + '="' + randomID + '"] ' + selector;

					if ($(domEvt.target).is(is + ',' + is + ' *')) {
						callback.call(context, evt);
					}

					node.removeAttribute(randomID);
				} else {
					callback.call(context, evt);
				}
			},
			fullEvtName = domEvtName + '.' + object[sym].id + key,
			bindHandler = function(evt) {
				evt && evt.$nodes && evt.$nodes.on(fullEvtName, domEvtHandler);
			},
			unbindHandler = function(evt) {
				evt && evt.$nodes && evt.$nodes.off(fullEvtName, domEvtHandler);
			};

		core._defineSpecial(object, key);

		bindHandler._callback = unbindHandler._callback = callback;

		// minor but TODO
		// wat if user adds same DOM listener twice or more?
		// then bind/unbind will not be added but bindHandler will be called anyway
		core._addListener(object, 'bind:' + key, bindHandler, context, evtData);
		core._addListener(object, 'unbind:' + key, unbindHandler, context, evtData);

		bindHandler({
			$nodes: object[sym].special[key] && object[sym].special[key].$nodes
		});


		return object;
	};
});
