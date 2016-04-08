define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/map'
], function(core, map) {
	"use strict";
	core._defineSpecial = function(object, key, noAccessors) {
		/* istanbul ignore if  */
		if (!object || typeof object != 'object' || !map.has(object)) return object;

		var objectData = map.get(object),
			specialProps = objectData.special[key];

		if (!specialProps) {
			specialProps = objectData.special[key] = {
				$nodes: core.$(),
				value: object[key],
				getter: null,
				setter: null,
				mediator: null
			};

			if (!noAccessors && key != 'sandbox') {
				Object.defineProperty(object, key, {
					configurable: true,
					enumerable: true,
					get: function() {
						return specialProps.getter ? specialProps.getter.call(object) : specialProps.value;
					},
					set: function(v) {
						specialProps.setter ? specialProps.setter.call(object, v) : core.set(object, key, v, {
							fromSetter: true
						});
					}
				});
			}
		}

		return specialProps;
	};
});
