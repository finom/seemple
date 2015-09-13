"use strict";
define('matreshka', [
	'matreshka_dir/matreshka-core',
	'matreshka_dir/matreshka-object',
	'matreshka_dir/matreshka-array'
], function( MK, MK_Object, MK_Array, MK_binders ) {
	return MK;
});

define('balalaika', ['matreshka_dir/dom-lib/balalaika-extended'], function($b) {
	return $b;
});

define('xclass', ['matreshka_dir/xclass'], function(Class) {
	return Class;
});

define('matreshka-magic', ['matreshka_dir/matreshka-magic'], function(magic) {
	return magic;
});
