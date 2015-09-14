define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/sym',
	'matreshka_dir/core/initmk'
], function(core, sym, initMK) {
	var linkProps = core.linkProps = function(object, key, keys, getter, setOnInit, options) {
		if (!object || typeof object != 'object') return object;

		initMK(object);

		keys = typeof keys == 'string' ? keys.split(/\s/) : keys;

		options = options || {};

		var on_Change = function(evt) {
				var values = [],
					_protect = evt._protect = evt._protect || {};

				evt.fromDependency = true;

				if (!(key + object[sym].id in _protect)) {
					if (typeof keys[0] == 'object') {
						for (i = 0; i < keys.length; i += 2) {
							_this = keys[i];

							_keys = typeof keys[i + 1] == 'string' ? keys[i + 1].split(/\s/) : keys[i + 1];
							for (j = 0; j < _keys.length; j++) {
								values.push(_this[_keys[j]]);
							}
						}
					} else {
						for (i = 0; i < keys.length; i++) {
							_key = keys[i];
							_this = object;
							values.push(_this[_key]);
						}
					}

					_protect[key + object[sym].id] = 1;
					core._defineSpecial(object, key, options.hideProperty);
					core.set(object, key, getter.apply(object, values), evt);
				}

			},
			_this, _key, _keys, i, j;

		getter = getter || function(value) {
			return value;
		};


		if (typeof keys[0] == 'object') {
			for (i = 0; i < keys.length; i += 2) {
				_this = initMK(keys[i]);
				_keys = typeof keys[i + 1] == 'string' ? keys[i + 1].split(/\s/) : keys[i + 1];
				for (j = 0; j < _keys.length; j++) {
					core._defineSpecial(_this, _keys[j]);
					core._fastAddListener(_this, '_rundependencies:' + _keys[j], on_Change);
				}
			}
		} else {
			for (i = 0; i < keys.length; i++) {
				_key = keys[i];
				_this = object;
				core._defineSpecial(_this, _key);
				core._fastAddListener(_this, '_rundependencies:' + _key, on_Change);
			}
		}

		setOnInit !== false && on_Change.call(typeof keys[0] == 'object' ? keys[0] : object, {
			key: typeof keys[0] == 'object' ? keys[1] : keys[0]
		});

		return object;
	};
});
