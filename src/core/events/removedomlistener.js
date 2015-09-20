define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/sym'
], function(core, sym) {
	"use strict";
	core._removeDOMListener = function(object, key, domEvtName, selector, callback, context, evtData) {
		if (!object || typeof object != 'object' || !object[sym] || !object[sym].events) return object;

		selector = selector || null;
		evtData = evtData || {};

		if (key && object[sym].special[key]) {
			object[sym].special[key].$nodes.off(domEvtName + '.' + object[sym].id + key);
			core._removeListener(object, 'bind:' + key, callback, context, evtData);
			core._removeListener(object, 'unbind:' + key, callback, context, evtData);
		}

		return object;
	};
});
