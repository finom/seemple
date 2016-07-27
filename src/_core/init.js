import defs from './defs';

let objectId = 0;

// this is common function which associates an object with its Matreshka definition
function commonInit(object) {
    let def = defs.get(object);
    if (!def) {
        def = {
            // a property name of "events" object is an event name
            // and a value is an array of event handlers
            events: {
                /* example: {
                    callback: function,
                    ctx: object,
                    context: object2,
                    name: "example",
					info: {}
                } */
            },
            // "props" contains special information about properties (getters, setters etc)
            props: {
                /* example: {
                    value: object[key],
                    getter: null,
                    setter: null,
                    mediator: null,
                    bindings: [{
                        node,
                        binder,
                        nodeHandler,
                        objectHandler,
						...other required info
                    }]
                }*/
            },
            id: objectId++
        };

        defs.set(object, def);
    }

    return def;
}

export default function initMK(object) {
    const type = typeof object;
    if (!object || type !== 'object') {
		// TODO throw matreshkaError
        throw new TypeError(`${type} cannot be used in this method`);
    }

    // if object has _initMK method, run it
    // else run commonInit
    // every _initMK implementation have to run commonInit or parent's _initMK
	// eslint-disable-next-line no-underscore-dangle
    return object._initMatreshka ? object._initMatreshka() : commonInit(object);
}
