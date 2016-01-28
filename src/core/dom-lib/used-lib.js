define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/dom-lib/bquery',
	'matreshka_dir/core/dom-lib/dollar-lib'
], function(core, $b, $) {
	"use strict";
	core.$ = $ || noop;

	core.$b = core.balalaika = core.bQuery = core.bquery = $b || noop;

	core.useAs$ = function(_$) {
		return core.$ = this.$ = $ = _$;
	};

	/* istanbul ignore next */
	// used as DOM library placeholder in non-browser environment (eg nodejs)
	function noop() {
		return [];
	}
});
