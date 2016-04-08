define([
	'matreshka_dir/core/util/common'
], function(util) {
	"use strict";
	var mkId = 'mk-' + util.randomString();

	return typeof WeakMap == 'undefined' ? new util.PseudoMap() : new WeakMap();
});
