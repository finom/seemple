define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/sym',
	'matreshka_dir/core/var/isxdr'
], function(core, sym, isXDR) {
	"use strict";
	core._defineSpecial = function(object, key, noAccessors) {
		if (!object || typeof object != 'object' || !object[sym]) return object;

		var specialProps = object[sym].special[key];

		if (!specialProps) {
			specialProps = object[sym].special[key] = {
				$nodes: core.$(),
				value: object[key],
				getter: null,
				setter: null,
				mediator: null
			};

			if (!noAccessors && key != 'sandbox') {
				Object.defineProperty(object, key, {
					configurable: true,
					enumerable: !isXDR,
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
