define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/sym',
	'matreshka_dir/matreshka-array/processrendering'
], function(core, sym, processRendering) {
	return function(_this, evt, additional) {
		var added = evt.added,
			removed = evt.removed,
			events = _this[sym].events,
			i;

		if (!evt.silent) {
			if (additional) {
				events[additional] && core._fastTrigger(_this, additional, evt);
			}

			if (added.length) {
				events.add && core._fastTrigger(_this, 'add', evt);

				if (events.addone) {
					for (i = 0; i < added.length; i++) {
						core._fastTrigger(_this, 'addone', {
							self: _this,
							added: added[i]
						});
					}
				}
			}

			if (removed.length) {
				events.remove && core._fastTrigger(_this, 'remove', evt);

				if (events.removeone) {
					for (i = 0; i < removed.length; i++) {
						core._fastTrigger(_this, 'removeone', {
							self: _this,
							removed: removed[i]
						});
					}
				}
			}

			if (added.length || removed.length) {
				events.modify && core._fastTrigger(_this, 'modify', evt);
			}
		}

		if (added.length || removed.length) {
			if (!evt.dontRender) {
				processRendering(_this, evt);
			}
		}
	};
});
