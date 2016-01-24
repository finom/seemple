define(function() {
	"use strict";
	var ie = typeof document != 'undefined' ? document.documentMode : null,
		ie8 = ie == 8;

	if(ie && ie < 8) {
		throw Error('Internet Explorer ' + ie + ' doesn\'t support Class function');
	}

	var Class = function(prototype, staticProps) {
		var realConstructor,
			constructor = prototype.constructor !== Object
				? prototype.constructor : function EmptyConstructor() {},
			extend = prototype['extends'] = prototype['extends'] || prototype.extend,
			extend_prototype = extend && extend.prototype,
			key;

		realConstructor = constructor;

		delete prototype.extend;

		if (ie8) {
			prototype.prototype = null;
			prototype.constructor = null;
			constructor = function() {
				if (this instanceof constructor) {
					var r = new XDomainRequest(),
						p;
					for (p in constructor.prototype)
						if (p !== 'constructor') {
							r[p] = constructor.prototype[p];
						}
					r.hasOwnProperty = constructor.prototype.hasOwnProperty;
					realConstructor.apply(r, arguments);

					return r;
				} else {
					realConstructor.apply(this, arguments);
				}
			};

			prototype.constructor = constructor;
			constructor.prototype = constructor.fn = prototype;
			constructor.parent = parent;
			extend && Class.IEInherits(constructor, extend);
		} else {
			prototype.constructor = constructor;
			constructor.prototype = constructor.fn = prototype;
			constructor.parent = parent;

			extend && Class.inherits(constructor, extend);
		}

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

		Child.prototype.instanceOf = function(_Class) {
			return this instanceof _Class;
		};
	};

	Class.IEInherits = function(Child, Parent) {
		var childHasOwn = Child.prototype.hasOwnProperty,
			childConstructor = Child.prototype.constructor,
			parentHasOwn,
			objectHasOwn = Object.prototype.hasOwnProperty;
		while (Parent) {
			parentHasOwn = parentHasOwn || Parent.prototype.hasOwnProperty;
			Child.prototype = (function(pp, cp) { // extending
				var o = {},
					i;
				for (i in pp) {
					o[i] = pp[i];
				}
				for (i in cp) {
					o[i] = cp[i];
				}
				return o;
			})(Parent.prototype, Child.prototype);
			Parent = Parent.prototype && Parent.prototype['extends'] && Parent.prototype['extends'].prototype;
		}

		if (childHasOwn !== objectHasOwn) {
			Child.prototype.hasOwnProperty = childHasOwn;
		} else if (parentHasOwn !== objectHasOwn) {
			Child.prototype.hasOwnProperty = parentHasOwn;
		}

		Child.prototype.constructor = childConstructor;

		Child.prototype.instanceOf = function(_Class) {
			var PossibleParent = Child;
			while (PossibleParent) {
				if (PossibleParent === _Class) {
					return true;
				}
				PossibleParent = PossibleParent.prototype['extends'];
			}
			return false;
		};
	};

	Class.isXDR = ie8;

	return Class;
});
