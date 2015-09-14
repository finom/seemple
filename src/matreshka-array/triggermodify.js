define([
	'matreshka_dir/core/var/magic',
	'matreshka_dir/core/var/sym',
	'matreshka_dir/matreshka-array/processrendering'
], function(magic, sym, processRendering) {
	return function(_this, evt, additional) {
		var added = evt.added,
			removed = evt.removed,
			events = _this[sym].events,
			i;

		if (!evt.silent) {
			if (additional) {
				events[additional] && magic._fastTrigger(_this, additional, evt);
			}

			if (added.length) {
				events.add && magic._fastTrigger(_this, 'add', evt);

				if (events.addone) {
					for (i = 0; i < added.length; i++) {
						magic._fastTrigger(_this, 'addone', {
							self: _this,
							added: added[i]
						});
					}
				}
			}

			if (removed.length) {
				events.remove && magic._fastTrigger(_this, 'remove', evt);

				if (events.removeone) {
					for (i = 0; i < removed.length; i++) {
						magic._fastTrigger(_this, 'removeone', {
							self: _this,
							removed: removed[i]
						});
					}
				}
			}

			if (added.length || removed.length) {
				events.modify && magic._fastTrigger(_this, 'modify', evt);
			}
		}

		if (added.length || removed.length) {
			if (!evt.dontRender) {
				processRendering(_this, evt);
			}
		}
	};
});