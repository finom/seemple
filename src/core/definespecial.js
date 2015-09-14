define([
	'matreshka_dir/core/var/magic',
	'matreshka_dir/core/var/sym'
], function(magic, sym) {
	magic._defineSpecial = function(object, key, noAccessors) {
		if (!object || typeof object != 'object' || !object[sym]) return object;

		var specialProps = object[sym].special[key];

		if (!specialProps) {
			specialProps = object[sym].special[key] = {
				$nodes: magic.$(),
				value: object[key],
				getter: null,
				setter: null,
				mediator: null
			};

			if (!noAccessors) {
				Object.defineProperty(object, key, {
					configurable: true,
					enumerable: true,
					get: function() {
						return specialProps.getter ? specialProps.getter.call(object) : specialProps.value;
					},
					set: function(v) {
						specialProps.setter ? specialProps.setter.call(object, v) : magic.set(object, key, v, {
							fromSetter: true
						});
					}
				});
			}
		}

		return specialProps;
	};
});