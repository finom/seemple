define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/dom-lib/balalaika-extended',
	'matreshka_dir/core/dom-lib/dollar-lib'
], function(core, $b, $) {
	"use strict";
	if(typeof window == 'undefined') {
		return;
	}
	core.$ = $;

	core.$b = core.balalaika = $b;

	core.useAs$ = function(_$) {
		return core.$ = this.$ = $ = _$;
	};
});
