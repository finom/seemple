define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/map',

	'matreshka_dir/core/bindings/binders',
	'matreshka_dir/core/dom-lib/used-lib',

	'matreshka_dir/core/initmk',
	'matreshka_dir/core/util/common',
	'matreshka_dir/core/definespecial',
	'matreshka_dir/core/util/define',
	'matreshka_dir/core/util/linkprops',
	'matreshka_dir/core/util/mediate',
	'matreshka_dir/core/get_set_remove',

	'matreshka_dir/core/bindings/bindnode',
	'matreshka_dir/core/bindings/unbindnode',
	'matreshka_dir/core/bindings/parsebindings',
	'matreshka_dir/core/bindings/getnodes',

	'matreshka_dir/core/events/trigger',
	'matreshka_dir/core/events/on',
	'matreshka_dir/core/events/off',
	'matreshka_dir/core/events/addlistener',
	'matreshka_dir/core/events/removelistener',
	'matreshka_dir/core/events/delegatelistener',
	'matreshka_dir/core/events/undelegatelistener',
	'matreshka_dir/core/events/domevents',
	'matreshka_dir/core/events/adddomlistener',
	'matreshka_dir/core/events/removedomlistener',
	'matreshka_dir/core/events/once',
	'matreshka_dir/core/events/ondebounce'
], function(core, map) {
	"use strict";
	core.map = map;

	return core;
});
