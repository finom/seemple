define(function() {
	"use strict";
	var ie = typeof document != 'undefined' ? document.documentMode : null;

	/* istanbul ignore if  */
	if(ie && ie < 9) {
		throw Error('Internet Explorer ' + ie + ' isn\'t supported');
	}

	return function Class(prototype, staticProps) {
		var Constructor = prototype.constructor !== Object
			? prototype.constructor : function EmptyConstructor() {},
			Parent = prototype['extends'] = prototype['extends'] || prototype.extend,
			proto,
			typeofParent,
			key;


		proto = Object.create(Parent && Parent.prototype || null);

		if(Object.assign) {
			Object.assign(proto, prototype);
		} else {
			for(key in prototype) {
				proto[key] = prototype[key];
			}
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
