// static methods and properties of classes will be hidden under Symbol('staticNames')
const staticNamesProperty = typeof Symbol === 'function' ? Symbol('staticNames') : '__staticNames';
const { getOwnPropertySymbols } = Object;

export default function Class(prototype, staticProps) {
    const Constructor = prototype.constructor !== Object
            ? prototype.constructor
            : function EmptyConstructor() {},
        // extends is kept for backward compatibility
        Parent = prototype.extends,
        // inherit proto from class parent or empty object
        proto = Object.create(Parent ? Parent.prototype : {}),
        parentStaticNames = Parent ? Parent[staticNamesProperty] : undefined;

    nofn.assign(proto, prototype);

    // allow to pass symbols as prototype properties
    if (getOwnPropertySymbols) {
        const symbols = getOwnPropertySymbols(prototype);
        nofn.forEach(symbols, symbol => {
            proto[symbol] = prototype[symbol];
        });
    }

    // inherit staric properties of a parent
    if (typeof parentStaticNames === 'object') {
        const staticNames = Constructor[staticNamesProperty] = Constructor[staticNamesProperty] || {};

        nofn.forOwn(parentStaticNames, (_, name) => {
            Constructor[name] = Parent[name];
            staticNames[name] = true;
        });

        // inherit static properties of a parent when their keys are symbols
        if (getOwnPropertySymbols) {
            const symbols = getOwnPropertySymbols(parentStaticNames);
            nofn.forEach(symbols, symbol => {
                Constructor[symbol] = Parent[symbol];
                staticNames[symbol] = true;
            });
        }
    }

    // extend Constructor with passed static properties
    if (typeof staticProps === 'object') {
        const staticNames = Constructor[staticNamesProperty] = Constructor[staticNamesProperty] || {};

        nofn.forOwn(staticProps, (value, key) => {
            Constructor[key] = value;
            staticNames[key] = true;
        });

        // extend Constructor with passed static properties if their keys are symbols
        if (getOwnPropertySymbols) {
            const symbols = getOwnPropertySymbols(staticProps);
            nofn.forEach(symbols, symbol => {
                Constructor[symbol] = staticProps[symbol];
                staticNames[symbol] = true;
            });
        }
    }

    Constructor.prototype = proto;

    // if new Class({}) is called return its instance
    if (this instanceof Class) {
        return new Constructor();
    } else {
        return Constructor;
    }
}
