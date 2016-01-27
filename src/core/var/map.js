define([
	'matreshka_dir/core/util/common'
], function(util) {
	"use strict";
	var mkId = 'mk-' + util.randomString();

	function PseudoMap() {}

	util.extend(PseudoMap.prototype, {
		get: function(obj) {
			return obj[mkId];
		},
		set: function(obj, data) {
			Object.defineProperty(obj, mkId, {
				value: data,
				enumerable: false
			});
		},
		has: function(obj) {
			return mkId in obj;
		}
	});

	return typeof WeakMap == 'undefined' ? new PseudoMap() : new WeakMap();
});
