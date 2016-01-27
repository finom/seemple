define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/initmk',
	'matreshka_dir/core/var/map'
], function(core, initMK, map) {
	"use strict";
	core._addDOMListener = function(object, key, domEvtName, selector, callback, context, evtData) {
		/* istanbul ignore if  */
		if (!object || typeof object != 'object') return object;

		initMK(object);


		selector = selector || null;
		evtData = evtData || {};

		var objectData = map.get(object),
			domEvtHandler = function(domEvt) {
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
			fullEvtName = domEvtName + '.' + objectData.id + key,
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
				$nodes: objectData.special[key] && objectData.special[key].$nodes
			});
		}

		return object;
	};
});
