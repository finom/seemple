define([
	'matreshka_dir/core/util/common'
], function(util) {
	"use strict";
	return typeof Symbol == 'undefined' ? 'mk-' + util.randomString() : Symbol('matreshka');
});
