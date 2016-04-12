import extend from './extend';

const ie = typeof document !== 'undefined' ? document.documentMode : null;

/* istanbul ignore if */
if (ie < 9) {
	throw Error(`Internet Explorer ${ie} isn't supported`);
}

export default function Class(prototype, staticProps) {
	const Constructor = prototype.constructor !== Object
			? prototype.constructor
			: function EmptyConstructor() {},
		Parent = prototype.extends || prototype.extend,
		proto = Object.create(Parent ? Parent.prototype : {});

	extend(proto, prototype);

	if (staticProps && typeof staticProps === 'object') {
		extend(Constructor, staticProps);
	}

	proto.instanceOf = function instanceOf() {
		return this instanceof Constructor;
	};

	Constructor.prototype = proto;

	if (this instanceof Class) {
		return new Constructor();
	} else {
		return Constructor;
	}
}
