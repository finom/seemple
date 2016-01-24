define(function() {
	"use strict";
	var ie = typeof document != 'undefined' ? document.documentMode : null;

	if(ie && ie < 9) {
		throw Error('Internet Explorer ' + ie + ' isn\'t supported');
	}

	function Class(prototype, staticProps) {
		var Constructor = prototype.constructor !== Object
			? prototype.constructor : function EmptyConstructor() {},
			Parent = prototype['extends'] = prototype['extends'] || prototype.extend,
			proto,
			typeofParent,
			key;

		if(Parent) {
			typeofParent = typeof Parent;
			if(typeofParent != 'function') {
				throw Error('Cannot extend ' + typeofParent);
			}

			proto = Object.create(Parent.prototype);

			if(Object.assign) {
				Object.assign(proto, prototype);
			} else {
				for(key in prototype) {
					proto[key] = prototype[key];
				}
			}
		} else {
			proto = prototype;
		}

		Constructor.prototype = proto;

		if (this instanceof Class) {
			return new Constructor();
		} else {
			return Constructor;
		}
	}
	
	return Class;
});
