define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/dom-lib/balalaika-extended',
	'matreshka_dir/core/dom-lib/dollar-lib'
], function(core, $b, $) {
	"use strict";
	var noop = function() {
		return [];
	};

	core.$ = $ || noop;

	core.$b = core.balalaika = $b || noop;

	core.useAs$ = function(_$) {
		return core.$ = this.$ = $ = _$;
	};
});
