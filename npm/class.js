'use strict';

module.exports = Class;
function Class(prototype, staticProps) {
    let Constructor = prototype.constructor !== Object ? prototype.constructor : function EmptyConstructor() {},

    // extends is kept for backward compatibility
        Parent = prototype.extends || prototype.extend,

    // inherit proto from class parent or empty object
        proto = Object.create(Parent ? Parent.prototype : {});

    const _result = proto;

    for (let _source4 = prototype, _keys4 = Object.keys(_source4), _l4 = _keys4.length, _i4 = 0, _key4; _i4 < _l4; _i4++) {
        _key4 = _keys4[_i4];
        _result[_key4] = _source4[_key4];
    }

    if (typeof staticProps === 'object') {
        const _result2 = Constructor;

        for (let _source3 = staticProps, _keys3 = Object.keys(_source3), _l3 = _keys3.length, _i3 = 0, _key3; _i3 < _l3; _i3++) {
            _key3 = _keys3[_i3];
            _result2[_key3] = _source3[_key3];
        }
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
