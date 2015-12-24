define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/sym',
	'matreshka_dir/core/initmk',
	'matreshka_dir/core/util/common'
], function(core, sym, initMK, util) {
	"use strict";
	var linkProps = core.linkProps = function(object, key, keys, getter, setOnInit, options) {
		if (!object || typeof object != 'object') return object;

		initMK(object);

		var _this,
			_key,
			_keys,
			i,
			j,
			path,
			t;


		keys = typeof keys == 'string' ? keys.split(/\s/) : keys;

		// allow to flip setOnInit and options
		if (typeof setOnInit != 'boolean' && typeof setOnInit != 'undefined') {
			t = options;
			options = setOnInit;
			setOnInit = t;
		}

		options = options || {};

		getter = getter || function(value) {
			return value;
		};

		function getEvtName(path) {
			var evtName,
				sliceIndex;

			if(path.length > 1) {
				sliceIndex = path.length-1;
				evtName = path.slice(0, sliceIndex).join('.') + '@' + '_rundependencies:'+ path[sliceIndex];
			} else {
				evtName = '_rundependencies:' + path;
			}

			return evtName;
		}

		function onChange(evt) {
			var values = [],
				_protect = evt._protect = evt._protect || {};

			evt.fromDependency = true;

			if (!(key + object[sym].id in _protect)) {
				if (typeof keys[0] == 'object') {
					for (i = 0; i < keys.length; i += 2) {
						_this = keys[i];

						_keys = typeof keys[i + 1] == 'string' ? keys[i + 1].split(/\s/) : keys[i + 1];
						for (j = 0; j < _keys.length; j++) {
							values.push(util.deepFind(_this, _keys[j]));
						}
					}
				} else {
					for (i = 0; i < keys.length; i++) {
						_key = keys[i];
						_this = object;
						values.push(util.deepFind(_this, _key));
					}
				}

				_protect[key + object[sym].id] = 1;
				core._defineSpecial(object, key, options.hideProperty);
				core.set(object, key, getter.apply(object, values), evt);
			}

		}

		onChange = options.debounce ? util.debounce(onChange): onChange;

		// TODO refactor this shi..

		if (typeof keys[0] == 'object') {
			for (i = 0; i < keys.length; i += 2) {
				_this = initMK(keys[i]);
				_keys = typeof keys[i + 1] == 'string' ? keys[i + 1].split(/\s/) : keys[i + 1];
				for (j = 0; j < _keys.length; j++) {
					path = _keys[j].split('.');
					core[path.length > 1 ? 'on' : '_fastAddListener'](_this, getEvtName(path), onChange);
				}
			}
		} else {
			for (i = 0; i < keys.length; i++) {
				_key = keys[i];
				_this = object;
				path = _key.split('.');
				core[path.length > 1 ? 'on' : '_fastAddListener'](_this, getEvtName(path), onChange);
			}
		}

		setOnInit !== false && onChange.call(typeof keys[0] == 'object' ? keys[0] : object, {
			key: typeof keys[0] == 'object' ? keys[1] : keys[0]
		});

		return object;
	};
});
