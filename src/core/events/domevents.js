define([
	'matreshka_dir/core/var/magic',
	'matreshka_dir/core/var/sym'
], function(magic, sym) {
	var list = {};
	/**
	 * @private
	 * @since 0.0.4
	 * @todo optimize
	 * @summary This object is used to map DOM nodes and their DOM events
	 */
	magic.domEvents = {
		// adds events to the map
		add: function(o) {
			var $ = magic.$;
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
				$ = magic.$,
				evt, i;

			if (!evts) return;

			for (i = 0; i < evts.length; i++) {
				evt = evts[i];
				if (evt.node !== o.node) continue;
				// remove Matreshka event
				evt.mkHandler && magic._off(o.instance, '_runbindings:' + o.key, evt.mkHandler);
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
