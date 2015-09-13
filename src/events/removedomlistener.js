define([
	'matreshka_dir/var/magic',
	'matreshka_dir/var/sym'
], function(magic, sym) {
	magic._removeDOMListener = function(object, key, domEvtName, selector, callback, context, evtData) {
		if (!object || typeof object != 'object' || !object[sym] || !object[sym].events) return object;

		selector = selector || null;
		evtData = evtData || {};

		if (key && object[sym].special[key]) {
			object[sym].special[key].$nodes.off(domEvtName + '.' + object[sym].id + key);
			magic._removeListener(object, 'bind:' + key, callback, context, evtData);
			magic._removeListener(object, 'unbind:' + key, callback, context, evtData);
		}

		return object;
	};
});