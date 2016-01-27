define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/map'
], function(core, map) {
	"use strict";
	core._removeDOMListener = function(object, key, domEvtName, selector, callback, context, evtData) {
		/* istanbul ignore if  */
		if (!object || typeof object != 'object') return object;

		var objectData = map.get(object);

		if(!objectData) return object;

		selector = selector || null;
		evtData = evtData || {};

		if (key && objectData.special[key]) {
			objectData.special[key].$nodes.off(domEvtName + '.' + objectData.id + key, selector, callback);
			core._removeListener(object, 'bind:' + key, callback, context, evtData);
			core._removeListener(object, 'unbind:' + key, callback, context, evtData);
		}

		return object;
	};
});
