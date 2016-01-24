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


	/*var Class = function(prototype, staticProps) {
		var realConstructor,
			constructor = prototype.constructor !== Object
				? prototype.constructor : function EmptyConstructor() {},
			extend = prototype['extends'] = prototype['extends'] || prototype.extend,
			extend_prototype = extend && extend.prototype,
			key;

		realConstructor = constructor;

		delete prototype.extend;

			prototype.constructor = constructor;
			constructor.prototype = constructor.fn = prototype;
			constructor.parent = parent;

			extend && Class.inherits(constructor, extend);

		if(staticProps && typeof staticProps == 'object') {
			for (key in staticProps) {
				constructor[key] = staticProps[key];
			}
		}

		if (this instanceof Class) {
			return new constructor();
		} else {
			return constructor;
		}
	};

	Class.inherits = function(Child, Parent) {
		var prototype = Child.prototype,
			F = function() {},
            m;
		F.prototype = Parent.prototype;
		Child.prototype = new F();
		Child.prototype.constructor = Child;
		for (m in prototype) {
			Child.prototype[m] = prototype[m];
		}

		if (typeof Symbol != 'undefined' && prototype[Symbol.iterator]) {
			Child.prototype[Symbol.iterator] = prototype[Symbol.iterator];
		}


	};*/



	return Class;
});
