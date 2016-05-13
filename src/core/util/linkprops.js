define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/map',
	'matreshka_dir/core/initmk',
	'matreshka_dir/core/util/common'
], function(core, map, initMK, util) {
	"use strict";
	var linkProps = core.linkProps = function(object, key, keys, getter, evtOptions) {
		/* istanbul ignore if  */
		if (!object || typeof object != 'object') return object;

		initMK(object);

		var optionsType = typeof evtOptions,
			objectData = map.get(object),
			_this,
			_key,
			_keys,
			i,
			j,
			path,
			t,
			setOnInit,
			onChange;

		onChange = function (evt) {
			var values = [],
				_protect = evt._protect;

			if(!_protect) {
				_protect = evt._protect = evt._protect || {};

				for(i in evtOptions) {
					evt[i] = evtOptions[i];
				}
			}


			if (!(key + objectData.id in _protect)) {
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

				_protect[evt.key + objectData.id] = 1;
				core._defineSpecial(object, key, evtOptions.hideProperty);
				core.set(object, key, getter.apply(object, values), evt);
			}

		};


		keys = typeof keys == 'string' ? keys.split(/\s+/) : keys;

		// backward compability for setOnInit
		if(optionsType == 'boolean') {
			setOnInit = evtOptions;
		}

		if(optionsType != 'object') {
			evtOptions = {};
		}

		if(optionsType == 'boolean') {
			evtOptions.setOnInit = setOnInit;
		}

		evtOptions.fromDependency = true;

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



		onChange = evtOptions.debounce ? util.debounce(onChange): onChange;

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

		evtOptions.setOnInit !== false && onChange.call(typeof keys[0] == 'object' ? keys[0] : object, {
			key: typeof keys[0] == 'object' ? keys[1] : keys[0]
		});

		return object;
	};
});
