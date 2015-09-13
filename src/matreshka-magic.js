"use strict";
define([
	'matreshka_dir/var/magic',
	'matreshka_dir/dom-lib/balalaika-extended',
	'matreshka_dir/dom-lib/dollar-lib',
	'matreshka_dir/var/sym',
	'matreshka_dir/bindings/binders',
	'matreshka_dir/core/initmk',
	'matreshka_dir/util/common',
	'matreshka_dir/core/definespecial',
	'matreshka_dir/util/define',
	'matreshka_dir/util/linkprops',
	'matreshka_dir/util/mediate',
	'matreshka_dir/core/get_set_remove',

	'matreshka_dir/bindings/bindnode',
	'matreshka_dir/bindings/unbindnode',
	'matreshka_dir/bindings/parsebindings',
	'matreshka_dir/bindings/getnodes',

	'matreshka_dir/events/trigger',
	'matreshka_dir/events/on',
	'matreshka_dir/events/off',
	'matreshka_dir/events/addlistener',
	'matreshka_dir/events/removelistener',
	'matreshka_dir/events/delegatelistener',
	'matreshka_dir/events/undelegatelistener',
	'matreshka_dir/events/domevents',
	'matreshka_dir/events/adddomlistener',
	'matreshka_dir/events/removedomlistener',
	'matreshka_dir/events/once',
	'matreshka_dir/events/ondebounce'
], function(magic, $b, $, sym) {
	magic.sym = sym;

	magic.initMK = function(object) {
		if (!object[sym]) {
			Object.defineProperty(object, sym, {
				value: {
					events: {},
					special: {},
					id: 'mk' + Math.random()
				},
				enumerable: false,
				configurable: false,
				writable: false
			});
		}

		return object;
	};

	magic.$ = $;

	magic.$b = magic.balalaika = $b;

	magic.useAs$ = function(_$) {
		return magic.$ = this.$ = $ = _$;
	};

	return magic;
});
