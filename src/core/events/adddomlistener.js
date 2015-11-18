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
					mkArgs = domEvt.originalEvent ? domEvt.originalEvent.mkArgs : domEvt.mkArgs,
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

				callback.apply(context, mkArgs ? mkArgs : [evt]);
			},
			fullEvtName = domEvtName + '.' + object[sym].id + key,
			bindHandler = function(evt) {
				evt && evt.$nodes && evt.$nodes.on(fullEvtName, selector, domEvtHandler);
			},
			unbindHandler = function(evt) {
				evt && evt.$nodes && evt.$nodes.off(fullEvtName, selector, domEvtHandler);
			};

		domEvtHandler._callback = callback;

		core._defineSpecial(object, key);

		bindHandler._callback = unbindHandler._callback = callback;

		if(core._addListener(object, 'bind:' + key, bindHandler, context, evtData)
			&& core._addListener(object, 'unbind:' + key, unbindHandler, context, evtData)) {
			bindHandler({
				$nodes: object[sym].special[key] && object[sym].special[key].$nodes
			});
		}

		return object;
	};
});
