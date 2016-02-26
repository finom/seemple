define(function() {
	"use strict";
	var ie = typeof document != 'undefined' ? document.documentMode : null;

	/* istanbul ignore if  */
	if (ie && ie < 9) {
		throw Error('Internet Explorer ' + ie + ' isn\'t supported');
	}

	return function Class(prototype, staticProps) {
		var Constructor = prototype.constructor !== Object ? prototype.constructor : function EmptyConstructor() {},
			Parent = prototype['extends'] = prototype['extends'] || prototype.extend,
			proto,
			typeofParent,
			key,
			assign = Object.assign || function(target, firstSource) {
				if (target === undefined || target === null) {
					throw new TypeError('Cannot convert first argument to object');
				}

				var to = Object(target);
				for (var i = 1; i < arguments.length; i++) {
					var nextSource = arguments[i];
					if (nextSource === undefined || nextSource === null) {
						continue;
					}

					var keysArray = Object.keys(Object(nextSource));
					for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
						var nextKey = keysArray[nextIndex];
						var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
						if (desc !== undefined && desc.enumerable) {
							to[nextKey] = nextSource[nextKey];
						}
					}
				}
				return to;
			};



		proto = Object.create(Parent ? Parent.prototype : {});

		assign(proto, prototype);


		if (staticProps && typeof staticProps == 'object') {
			assign(Constructor, staticProps);
		}

		proto.instanceOf = function() {
			return this instanceof Constructor;
		};

		Constructor.prototype = proto;

		if (this instanceof Class) {
			return new Constructor();
		} else {
			return Constructor;
		}
	};
});
