define([
	'matreshka_dir/core/var/magic',
	'matreshka_dir/core/dom-lib/balalaika-extended',
	'matreshka_dir/core/dom-lib/dollar-lib'
], function(magic, $b, $) {
	magic.$ = $;

	magic.$b = magic.balalaika = $b;

	magic.useAs$ = function(_$) {
		return magic.$ = this.$ = $ = _$;
	};
});