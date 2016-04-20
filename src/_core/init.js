import defs from './defs';

// This is common function which associates an object with its definition
function commonInit(object) {
	let def = defs.get(object);
	if (!def) {
		def = {
			// A property name of "events" object is an event name
			// and a value is an array of event handlers
			events: {},
			// "props" contains special information about
			props: {
				/*vasia: {
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
			id: 'mk' + Math.random()
		};

		defs.set(object, def);
	}

	return def;
};

export default function initMK(object) {
	const type = typeof object;
	if (!object || type != 'object') {
		throw new TypeError(`${type} cannot be used in this method`);
	};

	return object._initMK ? object._initMK() : commonInit(object);
};

/*define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/map'
], function(core, map) {
	"use strict";

	var initMK = core.initMK = function(object) {
		if (!map.has(object)) {
			map.set(object, {
				events: {},
				special: {},
				id: 'mk' + Math.random()
			});
		}

		return object;
	};

	return function(object) {
		object._initMK ? object._initMK() : initMK(object);
		return object;
	};
});*/
