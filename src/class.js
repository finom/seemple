import extend from './extend';

export default function Class(prototype, staticProps) {
    const Constructor = prototype.constructor !== Object
            ? prototype.constructor
            : function EmptyConstructor() {},
        //extends is kept for backward compatibility
        Parent = prototype.extends || prototype.extend,
        //inherit proto from class parent or empty object
        proto = Object.create(Parent ? Parent.prototype : {});

    extend(proto, prototype);

    if (typeof staticProps === 'object') {
        extend(Constructor, staticProps);
    }

    // for backward compatibility
    proto.instanceOf = function instanceOf() {
        return this instanceof Constructor;
    };

    Constructor.prototype = proto;

    // if new Class({}) is called return its instance
    if (this instanceof Class) {
        return new Constructor();
    } else {
        return Constructor;
    }
}
