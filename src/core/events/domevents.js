define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/sym'
], function(core, sym) {
	"use strict";
	var list = {};
	/**
	 * @private
	 * @since 0.0.4
	 * @todo optimize
	 * @summary This object is used to map DOM nodes and their DOM events
	 */
	core.domEvents = {
		// adds events to the map
		add: function(o) {
			var $ = core.$;
			if (o.node) {
				if (typeof o.on == 'function') {
					o.on.call(o.node, o.handler);
				} else {
					$(o.node).on(o.on.split(/\s/).join('.mk ') + '.mk', o.handler);
				}
			}

			(list[o.instance[sym].id] = list[o.instance[sym].id] || []).push(o);
		},
		// removes events from the map
		remove: function(o) {
			var evts = list[o.instance[sym].id],
				$ = core.$,
				evt, i;

			if (!evts) return;

			for (i = 0; i < evts.length; i++) {
				evt = evts[i];
				if (evt.node !== o.node) continue;
				// remove Matreshka event
				evt.mkHandler && core._removeListener(o.instance, '_runbindings:' + o.key, evt.mkHandler);
				// remove DOM event
				if (typeof evt.on == 'string') {
					$(o.node).off(evt.on + '.mk', evt.handler);
				}

				evt.removed = true;


				list[o.instance[sym].id].splice(i--, 1);
			}
		}
	};
});
