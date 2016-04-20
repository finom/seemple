import defs from './defs';

// this is common function which associates an object with its Matreshka definition
function commonInit(object) {
	let def = defs.get(object);
	if (!def) {
		def = {
			// a property name of "events" object is an event name
			// and a value is an array of event handlers
			events: {
				/*example: {
					callback: function,
					ctx: object,
					context: object2,
					name: "example"
				}
				*/
			},
			// "props" contains special information about properties (getters, setters etc)
			props: {
				/*example: {
					//nodes: core.$(),
					value: object[key],
					getter: null,
					setter: null,
					mediator: null,
					//destroyers: Map,
					bindings: [{
						node,
						binder,
						nodeHandler,
						objectHandler
					}]
				}*/
			},
			id: `mk${Math.random()}`
		};

		defs.set(object, def);
	}

	return def;
}

export default function initMK(object) {
	const type = typeof object;
	if (!object || type !== 'object') {
		throw new TypeError(`${type} cannot be used in this method`);
	}

	// if object has _initMK method, run it
	// else run commonInit
	// every _initMK implementation have to run commonInit or parent's _initMK
	return object._initMK ? object._initMK() : commonInit(object);
}
