define(['matreshka_dir/var/magic', 'matreshka_dir/var/sym', 'matreshka_dir/core/initmk'], function(magic, sym, initMK) {
	var linkProps = magic.linkProps = function(object, key, keys, getter, setOnInit, options) {
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
					magic._defineSpecial(object, key, options.hideProperty);
					magic.set(object, key, getter.apply(object, values), evt);
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
					magic._defineSpecial(_this, _keys[j]);
					magic._fastAddListener(_this, '_rundependencies:' + _keys[j], on_Change);
				}
			}
		} else {
			for (i = 0; i < keys.length; i++) {
				_key = keys[i];
				_this = object;
				magic._defineSpecial(_this, _key);
				magic._fastAddListener(_this, '_rundependencies:' + _key, on_Change);
			}
		}

		setOnInit !== false && on_Change.call(typeof keys[0] == 'object' ? keys[0] : object, {
			key: typeof keys[0] == 'object' ? keys[1] : keys[0]
		});

		return object;
	};
});